export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface CountryConfig {
  id: string;
  name: string;
  flag: string;
  cities: City[];
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

const GERMANY_CITIES: City[] = [
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "München", lat: 48.1351, lng: 11.582 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "Leipzig", lat: 51.3397, lng: 12.3731 },
  { name: "Dresden", lat: 51.0504, lng: 13.7373 },
  { name: "Hannover", lat: 52.3759, lng: 9.732 },
  { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
  { name: "Bremen", lat: 53.0793, lng: 8.8017 },
];

const SWEDEN_CITIES: City[] = [
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Göteborg", lat: 57.7089, lng: 11.9746 },
  { name: "Malmö", lat: 55.604, lng: 13.003 },
  { name: "Uppsala", lat: 59.8586, lng: 17.6389 },
  { name: "Linköping", lat: 58.4108, lng: 15.6214 },
  { name: "Västerås", lat: 59.6099, lng: 16.5448 },
  { name: "Örebro", lat: 59.2753, lng: 15.2134 },
  { name: "Norrköping", lat: 58.5877, lng: 16.1924 },
  { name: "Umeå", lat: 63.8258, lng: 20.2630 },
  { name: "Luleå", lat: 65.5848, lng: 22.1547 },
  { name: "Sundsvall", lat: 62.3908, lng: 17.3069 },
  { name: "Karlstad", lat: 59.3793, lng: 13.5036 },
];

export const COUNTRIES: CountryConfig[] = [
  {
    id: "germany",
    name: "Tyskland",
    flag: "🇩🇪",
    cities: GERMANY_CITIES,
    bounds: {
      minLat: 47.27,
      maxLat: 55.06,
      minLng: 5.87,
      maxLng: 15.04,
    },
  },
  {
    id: "sweden",
    name: "Sverige",
    flag: "🇸🇪",
    cities: SWEDEN_CITIES,
    bounds: {
      minLat: 55.2,
      maxLat: 69.2,
      minLng: 10.9,
      maxLng: 24.2,
    },
  },
];

export function latLngToSvg(
  lat: number,
  lng: number,
  bounds: CountryConfig["bounds"]
): { x: number; y: number } {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 1000;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 1000;
  return { x, y };
}

export function svgToLatLng(
  x: number,
  y: number,
  bounds: CountryConfig["bounds"]
): { lat: number; lng: number } {
  const lng = (x / 1000) * (bounds.maxLng - bounds.minLng) + bounds.minLng;
  const lat = bounds.maxLat - (y / 1000) * (bounds.maxLat - bounds.minLat);
  return { lat, lng };
}

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateScore(distanceKm: number): number {
  if (distanceKm <= 0) return 1000;
  if (distanceKm >= 500) return 0;
  return Math.round(1000 * (1 - distanceKm / 500));
}
