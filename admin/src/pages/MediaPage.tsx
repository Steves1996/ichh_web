import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { MediaAsset } from '../lib/types';

export function MediaPage() {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const query = useQuery({ queryKey: ['media'], queryFn: () => api.get<MediaAsset[]>('/admin/media') });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/admin/media/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['media'] }),
  });

  const upload = async (files: FileList) => {
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append('file', file);
        await api.upload('/admin/media', form);
      }
      qc.invalidateQueries({ queryKey: ['media'] });
    } finally {
      setBusy(false);
    }
  };

  const copy = (url: string) => {
    navigator.clipboard?.writeText(url);
    setToast('URL copiée');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      <h1>Médiathèque</h1>
      <p className="muted">
        Téléversez vos images ici, puis copiez leur URL dans un champ « image » du contenu.
      </p>
      <div className="toolbar">
        <input type="file" accept="image/*,application/pdf" multiple disabled={busy}
          onChange={(e) => e.target.files && upload(e.target.files)} />
        {busy && <span className="muted">Envoi…</span>}
      </div>

      <div className="media-grid">
        {(query.data ?? []).map((m) => (
          <figure key={m.id}>
            {m.mimeType.startsWith('image/') ? (
              <img src={m.url} alt={m.alt} />
            ) : (
              <div style={{ height: 110, display: 'grid', placeItems: 'center' }} className="muted">PDF</div>
            )}
            <figcaption>
              {m.originalName}
              <div className="row" style={{ marginTop: '0.3rem' }}>
                <button className="ghost" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} onClick={() => copy(m.url)}>Copier l’URL</button>
                <button className="danger" style={{ padding: '0.2rem 0.4rem', fontSize: '0.7rem' }} onClick={() => remove.mutate(m.id)}>Suppr.</button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
