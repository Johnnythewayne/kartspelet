import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CountryMap from "@/components/CountryMap";
import GameResults from "@/components/GameResults";
import CountryThumbnail from "@/components/CountryThumbnail";
import {
  COUNTRIES,
  latLngToSvg,
  svgToLatLng,
  haversineDistance,
  calculateScore } from
"@/data/countries";
import type { CountryConfig } from "@/data/countries";
import { t } from "@/data/translations";
import type { Language } from "@/data/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import flagGermany from "@/assets/flag-germany.png";
import flagSweden from "@/assets/flag-sweden.png";
import flagNorway from "@/assets/flag-norway.png";
import flagUganda from "@/assets/flag-uganda.png";
import flagMyanmar from "@/assets/flag-myanmar.png";
import flagFrance from "@/assets/flag-france.png";
import flagEngland from "@/assets/flag-england.png";
import flagUsa from "@/assets/flag-usa.png";
import flagSpain from "@/assets/flag-spain.png";
import flagItaly from "@/assets/flag-italy.png";
import flagPoland from "@/assets/flag-poland.png";
import flagBrazil from "@/assets/flag-brazil.png";
import flagArgentina from "@/assets/flag-argentina.png";
import flagIndia from "@/assets/flag-india.png";
import flagChina from "@/assets/flag-china.png";
import flagAustralia from "@/assets/flag-australia.png";
import flagRussia from "@/assets/flag-russia.png";
import flagUkraine from "@/assets/flag-ukraine.png";
import flagFinland from "@/assets/flag-finland.png";
import flagCanada from "@/assets/flag-canada.png";
import flagMexico from "@/assets/flag-mexico.png";
import flagPeru from "@/assets/flag-peru.png";
import flagColombia from "@/assets/flag-colombia.png";
import flagBolivia from "@/assets/flag-bolivia.png";
import flagVenezuela from "@/assets/flag-venezuela.png";
import flagChile from "@/assets/flag-chile.png";
import flagParaguay from "@/assets/flag-paraguay.png";
import flagEcuador from "@/assets/flag-ecuador.png";
import flagGuyana from "@/assets/flag-guyana.png";
import flagKazakhstan from "@/assets/flag-kazakhstan.png";
import flagSaudiArabia from "@/assets/flag-saudi-arabia.png";
import flagIran from "@/assets/flag-iran.png";
import flagMongolia from "@/assets/flag-mongolia.png";
import flagIndonesia from "@/assets/flag-indonesia.png";
import flagPakistan from "@/assets/flag-pakistan.png";
import flagTurkey from "@/assets/flag-turkey.png";
import flagAustria from "@/assets/flag-austria.png";
import flagDenmark from "@/assets/flag-denmark.png";
import flagAlgeria from "@/assets/flag-algeria.png";
import flagDrCongo from "@/assets/flag-dr-congo.png";
import flagSudan from "@/assets/flag-sudan.png";
import flagLibya from "@/assets/flag-libya.png";
import flagChad from "@/assets/flag-chad.png";
import flagNiger from "@/assets/flag-niger.png";
import flagAngola from "@/assets/flag-angola.png";
import flagMali from "@/assets/flag-mali.png";
import flagSouthAfrica from "@/assets/flag-south-africa.png";
import flagSouthSudan from "@/assets/flag-south-sudan.png";
import flagEthiopia from "@/assets/flag-ethiopia.png";
import flagPhilippines from "@/assets/flag-philippines.png";

const FLAG_IMAGES: Record<string, string> = {
  germany: flagGermany,
  sweden: flagSweden,
  norway: flagNorway,
  uganda: flagUganda,
  myanmar: flagMyanmar,
  france: flagFrance,
  england: flagEngland,
  usa: flagUsa,
  spain: flagSpain,
  italy: flagItaly,
  poland: flagPoland,
  brazil: flagBrazil,
  argentina: flagArgentina,
  india: flagIndia,
  china: flagChina,
  australia: flagAustralia,
  russia: flagRussia,
  ukraine: flagUkraine,
  finland: flagFinland,
  canada: flagCanada,
  mexico: flagMexico,
  peru: flagPeru,
  colombia: flagColombia,
  bolivia: flagBolivia,
  venezuela: flagVenezuela,
  chile: flagChile,
  paraguay: flagParaguay,
  ecuador: flagEcuador,
  guyana: flagGuyana,
  kazakhstan: flagKazakhstan,
  saudi_arabia: flagSaudiArabia,
  iran: flagIran,
  mongolia: flagMongolia,
  indonesia: flagIndonesia,
  pakistan: flagPakistan,
  turkey: flagTurkey,
  austria: flagAustria,
  denmark: flagDenmark,
  algeria: flagAlgeria,
  dr_congo: flagDrCongo,
  sudan: flagSudan,
  libya: flagLibya,
  chad: flagChad,
  niger: flagNiger,
  angola: flagAngola,
  mali: flagMali,
  south_africa: flagSouthAfrica,
  south_sudan: flagSouthSudan,
  ethiopia: flagEthiopia,
  philippines: flagPhilippines,
};

