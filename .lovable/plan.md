
# 🇩🇪 Tyska Städer-spelet

Ett geografispel där spelaren ska placera tyska städer på en karta – ju närmare rätt position, desto fler poäng!

## Spelupplägg
- **10–15 stora tyska städer** ingår (t.ex. Berlin, München, Hamburg, Frankfurt, Köln, Stuttgart, Dresden, Leipzig, Düsseldorf, Hannover, Nürnberg, Bremen)
- En SVG-karta över Tyskland visas på skärmen
- Varje runda presenteras ett stadsnamn och spelaren klickar på kartan där hen tror att staden ligger

## Spelmekanik
- **Avstånd-baserat poängsystem** (à la GeoGuessr): Maxpoäng om du träffar exakt rätt, poängen minskar gradvis ju längre bort du klickar
- Efter varje gissning visas:
  - Var du klickade
  - Var staden faktiskt ligger
  - Avståndet i km och poängen du fick
- En "Nästa stad"-knapp tar dig vidare

## Resultat & Avslutning
- Efter alla städer visas en sammanfattningssida med:
  - Totalpoäng
  - Bästa och sämsta gissning
  - Möjlighet att spela igen

## Design
- Ren, modern design med Tysklands konturer som SVG
- Tydliga markörer för gissning (röd) och rätt svar (grön)
- Animerad linje mellan gissning och rätt svar
- Responsivt – fungerar på både dator och mobil
