import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronRight } from 'lucide-react';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-2.5 flex items-center gap-4 md:gap-6 rounded-full transition-all duration-200 max-w-[95vw] ${
        isScrolled
          ? 'bg-[#050a14]/95 border border-white/10'
          : 'bg-white/[0.03] border border-white/[0.08]'
      }`}
    >
      {/* Logo */}
      <button
        className="flex items-center gap-2 shrink-0"
        onClick={() => scrollToSection('home')}
        aria-label="HMR Nexus — Home"
      >
        <img src="/logo.png" alt="" aria-hidden="true" className="h-8 w-8" />
        <span className="font-bold text-white text-sm hidden sm:block">
          HMR <span className="text-[#3d8bff]">Nexus</span>
        </span>
      </button>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.id)}
              className="px-3 py-1.5 rounded-full text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Language Selector */}
        <div className="flex bg-white/[0.03] rounded-full p-0.5 border border-white/[0.08]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                currentLang === lang.code
                  ? 'bg-white text-[#050a14]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <button
          onClick={onScrollToContact}
          className="hidden md:flex items-center gap-1.5 bg-white text-[#050a14] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#00d4ff] transition-colors"
        >
          {t('nav.cta')}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Mobile Menu Toggle */}
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-white"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-[#050a14]/98 border border-white/10 rounded-xl p-3"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#94a3b8] hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-2 border-t border-white/10 mt-2">
                <button
                  onClick={() => {
                    onScrollToContact();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white text-[#050a14] px-4 py-2.5 rounded-full text-sm font-medium"
                >
                  {t('nav.cta')}
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
