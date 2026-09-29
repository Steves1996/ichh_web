import React from 'react';
import { Lang, useLang, useT } from '../i18n/LanguageProvider';

const LANGS: Lang[] = ['fr', 'en'];

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <div role="group" aria-label={t.lang.label} className={`inline-flex border border-ink/15 ${className}`}>
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            title={active ? undefined : t.lang.switchTo}
            onClick={() => setLang(code)}
            className={`px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-150 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 ${
            active ? 'bg-ink text-sand' : 'text-ink-muted hover:text-ink'}`
            }>
            {code}
          </button>);

      })}
    </div>);

}
