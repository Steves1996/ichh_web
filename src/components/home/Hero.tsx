import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, PlayIcon, XIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Countdown } from '../Countdown';
import { usePartnerDialog } from '../PartnerDialog';
import { useSite } from '../../content/SiteContentProvider';

export function Hero() {
  const { event } = useSite();
  const partnerDialog = usePartnerDialog();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative bg-ink text-sand" aria-labelledby="hero-title">
      <div className="absolute inset-0">
        <img
          src="/9c6ef334-5f09-4f35-95c3-39cc504f79ea.jpg"
          alt=""
          className="h-full w-full object-cover opacity-30" />
        
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative mx-auto max-w-page px-5 sm:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-white p-3">
                <img src="/logo1.png" alt={event.name} className="h-24 w-auto" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-2xl text-white">{event.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-sand/60">{event.edition}</p>
              </div>
            </div>

            <h1 id="hero-title" className="mt-8 font-display text-[2.6rem] sm:text-6xl leading-[1.03] text-white">
              {event.slogan}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand/75">
              « {event.themeEn} » — {event.theme}.
            </p>
            <p className="mt-6 text-sm text-sand/60">
              {event.dates} · {event.venue}, {event.city} — {event.country}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/programme"
                className="bg-ember px-7 py-3.5 text-sm font-medium text-white transition-colors duration-150 ease-expo hover:bg-white hover:text-ink">
                
                S’inscrire
              </Link>
              <button
                type="button"
                onClick={partnerDialog.open}
                className="border border-sand/30 px-7 py-3.5 text-sm font-medium text-sand transition-colors duration-150 ease-expo hover:bg-sand hover:text-ink">

                Devenir partenaire
              </button>
              <a
                href="/brochure-ichh-yaounde-2026.pdf"
                download
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-sand/80 transition-colors duration-150 ease-expo hover:text-white">

                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Télécharger la brochure (PDF, 7,4 Mo)
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative block w-full overflow-hidden border border-sand/20 text-left"
              aria-label={`Lire la vidéo de présentation de l’${event.name}`}>
              
              <img
                src="/2960c9bf-fa00-4f3d-a98f-c41b8d2d053f.jpg"
                alt="Équipe Mahola en campagne de terrain"
                className="aspect-video w-full object-cover transition-transform duration-300 ease-expo group-hover:scale-[1.03]" />
              
              <span className="absolute inset-0 bg-ink/35 transition-colors duration-150 group-hover:bg-ink/25" />
              <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-ink">
                  <PlayIcon className="h-4 w-4 translate-x-[1px]" />
                </span>
                <span className="text-sm font-medium text-white">
                  Vidéo de présentation — 2 min 40
                </span>
              </span>
            </button>

            <div className="border-t border-sand/20 pt-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sand/55">Ouverture des travaux dans</p>
              <div className="mt-4">
                <Countdown target={event.startIso} tone="light" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {videoOpen &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-label="Vidéo de présentation">
            <motion.div
            className="absolute inset-0 bg-ink/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => setVideoOpen(false)} />
          
            <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
            
              <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center border border-sand/30 text-sand transition-colors duration-150 hover:bg-sand hover:text-ink"
              aria-label="Fermer la vidéo">
              
                <XIcon className="h-4 w-4" />
              </button>
              <div className="flex aspect-video w-full flex-col items-center justify-center bg-ink-soft text-center px-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-ink">
                  <PlayIcon className="h-5 w-5 translate-x-[1px]" />
                </span>
                <p className="mt-5 font-display text-2xl text-white">Film de présentation — {event.name}</p>
                <p className="mt-2 max-w-md text-sm text-sand/65">
                  Le montage définitif sera intégré ici avant l’ouverture des travaux, le 12 novembre 2026.
                </p>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </section>);

}