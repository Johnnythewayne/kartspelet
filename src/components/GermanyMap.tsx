import React, { useRef, useMemo } from "react";
import germanyGeoJson from "@/data/germany-border.json";

// Convert GeoJSON coordinates to SVG path
// Bounds: lat 47.27–55.06, lng 5.87–15.04
// Formula: x = ((lng - 5.87) / 9.17) * 1000, y = ((55.06 - lat) / 7.79) * 1000
function geoJsonToSvgPath(): string {
  const feature = germanyGeoJson.features[0];
  const geometry = feature.geometry;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const coordsList: number[][][] = (geometry as any).type === "MultiPolygon"
    ? (geometry as any).coordinates.map((poly: number[][][]) => poly[0])
    : [(geometry as any).coordinates[0]];

  return coordsList.map((coords: number[][]) => {
    const points = coords.map(([lng, lat]) => {
      const x = ((lng - 5.87) / 9.17) * 1000;
      const y = ((55.06 - lat) / 7.79) * 1000;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M ${points[0]} L ${points.slice(1).join(" ")} Z`;
  }).join(" ");
}

const GERMANY_PATH = geoJsonToSvgPath();

interface GermanyMapProps {
  onMapClick: (x: number, y: number) => void;
  guessMarker?: { x: number; y: number } | null;
  correctMarker?: { x: number; y: number } | null;
  showResult: boolean;
  disabled: boolean;
}

const GermanyMap: React.FC<GermanyMapProps> = ({
  onMapClick,
  guessMarker,
  correctMarker,
  showResult,
  disabled,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    const y = ((e.clientY - rect.top) / rect.height) * 1000;
    onMapClick(x, y);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 1000"
      className="w-full max-w-lg mx-auto cursor-crosshair select-none"
      onClick={handleClick}
      style={{ aspectRatio: "1/1" }}
    >
      {/* Background */}
      <rect width="1000" height="1000" fill="hsl(210, 40%, 96%)" rx="12" />

      {/* Germany shape */}
      <path
        d={GERMANY_PATH}
        fill="hsl(142, 40%, 90%)"
        stroke="hsl(142, 30%, 50%)"
        strokeWidth="3"
      />

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

export default GermanyMap;
