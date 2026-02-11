import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CountryMap from "@/components/CountryMap";
import GameResults from "@/components/GameResults";
import {
  COUNTRIES,
  latLngToSvg,
  svgToLatLng,
  haversineDistance,
  calculateScore } from
"@/data/countries";
import type { CountryConfig } from "@/data/countries";
import { LANGUAGES, t } from "@/data/translations";
import type { Language } from "@/data/translations";

interface RoundResult {
  cityName: string;
  distanceKm: number;
  score: number;
}

type GamePhase = "pick-language" | "start" | "pick-difficulty" | "playing" | "feedback" | "results";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Index: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>("pick-language");
  const [lang, setLang] = useState<Language>("sv");
  const [country, setCountry] = useState<CountryConfig>(COUNTRIES[0]);
  const [cities, setCities] = useState(country.citiesByDifficulty.easy);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessPos, setGuessPos] = useState<{x: number;y: number;} | null>(null);
  const [roundResult, setRoundResult] = useState<{distanceKm: number;score: number;} | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);

  const currentCity = cities[currentIndex];
  const correctPos = currentCity ? latLngToSvg(currentCity.lat, currentCity.lng, country.bounds, country.svgHeight) : null;

  const pickCountry = useCallback((selectedCountry: CountryConfig) => {
    setCountry(selectedCountry);
    setPhase("pick-difficulty");
  }, []);

  const startGame = useCallback((difficultyId: string) => {
    const gameCities = country.citiesByDifficulty[difficultyId] || country.citiesByDifficulty.easy;
    const shuffled = shuffleArray(gameCities);
    setCities(shuffled);
    setCurrentIndex(0);
    setGuessPos(null);
    setRoundResult(null);
    setResults([]);
    setPhase("playing");
  }, [country]);

  const handleMapClick = useCallback(
    (x: number, y: number) => {
      if (phase !== "playing") return;
      const guess = svgToLatLng(x, y, country.bounds, country.svgHeight);
      const dist = haversineDistance(guess.lat, guess.lng, currentCity.lat, currentCity.lng);
      const score = calculateScore(dist);
      setGuessPos({ x, y });
      setRoundResult({ distanceKm: dist, score });
      setPhase("feedback");
    },
    [phase, currentCity, country.bounds, country.svgHeight]
  );

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

  if (phase === "pick-language") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-foreground">🗺️</h1>
          
          <div className="flex flex-col gap-3">
            {LANGUAGES.map((l) =>
            <Button
              key={l.id}
              size="lg"
              onClick={() => {setLang(l.id);setPhase("start");}}
              variant="outline"
              className="text-lg">

                {l.flag} {l.label}
              </Button>
            )}
          </div>
        </div>
      </div>);

  }

  if (phase === "start") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-foreground">{t(lang, "title")}</h1>
          <p className="text-lg text-muted-foreground">{t(lang, "subtitle")}</p>
          <p className="text-sm text-muted-foreground">{t(lang, "chooseCountry")}</p>
          <div className="flex gap-4 justify-center">
            {COUNTRIES.map((c) => {
            const nameKey = `country${c.id.charAt(0).toUpperCase()}${c.id.slice(1)}` as any;
            return (
            <Button
              key={c.id}
              size="lg"
              onClick={() => pickCountry(c)}
              className="text-lg px-8"
              variant="outline">
                {c.flag} {t(lang, nameKey)}
              </Button>
            );
            })}
          </div>
          <Button variant="ghost" onClick={() => setPhase("pick-language")} className="text-muted-foreground">
            {t(lang, "back")}
          </Button>
        </div>
      </div>);

  }

  const difficulties = [
  { id: "easy", label: t(lang, "diffEasy"), description: t(lang, "diffEasyDesc") },
  { id: "medium", label: t(lang, "diffMedium"), description: t(lang, "diffMediumDesc") },
  { id: "hard", label: t(lang, "diffHard"), description: t(lang, "diffHardDesc") }];


  if (phase === "pick-difficulty") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-3xl font-extrabold text-foreground">{country.flag} {t(lang, `country${country.id.charAt(0).toUpperCase()}${country.id.slice(1)}` as any)}</h1>
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
          results={[
          ...results,
          { cityName: currentCity.name, distanceKm: roundResult!.distanceKm, score: roundResult!.score }]
          }
          onPlayAgain={() => setPhase("pick-language")}
          lang={lang} />

      </div>);

  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 gap-4">
      <div className="w-full max-w-lg space-y-2">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => setPhase("pick-language")} className="text-muted-foreground hover:text-foreground">
            {t(lang, "back")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {country.flag} {t(lang, "city")} {currentIndex + 1} {t(lang, "of")} {cities.length}
          </span>
          <span className="text-sm font-medium text-foreground">
            {t(lang, "score")}: {results.reduce((s, r) => s + r.score, 0)}
          </span>
        </div>
        <Progress value={currentIndex / cities.length * 100} className="h-2" />
      </div>

      <h2 className="text-3xl font-bold text-foreground">
        📍 {currentCity.name}
      </h2>
      <p className="text-muted-foreground text-sm">
        {phase === "playing" ? t(lang, "clickInstruction") : ""}
      </p>

      <CountryMap
        countryId={country.id}
        bounds={country.bounds}
        svgHeight={country.svgHeight}
        onMapClick={handleMapClick}
        guessMarker={guessPos}
        correctMarker={correctPos}
        showResult={phase === "feedback"}
        disabled={phase === "feedback"} />


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
          <Button onClick={nextCity} size="lg" className="w-full">
            {currentIndex + 1 >= cities.length ? t(lang, "seeResults") : t(lang, "nextCity")}
          </Button>
        </div>
      }
    </div>);

};

export default Index;