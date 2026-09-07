export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'image'
  | 'url'
  | 'email'
  | 'select'
  | 'string-list'
  | 'json';

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  options?: string[];
}

export interface ContentDef {
  key: string;
  kind: 'singleton' | 'collection';
  label: string;
  group: string;
  titleField?: string;
  flattenTo?: string;
  fields: FieldDef[];
}

export interface Entry {
  id: string;
  collection: string;
  position: number;
  data: Record<string, any>;
  updatedAt: string;
}

export type PartnerRequestStatus = 'nouveau' | 'en_cours' | 'traite';

export interface PartnerRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: PartnerRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export type RegistrationStatus = 'nouveau' | 'confirme' | 'annule';

export interface Registration {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  email: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  notified: boolean;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  alt: string;
  createdAt: string;
}
