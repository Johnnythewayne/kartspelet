export interface RiverSegment {
  name: string;
  coordinates: [number, number][];
}

// Per-country river data - loaded on demand
// Data from Natural Earth 10m rivers, 2-decimal precision

export const GERMANY_RIVERS: RiverSegment[] = [];
export const SWEDEN_RIVERS: RiverSegment[] = [];
export const NORWAY_RIVERS: RiverSegment[] = [];
export const UGANDA_RIVERS: RiverSegment[] = [];
export const MYANMAR_RIVERS: RiverSegment[] = [];

// Populated at module load via JSON imports
import germanyRivers from "./rivers-germany.json";
import swedenRivers from "./rivers-sweden.json";
import norwayRivers from "./rivers-norway.json";
import ugandaRivers from "./rivers-uganda.json";
import myanmarRivers from "./rivers-myanmar.json";

function validateRivers(data: unknown, label: string): RiverSegment[] {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn(`[data-guard] ${label} river data is empty or invalid — map will render without rivers`);
    return [];
  }
  const valid = data.filter(
    (r: any) => r && typeof r.name === "string" && Array.isArray(r.coordinates) && r.coordinates.length >= 2
  );
  if (valid.length < data.length) {
    console.warn(`[data-guard] ${label}: filtered ${data.length - valid.length} invalid river segments`);
  }
  return valid as RiverSegment[];
}

(GERMANY_RIVERS as RiverSegment[]).push(...validateRivers(germanyRivers, "Germany"));
(SWEDEN_RIVERS as RiverSegment[]).push(...validateRivers(swedenRivers, "Sweden"));
(NORWAY_RIVERS as RiverSegment[]).push(...validateRivers(norwayRivers, "Norway"));
(UGANDA_RIVERS as RiverSegment[]).push(...validateRivers(ugandaRivers, "Uganda"));
(MYANMAR_RIVERS as RiverSegment[]).push(...validateRivers(myanmarRivers, "Myanmar"));

const RIVERS_MAP: Record<string, RiverSegment[]> = {
  germany: GERMANY_RIVERS,
  sweden: SWEDEN_RIVERS,
  norway: NORWAY_RIVERS,
  uganda: UGANDA_RIVERS,
  myanmar: MYANMAR_RIVERS,
};

export function getRiversForCountry(countryId: string): RiverSegment[] {
  return RIVERS_MAP[countryId] || [];
}
