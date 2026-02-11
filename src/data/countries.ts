export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface Difficulty {
  id: string;
  label: string;
  description: string;
}

export const DIFFICULTIES: Difficulty[] = [
  { id: "easy", label: "Lätt", description: "De 12 största städerna" },
  { id: "medium", label: "Medel", description: "Städer rankade 13–24" },
];

export interface CountryConfig {
  id: string;
  name: string;
  flag: string;
  citiesByDifficulty: Record<string, City[]>;
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
  svgHeight: number;
}

const GERMANY_EASY: City[] = [
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
  { name: "München", lat: 48.1351, lng: 11.582 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Düsseldorf", lat: 51.2277, lng: 6.7735 },
  { name: "Leipzig", lat: 51.3397, lng: 12.3731 },
  { name: "Dortmund", lat: 51.5136, lng: 7.4653 },
  { name: "Essen", lat: 51.4556, lng: 7.0116 },
  { name: "Bremen", lat: 53.0793, lng: 8.8017 },
  { name: "Dresden", lat: 51.0504, lng: 13.7373 },
];

const GERMANY_MEDIUM: City[] = [
  { name: "Hannover", lat: 52.3759, lng: 9.732 },
  { name: "Nürnberg", lat: 49.4521, lng: 11.0767 },
  { name: "Duisburg", lat: 51.4344, lng: 6.7624 },
  { name: "Bochum", lat: 51.4818, lng: 7.2162 },
  { name: "Wuppertal", lat: 51.2562, lng: 7.1508 },
  { name: "Bielefeld", lat: 52.0302, lng: 8.5325 },
  { name: "Bonn", lat: 50.7374, lng: 7.0982 },
  { name: "Münster", lat: 51.9607, lng: 7.6261 },
  { name: "Mannheim", lat: 49.4875, lng: 8.4660 },
  { name: "Karlsruhe", lat: 49.0069, lng: 8.4037 },
  { name: "Augsburg", lat: 48.3705, lng: 10.8978 },
  { name: "Wiesbaden", lat: 50.0782, lng: 8.2398 },
];

const SWEDEN_EASY: City[] = [
  { name: "Stockholm", lat: 59.3293, lng: 18.0686 },
  { name: "Göteborg", lat: 57.7089, lng: 11.9746 },
  { name: "Malmö", lat: 55.604, lng: 13.003 },
  { name: "Uppsala", lat: 59.8586, lng: 17.6389 },
  { name: "Linköping", lat: 58.4108, lng: 15.6214 },
  { name: "Västerås", lat: 59.6099, lng: 16.5448 },
  { name: "Örebro", lat: 59.2753, lng: 15.2134 },
  { name: "Norrköping", lat: 58.5877, lng: 16.1924 },
  { name: "Helsingborg", lat: 56.0465, lng: 12.6945 },
  { name: "Jönköping", lat: 57.7826, lng: 14.1618 },
  { name: "Umeå", lat: 63.8258, lng: 20.2630 },
  { name: "Lund", lat: 55.7047, lng: 13.1910 },
];

const SWEDEN_MEDIUM: City[] = [
  { name: "Luleå", lat: 65.5848, lng: 22.1547 },
  { name: "Gävle", lat: 60.6749, lng: 17.1413 },
  { name: "Sundsvall", lat: 62.3908, lng: 17.3069 },
  { name: "Borås", lat: 57.7210, lng: 12.9401 },
  { name: "Södertälje", lat: 59.1955, lng: 17.6253 },
  { name: "Eskilstuna", lat: 59.3666, lng: 16.5077 },
  { name: "Karlstad", lat: 59.3793, lng: 13.5036 },
  { name: "Halmstad", lat: 56.6745, lng: 12.8578 },
  { name: "Växjö", lat: 56.8777, lng: 14.8091 },
  { name: "Karlskrona", lat: 56.1612, lng: 15.5869 },
  { name: "Kristianstad", lat: 56.0294, lng: 14.1567 },
  { name: "Skellefteå", lat: 64.7507, lng: 20.9528 },
];

function computeSvgHeight(bounds: CountryConfig["bounds"]): number {
  const avgLat = (bounds.minLat + bounds.maxLat) / 2;
  const cosLat = Math.cos((avgLat * Math.PI) / 180);
  const realWidth = (bounds.maxLng - bounds.minLng) * cosLat;
  const realHeight = bounds.maxLat - bounds.minLat;
  return Math.round((realHeight / realWidth) * 1000);
}

const GERMANY_BOUNDS = {
  minLat: 47.27,
  maxLat: 55.06,
  minLng: 5.87,
  maxLng: 15.04,
};

const SWEDEN_BOUNDS = {
  minLat: 55.2,
  maxLat: 69.2,
  minLng: 10.9,
  maxLng: 24.2,
};

export const COUNTRIES: CountryConfig[] = [
  {
    id: "germany",
    name: "Tyskland",
    flag: "🇩🇪",
    citiesByDifficulty: { easy: GERMANY_EASY, medium: GERMANY_MEDIUM },
    bounds: GERMANY_BOUNDS,
    svgHeight: computeSvgHeight(GERMANY_BOUNDS),
  },
  {
    id: "sweden",
    name: "Sverige",
    flag: "🇸🇪",
    citiesByDifficulty: { easy: SWEDEN_EASY, medium: SWEDEN_MEDIUM },
    bounds: SWEDEN_BOUNDS,
    svgHeight: computeSvgHeight(SWEDEN_BOUNDS),
  },
];

export function latLngToSvg(
  lat: number,
  lng: number,
  bounds: CountryConfig["bounds"],
  svgHeight: number = 1000
): { x: number; y: number } {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 1000;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * svgHeight;
  return { x, y };
}

export function svgToLatLng(
  x: number,
  y: number,
  bounds: CountryConfig["bounds"],
  svgHeight: number = 1000
): { lat: number; lng: number } {
  const lng = (x / 1000) * (bounds.maxLng - bounds.minLng) + bounds.minLng;
  const lat = bounds.maxLat - (y / svgHeight) * (bounds.maxLat - bounds.minLat);
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
