import { useState } from 'react';
import { ContentDef } from '../lib/types';
import { Field } from './Field';

interface Props {
  def: ContentDef;
  initial: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function EntryForm({ def, initial, onSubmit, onCancel, submitLabel = 'Enregistrer' }: Props) {
  const [data, setData] = useState<Record<string, any>>({ ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (name: string, value: any) => setData((d) => ({ ...d, [name]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const cleaned: Record<string, any> = {};
      for (const f of def.fields) {
        let v = data[f.name];
        if (f.type === 'string-list' && Array.isArray(v)) v = v.map((s) => s.trim()).filter(Boolean);
        cleaned[f.name] = v;
      }
      await onSubmit(cleaned);
    } catch (err: any) {
      setError(err.message ?? 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit}>
      {def.fields.map((f) => (
        <Field key={f.name} field={f} value={data[f.name]} onChange={(v) => set(f.name, v)} />
      ))}
      {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
      <div className="row">
        <button type="submit" disabled={saving}>
          {saving ? 'Enregistrement…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
