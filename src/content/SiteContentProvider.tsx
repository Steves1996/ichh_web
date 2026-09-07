import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import type { Session, Speaker } from '../types';
import { defaultContent, mergeContent, SiteContent } from './defaults';

const API_URL = ((import.meta as any).env?.VITE_API_URL ?? '').replace(/\/$/, '');

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
});

export interface SiteData extends SiteContent {
  loading: boolean;
  // helpers dérivés
  rooms: string[];
  tracks: string[];
  sessionTypes: string[];
  speakerCountries: string[];
  speakerOrganizations: string[];
  speakerDomains: string[];
  getSpeaker: (id: string) => Speaker | undefined;
  getSessionsForSpeaker: (id: string) => Session[];
}

const SiteContentContext = createContext<SiteData | null>(null);

async function fetchContent(): Promise<Partial<SiteContent> | null> {
  if (!API_URL) return null;
  const res = await fetch(`${API_URL}/api/content`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

function InnerProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: fetchContent,
    enabled: !!API_URL,
  });

  const value = useMemo<SiteData>(() => {
    const content = mergeContent(data);
    const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));
    return {
      ...content,
      loading: isLoading,
      rooms: uniq(content.sessions.map((s) => s.room)),
      tracks: uniq(content.sessions.map((s) => s.track)),
      sessionTypes: uniq(content.sessions.map((s) => s.type)),
      speakerCountries: uniq(content.speakers.map((s) => s.country)).sort(),
      speakerOrganizations: uniq(content.speakers.map((s) => s.organization)).sort(),
      speakerDomains: uniq(content.speakers.map((s) => s.domain)).sort(),
      getSpeaker: (id: string) => content.speakers.find((s) => s.id === id),
      getSessionsForSpeaker: (id: string) => content.sessions.filter((s) => s.speakerIds?.includes(id)),
    };
  }, [data, isLoading]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerProvider>{children}</InnerProvider>
    </QueryClientProvider>
  );
}

export function useSite(): SiteData {
  const ctx = useContext(SiteContentContext);
  if (ctx) return ctx;
  // repli hors provider (tests, rendu isolé)
  const content = defaultContent;
  return {
    ...content,
    loading: false,
    rooms: Array.from(new Set(content.sessions.map((s) => s.room))),
    tracks: Array.from(new Set(content.sessions.map((s) => s.track))),
    sessionTypes: Array.from(new Set(content.sessions.map((s) => s.type))),
    speakerCountries: Array.from(new Set(content.speakers.map((s) => s.country))).sort(),
    speakerOrganizations: Array.from(new Set(content.speakers.map((s) => s.organization))).sort(),
    speakerDomains: Array.from(new Set(content.speakers.map((s) => s.domain))).sort(),
    getSpeaker: (id: string) => content.speakers.find((s) => s.id === id),
    getSessionsForSpeaker: (id: string) => content.sessions.filter((s) => s.speakerIds?.includes(id)),
  };
}
