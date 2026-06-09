import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { PageId } from '@/lib/navigation';
import { setPendingAnchor } from '@/lib/navAnchor';

interface NexusNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

function NexusSymbol({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="sym"
      style={{ width: size, height: size }}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="6" height="28" fill="#F5F3EE" />
      <rect x="28" y="6" width="6" height="28" fill="#F5F3EE" />
      <path d="M12 8 L28 32 L28 26 L12 2 Z" fill="#FF4D2E" />
    </svg>
  );
}

/** Language switcher — EN / DE, mono labels, laser accent on active */
function LangSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;

  const switchTo = (lng: string) => {
    if (current !== lng) i18n.changeLanguage(lng);
  };

  return (
    <div className={`ns-lang${mobile ? ' mobile' : ''}`} aria-label="Language selection">
      {(['en', 'de'] as const).map((lng, i) => (
        <span key={lng} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span className="sep">/</span>}
          <button
            onClick={() => switchTo(lng)}
            className={current === lng ? 'active' : ''}
            aria-label={`Switch to ${lng === 'en' ? 'English' : 'German'}`}
            aria-pressed={current === lng}
          >
            {lng.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export function NexusNav({ activePage, onNavigate }: NexusNavProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!prefersReduced) {
        if (y > lastY.current && y > 400) setHidden(true);
        else setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [mobileOpen]);

  const navigate = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  // Navigating to the current page is a React no-op (no remount), so the
  // pending-anchor handoff never fires — scroll directly when already home.
  const goToAnchor = (id: string) => {
    if (activePage === 'home') {
      setMobileOpen(false);
      // Small delay so the mobile menu closes and body scroll unlocks first
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      setPendingAnchor(id);
      navigate('home');
    }
  };

  const navClass = [
    'ns-nav',
    scrolled ? 'scrolled' : '',
    hidden ? 'hide' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} aria-label="Main navigation">
        <div className="inner">
          <button className="ns-brand" onClick={() => navigate('home')} aria-label="NEXUS — home">
            <NexusSymbol size={22} />
            <span className="wm">NEXUS</span>
          </button>

          <div className="ns-navlinks" role="navigation">
            <button
              className={activePage === 'fibra' ? 'active' : ''}
              onClick={() => navigate('fibra')}
            >
              {t('nexus.nav.fibra')}
            </button>
            <button
              className={activePage === 'software' ? 'active' : ''}
              onClick={() => navigate('software')}
            >
              {t('nexus.nav.software')}
            </button>
            <button onClick={() => goToAnchor('ns-process')}>
              {t('nexus.nav.process')}
            </button>
          </div>

          <LangSwitcher />

          <button className="ns-nav-cta" onClick={() => goToAnchor('ns-contact')}>
            {t('nexus.nav.letsTalk')} <span className="ar">→</span>
          </button>

          <button
            className={`ns-menu-btn${mobileOpen ? ' open' : ''}`}
            aria-label={mobileOpen ? t('nexus.nav.closeMenu') : t('nexus.nav.openMenu')}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="ns-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="links">
              <button className={activePage === 'home' ? 'active' : ''} onClick={() => navigate('home')}>
                {t('nexus.nav.home')}
              </button>
              <button className={activePage === 'fibra' ? 'active' : ''} onClick={() => navigate('fibra')}>
                {t('nexus.nav.fibra')}
              </button>
              <button className={activePage === 'software' ? 'active' : ''} onClick={() => navigate('software')}>
                {t('nexus.nav.software')}
              </button>
            </div>
            <div style={{ padding: '0 0 8px 0' }}>
              <LangSwitcher mobile />
            </div>
            <div className="cta-wrap">
              <button className="ns-btn ns-btn-primary" onClick={() => goToAnchor('ns-contact')}>
                {t('nexus.nav.letsTalk')} <span className="ar">→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Sub-page nav for Fibra / Software pages */
interface SubNavProps {
  onBack: () => void;
}

export function NexusSubNav({ onBack }: SubNavProps) {
  const { t } = useTranslation();
  return (
    <div className="ns-subnav" aria-label="Sub-page navigation">
      <div className="inner">
        <button className="home-link" onClick={onBack} aria-label="Back to home">
          <svg className="sym" style={{ width: 20, height: 20 }} viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="6" y="6" width="6" height="28" fill="#F5F3EE" />
            <rect x="28" y="6" width="6" height="28" fill="#F5F3EE" />
            <path d="M12 8 L28 32 L28 26 L12 2 Z" fill="#FF4D2E" />
          </svg>
          <span className="wm">NEXUS</span>
        </button>
        <div className="slogan" aria-label="Company slogan">
          <span>{t('nexus.nav.slogan.quality')}</span>
          <span className="sep">·</span>
          <span>{t('nexus.nav.slogan.commitment')}</span>
          <span className="sep">·</span>
          <span>{t('nexus.nav.slogan.innovation')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <LangSwitcher />
          <button className="back-btn" onClick={onBack} aria-label="Go back">
            <span>←</span> {t('nexus.nav.back')}
          </button>
        </div>
      </div>
    </div>
  );
}
