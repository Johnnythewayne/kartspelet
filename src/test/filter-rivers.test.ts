import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

const BOUNDS = {
  germany: { minLat: 47.27, maxLat: 55.06, minLng: 5.87, maxLng: 15.04 },
  sweden: { minLat: 55.2, maxLat: 69.2, minLng: 10.9, maxLng: 24.2 },
  uganda: { minLat: -1.5, maxLat: 4.3, minLng: 29.5, maxLng: 35.1 },
};

describe("Filter rivers for target countries", () => {
  it("filters and reports stats", () => {
    const jsonPath = path.resolve(__dirname, "../data/rivers-hires.json");
    const data: { name: string; coordinates: [number, number][] }[] = JSON.parse(
      fs.readFileSync(jsonPath, "utf-8")
    );

    const margin = 1.0;
    const allBounds = Object.values(BOUNDS);

    function intersects(coords: [number, number][]): boolean {
      return coords.some(([lng, lat]) =>
        allBounds.some(
          (b) =>
            lng >= b.minLng - margin && lng <= b.maxLng + margin &&
            lat >= b.minLat - margin && lat <= b.maxLat + margin
        )
      );
    }

    const filtered = data.filter((r) => intersects(r.coordinates));
    const totalCoords = filtered.reduce((s, r) => s + r.coordinates.length, 0);
    
    console.log(`Original: ${data.length} segments, ${data.reduce((s, r) => s + r.coordinates.length, 0)} coords`);
    console.log(`Filtered: ${filtered.length} segments, ${totalCoords} coords`);
    
    // Victoria Nile stats
    const vn = filtered.filter(r => r.name === "Victoria Nile");
    console.log(`Victoria Nile segments: ${vn.length}, coords: ${vn.reduce((s, r) => s + r.coordinates.length, 0)}`);

    const json = JSON.stringify(filtered);
    console.log(`Filtered JSON size: ${json.length} bytes`);
    
    // Write filtered version
    const outPath = path.resolve(__dirname, "../data/rivers-filtered.json");
    fs.writeFileSync(outPath, json);
    console.log(`Wrote to ${outPath}`);
  });
});
