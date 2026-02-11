import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Process GADM Uganda border to high-res GeoJSON", () => {
  it("should convert GADM MultiPolygon to simplified FeatureCollection", () => {
    const gadmPath = path.resolve(__dirname, "../../tmp/gadm41_UGA_0.json");
    const gadmData = JSON.parse(fs.readFileSync(gadmPath, "utf-8"));
    
    const feature = gadmData.features[0];
    const geometry = feature.geometry;
    
    // GADM uses MultiPolygon - flatten to get all polygon rings
    let allPolygons: number[][][][] = [];
    if (geometry.type === "MultiPolygon") {
      allPolygons = geometry.coordinates;
    } else if (geometry.type === "Polygon") {
      allPolygons = [geometry.coordinates];
    }
    
    console.log(`Total polygons: ${allPolygons.length}`);
    let totalPoints = 0;
    allPolygons.forEach((poly, i) => {
      console.log(`Polygon ${i}: ${poly[0].length} points (outer ring)`);
      totalPoints += poly[0].length;
    });
    console.log(`Total points: ${totalPoints}`);

    // Douglas-Peucker simplification
    function perpendicularDistance(point: number[], lineStart: number[], lineEnd: number[]): number {
      const dx = lineEnd[0] - lineStart[0];
      const dy = lineEnd[1] - lineStart[1];
      const mag = Math.sqrt(dx * dx + dy * dy);
      if (mag === 0) return Math.sqrt((point[0] - lineStart[0]) ** 2 + (point[1] - lineStart[1]) ** 2);
      const u = ((point[0] - lineStart[0]) * dx + (point[1] - lineStart[1]) * dy) / (mag * mag);
      const closestX = lineStart[0] + u * dx;
      const closestY = lineStart[1] + u * dy;
      return Math.sqrt((point[0] - closestX) ** 2 + (point[1] - closestY) ** 2);
    }

    function douglasPeucker(points: number[][], epsilon: number): number[][] {
      if (points.length <= 2) return points;
      let maxDist = 0;
      let maxIdx = 0;
      for (let i = 1; i < points.length - 1; i++) {
        const d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
        if (d > maxDist) {
          maxDist = d;
          maxIdx = i;
        }
      }
      if (maxDist > epsilon) {
        const left = douglasPeucker(points.slice(0, maxIdx + 1), epsilon);
        const right = douglasPeucker(points.slice(maxIdx), epsilon);
        return [...left.slice(0, -1), ...right];
      }
      return [points[0], points[points.length - 1]];
    }

    // Use a small epsilon to keep high resolution but reduce extreme detail
    const epsilon = 0.005; // ~500m precision
    
    const simplifiedPolygons = allPolygons.map(poly => {
      const outerRing = douglasPeucker(poly[0], epsilon);
      // Round to 4 decimal places
      const rounded = outerRing.map(([lng, lat]) => [
        Math.round(lng * 10000) / 10000,
        Math.round(lat * 10000) / 10000,
      ]);
      return [rounded];
    });

    let simplifiedTotal = 0;
    simplifiedPolygons.forEach((poly, i) => {
      console.log(`Simplified polygon ${i}: ${poly[0].length} points`);
      simplifiedTotal += poly[0].length;
    });
    console.log(`Simplified total: ${simplifiedTotal}`);

    const outputGeoJson = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: { name: "Uganda" },
        geometry: {
          type: simplifiedPolygons.length > 1 ? "MultiPolygon" : "Polygon",
          coordinates: simplifiedPolygons.length > 1 ? simplifiedPolygons : simplifiedPolygons[0],
        },
      }],
    };

    const outputPath = path.resolve(__dirname, "../data/uganda-border.json");
    const outputStr = JSON.stringify(outputGeoJson);
    fs.writeFileSync(outputPath, outputStr);
    
    console.log(`Output size: ${outputStr.length} bytes`);
    console.log(`OUTPUT_START${outputStr}OUTPUT_END`);
    
    // Verify it has significantly more points than 27
    expect(simplifiedTotal).toBeGreaterThan(100);
  });
});
