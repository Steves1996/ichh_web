import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { PartnerRequest, PartnerRequestStatus } from '../lib/types';

const STATUS_LABEL: Record<PartnerRequestStatus, string> = {
  nouveau: 'Nouveau',
  en_cours: 'En cours',
  traite: 'Traité',
};

const STATUS_COLOR: Record<PartnerRequestStatus, string> = {
  nouveau: '#1591a0',
  en_cours: '#b8860b',
  traite: '#5a7488',
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

export function PartnerRequestsPage() {
  const qc = useQueryClient();
  const [toast, setToast] = useState<string | null>(null);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2500);
  };
  const invalidate = () => qc.invalidateQueries({ queryKey: ['partner-requests'] });

  const query = useQuery({
    queryKey: ['partner-requests'],
    queryFn: () => api.get<PartnerRequest[]>('/admin/partner-requests'),
  });

  const setStatus = useMutation({
    mutationFn: (v: { id: string; status: PartnerRequestStatus }) =>
      api.put(`/admin/partner-requests/${v.id}`, { status: v.status }),
    onSuccess: () => { invalidate(); flash('Statut mis à jour'); },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.del(`/admin/partner-requests/${id}`),
    onSuccess: () => { invalidate(); flash('Demande supprimée'); },
  });

  const rows = query.data ?? [];
  const newCount = rows.filter((r) => r.status === 'nouveau').length;

  return (
    <div>
      <h1>Demandes de partenariat</h1>
      <p className="muted">
        Envoyées depuis le bouton « Devenir partenaire » du site vitrine.
        {rows.length > 0 && ` ${rows.length} demande(s), dont ${newCount} nouvelle(s).`}
      </p>

      {query.isLoading && <p>Chargement…</p>}
      {!query.isLoading && rows.length === 0 && (
        <div className="card"><p className="muted">Aucune demande pour le moment.</p></div>
      )}

      {rows.map((r) => (
        <div className="card" key={r.id}>
          <div className="spread">
            <div>
              <div className="title">{r.name}</div>
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
          </div>

          <div style={{ marginTop: '0.7rem' }}>
            <div className="muted">Qualité de partenariat souhaitée</div>
            <p style={{ whiteSpace: 'pre-wrap', margin: '0.3rem 0 0' }}>{r.message}</p>
          </div>

          <div className="row" style={{ marginTop: '0.9rem' }}>
            <select
              value={r.status}
              onChange={(e) => setStatus.mutate({ id: r.id, status: e.target.value as PartnerRequestStatus })}
              style={{ width: 'auto' }}
            >
              <option value="nouveau">Nouveau</option>
              <option value="en_cours">En cours</option>
              <option value="traite">Traité</option>
            </select>
            <button
              className="danger"
              onClick={() => { if (confirm('Supprimer cette demande ?')) remove.mutate(r.id); }}
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
