import React, { useRef } from "react";

// Simplified Germany border path (SVG coordinates mapped to 0-1000 space)
const GERMANY_PATH = `M 445,20 L 480,25 520,15 560,30 600,20 640,35 680,25 720,40 
  750,60 770,80 800,70 830,90 850,110 870,100 900,120 920,140 
  910,170 930,200 950,220 940,250 960,280 950,310 970,340 
  960,370 940,400 960,430 950,460 970,490 960,520 940,540 
  920,570 900,590 870,610 850,640 830,660 800,680 780,710 
  760,740 730,760 700,780 670,800 640,820 610,850 580,870 
  550,890 520,910 490,920 460,930 430,940 400,950 370,960 
  340,950 310,940 280,920 250,900 230,870 210,840 190,810 
  170,780 160,750 150,720 140,690 130,660 120,630 110,600 
  100,570 90,540 85,510 80,480 75,450 80,420 90,390 
  100,360 110,330 120,300 130,270 140,240 150,210 160,180 
  170,150 180,130 200,110 220,95 250,80 280,65 310,55 
  340,45 370,35 400,25 430,20 445,20Z`;

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
