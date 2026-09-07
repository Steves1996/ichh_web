import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Newsletter } from '../components/Newsletter';
import { SpeakerCard } from '../components/SpeakerCard';
import { Drawer } from '../components/Drawer';
import { SpeakerProfile } from '../components/SpeakerProfile';
import { usePartnerDialog } from '../components/PartnerDialog';
import { useSite } from '../content/SiteContentProvider';
import type { Speaker } from '../types';

export function Home() {
  const { keyFigures, news, reasons, sponsors, speakers, days, sessions } = useSite();
  const partnerDialog = usePartnerDialog();
  const [active, setActive] = useState<Speaker | null>(null);
  const [featured, ...otherFigures] = keyFigures;

  return (
    <main>
      <Hero />

      {/* Chiffres clés */}
      <section className="border-b border-ink/10 bg-sand-deep" aria-label="Chiffres clés">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_2.1fr] lg:items-center">
            <div>
              <p className="font-display text-7xl leading-none text-ember">{featured.value}</p>
              <p className="mt-2 font-display text-2xl text-ink">{featured.label}</p>
              <p className="mt-1 text-sm text-ink-muted">{featured.detail}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:border-l lg:border-ink/15 lg:pl-12">
              {otherFigures.map((figure) =>
              <div key={figure.label}>
                  <dd className="font-display text-4xl leading-none text-ink">{figure.value}</dd>
                  <dt className="mt-2 text-sm font-medium text-ink">{figure.label}</dt>
                  <p className="mt-0.5 text-[13px] text-ink-muted">{figure.detail}</p>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Mot de bienvenue */}
      <section className="bg-sand" aria-labelledby="welcome-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <img
                src="/02737108-f365-45eb-aaa5-70bc8003a298.jpg"
                alt="Dr Mathilde Mbouck, présidente de la Mahola Health Foundation"
                className="w-full max-w-sm object-cover" />

              <p className="mt-4 font-display text-xl text-ink">Dr Mathilde Mbouck</p>
              <p className="text-sm text-ink-muted">Présidente · Mahola Health Foundation</p>
            </div>
            <div className="lg:pt-6">
              <h2 id="welcome-title" className="font-display text-3xl sm:text-4xl leading-[1.1] text-ink">
                « Après dix ans d’action sanitaire volontaire, nous rassemblons celles et ceux qui bâtissent une santé
                résiliente pour les plus vulnérables. »
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/80">
                <p>
                  Depuis 2016, la Mahola Health Foundation organise des missions médicales au Cameroun et en Afrique
                  centrale pour réduire le déficit de soins des personnes à faibles revenus. Douze missions, 8 700
                  consultations, 200 interventions chirurgicales : dix ans d’action de terrain, aux côtés de l’effort
                  public de Couverture Santé Universelle.
                </p>
                <p>
                  L’ICHH Yaoundé 2026 prolonge cet engagement à l’échelle continentale. Sous la supervision du Ministère
                  de la Santé Publique et avec All Access Agency, la conférence réunit États, institutions
                  internationales, experts, société civile et secteur privé autour de huit panels de haut niveau.
                </p>
                <p>
                  Deux jours à l’Hôtel Hilton de Yaoundé, 500 participants, et un objectif : poser ensemble les jalons
                  d’une action sanitaire commune en faveur des populations à faibles revenus, en zones urbaines comme
                  rurales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi participer */}
      <section className="bg-ink text-sand" aria-labelledby="why-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            tone="light"
            title="Pourquoi participer"
            lead="Cinq raisons concrètes de rejoindre l’ICHH Yaoundé 2026." />
          
          <div className="mt-12 grid gap-px bg-sand/15 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) =>
            <article key={reason.title} className="flex flex-col bg-ink p-7">
                <h3 className="font-display text-2xl text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/70">{reason.text}</p>
              </article>
            )}
            <div className="flex flex-col justify-center bg-ink p-7">
              <p className="text-sm text-sand/70">
                Les inscriptions et les formules de participation sont ouvertes. Dossier d’offre de participation sur
                demande.
              </p>
              <Link
                to="/programme"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ember-soft transition-colors duration-150 ease-expo hover:text-white">
                
                Voir le programme complet
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers vedettes */}
      <section className="bg-sand" aria-labelledby="speakers-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title="Intervenants pressentis"
            lead="Décideurs publics, praticiens, experts et société civile. La liste définitive est arrêtée par le comité scientifique."
            action={
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
              
                Tous les intervenants
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.slice(0, 4).map((speaker) =>
            <SpeakerCard key={speaker.id} speaker={speaker} onOpen={setActive} />
            )}
          </div>
        </div>
      </section>

      {/* Programme en bref */}
      <section className="border-y border-ink/10 bg-sand-deep" aria-labelledby="programme-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title="Le programme en bref"
            lead="Deux jours à l’Hôtel Hilton de Yaoundé : cérémonie d’ouverture, huit panels de haut niveau, Salon Expo, mission médicale et gala des 10 ans."
            action={
            <Link
              to="/programme"
              className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
              
                Programme détaillé
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            } />
          
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {days.map((day) => {
              const daySessions = sessions.filter((s) => s.day === day.day);
              return (
                <article key={day.day} className="flex flex-col border-t-2 border-ink pt-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{day.date}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{day.theme}</h3>
                  <ul className="mt-5 flex-1 divide-y divide-ink/10">
                    {daySessions.slice(0, 4).map((session) =>
                    <li key={session.id} className="flex gap-4 py-3">
                        <span className="w-12 shrink-0 pt-0.5 text-[13px] tabular-nums text-ink-muted">
                          {session.start}
                        </span>
                        <span className="text-[15px] leading-snug text-ink">{session.title}</span>
                      </li>
                    )}
                  </ul>
                  <p className="mt-4 text-[13px] text-ink-muted">
                    {daySessions.length} sessions programmées
                  </p>
                </article>);

            })}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="bg-sand" aria-labelledby="sponsors-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading
            as="h2"
            title="Partenaires et institutions"
            lead="L’ICHH Yaoundé 2026 est portée par le MINSANTE, la Mahola Health Foundation et All Access Agency, en lien avec les partenaires techniques et financiers de la sous-région." />
          
          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {sponsors.map((sponsor) =>
            <div key={sponsor.name} className="flex flex-col justify-between bg-sand p-6">
                <p className="font-display text-xl leading-snug text-ink">{sponsor.name}</p>
                <p className="mt-6 text-[12px] uppercase tracking-[0.14em] text-ink-muted">
                  {sponsor.tier} · {sponsor.origin}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={partnerDialog.open}
              className="bg-ink px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-ember">

              Devenir partenaire
            </button>
            <p className="text-sm text-ink-muted">
              Co-partenaire, sponsor, stand au Salon Expo santé ou table au gala : dossier d’offre de participation sur
              demande.
            </p>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="border-t border-ink/10 bg-sand" aria-labelledby="news-title">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" title="Actualités récentes" />
          <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {news.map((item) =>
            <li key={item.id}>
                <a
                href="#"
                className="group grid gap-2 py-6 md:grid-cols-[9rem_8rem_1fr] md:items-baseline md:gap-6">
                
                  <span className="text-[13px] tabular-nums text-ink-muted">{item.date}</span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-ember">{item.category}</span>
                  <span>
                    <span className="block font-display text-xl leading-snug text-ink transition-colors duration-150 ease-expo group-hover:text-ember">
                      {item.title}
                    </span>
                    <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {item.excerpt}
                    </span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>

      <Newsletter />

      <Drawer open={active !== null} onClose={() => setActive(null)} title="Profil intervenant">
        {active && <SpeakerProfile speaker={active} />}
      </Drawer>
    </main>);

}