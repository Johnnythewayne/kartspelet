export interface RiverSegment {
  name: string;
  coordinates: [number, number][];
}

// Per-country river data - loaded on demand
// Data from Natural Earth 10m rivers, 2-decimal precision

export const GERMANY_RIVERS: RiverSegment[] = [];
export const SWEDEN_RIVERS: RiverSegment[] = [];
export const UGANDA_RIVERS: RiverSegment[] = [];

// Populated at module load via JSON imports
import germanyRivers from "./rivers-germany.json";
import swedenRivers from "./rivers-sweden.json";
import ugandaRivers from "./rivers-uganda.json";

(GERMANY_RIVERS as RiverSegment[]).push(...(germanyRivers as RiverSegment[]));
(SWEDEN_RIVERS as RiverSegment[]).push(...(swedenRivers as RiverSegment[]));
(UGANDA_RIVERS as RiverSegment[]).push(...(ugandaRivers as RiverSegment[]));

const RIVERS_MAP: Record<string, RiverSegment[]> = {
  germany: GERMANY_RIVERS,
  sweden: SWEDEN_RIVERS,
  uganda: UGANDA_RIVERS,
};

export function getRiversForCountry(countryId: string): RiverSegment[] {
  return RIVERS_MAP[countryId] || [];
}
