import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/** Préférence choisie par le visiteur ; « system » suit le réglage clair/sombre de l'appareil. */
export type ThemePref = 'system' | 'light' | 'dark';

// Même clé que le script de index.html, qui applique le thème avant le premier rendu.
const STORAGE_KEY = 'ichh-theme';
const QUERY = '(prefers-color-scheme: dark)';

interface ThemeContextValue {
  pref: ThemePref;
  setPref: (pref: ThemePref) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function initialPref(): ThemePref {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // stockage indisponible (navigation privée…)
  }
  return 'system';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>(initialPref);

  const setPref = useCallback((next: ThemePref) => {
    setPrefState(next);
    try {
      if (next === 'system') window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignoré
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const apply = () => {
      const dark = pref === 'dark' || (pref === 'system' && media.matches);
      document.documentElement.classList.toggle('dark', dark);
    };
    apply();
    if (pref !== 'system') return;
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [pref]);

  return <ThemeContext.Provider value={{ pref, setPref }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext) ?? { pref: 'system', setPref: () => {} };
}
