import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { ContentDef } from '../lib/types';

export function Layout({ defs, children }: { defs: ContentDef[]; children: ReactNode }) {
  const { user, logout } = useAuth();

  const groups = defs.reduce<Record<string, ContentDef[]>>((acc, d) => {
    (acc[d.group] ??= []).push(d);
    return acc;
  }, {});

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">ICHH Yaoundé 2026<br /><span className="muted" style={{ color: '#7da5b8' }}>Administration</span></div>
        <NavLink to="/" end>Tableau de bord</NavLink>
        <NavLink to="/partenariats">Demandes de partenariat</NavLink>
        <NavLink to="/media">Médiathèque</NavLink>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div className="group-title">{group}</div>
            {items.map((d) => (
              <NavLink key={d.key} to={`/${d.kind === 'singleton' ? 's' : 'c'}/${d.key}`}>
                {d.label}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="logout">
          <div className="muted" style={{ color: '#7da5b8', padding: '0 0.5rem' }}>{user?.email}</div>
          <button className="ghost" style={{ width: '100%', marginTop: '0.4rem', color: '#cfe0e8' }} onClick={logout}>
            Se déconnecter
          </button>
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
