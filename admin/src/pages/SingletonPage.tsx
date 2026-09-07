import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { ContentDef } from '../lib/types';
import { EntryForm } from '../components/EntryForm';

export function SingletonPage({ defs }: { defs: ContentDef[] }) {
  const { key } = useParams<{ key: string }>();
  const def = defs.find((d) => d.key === key);
  const qc = useQueryClient();
  const [toast, setToast] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['singleton', key],
    queryFn: () => api.get<{ data: Record<string, any> }>(`/admin/singletons/${key}`),
    enabled: !!key,
  });

  const save = useMutation({
    mutationFn: (data: Record<string, any>) => api.put(`/admin/singletons/${key}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['singleton', key] });
      setToast('Enregistré');
      setTimeout(() => setToast(null), 2500);
    },
  });

  if (!def) return <p>Contenu inconnu.</p>;
  if (query.isLoading) return <p>Chargement…</p>;

  return (
    <div>
      <h1>{def.label}</h1>
      <p className="muted">Bloc unique — {def.group}</p>
      <div className="card">
        <EntryForm
          def={def}
          initial={query.data?.data ?? {}}
          onSubmit={async (data) => {
            await save.mutateAsync(data);
          }}
        />
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
