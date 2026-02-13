import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

interface RiverSegment {
  name: string;
  coordinates: [number, number][];
}

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

function isInside(lng: number, lat: number, polys: [number, number][][]): boolean {
  return polys.some(p => pointInPolygon(lng, lat, p));
}

// Douglas-Peucker simplification
function simplify(coords: [number, number][], epsilon: number): [number, number][] {
  if (coords.length <= 2) return coords;
  
  let maxDist = 0;
  let maxIdx = 0;
  const [x1, y1] = coords[0];
  const [x2, y2] = coords[coords.length - 1];
  
  for (let i = 1; i < coords.length - 1; i++) {
    const [x, y] = coords[i];
    // Point-to-line distance
    const num = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
    const den = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    const dist = den === 0 ? Math.sqrt((x - x1) ** 2 + (y - y1) ** 2) : num / den;
    if (dist > maxDist) {
      maxDist = dist;
      maxIdx = i;
    }
  }
  
  if (maxDist > epsilon) {
    const left = simplify(coords.slice(0, maxIdx + 1), epsilon);
    const right = simplify(coords.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [coords[0], coords[coords.length - 1]];
}

describe("Generate per-country river JSON", () => {
  for (const [countryId, bounds] of Object.entries(BOUNDS)) {
    it(`generates rivers for ${countryId}`, () => {
      // Load country border
      const borderPath = path.resolve(__dirname, `../data/${countryId}-border.json`);
      const borderGeo = JSON.parse(fs.readFileSync(borderPath, "utf-8"));
      const polys = getPolygons(borderGeo);
      
      // Load source rivers from tmp
      const srcPath = path.resolve(__dirname, `../../tmp/rivers-${countryId}.json`);
      if (!fs.existsSync(srcPath)) {
        console.log(`No source file for ${countryId}, skipping`);
        return;
      }
      const allRivers: RiverSegment[] = JSON.parse(fs.readFileSync(srcPath, "utf-8"));
      
      // Clip each river to country border
      const clipped: RiverSegment[] = [];
      for (const river of allRivers) {
        let segment: [number, number][] = [];
        for (const coord of river.coordinates) {
          const inBounds = coord[0] >= bounds.minLng - 0.5 && coord[0] <= bounds.maxLng + 0.5 &&
                           coord[1] >= bounds.minLat - 0.5 && coord[1] <= bounds.maxLat + 0.5;
          if (inBounds && isInside(coord[0], coord[1], polys)) {
            segment.push(coord);
          } else {
            if (segment.length >= 2) {
              clipped.push({ name: river.name, coordinates: segment });
            }
            segment = [];
          }
        }
        if (segment.length >= 2) {
          clipped.push({ name: river.name, coordinates: segment });
        }
      }
      
      // Merge segments of same river that are close together
      const merged: RiverSegment[] = [];
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
      
      // Simplify: target 100-300 points for major rivers
      const simplified = merged.map(r => {
        // Adaptive epsilon based on segment length
        const len = r.coordinates.length;
        let epsilon = 0.005; // very fine
        if (len > 300) epsilon = 0.02;
        else if (len > 200) epsilon = 0.01;
        else if (len > 100) epsilon = 0.005;
        
        const simpl = simplify(r.coordinates, epsilon);
        return { name: r.name, coordinates: simpl };
      }).filter(r => r.coordinates.length >= 3); // Drop tiny fragments
      
      // Round to 2 decimals
      const rounded = simplified.map(r => ({
        name: r.name,
        coordinates: r.coordinates.map(([lng, lat]) => [
          Math.round(lng * 100) / 100,
          Math.round(lat * 100) / 100,
        ] as [number, number]),
      }));
      
      // Deduplicate consecutive identical points
      const deduped = rounded.map(r => {
        const coords: [number, number][] = [r.coordinates[0]];
        for (let i = 1; i < r.coordinates.length; i++) {
          const prev = coords[coords.length - 1];
          const cur = r.coordinates[i];
          if (prev[0] !== cur[0] || prev[1] !== cur[1]) {
            coords.push(cur);
          }
        }
        return { name: r.name, coordinates: coords };
      }).filter(r => r.coordinates.length >= 3);
      
      const totalCoords = deduped.reduce((s, r) => s + r.coordinates.length, 0);
      console.log(`${countryId}: ${deduped.length} segments, ${totalCoords} total coords`);
      for (const r of deduped) {
        console.log(`  ${r.name}: ${r.coordinates.length} points`);
      }
      
      const outPath = path.resolve(__dirname, `../data/rivers-${countryId}.json`);
      const jsonStr = JSON.stringify(deduped);
      fs.writeFileSync(outPath, jsonStr);
      console.log(`RIVER_JSON_${countryId.toUpperCase()}:${jsonStr}`);
      console.log(`Wrote ${outPath} (${jsonStr.length} bytes)`);
    });
  }
});
