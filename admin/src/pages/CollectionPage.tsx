import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { ContentDef, Entry } from '../lib/types';
import { EntryForm } from '../components/EntryForm';

export function CollectionPage({ defs }: { defs: ContentDef[] }) {
  const { key } = useParams<{ key: string }>();
  const def = defs.find((d) => d.key === key);
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };
  const invalidate = () => qc.invalidateQueries({ queryKey: ['collection', key] });

  const query = useQuery({
    queryKey: ['collection', key],
    queryFn: () => api.get<Entry[]>(`/admin/collections/${key}`),
    enabled: !!key,
  });

  const create = useMutation({
    mutationFn: (data: Record<string, any>) => api.post(`/admin/collections/${key}`, data),
    onSuccess: () => { invalidate(); setCreating(false); flash('Élément ajouté'); },
  });
  const update = useMutation({
    mutationFn: (v: { id: string; data: Record<string, any> }) =>
      api.put(`/admin/collections/${key}/${v.id}`, v.data),
    onSuccess: () => { invalidate(); setEditing(null); flash('Modifié'); },
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/admin/collections/${key}/${id}`),
    onSuccess: () => { invalidate(); flash('Supprimé'); },
  });
  const reorder = useMutation({
    mutationFn: (ids: string[]) => api.put(`/admin/collections/${key}/reorder`, { ids }),
    onSuccess: invalidate,
  });

  if (!def) return <p>Contenu inconnu.</p>;

  const entries = query.data ?? [];
  const move = (index: number, dir: -1 | 1) => {
    const next = [...entries];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    reorder.mutate(next.map((e) => e.id));
  };

  const title = (e: Entry) =>
    (def.titleField && e.data[def.titleField]) || Object.values(e.data)[0] || '(sans titre)';

  return (
    <div>
      <div className="spread">
        <div>
          <h1>{def.label}</h1>
          <p className="muted">{entries.length} élément(s) — {def.group}</p>
        </div>
        <button onClick={() => { setCreating(true); setEditing(null); }}>+ Ajouter</button>
      </div>

      {creating && (
        <div className="card">
          <h2>Nouvel élément</h2>
          <EntryForm
            def={def}
            initial={{}}
            submitLabel="Créer"
            onCancel={() => setCreating(false)}
            onSubmit={async (data) => { await create.mutateAsync(data); }}
          />
        </div>
      )}

      {query.isLoading && <p>Chargement…</p>}

      {entries.map((e, i) => (
        <div className="card" key={e.id}>
          <div className="spread">
            <div className="title">{String(title(e)).slice(0, 90)}</div>
            <div className="row">
              <button className="ghost" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
              <button className="ghost" onClick={() => move(i, 1)} disabled={i === entries.length - 1}>↓</button>
              <button className="secondary" onClick={() => { setEditing(editing === e.id ? null : e.id); setCreating(false); }}>
                {editing === e.id ? 'Fermer' : 'Modifier'}
              </button>
              <button
                className="danger"
                onClick={() => { if (confirm('Supprimer cet élément ?')) remove.mutate(e.id); }}
              >
                Suppr.
              </button>
            </div>
          </div>
          {editing === e.id && (
            <div style={{ marginTop: '1rem' }}>
              <EntryForm
                def={def}
                initial={e.data}
                onCancel={() => setEditing(null)}
                onSubmit={async (data) => { await update.mutateAsync({ id: e.id, data }); }}
              />
            </div>
          )}
        </div>
      ))}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
