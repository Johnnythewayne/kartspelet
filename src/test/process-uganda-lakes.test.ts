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

function extractOuterRing(geojson: any): number[][] | null {
  const feature = geojson.features?.[0];
  if (!feature) return null;
  const geom = feature.geometry;
  if (!geom) return null;
  if (geom.type === "Polygon") return geom.coordinates[0];
  if (geom.type === "MultiPolygon") {
    let largest = geom.coordinates[0][0];
    for (const poly of geom.coordinates) {
      if (poly[0].length > largest.length) largest = poly[0];
    }
    return largest;
  }
  return null;
}

function findInNaturalEarth(name: string): number[][] | null {
  const raw = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../tmp/ne_10m_lakes.geojson"), "utf-8")
  );
  const feature = raw.features.find((f: any) => {
    const n = f.properties?.name || f.properties?.NAME || "";
    return n === name;
  });
  if (!feature) return null;
  const geom = feature.geometry;
  if (geom.type === "Polygon") return geom.coordinates[0];
  if (geom.type === "MultiPolygon") {
    let largest = geom.coordinates[0][0];
    for (const poly of geom.coordinates) {
      if (poly[0].length > largest.length) largest = poly[0];
    }
    return largest;
  }
  return null;
}

describe("Process Uganda lakes - final version", () => {
  it("should create high-res lake data combining OSM and Natural Earth", () => {
    const lakes: { name: string; coordinates: [number, number][]; }[] = [];

    // Lake Victoria from OSM (clipped to Uganda)
    {
      const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-victoria.geojson"), "utf-8"));
      let coords = extractOuterRing(raw)!;
      coords = coords.filter(([lng, lat]) => lat >= -1.5 && lng >= 31.0 && lng <= 35.0);
      const simplified = dpSimplify(coords, 0.004);
      lakes.push({
        name: "Lake Victoria",
        coordinates: simplified.map(([lng, lat]) => [Math.round(lng * 100000) / 100000, Math.round(lat * 100000) / 100000]),
      });
    }

    // Lake Albert from OSM
    {
      const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-albert.geojson"), "utf-8"));
      const coords = extractOuterRing(raw)!;
      const simplified = dpSimplify(coords, 0.002);
      lakes.push({
        name: "Lake Albert",
        coordinates: simplified.map(([lng, lat]) => [Math.round(lng * 100000) / 100000, Math.round(lat * 100000) / 100000]),
      });
    }

    // Lake Edward from Natural Earth (not available on Nominatim)
    {
      const coords = findInNaturalEarth("Lake Edward")!;
      // NE data is already reasonable resolution, keep as-is
      lakes.push({
        name: "Lake Edward",
        coordinates: coords.map(([lng, lat]) => [Math.round(lng * 100000) / 100000, Math.round(lat * 100000) / 100000]),
      });
    }

    // Lake George from OSM
    {
      const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-george.geojson"), "utf-8"));
      const coords = extractOuterRing(raw)!;
      const simplified = dpSimplify(coords, 0.001);
      lakes.push({
        name: "Lake George",
        coordinates: simplified.map(([lng, lat]) => [Math.round(lng * 100000) / 100000, Math.round(lat * 100000) / 100000]),
      });
    }

    // Lake Kyoga from OSM
    {
      const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-kyoga.geojson"), "utf-8"));
      const coords = extractOuterRing(raw)!;
      const simplified = dpSimplify(coords, 0.002);
      lakes.push({
        name: "Lake Kyoga",
        coordinates: simplified.map(([lng, lat]) => [Math.round(lng * 100000) / 100000, Math.round(lat * 100000) / 100000]),
      });
    }

    // Generate TypeScript
    const lines: string[] = [
      '// Uganda lakes - high-resolution data from OpenStreetMap and Natural Earth',
      '// Simplified with Douglas-Peucker algorithm',
      '',
      'export interface UgandaLakeData {',
      '  name: string;',
      '  coordinates: [number, number][];',
      '}',
      '',
      'export const UGANDA_LAKES: UgandaLakeData[] = [',
    ];

    for (const lake of lakes) {
      const coordStr = lake.coordinates.map(([lng, lat]) => `[${lng},${lat}]`).join(",");
      lines.push(`  { name: "${lake.name}", coordinates: [${coordStr}] },`);
    }
    lines.push('];');

    const outPath = path.resolve(__dirname, "../../src/data/uganda-lakes.ts");
    fs.writeFileSync(outPath, lines.join("\n"));

    const fileSize = fs.statSync(outPath).size;
    console.log(`\nOutput: ${(fileSize / 1024).toFixed(1)} KB`);
    for (const l of lakes) {
      console.log(`  ${l.name}: ${l.coordinates.length} points`);
    }

    expect(lakes.length).toBe(5);
    for (const l of lakes) {
      expect(l.coordinates.length).toBeGreaterThan(30);
    }
  });
});
