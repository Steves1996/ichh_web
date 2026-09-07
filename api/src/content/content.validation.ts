import { BadRequestException } from '@nestjs/common';
import { ContentDef, FieldDef } from './registry';

/** Nettoie et valide `data` selon la définition de contenu. Renvoie l'objet normalisé. */
export function validateData(def: ContentDef, input: Record<string, unknown>): Record<string, unknown> {
  const data = input ?? {};
  const out: Record<string, unknown> = {};

  for (const field of def.fields) {
    const raw = data[field.name];
    out[field.name] = coerce(field, raw);
    if (field.required && isEmpty(out[field.name])) {
      throw new BadRequestException(`Le champ « ${field.label} » est obligatoire.`);
    }
  }
  return out;
}

function isEmpty(v: unknown) {
  return v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
}

function coerce(field: FieldDef, raw: unknown): unknown {
  switch (field.type) {
    case 'number': {
      if (raw === '' || raw === undefined || raw === null) return undefined;
      const n = Number(raw);
      if (Number.isNaN(n)) throw new BadRequestException(`« ${field.label} » doit être un nombre.`);
      return n;
    }
    case 'boolean':
      return raw === true || raw === 'true' || raw === 1 || raw === '1';
    case 'string-list': {
      if (Array.isArray(raw)) return raw.map((s) => String(s).trim()).filter(Boolean);
      if (typeof raw === 'string') {
        return raw
          .split(/\r?\n|,/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return [];
    }
    case 'json': {
      if (raw === undefined || raw === null || raw === '') return [];
      if (typeof raw === 'string') {
        try {
          return JSON.parse(raw);
        } catch {
          throw new BadRequestException(`« ${field.label} » : JSON invalide.`);
        }
      }
      return raw;
    }
    case 'select':
      if (raw && field.options && !field.options.includes(String(raw))) {
        throw new BadRequestException(
          `« ${field.label} » doit être l'une des valeurs : ${field.options.join(', ')}.`,
        );
      }
      return raw === undefined ? undefined : String(raw);
    default:
      return raw === undefined || raw === null ? '' : String(raw);
  }
}
