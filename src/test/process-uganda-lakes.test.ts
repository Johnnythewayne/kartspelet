import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Uganda's major lakes - approximate polygons from known geography
// These are simplified outlines focusing on the portions visible within Uganda's bounds

describe("Generate Uganda lakes", () => {
  it("should create lake data file", () => {
    // Lake Victoria (Uganda portion only - northern shore)
    // The lake extends into Kenya and Tanzania but we only show what's in Uganda bounds
    const victoriaUganda: [number, number][] = [
      [31.393, -1.05], [31.50, -1.10], [31.65, -1.07], [31.80, -1.05],
      [31.95, -0.98], [32.05, -0.95], [32.15, -0.93], [32.30, -0.92],
      [32.50, -0.95], [32.65, -0.93], [32.80, -0.90], [32.95, -0.88],
      [33.10, -0.88], [33.25, -0.95], [33.40, -1.00], [33.55, -1.05],
      [33.70, -1.10], [33.85, -1.00], [33.90, -0.95],
      // Now trace back along the Uganda-only portion (northern shore)
      [33.90, -0.90], [33.85, -0.70], [33.80, -0.55], [33.75, -0.40],
      [33.70, -0.30], [33.60, -0.20], [33.50, -0.15], [33.40, -0.10],
      [33.30, -0.08], [33.20, -0.05], [33.10, 0.00], [33.00, 0.05],
      [32.90, 0.10], [32.85, 0.18], [32.80, 0.25], [32.75, 0.30],
      [32.70, 0.32], [32.65, 0.35], [32.60, 0.37], [32.55, 0.38],
      [32.50, 0.37], [32.45, 0.35], [32.40, 0.32], [32.35, 0.28],
      [32.30, 0.22], [32.25, 0.15], [32.20, 0.10], [32.15, 0.05],
      [32.10, 0.00], [32.05, -0.08], [32.00, -0.15], [31.95, -0.20],
      [31.90, -0.28], [31.85, -0.35], [31.80, -0.45], [31.75, -0.55],
      [31.70, -0.60], [31.65, -0.65], [31.60, -0.70], [31.55, -0.78],
      [31.50, -0.85], [31.45, -0.90], [31.40, -0.95], [31.393, -1.05],
    ];

    // Lake Albert
    const albert: [number, number][] = [
      [30.45, 1.15], [30.50, 1.20], [30.55, 1.30], [30.58, 1.40],
      [30.60, 1.50], [30.62, 1.60], [30.65, 1.70], [30.68, 1.80],
      [30.72, 1.90], [30.75, 2.00], [30.78, 2.10], [30.82, 2.17],
      [30.88, 2.22], [30.92, 2.25], [30.95, 2.27],
      [30.98, 2.25], [31.00, 2.22], [31.05, 2.18], [31.10, 2.15],
      [31.15, 2.12], [31.18, 2.08], [31.20, 2.00], [31.22, 1.90],
      [31.23, 1.80], [31.22, 1.70], [31.20, 1.60], [31.18, 1.50],
      [31.15, 1.40], [31.10, 1.35], [31.05, 1.30], [31.00, 1.25],
      [30.95, 1.22], [30.88, 1.20], [30.80, 1.18], [30.72, 1.16],
      [30.65, 1.14], [30.55, 1.13], [30.45, 1.15],
    ];

    // Lake Edward
    const edward: [number, number][] = [
      [29.58, -0.35], [29.62, -0.30], [29.68, -0.25], [29.75, -0.22],
      [29.82, -0.20], [29.88, -0.18], [29.95, -0.17], [30.00, -0.18],
      [30.05, -0.20], [30.10, -0.22], [30.12, -0.25], [30.13, -0.30],
      [30.12, -0.35], [30.10, -0.40], [30.05, -0.45], [30.00, -0.48],
      [29.95, -0.50], [29.88, -0.52], [29.80, -0.53], [29.72, -0.50],
      [29.65, -0.47], [29.60, -0.43], [29.58, -0.35],
    ];

    // Lake George
    const george: [number, number][] = [
      [30.08, -0.02], [30.12, 0.00], [30.18, 0.02], [30.22, 0.03],
      [30.25, 0.02], [30.27, 0.00], [30.28, -0.03], [30.27, -0.06],
      [30.24, -0.09], [30.20, -0.10], [30.15, -0.10], [30.10, -0.08],
      [30.08, -0.05], [30.08, -0.02],
    ];

    // Lake Kyoga
    const kyoga: [number, number][] = [
      [32.20, 1.35], [32.30, 1.40], [32.40, 1.45], [32.50, 1.50],
      [32.60, 1.55], [32.70, 1.58], [32.80, 1.60], [32.90, 1.62],
      [33.00, 1.65], [33.10, 1.68], [33.20, 1.70], [33.30, 1.68],
      [33.40, 1.65], [33.45, 1.60], [33.45, 1.55], [33.40, 1.50],
      [33.30, 1.48], [33.20, 1.45], [33.10, 1.42], [33.00, 1.40],
      [32.90, 1.38], [32.80, 1.35], [32.70, 1.32], [32.60, 1.30],
      [32.50, 1.28], [32.40, 1.28], [32.30, 1.30], [32.20, 1.35],
    ];

    const lakes = [
      { name: "Lake Victoria", coordinates: victoriaUganda },
      { name: "Lake Albert", coordinates: albert },
      { name: "Lake Edward", coordinates: edward },
      { name: "Lake George", coordinates: george },
      { name: "Lake Kyoga", coordinates: kyoga },
    ];

    // Generate TypeScript
    const lines: string[] = [
      '// Uganda lakes - approximate polygons',
      '// Lake Victoria shows only the portion within Uganda bounds',
      '',
      'export interface UgandaLakeData {',
      '  name: string;',
      '  coordinates: [number, number][];',
      '}',
      '',
      'export const UGANDA_LAKES: UgandaLakeData[] = [',
    ];

    for (const lake of lakes) {
      const coordStr = lake.coordinates
        .map(([lng, lat]) => `[${lng},${lat}]`)
        .join(",");
      lines.push(`  { name: "${lake.name}", coordinates: [${coordStr}] },`);
    }
    lines.push('];');

    const outPath = path.resolve(__dirname, "../../src/data/uganda-lakes.ts");
    fs.writeFileSync(outPath, lines.join("\n"));

    const fileSize = fs.statSync(outPath).size;
    console.log(`Uganda lakes file: ${(fileSize / 1024).toFixed(1)} KB`);
    console.log(`Lakes: ${lakes.map(l => `${l.name} (${l.coordinates.length} pts)`).join(', ')}`);

    expect(lakes.length).toBe(5);
  });
});
