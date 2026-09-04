export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  country: string;
  domain: string;
  image: string;
  bio: string;
  keynote: boolean;
  email: string;
  linkedin: string;
  x: string;
  publications: string[];
}

export type SessionType = 'Cérémonie' | 'Keynote' | 'Panel' | 'Atelier' | 'Exposition' | 'Networking';

export interface Session {
  id: string;
  day: 1 | 2 | 3;
  start: string;
  end: string;
  title: string;
  description: string;
  room: string;
  track: string;
  type: SessionType;
  speakerIds: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  metric: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

export interface Sponsor {
  name: string;
  tier: 'Platine' | 'Or' | 'Argent';
  origin: string;
}

export interface Member {
  name: string;
  role: string;
  organization: string;
}