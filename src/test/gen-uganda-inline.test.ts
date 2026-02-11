import { describe, it } from "vitest";
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
    for (const poly of geom.coordinates) { if (poly[0].length > largest.length) largest = poly[0]; }
    return largest;
  }
  return null;
}

function findInNaturalEarth(name: string): number[][] | null {
  const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/ne_10m_lakes.geojson"), "utf-8"));
  const feature = raw.features.find((f: any) => (f.properties?.name || f.properties?.NAME || "") === name);
  if (!feature) return null;
  const geom = feature.geometry;
  if (geom.type === "Polygon") return geom.coordinates[0];
  return null;
}

function r(v: number) { return Math.round(v * 100000) / 100000; }

describe("Generate Uganda lakes TS inline", () => {
  it("should output TS content", () => {
    const lakes: { name: string; coordinates: [number, number][]; }[] = [];

    const vicRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-victoria.geojson"), "utf-8"));
    let vicCoords = extractOuterRing(vicRaw)!;
    vicCoords = vicCoords.filter(([lng, lat]) => lat >= -1.5 && lng >= 31.0 && lng <= 35.0);
    lakes.push({ name: "Lake Victoria", coordinates: dpSimplify(vicCoords, 0.004).map(([lng, lat]) => [r(lng), r(lat)]) });

    const albRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-albert.geojson"), "utf-8"));
    lakes.push({ name: "Lake Albert", coordinates: dpSimplify(extractOuterRing(albRaw)!, 0.002).map(([lng, lat]) => [r(lng), r(lat)]) });

    lakes.push({ name: "Lake Edward", coordinates: findInNaturalEarth("Lake Edward")!.map(([lng, lat]) => [r(lng), r(lat)]) });

    const geoRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-george.geojson"), "utf-8"));
    lakes.push({ name: "Lake George", coordinates: dpSimplify(extractOuterRing(geoRaw)!, 0.001).map(([lng, lat]) => [r(lng), r(lat)]) });

    const kyoRaw = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../tmp/lake-kyoga.geojson"), "utf-8"));
    lakes.push({ name: "Lake Kyoga", coordinates: dpSimplify(extractOuterRing(kyoRaw)!, 0.002).map(([lng, lat]) => [r(lng), r(lat)]) });

    // Build TS file content
    let ts = `// Uganda lakes - high-resolution data from OpenStreetMap and Natural Earth\n// Auto-generated inline data\n\nexport interface UgandaLakeData {\n  name: string;\n  coordinates: [number, number][];\n}\n\nexport const UGANDA_LAKES: UgandaLakeData[] = [\n`;
    
    for (const lake of lakes) {
      ts += `  { name: "${lake.name}", coordinates: [`;
      ts += lake.coordinates.map(c => `[${c[0]},${c[1]}]`).join(",");
      ts += `] },\n`;
    }
    ts += `];\n`;

    // Write to a tmp file we can read
    const outPath = path.resolve(__dirname, "../../tmp/uganda-lakes-inline.ts");
    fs.writeFileSync(outPath, ts);
    console.log(`Written ${ts.length} chars to ${outPath}`);
    for (const l of lakes) console.log(`${l.name}: ${l.coordinates.length} pts`);
  });
});
