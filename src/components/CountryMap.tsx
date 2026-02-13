import React, { useRef, useMemo } from "react";
import germanyGeoJson from "@/data/germany-border.json";
import swedenGeoJson from "@/data/sweden-border.json";
import ugandaGeoJson from "@/data/uganda-border.json";
import { SWEDEN_LAKES } from "@/data/sweden-lakes";
import { UGANDA_LAKES } from "@/data/uganda-lakes";
import { getRiversForCountry, type RiverSegment } from "@/data/rivers";
import {
  GERMANY_NEIGHBOURS,
  SWEDEN_NEIGHBOURS,
  UGANDA_NEIGHBOURS,
} from "@/data/neighbour-borders";
import type { NeighbourBorder } from "@/data/neighbour-borders";
import type { CountryConfig } from "@/data/countries";

const geoJsonMap: Record<string, unknown> = {
  germany: germanyGeoJson,
  sweden: swedenGeoJson,
  uganda: ugandaGeoJson,
};

const neighboursMap: Record<string, NeighbourBorder[]> = {
  germany: GERMANY_NEIGHBOURS,
  sweden: SWEDEN_NEIGHBOURS,
  uganda: UGANDA_NEIGHBOURS,
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
  const lakes = countryId === "sweden" ? SWEDEN_LAKES : countryId === "uganda" ? UGANDA_LAKES : [];

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
          fill="hsl(0, 0%, 92%)"
          stroke="hsl(0, 0%, 70%)"
          strokeWidth="1.5"
        />
      ))}

      {/* Main country shape */}
      <path
        d={path}
        fill="hsl(142, 40%, 90%)"
        stroke="hsl(142, 30%, 50%)"
        strokeWidth="3"
      />

      {/* Lakes */}
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
            fill="hsl(210, 50%, 82%)"
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
            stroke="hsl(210, 50%, 70%)"
            strokeWidth="2.5"
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
