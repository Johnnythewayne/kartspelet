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
export const RUSSIA_RIVERS: RiverSegment[] = [];
export const UKRAINE_RIVERS: RiverSegment[] = [];
export const FINLAND_RIVERS: RiverSegment[] = [];
export const CANADA_RIVERS: RiverSegment[] = [];
export const MEXICO_RIVERS: RiverSegment[] = [];
export const PERU_RIVERS: RiverSegment[] = [];
export const COLOMBIA_RIVERS: RiverSegment[] = [];
export const BOLIVIA_RIVERS: RiverSegment[] = [];
export const VENEZUELA_RIVERS: RiverSegment[] = [];
export const CHILE_RIVERS: RiverSegment[] = [];
export const PARAGUAY_RIVERS: RiverSegment[] = [];
export const ECUADOR_RIVERS: RiverSegment[] = [];
export const GUYANA_RIVERS: RiverSegment[] = [];
export const KAZAKHSTAN_RIVERS: RiverSegment[] = [];
export const SAUDI_ARABIA_RIVERS: RiverSegment[] = [];
export const IRAN_RIVERS: RiverSegment[] = [];
export const MONGOLIA_RIVERS: RiverSegment[] = [];
export const INDONESIA_RIVERS: RiverSegment[] = [];
export const PAKISTAN_RIVERS: RiverSegment[] = [];
export const TURKEY_RIVERS: RiverSegment[] = [];
export const AUSTRIA_RIVERS: RiverSegment[] = [];
export const DENMARK_RIVERS: RiverSegment[] = [];
export const ALGERIA_RIVERS: RiverSegment[] = [];
export const DR_CONGO_RIVERS: RiverSegment[] = [];
export const SUDAN_RIVERS: RiverSegment[] = [];
export const LIBYA_RIVERS: RiverSegment[] = [];
export const CHAD_RIVERS: RiverSegment[] = [];
export const NIGER_RIVERS: RiverSegment[] = [];
export const ANGOLA_RIVERS: RiverSegment[] = [];
export const MALI_RIVERS: RiverSegment[] = [];
export const SOUTH_AFRICA_RIVERS: RiverSegment[] = [];
export const SOUTH_SUDAN_RIVERS: RiverSegment[] = [];
export const ETHIOPIA_RIVERS: RiverSegment[] = [];

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
import russiaRivers from "./rivers-russia.json";
import ukraineRivers from "./rivers-ukraine.json";
import finlandRivers from "./rivers-finland.json";
import canadaRivers from "./rivers-canada.json";
import mexicoRivers from "./rivers-mexico.json";
import peruRivers from "./rivers-peru.json";
import colombiaRivers from "./rivers-colombia.json";
import boliviaRivers from "./rivers-bolivia.json";
import venezuelaRivers from "./rivers-venezuela.json";
import chileRivers from "./rivers-chile.json";
import paraguayRivers from "./rivers-paraguay.json";
import ecuadorRivers from "./rivers-ecuador.json";
import guyanaRivers from "./rivers-guyana.json";
import kazakhstanRivers from "./rivers-kazakhstan.json";
import saudi_arabiaRivers from "./rivers-saudi-arabia.json";
import iranRivers from "./rivers-iran.json";
import mongoliaRivers from "./rivers-mongolia.json";
import indonesiaRivers from "./rivers-indonesia.json";
import pakistanRivers from "./rivers-pakistan.json";
import turkeyRivers from "./rivers-turkey.json";
import austriaRivers from "./rivers-austria.json";
import denmarkRivers from "./rivers-denmark.json";
import algeriaRivers from "./rivers-algeria.json";
import dr_congoRivers from "./rivers-dr-congo.json";
import sudanRivers from "./rivers-sudan.json";
import libyaRivers from "./rivers-libya.json";
import chadRivers from "./rivers-chad.json";
import nigerRivers from "./rivers-niger.json";
import angolaRivers from "./rivers-angola.json";
import maliRivers from "./rivers-mali.json";
import south_africaRivers from "./rivers-south-africa.json";
import south_sudanRivers from "./rivers-south-sudan.json";
import ethiopiaRivers from "./rivers-ethiopia.json";

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
(RUSSIA_RIVERS as RiverSegment[]).push(...validateRivers(russiaRivers, "russia"));
(UKRAINE_RIVERS as RiverSegment[]).push(...validateRivers(ukraineRivers, "ukraine"));
(FINLAND_RIVERS as RiverSegment[]).push(...validateRivers(finlandRivers, "finland"));
(CANADA_RIVERS as RiverSegment[]).push(...validateRivers(canadaRivers, "canada"));
(MEXICO_RIVERS as RiverSegment[]).push(...validateRivers(mexicoRivers, "mexico"));
(PERU_RIVERS as RiverSegment[]).push(...validateRivers(peruRivers, "peru"));
(COLOMBIA_RIVERS as RiverSegment[]).push(...validateRivers(colombiaRivers, "colombia"));
(BOLIVIA_RIVERS as RiverSegment[]).push(...validateRivers(boliviaRivers, "bolivia"));
(VENEZUELA_RIVERS as RiverSegment[]).push(...validateRivers(venezuelaRivers, "venezuela"));
(CHILE_RIVERS as RiverSegment[]).push(...validateRivers(chileRivers, "chile"));
(PARAGUAY_RIVERS as RiverSegment[]).push(...validateRivers(paraguayRivers, "paraguay"));
(ECUADOR_RIVERS as RiverSegment[]).push(...validateRivers(ecuadorRivers, "ecuador"));
(GUYANA_RIVERS as RiverSegment[]).push(...validateRivers(guyanaRivers, "guyana"));
(KAZAKHSTAN_RIVERS as RiverSegment[]).push(...validateRivers(kazakhstanRivers, "kazakhstan"));
(SAUDI_ARABIA_RIVERS as RiverSegment[]).push(...validateRivers(saudi_arabiaRivers, "saudi-arabia"));
(IRAN_RIVERS as RiverSegment[]).push(...validateRivers(iranRivers, "iran"));
(MONGOLIA_RIVERS as RiverSegment[]).push(...validateRivers(mongoliaRivers, "mongolia"));
(INDONESIA_RIVERS as RiverSegment[]).push(...validateRivers(indonesiaRivers, "indonesia"));
(PAKISTAN_RIVERS as RiverSegment[]).push(...validateRivers(pakistanRivers, "pakistan"));
(TURKEY_RIVERS as RiverSegment[]).push(...validateRivers(turkeyRivers, "turkey"));
(AUSTRIA_RIVERS as RiverSegment[]).push(...validateRivers(austriaRivers, "austria"));
(DENMARK_RIVERS as RiverSegment[]).push(...validateRivers(denmarkRivers, "denmark"));
(ALGERIA_RIVERS as RiverSegment[]).push(...validateRivers(algeriaRivers, "algeria"));
(DR_CONGO_RIVERS as RiverSegment[]).push(...validateRivers(dr_congoRivers, "dr_congo"));
(SUDAN_RIVERS as RiverSegment[]).push(...validateRivers(sudanRivers, "sudan"));
(LIBYA_RIVERS as RiverSegment[]).push(...validateRivers(libyaRivers, "libya"));
(CHAD_RIVERS as RiverSegment[]).push(...validateRivers(chadRivers, "chad"));
(NIGER_RIVERS as RiverSegment[]).push(...validateRivers(nigerRivers, "niger"));
(ANGOLA_RIVERS as RiverSegment[]).push(...validateRivers(angolaRivers, "angola"));
(MALI_RIVERS as RiverSegment[]).push(...validateRivers(maliRivers, "mali"));
(SOUTH_AFRICA_RIVERS as RiverSegment[]).push(...validateRivers(south_africaRivers, "south_africa"));
(SOUTH_SUDAN_RIVERS as RiverSegment[]).push(...validateRivers(south_sudanRivers, "south_sudan"));
(ETHIOPIA_RIVERS as RiverSegment[]).push(...validateRivers(ethiopiaRivers, "ethiopia"));

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
  russia: RUSSIA_RIVERS,
  ukraine: UKRAINE_RIVERS,
  finland: FINLAND_RIVERS,
  canada: CANADA_RIVERS,
  mexico: MEXICO_RIVERS,
  peru: PERU_RIVERS,
  colombia: COLOMBIA_RIVERS,
  bolivia: BOLIVIA_RIVERS,
  venezuela: VENEZUELA_RIVERS,
  chile: CHILE_RIVERS,
  paraguay: PARAGUAY_RIVERS,
  ecuador: ECUADOR_RIVERS,
  guyana: GUYANA_RIVERS,
  kazakhstan: KAZAKHSTAN_RIVERS,
  saudi_arabia: SAUDI_ARABIA_RIVERS,
  iran: IRAN_RIVERS,
  mongolia: MONGOLIA_RIVERS,
  indonesia: INDONESIA_RIVERS,
  pakistan: PAKISTAN_RIVERS,
  turkey: TURKEY_RIVERS,
  austria: AUSTRIA_RIVERS,
  denmark: DENMARK_RIVERS,
  algeria: ALGERIA_RIVERS,
  dr_congo: DR_CONGO_RIVERS,
  sudan: SUDAN_RIVERS,
  libya: LIBYA_RIVERS,
  chad: CHAD_RIVERS,
  niger: NIGER_RIVERS,
  angola: ANGOLA_RIVERS,
  mali: MALI_RIVERS,
  south_africa: SOUTH_AFRICA_RIVERS,
  south_sudan: SOUTH_SUDAN_RIVERS,
  ethiopia: ETHIOPIA_RIVERS,
};

export function getRiversForCountry(countryId: string): RiverSegment[] {
  return RIVERS_MAP[countryId] || [];
}
