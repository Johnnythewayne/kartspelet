import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

describe("Assemble rivers file", () => {
  it("reads parts and writes final TS file", () => {
    const parts = [0, 1, 2].map(i => 
      fs.readFileSync(path.resolve(__dirname, `../../tmp/rivers-part${i}.txt`), "utf-8")
    );
    
    const allRivers = parts.join(",\n");
    
    const tsContent = `// Auto-generated from Natural Earth 10m rivers - maximum resolution
// Do not edit manually

export interface RiverSegment {
  name: string;
  coordinates: [number, number][]; // [lng, lat]
}

export const GLOBAL_RIVERS: RiverSegment[] = [
${allRivers}
];
`;

    const outPath = path.resolve(__dirname, "../data/rivers-hires.ts");
    fs.writeFileSync(outPath, tsContent);
    console.log(`Successfully wrote ${tsContent.length} bytes to ${outPath}`);
  });
});
