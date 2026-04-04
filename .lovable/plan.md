
## Add 10 African Countries

Countries (by area, including South Sudan and South Africa):
1. Algeria (DZA)
2. DR Congo (COD) 
3. Sudan (SDN)
4. Libya (LBY)
5. Chad (TCD)
6. Niger (NER)
7. Angola (AGO)
8. Mali (MLI)
9. South Africa (ZAF)
10. South Sudan (SSD)

### For each country, need:
1. **Border JSON** (`src/data/{country}-border.json`) - 1500+ point resolution from GADM/Natural Earth
2. **Cities data** (`src/data/cities-{country}.ts`) - 36 cities (12 easy, 12 medium, 12 hard)
3. **Lakes data** (`src/data/{country}-lakes.ts`) - empty array initially
4. **Rivers data** (`src/data/rivers-{country}.json`) - empty array initially
5. **Flag image** (`src/assets/flag-{country}.png`)
6. **Country config** in `countries.ts` with bounds
7. **Translations** in all 4 languages (sv, en, no, lg)
8. **Index.tsx** registration in Africa continent group

### Steps:
1. Download GADM data for missing countries
2. Generate border JSONs via Python/shapely
3. Create all city data files
4. Create lakes/rivers stubs
5. Generate flag images
6. Update countries.ts with imports and configs
7. Update translations.ts
8. Update Index.tsx
