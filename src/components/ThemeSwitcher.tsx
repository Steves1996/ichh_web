import React from 'react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { ThemePref, useTheme } from '../theme/ThemeProvider';
import { useT } from '../i18n/LanguageProvider';

const ORDER: ThemePref[] = ['system', 'light', 'dark'];
const ICONS = { system: MonitorIcon, light: SunIcon, dark: MoonIcon };

/** Bouton unique qui fait défiler : automatique → clair → sombre. */
export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { pref, setPref } = useTheme();
  const t = useT();
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const Icon = ICONS[pref];
  const label = `${t.theme.label} : ${t.theme[pref]} — ${t.theme.switchTo(t.theme[next])}`;

  return (
    <button
      type="button"
      onClick={() => setPref(next)}
      aria-label={label}
      title={label}
      className={`inline-flex h-[30px] w-[30px] items-center justify-center border border-ink/15 text-ink-muted transition-colors duration-150 ease-expo hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 ${className}`}>
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>);

}
