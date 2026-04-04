import React, { useRef, useMemo } from "react";
import germanyGeoJson from "@/data/germany-border.json";
import swedenGeoJson from "@/data/sweden-border.json";
import norwayGeoJson from "@/data/norway-border.json";
import ugandaGeoJson from "@/data/uganda-border.json";
import myanmarGeoJson from "@/data/myanmar-border.json";
import franceGeoJson from "@/data/france-border.json";
import englandGeoJson from "@/data/england-border.json";
import usaGeoJson from "@/data/usa-border.json";
import spainGeoJson from "@/data/spain-border.json";
import italyGeoJson from "@/data/italy-border.json";
import polandGeoJson from "@/data/poland-border.json";
import brazilGeoJson from "@/data/brazil-border.json";
import argentinaGeoJson from "@/data/argentina-border.json";
import indiaGeoJson from "@/data/india-border.json";
import chinaGeoJson from "@/data/china-border.json";
import australiaGeoJson from "@/data/australia-border.json";
import russiaGeoJson from "@/data/russia-border.json";
import ukraineGeoJson from "@/data/ukraine-border.json";
import finlandGeoJson from "@/data/finland-border.json";
import canadaGeoJson from "@/data/canada-border.json";
import mexicoGeoJson from "@/data/mexico-border.json";
import peruGeoJson from "@/data/peru-border.json";
import colombiaGeoJson from "@/data/colombia-border.json";
import boliviaGeoJson from "@/data/bolivia-border.json";
import venezuelaGeoJson from "@/data/venezuela-border.json";
import chileGeoJson from "@/data/chile-border.json";
import paraguayGeoJson from "@/data/paraguay-border.json";
import ecuadorGeoJson from "@/data/ecuador-border.json";
import guyanaGeoJson from "@/data/guyana-border.json";
import kazakhstanGeoJson from "@/data/kazakhstan-border.json";
import saudi_arabiaGeoJson from "@/data/saudi-arabia-border.json";
import iranGeoJson from "@/data/iran-border.json";
import mongoliaGeoJson from "@/data/mongolia-border.json";
import indonesiaGeoJson from "@/data/indonesia-border.json";
import pakistanGeoJson from "@/data/pakistan-border.json";
import turkeyGeoJson from "@/data/turkey-border.json";
import austriaGeoJson from "@/data/austria-border.json";
import denmarkGeoJson from "@/data/denmark-border.json";
import algeriaGeoJson from "@/data/algeria-border.json";
import dr_congoGeoJson from "@/data/dr-congo-border.json";
import sudanGeoJson from "@/data/sudan-border.json";
import libyaGeoJson from "@/data/libya-border.json";
import chadGeoJson from "@/data/chad-border.json";
import nigerGeoJson from "@/data/niger-border.json";
import angolaGeoJson from "@/data/angola-border.json";
import maliGeoJson from "@/data/mali-border.json";
import south_africaGeoJson from "@/data/south-africa-border.json";
import south_sudanGeoJson from "@/data/south-sudan-border.json";
import ethiopiaGeoJson from "@/data/ethiopia-border.json";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";
import { NORWAY_LAKES } from "@/data/norway-lakes";
import { UGANDA_LAKES } from "@/data/uganda-lakes";
import { FRANCE_LAKES } from "@/data/france-lakes";
import { ENGLAND_LAKES } from "@/data/england-lakes";
import { USA_LAKES } from "@/data/usa-lakes";
import { MYANMAR_LAKES } from "@/data/myanmar-lakes";
import { SPAIN_LAKES } from "@/data/spain-lakes";
import { ITALY_LAKES } from "@/data/italy-lakes";
import { POLAND_LAKES } from "@/data/poland-lakes";
import { BRAZIL_LAKES } from "@/data/brazil-lakes";
import { ARGENTINA_LAKES } from "@/data/argentina-lakes";
import { INDIA_LAKES } from "@/data/india-lakes";
import { CHINA_LAKES } from "@/data/china-lakes";
import { AUSTRALIA_LAKES } from "@/data/australia-lakes";
import { RUSSIA_LAKES } from "@/data/russia-lakes";
import { UKRAINE_LAKES } from "@/data/ukraine-lakes";
import { FINLAND_LAKES } from "@/data/finland-lakes";
import { CANADA_LAKES } from "@/data/canada-lakes";
import { MEXICO_LAKES } from "@/data/mexico-lakes";
import { PERU_LAKES } from "@/data/peru-lakes";
import { COLOMBIA_LAKES } from "@/data/colombia-lakes";
import { BOLIVIA_LAKES } from "@/data/bolivia-lakes";
import { VENEZUELA_LAKES } from "@/data/venezuela-lakes";
import { CHILE_LAKES } from "@/data/chile-lakes";
import { PARAGUAY_LAKES } from "@/data/paraguay-lakes";
import { ECUADOR_LAKES } from "@/data/ecuador-lakes";
import { GUYANA_LAKES } from "@/data/guyana-lakes";
import { KAZAKHSTAN_LAKES } from "@/data/kazakhstan-lakes";
import { SAUDI_ARABIA_LAKES } from "@/data/saudi-arabia-lakes";
import { IRAN_LAKES } from "@/data/iran-lakes";
import { MONGOLIA_LAKES } from "@/data/mongolia-lakes";
import { INDONESIA_LAKES } from "@/data/indonesia-lakes";
import { PAKISTAN_LAKES } from "@/data/pakistan-lakes";
import { TURKEY_LAKES } from "@/data/turkey-lakes";
import { AUSTRIA_LAKES } from "@/data/austria-lakes";
import { DENMARK_LAKES } from "@/data/denmark-lakes";
import { ALGERIA_LAKES } from "@/data/algeria-lakes";
import { DR_CONGO_LAKES } from "@/data/dr-congo-lakes";
import { SUDAN_LAKES } from "@/data/sudan-lakes";
import { LIBYA_LAKES } from "@/data/libya-lakes";
import { CHAD_LAKES } from "@/data/chad-lakes";
import { NIGER_LAKES } from "@/data/niger-lakes";
import { ANGOLA_LAKES } from "@/data/angola-lakes";
import { MALI_LAKES } from "@/data/mali-lakes";
import { SOUTH_AFRICA_LAKES } from "@/data/south-africa-lakes";
import { SOUTH_SUDAN_LAKES } from "@/data/south-sudan-lakes";
import { ETHIOPIA_LAKES } from "@/data/ethiopia-lakes";
import { getRiversForCountry, type RiverSegment } from "@/data/rivers";

