import { Link } from 'react-router-dom';
import { ContentDef } from '../lib/types';
import { API_URL } from '../lib/api';

export function Dashboard({ defs }: { defs: ContentDef[] }) {
  const groups = defs.reduce<Record<string, ContentDef[]>>((acc, d) => {
    (acc[d.group] ??= []).push(d);
    return acc;
  }, {});

  return (
    <div>
      <h1>Tableau de bord</h1>
      <p className="muted">
        Chaque bloc ci-dessous correspond à une partie du site. Les modifications sont visibles
        immédiatement sur le site vitrine (rechargez la page).
      </p>
      {Object.entries(groups).map(([group, items]) => (
        <div className="card" key={group}>
          <h2>{group}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.6rem' }}>
            {items.map((d) => (
              <Link
                key={d.key}
                to={`/${d.kind === 'singleton' ? 's' : 'c'}/${d.key}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="list-item" style={{ margin: 0 }}>
                  <div className="title">{d.label}</div>
                  <div className="muted">{d.kind === 'singleton' ? 'Bloc unique' : 'Liste'}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="card">
        <h2>Demandes de partenariat</h2>
        <p className="muted">
          Formulaires « Devenir partenaire » reçus depuis le site vitrine. <Link to="/partenariats">Ouvrir</Link>
        </p>
      </div>
      <div className="card">
        <h2>Médiathèque</h2>
        <p className="muted">Images et fichiers téléversés. <Link to="/media">Ouvrir</Link></p>
      </div>
      <p className="muted">API : {API_URL}</p>
    </div>
  );
}
