import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { dictionaries, Dictionary } from './ui';

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'ichh-lang';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'fr';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    // stockage indisponible (navigation privée…)
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : navigator.language ? 'en' : 'fr';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignoré
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext) ?? { lang: 'fr', setLang: () => {} };
}

/** Textes de l'interface dans la langue courante. */
export function useT(): Dictionary {
  return dictionaries[useLang().lang];
}
