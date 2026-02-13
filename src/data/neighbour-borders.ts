export interface NeighbourBorder {
  name: string;
  polygons: number[][][]; // [lng, lat][][]
}

import germanyNeighbours from "./neighbours-germany.json";
import swedenNeighbours from "./neighbours-sweden.json";
import ugandaNeighbours from "./neighbours-uganda.json";

export const GERMANY_NEIGHBOURS: NeighbourBorder[] = germanyNeighbours as NeighbourBorder[];
export const SWEDEN_NEIGHBOURS: NeighbourBorder[] = swedenNeighbours as NeighbourBorder[];
export const UGANDA_NEIGHBOURS: NeighbourBorder[] = ugandaNeighbours as NeighbourBorder[];