interface RoundResult {
  cityName: string;
  distanceKm: number;
  score: number;
}

type GamePhase = "start" | "pick-difficulty" | "playing" | "feedback" | "results";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Index: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [lang, setLang] = useState<Language>("sv");
  const [country, setCountry] = useState<CountryConfig>(COUNTRIES[0]);
  const [cities, setCities] = useState(country.citiesByDifficulty.easy);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessPos, setGuessPos] = useState<{x: number;y: number;} | null>(null);
  const [roundResult, setRoundResult] = useState<{distanceKm: number;score: number;} | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState("easy");

  const currentCity = cities[currentIndex];
  const correctPos = currentCity ? latLngToSvg(currentCity.lat, currentCity.lng, country.bounds, country.svgHeight) : null;

  const pickCountry = useCallback((selectedCountry: CountryConfig) => {
    setCountry(selectedCountry);
    setPhase("pick-difficulty");
  }, []);

  const startGame = useCallback((difficultyId: string) => {
    setCurrentDifficulty(difficultyId);
    const gameCities = country.citiesByDifficulty[difficultyId] || country.citiesByDifficulty.easy;
    const shuffled = shuffleArray(gameCities);
    setCities(shuffled);
    setCurrentIndex(0);
    setGuessPos(null);
    setRoundResult(null);
    setResults([]);
    setPhase("playing");
  }, [country]);

  const nextCity = useCallback(() => {
    setResults((prev) => [
    ...prev,
    { cityName: currentCity.name, distanceKm: roundResult!.distanceKm, score: roundResult!.score }]
    );
    if (currentIndex + 1 >= cities.length) {
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setGuessPos(null);
      setRoundResult(null);
      setPhase("playing");
    }
  }, [currentCity, roundResult, currentIndex, cities.length]);

  const handleMapClick = useCallback(
    (x: number, y: number) => {
      if (phase === "feedback") {
        nextCity();
        return;
      }
      if (phase !== "playing") return;
      const guess = svgToLatLng(x, y, country.bounds, country.svgHeight);
      const dist = haversineDistance(guess.lat, guess.lng, currentCity.lat, currentCity.lng);
      const score = calculateScore(dist);
      setGuessPos({ x, y });
      setRoundResult({ distanceKm: dist, score });
      setPhase("feedback");
    },
    [phase, currentCity, country.bounds, country.svgHeight, nextCity]
  );

  const langSwitcher = (
    <div className="absolute top-4 right-4">
      <LanguageSwitcher lang={lang} onLangChange={setLang} />
    </div>
  );

  if (phase === "start") {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
        {langSwitcher}
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-foreground">{t(lang, "title")}</h1>
          <p className="text-lg text-muted-foreground">{t(lang, "subtitle")}</p>
          <p className="text-sm text-muted-foreground">{t(lang, "chooseCountry")}</p>
          <div className="flex flex-col gap-4">
            {[
              { continent: t(lang, "continentEurope"), ids: ["germany", "sweden", "norway", "denmark", "france", "england", "spain", "italy", "poland", "austria", "russia", "ukraine", "finland"] },
              { continent: t(lang, "continentNorthAmerica"), ids: ["usa", "canada", "mexico"] },
              { continent: t(lang, "continentSouthAmerica"), ids: ["brazil", "argentina", "peru", "colombia", "bolivia", "venezuela", "chile", "paraguay", "ecuador", "guyana"] },
              { continent: t(lang, "continentAfrica"), ids: ["uganda", "ethiopia", "algeria", "dr_congo", "sudan", "libya", "chad", "niger", "angola", "mali", "south_africa", "south_sudan"] },
              { continent: t(lang, "continentAsia"), ids: ["myanmar", "india", "china", "kazakhstan", "saudi_arabia", "iran", "mongolia", "indonesia", "pakistan", "turkey", "philippines"] },
              { continent: t(lang, "continentOceania"), ids: ["australia"] },
            ].map((group) => {
              const groupCountries = group.ids.map(id => COUNTRIES.find(c => c.id === id)!).filter(Boolean);
              if (groupCountries.length === 0) return null;
              return (
                <div key={group.continent} className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">{group.continent}</p>
                  <div className="flex flex-col gap-2">
                    {groupCountries.map((c) => {
                      const nameKey = `country${c.id.charAt(0).toUpperCase()}${c.id.slice(1)}` as any;
                      return (
                        <Button
                          key={c.id}
                          size="lg"
                          onClick={() => pickCountry(c)}
                          className="text-lg px-8 flex items-center gap-3 justify-start"
                          variant="outline">
                          <CountryThumbnail countryId={c.id} size={32} />
                          <img src={FLAG_IMAGES[c.id]} alt={c.name} width={24} height={16} className="shrink-0 rounded-sm object-contain" />
                          {t(lang, nameKey)}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>);

  }

  const difficulties = [
  { id: "easy", label: t(lang, "diffEasy"), description: t(lang, "diffEasyDesc") },
  { id: "medium", label: t(lang, "diffMedium"), description: t(lang, "diffMediumDesc") },
  { id: "hard", label: t(lang, "diffHard"), description: t(lang, "diffHardDesc") },
  { id: "all", label: t(lang, "diffAll"), description: t(lang, "diffAllDesc") }];


  if (phase === "pick-difficulty") {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background p-4">
        {langSwitcher}
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl font-extrabold text-foreground flex items-center justify-center gap-2">
            <img src={FLAG_IMAGES[country.id]} alt={country.name} width={32} height={22} className="shrink-0 rounded-sm object-contain" />
            {t(lang, `country${country.id.charAt(0).toUpperCase()}${country.id.slice(1)}` as any)}
          </h1>
          <p className="text-sm text-muted-foreground">{t(lang, "chooseDifficulty")}</p>
          <div className="flex flex-col gap-3">
            {difficulties.map((d) =>
            <Button
              key={d.id}
              size="lg"
              onClick={() => startGame(d.id)}
              variant="outline"
              className="text-lg">

                {d.label} – {d.description}
              </Button>
            )}
          </div>
          <Button variant="ghost" onClick={() => setPhase("start")} className="text-muted-foreground">
            {t(lang, "back")}
          </Button>
        </div>
      </div>);

  }

  if (phase === "results") {
    return (
      <div className="min-h-screen bg-background py-8">
        <GameResults
          results={results}
          onPlayAgain={() => startGame(currentDifficulty)}
          onChangeDifficulty={() => setPhase("pick-difficulty")}
          onChangeCountry={() => setPhase("start")}
          lang={lang} />
      </div>);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 gap-4">
      <div className="w-full max-w-lg space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setPhase("start")} className="text-muted-foreground hover:text-foreground" title="Home">
              🏠
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setPhase("pick-difficulty")} className="text-muted-foreground hover:text-foreground">
              {t(lang, "back")}
            </Button>
          </div>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <img src={FLAG_IMAGES[country.id]} alt={country.name} width={18} height={12} className="shrink-0 rounded-sm object-contain" />
            {t(lang, "city")} {currentIndex + 1} {t(lang, "of")} {cities.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {t(lang, "score")}: {results.reduce((s, r) => s + r.score, 0)}
            </span>
            <LanguageSwitcher lang={lang} onLangChange={setLang} />
          </div>
        </div>
        <Progress value={currentIndex / cities.length * 100} className="h-2" />
      </div>

      <CountryMap
        countryId={country.id}
        bounds={country.bounds}
        svgHeight={country.svgHeight}
        onMapClick={handleMapClick}
        guessMarker={guessPos}
        correctMarker={correctPos}
        showResult={phase === "feedback"}
        disabled={false} />

      <h2 className="text-3xl font-bold text-foreground">
        📍 {currentCity.name}
      </h2>
      <p className="text-muted-foreground text-sm">
        {phase === "playing" ? t(lang, "clickInstruction") : ""}
      </p>


      {phase === "feedback" && roundResult &&
      <div className="w-full max-w-lg space-y-3 text-center">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t(lang, "distance")}</p>
              <p className="text-2xl font-bold text-foreground">{Math.round(roundResult.distanceKm)} km</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t(lang, "score")}</p>
              <p className="text-2xl font-bold text-primary">{roundResult.score}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{t(lang, "clickInstruction").replace(/📍.*/, "📍 " + (currentIndex + 1 >= cities.length ? t(lang, "seeResults") : t(lang, "nextCity")))}</p>
        </div>
      }
    </div>);

};

export default Index;