import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

describe("Convert rivers TS to JSON", () => {
  it("extracts data array and writes JSON", () => {
    const tsPath = path.resolve(__dirname, "../data/rivers-hires.ts");
    const content = fs.readFileSync(tsPath, "utf-8");
    
    // Extract the array content between [ and ];
    const match = content.match(/GLOBAL_RIVERS:\s*RiverSegment\[\]\s*=\s*(\[[\s\S]*\]);/);
    if (!match) throw new Error("Could not find GLOBAL_RIVERS array");
    
    // The array content uses unquoted keys, convert to valid JSON
    let arrayStr = match[1];
    // Add quotes around property names: name: -> "name":
    arrayStr = arrayStr.replace(/\{name:/g, '{"name":');
    arrayStr = arrayStr.replace(/,coordinates:/g, ',"coordinates":');
    
    const data = JSON.parse(arrayStr);
    console.log(`Parsed ${data.length} river segments`);
    console.log(`Total coordinates: ${data.reduce((s: number, r: any) => s + r.coordinates.length, 0)}`);
    
    const jsonPath = path.resolve(__dirname, "../data/rivers-hires.json");
    fs.writeFileSync(jsonPath, JSON.stringify(data));
    
    const stats = fs.statSync(jsonPath);
    console.log(`Wrote ${stats.size} bytes to rivers-hires.json`);
  });
});
