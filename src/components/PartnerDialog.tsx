import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CheckIcon, LoaderIcon, XIcon } from 'lucide-react';

const API_URL = ((import.meta as any).env?.VITE_API_URL ?? '').replace(/\/$/, '');

type Status = 'idle' | 'loading' | 'done' | 'error';

interface PartnerDialogContextValue {
  open: () => void;
  close: () => void;
}

const PartnerDialogContext = createContext<PartnerDialogContextValue | null>(null);

export function usePartnerDialog(): PartnerDialogContextValue {
  const ctx = useContext(PartnerDialogContext);
  if (ctx) return ctx;
  return { open: () => {}, close: () => {} };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function PartnerForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (status === 'error') {
      setStatus('idle');
      setError(null);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return fail('Merci d’indiquer votre nom.');
    if (form.phone.trim().length < 4) return fail('Merci d’indiquer un numéro de téléphone.');
    if (!EMAIL_RE.test(form.email)) return fail('Merci de saisir une adresse e-mail valide.');
    if (form.message.trim().length < 5) return fail('Merci de préciser la qualité de partenariat souhaitée.');

    if (!API_URL) return fail('Service momentanément indisponible. Écrivez-nous par e-mail.');

    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/partner-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      setStatus('done');
    } catch {
      fail('L’envoi a échoué. Réessayez ou écrivez-nous par e-mail.');
    }
  };

  function fail(msg: string) {
    setStatus('error');
    setError(msg);
  }

  if (status === 'done') {
    return (
      <div className="flex items-start gap-3 border border-ink/15 bg-sand p-5">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss text-white">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-sm text-ink">
            Merci <span className="font-medium">{form.name.trim()}</span>. Votre demande de partenariat a bien été
            transmise à l’équipe de la Mahola Health Foundation. Nous revenons vers vous à l’adresse{' '}
            <span className="font-medium">{form.email.trim()}</span>.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex items-center bg-ink px-5 py-2.5 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-ember">
            Fermer
          </button>
        </div>
      </div>
    );
  }

  const inputCls =
    'w-full border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-150 ease-expo focus:border-ember focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-muted">Nom complet</span>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
            placeholder="Prénom Nom"
            className={`mt-2 ${inputCls}`}
            required />
        </label>
        <label className="block">
          <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-muted">Téléphone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
            placeholder="+237 6 00 00 00 00"
            className={`mt-2 ${inputCls}`}
            required />
        </label>
      </div>
      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-muted">Adresse e-mail</span>
        <input
          type="email"
          value={form.email}
          onChange={set('email')}
          autoComplete="email"
          placeholder="prenom.nom@organisation.org"
          className={`mt-2 ${inputCls}`}
          required />
      </label>
      <label className="block">
        <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          Qualité de partenariat souhaitée
        </span>
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={4}
          placeholder="Co-partenaire, sponsor (Platine / Or / Argent), stand au Salon Expo santé, table au gala… Décrivez votre organisation et le type de partenariat envisagé."
          className={`mt-2 resize-y ${inputCls}`}
          required />
      </label>

      {error && <p className="text-sm text-ember">{error}</p>}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 bg-ember px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-expo hover:bg-ink disabled:opacity-70">
          {status === 'loading' && <LoaderIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === 'loading' ? 'Envoi…' : 'Envoyer la demande'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-ink-muted transition-colors duration-150 hover:text-ink">
          Annuler
        </button>
      </div>
    </form>
  );
}

export function PartnerDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <PartnerDialogContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 px-4 py-8 sm:py-16"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-dialog-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}>
          <div className="w-full max-w-xl bg-sand-deep shadow-2xl">
            <div className="flex items-start justify-between gap-6 border-b border-ink/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ember">ICHH Yaoundé 2026</p>
                <h2 id="partner-dialog-title" className="mt-1 font-display text-2xl leading-tight text-ink">
                  Devenir partenaire
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-ink/15 text-ink-muted transition-colors duration-150 ease-expo hover:border-ember hover:text-ember">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-6 sm:px-8">
              <p className="mb-6 text-sm leading-relaxed text-ink-muted">
                Laissez-nous vos coordonnées et précisez la qualité de partenariat souhaitée. L’équipe de la
                Mahola Health Foundation vous recontacte avec le dossier d’offre de participation.
              </p>
              <PartnerForm onClose={close} />
            </div>
          </div>
        </div>
      )}
    </PartnerDialogContext.Provider>
  );
}
