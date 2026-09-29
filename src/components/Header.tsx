import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { useRegistrationDialog } from './RegistrationDialog';
import { useSite } from '../content/SiteContentProvider';
import { useT } from '../i18n/LanguageProvider';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { event } = useSite();
  const t = useT();
  const navItems = [
  { label: t.nav.home, to: '/' },
  { label: t.nav.about, to: '/a-propos' },
  { label: t.nav.mahola, to: '/mahola' },
  { label: t.nav.programme, to: '/programme' },
  { label: t.nav.speakers, to: '/speakers' }];

  const registrationDialog = useRegistrationDialog();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-sand/95 backdrop-blur-sm border-b border-ink/10">
      <div className="mx-auto max-w-page px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 group" aria-label={t.nav.homeAria(event.name)}>
            <img src="/logo.png" alt="" className="h-11 w-auto" />
            <span className="leading-tight">
              <span className="block font-display text-lg text-ink">{event.name}</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                {event.city} · {event.dates}
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label={t.nav.main}>
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

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={registrationDialog.open}
              className="inline-flex items-center bg-ember px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 ease-expo hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-sand">

              {t.common.register}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center border border-ink/15 text-ink"
              aria-expanded={open}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}>

              {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open &&
      <nav className="lg:hidden border-t border-ink/10 bg-sand px-5 py-4" aria-label={t.nav.mobile}>
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
          <button
          type="button"
          onClick={registrationDialog.open}
          className="mt-3 block w-full bg-ember px-5 py-3 text-center text-sm font-medium text-white">

            {t.common.register}
          </button>
        </nav>
      }
    </header>);

}