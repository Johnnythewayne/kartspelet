import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

const BOUNDS: Record<string, { minLat: number; maxLat: number; minLng: number; maxLng: number }> = {
  germany: { minLat: 47.27, maxLat: 55.06, minLng: 5.87, maxLng: 15.04 },
  sweden: { minLat: 55.2, maxLat: 69.2, minLng: 10.9, maxLng: 24.2 },
  uganda: { minLat: -1.5, maxLat: 4.3, minLng: 29.5, maxLng: 35.1 },
};

describe("Split rivers by country", () => {
  it("outputs per-country TS arrays", () => {
    const jsonPath = path.resolve(__dirname, "../data/rivers-hires.json");
    const data: { name: string; coordinates: [number, number][] }[] = JSON.parse(
      fs.readFileSync(jsonPath, "utf-8")
    );

    for (const [country, b] of Object.entries(BOUNDS)) {
      const margin = 0.5;
      const filtered = data.filter(r =>
        r.coordinates.some(([lng, lat]) =>
          lng >= b.minLng - margin && lng <= b.maxLng + margin &&
          lat >= b.minLat - margin && lat <= b.maxLat + margin
        )
      );

      // Reduce precision to 2 decimals and deduplicate
      const compact = filtered.map(r => {
        const coords: [number, number][] = [];
        for (const [lng, lat] of r.coordinates) {
          const c: [number, number] = [Math.round(lng * 100) / 100, Math.round(lat * 100) / 100];
          if (coords.length === 0 || coords[coords.length - 1][0] !== c[0] || coords[coords.length - 1][1] !== c[1]) {
            coords.push(c);
          }
        }
        return { name: r.name, coordinates: coords };
      }).filter(r => r.coordinates.length >= 2);

      const totalCoords = compact.reduce((s, r) => s + r.coordinates.length, 0);
      const json = JSON.stringify(compact);
      console.log(`${country}: ${compact.length} segments, ${totalCoords} coords, ${json.length} bytes`);
      
      const outPath = path.resolve(__dirname, `../../tmp/rivers-${country}.json`);
      fs.writeFileSync(outPath, json);
    }
  });
});
