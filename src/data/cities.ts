export interface City {
  name: string;
  lat: number;
  lng: number;
}

export const CITIES: City[] = [
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

// Germany bounding box (approximate)
export const GERMANY_BOUNDS = {
  minLat: 47.27,
  maxLat: 55.06,
  minLng: 5.87,
  maxLng: 15.04,
};

// Convert lat/lng to SVG coordinates (0-1000 range)
export function latLngToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - GERMANY_BOUNDS.minLng) / (GERMANY_BOUNDS.maxLng - GERMANY_BOUNDS.minLng)) * 1000;
  const y = ((GERMANY_BOUNDS.maxLat - lat) / (GERMANY_BOUNDS.maxLat - GERMANY_BOUNDS.minLat)) * 1000;
  return { x, y };
}

// Haversine distance in km
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Score: max 1000, decreasing with distance. 0 at 500km+
export function calculateScore(distanceKm: number): number {
  if (distanceKm <= 0) return 1000;
  if (distanceKm >= 500) return 0;
  return Math.round(1000 * (1 - distanceKm / 500));
}

// Convert SVG coords back to lat/lng
export function svgToLatLng(x: number, y: number): { lat: number; lng: number } {
  const lng = (x / 1000) * (GERMANY_BOUNDS.maxLng - GERMANY_BOUNDS.minLng) + GERMANY_BOUNDS.minLng;
  const lat = GERMANY_BOUNDS.maxLat - (y / 1000) * (GERMANY_BOUNDS.maxLat - GERMANY_BOUNDS.minLat);
  return { lat, lng };
}
