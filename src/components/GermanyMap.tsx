import React, { useRef } from "react";

// Germany border from Natural Earth GeoJSON, converted to 0-1000 SVG space
// Bounds: lat 47.27–55.06, lng 5.87–15.04
// Formula: x = ((lng - 5.87) / 9.17) * 1000, y = ((55.06 - lat) / 7.79) * 1000
const GERMANY_PATH = `M 441.9,9.9 L 443.8,59.5 554.0,89.4 552.8,135.0 663.6,110.9
  724.9,75.7 848.0,126.4 899.5,167.3 924.9,232.6 894.6,266.8
  934.1,312.6 961.1,381.3 952.6,425.6 997.3,507.5 948.6,520.9
  919.9,506.1 892.6,530.5 814.3,555.4 773.9,587.4 694.6,615.3
  713.7,653.4 725.2,707.5 780.8,738.4 842.4,793.6 803.9,852.8
  764.8,869.1 780.2,952.7 770.1,974.5 736.1,948.2 683.8,944.3
  605.8,967.3 509.6,961.8 494.1,995.7 438.9,960.0 406.0,967.1
  289.2,927.8 266.8,955.6 174.0,954.7 187.9,863.4 243.0,775.5
  86.0,751.8 34.5,718.2 40.6,661.9 18.9,633.0 31.2,546.3
  12.9,411.8 78.4,411.7 106.1,363.4 133.3,245.9 112.9,202.5
  134.1,175.3 225.3,168.3 245.5,196.6 319.5,133.4 294.6,85.3
  289.6,12.5 372.0,29.4 441.9,9.9 Z`;

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
