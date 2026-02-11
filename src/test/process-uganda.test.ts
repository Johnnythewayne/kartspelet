import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Process Uganda border", () => {
  it("should simplify GADM Uganda border to reasonable size", () => {
    const raw = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../tmp/gadm41_UGA_0.json"), "utf-8")
    );
    
    const feature = raw.features[0];
    const geometry = feature.geometry;
    
    // Douglas-Peucker simplification
    function dpSimplify(coords: number[][], tolerance: number): number[][] {
      if (coords.length <= 2) return coords;
      
      let maxDist = 0;
      let maxIdx = 0;
      const first = coords[0];
      const last = coords[coords.length - 1];
      
      for (let i = 1; i < coords.length - 1; i++) {
        const d = pointToLineDist(coords[i], first, last);
        if (d > maxDist) {
          maxDist = d;
          maxIdx = i;
        }
      }
      
      if (maxDist > tolerance) {
        const left = dpSimplify(coords.slice(0, maxIdx + 1), tolerance);
        const right = dpSimplify(coords.slice(maxIdx), tolerance);
        return [...left.slice(0, -1), ...right];
      }
      return [first, last];
    }
    
    function pointToLineDist(p: number[], a: number[], b: number[]): number {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const len2 = dx * dx + dy * dy;
      if (len2 === 0) return Math.sqrt((p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2);
      let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
      t = Math.max(0, Math.min(1, t));
      const px = a[0] + t * dx;
      const py = a[1] + t * dy;
      return Math.sqrt((p[0] - px) ** 2 + (p[1] - py) ** 2);
    }
    
    // Process each polygon ring
    let simplified: number[][][][] = [];
    if (geometry.type === "MultiPolygon") {
      simplified = geometry.coordinates.map((poly: number[][][]) =>
        poly.map((ring: number[][]) => {
          const s = dpSimplify(ring, 0.008);
          return s.map(([lng, lat]) => [
            Math.round(lng * 10000) / 10000,
            Math.round(lat * 10000) / 10000,
          ]);
        })
      );
    } else {
      simplified = [
        geometry.coordinates.map((ring: number[][]) => {
          const s = dpSimplify(ring, 0.008);
          return s.map(([lng, lat]) => [
            Math.round(lng * 10000) / 10000,
            Math.round(lat * 10000) / 10000,
          ]);
        }),
      ];
    }
    
    const totalPoints = simplified.reduce(
      (sum, poly) => sum + poly.reduce((s, ring) => s + ring.length, 0),
      0
    );
    
    console.log(`Uganda border: ${totalPoints} points after simplification`);
    
    const output = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Uganda" },
          geometry: {
            type: simplified.length > 1 ? "MultiPolygon" : "Polygon",
            coordinates: simplified.length > 1 ? simplified : simplified[0],
          },
        },
      ],
    };
    
    const outPath = path.resolve(__dirname, "../../src/data/uganda-border.json");
    fs.writeFileSync(outPath, JSON.stringify(output));
    
    const fileSize = fs.statSync(outPath).size;
    console.log(`File size: ${(fileSize / 1024).toFixed(1)} KB`);
    
    expect(totalPoints).toBeGreaterThan(100);
    expect(totalPoints).toBeLessThan(2000);
    expect(fileSize).toBeLessThan(200 * 1024);
  });
});
