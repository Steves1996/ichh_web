import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { Newsletter } from '../components/Newsletter';
import { useSite } from '../content/SiteContentProvider';
import { useLang, useT } from '../i18n/LanguageProvider';
import type { Member } from '../types';
import { RichText } from '../components/RichText';

function CommitteeList({ title, members, note }: {title: string;members: Member[];note: string;}) {
  return (
    <div>
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ink-muted">{note}</p>
      <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {members.map((member) =>
        <li key={member.name} className="py-3.5">
            <p className="font-medium text-ink">{member.name}</p>
            <p className="text-[13px] text-ink-muted">
              {member.role} · {member.organization}
            </p>
          </li>
        )}
      </ul>
    </div>);

}

export function About() {
  const { audiences, event, objectives, organizingCommittee, outcomes, scientificCommittee } = useSite();
  const { lang } = useLang();
  const t = useT();
  return (
    <main>
      <section className="palette-light bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            title={t.about.title}
            lead={t.about.lead} />
          
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ink">
                {lang === 'en' ? event.fullName : event.fullNameFr}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                {lang === 'en' ? event.fullNameFr : event.fullName} · {event.name}
              </p>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
                <p>
                  <span className="font-medium text-ink">{t.about.contextLabel}</span> {t.about.context}
                </p>
                <p>
                  <span className="font-medium text-ink">{t.about.visionLabel}</span> {t.about.vision}
                </p>
                <p>
                  <span className="font-medium text-ink">{t.about.whyCameroonLabel}</span> {t.about.whyCameroon}
                </p>
              </div>
            </div>

            <aside className="bg-sand-deep p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{t.about.theme}</p>
              <p className="mt-4 font-display text-3xl leading-tight text-ink">
                {lang === 'en' ? `“${event.themeEn}”` : `« ${event.themeEn} »`}
              </p>
              {lang !== 'en' && <p className="mt-2 text-sm text-ink-muted">{event.theme}</p>}
              <div className="ichh-rule my-7" />
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-ink-muted">{t.about.dates}</dt>
                  <dd className="font-medium text-ink">{event.dates}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.about.venue}</dt>
                  <dd className="font-medium text-ink">
                    {event.venue}, {event.city}, {event.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.about.languages}</dt>
                  <dd className="font-medium text-ink">{t.about.languagesValue}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.about.supervision}</dt>
                  <dd className="font-medium text-ink">{t.about.supervisionValue}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.about.coordination}</dt>
                  <dd className="font-medium text-ink">Mahola Health Foundation · Dr Mathilde Mbouck</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t.about.commissioner}</dt>
                  <dd className="font-medium text-ink">All Access Agency</dd>
                </div>
              </dl>
              <Link
                to="/mahola"
                className="mt-7 inline-block text-sm font-medium text-ember transition-colors duration-150 hover:text-ink">
                
                {t.about.discoverMahola}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="palette-light bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" tone="light" title={t.about.objectivesTitle} />
          <ol className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-2">
            {objectives.map((objective, index) =>
            <li key={objective} className="flex gap-5 border-t border-sand/20 pt-5">
                <span className="font-display text-2xl leading-none text-ember-soft tabular-nums">
                  {index + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-sand/80">{objective}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      {/* Public cible */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title={t.about.audiencesTitle}
            lead={t.about.audiencesLead} />
          
          <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) =>
            <div key={audience.title} className="border-t border-ink/15 pt-5">
                <dt className="font-display text-xl text-ink">{audience.title}</dt>
                <dd><RichText className="mt-2 text-sm leading-relaxed text-ink-muted">{audience.text}</RichText></dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Résultats attendus */}
      <section className="border-y border-ink/10 bg-sand-deep">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title={t.about.outcomesTitle}
            lead={t.about.outcomesLead} />
          
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2">
            {outcomes.map((outcome) =>
            <article key={outcome.label} className="bg-sand-deep p-7">
                <h3 className="font-display text-2xl text-ink">{outcome.label}</h3>
                <RichText className="mt-3 text-sm leading-relaxed text-ink-muted">{outcome.text}</RichText>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Comités */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" title={t.about.organisersTitle} />
          <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <CommitteeList
              title={t.about.governanceTitle}
              members={organizingCommittee}
              note={t.about.governanceNote} />

            <CommitteeList
              title={t.about.scientificTitle}
              members={scientificCommittee}
              note={t.about.scientificNote} />

          </div>
        </div>
      </section>

      <Newsletter />
    </main>);

}