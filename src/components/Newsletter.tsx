import React, { useState } from 'react';
import { CheckIcon, LoaderIcon } from 'lucide-react';
import { useT } from '../i18n/LanguageProvider';

const API_URL = ((import.meta as any).env?.VITE_API_URL ?? '').replace(/\/$/, '');

type Status = 'idle' | 'loading' | 'done' | 'error';

export function Newsletter() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage(t.common.invalidEmail);
      return;
    }
    if (!API_URL) {
      setStatus('error');
      setMessage(t.common.unavailable);
      return;
    }
    setStatus('loading');
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage(t.newsletter.failed);
    }
  };

  return (
    <section className="palette-light bg-ink-soft" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-page px-5 sm:px-8 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="newsletter-title" className="font-display text-3xl text-white leading-tight">
              {t.newsletter.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
              {t.newsletter.text}
            </p>
          </div>

          {status === 'done' ?
          <div className="flex items-start gap-3 border border-white/20 bg-white/5 p-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss text-white">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm text-white/85">
                {t.newsletter.confirmedBefore} <span className="font-medium text-white">{email}</span>
                {t.newsletter.confirmedAfter}
              </p>
            </div> :

          <form onSubmit={onSubmit} className="lg:justify-self-end w-full max-w-lg" noValidate>
              <label htmlFor="newsletter-email" className="block text-[11px] uppercase tracking-[0.16em] text-white/50">
                {t.common.emailLabel}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setMessage(null);
                  }
                }}
                placeholder={t.common.emailPlaceholder}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className={`w-full bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 border transition-colors duration-150 ease-expo focus:outline-none focus:border-ember-soft ${
                status === 'error' ? 'border-ember-soft' : 'border-white/25'}`
                } />

                <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 bg-sand px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 ease-expo hover:bg-ember hover:text-white disabled:opacity-70">

                  {status === 'loading' && <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {status === 'loading' ? t.common.sending : t.newsletter.subscribe}
                </button>
              </div>
              {status === 'error' &&
            <p id="newsletter-error" className="mt-2 text-sm text-ember-soft">
                  {message ?? t.common.genericError}
                </p>
            }
            </form>
          }
        </div>
      </div>
    </section>);

}
