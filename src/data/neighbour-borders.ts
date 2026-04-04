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
