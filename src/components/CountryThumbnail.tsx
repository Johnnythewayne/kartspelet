import React, { useMemo } from "react";
import germanyBorder from "@/data/germany-border.json";
import swedenBorder from "@/data/sweden-border.json";
import norwayBorder from "@/data/norway-border.json";
import ugandaBorder from "@/data/uganda-border.json";

const BORDERS: Record<string, number[][][]> = {
  germany: germanyBorder as number[][][],
  sweden: swedenBorder as number[][][],
  norway: norwayBorder as number[][][],
  uganda: ugandaBorder as number[][][],
};

interface Props {
  countryId: string;
  size?: number;
}

const CountryThumbnail: React.FC<Props> = ({ countryId, size = 40 }) => {
  const path = useMemo(() => {
    const rings = BORDERS[countryId];
    if (!rings) return "";

    // Find bounds
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const ring of rings) {
      for (const [lng, lat] of ring) {
        if (lng < minX) minX = lng;
        if (lng > maxX) maxX = lng;
        if (lat < minY) minY = lat;
        if (lat > maxY) maxY = lat;
      }
    }

    const w = maxX - minX || 1;
    const h = maxY - minY || 1;
    const padding = 2;
    const drawSize = size - padding * 2;
    const scale = Math.min(drawSize / w, drawSize / h);
    const offX = padding + (drawSize - w * scale) / 2;
    const offY = padding + (drawSize - h * scale) / 2;

    return rings
      .map((ring) => {
        const pts = ring.map(([lng, lat]) => {
          const x = offX + (lng - minX) * scale;
          const y = offY + (maxY - lat) * scale; // flip Y
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        return `M${pts.join("L")}Z`;
      })
      .join(" ");
  }, [countryId, size]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <path
        d={path}
        fill="hsl(var(--muted-foreground) / 0.2)"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="0.8"
      />
    </svg>
  );
};

export default CountryThumbnail;
