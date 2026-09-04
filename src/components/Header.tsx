import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { event } from '../data/site';

const navItems = [
{ label: 'Accueil', to: '/' },
{ label: 'À propos', to: '/a-propos' },
{ label: '10 ans de Mahola', to: '/mahola' },
{ label: 'Programme', to: '/programme' },
{ label: 'Speakers', to: '/speakers' }];


export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-sand/95 backdrop-blur-sm border-b border-ink/10">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group" aria-label={`${event.name} — accueil`}>
            <img src="/logo.png" alt="" className="h-11 w-auto" />
            <span className="leading-tight">
              <span className="block font-display text-lg text-ink">{event.name}</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                {event.city} · {event.dates}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
            {navItems.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
              `relative text-sm transition-colors duration-150 ease-expo hover:text-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 ${
              isActive ? 'text-ink font-medium' : 'text-ink-muted'}`

              }>
              
                {({ isActive }) =>
              <>
                    {item.label}
                    {isActive &&
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-ember" aria-hidden="true" />
                }
                  </>
              }
              </NavLink>
            )}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/programme"
              className="inline-flex items-center bg-ember px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 ease-expo hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-sand">
              
              S’inscrire
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-ink/15 text-ink"
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
            
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open &&
      <nav className="lg:hidden border-t border-ink/10 bg-sand px-5 py-4" aria-label="Navigation mobile">
          <ul className="space-y-1">
            {navItems.map((item) =>
          <li key={item.to}>
                <NavLink
              to={item.to}
              className={({ isActive }) =>
              `block py-2.5 text-base ${isActive ? 'text-ember font-medium' : 'text-ink'}`
              }>
              
                  {item.label}
                </NavLink>
              </li>
          )}
          </ul>
          <Link
          to="/programme"
          className="mt-3 block bg-ember px-5 py-3 text-center text-sm font-medium text-white">
          
            S’inscrire
          </Link>
        </nav>
      }
    </header>);

}