import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NEXUS WhatsApp — editorial square button, mono-labels, brand tokens.
 * The WhatsApp green is kept ONLY as a functional status dot — the button is brand.
 */
export function WhatsAppButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '+491****4448';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Quick Actions Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-ink p-4 mb-2 min-w-[220px]"
            style={{ border: '1px solid var(--rule-strong)' }}
          >
            <div className="flex justify-between items-center mb-3 pb-3 rule-bottom">
              <span className="mono-tag text-paper/80">
                {t('whatsapp.helpTitle')}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-paper/50 hover:text-paper transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-1">
              {[
                { key: 'fiber', text: t('whatsapp.options.fiber') },
                { key: 'bot', text: t('whatsapp.options.bot') },
                { key: 'custom', text: t('whatsapp.options.custom') },
              ].map((option, index) => (
                <motion.a
                  key={option.key}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t(`whatsapp.messages.${option.key}`))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 text-paper/80 text-[14px] hover:bg-paper/5 hover:text-paper transition-colors"
                >
                  {option.text}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button — square, brand ink, laser accent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden w-12 h-12 bg-ink hover:bg-graphite flex items-center justify-center transition-colors"
        style={{ border: '1px solid var(--rule-strong)' }}
        aria-label="WhatsApp"
      >
        <motion.div
          className="absolute inset-0"
          style={{ background: 'var(--accent)', opacity: 0.15 }}
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.15, 0, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        <span
          className="font-display text-[color:var(--accent)]"
          style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          W
        </span>
        <span className="dot-accent animate-pulse-laser absolute top-1.5 right-1.5" style={{ width: 5, height: 5 }} />
      </button>
    </div>
  );
}
