import React, { useMemo } from "react";
import germanyBorder from "@/data/germany-border.json";
import swedenBorder from "@/data/sweden-border.json";
import norwayBorder from "@/data/norway-border.json";
import ugandaBorder from "@/data/uganda-border.json";
import myanmarBorder from "@/data/myanmar-border.json";
import franceBorder from "@/data/france-border.json";
import englandBorder from "@/data/england-border.json";
import usaBorder from "@/data/usa-border.json";
import spainBorder from "@/data/spain-border.json";
import italyBorder from "@/data/italy-border.json";
import polandBorder from "@/data/poland-border.json";
import brazilBorder from "@/data/brazil-border.json";
import argentinaBorder from "@/data/argentina-border.json";
import indiaBorder from "@/data/india-border.json";
import chinaBorder from "@/data/china-border.json";
import australiaBorder from "@/data/australia-border.json";
import russiaBorder from "@/data/russia-border.json";
import ukraineBorder from "@/data/ukraine-border.json";
import finlandBorder from "@/data/finland-border.json";
import canadaBorder from "@/data/canada-border.json";
import mexicoBorder from "@/data/mexico-border.json";
import peruBorder from "@/data/peru-border.json";
import colombiaBorder from "@/data/colombia-border.json";
import boliviaBorder from "@/data/bolivia-border.json";
import venezuelaBorder from "@/data/venezuela-border.json";
import chileBorder from "@/data/chile-border.json";
import paraguayBorder from "@/data/paraguay-border.json";
import ecuadorBorder from "@/data/ecuador-border.json";
import guyanaBorder from "@/data/guyana-border.json";
import kazakhstanBorder from "@/data/kazakhstan-border.json";
import saudi_arabiaBorder from "@/data/saudi-arabia-border.json";
import iranBorder from "@/data/iran-border.json";
import mongoliaBorder from "@/data/mongolia-border.json";
import indonesiaBorder from "@/data/indonesia-border.json";
import pakistanBorder from "@/data/pakistan-border.json";
import turkeyBorder from "@/data/turkey-border.json";
import austriaBorder from "@/data/austria-border.json";
import denmarkBorder from "@/data/denmark-border.json";
import algeriaBorder from "@/data/algeria-border.json";
import dr_congoBorder from "@/data/dr-congo-border.json";
import sudanBorder from "@/data/sudan-border.json";
import libyaBorder from "@/data/libya-border.json";
import chadBorder from "@/data/chad-border.json";
import nigerBorder from "@/data/niger-border.json";
import angolaBorder from "@/data/angola-border.json";
import maliBorder from "@/data/mali-border.json";
import south_africaBorder from "@/data/south-africa-border.json";
import south_sudanBorder from "@/data/south-sudan-border.json";
import ethiopiaBorder from "@/data/ethiopia-border.json";
import philippinesBorder from "@/data/philippines-border.json";

function extractRings(geojson: any): number[][][] {
  const rings: number[][][] = [];
  for (const feature of geojson.features ?? []) {
    const geom = feature.geometry;
    if (geom.type === "Polygon") {
      rings.push(...geom.coordinates);
    } else if (geom.type === "MultiPolygon") {
      for (const poly of geom.coordinates) {
        rings.push(...poly);
      }
    }
  }
  return rings;
}

const BORDERS: Record<string, number[][][]> = {
  germany: extractRings(germanyBorder),
  sweden: extractRings(swedenBorder),
  norway: extractRings(norwayBorder),
  uganda: extractRings(ugandaBorder),
  myanmar: extractRings(myanmarBorder),
  france: extractRings(franceBorder),
  england: extractRings(englandBorder),
  usa: extractRings(usaBorder),
  spain: extractRings(spainBorder),
  italy: extractRings(italyBorder),
  poland: extractRings(polandBorder),
  brazil: extractRings(brazilBorder),
  argentina: extractRings(argentinaBorder),
  india: extractRings(indiaBorder),
  china: extractRings(chinaBorder),
  australia: extractRings(australiaBorder),
  russia: extractRings(russiaBorder),
  ukraine: extractRings(ukraineBorder),
  finland: extractRings(finlandBorder),
  canada: extractRings(canadaBorder),
  mexico: extractRings(mexicoBorder),
  peru: extractRings(peruBorder),
  colombia: extractRings(colombiaBorder),
  bolivia: extractRings(boliviaBorder),
  venezuela: extractRings(venezuelaBorder),
  chile: extractRings(chileBorder),
  paraguay: extractRings(paraguayBorder),
  ecuador: extractRings(ecuadorBorder),
  guyana: extractRings(guyanaBorder),
  kazakhstan: extractRings(kazakhstanBorder),
  saudi_arabia: extractRings(saudi_arabiaBorder),
  iran: extractRings(iranBorder),
  mongolia: extractRings(mongoliaBorder),
  indonesia: extractRings(indonesiaBorder),
  pakistan: extractRings(pakistanBorder),
  turkey: extractRings(turkeyBorder),
  austria: extractRings(austriaBorder),
  denmark: extractRings(denmarkBorder),
  algeria: extractRings(algeriaBorder),
  dr_congo: extractRings(dr_congoBorder),
  sudan: extractRings(sudanBorder),
  libya: extractRings(libyaBorder),
  chad: extractRings(chadBorder),
  niger: extractRings(nigerBorder),
  angola: extractRings(angolaBorder),
  mali: extractRings(maliBorder),
  south_africa: extractRings(south_africaBorder),
  south_sudan: extractRings(south_sudanBorder),
  ethiopia: extractRings(ethiopiaBorder),
};

interface Props {
  countryId: string;
  size?: number;
}

const CountryThumbnail: React.FC<Props> = ({ countryId, size = 40 }) => {
  const path = useMemo(() => {
    const rings = BORDERS[countryId];
    if (!rings || rings.length === 0) return "";

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
      .filter((ring) => ring.length > 10) // skip tiny islands
      .map((ring) => {
        const pts = ring.map(([lng, lat]) => {
          const x = offX + (lng - minX) * scale;
          const y = offY + (maxY - lat) * scale;
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
