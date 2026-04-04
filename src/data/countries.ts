import { SPAIN_EASY, SPAIN_MEDIUM, SPAIN_HARD } from "./cities-spain";
import { ITALY_EASY, ITALY_MEDIUM, ITALY_HARD } from "./cities-italy";
import { POLAND_EASY, POLAND_MEDIUM, POLAND_HARD } from "./cities-poland";
import { BRAZIL_EASY, BRAZIL_MEDIUM, BRAZIL_HARD } from "./cities-brazil";
import { ARGENTINA_EASY, ARGENTINA_MEDIUM, ARGENTINA_HARD } from "./cities-argentina";
import { INDIA_EASY, INDIA_MEDIUM, INDIA_HARD } from "./cities-india";
import { CHINA_EASY, CHINA_MEDIUM, CHINA_HARD } from "./cities-china";
import { AUSTRALIA_EASY, AUSTRALIA_MEDIUM, AUSTRALIA_HARD } from "./cities-australia";
import { RUSSIA_EASY, RUSSIA_MEDIUM, RUSSIA_HARD } from "./cities-russia";
import { UKRAINE_EASY, UKRAINE_MEDIUM, UKRAINE_HARD } from "./cities-ukraine";
import { FINLAND_EASY, FINLAND_MEDIUM, FINLAND_HARD } from "./cities-finland";
import { CANADA_EASY, CANADA_MEDIUM, CANADA_HARD } from "./cities-canada";
import { MEXICO_EASY, MEXICO_MEDIUM, MEXICO_HARD } from "./cities-mexico";
import { PERU_EASY, PERU_MEDIUM, PERU_HARD } from "./cities-peru";
import { COLOMBIA_EASY, COLOMBIA_MEDIUM, COLOMBIA_HARD } from "./cities-colombia";
import { BOLIVIA_EASY, BOLIVIA_MEDIUM, BOLIVIA_HARD } from "./cities-bolivia";
import { VENEZUELA_EASY, VENEZUELA_MEDIUM, VENEZUELA_HARD } from "./cities-venezuela";
import { CHILE_EASY, CHILE_MEDIUM, CHILE_HARD } from "./cities-chile";
import { PARAGUAY_EASY, PARAGUAY_MEDIUM, PARAGUAY_HARD } from "./cities-paraguay";
import { ECUADOR_EASY, ECUADOR_MEDIUM, ECUADOR_HARD } from "./cities-ecuador";
import { GUYANA_EASY, GUYANA_MEDIUM, GUYANA_HARD } from "./cities-guyana";
import { KAZAKHSTAN_EASY, KAZAKHSTAN_MEDIUM, KAZAKHSTAN_HARD } from "./cities-kazakhstan";
import { SAUDI_ARABIA_EASY, SAUDI_ARABIA_MEDIUM, SAUDI_ARABIA_HARD } from "./cities-saudi-arabia";
import { IRAN_EASY, IRAN_MEDIUM, IRAN_HARD } from "./cities-iran";
import { MONGOLIA_EASY, MONGOLIA_MEDIUM, MONGOLIA_HARD } from "./cities-mongolia";
import { INDONESIA_EASY, INDONESIA_MEDIUM, INDONESIA_HARD } from "./cities-indonesia";
import { PAKISTAN_EASY, PAKISTAN_MEDIUM, PAKISTAN_HARD } from "./cities-pakistan";
import { TURKEY_EASY, TURKEY_MEDIUM, TURKEY_HARD } from "./cities-turkey";
import { AUSTRIA_EASY, AUSTRIA_MEDIUM, AUSTRIA_HARD } from "./cities-austria";
import { DENMARK_EASY, DENMARK_MEDIUM, DENMARK_HARD } from "./cities-denmark";
import { ALGERIA_EASY, ALGERIA_MEDIUM, ALGERIA_HARD } from "./cities-algeria";
import { DR_CONGO_EASY, DR_CONGO_MEDIUM, DR_CONGO_HARD } from "./cities-dr-congo";
import { SUDAN_EASY, SUDAN_MEDIUM, SUDAN_HARD } from "./cities-sudan";
import { LIBYA_EASY, LIBYA_MEDIUM, LIBYA_HARD } from "./cities-libya";
import { CHAD_EASY, CHAD_MEDIUM, CHAD_HARD } from "./cities-chad";
import { NIGER_EASY, NIGER_MEDIUM, NIGER_HARD } from "./cities-niger";
import { ANGOLA_EASY, ANGOLA_MEDIUM, ANGOLA_HARD } from "./cities-angola";
import { MALI_EASY, MALI_MEDIUM, MALI_HARD } from "./cities-mali";
import { SOUTH_AFRICA_EASY, SOUTH_AFRICA_MEDIUM, SOUTH_AFRICA_HARD } from "./cities-south-africa";
import { SOUTH_SUDAN_EASY, SOUTH_SUDAN_MEDIUM, SOUTH_SUDAN_HARD } from "./cities-south-sudan";
import { ETHIOPIA_EASY, ETHIOPIA_MEDIUM, ETHIOPIA_HARD } from "./cities-ethiopia";

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

