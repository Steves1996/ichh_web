import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Subscriber } from '../lib/types';

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function SubscribersPage() {
  const qc = useQueryClient();
  const [toast, setToast] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };

  const query = useQuery({
    queryKey: ['subscribers'],
    queryFn: () => api.get<Subscriber[]>('/admin/subscribers'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/admin/subscribers/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['subscribers'] }); flash('Abonné supprimé'); },
  });

  const rows = query.data ?? [];
  const filtered = useMemo(
    () => rows.filter((r) => r.email.toLowerCase().includes(q.trim().toLowerCase())),
    [rows, q],
  );

  const copyAll = () => {
    navigator.clipboard?.writeText(filtered.map((r) => r.email).join(', '));
    flash(`${filtered.length} adresse(s) copiée(s)`);
  };

  return (
    <div>
      <h1>Abonnés à la lettre d’information</h1>
      <p className="muted">
        Adresses saisies dans le bloc « Suivre la préparation de l’ICHH » du site vitrine.
        {rows.length > 0 && ` ${rows.length} abonné(s).`}
      </p>

      <div className="toolbar">
        <input
          placeholder="Filtrer par e-mail…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ maxWidth: 260 }}
        />
        <button className="secondary" onClick={copyAll} disabled={filtered.length === 0}>
          Copier les e-mails
        </button>
      </div>

      {query.isLoading && <p>Chargement…</p>}
      {!query.isLoading && rows.length === 0 && (
        <div className="card"><p className="muted">Aucun abonné pour le moment.</p></div>
      )}

      {filtered.map((r) => (
        <div className="list-item" key={r.id}>
          <div className="spread">
            <div>
              <div className="title">
                <a href={`mailto:${r.email}`}>{r.email}</a>
              </div>
              <div className="muted">
                Inscrit le {fmtDate(r.createdAt)}
                {' · '}
                {r.notified ? 'e-mail de confirmation envoyé' : 'confirmation non envoyée'}
              </div>
            </div>
            <button
              className="danger"
              onClick={() => { if (confirm('Supprimer cet abonné ?')) remove.mutate(r.id); }}
            >
              Suppr.
            </button>
          </div>
        </div>
      ))}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
