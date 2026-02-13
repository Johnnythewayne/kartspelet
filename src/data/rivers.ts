// Thin wrapper for rivers JSON data
import riversData from "./rivers-hires.json";

export interface RiverSegment {
  name: string;
  coordinates: [number, number][]; // [lng, lat]
}

export const GLOBAL_RIVERS: RiverSegment[] = riversData as RiverSegment[];
