import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Registration, RegistrationStatus } from '../lib/types';

const STATUS_LABEL: Record<RegistrationStatus, string> = {
  nouveau: 'Nouveau',
  confirme: 'Confirmé',
  annule: 'Annulé',
};

const STATUS_COLOR: Record<RegistrationStatus, string> = {
  nouveau: '#1591a0',
  confirme: '#2e7d32',
  annule: '#c0392b',
};

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

export function RegistrationsPage() {
  const qc = useQueryClient();
  const [toast, setToast] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };
  const invalidate = () => qc.invalidateQueries({ queryKey: ['registrations'] });

  const query = useQuery({
    queryKey: ['registrations'],
    queryFn: () => api.get<Registration[]>('/admin/registrations'),
  });

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: RegistrationStatus }) =>
      api.put(`/admin/registrations/${v.id}`, { status: v.status }),
    onSuccess: () => { invalidate(); flash('Statut mis à jour'); },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/admin/registrations/${id}`),
    onSuccess: () => { invalidate(); flash('Inscription supprimée'); },
  });

  const rows = query.data ?? [];
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (r) =>
        r.fullName.toLowerCase().includes(s) ||
        r.email.toLowerCase().includes(s) ||
        r.city.toLowerCase().includes(s),
    );
  }, [rows, q]);

  const newCount = rows.filter((r) => r.status === 'nouveau').length;

  const copyEmails = () => {
    navigator.clipboard?.writeText(filtered.map((r) => r.email).join(', '));
    flash(`${filtered.length} e-mail(s) copié(s)`);
  };

  return (
    <div>
      <h1>Inscriptions à la conférence</h1>
      <p className="muted">
        Envoyées depuis le bouton « S’inscrire » du site vitrine.
        {rows.length > 0 && ` ${rows.length} inscription(s), dont ${newCount} nouvelle(s).`}
      </p>

      <div className="toolbar">
        <input
          placeholder="Filtrer (nom, e-mail, ville)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <button className="secondary" onClick={copyEmails} disabled={filtered.length === 0}>
          Copier les e-mails
        </button>
      </div>

      {query.isLoading && <p>Chargement…</p>}
      {!query.isLoading && rows.length === 0 && (
        <div className="card"><p className="muted">Aucune inscription pour le moment.</p></div>
      )}

      {filtered.map((r) => (
        <div className="card" key={r.id}>
          <div className="spread">
            <div>
              <div className="title">{r.fullName}</div>
              <div className="muted">{fmtDate(r.createdAt)}</div>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: STATUS_COLOR[r.status],
              }}
            >
              {STATUS_LABEL[r.status]}
            </span>
          </div>

          <div style={{ marginTop: '0.7rem', display: 'grid', gap: '0.3rem', fontSize: '0.9rem' }}>
            <div>
              <span className="muted">E-mail : </span>
              <a href={`mailto:${r.email}`}>{r.email}</a>
            </div>
            <div>
              <span className="muted">Téléphone : </span>
              <a href={`tel:${r.phone.replace(/\s/g, '')}`}>{r.phone}</a>
            </div>
            <div>
              <span className="muted">Ville de résidence : </span>
              {r.city}
            </div>
          </div>

          <div className="row" style={{ marginTop: '0.9rem' }}>
            <select
              value={r.status}
              onChange={(e) => setStatus.mutate({ id: r.id, status: e.target.value as RegistrationStatus })}
              style={{ width: 'auto' }}
            >
              <option value="nouveau">Nouveau</option>
              <option value="confirme">Confirmé</option>
              <option value="annule">Annulé</option>
            </select>
            <button
              className="danger"
              onClick={() => { if (confirm('Supprimer cette inscription ?')) remove.mutate(r.id); }}
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
