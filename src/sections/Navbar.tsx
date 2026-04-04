import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onScrollToContact: () => void;
}

export function Navbar({ onScrollToContact }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'products', label: t('nav.products') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-2.5 flex items-center gap-4 md:gap-6 rounded-sm transition-colors duration-200 max-w-[95vw] ${
        isScrolled
          ? 'bg-nd-surface border border-nd-border-visible'
          : 'bg-nd-black/80 border border-nd-border'
      }`}
    >
      {/* Logo */}
      <button
        className="flex items-center gap-2 shrink-0"
        onClick={() => scrollToSection('home')}
        aria-label="HMR Nexus — Home"
      >
        <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-8" />
        <span className="font-mono text-sm tracking-wider text-nd-text-display hidden sm:block">
          NEXUS
        </span>
      </button>

      {/* Desktop Navigation — Nothing pipe style */}
      <ul className="hidden lg:flex items-center gap-0">
        {navLinks.map((link, i) => (
          <li key={link.id} className="flex items-center">
            {i > 0 && <span className="text-nd-border-visible mx-1 select-none">|</span>}
            <button
              onClick={() => scrollToSection(link.id)}
              className="px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-nd-text-secondary hover:text-nd-text-display transition-colors duration-200"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Language Selector — Nothing segmented control */}
        <div className="flex border border-nd-border-visible rounded-sm p-0.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                currentLang === lang.code
                  ? 'bg-nd-text-display text-nd-black'
                  : 'text-nd-text-disabled hover:text-nd-text-secondary'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* CTA Button — Nothing primary pill */}
        <button
          onClick={onScrollToContact}
          className="hidden md:flex items-center gap-1.5 bg-nd-text-display text-nd-black px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] hover:bg-nd-text-primary transition-colors duration-200"
        >
          {t('nav.cta')}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 text-nd-text-display"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-nd-surface border border-nd-border-visible rounded-sm p-3"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-nd-text-secondary hover:text-nd-text-display border-b border-nd-border last:border-0 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-3 mt-1">
                <button
                  onClick={() => {
                    onScrollToContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-nd-text-display text-nd-black px-4 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.06em]"
                >
                  {t('nav.cta')}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
