import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Ondersteunde talen van de site. Nederlands is de standaard.
export type Lang = "nl" | "en";

// Een tekst (of andere waarde) in elke ondersteunde taal, bijv. { nl: "Hallo", en: "Hello" }.
export type Localized<T = string> = Record<Lang, T>;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "nl",
  setLang: () => {},
});

// Houdt de gekozen taal bij voor de hele app (via de taalschakelaar in de header).
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("nl");

  // Toegankelijkheid: houd <html lang> gelijk aan de gekozen taal, zodat
  // screenreaders de tekst met de juiste uitspraak voorlezen.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

// Geeft de huidige taal en een functie om die te wijzigen.
export function useLang() {
  return useContext(LangContext);
}
