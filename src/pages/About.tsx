import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { Newsletter } from '../components/Newsletter';
import { useSite } from '../content/SiteContentProvider';
import type { Member } from '../types';

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
  return (
    <main>
      <section className="bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            title="À propos de l’ICHH"
            lead="Une conférence internationale portée par le Ministère de la Santé Publique du Cameroun, coordonnée par la Mahola Health Foundation et mise en œuvre avec All Access Agency, pour bâtir une santé résiliente au service des populations vulnérables d’Afrique." />
          
        </div>
      </section>

      {/* Présentation */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="font-display text-3xl leading-tight text-ink">
                {event.fullNameFr}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">{event.fullName} · {event.name}</p>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink/80">
                <p>
                  <span className="font-medium text-ink">Contexte.</span> Après la crise du Covid-19, l’Agenda 2063 de
                  l’Union Africaine et la Commission économique pour l’Afrique appellent à des programmes de santé
                  alignés sur les agendas 2030 et 2063, pour renforcer la résilience des systèmes sanitaires. L’ICHH
                  Yaoundé 2026 s’inscrit dans cette dynamique et coïncide avec les 10 ans de la Mahola Health
                  Foundation.
                </p>
                <p>
                  <span className="font-medium text-ink">Vision.</span> Fédérer les pouvoirs publics, les partenaires
                  techniques et financiers, les experts et les acteurs communautaires autour d’une action concertée
                  pour améliorer la santé des populations les plus vulnérables, en zones urbaines comme rurales.
                </p>
                <p>
                  <span className="font-medium text-ink">Pourquoi le Cameroun.</span> Le pays a été retenu pour son
                  engagement en faveur de la Couverture Santé Universelle, la modernisation de ses infrastructures et
                  la Stratégie Sectorielle de Santé 2020-2030 (SND30), qui vise un accès universel à des soins de
                  qualité à l’horizon 2035.
                </p>
              </div>
            </div>

            <aside className="bg-sand-deep p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Thème central 2026</p>
              <p className="mt-4 font-display text-3xl leading-tight text-ink">« {event.themeEn} »</p>
              <p className="mt-2 text-sm text-ink-muted">{event.theme}</p>
              <div className="ichh-rule my-7" />
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-ink-muted">Dates</dt>
                  <dd className="font-medium text-ink">{event.dates}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Lieu</dt>
                  <dd className="font-medium text-ink">
                    {event.venue}, {event.city}, {event.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Langues de travail</dt>
                  <dd className="font-medium text-ink">Français et anglais</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Supervision générale</dt>
                  <dd className="font-medium text-ink">Ministère de la Santé Publique (MINSANTE)</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Coordination</dt>
                  <dd className="font-medium text-ink">Mahola Health Foundation · Dr Mathilde Mbouck</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Commissariat général</dt>
                  <dd className="font-medium text-ink">All Access Agency</dd>
                </div>
              </dl>
              <Link
                to="/mahola"
                className="mt-7 inline-block text-sm font-medium text-ember transition-colors duration-150 hover:text-ink">
                
                Découvrir les 10 ans de Mahola →
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" tone="light" title="Objectifs de la conférence" />
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
            title="À qui s’adresse l’ICHH"
            lead="Cinq familles d’acteurs réunies autour d’une même table, des États de la zone CEMAC-CEEAC à la société civile." />
          
          <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) =>
            <div key={audience.title} className="border-t border-ink/15 pt-5">
                <dt className="font-display text-xl text-ink">{audience.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{audience.text}</dd>
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
            title="Résultats attendus"
            lead="Les travaux des huit panels alimentent le rapport final de la conférence, remis au plus tard le 30 octobre 2026." />
          
          <div className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2">
            {outcomes.map((outcome) =>
            <article key={outcome.label} className="bg-sand-deep p-7">
                <h3 className="font-display text-2xl text-ink">{outcome.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{outcome.text}</p>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Comités */}
      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-20">
          <SectionHeading as="h2" title="Qui organise" />
          <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <CommitteeList
              title="Gouvernance et organisation"
              members={organizingCommittee}
              note="Supervision de l’État du Cameroun, coordination de la Mahola Health Foundation et maîtrise d’œuvre d’All Access Agency, appuyées par un comité de coordination et un comité interministériel." />

            <CommitteeList
              title="Comité scientifique"
              members={scientificCommittee}
              note="Il arrête les termes de référence des huit panels, désigne les modérateurs et rapporteurs et rédige le rapport final. La composition nominative sera publiée avant la conférence." />

          </div>
        </div>
      </section>

      <Newsletter />
    </main>);

}