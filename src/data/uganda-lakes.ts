// Uganda lakes - high-resolution data from OpenStreetMap and Natural Earth

export interface UgandaLakeData {
  name: string;
  coordinates: [number, number][];
}

// Re-export type for use in CountryMap - actual data is imported directly from JSON there
export type { UgandaLakeData as LakeData };