import {
  GERMANY_NEIGHBOURS,
  SWEDEN_NEIGHBOURS,
  NORWAY_NEIGHBOURS,
  UGANDA_NEIGHBOURS,
  FRANCE_NEIGHBOURS,
  ENGLAND_NEIGHBOURS,
  USA_NEIGHBOURS,
  SPAIN_NEIGHBOURS,
  ITALY_NEIGHBOURS,
  POLAND_NEIGHBOURS,
  BRAZIL_NEIGHBOURS,
  ARGENTINA_NEIGHBOURS,
  INDIA_NEIGHBOURS,
  CHINA_NEIGHBOURS,
  AUSTRALIA_NEIGHBOURS,
  RUSSIA_NEIGHBOURS, UKRAINE_NEIGHBOURS, FINLAND_NEIGHBOURS, CANADA_NEIGHBOURS, MEXICO_NEIGHBOURS, PERU_NEIGHBOURS, COLOMBIA_NEIGHBOURS, BOLIVIA_NEIGHBOURS, VENEZUELA_NEIGHBOURS, CHILE_NEIGHBOURS, PARAGUAY_NEIGHBOURS, ECUADOR_NEIGHBOURS, GUYANA_NEIGHBOURS, KAZAKHSTAN_NEIGHBOURS, SAUDI_ARABIA_NEIGHBOURS, IRAN_NEIGHBOURS, MONGOLIA_NEIGHBOURS, INDONESIA_NEIGHBOURS, PAKISTAN_NEIGHBOURS, TURKEY_NEIGHBOURS, AUSTRIA_NEIGHBOURS, DENMARK_NEIGHBOURS, ALGERIA_NEIGHBOURS, DR_CONGO_NEIGHBOURS, SUDAN_NEIGHBOURS, LIBYA_NEIGHBOURS, CHAD_NEIGHBOURS, NIGER_NEIGHBOURS, ANGOLA_NEIGHBOURS, MALI_NEIGHBOURS, SOUTH_AFRICA_NEIGHBOURS, SOUTH_SUDAN_NEIGHBOURS,
} from "@/data/neighbour-borders";
import type { NeighbourBorder } from "@/data/neighbour-borders";
import type { CountryConfig } from "@/data/countries";

