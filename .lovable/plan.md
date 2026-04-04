## First Batch: 8 New Countries

### Countries to add:
- **Europe**: Spain 🇪🇸, Italy 🇮🇹, Poland 🇵🇱
- **South America**: Brazil 🇧🇷, Argentina 🇦🇷
- **Asia**: India 🇮🇳, China 🇨🇳
- **Oceania**: Australia 🇦🇺

### For each country, I'll create:
1. **Border JSON** — extracted from Natural Earth / GADM geodata (simplified)
2. **36 cities** — 12 easy, 12 medium, 12 hard (by population rank)
3. **Rivers JSON** — extracted from ne_10m_rivers.geojson
4. **Lakes data** — extracted from ne_10m_lakes.geojson
5. **Neighbor borders** — from GADM level 0 data
6. **Country config** — bounds, svgHeight, city arrays
7. **Translations** — country names in Swedish/English/Luganda
8. **Flag images** — using existing flag approach
9. **Continent grouping** — updated in Index.tsx

### Processing approach:
- Use existing ne_10m_rivers.geojson and ne_10m_lakes.geojson in tmp/ for rivers & lakes
- Use ne_110m_countries.geojson for country borders (simplified for performance)
- Download GADM data for high-res borders where needed
- Follow existing Douglas-Peucker simplification patterns

### Remaining countries (future batches):
- Europe: UK variations, Netherlands, Belgium, Austria, Switzerland, Czech Republic, Romania, Greece, Portugal
- North America: Canada, Mexico
- South America: Colombia, Peru, Venezuela, Chile, Ecuador, Bolivia, Paraguay, Uruguay
- Asia: Japan, Indonesia, Thailand, Vietnam, Philippines, South Korea, Pakistan, Bangladesh
