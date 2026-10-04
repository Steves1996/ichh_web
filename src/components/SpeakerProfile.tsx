import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, LinkedinIcon, MailIcon, TwitterIcon } from 'lucide-react';
import { useSite } from '../content/SiteContentProvider';
import { useT } from '../i18n/LanguageProvider';
import type { Speaker } from '../types';
import { RichText } from './RichText';

interface SpeakerProfileProps {
  speaker: Speaker;
}

export function SpeakerProfile({ speaker }: SpeakerProfileProps) {
  const { getSessionsForSpeaker } = useSite();
  const t = useT();
  const sessions = getSessionsForSpeaker(speaker.id);

  return (
    <div>
      <div className="flex gap-5">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="h-28 w-24 shrink-0 object-cover" />
        
        <div>
          <h2 className="font-display text-2xl leading-tight text-ink">{speaker.name}</h2>
          <p className="mt-1 text-sm text-ink-muted">{speaker.role}</p>
          <p className="text-sm text-ink-muted">{speaker.organization}</p>
          <p className="mt-2 text-[13px] font-medium text-ember">
            {speaker.country} · {speaker.domain}
          </p>
        </div>
      </div>

      <section className="mt-7">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{t.profile.bio}</h3>
        <RichText className="mt-3 text-[15px] leading-relaxed text-ink/85">{speaker.bio}</RichText>
      </section>

      <section className="mt-7">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          {t.profile.sessions(sessions.length)}
        </h3>
        {sessions.length === 0 ?
        <p className="mt-3 text-sm text-ink-muted">
            {t.profile.noSessions}
          </p> :

        <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
            {sessions.map((session) =>
          <li key={session.id} className="py-3">
                <p className="font-display text-lg leading-snug text-ink">{session.title}</p>
                <p className="mt-1 text-[13px] text-ink-muted">
                  {t.profile.dayLine(session.day)} · {session.start}–{session.end} · {session.room}
                </p>
              </li>
          )}
          </ul>
        }
      </section>

      <section className="mt-7">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{t.profile.publications}</h3>
        <ul className="mt-3 space-y-2.5">
          {speaker.publications.map((pub) =>
          <li key={pub} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <BookOpenIcon className="mt-1 h-4 w-4 shrink-0 text-moss" aria-hidden="true" />
              <span>{pub}</span>
            </li>
          )}
        </ul>
      </section>

      <section className="mt-7 border-t border-ink/10 pt-6">
        <h3 className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{t.profile.contact}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`mailto:${speaker.email}`}
            className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2.5 text-sm text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
            
            <MailIcon className="h-4 w-4" aria-hidden="true" />
            {speaker.email}
          </a>
          <a
            href={`https://${speaker.linkedin}`}
            className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2.5 text-sm text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
            
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2.5 text-sm text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
            
            <TwitterIcon className="h-4 w-4" aria-hidden="true" />
            {speaker.x}
          </a>
        </div>
        <Link
          to="/programme"
          className="mt-5 inline-block text-sm font-medium text-ember hover:text-ink transition-colors duration-150">
          
          {t.profile.seeInProgramme}
        </Link>
      </section>
    </div>);

}