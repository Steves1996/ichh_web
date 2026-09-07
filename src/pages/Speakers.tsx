import React, { useMemo, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SpeakerCard } from '../components/SpeakerCard';
import { Drawer } from '../components/Drawer';
import { SpeakerProfile } from '../components/SpeakerProfile';
import { Newsletter } from '../components/Newsletter';
import { useSite } from '../content/SiteContentProvider';
import { useScreenInit } from '../useScreenInit.js';
import type { Speaker } from '../types';

const ALL = 'Tous';

interface SelectFilterProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectFilter({ label, value, options, onChange }: SelectFilterProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-ink/20 bg-sand px-3 py-2.5 text-sm text-ink transition-colors duration-150 ease-expo focus:border-ember focus:outline-none">
        
        {[ALL, ...options].map((option) =>
        <option key={option} value={option}>
            {option}
          </option>
        )}
      </select>
    </label>);

}

export function Speakers() {
  const { speakers, speakerCountries, speakerOrganizations, speakerDomains } = useSite();
  const screenInit = useScreenInit();
  const [query, setQuery] = useState<string>(screenInit.query ?? '');
  const [country, setCountry] = useState<string>(screenInit.country ?? ALL);
  const [organization, setOrganization] = useState<string>(screenInit.organization ?? ALL);
  const [domain, setDomain] = useState<string>(screenInit.domain ?? ALL);
  const [active, setActive] = useState<Speaker | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return speakers.filter((speaker) => {
      const matchesQuery =
      q.length === 0 ||
      [speaker.name, speaker.role, speaker.organization, speaker.domain, speaker.country].
      join(' ').
      toLowerCase().
      includes(q);
      return (
        matchesQuery && (
        country === ALL || speaker.country === country) && (
        organization === ALL || speaker.organization === organization) && (
        domain === ALL || speaker.domain === domain));

    });
  }, [query, country, organization, domain, speakers]);

  const hasFilters = query !== '' || country !== ALL || organization !== ALL || domain !== ALL;

  const reset = () => {
    setQuery('');
    setCountry(ALL);
    setOrganization(ALL);
    setDomain(ALL);
  };

  return (
    <main>
      <section className="bg-ink text-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-16 lg:py-20">
          <SectionHeading
            as="h1"
            tone="light"
            title="Les intervenants"
            lead="Décideurs publics, praticiens, experts et société civile mobilisés autour des huit panels. Liste pressentie : la composition définitive et les modérateurs sont arrêtés par le comité scientifique. Seule la présidente de la Mahola Health Foundation, le Dr Mathilde Mbouck, est confirmée." />
          
        </div>
      </section>

      <section className="border-b border-ink/10 bg-sand-deep">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(3,1fr)_auto] lg:items-end">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-muted">Recherche</span>
              <span className="relative">
                <SearchIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true" />
                
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nom, organisation, spécialité…"
                  className="w-full border border-ink/20 bg-sand py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-150 ease-expo focus:border-ember focus:outline-none" />
                
              </span>
            </label>
            <SelectFilter label="Pays" value={country} options={speakerCountries} onChange={setCountry} />
            <SelectFilter
              label="Organisation"
              value={organization}
              options={speakerOrganizations}
              onChange={setOrganization} />
            
            <SelectFilter label="Domaine" value={domain} options={speakerDomains} onChange={setDomain} />
            {hasFilters &&
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-sm text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
                Réinitialiser
              </button>
            }
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-page px-5 sm:px-8 py-14">
          <p className="text-sm text-ink-muted" role="status">
            {results.length} intervenant{results.length > 1 ? 's' : ''} affiché
            {results.length > 1 ? 's' : ''}
          </p>

          {results.length === 0 ?
          <div className="mt-10 border border-dashed border-ink/25 px-8 py-16 text-center">
              <p className="font-display text-2xl text-ink">Aucun intervenant ne correspond</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
                Essayez un autre pays ou un autre domaine — la liste s’enrichit chaque semaine jusqu’en février.
              </p>
              <button
              type="button"
              onClick={reset}
              className="mt-6 bg-ink px-6 py-3 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-ember">
              
                Réinitialiser les filtres
              </button>
            </div> :

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((speaker) =>
            <SpeakerCard key={speaker.id} speaker={speaker} onOpen={setActive} />
            )}
            </div>
          }
        </div>
      </section>

      <Newsletter />

      <Drawer open={active !== null} onClose={() => setActive(null)} title="Profil intervenant">
        {active && <SpeakerProfile speaker={active} />}
      </Drawer>
    </main>);

}