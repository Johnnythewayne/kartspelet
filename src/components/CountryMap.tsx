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
} from "@/data/neighbour-borders";



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
  const lakes = countryId === "sweden" ? SWEDEN_LAKES : countryId === "norway" ? NORWAY_LAKES : countryId === "uganda" ? UGANDA_LAKES : countryId === "france" ? FRANCE_LAKES : countryId === "england" ? ENGLAND_LAKES : countryId === "usa" ? USA_LAKES : countryId === "myanmar" ? MYANMAR_LAKES : [];


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
