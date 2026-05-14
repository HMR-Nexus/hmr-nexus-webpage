import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NexusLockup } from '@/components/NexusLockup';
import type { PageId } from '@/lib/navigation';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, projectType?: string) => void;
}

/**
 * NEXUS Navbar — editorial rail, sticky, mono-labels.
 * Inspired by the Brand Guidelines top rail: dot + wordmark + section links + locale.
 */
export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChanged);
    return () => { i18n.off('languageChanged', handleLanguageChanged); };
  }, [i18n]);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const navigate = useCallback((page: PageId, projectType?: string) => {
    onNavigate(page, projectType);
    setIsMobileMenuOpen(false);
  }, [onNavigate]);

  const navLinks = [
    { id: 'home' as const,      label: t('nav.home') },
    { id: 'history' as const,   label: t('nav.history') },
    { id: 'services' as const,  label: t('nav.services') },
    { id: 'portfolio' as const, label: t('nav.portfolio') },
    { id: 'products' as const,  label: t('nav.products') },
    { id: 'contact' as const,   label: t('nav.contact') },
  ];

  const languages = [
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'es', label: 'ES', name: 'Español' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isScrolled ? 'bg-ink/90 backdrop-blur-md' : 'bg-ink'
        }`}
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-7 py-3.5 flex items-center justify-between">
          {/* Left: lockup (symbol + small wordmark) */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center text-paper"
            aria-label="NEXUS — home"
          >
            <NexusLockup variant="horizontal" size={14} color="var(--paper)" showSuper={false} />
          </button>

          {/* Center: desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`mono-tag text-paper transition-opacity ${
                  activePage === link.id ? 'opacity-100 text-[color:var(--accent)]' : 'opacity-60 hover:opacity-100'
                }`}
                aria-current={activePage === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: locale + CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Locale switcher */}
            <div className="hidden md:flex items-center gap-1.5 mono-tag text-paper" role="group" aria-label="Select language">
              {languages.map((lng, i) => {
                const isCurrent = currentLang.startsWith(lng.code);
                return (
                  <span key={lng.code} className="flex items-center">
                    {i > 0 && <span className="opacity-30 mx-1.5">/</span>}
                    <button
                      onClick={() => changeLanguage(lng.code)}
                      aria-label={`Change language to ${lng.name}`}
                      aria-pressed={isCurrent}
                      aria-current={isCurrent ? 'true' : undefined}
                      className={`transition-opacity ${
                        isCurrent ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                      }`}
                    >
                      {lng.label}
                    </button>
                  </span>
                );
              })}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate('contact')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 mono-tag bg-laser text-ink hover:opacity-90 transition-opacity"
            >
              <span className="dot-accent" style={{ background: 'var(--ink)' }} />
              Briefing
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-paper"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-navigation-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink pt-20 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`font-display text-[32px] leading-[0.95] tracking-tight text-left ${
                    activePage === link.id ? 'text-[color:var(--accent)]' : 'text-paper'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="rule-top pt-6 mt-2 flex items-center gap-3 mono-tag text-paper" role="group" aria-label="Select language">
                {languages.map((lng, i) => {
                  const isCurrent = currentLang.startsWith(lng.code);
                  return (
                    <span key={lng.code} className="flex items-center">
                      {i > 0 && <span className="opacity-30 mx-2">/</span>}
                      <button
                        onClick={() => changeLanguage(lng.code)}
                        aria-label={`Change language to ${lng.name}`}
                        aria-pressed={isCurrent}
                        aria-current={isCurrent ? 'true' : undefined}
                        className={isCurrent ? 'opacity-100' : 'opacity-40'}
                      >
                        {lng.label}
                      </button>
                    </span>
                  );
                })}
              </div>

              <button
                onClick={() => navigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 mono-tag bg-laser text-ink w-max"
              >
                <span className="dot-accent" style={{ background: 'var(--ink)' }} />
                Briefing
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
