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
export const FRANCE_RIVERS: RiverSegment[] = [];
export const ENGLAND_RIVERS: RiverSegment[] = [];
export const USA_RIVERS: RiverSegment[] = [];
export const SPAIN_RIVERS: RiverSegment[] = [];
export const ITALY_RIVERS: RiverSegment[] = [];
export const POLAND_RIVERS: RiverSegment[] = [];
export const BRAZIL_RIVERS: RiverSegment[] = [];
export const ARGENTINA_RIVERS: RiverSegment[] = [];
export const INDIA_RIVERS: RiverSegment[] = [];
export const CHINA_RIVERS: RiverSegment[] = [];
export const AUSTRALIA_RIVERS: RiverSegment[] = [];

// Populated at module load via JSON imports
import germanyRivers from "./rivers-germany.json";
import swedenRivers from "./rivers-sweden.json";
import norwayRivers from "./rivers-norway.json";
import ugandaRivers from "./rivers-uganda.json";
import myanmarRivers from "./rivers-myanmar.json";
import franceRivers from "./rivers-france.json";
import englandRivers from "./rivers-england.json";
import usaRivers from "./rivers-usa.json";
import spainRivers from "./rivers-spain.json";
import italyRivers from "./rivers-italy.json";
import polandRivers from "./rivers-poland.json";
import brazilRivers from "./rivers-brazil.json";
import argentinaRivers from "./rivers-argentina.json";
import indiaRivers from "./rivers-india.json";
import chinaRivers from "./rivers-china.json";
import australiaRivers from "./rivers-australia.json";

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
(FRANCE_RIVERS as RiverSegment[]).push(...validateRivers(franceRivers, "France"));
(ENGLAND_RIVERS as RiverSegment[]).push(...validateRivers(englandRivers, "England"));
(USA_RIVERS as RiverSegment[]).push(...validateRivers(usaRivers, "USA"));
(SPAIN_RIVERS as RiverSegment[]).push(...validateRivers(spainRivers, "Spain"));
(ITALY_RIVERS as RiverSegment[]).push(...validateRivers(italyRivers, "Italy"));
(POLAND_RIVERS as RiverSegment[]).push(...validateRivers(polandRivers, "Poland"));
(BRAZIL_RIVERS as RiverSegment[]).push(...validateRivers(brazilRivers, "Brazil"));
(ARGENTINA_RIVERS as RiverSegment[]).push(...validateRivers(argentinaRivers, "Argentina"));
(INDIA_RIVERS as RiverSegment[]).push(...validateRivers(indiaRivers, "India"));
(CHINA_RIVERS as RiverSegment[]).push(...validateRivers(chinaRivers, "China"));
(AUSTRALIA_RIVERS as RiverSegment[]).push(...validateRivers(australiaRivers, "Australia"));

const RIVERS_MAP: Record<string, RiverSegment[]> = {
  germany: GERMANY_RIVERS,
  sweden: SWEDEN_RIVERS,
  norway: NORWAY_RIVERS,
  uganda: UGANDA_RIVERS,
  myanmar: MYANMAR_RIVERS,
  france: FRANCE_RIVERS,
  england: ENGLAND_RIVERS,
  usa: USA_RIVERS,
  spain: SPAIN_RIVERS,
  italy: ITALY_RIVERS,
  poland: POLAND_RIVERS,
  brazil: BRAZIL_RIVERS,
  argentina: ARGENTINA_RIVERS,
  india: INDIA_RIVERS,
  china: CHINA_RIVERS,
  australia: AUSTRALIA_RIVERS,
};

export function getRiversForCountry(countryId: string): RiverSegment[] {
  return RIVERS_MAP[countryId] || [];
}
