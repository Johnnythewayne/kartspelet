import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Process GADM level 0 data for all neighbouring countries.
 * - Clips to expanded map viewport (2° margin)
 * - Filters out tiny island polygons not visible at map scale
 * - Preserves full coordinate precision (4 decimal places = ~11m)
 * - Outputs per-country JSON files for the app
 */

interface NeighbourConfig {
  name: string;
  iso3: string;
}

const NEIGHBOURS: Record<string, NeighbourConfig[]> = {
  germany: [
    { name: "France", iso3: "FRA" },
    { name: "Poland", iso3: "POL" },
    { name: "Austria", iso3: "AUT" },
    { name: "Switzerland", iso3: "CHE" },
    { name: "Luxembourg", iso3: "LUX" },
    { name: "Belgium", iso3: "BEL" },
    { name: "Netherlands", iso3: "NLD" },
    { name: "Denmark", iso3: "DNK" },
    { name: "Czechia", iso3: "CZE" },
  ],
  sweden: [
    { name: "Norway", iso3: "NOR" },
    { name: "Denmark", iso3: "DNK" },
    { name: "Finland", iso3: "FIN" },
  ],
  uganda: [
    { name: "Tanzania", iso3: "TZA" },
    { name: "Dem. Rep. Congo", iso3: "COD" },
    { name: "Kenya", iso3: "KEN" },
    { name: "Burundi", iso3: "BDI" },
    { name: "Rwanda", iso3: "RWA" },
    { name: "S. Sudan", iso3: "SSD" },
  ],
};

const BOUNDS: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
  germany: { minLat: 47.27, maxLat: 55.06, minLng: 5.87, maxLng: 15.04 },
  sweden:  { minLat: 55.2,  maxLat: 69.2,  minLng: 10.9,  maxLng: 24.2 },
  uganda:  { minLat: -1.5,  maxLat: 4.3,   minLng: 29.5,  maxLng: 35.1 },
};

function extractPolygons(gadmJson: any): number[][][] {
  const feature = gadmJson.features[0];
  const geom = feature.geometry;
  if (geom.type === "MultiPolygon") {
    return geom.coordinates.map((poly: number[][][]) => poly[0]);
  }
  return [geom.coordinates[0]];
}

function polyBBox(poly: number[][]): { minLng: number; maxLng: number; minLat: number; maxLat: number } {
  let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
  for (const [lng, lat] of poly) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  }
  return { minLng, maxLng, minLat, maxLat };
}

function bboxOverlaps(a: ReturnType<typeof polyBBox>, b: ReturnType<typeof polyBBox>): boolean {
  return !(a.maxLng < b.minLng || a.minLng > b.maxLng || a.maxLat < b.minLat || a.minLat > b.maxLat);
}

function roundCoords(poly: number[][], precision: number): number[][] {
  const factor = Math.pow(10, precision);
  return poly.map(([lng, lat]) => [
    Math.round(lng * factor) / factor,
    Math.round(lat * factor) / factor,
  ]);
}

function dedup(poly: number[][]): number[][] {
  const result = [poly[0]];
  for (let i = 1; i < poly.length; i++) {
    const prev = result[result.length - 1];
    if (poly[i][0] !== prev[0] || poly[i][1] !== prev[1]) {
      result.push(poly[i]);
    }
  }
  return result;
}

// Douglas-Peucker simplification
function simplifyPoly(coords: number[][], epsilon: number): number[][] {
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
    const left = simplifyPoly(coords.slice(0, maxIdx + 1), epsilon);
    const right = simplifyPoly(coords.slice(maxIdx), epsilon);
    return [...left.slice(0, -1), ...right];
  }
  return [coords[0], coords[coords.length - 1]];
}

describe("Process GADM neighbours (optimized)", () => {
  it("processes all countries and writes JSON files", () => {
    const margin = 2; // degrees beyond map viewport
    // Minimum polygon extent in degrees to be visible at map scale
    // At ~1000px SVG width spanning ~10-15°, 0.03° ≈ 2-3 SVG pixels
    const minExtent = 0.03;

    for (const [countryId, neighbours] of Object.entries(NEIGHBOURS)) {
      const bounds = BOUNDS[countryId];
      const viewport = {
        minLng: bounds.minLng - margin,
        maxLng: bounds.maxLng + margin,
        minLat: bounds.minLat - margin,
        maxLat: bounds.maxLat + margin,
      };

      const results: { name: string; polygons: number[][][] }[] = [];
      
      console.log(`\n=== ${countryId.toUpperCase()} ===`);

      for (const nb of neighbours) {
        const gadmPath = path.resolve(__dirname, `../../tmp/gadm41_${nb.iso3}_0.json`);
        expect(fs.existsSync(gadmPath), `Missing: ${gadmPath}`).toBe(true);
        
        const gadmJson = JSON.parse(fs.readFileSync(gadmPath, "utf-8"));
        const allPolys = extractPolygons(gadmJson);
        
        // Adaptive epsilon: smaller countries near the target get finer detail
        const epsilon = 0.01; // ~1km - good visual quality at map scale
        
        const relevant = allPolys
          .map(poly => {
            const bbox = polyBBox(poly);
            if (!bboxOverlaps(bbox, viewport)) return null;
            const extent = Math.max(bbox.maxLng - bbox.minLng, bbox.maxLat - bbox.minLat);
            if (extent < minExtent && poly.length < 20) return null;
            // Simplify, round to 2 decimals, dedup
            const simplified = simplifyPoly(poly, epsilon);
            return dedup(roundCoords(simplified, 2));
          })
          .filter((p): p is number[][] => p !== null && p.length >= 3);
        
        const totalCoords = relevant.reduce((s, p) => s + p.length, 0);
        console.log(`  ${nb.name}: ${relevant.length} polygons, ${totalCoords} coords (from ${allPolys.length} total)`);
        
        if (relevant.length > 0) {
          results.push({ name: nb.name, polygons: relevant });
        }
      }

      // Write per-country JSON
      const jsonPath = path.resolve(__dirname, `../data/neighbours-${countryId}.json`);
      const json = JSON.stringify(results);
      fs.writeFileSync(jsonPath, json);
      
      const totalCoords = results.reduce((s, nb) => s + nb.polygons.reduce((s2, p) => s2 + p.length, 0), 0);
      console.log(`  → Wrote ${jsonPath} (${(json.length / 1024).toFixed(0)} KB, ${results.length} neighbours, ${totalCoords} total coords)`);
    }
  });
});
