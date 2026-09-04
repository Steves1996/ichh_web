import React, { useEffect, useState } from 'react';

interface CountdownProps {
  target: string;
  tone?: 'light' | 'dark';
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(target: string): Remaining {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds % 86400 / 3600),
    minutes: Math.floor(seconds % 3600 / 60),
    seconds: seconds % 60
  };
}

export function Countdown({ target, tone = 'dark' }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining>(() => computeRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(computeRemaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units: Array<{value: number;label: string;}> = [
  { value: remaining.days, label: 'jours' },
  { value: remaining.hours, label: 'heures' },
  { value: remaining.minutes, label: 'minutes' },
  { value: remaining.seconds, label: 'secondes' }];


  const valueColor = tone === 'light' ? 'text-white' : 'text-ink';
  const labelColor = tone === 'light' ? 'text-white/60' : 'text-ink-muted';
  const divider = tone === 'light' ? 'border-white/20' : 'border-ink/15';

  return (
    <div
      className="flex items-stretch"
      role="timer"
      aria-label={`Ouverture dans ${remaining.days} jours`}>
      
      {units.map((unit, index) =>
      <div
        key={unit.label}
        className={`flex flex-col pr-5 sm:pr-7 ${index > 0 ? `pl-5 sm:pl-7 border-l ${divider}` : ''}`}>
        
          <span className={`font-display text-3xl sm:text-4xl leading-none tabular-nums ${valueColor}`}>
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className={`mt-1.5 text-[11px] uppercase tracking-[0.16em] ${labelColor}`}>{unit.label}</span>
        </div>
      )}
    </div>);

}