const NORWAY_EASY: City[] = [
  { name: "Oslo", lat: 59.9139, lng: 10.7522 },
  { name: "Bergen", lat: 60.3913, lng: 5.3221 },
  { name: "Trondheim", lat: 63.4305, lng: 10.3951 },
  { name: "Stavanger", lat: 58.9700, lng: 5.7331 },
  { name: "Drammen", lat: 59.7441, lng: 10.2045 },
  { name: "Fredrikstad", lat: 59.2181, lng: 10.9298 },
  { name: "Kristiansand", lat: 58.1599, lng: 8.0182 },
  { name: "Tromsø", lat: 69.6496, lng: 18.9560 },
  { name: "Sandnes", lat: 58.8520, lng: 5.7352 },
  { name: "Sarpsborg", lat: 59.2839, lng: 11.1096 },
  { name: "Bodø", lat: 67.2804, lng: 14.4049 },
  { name: "Ålesund", lat: 62.4722, lng: 6.1549 },
];

const NORWAY_MEDIUM: City[] = [
  { name: "Tønsberg", lat: 59.2674, lng: 10.4076 },
  { name: "Haugesund", lat: 59.4138, lng: 5.2680 },
  { name: "Moss", lat: 59.4340, lng: 10.6577 },
  { name: "Sandefjord", lat: 59.1314, lng: 10.2166 },
  { name: "Arendal", lat: 58.4615, lng: 8.7726 },
  { name: "Porsgrunn", lat: 59.1405, lng: 9.6560 },
  { name: "Hamar", lat: 60.7945, lng: 11.0680 },
  { name: "Larvik", lat: 59.0530, lng: 10.0345 },
  { name: "Halden", lat: 59.1226, lng: 11.3876 },
  { name: "Lillehammer", lat: 61.1153, lng: 10.4662 },
  { name: "Molde", lat: 62.7373, lng: 7.1590 },
  { name: "Harstad", lat: 68.7984, lng: 16.5415 },
];

