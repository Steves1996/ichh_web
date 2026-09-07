import React from 'react';
import { CalendarCheckIcon, CalendarPlusIcon, ClockIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { useSite } from '../content/SiteContentProvider';
import type { Session } from '../types';

interface SessionDetailProps {
  session: Session;
  inAgenda: boolean;
  onToggleAgenda: (id: string) => void;
}

export function SessionDetail({ session, inAgenda, onToggleAgenda }: SessionDetailProps) {
  const { days, getSpeaker } = useSite();
  const day = days.find((d) => d.day === session.day);
  const sessionSpeakers = session.speakerIds.map(getSpeaker).filter(Boolean);

  return (
    <div>
      <p className="text-[13px] font-medium text-ember">
        {session.type} · {session.track}
      </p>
      <h2 className="mt-2 font-display text-3xl leading-tight text-ink">{session.title}</h2>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 border-y border-ink/10 py-5">
        <div className="flex gap-3">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Horaire</dt>
            <dd className="text-sm text-ink">
              {day?.label} — {day?.date}
              <br />
              {session.start} → {session.end}
            </dd>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Salle</dt>
            <dd className="text-sm text-ink">{session.room}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <TagIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Thématique</dt>
            <dd className="text-sm text-ink">{session.track}</dd>
          </div>
        </div>
      </dl>

      <section className="mt-6">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Description</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{session.description}</p>
      </section>

      {sessionSpeakers.length > 0 &&
      <section className="mt-7">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">Intervenants</h3>
          <ul className="mt-3 space-y-3">
            {sessionSpeakers.map((speaker) =>
          <li key={speaker!.id} className="flex items-center gap-4">
                <img src={speaker!.image} alt={speaker!.name} className="h-14 w-14 object-cover" />
                <div>
                  <p className="font-medium text-ink">{speaker!.name}</p>
                  <p className="text-[13px] text-ink-muted">
                    {speaker!.role} · {speaker!.organization}
                  </p>
                </div>
              </li>
          )}
          </ul>
        </section>
      }

      <button
        type="button"
        onClick={() => onToggleAgenda(session.id)}
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-150 ease-expo ${
        inAgenda ?
        'bg-moss text-white hover:bg-ink' :
        'bg-ember text-white hover:bg-ink'}`
        }>
        
        {inAgenda ?
        <>
            <CalendarCheckIcon className="h-4 w-4" aria-hidden="true" />
            Dans mon agenda — retirer
          </> :

        <>
            <CalendarPlusIcon className="h-4 w-4" aria-hidden="true" />
            Ajouter à mon agenda
          </>
        }
      </button>
    </div>);

}