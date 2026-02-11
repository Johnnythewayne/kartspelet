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
  calculateScore,
} from "@/data/countries";
import type { CountryConfig } from "@/data/countries";

interface RoundResult {
  cityName: string;
  distanceKm: number;
  score: number;
}

type GamePhase = "start" | "playing" | "feedback" | "results";

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
  const [country, setCountry] = useState<CountryConfig>(COUNTRIES[0]);
  const [cities, setCities] = useState(country.cities);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guessPos, setGuessPos] = useState<{ x: number; y: number } | null>(null);
  const [roundResult, setRoundResult] = useState<{ distanceKm: number; score: number } | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);

  const currentCity = cities[currentIndex];
  const correctPos = currentCity ? latLngToSvg(currentCity.lat, currentCity.lng, country.bounds) : null;

  const startGame = useCallback((selectedCountry: CountryConfig) => {
    setCountry(selectedCountry);
    const shuffled = shuffleArray(selectedCountry.cities);
    setCities(shuffled);
    setCurrentIndex(0);
    setGuessPos(null);
    setRoundResult(null);
    setResults([]);
    setPhase("playing");
  }, []);

  const handleMapClick = useCallback(
    (x: number, y: number) => {
      if (phase !== "playing") return;
      const guess = svgToLatLng(x, y, country.bounds);
      const dist = haversineDistance(guess.lat, guess.lng, currentCity.lat, currentCity.lng);
      const score = calculateScore(dist);
      setGuessPos({ x, y });
      setRoundResult({ distanceKm: dist, score });
      setPhase("feedback");
    },
    [phase, currentCity, country.bounds]
  );

  const nextCity = useCallback(() => {
    setResults((prev) => [
      ...prev,
      { cityName: currentCity.name, distanceKm: roundResult!.distanceKm, score: roundResult!.score },
    ]);
    if (currentIndex + 1 >= cities.length) {
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
      setGuessPos(null);
      setRoundResult(null);
      setPhase("playing");
    }
  }, [currentCity, roundResult, currentIndex, cities.length]);

  if (phase === "start") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-foreground">🗺️ Städer på kartan</h1>
          <p className="text-lg text-muted-foreground">
            Placera städer på kartan. Ju närmare du klickar, desto fler poäng!
          </p>
          <p className="text-sm text-muted-foreground">Välj ett land:</p>
          <div className="flex gap-4 justify-center">
            {COUNTRIES.map((c) => (
              <Button
                key={c.id}
                size="lg"
                onClick={() => startGame(c)}
                className="text-lg px-8"
                variant="outline"
              >
                {c.flag} {c.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen bg-background py-8">
        <GameResults
          results={[
            ...results,
            { cityName: currentCity.name, distanceKm: roundResult!.distanceKm, score: roundResult!.score },
          ]}
          onPlayAgain={() => setPhase("start")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 gap-4">
      <div className="w-full max-w-lg space-y-2">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => setPhase("start")} className="text-muted-foreground hover:text-foreground">
            ← Tillbaka
          </Button>
          <span className="text-sm text-muted-foreground">
            {country.flag} Stad {currentIndex + 1} av {cities.length}
          </span>
          <span className="text-sm font-medium text-foreground">
            Poäng: {results.reduce((s, r) => s + r.score, 0)}
          </span>
        </div>
        <Progress value={(currentIndex / cities.length) * 100} className="h-2" />
      </div>

      <h2 className="text-3xl font-bold text-foreground">
        📍 {currentCity.name}
      </h2>
      <p className="text-muted-foreground text-sm">
        {phase === "playing" ? "Klicka på kartan där du tror staden ligger" : ""}
      </p>

      <CountryMap
        countryId={country.id}
        bounds={country.bounds}
        onMapClick={handleMapClick}
        guessMarker={guessPos}
        correctMarker={correctPos}
        showResult={phase === "feedback"}
        disabled={phase === "feedback"}
      />

      {phase === "feedback" && roundResult && (
        <div className="w-full max-w-lg space-y-3 text-center">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avstånd</p>
              <p className="text-2xl font-bold text-foreground">{Math.round(roundResult.distanceKm)} km</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Poäng</p>
              <p className="text-2xl font-bold text-primary">{roundResult.score}</p>
            </div>
          </div>
          <Button onClick={nextCity} size="lg" className="w-full">
            {currentIndex + 1 >= cities.length ? "Se resultat" : "Nästa stad →"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