const geoJsonMap: Record<string, unknown> = {
  germany: germanyGeoJson,
  sweden: swedenGeoJson,
  norway: norwayGeoJson,
  uganda: ugandaGeoJson,
  myanmar: myanmarGeoJson,
  france: franceGeoJson,
  england: englandGeoJson,
  usa: usaGeoJson,
  spain: spainGeoJson,
  italy: italyGeoJson,
  poland: polandGeoJson,
  brazil: brazilGeoJson,
  argentina: argentinaGeoJson,
  india: indiaGeoJson,
  china: chinaGeoJson,
  australia: australiaGeoJson,
  russia: russiaGeoJson,
  ukraine: ukraineGeoJson,
  finland: finlandGeoJson,
  canada: canadaGeoJson,
  mexico: mexicoGeoJson,
  peru: peruGeoJson,
  colombia: colombiaGeoJson,
  bolivia: boliviaGeoJson,
  venezuela: venezuelaGeoJson,
  chile: chileGeoJson,
  paraguay: paraguayGeoJson,
  ecuador: ecuadorGeoJson,
  guyana: guyanaGeoJson,
  kazakhstan: kazakhstanGeoJson,
  saudi_arabia: saudi_arabiaGeoJson,
  iran: iranGeoJson,
  mongolia: mongoliaGeoJson,
  indonesia: indonesiaGeoJson,
  pakistan: pakistanGeoJson,
  turkey: turkeyGeoJson,
  austria: austriaGeoJson,
  denmark: denmarkGeoJson,
  algeria: algeriaGeoJson,
  dr_congo: dr_congoGeoJson,
  sudan: sudanGeoJson,
  libya: libyaGeoJson,
  chad: chadGeoJson,
  niger: nigerGeoJson,
  angola: angolaGeoJson,
  mali: maliGeoJson,
  south_africa: south_africaGeoJson,
  south_sudan: south_sudanGeoJson,
  ethiopia: ethiopiaGeoJson,
};

const neighboursMap: Record<string, NeighbourBorder[]> = {
  germany: GERMANY_NEIGHBOURS,
  sweden: SWEDEN_NEIGHBOURS,
  norway: NORWAY_NEIGHBOURS,
  uganda: UGANDA_NEIGHBOURS,
  myanmar: [],
  france: FRANCE_NEIGHBOURS,
  england: ENGLAND_NEIGHBOURS,
  usa: USA_NEIGHBOURS,
  spain: SPAIN_NEIGHBOURS,
  italy: ITALY_NEIGHBOURS,
  poland: POLAND_NEIGHBOURS,
  brazil: BRAZIL_NEIGHBOURS,
  argentina: ARGENTINA_NEIGHBOURS,
  india: INDIA_NEIGHBOURS,
  china: CHINA_NEIGHBOURS,
  australia: AUSTRALIA_NEIGHBOURS,
  russia: RUSSIA_NEIGHBOURS,
  ukraine: UKRAINE_NEIGHBOURS,
  finland: FINLAND_NEIGHBOURS,
  canada: CANADA_NEIGHBOURS,
  mexico: MEXICO_NEIGHBOURS,
  peru: PERU_NEIGHBOURS,
  colombia: COLOMBIA_NEIGHBOURS,
  bolivia: BOLIVIA_NEIGHBOURS,
  venezuela: VENEZUELA_NEIGHBOURS,
  chile: CHILE_NEIGHBOURS,
  paraguay: PARAGUAY_NEIGHBOURS,
  ecuador: ECUADOR_NEIGHBOURS,
  guyana: GUYANA_NEIGHBOURS,
  kazakhstan: KAZAKHSTAN_NEIGHBOURS,
  saudi_arabia: SAUDI_ARABIA_NEIGHBOURS,
  iran: IRAN_NEIGHBOURS,
  mongolia: MONGOLIA_NEIGHBOURS,
  indonesia: INDONESIA_NEIGHBOURS,
  pakistan: PAKISTAN_NEIGHBOURS,
  turkey: TURKEY_NEIGHBOURS,
  austria: AUSTRIA_NEIGHBOURS,
  denmark: DENMARK_NEIGHBOURS,
  algeria: ALGERIA_NEIGHBOURS,
  dr_congo: DR_CONGO_NEIGHBOURS,
  sudan: SUDAN_NEIGHBOURS,
  libya: LIBYA_NEIGHBOURS,
  chad: CHAD_NEIGHBOURS,
  niger: NIGER_NEIGHBOURS,
  angola: ANGOLA_NEIGHBOURS,
  mali: MALI_NEIGHBOURS,
  south_africa: SOUTH_AFRICA_NEIGHBOURS,
  south_sudan: SOUTH_SUDAN_NEIGHBOURS,
};

