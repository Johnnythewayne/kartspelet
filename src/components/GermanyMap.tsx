import React, { useRef } from "react";

// Accurate Germany border path converted from real coordinates to 0-1000 SVG space
// Using bounds: lat 47.27-55.06, lng 5.87-15.04
const GERMANY_PATH = `M 96,189 L 161,172 310,153 333,150 357,149 338,88 347,76 303,30 378,31 390,35
  466,72 565,80 547,140 610,150 680,126 731,87 787,96 894,145 916,176
  946,209 931,249 954,295 956,349 941,384 960,424 968,452
  994,486 993,515 975,536
  921,551 892,569 838,578 779,597 741,608 702,623 678,615 665,623 686,634
  711,656 726,688 750,720 779,756 821,782 834,807 851,832 857,842
  857,855 780,874 778,924 777,943 751,953 689,968 655,970 573,985 545,986
  470,1000 423,967 402,965 391,959 328,951 294,959 223,963 187,967
  179,959 179,925 181,903 209,866 209,840 242,806 257,777
  228,768 193,759 153,763 125,755 105,750 78,748 71,754 54,721
  53,707 29,676 16,643 27,633 16,615 29,602 33,583 16,557 22,549
  10,515 0,489 22,465 33,449 38,425 95,412 89,396 96,371
  121,363 130,346 116,332 129,311 131,295 153,277 149,252 146,232 127,222
  116,208 96,189 Z`;

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
