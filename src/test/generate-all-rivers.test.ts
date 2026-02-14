import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Full pipeline: ne_10m_rivers.geojson → per-country river JSON files
 * 1. Parse GeoJSON features into named segments
 * 2. Filter by country bounds
 * 3. Clip to country border polygons
 * 4. Merge nearby segments of same river
 * 5. Simplify with Douglas-Peucker
 * 6. Output final JSON
 */

const BOUNDS = {
  germany: { minLat: 47.27, maxLat: 55.06, minLng: 5.87, maxLng: 15.04 },
  sweden: { minLat: 55.2, maxLat: 69.2, minLng: 10.9, maxLng: 24.2 },
  uganda: { minLat: -1.5, maxLat: 4.3, minLng: 29.5, maxLng: 35.1 },
};

function pointInPolygon(lng: number, lat: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function getPolygons(geoJson: any): [number, number][][] {
  const geom = geoJson.features[0].geometry;
  if (geom.type === "MultiPolygon") {
    return geom.coordinates.map((p: number[][][]) => p[0] as [number, number][]);
  }
  return [geom.coordinates[0] as [number, number][]];
}

function simplify(coords: [number, number][], epsilon: number): [number, number][] {
  if (coords.length <= 2) return coords;
  let maxDist = 0;
  let maxIdx = 0;
  const [x1, y1] = coords[0];
  const [x2, y2] = coords[coords.length - 1];
  for (let i = 1; i < coords.length - 1; i++) {
    const [x, y] = coords[i];
    const num = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
    const den = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    const dist = den === 0 ? Math.sqrt((x - x1) ** 2 + (y - y1) ** 2) : num / den;
    if (dist > maxDist) { maxDist = dist; maxIdx = i; }
  }
  if (maxDist > epsilon) {
    const left = simplify(coords.slice(0, maxIdx + 1), epsilon);
    const right = simplify(coords.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [coords[0], coords[coords.length - 1]];
}

describe("Generate all country rivers from ne_10m", () => {
  it("processes rivers for all countries", () => {
    // Step 1: Parse ne_10m_rivers.geojson
    const geoPath = path.resolve(__dirname, "../../tmp/ne_10m_rivers.geojson");
    if (!fs.existsSync(geoPath)) {
      console.log("ne_10m_rivers.geojson not found, skipping");
      return;
    }
    const geo = JSON.parse(fs.readFileSync(geoPath, "utf-8"));
    
    // Extract all river segments with names
    const allSegments: { name: string; coordinates: [number, number][] }[] = [];
    for (const feature of geo.features) {
      const name = feature.properties?.name || feature.properties?.NAME || "";
      if (!name) continue;
      const geom = feature.geometry;
      if (geom.type === "LineString") {
        allSegments.push({ name, coordinates: geom.coordinates as [number, number][] });
      } else if (geom.type === "MultiLineString") {
        for (const line of geom.coordinates) {
          allSegments.push({ name, coordinates: line as [number, number][] });
        }
      }
    }
    console.log(`Parsed ${allSegments.length} named river segments from GeoJSON`);

    for (const [countryId, bounds] of Object.entries(BOUNDS)) {
      // Step 2: Filter segments that intersect country bounds
      const margin = 1.0;
      const nearby = allSegments.filter(r =>
        r.coordinates.some(([lng, lat]) =>
          lng >= bounds.minLng - margin && lng <= bounds.maxLng + margin &&
          lat >= bounds.minLat - margin && lat <= bounds.maxLat + margin
        )
      );

      // Step 3: Load country border and clip
      const borderPath = path.resolve(__dirname, `../data/${countryId}-border.json`);
      if (!fs.existsSync(borderPath)) {
        console.log(`No border for ${countryId}, skipping`);
        continue;
      }
      const borderGeo = JSON.parse(fs.readFileSync(borderPath, "utf-8"));
      const polys = getPolygons(borderGeo);
      
      const isInside = (lng: number, lat: number) => polys.some(p => pointInPolygon(lng, lat, p));

      const clipped: { name: string; coordinates: [number, number][] }[] = [];
      for (const river of nearby) {
        let segment: [number, number][] = [];
        for (const coord of river.coordinates) {
          const inBounds = coord[0] >= bounds.minLng - 0.5 && coord[0] <= bounds.maxLng + 0.5 &&
                           coord[1] >= bounds.minLat - 0.5 && coord[1] <= bounds.maxLat + 0.5;
          if (inBounds && isInside(coord[0], coord[1])) {
            segment.push(coord);
          } else {
            if (segment.length >= 2) clipped.push({ name: river.name, coordinates: segment });
            segment = [];
          }
        }
        if (segment.length >= 2) clipped.push({ name: river.name, coordinates: segment });
      }

      // Step 4: Merge nearby segments of same river
      const merged: typeof clipped = [];
      const used = new Set<number>();
      for (let i = 0; i < clipped.length; i++) {
        if (used.has(i)) continue;
        let coords = [...clipped[i].coordinates];
        used.add(i);
        let changed = true;
        while (changed) {
          changed = false;
          for (let j = 0; j < clipped.length; j++) {
            if (used.has(j) || clipped[j].name !== clipped[i].name) continue;
            const last = coords[coords.length - 1];
            const first = clipped[j].coordinates[0];
            const dist = Math.sqrt((last[0] - first[0]) ** 2 + (last[1] - first[1]) ** 2);
            if (dist < 0.05) {
              coords.push(...clipped[j].coordinates);
              used.add(j);
              changed = true;
            }
          }
        }
        merged.push({ name: clipped[i].name, coordinates: coords });
      }

      // Step 5: Simplify
      const simplified = merged.map(r => {
        const len = r.coordinates.length;
        let epsilon = 0.005;
        if (len > 300) epsilon = 0.02;
        else if (len > 200) epsilon = 0.01;
        else if (len > 100) epsilon = 0.005;
        return { name: r.name, coordinates: simplify(r.coordinates, epsilon) };
      }).filter(r => r.coordinates.length >= 3);

      // Step 6: Round and dedup
      const final = simplified.map(r => {
        const coords: [number, number][] = [];
        for (const [lng, lat] of r.coordinates) {
          const c: [number, number] = [Math.round(lng * 100) / 100, Math.round(lat * 100) / 100];
          if (coords.length === 0 || coords[coords.length - 1][0] !== c[0] || coords[coords.length - 1][1] !== c[1]) {
            coords.push(c);
          }
        }
        return { name: r.name, coordinates: coords };
      }).filter(r => r.coordinates.length >= 3);

      const totalCoords = final.reduce((s, r) => s + r.coordinates.length, 0);
      console.log(`\n${countryId}: ${final.length} segments, ${totalCoords} total coords`);
      for (const r of final) {
        console.log(`  ${r.name}: ${r.coordinates.length} points`);
      }

      const jsonStr = JSON.stringify(final);
      const outPath = path.resolve(__dirname, `../data/rivers-${countryId}.json`);
      fs.writeFileSync(outPath, jsonStr);
      console.log(`RIVER_JSON_${countryId.toUpperCase()}:${jsonStr}`);
      console.log(`Wrote ${outPath} (${jsonStr.length} bytes)`);
    }
  });
});
