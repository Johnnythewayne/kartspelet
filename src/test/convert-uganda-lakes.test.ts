import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Convert Uganda lakes JSON to TS", () => {
  it("should write inline TS file", () => {
    const jsonPath = path.resolve(__dirname, "../../src/data/uganda-lakes.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    
    const tsContent = `// Uganda lakes - high-resolution data from OpenStreetMap and Natural Earth
// Auto-generated - do not edit manually

export interface UgandaLakeData {
  name: string;
  coordinates: [number, number][];
}

export const UGANDA_LAKES: UgandaLakeData[] = ${JSON.stringify(jsonData)};
`;
    
    const tsPath = path.resolve(__dirname, "../../src/data/uganda-lakes.ts");
    fs.writeFileSync(tsPath, tsContent);
    
    expect(jsonData.length).toBe(5);
    console.log("Written uganda-lakes.ts with inline data");
  });
});
