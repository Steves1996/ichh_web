import { useState } from 'react';
import { api, API_URL } from '../lib/api';
import { FieldDef, MediaAsset } from '../lib/types';

interface Props {
  field: FieldDef;
  value: any;
  onChange: (value: any) => void;
}

export function Field({ field, value, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor={field.name}>
        {field.label}
        {field.required ? ' *' : ''}
      </label>
      <FieldControl field={field} value={value} onChange={onChange} />
      {field.help && <div className="help">{field.help}</div>}
    </div>
  );
}

function FieldControl({ field, value, onChange }: Props) {
  switch (field.type) {
    case 'textarea':
      return <textarea id={field.name} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
    case 'number':
      return (
        <input
          id={field.name}
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        />
      );
    case 'boolean':
      return (
        <input
          id={field.name}
          type="checkbox"
          style={{ width: 'auto' }}
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case 'select':
      return (
        <select id={field.name} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case 'string-list':
      return (
        <textarea
          id={field.name}
          value={Array.isArray(value) ? value.join('\n') : (value ?? '')}
          placeholder="Une valeur par ligne"
          onChange={(e) => onChange(e.target.value.split('\n'))}
        />
      );
    case 'json':
      return (
        <textarea
          id={field.name}
          style={{ fontFamily: 'monospace', minHeight: 140 }}
          value={typeof value === 'string' ? value : JSON.stringify(value ?? [], null, 2)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case 'image':
      return <ImageField value={value} onChange={onChange} />;
    default:
      return (
        <input
          id={field.name}
          type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function ImageField({ value, onChange }: { value: any; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const src = value && String(value).startsWith('/') ? `${API_URL}${value}` : value;

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const asset = await api.upload<MediaAsset>('/admin/media', form);
      onChange(asset.url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="image-field">
      {src ? <img src={src} alt="" /> : <div className="muted">Aucune image</div>}
      <div style={{ flex: 1 }}>
        <input type="text" value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="URL de l'image" />
        <div className="row" style={{ marginTop: '0.4rem' }}>
          <input
            type="file"
            accept="image/*"
            style={{ width: 'auto' }}
            disabled={busy}
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
          {busy && <span className="muted">Envoi…</span>}
        </div>
      </div>
    </div>
  );
}
