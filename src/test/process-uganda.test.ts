import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function dpSimplify(coords: number[][], tolerance: number): number[][] {
  if (coords.length <= 2) return coords;
  let maxDist = 0;
  let maxIdx = 0;
  const first = coords[0];
  const last = coords[coords.length - 1];
  for (let i = 1; i < coords.length - 1; i++) {
    const d = pointToLineDist(coords[i], first, last);
    if (d > maxDist) { maxDist = d; maxIdx = i; }
  }
  if (maxDist > tolerance) {
    const left = dpSimplify(coords.slice(0, maxIdx + 1), tolerance);
    const right = dpSimplify(coords.slice(maxIdx), tolerance);
    return [...left.slice(0, -1), ...right];
  }
  return [first, last];
}

function pointToLineDist(p: number[], a: number[], b: number[]): number {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.sqrt((p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.sqrt((p[0] - (a[0] + t * dx)) ** 2 + (p[1] - (a[1] + t * dy)) ** 2);
}

describe("Re-process Uganda border with higher resolution", () => {
  it("should match Germany/Sweden detail level", () => {
    // Check existing border sizes for reference
    const deBorder = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../src/data/germany-border.json"), "utf-8"));
    const seBorder = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../src/data/sweden-border.json"), "utf-8"));
    
    function countPoints(gj: any): number {
      const geom = gj.features[0].geometry;
      if (geom.type === "Polygon") return geom.coordinates[0].length;
      if (geom.type === "MultiPolygon") return geom.coordinates.reduce((s: number, p: any) => s + p[0].length, 0);
      return 0;
    }
    console.log(`Germany border: ${countPoints(deBorder)} points, ${(JSON.stringify(deBorder).length/1024).toFixed(1)} KB`);
    console.log(`Sweden border: ${countPoints(seBorder)} points, ${(JSON.stringify(seBorder).length/1024).toFixed(1)} KB`);

    // Re-process Uganda with much lower tolerance
    const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/gadm41_UGA_0.json"), "utf-8"));
    const feature = raw.features[0];
    const geometry = feature.geometry;

    let simplified: number[][][][] = [];
    if (geometry.type === "MultiPolygon") {
      simplified = geometry.coordinates.map((poly: number[][][]) =>
        poly.map((ring: number[][]) => {
          const s = dpSimplify(ring, 0.002); // much finer tolerance
          return s.map(([lng, lat]) => [
            Math.round(lng * 10000) / 10000,
            Math.round(lat * 10000) / 10000,
          ]);
        })
      );
    } else {
      simplified = [
        geometry.coordinates.map((ring: number[][]) => {
          const s = dpSimplify(ring, 0.002);
          return s.map(([lng, lat]) => [
            Math.round(lng * 10000) / 10000,
            Math.round(lat * 10000) / 10000,
          ]);
        }),
      ];
    }

    const totalPoints = simplified.reduce(
      (sum, poly) => sum + poly.reduce((s, ring) => s + ring.length, 0), 0
    );
    
    const output = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: { name: "Uganda" },
        geometry: {
          type: simplified.length > 1 ? "MultiPolygon" : "Polygon",
          coordinates: simplified.length > 1 ? simplified : simplified[0],
        },
      }],
    };

    const outPath = path.resolve(__dirname, "../../src/data/uganda-border.json");
    const json = JSON.stringify(output);
    fs.writeFileSync(outPath, json);

    console.log(`Uganda border: ${totalPoints} points, ${(json.length/1024).toFixed(1)} KB`);

    expect(totalPoints).toBeGreaterThan(500);
    expect(json.length).toBeLessThan(500 * 1024);
  });
});
