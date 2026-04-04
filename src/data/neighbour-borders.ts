export interface NeighbourBorder {
  name: string;
  polygons: number[][][]; // [lng, lat][][]
}

import germanyNeighbours from "./neighbours-germany.json";
import swedenNeighbours from "./neighbours-sweden.json";
import norwayNeighbours from "./neighbours-norway.json";
import ugandaNeighbours from "./neighbours-uganda.json";
import franceNeighbours from "./neighbours-france.json";
import englandNeighbours from "./neighbours-england.json";
import usaNeighbours from "./neighbours-usa.json";
import spainNeighbours from "./neighbours-spain.json";
import italyNeighbours from "./neighbours-italy.json";
import polandNeighbours from "./neighbours-poland.json";
import brazilNeighbours from "./neighbours-brazil.json";
import argentinaNeighbours from "./neighbours-argentina.json";
import indiaNeighbours from "./neighbours-india.json";
import chinaNeighbours from "./neighbours-china.json";
import australiaNeighbours from "./neighbours-australia.json";
import russiaNeighbours from "./neighbours-russia.json";
import ukraineNeighbours from "./neighbours-ukraine.json";
import finlandNeighbours from "./neighbours-finland.json";
import canadaNeighbours from "./neighbours-canada.json";
import mexicoNeighbours from "./neighbours-mexico.json";
import peruNeighbours from "./neighbours-peru.json";
import colombiaNeighbours from "./neighbours-colombia.json";
import boliviaNeighbours from "./neighbours-bolivia.json";
import venezuelaNeighbours from "./neighbours-venezuela.json";
import chileNeighbours from "./neighbours-chile.json";
import paraguayNeighbours from "./neighbours-paraguay.json";
import ecuadorNeighbours from "./neighbours-ecuador.json";
import guyanaNeighbours from "./neighbours-guyana.json";
import kazakhstanNeighbours from "./neighbours-kazakhstan.json";
import saudi_arabiaNeighbours from "./neighbours-saudi-arabia.json";
import iranNeighbours from "./neighbours-iran.json";
import mongoliaNeighbours from "./neighbours-mongolia.json";
import indonesiaNeighbours from "./neighbours-indonesia.json";
import pakistanNeighbours from "./neighbours-pakistan.json";
import turkeyNeighbours from "./neighbours-turkey.json";
import austriaNeighbours from "./neighbours-austria.json";
import denmarkNeighbours from "./neighbours-denmark.json";
import algeriaNeighbours from "./neighbours-algeria.json";
import dr_congoNeighbours from "./neighbours-dr-congo.json";
import sudanNeighbours from "./neighbours-sudan.json";
import libyaNeighbours from "./neighbours-libya.json";
import chadNeighbours from "./neighbours-chad.json";
import nigerNeighbours from "./neighbours-niger.json";
import angolaNeighbours from "./neighbours-angola.json";
import maliNeighbours from "./neighbours-mali.json";
import south_africaNeighbours from "./neighbours-south-africa.json";
import south_sudanNeighbours from "./neighbours-south-sudan.json";
import ethiopiaNeighbours from "./neighbours-ethiopia.json";

function validateNeighbours(data: unknown, label: string): NeighbourBorder[] {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn(`[data-guard] ${label} neighbour data is empty or invalid — map will render without borders`);
    return [];
  }
  const valid = data.filter(
    (nb: any) => nb && typeof nb.name === "string" && Array.isArray(nb.polygons) && nb.polygons.length > 0
  );
  if (valid.length < data.length) {
    console.warn(`[data-guard] ${label}: filtered ${data.length - valid.length} invalid neighbour entries`);
  }
  return valid as NeighbourBorder[];
}

export const GERMANY_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(germanyNeighbours, "Germany");
export const SWEDEN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(swedenNeighbours, "Sweden");
export const NORWAY_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(norwayNeighbours, "Norway");
export const UGANDA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(ugandaNeighbours, "Uganda");
export const FRANCE_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(franceNeighbours, "France");
export const ENGLAND_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(englandNeighbours, "England");
export const USA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(usaNeighbours, "USA");
export const SPAIN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(spainNeighbours, "Spain");
export const ITALY_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(italyNeighbours, "Italy");
export const POLAND_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(polandNeighbours, "Poland");
export const BRAZIL_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(brazilNeighbours, "Brazil");
export const ARGENTINA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(argentinaNeighbours, "Argentina");
export const INDIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(indiaNeighbours, "India");
export const CHINA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(chinaNeighbours, "China");
export const AUSTRALIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(australiaNeighbours, "Australia");
export const RUSSIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(russiaNeighbours, "russia");
export const UKRAINE_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(ukraineNeighbours, "ukraine");
export const FINLAND_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(finlandNeighbours, "finland");
export const CANADA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(canadaNeighbours, "canada");
export const MEXICO_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(mexicoNeighbours, "mexico");
export const PERU_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(peruNeighbours, "peru");
export const COLOMBIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(colombiaNeighbours, "colombia");
export const BOLIVIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(boliviaNeighbours, "bolivia");
export const VENEZUELA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(venezuelaNeighbours, "venezuela");
export const CHILE_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(chileNeighbours, "chile");
export const PARAGUAY_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(paraguayNeighbours, "paraguay");
export const ECUADOR_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(ecuadorNeighbours, "ecuador");
export const GUYANA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(guyanaNeighbours, "guyana");
export const KAZAKHSTAN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(kazakhstanNeighbours, "kazakhstan");
export const SAUDI_ARABIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(saudi_arabiaNeighbours, "saudi-arabia");
export const IRAN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(iranNeighbours, "iran");
export const MONGOLIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(mongoliaNeighbours, "mongolia");
export const INDONESIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(indonesiaNeighbours, "indonesia");
export const PAKISTAN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(pakistanNeighbours, "pakistan");
export const TURKEY_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(turkeyNeighbours, "turkey");
export const AUSTRIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(austriaNeighbours, "austria");
export const DENMARK_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(denmarkNeighbours, "denmark");
export const ALGERIA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(algeriaNeighbours, "algeria");
export const DR_CONGO_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(dr_congoNeighbours, "dr_congo");
export const SUDAN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(sudanNeighbours, "sudan");
export const LIBYA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(libyaNeighbours, "libya");
export const CHAD_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(chadNeighbours, "chad");
export const NIGER_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(nigerNeighbours, "niger");
export const ANGOLA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(angolaNeighbours, "angola");
export const MALI_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(maliNeighbours, "mali");
export const SOUTH_AFRICA_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(south_africaNeighbours, "south_africa");
export const SOUTH_SUDAN_NEIGHBOURS: NeighbourBorder[] = validateNeighbours(south_sudanNeighbours, "south_sudan");
