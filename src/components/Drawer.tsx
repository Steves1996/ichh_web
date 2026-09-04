import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
          className="absolute inset-0 bg-ink/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.div
          className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-sand shadow-2xl"
          initial={{ x: 32, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 32, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">{title}</p>
              <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-ink/15 text-ink transition-colors duration-150 ease-expo hover:bg-ink hover:text-sand"
              aria-label="Fermer">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}