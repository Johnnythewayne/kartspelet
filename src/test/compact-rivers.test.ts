import { describe, it } from "vitest";
import fs from "fs";
import path from "path";

const BOUNDS = {
  germany: { minLat: 47.27, maxLat: 55.06, minLng: 5.87, maxLng: 15.04 },
  sweden: { minLat: 55.2, maxLat: 69.2, minLng: 10.9, maxLng: 24.2 },
  uganda: { minLat: -1.5, maxLat: 4.3, minLng: 29.5, maxLng: 35.1 },
};

describe("Compact rivers for target countries", () => {
  it("filters, reduces precision, and splits into chunks", () => {
    const jsonPath = path.resolve(__dirname, "../data/rivers-hires.json");
    const data: { name: string; coordinates: [number, number][] }[] = JSON.parse(
      fs.readFileSync(jsonPath, "utf-8")
    );

    const margin = 0.5;
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
    
    // Reduce to 2 decimal places
    const compact = filtered.map(r => ({
      name: r.name,
      coordinates: r.coordinates.map(([lng, lat]) => [
        Math.round(lng * 100) / 100,
        Math.round(lat * 100) / 100
      ] as [number, number])
    }));

    // Deduplicate consecutive identical points
    const deduped = compact.map(r => {
      const coords: [number, number][] = [r.coordinates[0]];
      for (let i = 1; i < r.coordinates.length; i++) {
        const prev = coords[coords.length - 1];
        const cur = r.coordinates[i];
        if (prev[0] !== cur[0] || prev[1] !== cur[1]) {
          coords.push(cur);
        }
      }
      return { name: r.name, coordinates: coords };
    }).filter(r => r.coordinates.length >= 2);

    const totalCoords = deduped.reduce((s, r) => s + r.coordinates.length, 0);
    const json = JSON.stringify(deduped);
    
    console.log(`Segments: ${deduped.length}, Coords: ${totalCoords}, Size: ${json.length} bytes`);
    
    // Victoria Nile stats
    const vn = deduped.filter(r => r.name === "Victoria Nile");
    console.log(`Victoria Nile: ${vn.length} segments, ${vn.reduce((s, r) => s + r.coordinates.length, 0)} coords`);

    // Split into chunks of ~50KB
    const chunkSize = 50000;
    const chunks: string[] = [];
    let current = "";
    for (const seg of deduped) {
      const entry = JSON.stringify(seg);
      if (current.length + entry.length > chunkSize && current.length > 0) {
        chunks.push(current);
        current = entry;
      } else {
        current = current ? current + "," + entry : entry;
      }
    }
    if (current) chunks.push(current);

    console.log(`Split into ${chunks.length} chunks`);
    for (let i = 0; i < chunks.length; i++) {
      const chunkPath = path.resolve(__dirname, `../../tmp/rivers-compact-${i}.txt`);
      fs.writeFileSync(chunkPath, chunks[i]);
      console.log(`Chunk ${i}: ${chunks[i].length} bytes`);
    }
  });
});
