import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useSite } from '../content/SiteContentProvider';

export function Footer() {
  const { event, footerLinks, maholaContact } = useSite();
  return (
    <footer className="bg-ink text-sand">
      <div className="mx-auto max-w-page px-5 sm:px-8 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center rounded-md bg-white p-2">
                <img src="/logo.png" alt={event.name} className="h-12 w-auto" />
              </span>
              <span className="font-display text-xl">{event.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/70">
              {event.fullNameFr} — célébration des 10 ans de la Mahola Health Foundation. Sous la supervision du
              MINSANTE, coordonnée par la Mahola Health Foundation, avec All Access Agency.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-sand/80">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ember-soft" aria-hidden="true" />
                <span>
                  {event.venue}, {event.city}, {event.country}
                </span>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-ember-soft" aria-hidden="true" />
                <a className="hover:text-white transition-colors duration-150" href={`mailto:${maholaContact.email}`}>
                  {maholaContact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-ember-soft" aria-hidden="true" />
                <span>
                  <a className="hover:text-white transition-colors duration-150" href={`tel:${maholaContact.phoneCameroon.replace(/\s/g, '')}`}>
                    {maholaContact.phoneCameroon}
                  </a>{' '}
                  ·{' '}
                  <a className="hover:text-white transition-colors duration-150" href={`tel:${maholaContact.phoneUk.replace(/\s/g, '')}`}>
                    {maholaContact.phoneUk}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {footerLinks.map((group) =>
          <div key={group.title}>
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-sand/50">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) =>
              <li key={link.label}>
                    <Link
                  to={link.to}
                  className="text-sm text-sand/85 hover:text-ember-soft transition-colors duration-150 ease-expo">
                  
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-sand/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sand/55">
            © 2026 Mahola Health Foundation · All Access Agency. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            {[
            { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/company/mahola-health-foundation' },
            { Icon: InstagramIcon, label: 'Instagram', href: maholaContact.instagram },
            { Icon: MailIcon, label: 'E-mail', href: `mailto:${maholaContact.email}` }].
            map(({ Icon, label, href }) =>
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center border border-sand/20 text-sand/80 transition-colors duration-150 ease-expo hover:border-ember-soft hover:text-ember-soft">

                <Icon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}