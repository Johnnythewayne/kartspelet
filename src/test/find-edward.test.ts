import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Find Lake Edward in Natural Earth data", () => {
  it("should find Uganda lakes in ne_10m_lakes", () => {
    const raw = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../tmp/ne_10m_lakes.geojson"), "utf-8")
    );
    
    const ugandaLakes = raw.features.filter((f: any) => {
      const name = f.properties?.name || f.properties?.NAME || "";
      return name.includes("Edward") || name.includes("George") || name.includes("Albert") || name.includes("Victoria") || name.includes("Kyoga");
    });
    
    for (const f of ugandaLakes) {
      const name = f.properties?.name || f.properties?.NAME || "unknown";
      const geom = f.geometry;
      let pointCount = 0;
      if (geom.type === "Polygon") {
        pointCount = geom.coordinates[0].length;
      } else if (geom.type === "MultiPolygon") {
        pointCount = geom.coordinates.reduce((sum: number, poly: any) => sum + poly[0].length, 0);
      }
      console.log(`${name}: ${geom.type}, ${pointCount} points`);
    }
    
    expect(ugandaLakes.length).toBeGreaterThan(0);
  });
});
