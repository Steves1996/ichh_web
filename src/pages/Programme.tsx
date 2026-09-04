import React, { useMemo, useState } from 'react';
import { CalendarCheckIcon, CalendarPlusIcon, DownloadIcon, XIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Drawer } from '../components/Drawer';
import { SessionDetail } from '../components/SessionDetail';
import { Newsletter } from '../components/Newsletter';
import { days, rooms, sessions, sessionTypes, tracks } from '../data/programme';
import { getSpeaker } from '../data/speakers';
import { useScreenInit } from '../useScreenInit.js';
import type { Session } from '../types';

const ALL = 'Tous';

interface ChipGroupProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function ChipGroup({ label, value, options, onChange }: ChipGroupProps) {
  return (
    <fieldset>
      <legend className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {[ALL, ...options].map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={`border px-3.5 py-2 text-[13px] transition-colors duration-150 ease-expo ${
              selected ?
              'border-ink bg-ink text-sand' :
              'border-ink/20 text-ink hover:border-ink/50'}`
              }>
              
              {option}
            </button>);

        })}
      </div>
    </fieldset>);

}

export function Programme() {
  const screenInit = useScreenInit();
  const [day, setDay] = useState<string>(screenInit.day ?? ALL);
  const [room, setRoom] = useState<string>(screenInit.room ?? ALL);
  const [track, setTrack] = useState<string>(screenInit.track ?? ALL);
  const [type, setType] = useState<string>(screenInit.type ?? ALL);
  const [agenda, setAgenda] = useState<string[]>([]);
  const [active, setActive] = useState<Session | null>(null);

  const toggleAgenda = (id: string) =>
  setAgenda((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const filtered = useMemo(
    () =>
    sessions.
    filter(
      (session) =>
      (day === ALL || `Jour ${session.day}` === day) && (
      room === ALL || session.room === room) && (
      track === ALL || session.track === track) && (
      type === ALL || session.type === type)
    ).
    sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)),
    [day, room, track, type]
  );

  const hasFilters = day !== ALL || room !== ALL || track !== ALL || type !== ALL;
  const reset = () => {
    setDay(ALL);
    setRoom(ALL);
    setTrack(ALL);
    setType(ALL);
  };

  const visibleDays = days.filter((d) => filtered.some((s) => s.day === d.day));

  return (
    <main>
      <section className="bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            title="Programme des deux jours"
            lead="Les 12 et 13 novembre 2026 à l’Hôtel Hilton de Yaoundé : cérémonie d’ouverture, huit panels de haut niveau, Salon Expo santé, mission médicale et gala des 10 ans. Sélectionnez les sessions pour construire votre agenda."
            action={
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-sand/30 px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-sand hover:text-ink">
              
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Programme PDF
              </a>
            } />
          
        </div>
      </section>

      <section className="border-b border-ink/10 bg-sand-deep" aria-label="Filtres du programme">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-7">
          <div className="grid gap-6 md:grid-cols-2">
            <ChipGroup label="Jour" value={day} options={days.map((d) => d.label)} onChange={setDay} />
            <ChipGroup label="Type d’activité" value={type} options={sessionTypes} onChange={setType} />
            <ChipGroup label="Thématique" value={track} options={tracks} onChange={setTrack} />
            <ChipGroup label="Salle" value={room} options={rooms} onChange={setRoom} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-ink-muted" role="status">
              {filtered.length} session{filtered.length > 1 ? 's' : ''} · {agenda.length} dans mon agenda
            </p>
            {hasFilters &&
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-medium text-ember transition-colors duration-150 hover:text-ink">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
                Réinitialiser les filtres
              </button>
            }
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-14">
          {filtered.length === 0 ?
          <div className="border border-dashed border-ink/25 px-8 py-16 text-center">
              <p className="font-display text-2xl text-ink">Aucune session pour cette combinaison</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
                Toutes les salles n’accueillent pas tous les types d’activité. Élargissez un filtre pour voir des
                résultats.
              </p>
              <button
              type="button"
              onClick={reset}
              className="mt-6 bg-ink px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-ember">
              
                Réinitialiser
              </button>
            </div> :

          <div className="space-y-16">
              {visibleDays.map((dayInfo) =>
            <section key={dayInfo.day} aria-labelledby={`day-${dayInfo.day}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
                    <h2 id={`day-${dayInfo.day}`} className="font-display text-3xl text-ink">
                      {dayInfo.label} — {dayInfo.theme}
                    </h2>
                    <p className="text-sm text-ink-muted">{dayInfo.date}</p>
                  </div>

                  <ul className="divide-y divide-ink/10">
                    {filtered.
                filter((s) => s.day === dayInfo.day).
                map((session) => {
                  const inAgenda = agenda.includes(session.id);
                  return (
                    <li
                      key={session.id}
                      className="grid gap-4 py-6 md:grid-cols-[7.5rem_1fr_auto] md:gap-8">
                      
                            <div className="text-sm tabular-nums text-ink-muted">
                              <p className="font-medium text-ink">{session.start}</p>
                              <p>→ {session.end}</p>
                            </div>

                            <div>
                              <p className="text-[12px] uppercase tracking-[0.14em] text-ember">
                                {session.type} · {session.track}
                              </p>
                              <button
                          type="button"
                          onClick={() => setActive(session)}
                          className="mt-1.5 text-left font-display text-2xl leading-snug text-ink transition-colors duration-150 ease-expo hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember">
                          
                                {session.title}
                              </button>
                              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                                {session.description}
                              </p>
                              <p className="mt-3 text-[13px] text-ink-muted">
                                {session.room}
                                {session.speakerIds.length > 0 &&
                          <>
                                    {' · '}
                                    {session.speakerIds.
                            map((id) => getSpeaker(id)?.name).
                            filter(Boolean).
                            join(', ')}
                                  </>
                          }
                              </p>
                            </div>

                            <div className="flex md:justify-end">
                              <button
                          type="button"
                          onClick={() => toggleAgenda(session.id)}
                          aria-pressed={inAgenda}
                          className={`inline-flex h-11 items-center gap-2 px-4 text-[13px] font-medium transition-colors duration-150 ease-expo ${
                          inAgenda ?
                          'bg-moss text-white hover:bg-ink' :
                          'border border-ink/20 text-ink hover:bg-ink hover:text-sand'}`
                          }>
                          
                                {inAgenda ?
                          <>
                                    <CalendarCheckIcon className="h-4 w-4" aria-hidden="true" />
                                    Dans mon agenda
                                  </> :

                          <>
                                    <CalendarPlusIcon className="h-4 w-4" aria-hidden="true" />
                                    Ajouter
                                  </>
                          }
                              </button>
                            </div>
                          </li>);

                })}
                  </ul>
                </section>
            )}
            </div>
          }
        </div>
      </section>

      <Newsletter />

      <Drawer open={active !== null} onClose={() => setActive(null)} title="Détail de la session">
        {active &&
        <SessionDetail
          session={active}
          inAgenda={agenda.includes(active.id)}
          onToggleAgenda={toggleAgenda} />

        }
      </Drawer>
    </main>);

}