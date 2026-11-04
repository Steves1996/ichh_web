import { Link } from 'react-router-dom';
import { ArrowRightIcon, MailIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { useSite } from '../content/SiteContentProvider';
import { useLang, useT } from '../i18n/LanguageProvider';
import * as panelsFr from '../data/site';
import * as panelsEn from '../data/en/site';

export function Panels() {
  const { lang } = useLang();
  const { maholaContact } = useSite();
  const t = useT();
  const panels = lang === 'en' ? panelsEn.panels : panelsFr.panels;

  return (
    <main>
      <section className="palette-light bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:py-20">
          <SectionHeading as="h1" tone="light" title={t.panels.title} lead={t.panels.lead} />
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 py-14 sm:px-8">
          <div className="grid gap-px bg-ink/10 md:grid-cols-2">
            {panels.map((panel) => (
              <article key={panel.n} className="bg-sand p-7 sm:p-9">
                <p className="text-[11px] uppercase tracking-[0.18em] text-ember">
                  Panel {String(panel.n).padStart(2, '0')}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-snug text-ink">{panel.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{panel.summary}</p>
                <h3 className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-muted">{t.panels.topics}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/85">
                  {panel.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
                <h3 className="mt-6 text-[11px] uppercase tracking-[0.16em] text-ink-muted">{t.panels.participants}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{panel.participants}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand-deep">
        <div className="mx-auto max-w-page px-5 py-14 sm:px-8">
          <SectionHeading as="h2" title={t.panels.method} />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [t.panels.terms, t.panels.termsText],
              [t.panels.moderators, t.panels.moderatorsText],
              [t.panels.duration, t.panels.durationText],
              [t.panels.report, t.panels.reportText],
            ].map(([title, text]) => (
              <article key={title} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-sand">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl">{t.panels.speak}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand/75">{t.panels.speakText}</p>
          </div>
          <a
            href={`mailto:${maholaContact.email}`}
            className="inline-flex shrink-0 items-center gap-2 border border-sand/30 px-5 py-3 text-sm font-medium hover:bg-sand hover:text-ink"
          >
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            {t.panels.contact}
          </a>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto flex max-w-page flex-wrap gap-6 px-5 py-8 sm:px-8">
          <Link to="/programme" className="inline-flex items-center gap-2 text-sm font-medium text-ember hover:text-ink">
            {t.nav.programme}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/speakers" className="inline-flex items-center gap-2 text-sm font-medium text-ember hover:text-ink">
            {t.nav.speakers}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
