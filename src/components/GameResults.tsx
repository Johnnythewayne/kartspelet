import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/data/translations";
import type { Language } from "@/data/translations";

interface RoundResult {
  cityName: string;
  distanceKm: number;
  score: number;
}

interface GameResultsProps {
  results: RoundResult[];
  onPlayAgain: () => void;
  onChangeDifficulty?: () => void;
  onChangeCountry?: () => void;
  lang: Language;
}

const GameResults: React.FC<GameResultsProps> = ({ results, onPlayAgain, onChangeDifficulty, onChangeCountry, lang }) => {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxPossible = results.length * 1000;
  const best = results.reduce((a, b) => (a.score > b.score ? a : b));
  const worst = results.reduce((a, b) => (a.score < b.score ? a : b));

  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-foreground">{t(lang, "results")}</h1>

      <Card className="w-full">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-5xl font-extrabold text-primary">
            {totalScore}
          </CardTitle>
          <p className="text-muted-foreground">{t(lang, "ofPossible", { max: maxPossible })}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between p-3 rounded-md bg-accent/50">
            <span className="text-sm font-medium">{t(lang, "bestGuess")}</span>
            <span className="text-sm font-bold">{best.cityName} ({Math.round(best.distanceKm)} km)</span>
          </div>
          <div className="flex justify-between p-3 rounded-md bg-accent/50">
            <span className="text-sm font-medium">{t(lang, "worstGuess")}</span>
            <span className="text-sm font-bold">{worst.cityName} ({Math.round(worst.distanceKm)} km)</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-border last:border-0">
                <span className="font-medium">{r.cityName}</span>
                <div className="flex gap-3 text-muted-foreground">
                  <span>{Math.round(r.distanceKm)} km</span>
                  <span className="font-bold text-foreground w-16 text-right">{r.score} {t(lang, "points")}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button size="lg" onClick={onPlayAgain} className="w-full">
        {t(lang, "playAgain")}
      </Button>
    </div>
  );
};

export default GameResults;
