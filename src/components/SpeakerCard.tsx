import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import type { Speaker } from '../types';

interface SpeakerCardProps {
  speaker: Speaker;
  onOpen: (speaker: Speaker) => void;
}

export function SpeakerCard({ speaker, onOpen }: SpeakerCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(speaker)}
      className="group flex h-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-sand"
      aria-label={`Voir le profil de ${speaker.name}`}>
      
      <div className="relative overflow-hidden bg-sand-deep">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-300 ease-expo group-hover:scale-[1.03]" />
        
        {speaker.keynote &&
        <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-sand">
            Keynote
          </span>
        }
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-xl leading-snug text-ink">{speaker.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">{speaker.role}</p>
        <p className="text-sm text-ink-muted">{speaker.organization}</p>
        <div className="mt-auto pt-4 flex items-center gap-2 text-[13px] font-medium text-ember">
          <span>{speaker.country}</span>
          <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>);

}