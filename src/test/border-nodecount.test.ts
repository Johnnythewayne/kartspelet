import { describe, it } from "vitest";
import swedenBorder from "@/data/sweden-border.json";
import germanyBorder from "@/data/germany-border.json";

function countBorderNodes(geo: any): number {
  const feature = geo.features[0];
  const geom = feature.geometry;

  if (geom.type === "Polygon") {
    // first ring
    return geom.coordinates[0].length;
  }

  if (geom.type === "MultiPolygon") {
    // sum first ring of each polygon
    return geom.coordinates.reduce((sum: number, poly: any) => sum + (poly?.[0]?.length ?? 0), 0);
  }

  return 0;
}

describe("Border node counts", () => {
  it("logs node counts for borders", () => {
    const swedenNodes = countBorderNodes(swedenBorder);
    const germanyNodes = countBorderNodes(germanyBorder);

    // eslint-disable-next-line no-console
    console.log("Sweden border nodes:", swedenNodes);
    // eslint-disable-next-line no-console
    console.log("Germany border nodes:", germanyNodes);
  });
});
