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
  { id: "hard", label: "Svår", description: "Städer rankade 25–36" },
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

const GERMANY_HARD: City[] = [
  { name: "Aachen", lat: 50.7753, lng: 6.0839 },
  { name: "Kiel", lat: 54.3233, lng: 10.1228 },
  { name: "Gelsenkirchen", lat: 51.5177, lng: 7.0857 },
  { name: "Mönchengladbach", lat: 51.1805, lng: 6.4428 },
  { name: "Braunschweig", lat: 52.2689, lng: 10.5268 },
  { name: "Freiburg", lat: 47.999, lng: 7.842 },
  { name: "Lübeck", lat: 53.8655, lng: 10.6866 },
  { name: "Erfurt", lat: 50.9787, lng: 11.0328 },
  { name: "Rostock", lat: 54.0924, lng: 12.0991 },
  { name: "Mainz", lat: 49.9929, lng: 8.2473 },
  { name: "Kassel", lat: 51.3127, lng: 9.4797 },
  { name: "Hagen", lat: 51.3671, lng: 7.4633 },
];

const UGANDA_EASY: City[] = [
  { name: "Kampala", lat: 0.3476, lng: 32.5825 },
  { name: "Gulu", lat: 2.7746, lng: 32.2988 },
  { name: "Lira", lat: 2.2499, lng: 32.5339 },
  { name: "Mbarara", lat: -0.6074, lng: 30.6545 },
  { name: "Jinja", lat: 0.4244, lng: 33.2041 },
  { name: "Mbale", lat: 1.0647, lng: 34.1754 },
  { name: "Masaka", lat: -0.3413, lng: 31.7350 },
  { name: "Entebbe", lat: 0.0518, lng: 32.4637 },
  { name: "Fort Portal", lat: 0.6710, lng: 30.2750 },
  { name: "Soroti", lat: 1.7150, lng: 33.6111 },
  { name: "Arua", lat: 3.0202, lng: 30.9107 },
  { name: "Hoima", lat: 1.4331, lng: 31.3524 },
];

const UGANDA_MEDIUM: City[] = [
  { name: "Kasese", lat: 0.1867, lng: 30.0886 },
  { name: "Masindi", lat: 1.6836, lng: 31.7150 },
  { name: "Tororo", lat: 0.6930, lng: 34.1809 },
  { name: "Iganga", lat: 0.6093, lng: 33.4686 },
  { name: "Kabale", lat: -1.2490, lng: 29.9894 },
  { name: "Mukono", lat: 0.3533, lng: 32.7554 },
  { name: "Mityana", lat: 0.4175, lng: 32.0233 },
  { name: "Mubende", lat: 0.5578, lng: 31.3964 },
  { name: "Kitgum", lat: 3.2784, lng: 32.8872 },
  { name: "Busia", lat: 0.4544, lng: 34.0922 },
  { name: "Pallisa", lat: 1.1450, lng: 33.7094 },
  { name: "Nebbi", lat: 2.4778, lng: 31.0889 },
];

const UGANDA_HARD: City[] = [
  { name: "Moroto", lat: 2.5345, lng: 34.6667 },
  { name: "Kotido", lat: 2.9806, lng: 34.1333 },
  { name: "Moyo", lat: 3.6500, lng: 31.7167 },
  { name: "Kisoro", lat: -1.2167, lng: 29.6833 },
  { name: "Ntungamo", lat: -0.8833, lng: 30.2667 },
  { name: "Kapchorwa", lat: 1.3956, lng: 34.4500 },
  { name: "Bundibugyo", lat: 0.7117, lng: 30.0639 },
  { name: "Kiboga", lat: 0.9167, lng: 31.7750 },
  { name: "Kamuli", lat: 0.9472, lng: 33.1197 },
  { name: "Kayunga", lat: 0.7025, lng: 32.8886 },
  { name: "Rukungiri", lat: -0.7833, lng: 29.9417 },
  { name: "Kalangala", lat: -0.3100, lng: 32.2267 },
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

const SWEDEN_HARD: City[] = [
  { name: "Trollhättan", lat: 58.2837, lng: 12.2886 },
  { name: "Östersund", lat: 63.1792, lng: 14.6357 },
  { name: "Lidingö", lat: 59.3667, lng: 18.1500 },
  { name: "Kalmar", lat: 56.6634, lng: 16.3566 },
  { name: "Nyköping", lat: 58.7530, lng: 17.0086 },
  { name: "Falun", lat: 60.6065, lng: 15.6355 },
  { name: "Varberg", lat: 57.1057, lng: 12.2508 },
  { name: "Skövde", lat: 58.3911, lng: 13.8456 },
  { name: "Motala", lat: 58.5372, lng: 15.0364 },
  { name: "Kiruna", lat: 67.8558, lng: 20.2253 },
  { name: "Visby", lat: 57.6349, lng: 18.2948 },
  { name: "Ängelholm", lat: 56.2428, lng: 12.8622 },
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

const UGANDA_BOUNDS = {
  minLat: -1.5,
  maxLat: 4.3,
  minLng: 29.5,
  maxLng: 35.1,
};

export const COUNTRIES: CountryConfig[] = [
  {
    id: "germany",
    name: "Tyskland",
    flag: "🇩🇪",
    citiesByDifficulty: { easy: GERMANY_EASY, medium: GERMANY_MEDIUM, hard: GERMANY_HARD },
    bounds: GERMANY_BOUNDS,
    svgHeight: computeSvgHeight(GERMANY_BOUNDS),
  },
  {
    id: "sweden",
    name: "Sverige",
    flag: "🇸🇪",
    citiesByDifficulty: { easy: SWEDEN_EASY, medium: SWEDEN_MEDIUM, hard: SWEDEN_HARD },
    bounds: SWEDEN_BOUNDS,
    svgHeight: computeSvgHeight(SWEDEN_BOUNDS),
  },
  {
    id: "uganda",
    name: "Uganda",
    flag: "🇺🇬",
    citiesByDifficulty: { easy: UGANDA_EASY, medium: UGANDA_MEDIUM, hard: UGANDA_HARD },
    bounds: UGANDA_BOUNDS,
    svgHeight: computeSvgHeight(UGANDA_BOUNDS),
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
