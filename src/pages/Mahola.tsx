import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon, ExternalLinkIcon, PlayIcon, QuoteIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Newsletter } from '../components/Newsletter';
import { useSite } from '../content/SiteContentProvider';
import { useT } from '../i18n/LanguageProvider';

export function Mahola() {
  const { gallery, maholaActions, maholaContact, maholaImpact, maholaMission, maholaTimeline, testimonials } = useSite();
  const t = useT();
  const [selectedYear, setSelectedYear] = useState(maholaTimeline[maholaTimeline.length - 1].year);
  const selected = maholaTimeline.find((entry) => entry.year === selectedYear) ?? maholaTimeline[0];

  return (
    <main>
      <section className="bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/mahola.png"
                  alt={t.mahola.logoAlt}
                  className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-sand/60">
                  Mahola Health Foundation
                </span>
              </div>
              <h1 className="mt-6 font-display text-[2.6rem] sm:text-6xl leading-[1.03] text-white">
                {t.mahola.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand/75">
                {t.mahola.lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end lg:self-end">
              <a
                href="https://mahola-health.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 self-start bg-ember px-6 py-4 text-sm font-medium text-white transition-colors duration-150 ease-expo hover:bg-ember-soft hover:text-ink">

                <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                {t.mahola.visitSite}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 self-start border border-sand/30 px-6 py-4 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-sand hover:text-ink">

                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                {t.mahola.impactReport}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ink">{t.mahola.historyTitle}</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
                <p>{t.mahola.history1}</p>
                <p>{t.mahola.history2}</p>
                <p>
                  {maholaMission} {t.mahola.history3}
                </p>
              </div>
            </div>

            <div className="bg-ink-soft p-8 text-sand">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sand/55">{t.mahola.videoLabel}</p>
              <button
                type="button"
                className="group mt-5 flex w-full items-center gap-4 border border-sand/25 p-5 text-left transition-colors duration-150 ease-expo hover:border-ember-soft">
                
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-ink">
                  <PlayIcon className="h-4 w-4 translate-x-[1px]" />
                </span>
                <span>
                  <span className="block font-display text-xl text-white">{t.mahola.videoTitle}</span>
                  <span className="block text-sm text-sand/65">{t.mahola.videoMeta}</span>
                </span>
              </button>
              <p className="mt-6 text-sm leading-relaxed text-sand/70">
                {t.mahola.videoNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missions de Mahola */}
      <section className="border-y border-ink/10 bg-sand-deep" aria-labelledby="actions-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title={t.mahola.actionsTitle}
            lead={t.mahola.actionsLead} />

          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {maholaActions.map((action) =>
            <article key={action.title} className="bg-sand-deep p-7">
                <h3 className="font-display text-2xl text-ink">{action.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{action.text}</p>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Frise chronologique interactive */}
      <section className="bg-ink text-sand" aria-labelledby="timeline-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            tone="light"
            title={t.mahola.timelineTitle}
            lead={t.mahola.timelineLead} />
          

          <div className="mt-12">
            <div className="relative">
              <div className="absolute left-0 right-0 top-[13px] h-px bg-sand/25" aria-hidden="true" />
              <ul className="relative flex flex-wrap gap-y-6 sm:justify-between" role="tablist" aria-label={t.mahola.years}>
                {maholaTimeline.map((entry) => {
                  const isActive = entry.year === selectedYear;
                  return (
                    <li key={entry.year} className="w-1/3 sm:w-auto">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedYear(entry.year)}
                        className="group flex flex-col items-center gap-3 focus-visible:outline-none">
                        
                        <span
                          className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border-2 transition-colors duration-150 ease-expo ${
                          isActive ?
                          'border-ember bg-ember' :
                          'border-sand/40 bg-ink group-hover:border-sand'}`
                          }>
                          
                          <span
                            className={`h-2 w-2 rounded-full transition-colors duration-150 ${
                            isActive ? 'bg-white' : 'bg-transparent group-hover:bg-sand/70'}`
                            } />
                          
                        </span>
                        <span
                          className={`font-display text-lg tabular-nums transition-colors duration-150 ${
                          isActive ? 'text-white' : 'text-sand/60 group-hover:text-sand'}`
                          }>
                          
                          {entry.year}
                        </span>
                      </button>
                    </li>);

                })}
              </ul>
            </div>

            <motion.div
              key={selected.year}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="mt-12 grid gap-8 border-t border-sand/20 pt-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
              
              <div>
                <p className="font-display text-5xl leading-none text-ember-soft tabular-nums">{selected.year}</p>
                <p className="mt-4 text-sm uppercase tracking-[0.14em] text-sand/60">{selected.metric}</p>
              </div>
              <div>
                <h3 className="font-display text-3xl leading-tight text-white">{selected.title}</h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-sand/80">{selected.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chiffres d'impact */}
      <section className="border-b border-ink/10 bg-sand-deep">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16">
          <h2 className="font-display text-3xl text-ink">{t.mahola.impactTitle}</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {maholaImpact.map((item) =>
            <div key={item.label} className="border-t-2 border-ink pt-4">
                <dd className="font-display text-4xl leading-none text-ink">{item.value}</dd>
                <dt className="mt-2 text-sm font-medium text-ink">{item.label}</dt>
                <p className="mt-0.5 text-[13px] text-ink-muted">{item.detail}</p>
              </div>
            )}
          </dl>
          <p className="mt-8 max-w-2xl text-sm text-ink-muted">
            {t.mahola.impactNote}{' '}
            <a
              href={`mailto:${maholaContact.email}`}
              className="font-medium text-ember transition-colors duration-150 hover:text-ink">
              {maholaContact.email}
            </a>{' '}
            · {maholaContact.phoneCameroon}.
          </p>
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" title={t.mahola.testimonialsTitle} />
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {testimonials.map((testimonial) =>
            <figure key={testimonial.name} className="flex h-full flex-col">
                <QuoteIcon className="h-6 w-6 text-ember" aria-hidden="true" />
                <blockquote className="mt-4 font-display text-xl leading-snug text-ink">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6 text-sm">
                  <span className="block font-medium text-ink">{testimonial.name}</span>
                  <span className="block text-ink-muted">{testimonial.role}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-sand-deep">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title={t.mahola.galleryTitle}
            lead={t.mahola.galleryLead} />
          
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {gallery.map((item) =>
            <figure key={item.src}>
                <img src={item.src} alt={item.caption} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-3 text-[13px] leading-relaxed text-ink-muted">{item.caption}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>);

}