function coordToSvg(
  lng: number,
  lat: number,
  bounds: CountryConfig["bounds"],
  svgHeight: number
): { x: number; y: number } {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 1000;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * svgHeight;
  return { x, y };
}

function geoJsonToSvgPath(countryId: string, bounds: CountryConfig["bounds"], svgHeight: number): string {
  const geoJson = geoJsonMap[countryId] as any;
  if (!geoJson) return "";
  const feature = geoJson.features[0];
  const geometry = feature.geometry;
  const coordsList: number[][][] =
    geometry.type === "MultiPolygon"
      ? geometry.coordinates.map((poly: number[][][]) => poly[0])
      : [geometry.coordinates[0]];

  return coordsList
    .map((coords: number[][]) => {
      const points = coords.map(([lng, lat]) => {
        const { x, y } = coordToSvg(lng, lat, bounds, svgHeight);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      return `M ${points[0]} L ${points.slice(1).join(" ")} Z`;
    })
    .join(" ");
}

interface CountryMapProps {
  countryId: string;
  bounds: CountryConfig["bounds"];
  svgHeight: number;
  onMapClick: (x: number, y: number) => void;
  guessMarker?: { x: number; y: number } | null;
  correctMarker?: { x: number; y: number } | null;
  showResult: boolean;
  disabled: boolean;
}

const CountryMap: React.FC<CountryMapProps> = ({
  countryId,
  bounds,
  svgHeight,
  onMapClick,
  guessMarker,
  correctMarker,
  showResult,
  disabled,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const path = geoJsonToSvgPath(countryId, bounds, svgHeight);
  const neighbours = neighboursMap[countryId] || [];
  const countryPolygons = useMemo(() => {
    const geoJson = geoJsonMap[countryId] as any;
    if (!geoJson) return [];
    const feature = geoJson.features[0];
    const geometry = feature.geometry;
    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.map((poly: number[][][]) => poly[0] as [number, number][]);
    }
    return [geometry.coordinates[0] as [number, number][]];
  }, [countryId]);

  const clippedRivers = useMemo(() => {
    const countryRivers = getRiversForCountry(countryId);

    // Point-in-polygon (ray casting)
    function pointInPolygon(lng: number, lat: number, poly: [number, number][]): boolean {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    }

    function isInsideCountry(lng: number, lat: number): boolean {
      return countryPolygons.some((poly) => pointInPolygon(lng, lat, poly));
    }

    // Clip each river: split into segments inside the country
    const result: { name: string; coordinates: [number, number][] }[] = [];
    for (const river of countryRivers) {
      let segment: [number, number][] = [];
      for (const coord of river.coordinates) {
        if (isInsideCountry(coord[0], coord[1])) {
          segment.push(coord);
        } else {
          if (segment.length >= 2) {
            result.push({ name: river.name, coordinates: segment });
          }
          segment = [];
        }
      }
      if (segment.length >= 2) {
        result.push({ name: river.name, coordinates: segment });
      }
    }

    return result;
  }, [countryId, countryPolygons]);
  const lakesMap: Record<string, typeof SWEDEN_LAKES> = {
    sweden: SWEDEN_LAKES, norway: NORWAY_LAKES, uganda: UGANDA_LAKES,
    france: FRANCE_LAKES, england: ENGLAND_LAKES, usa: USA_LAKES,
    myanmar: MYANMAR_LAKES, spain: SPAIN_LAKES, italy: ITALY_LAKES,
    poland: POLAND_LAKES, brazil: BRAZIL_LAKES, argentina: ARGENTINA_LAKES,
    india: INDIA_LAKES, china: CHINA_LAKES, australia: AUSTRALIA_LAKES,
    russia: RUSSIA_LAKES, ukraine: UKRAINE_LAKES, finland: FINLAND_LAKES,
    canada: CANADA_LAKES, mexico: MEXICO_LAKES, peru: PERU_LAKES,
    colombia: COLOMBIA_LAKES, bolivia: BOLIVIA_LAKES, venezuela: VENEZUELA_LAKES,
    chile: CHILE_LAKES, paraguay: PARAGUAY_LAKES, ecuador: ECUADOR_LAKES,
    guyana: GUYANA_LAKES, kazakhstan: KAZAKHSTAN_LAKES, saudi_arabia: SAUDI_ARABIA_LAKES,
    iran: IRAN_LAKES, mongolia: MONGOLIA_LAKES, indonesia: INDONESIA_LAKES,
    pakistan: PAKISTAN_LAKES, turkey: TURKEY_LAKES, austria: AUSTRIA_LAKES,
    denmark: DENMARK_LAKES,
    algeria: ALGERIA_LAKES, dr_congo: DR_CONGO_LAKES, sudan: SUDAN_LAKES,
    libya: LIBYA_LAKES, chad: CHAD_LAKES, niger: NIGER_LAKES,
    angola: ANGOLA_LAKES, mali: MALI_LAKES, south_africa: SOUTH_AFRICA_LAKES,
    south_sudan: SOUTH_SUDAN_LAKES,
  };
  const lakes = lakesMap[countryId] || [];


  const neighbourPaths = useMemo(() => {
    return neighbours.map((nb) => {
      const d = nb.polygons
        .map((poly) => {
          const points = poly.map(([lng, lat]) => {
            const { x, y } = coordToSvg(lng, lat, bounds, svgHeight);
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          });
          return `M ${points[0]} L ${points.slice(1).join(" ")} Z`;
        })
        .join(" ");
      return { name: nb.name, d };
    });
  }, [neighbours, bounds, svgHeight]);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * svgHeight;
    onMapClick(x, y);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 1000 ${svgHeight}`}
      className="w-full max-w-lg mx-auto cursor-crosshair select-none"
      onClick={handleClick}
    >
      <rect width="1000" height={svgHeight} fill="hsl(210, 40%, 96%)" rx="12" />

      {/* Neighbouring country borders */}
      {neighbourPaths.map((nb) => (
        <path
          key={nb.name}
          d={nb.d}
          fill="hsl(0, 0%, 93%)"
          stroke="hsl(0, 0%, 75%)"
          strokeWidth={1}
        />
      ))}

      {/* Main country shape */}
      <path
        d={path}
        fill="hsl(142, 40%, 90%)"
        stroke="hsl(142, 30%, 50%)"
        strokeWidth="3"
      />


      {lakes.map((lake) => {
        const points = lake.coordinates.map(([lng, lat]) => {
          const { x, y } = coordToSvg(lng, lat, bounds, svgHeight);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        const d = `M ${points[0]} L ${points.slice(1).join(" ")} Z`;
        return (
          <path
            key={lake.name}
            d={d}
            fill="hsl(210, 60%, 80%)"
            stroke="hsl(210, 40%, 65%)"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Rivers */}
      {clippedRivers.map((river, idx) => {
        const points = river.coordinates.map(([lng, lat]) => {
          const { x, y } = coordToSvg(lng, lat, bounds, svgHeight);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        const d = `M ${points[0]} L ${points.slice(1).join(" ")}`;
        return (
          <path
            key={`${river.name}-${idx}`}
            d={d}
            fill="none"
            stroke="hsl(210, 60%, 55%)"
            strokeWidth={countryId === "usa" ? "1.5" : "3"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Result line */}
      {showResult && guessMarker && correctMarker && (
        <line
          x1={guessMarker.x}
          y1={guessMarker.y}
          x2={correctMarker.x}
          y2={correctMarker.y}
          stroke="hsl(0, 0%, 40%)"
          strokeWidth="2"
          strokeDasharray="8,4"
        >
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1s" repeatCount="indefinite" />
        </line>
      )}

      {/* Guess marker (red) */}
      {guessMarker && (
        <g>
          <circle cx={guessMarker.x} cy={guessMarker.y} r="12" fill="hsl(0, 84%, 60%)" opacity="0.3" />
          <circle cx={guessMarker.x} cy={guessMarker.y} r="6" fill="hsl(0, 84%, 50%)" stroke="white" strokeWidth="2" />
        </g>
      )}

      {/* Correct marker (green) */}
      {showResult && correctMarker && (
        <g>
          <circle cx={correctMarker.x} cy={correctMarker.y} r="12" fill="hsl(142, 71%, 45%)" opacity="0.3" />
          <circle cx={correctMarker.x} cy={correctMarker.y} r="6" fill="hsl(142, 71%, 35%)" stroke="white" strokeWidth="2" />
          <text x={correctMarker.x + 14} y={correctMarker.y + 5} fontSize="14" fontWeight="bold" fill="hsl(142, 71%, 25%)">
            ✓
          </text>
        </g>
      )}
    </svg>
  );
};

export default CountryMap;
