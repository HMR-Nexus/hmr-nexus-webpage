import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

export function NexusNav({ activePage, onNavigate }: NexusNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
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
              Fibra
            </button>
            <button
              className={activePage === 'software' ? 'active' : ''}
              onClick={() => navigate('software')}
            >
              Software
            </button>
            <button
              onClick={() => {
                setPendingAnchor('ns-process');
                navigate('home');
              }}
            >
              Process
            </button>
          </div>

          <button
            className="ns-nav-cta"
            onClick={() => {
              setPendingAnchor('ns-contact');
              navigate('home');
            }}
          >
            Let&apos;s talk <span>→</span>
          </button>

          <button
            className={`ns-menu-btn${mobileOpen ? ' open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
                Home
              </button>
              <button className={activePage === 'fibra' ? 'active' : ''} onClick={() => navigate('fibra')}>
                Fibra
              </button>
              <button className={activePage === 'software' ? 'active' : ''} onClick={() => navigate('software')}>
                Software
              </button>
            </div>
            <div className="cta-wrap">
              <button className="ns-btn ns-btn-primary" onClick={() => navigate('home')}>
                Let&apos;s talk <span className="ar">→</span>
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
          <span>Calidad</span>
          <span className="sep">·</span>
          <span>Compromiso</span>
          <span className="sep">·</span>
          <span>Innovación</span>
        </div>
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          <span>←</span> Volver
        </button>
      </div>
    </div>
  );
}
