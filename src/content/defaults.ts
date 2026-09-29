// Contenu par défaut : les données statiques livrées avec le site.
// Sert de valeur de repli pendant le chargement et si l'API est indisponible.
import * as site from '../data/site';
import * as programme from '../data/programme';
import { speakers } from '../data/speakers';
import * as siteEn from '../data/en/site';
import * as programmeEn from '../data/en/programme';
import { speakerTexts } from '../data/en/speakers';
import type { Session, Speaker } from '../types';

export interface SiteContent {
  event: typeof site.event;
  president: typeof site.president;
  keyFigures: typeof site.keyFigures;
  reasons: typeof site.reasons;
  objectives: string[];
  audiences: typeof site.audiences;
  outcomes: typeof site.outcomes;
  panels: typeof site.panels;
  conferenceFormats: typeof site.conferenceFormats;
  sponsorOffers: typeof site.sponsorOffers;
  sponsors: typeof site.sponsors;
  organizers: typeof site.organizers;
  organizingCommittee: typeof site.organizingCommittee;
  scientificCommittee: typeof site.scientificCommittee;
  news: typeof site.news;
  footerLinks: typeof site.footerLinks;
  maholaMission: string;
  maholaContact: typeof site.maholaContact;
  maholaActions: typeof site.maholaActions;
  maholaTimeline: typeof site.maholaTimeline;
  maholaImpact: typeof site.maholaImpact;
  testimonials: typeof site.testimonials;
  gallery: typeof site.gallery;
  days: typeof programme.days;
  sessions: Session[];
  speakers: Speaker[];
}

export const defaultContent: SiteContent = {
  event: site.event,
  president: site.president,
  keyFigures: site.keyFigures,
  reasons: site.reasons,
  objectives: site.objectives,
  audiences: site.audiences,
  outcomes: site.outcomes,
  panels: site.panels,
  conferenceFormats: site.conferenceFormats,
  sponsorOffers: site.sponsorOffers,
  sponsors: site.sponsors,
  organizers: site.organizers,
  organizingCommittee: site.organizingCommittee,
  scientificCommittee: site.scientificCommittee,
  news: site.news,
  footerLinks: site.footerLinks,
  maholaMission: site.maholaMission,
  maholaContact: site.maholaContact,
  maholaActions: site.maholaActions,
  maholaTimeline: site.maholaTimeline,
  maholaImpact: site.maholaImpact,
  testimonials: site.testimonials,
  gallery: site.gallery,
  days: programme.days,
  sessions: programme.sessions,
  speakers,
};

/** Fusion peu profonde : l'API remplace une clé entière quand elle la fournit. */
export function mergeContent(partial: Partial<Record<keyof SiteContent, unknown>> | null | undefined): SiteContent {
  if (!partial) return defaultContent;
  const out: any = { ...defaultContent };
  for (const key of Object.keys(defaultContent) as (keyof SiteContent)[]) {
    const value = (partial as any)[key];
    if (value === undefined || value === null) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) continue;
    out[key] = value;
  }
  return out as SiteContent;
}

/**
 * Version anglaise du contenu. Le CMS ne stocke que le français : les textes sont
 * remplacés par la traduction livrée avec le site, tandis que les champs non
 * textuels (photos, horaires, e-mails…) restent ceux du CMS. Un intervenant ou une
 * session ajouté dans l'admin sans traduction s'affiche en français.
 */
export function localizeEn(content: SiteContent): SiteContent {
  return {
    ...content,
    event: { ...content.event, ...siteEn.eventText },
    president: siteEn.president,
    keyFigures: siteEn.keyFigures,
    reasons: siteEn.reasons,
    objectives: siteEn.objectives,
    audiences: siteEn.audiences,
    outcomes: siteEn.outcomes,
    panels: siteEn.panels,
    conferenceFormats: siteEn.conferenceFormats,
    sponsorOffers: siteEn.sponsorOffers,
    sponsors: siteEn.sponsors,
    organizers: siteEn.organizers,
    organizingCommittee: siteEn.organizingCommittee,
    scientificCommittee: siteEn.scientificCommittee,
    news: siteEn.news,
    footerLinks: siteEn.footerLinks,
    maholaMission: siteEn.maholaMission,
    maholaContact: { ...content.maholaContact, ...siteEn.maholaContactText },
    maholaActions: siteEn.maholaActions,
    maholaTimeline: siteEn.maholaTimeline,
    maholaImpact: siteEn.maholaImpact,
    testimonials: siteEn.testimonials,
    gallery: content.gallery.map((item) => ({ ...item, caption: siteEn.galleryCaptions[item.src] ?? item.caption })),
    days: content.days.map((d) => programmeEn.days.find((e) => e.day === d.day) ?? d),
    sessions: content.sessions.map((s) => ({ ...s, ...programmeEn.sessionTexts[s.id] })),
    speakers: content.speakers.map((s) => ({ ...s, ...speakerTexts[s.id] })),
  };
}
