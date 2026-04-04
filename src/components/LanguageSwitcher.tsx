import React from "react";
import { LANGUAGES } from "@/data/translations";
import type { Language } from "@/data/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSwitcherProps {
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lang, onLangChange }) => {
  const current = LANGUAGES.find((l) => l.id === lang);

  return (
    <Select value={lang} onValueChange={(v) => onLangChange(v as Language)}>
      <SelectTrigger className="w-auto gap-2 border-none bg-transparent text-sm text-muted-foreground hover:text-foreground">
        <SelectValue>{current?.flag}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.id} value={l.id}>
            {l.flag} {l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
