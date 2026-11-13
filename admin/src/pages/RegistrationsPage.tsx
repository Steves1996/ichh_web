import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import { api } from '../lib/api';
import { Registration, RegistrationSettings, RegistrationStatus } from '../lib/types';

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

  const settingsQuery = useQuery({
    queryKey: ['registration-settings'],
    queryFn: () => api.get<RegistrationSettings>('/registrations/status'),
  });

  const updateSettings = useMutation({
    mutationFn: (isOpen: boolean) =>
      api.put<RegistrationSettings>('/admin/registrations/settings', { isOpen }),
    onSuccess: (settings) => {
      qc.setQueryData(['registration-settings'], settings);
      flash(settings.isOpen ? 'Inscriptions ouvertes' : 'Inscriptions fermées');
    },
    onError: (error) => flash(`Impossible de modifier les inscriptions : ${error.message}`),
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

  const exportExcel = () => {
    try {
      const worksheet = XLSX.utils.aoa_to_sheet([
        ['Nom complet', 'E-mail', 'Téléphone', 'Ville', 'Statut', 'Date d’inscription'],
        ...filtered.map((registration) => [
          registration.fullName,
          registration.email,
          registration.phone,
          registration.city,
          STATUS_LABEL[registration.status],
          fmtDate(registration.createdAt),
        ]),
      ]);
      worksheet['!cols'] = [
        { wch: 30 },
        { wch: 32 },
        { wch: 20 },
        { wch: 24 },
        { wch: 16 },
        { wch: 24 },
      ];
      worksheet['!autofilter'] = { ref: `A1:F${filtered.length + 1}` };

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Inscriptions');
      XLSX.writeFile(workbook, `inscriptions-ichh-${new Date().toISOString().slice(0, 10)}.xlsx`);
      flash(`${filtered.length} inscription(s) exportée(s)`);
    } catch (error) {
      console.error('Échec de l’export Excel des inscriptions', error);
      flash('Échec de la création du fichier Excel.');
    }
  };

  return (
    <div>
      <h1>Inscriptions à la conférence</h1>
      <p className="muted">
        Envoyées depuis le bouton « S’inscrire » du site vitrine.
        {rows.length > 0 && ` ${rows.length} inscription(s), dont ${newCount} nouvelle(s).`}
      </p>

      <div className="card">
        <div className="spread">
          <div>
            <div className="title">Inscriptions en ligne</div>
            <div className="muted">
              {settingsQuery.data
                ? settingsQuery.data.isOpen
                  ? 'Les visiteurs peuvent envoyer une inscription.'
                  : 'Le formulaire est fermé aux visiteurs.'
                : settingsQuery.isLoading
                  ? 'Chargement du réglage…'
                  : 'État des inscriptions indisponible.'}
            </div>
          </div>
          <button
            className={settingsQuery.data?.isOpen ? 'danger' : 'secondary'}
            onClick={() => updateSettings.mutate(!settingsQuery.data?.isOpen)}
            disabled={!settingsQuery.data || updateSettings.isPending}
          >
            {updateSettings.isPending
              ? 'Enregistrement…'
              : settingsQuery.data?.isOpen
                ? 'Fermer les inscriptions'
                : 'Ouvrir les inscriptions'}
          </button>
        </div>
        {settingsQuery.isError && (
          <p role="alert" style={{ color: 'var(--danger)', marginTop: '0.75rem' }}>
            Impossible de charger le réglage : {settingsQuery.error.message}
          </p>
        )}
      </div>

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
        <button onClick={exportExcel} disabled={filtered.length === 0 || query.isLoading}>
          Exporter Excel (.xlsx)
        </button>
      </div>

      {query.isLoading && <p>Chargement…</p>}
      {query.isError && <p role="alert" style={{ color: 'var(--danger)' }}>Impossible de charger les inscriptions : {query.error.message}</p>}
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