const NORWAY_HARD: City[] = [
  { name: "Hammerfest", lat: 70.6634, lng: 23.6821 },
  { name: "Narvik", lat: 68.4385, lng: 17.4272 },
  { name: "Gjøvik", lat: 60.7957, lng: 10.6915 },
  { name: "Steinkjer", lat: 64.0149, lng: 11.4953 },
  { name: "Elverum", lat: 60.8818, lng: 11.5610 },
  { name: "Kongsberg", lat: 59.6630, lng: 9.6465 },
  { name: "Mandal", lat: 58.0294, lng: 7.4610 },
  { name: "Grimstad", lat: 58.3405, lng: 8.5934 },
  { name: "Vardø", lat: 70.3716, lng: 31.1089 },
  { name: "Alta", lat: 69.9689, lng: 23.2716 },
  { name: "Mo i Rana", lat: 66.3167, lng: 14.1631 },
  { name: "Kirkenes", lat: 69.7271, lng: 30.0458 },
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

const NORWAY_BOUNDS = {
  minLat: 57.8,
  maxLat: 71.5,
  minLng: 3.0,
  maxLng: 31.5,
};

const UGANDA_BOUNDS = {
  minLat: -1.5,
  maxLat: 4.3,
  minLng: 29.5,
  maxLng: 35.1,
};

const MYANMAR_BOUNDS = {
  minLat: 9.5,
  maxLat: 28.5,
  minLng: 92.0,
  maxLng: 101.2,
};

const FRANCE_BOUNDS = {
  minLat: 42.0,
  maxLat: 51.2,
  minLng: -5.2,
  maxLng: 8.3,
};

const ENGLAND_BOUNDS = {
  minLat: 49.8,
  maxLat: 59.0,
  minLng: -7.5,
  maxLng: 2.0,
};

const USA_BOUNDS = {
  minLat: 24.5,
  maxLat: 49.5,
  minLng: -125.0,
  maxLng: -66.0,
};

const SPAIN_BOUNDS = {
  minLat: 35.8,
  maxLat: 43.8,
  minLng: -9.4,
  maxLng: 3.4,
};

const ITALY_BOUNDS = {
  minLat: 36.5,
  maxLat: 47.1,
  minLng: 6.6,
  maxLng: 18.6,
};

const POLAND_BOUNDS = {
  minLat: 49.0,
  maxLat: 54.9,
  minLng: 14.1,
  maxLng: 24.2,
};

const BRAZIL_BOUNDS = {
  minLat: -33.8,
  maxLat: 5.3,
  minLng: -73.9,
  maxLng: -34.8,
};

const ARGENTINA_BOUNDS = {
  minLat: -55.1,
  maxLat: -21.8,
  minLng: -73.6,
  maxLng: -53.6,
};

const INDIA_BOUNDS = {
  minLat: 6.7,
  maxLat: 35.5,
  minLng: 68.1,
  maxLng: 97.4,
};

const CHINA_BOUNDS = {
  minLat: 18.0,
  maxLat: 53.6,
  minLng: 73.5,
  maxLng: 134.8,
};

const AUSTRALIA_BOUNDS = {
  minLat: -44.0,
  maxLat: -10.5,
  minLng: 113.0,
  maxLng: 154.0,
};

const USA_EASY: City[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", lat: 33.4484, lng: -112.0740 },
  { name: "Philadelphia", lat: 39.9526, lng: -75.1652 },
  { name: "San Antonio", lat: 29.4241, lng: -98.4936 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "Dallas", lat: 32.7767, lng: -96.7970 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Atlanta", lat: 33.7490, lng: -84.3880 },
  { name: "Washington D.C.", lat: 38.9072, lng: -77.0369 },
];

const USA_MEDIUM: City[] = [
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Nashville", lat: 36.1627, lng: -86.7816 },
  { name: "Detroit", lat: 42.3314, lng: -83.0458 },
  { name: "Portland", lat: 45.5152, lng: -122.6784 },
  { name: "Las Vegas", lat: 36.1699, lng: -115.1398 },
  { name: "Minneapolis", lat: 44.9778, lng: -93.2650 },
  { name: "New Orleans", lat: 29.9511, lng: -90.0715 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Charlotte", lat: 35.2271, lng: -80.8431 },
  { name: "Salt Lake City", lat: 40.7608, lng: -111.8910 },
];

const USA_HARD: City[] = [
  { name: "Indianapolis", lat: 39.7684, lng: -86.1581 },
  { name: "Milwaukee", lat: 43.0389, lng: -87.9065 },
  { name: "Kansas City", lat: 39.0997, lng: -94.5786 },
  { name: "Memphis", lat: 35.1495, lng: -90.0490 },
  { name: "Albuquerque", lat: 35.0844, lng: -106.6504 },
  { name: "Tucson", lat: 32.2226, lng: -110.9747 },
  { name: "Omaha", lat: 41.2565, lng: -95.9345 },
  { name: "Raleigh", lat: 35.7796, lng: -78.6382 },
  { name: "Cleveland", lat: 41.4993, lng: -81.6944 },
  { name: "Pittsburgh", lat: 40.4406, lng: -79.9959 },
  { name: "St. Louis", lat: 38.6270, lng: -90.1994 },
  { name: "Tampa", lat: 27.9506, lng: -82.4572 },
];

const ENGLAND_EASY: City[] = [
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
  { name: "Manchester", lat: 53.4808, lng: -2.2426 },
  { name: "Glasgow", lat: 55.8642, lng: -4.2518 },
  { name: "Liverpool", lat: 53.4084, lng: -2.9916 },
  { name: "Edinburgh", lat: 55.9533, lng: -3.1883 },
  { name: "Bristol", lat: 51.4545, lng: -2.5879 },
  { name: "Leeds", lat: 53.8008, lng: -1.5491 },
  { name: "Sheffield", lat: 53.3811, lng: -1.4701 },
  { name: "Cardiff", lat: 51.4816, lng: -3.1791 },
  { name: "Newcastle", lat: 54.9783, lng: -1.6178 },
  { name: "Belfast", lat: 54.5973, lng: -5.9301 },
];

const ENGLAND_MEDIUM: City[] = [
  { name: "Nottingham", lat: 52.9548, lng: -1.1581 },
  { name: "Southampton", lat: 50.9097, lng: -1.4044 },
  { name: "Aberdeen", lat: 57.1497, lng: -2.0943 },
  { name: "Leicester", lat: 52.6369, lng: -1.1398 },
  { name: "Brighton", lat: 50.8225, lng: -0.1372 },
  { name: "Plymouth", lat: 50.3755, lng: -4.1427 },
  { name: "Dundee", lat: 56.4620, lng: -2.9707 },
  { name: "Coventry", lat: 52.4068, lng: -1.5197 },
  { name: "Swansea", lat: 51.6214, lng: -3.9436 },
  { name: "Stoke-on-Trent", lat: 53.0027, lng: -2.1794 },
  { name: "York", lat: 53.9591, lng: -1.0815 },
  { name: "Oxford", lat: 51.7520, lng: -1.2577 },
];

const ENGLAND_HARD: City[] = [
  { name: "Cambridge", lat: 52.2053, lng: 0.1218 },
  { name: "Bath", lat: 51.3811, lng: -2.3590 },
  { name: "Inverness", lat: 57.4778, lng: -4.2247 },
  { name: "Canterbury", lat: 51.2802, lng: 1.0789 },
  { name: "Exeter", lat: 50.7184, lng: -3.5339 },
  { name: "Norwich", lat: 52.6309, lng: 1.2974 },
  { name: "Chester", lat: 53.1930, lng: -2.8931 },
  { name: "Stirling", lat: 56.1166, lng: -3.9369 },
  { name: "Perth", lat: 56.3950, lng: -3.4308 },
  { name: "Carlisle", lat: 54.8925, lng: -2.9329 },
  { name: "Ipswich", lat: 52.0567, lng: 1.1482 },
  { name: "Lincoln", lat: 53.2307, lng: -0.5406 },
];

const FRANCE_EASY: City[] = [
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Marseille", lat: 43.2965, lng: 5.3698 },
  { name: "Lyon", lat: 45.764, lng: 4.8357 },
  { name: "Toulouse", lat: 43.6047, lng: 1.4442 },
  { name: "Nice", lat: 43.7102, lng: 7.262 },
  { name: "Nantes", lat: 47.2184, lng: -1.5536 },
  { name: "Strasbourg", lat: 48.5734, lng: 7.7521 },
  { name: "Montpellier", lat: 43.6108, lng: 3.8767 },
  { name: "Bordeaux", lat: 44.8378, lng: -0.5792 },
  { name: "Lille", lat: 50.6292, lng: 3.0573 },
  { name: "Rennes", lat: 48.1173, lng: -1.6778 },
  { name: "Reims", lat: 49.2583, lng: 3.6844 },
];

const FRANCE_MEDIUM: City[] = [
  { name: "Saint-Étienne", lat: 45.4397, lng: 4.3872 },
  { name: "Le Havre", lat: 49.4944, lng: 0.1079 },
  { name: "Toulon", lat: 43.1242, lng: 5.928 },
  { name: "Grenoble", lat: 45.1885, lng: 5.7245 },
  { name: "Dijon", lat: 47.322, lng: 5.0415 },
  { name: "Angers", lat: 47.4784, lng: -0.5632 },
  { name: "Nîmes", lat: 43.8367, lng: 4.3601 },
  { name: "Clermont-Ferrand", lat: 45.7772, lng: 3.087 },
  { name: "Tours", lat: 47.3941, lng: 0.6848 },
  { name: "Amiens", lat: 49.894, lng: 2.2957 },
  { name: "Limoges", lat: 45.8336, lng: 1.2611 },
  { name: "Metz", lat: 49.1193, lng: 6.1757 },
];

const FRANCE_HARD: City[] = [
  { name: "Perpignan", lat: 42.6887, lng: 2.8948 },
  { name: "Besançon", lat: 47.2378, lng: 6.0241 },
  { name: "Orléans", lat: 47.9029, lng: 1.909 },
  { name: "Rouen", lat: 49.4432, lng: 1.0993 },
  { name: "Caen", lat: 49.1829, lng: -0.3707 },
  { name: "Nancy", lat: 48.6921, lng: 6.1844 },
  { name: "Avignon", lat: 43.9493, lng: 4.8055 },
  { name: "Poitiers", lat: 46.5802, lng: 0.3404 },
  { name: "La Rochelle", lat: 46.1603, lng: -1.1511 },
  { name: "Pau", lat: 43.2951, lng: -0.3708 },
  { name: "Ajaccio", lat: 41.9192, lng: 8.7386 },
  { name: "Brest", lat: 48.3904, lng: -4.4861 },
];

const MYANMAR_EASY: City[] = [
  { name: "Yangon", lat: 16.8661, lng: 96.1951 },
  { name: "Mandalay", lat: 21.9588, lng: 96.0891 },
  { name: "Naypyidaw", lat: 19.7633, lng: 96.0785 },
  { name: "Mawlamyine", lat: 16.4905, lng: 97.6256 },
  { name: "Bago", lat: 17.3366, lng: 96.4814 },
  { name: "Pathein", lat: 16.7794, lng: 94.7362 },
  { name: "Monywa", lat: 21.9099, lng: 95.1336 },
  { name: "Meiktila", lat: 20.8784, lng: 95.8585 },
  { name: "Sittwe", lat: 20.1463, lng: 92.8984 },
  { name: "Myitkyina", lat: 25.3867, lng: 97.3958 },
  { name: "Taunggyi", lat: 20.7893, lng: 97.0378 },
  { name: "Lashio", lat: 22.9362, lng: 97.7497 },
];

const MYANMAR_MEDIUM: City[] = [
  { name: "Pyay", lat: 18.8240, lng: 95.2220 },
  { name: "Magway", lat: 20.1544, lng: 94.9247 },
  { name: "Dawei", lat: 14.0833, lng: 98.2000 },
  { name: "Myingyan", lat: 21.4600, lng: 95.3885 },
  { name: "Pakokku", lat: 21.3337, lng: 95.1000 },
  { name: "Hpa-An", lat: 16.8910, lng: 97.6344 },
  { name: "Sagaing", lat: 21.8787, lng: 95.9785 },
  { name: "Thaton", lat: 16.9186, lng: 97.3711 },
  { name: "Taungoo", lat: 18.9418, lng: 96.4347 },
  { name: "Pyinmana", lat: 19.7381, lng: 96.2147 },
  { name: "Mogok", lat: 22.9217, lng: 96.5086 },
  { name: "Bhamo", lat: 24.2519, lng: 97.2333 },
];

const MYANMAR_HARD: City[] = [
  { name: "Kalay", lat: 23.1942, lng: 94.0667 },
  { name: "Kengtung", lat: 21.2914, lng: 99.6050 },
  { name: "Loikaw", lat: 19.6741, lng: 97.2097 },
  { name: "Hakha", lat: 21.9787, lng: 93.6133 },
  { name: "Mudon", lat: 16.2600, lng: 97.7250 },
  { name: "Kyaukphyu", lat: 19.4264, lng: 93.5494 },
  { name: "Shwebo", lat: 22.5700, lng: 95.6967 },
  { name: "Muse", lat: 23.9883, lng: 97.8533 },
  { name: "Tachileik", lat: 20.4478, lng: 99.8833 },
  { name: "Putao", lat: 27.3200, lng: 97.3900 },
  { name: "Mergui", lat: 12.4381, lng: 98.5986 },
  { name: "Haka", lat: 22.6400, lng: 93.6167 },
];


const RUSSIA_BOUNDS = { minLat: 41.0, maxLat: 82.0, minLng: 19.0, maxLng: 190.0 };
const UKRAINE_BOUNDS = { minLat: 44.3, maxLat: 52.4, minLng: 22.1, maxLng: 40.2 };
const FINLAND_BOUNDS = { minLat: 59.7, maxLat: 70.1, minLng: 20.5, maxLng: 31.6 };
const CANADA_BOUNDS = { minLat: 41.7, maxLat: 83.1, minLng: -141.0, maxLng: -52.6 };
const MEXICO_BOUNDS = { minLat: 14.5, maxLat: 32.7, minLng: -118.4, maxLng: -86.7 };
const PERU_BOUNDS = { minLat: -18.4, maxLat: -0.0, minLng: -81.4, maxLng: -68.7 };
const COLOMBIA_BOUNDS = { minLat: -4.3, maxLat: 12.5, minLng: -79.0, maxLng: -66.9 };
const BOLIVIA_BOUNDS = { minLat: -22.9, maxLat: -9.7, minLng: -69.6, maxLng: -57.5 };
const VENEZUELA_BOUNDS = { minLat: 0.6, maxLat: 12.2, minLng: -73.4, maxLng: -59.8 };
const CHILE_BOUNDS = { minLat: -55.9, maxLat: -17.5, minLng: -75.7, maxLng: -66.9 };
const PARAGUAY_BOUNDS = { minLat: -27.6, maxLat: -19.3, minLng: -62.7, maxLng: -54.3 };
const ECUADOR_BOUNDS = { minLat: -5.0, maxLat: 1.5, minLng: -81.1, maxLng: -75.2 };
const GUYANA_BOUNDS = { minLat: 1.2, maxLat: 8.6, minLng: -61.4, maxLng: -56.5 };
const KAZAKHSTAN_BOUNDS = { minLat: 40.6, maxLat: 55.4, minLng: 46.5, maxLng: 87.4 };
const SAUDI_ARABIA_BOUNDS = { minLat: 15.6, maxLat: 32.2, minLng: 34.5, maxLng: 55.7 };
const IRAN_BOUNDS = { minLat: 25.1, maxLat: 39.8, minLng: 44.0, maxLng: 63.3 };
const MONGOLIA_BOUNDS = { minLat: 41.6, maxLat: 52.2, minLng: 87.7, maxLng: 119.9 };
const INDONESIA_BOUNDS = { minLat: -11.0, maxLat: 5.9, minLng: 95.0, maxLng: 141.0 };
const PAKISTAN_BOUNDS = { minLat: 23.7, maxLat: 37.1, minLng: 60.9, maxLng: 77.8 };
const TURKEY_BOUNDS = { minLat: 35.8, maxLat: 42.1, minLng: 26.0, maxLng: 44.8 };
const AUSTRIA_BOUNDS = { minLat: 46.3, maxLat: 49.1, minLng: 9.5, maxLng: 17.2 };
const DENMARK_BOUNDS = { minLat: 54.4, maxLat: 57.9, minLng: 7.5, maxLng: 15.5 };
const ALGERIA_BOUNDS = { minLat: 18.5, maxLat: 37.6, minLng: -9.2, maxLng: 12.5 };
const DR_CONGO_BOUNDS = { minLat: -13.9, maxLat: 5.9, minLng: 11.7, maxLng: 31.8 };
const SUDAN_BOUNDS = { minLat: 8.2, maxLat: 23.6, minLng: 21.3, maxLng: 39.2 };
const LIBYA_BOUNDS = { minLat: 19.0, maxLat: 33.7, minLng: 8.9, maxLng: 25.6 };
const CHAD_BOUNDS = { minLat: 6.9, maxLat: 23.9, minLng: 13.0, maxLng: 24.5 };
const NIGER_BOUNDS = { minLat: 11.2, maxLat: 24.0, minLng: -0.3, maxLng: 16.5 };
const ANGOLA_BOUNDS = { minLat: -18.5, maxLat: -3.9, minLng: 11.2, maxLng: 24.6 };
const MALI_BOUNDS = { minLat: 9.7, maxLat: 25.5, minLng: -12.7, maxLng: 4.8 };
const SOUTH_AFRICA_BOUNDS = { minLat: -35.3, maxLat: -21.6, minLng: 15.9, maxLng: 33.4 };
const SOUTH_SUDAN_BOUNDS = { minLat: 3.0, maxLat: 12.7, minLng: 23.6, maxLng: 36.4 };

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
    name: "Swideni",
    flag: "🇸🇪",
    citiesByDifficulty: { easy: SWEDEN_EASY, medium: SWEDEN_MEDIUM, hard: SWEDEN_HARD },
    bounds: SWEDEN_BOUNDS,
    svgHeight: computeSvgHeight(SWEDEN_BOUNDS),
  },
  {
    id: "norway",
    name: "Norge",
    flag: "🇳🇴",
    citiesByDifficulty: { easy: NORWAY_EASY, medium: NORWAY_MEDIUM, hard: NORWAY_HARD },
    bounds: NORWAY_BOUNDS,
    svgHeight: computeSvgHeight(NORWAY_BOUNDS),
  },
  {
    id: "uganda",
    name: "Uganda",
    flag: "🇺🇬",
    citiesByDifficulty: { easy: UGANDA_EASY, medium: UGANDA_MEDIUM, hard: UGANDA_HARD },
    bounds: UGANDA_BOUNDS,
    svgHeight: computeSvgHeight(UGANDA_BOUNDS),
  },
  {
    id: "myanmar",
    name: "Myanmar",
    flag: "🇲🇲",
    citiesByDifficulty: { easy: MYANMAR_EASY, medium: MYANMAR_MEDIUM, hard: MYANMAR_HARD },
    bounds: MYANMAR_BOUNDS,
    svgHeight: computeSvgHeight(MYANMAR_BOUNDS),
  },
  {
    id: "france",
    name: "Frankrike",
    flag: "🇫🇷",
    citiesByDifficulty: { easy: FRANCE_EASY, medium: FRANCE_MEDIUM, hard: FRANCE_HARD },
    bounds: FRANCE_BOUNDS,
    svgHeight: computeSvgHeight(FRANCE_BOUNDS),
  },
  {
    id: "england",
    name: "England",
    flag: "🇬🇧",
    citiesByDifficulty: { easy: ENGLAND_EASY, medium: ENGLAND_MEDIUM, hard: ENGLAND_HARD },
    bounds: ENGLAND_BOUNDS,
    svgHeight: computeSvgHeight(ENGLAND_BOUNDS),
  },
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    citiesByDifficulty: { easy: USA_EASY, medium: USA_MEDIUM, hard: USA_HARD },
    bounds: USA_BOUNDS,
    svgHeight: computeSvgHeight(USA_BOUNDS),
  },
  {
    id: "spain",
    name: "Spanien",
    flag: "🇪🇸",
    citiesByDifficulty: { easy: SPAIN_EASY, medium: SPAIN_MEDIUM, hard: SPAIN_HARD },
    bounds: SPAIN_BOUNDS,
    svgHeight: computeSvgHeight(SPAIN_BOUNDS),
  },
  {
    id: "italy",
    name: "Italien",
    flag: "🇮🇹",
    citiesByDifficulty: { easy: ITALY_EASY, medium: ITALY_MEDIUM, hard: ITALY_HARD },
    bounds: ITALY_BOUNDS,
    svgHeight: computeSvgHeight(ITALY_BOUNDS),
  },
  {
    id: "poland",
    name: "Polen",
    flag: "🇵🇱",
    citiesByDifficulty: { easy: POLAND_EASY, medium: POLAND_MEDIUM, hard: POLAND_HARD },
    bounds: POLAND_BOUNDS,
    svgHeight: computeSvgHeight(POLAND_BOUNDS),
  },
  {
    id: "brazil",
    name: "Brasilien",
    flag: "🇧🇷",
    citiesByDifficulty: { easy: BRAZIL_EASY, medium: BRAZIL_MEDIUM, hard: BRAZIL_HARD },
    bounds: BRAZIL_BOUNDS,
    svgHeight: computeSvgHeight(BRAZIL_BOUNDS),
  },
  {
    id: "argentina",
    name: "Argentina",
    flag: "🇦🇷",
    citiesByDifficulty: { easy: ARGENTINA_EASY, medium: ARGENTINA_MEDIUM, hard: ARGENTINA_HARD },
    bounds: ARGENTINA_BOUNDS,
    svgHeight: computeSvgHeight(ARGENTINA_BOUNDS),
  },
  {
    id: "india",
    name: "Indien",
    flag: "🇮🇳",
    citiesByDifficulty: { easy: INDIA_EASY, medium: INDIA_MEDIUM, hard: INDIA_HARD },
    bounds: INDIA_BOUNDS,
    svgHeight: computeSvgHeight(INDIA_BOUNDS),
  },
  {
    id: "china",
    name: "Kina",
    flag: "🇨🇳",
    citiesByDifficulty: { easy: CHINA_EASY, medium: CHINA_MEDIUM, hard: CHINA_HARD },
    bounds: CHINA_BOUNDS,
    svgHeight: computeSvgHeight(CHINA_BOUNDS),
  },
  {
    id: "australia",
    name: "Australien",
    flag: "🇦🇺",
    citiesByDifficulty: { easy: AUSTRALIA_EASY, medium: AUSTRALIA_MEDIUM, hard: AUSTRALIA_HARD },
    bounds: AUSTRALIA_BOUNDS,
    svgHeight: computeSvgHeight(AUSTRALIA_BOUNDS),
  },
  {
    id: "russia", name: "Ryssland", flag: "🇷🇺",
    citiesByDifficulty: { easy: RUSSIA_EASY, medium: RUSSIA_MEDIUM, hard: RUSSIA_HARD },
    bounds: RUSSIA_BOUNDS, svgHeight: computeSvgHeight(RUSSIA_BOUNDS),
  },
  {
    id: "ukraine", name: "Ukraina", flag: "🇺🇦",
    citiesByDifficulty: { easy: UKRAINE_EASY, medium: UKRAINE_MEDIUM, hard: UKRAINE_HARD },
    bounds: UKRAINE_BOUNDS, svgHeight: computeSvgHeight(UKRAINE_BOUNDS),
  },
  {
    id: "finland", name: "Finland", flag: "🇫🇮",
    citiesByDifficulty: { easy: FINLAND_EASY, medium: FINLAND_MEDIUM, hard: FINLAND_HARD },
    bounds: FINLAND_BOUNDS, svgHeight: computeSvgHeight(FINLAND_BOUNDS),
  },
  {
    id: "canada", name: "Kanada", flag: "🇨🇦",
    citiesByDifficulty: { easy: CANADA_EASY, medium: CANADA_MEDIUM, hard: CANADA_HARD },
    bounds: CANADA_BOUNDS, svgHeight: computeSvgHeight(CANADA_BOUNDS),
  },
  {
    id: "mexico", name: "Mexiko", flag: "🇲🇽",
    citiesByDifficulty: { easy: MEXICO_EASY, medium: MEXICO_MEDIUM, hard: MEXICO_HARD },
    bounds: MEXICO_BOUNDS, svgHeight: computeSvgHeight(MEXICO_BOUNDS),
  },
  {
    id: "peru", name: "Peru", flag: "🇵🇪",
    citiesByDifficulty: { easy: PERU_EASY, medium: PERU_MEDIUM, hard: PERU_HARD },
    bounds: PERU_BOUNDS, svgHeight: computeSvgHeight(PERU_BOUNDS),
  },
  {
    id: "colombia", name: "Colombia", flag: "🇨🇴",
    citiesByDifficulty: { easy: COLOMBIA_EASY, medium: COLOMBIA_MEDIUM, hard: COLOMBIA_HARD },
    bounds: COLOMBIA_BOUNDS, svgHeight: computeSvgHeight(COLOMBIA_BOUNDS),
  },
  {
    id: "bolivia", name: "Bolivia", flag: "🇧🇴",
    citiesByDifficulty: { easy: BOLIVIA_EASY, medium: BOLIVIA_MEDIUM, hard: BOLIVIA_HARD },
    bounds: BOLIVIA_BOUNDS, svgHeight: computeSvgHeight(BOLIVIA_BOUNDS),
  },
  {
    id: "venezuela", name: "Venezuela", flag: "🇻🇪",
    citiesByDifficulty: { easy: VENEZUELA_EASY, medium: VENEZUELA_MEDIUM, hard: VENEZUELA_HARD },
    bounds: VENEZUELA_BOUNDS, svgHeight: computeSvgHeight(VENEZUELA_BOUNDS),
  },
  {
    id: "chile", name: "Chile", flag: "🇨🇱",
    citiesByDifficulty: { easy: CHILE_EASY, medium: CHILE_MEDIUM, hard: CHILE_HARD },
    bounds: CHILE_BOUNDS, svgHeight: computeSvgHeight(CHILE_BOUNDS),
  },
  {
    id: "paraguay", name: "Paraguay", flag: "🇵🇾",
    citiesByDifficulty: { easy: PARAGUAY_EASY, medium: PARAGUAY_MEDIUM, hard: PARAGUAY_HARD },
    bounds: PARAGUAY_BOUNDS, svgHeight: computeSvgHeight(PARAGUAY_BOUNDS),
  },
  {
    id: "ecuador", name: "Ecuador", flag: "🇪🇨",
    citiesByDifficulty: { easy: ECUADOR_EASY, medium: ECUADOR_MEDIUM, hard: ECUADOR_HARD },
    bounds: ECUADOR_BOUNDS, svgHeight: computeSvgHeight(ECUADOR_BOUNDS),
  },
  {
    id: "guyana", name: "Guyana", flag: "🇬🇾",
    citiesByDifficulty: { easy: GUYANA_EASY, medium: GUYANA_MEDIUM, hard: GUYANA_HARD },
    bounds: GUYANA_BOUNDS, svgHeight: computeSvgHeight(GUYANA_BOUNDS),
  },
  {
    id: "kazakhstan", name: "Kazakstan", flag: "🇰🇿",
    citiesByDifficulty: { easy: KAZAKHSTAN_EASY, medium: KAZAKHSTAN_MEDIUM, hard: KAZAKHSTAN_HARD },
    bounds: KAZAKHSTAN_BOUNDS, svgHeight: computeSvgHeight(KAZAKHSTAN_BOUNDS),
  },
  {
    id: "saudi_arabia", name: "Saudiarabien", flag: "🇸🇦",
    citiesByDifficulty: { easy: SAUDI_ARABIA_EASY, medium: SAUDI_ARABIA_MEDIUM, hard: SAUDI_ARABIA_HARD },
    bounds: SAUDI_ARABIA_BOUNDS, svgHeight: computeSvgHeight(SAUDI_ARABIA_BOUNDS),
  },
  {
    id: "iran", name: "Iran", flag: "🇮🇷",
    citiesByDifficulty: { easy: IRAN_EASY, medium: IRAN_MEDIUM, hard: IRAN_HARD },
    bounds: IRAN_BOUNDS, svgHeight: computeSvgHeight(IRAN_BOUNDS),
  },
  {
    id: "mongolia", name: "Mongoliet", flag: "🇲🇳",
    citiesByDifficulty: { easy: MONGOLIA_EASY, medium: MONGOLIA_MEDIUM, hard: MONGOLIA_HARD },
    bounds: MONGOLIA_BOUNDS, svgHeight: computeSvgHeight(MONGOLIA_BOUNDS),
  },
  {
    id: "indonesia", name: "Indonesien", flag: "🇮🇩",
    citiesByDifficulty: { easy: INDONESIA_EASY, medium: INDONESIA_MEDIUM, hard: INDONESIA_HARD },
    bounds: INDONESIA_BOUNDS, svgHeight: computeSvgHeight(INDONESIA_BOUNDS),
  },
  {
    id: "pakistan", name: "Pakistan", flag: "🇵🇰",
    citiesByDifficulty: { easy: PAKISTAN_EASY, medium: PAKISTAN_MEDIUM, hard: PAKISTAN_HARD },
    bounds: PAKISTAN_BOUNDS, svgHeight: computeSvgHeight(PAKISTAN_BOUNDS),
  },
  {
    id: "turkey", name: "Turkiet", flag: "🇹🇷",
    citiesByDifficulty: { easy: TURKEY_EASY, medium: TURKEY_MEDIUM, hard: TURKEY_HARD },
    bounds: TURKEY_BOUNDS, svgHeight: computeSvgHeight(TURKEY_BOUNDS),
  },
  {
    id: "austria", name: "Österrike", flag: "🇦🇹",
    citiesByDifficulty: { easy: AUSTRIA_EASY, medium: AUSTRIA_MEDIUM, hard: AUSTRIA_HARD },
    bounds: AUSTRIA_BOUNDS, svgHeight: computeSvgHeight(AUSTRIA_BOUNDS),
  },
  {
    id: "denmark", name: "Danmark", flag: "🇩🇰",
    citiesByDifficulty: { easy: DENMARK_EASY, medium: DENMARK_MEDIUM, hard: DENMARK_HARD },
    bounds: DENMARK_BOUNDS, svgHeight: computeSvgHeight(DENMARK_BOUNDS),
  },
  {
    id: "algeria", name: "Algeriet", flag: "🇩🇿",
    citiesByDifficulty: { easy: ALGERIA_EASY, medium: ALGERIA_MEDIUM, hard: ALGERIA_HARD },
    bounds: ALGERIA_BOUNDS, svgHeight: computeSvgHeight(ALGERIA_BOUNDS),
  },
  {
    id: "dr_congo", name: "DR Kongo", flag: "🇨🇩",
    citiesByDifficulty: { easy: DR_CONGO_EASY, medium: DR_CONGO_MEDIUM, hard: DR_CONGO_HARD },
    bounds: DR_CONGO_BOUNDS, svgHeight: computeSvgHeight(DR_CONGO_BOUNDS),
  },
  {
    id: "sudan", name: "Sudan", flag: "🇸🇩",
    citiesByDifficulty: { easy: SUDAN_EASY, medium: SUDAN_MEDIUM, hard: SUDAN_HARD },
    bounds: SUDAN_BOUNDS, svgHeight: computeSvgHeight(SUDAN_BOUNDS),
  },
  {
    id: "libya", name: "Libyen", flag: "🇱🇾",
    citiesByDifficulty: { easy: LIBYA_EASY, medium: LIBYA_MEDIUM, hard: LIBYA_HARD },
    bounds: LIBYA_BOUNDS, svgHeight: computeSvgHeight(LIBYA_BOUNDS),
  },
  {
    id: "chad", name: "Tchad", flag: "🇹🇩",
    citiesByDifficulty: { easy: CHAD_EASY, medium: CHAD_MEDIUM, hard: CHAD_HARD },
    bounds: CHAD_BOUNDS, svgHeight: computeSvgHeight(CHAD_BOUNDS),
  },
  {
    id: "niger", name: "Niger", flag: "🇳🇪",
    citiesByDifficulty: { easy: NIGER_EASY, medium: NIGER_MEDIUM, hard: NIGER_HARD },
    bounds: NIGER_BOUNDS, svgHeight: computeSvgHeight(NIGER_BOUNDS),
  },
  {
    id: "angola", name: "Angola", flag: "🇦🇴",
    citiesByDifficulty: { easy: ANGOLA_EASY, medium: ANGOLA_MEDIUM, hard: ANGOLA_HARD },
    bounds: ANGOLA_BOUNDS, svgHeight: computeSvgHeight(ANGOLA_BOUNDS),
  },
  {
    id: "mali", name: "Mali", flag: "🇲🇱",
    citiesByDifficulty: { easy: MALI_EASY, medium: MALI_MEDIUM, hard: MALI_HARD },
    bounds: MALI_BOUNDS, svgHeight: computeSvgHeight(MALI_BOUNDS),
  },
  {
    id: "south_africa", name: "Sydafrika", flag: "🇿🇦",
    citiesByDifficulty: { easy: SOUTH_AFRICA_EASY, medium: SOUTH_AFRICA_MEDIUM, hard: SOUTH_AFRICA_HARD },
    bounds: SOUTH_AFRICA_BOUNDS, svgHeight: computeSvgHeight(SOUTH_AFRICA_BOUNDS),
  },
  {
    id: "south_sudan", name: "Sydsudan", flag: "🇸🇸",
    citiesByDifficulty: { easy: SOUTH_SUDAN_EASY, medium: SOUTH_SUDAN_MEDIUM, hard: SOUTH_SUDAN_HARD },
    bounds: SOUTH_SUDAN_BOUNDS, svgHeight: computeSvgHeight(SOUTH_SUDAN_BOUNDS),
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
