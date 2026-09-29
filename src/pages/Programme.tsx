import React, { useMemo, useState } from 'react';
import { CalendarCheckIcon, CalendarPlusIcon, DownloadIcon, XIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Drawer } from '../components/Drawer';
import { SessionDetail } from '../components/SessionDetail';
import { Newsletter } from '../components/Newsletter';
import { useSite } from '../content/SiteContentProvider';
import { useT } from '../i18n/LanguageProvider';
import { useScreenInit } from '../useScreenInit.js';
import { buildGoogleCalendarUrl } from '../lib/googleCalendar';
import type { Session } from '../types';

// Valeur sentinelle « aucun filtre » (le libellé affiché est traduit).
const ALL = '__all__';

interface ChipGroupProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  /** Libellé affiché pour une option (par défaut, la valeur elle-même). */
  format?: (option: string) => string;
}

function ChipGroup({ label, value, options, onChange, format = (o) => o }: ChipGroupProps) {
  const t = useT();
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

              {option === ALL ? t.common.all : format(option)}
            </button>);

        })}
      </div>
    </fieldset>);

}

export function Programme() {
  const { days, rooms, sessions, sessionTypes, tracks, getSpeaker, event } = useSite();
  const t = useT();
  const screenInit = useScreenInit();
  const [day, setDay] = useState<string>(screenInit.day ?? ALL);
  const [room, setRoom] = useState<string>(screenInit.room ?? ALL);
  const [track, setTrack] = useState<string>(screenInit.track ?? ALL);
  const [type, setType] = useState<string>(screenInit.type ?? ALL);
  const [agenda, setAgenda] = useState<string[]>([]);
  const [active, setActive] = useState<Session | null>(null);

  const toggleAgenda = (id: string) => {
    const alreadyInAgenda = agenda.includes(id);
    if (!alreadyInAgenda) {
      const session = sessions.find((s) => s.id === id);
      const dayInfo = session ? days.find((d) => d.day === session.day) : undefined;
      const url = session && dayInfo ?
      buildGoogleCalendarUrl(session, dayInfo, `${session.room}, ${event.venue}`) :
      null;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }
    setAgenda((prev) => alreadyInAgenda ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filtered = useMemo(
    () =>
    sessions.
    filter(
      (session) =>
      (day === ALL || days.find((d) => d.day === session.day)?.label === day) && (
      room === ALL || session.room === room) && (
      track === ALL || session.track === track) && (
      type === ALL || session.type === type)
    ).
    sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)),
    [day, room, track, type, sessions, days]
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
            title={t.programme.title}
            lead={t.programme.lead}
            action={
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-sand/30 px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-sand hover:text-ink">
              
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                {t.programme.pdf}
              </a>
            } />
          
        </div>
      </section>

      <section className="border-b border-ink/10 bg-sand-deep" aria-label={t.programme.filters}>
        <div className="mx-auto max-w-page px-5 sm:px-8 py-7">
          <div className="grid gap-6 md:grid-cols-2">
            <ChipGroup label={t.programme.day} value={day} options={days.map((d) => d.label)} onChange={setDay} />
            <ChipGroup
              label={t.programme.type}
              value={type}
              options={sessionTypes}
              onChange={setType}
              format={(o) => t.sessionTypes[o] ?? o} />
            <ChipGroup label={t.programme.track} value={track} options={tracks} onChange={setTrack} />
            <ChipGroup label={t.programme.room} value={room} options={rooms} onChange={setRoom} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-ink-muted" role="status">
              {t.programme.count(filtered.length, agenda.length)}
            </p>
            {hasFilters &&
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-sm font-medium text-ember transition-colors duration-150 hover:text-ink">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
                {t.common.resetFilters}
              </button>
            }
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-14">
          {filtered.length === 0 ?
          <div className="border border-dashed border-ink/25 px-8 py-16 text-center">
              <p className="font-display text-2xl text-ink">{t.programme.emptyTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
                {t.programme.emptyText}
              </p>
              <button
              type="button"
              onClick={reset}
              className="mt-6 bg-ink px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-ember">
              
                {t.common.reset}
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
                                {t.sessionTypes[session.type] ?? session.type} · {session.track}
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
                          title={inAgenda ? undefined : t.programme.addTitle}
                          className={`inline-flex h-11 items-center gap-2 px-4 text-[13px] font-medium transition-colors duration-150 ease-expo ${
                          inAgenda ?
                          'bg-moss text-white hover:bg-ink' :
                          'border border-ink/20 text-ink hover:bg-ink hover:text-sand'}`
                          }>

                                {inAgenda ?
                          <>
                                    <CalendarCheckIcon className="h-4 w-4" aria-hidden="true" />
                                    {t.programme.inAgenda}
                                  </> :

                          <>
                                    <CalendarPlusIcon className="h-4 w-4" aria-hidden="true" />
                                    {t.programme.add}
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

      <Drawer open={active !== null} onClose={() => setActive(null)} title={t.programme.sessionDetail}>
        {active &&
        <SessionDetail
          session={active}
          inAgenda={agenda.includes(active.id)}
          onToggleAgenda={toggleAgenda} />

        }
      </Drawer>
    </main>);

}