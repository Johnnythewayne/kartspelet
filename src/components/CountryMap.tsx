import React, { useRef } from "react";
import germanyGeoJson from "@/data/germany-border.json";
import swedenGeoJson from "@/data/sweden-border.json";
import ugandaGeoJson from "@/data/uganda-border.json";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";
import ugandaLakesJson from "@/data/uganda-lakes.json";
import type { UgandaLakeData } from "@/data/uganda-lakes";
import type { CountryConfig } from "@/data/countries";

const geoJsonMap: Record<string, unknown> = {
  germany: germanyGeoJson,
  sweden: swedenGeoJson,
  uganda: ugandaGeoJson,
};

function geoJsonToSvgPath(countryId: string, bounds: CountryConfig["bounds"], svgHeight: number): string {
  const geoJson = geoJsonMap[countryId] as any;
  if (!geoJson) return "";
  const feature = geoJson.features[0];
  const geometry = feature.geometry;
  const coordsList: number[][][] =
    geometry.type === "MultiPolygon"
      ? geometry.coordinates.map((poly: number[][][]) => poly[0])
      : [geometry.coordinates[0]];

  const lngRange = bounds.maxLng - bounds.minLng;
  const latRange = bounds.maxLat - bounds.minLat;

  return coordsList
    .map((coords: number[][]) => {
      const points = coords.map(([lng, lat]) => {
        const x = ((lng - bounds.minLng) / lngRange) * 1000;
        const y = ((bounds.maxLat - lat) / latRange) * svgHeight;
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

      <path
        d={path}
        fill="hsl(142, 40%, 90%)"
        stroke="hsl(142, 30%, 50%)"
        strokeWidth="3"
      />

      {(countryId === "sweden" ? SWEDEN_LAKES : countryId === "uganda" ? (ugandaLakesJson as UgandaLakeData[]) : []).map((lake) => {
        const lngRange = bounds.maxLng - bounds.minLng;
        const latRange = bounds.maxLat - bounds.minLat;
        const points = lake.coordinates.map(([lng, lat]) => {
          const x = ((lng - bounds.minLng) / lngRange) * 1000;
          const y = ((bounds.maxLat - lat) / latRange) * svgHeight;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        const d = `M ${points[0]} L ${points.slice(1).join(" ")} Z`;
        return (
          <path
            key={lake.name}
            d={d}
            fill="hsl(210, 50%, 82%)"
            stroke="hsl(210, 40%, 65%)"
            strokeWidth="1.5"
          />
        );
      })}

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

      {guessMarker && (
        <g>
          <circle cx={guessMarker.x} cy={guessMarker.y} r="12" fill="hsl(0, 84%, 60%)" opacity="0.3" />
          <circle cx={guessMarker.x} cy={guessMarker.y} r="6" fill="hsl(0, 84%, 50%)" stroke="white" strokeWidth="2" />
        </g>
      )}

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
