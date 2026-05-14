import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { TrustBanner } from './components/TrustBanner';
import { LiveGrid } from './components/LiveGrid';
import { toPageId, type PageId } from './lib/navigation';
import './i18n';

// Lazy-load below-the-fold sections for faster initial paint
const Services    = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Products    = lazy(() => import('./sections/Products').then(m => ({ default: m.Products })));
const Portfolio   = lazy(() => import('./sections/Portfolio').then(m => ({ default: m.Portfolio })));
const History     = lazy(() => import('./sections/History').then(m => ({ default: m.History })));
const Contact     = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer      = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));

/* Nothing-style loading indicator */
function SectionLoader() {
  return (
    <div className="py-16 flex justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-nd-text-disabled">
        [LOADING...]
      </span>
    </div>
  );
}

function App() {
  const [preselectedProjectType, setPreselectedProjectType] = useState<string>('');
  const [activePage, setActivePage] = useState<PageId>(() => (
    typeof window === 'undefined' ? 'home' : toPageId(window.location.hash)
  ));

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onHashChange = () => setActivePage(toPageId(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((page: PageId, projectType?: string) => {
    if (projectType) {
      setPreselectedProjectType(projectType);
    }
    setActivePage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'history':
        return <History />;
      case 'services':
        return <Services onRequestNE4Briefing={() => navigateTo('contact', 'ne4')} />;
      case 'portfolio':
        return <Portfolio />;
      case 'products':
        return <Products onRequestDemo={() => navigateTo('contact', 'saas')} />;
      case 'contact':
        return <Contact preselectedType={preselectedProjectType} />;
      case 'home':
      default:
        return (
          <>
            <Hero
              onScrollToServices={() => navigateTo('services')}
              onScrollToProducts={() => navigateTo('products')}
            />
            <TrustBanner />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-nd-black text-nd-text-primary font-sans overflow-x-hidden relative">
      {/* Global LiveGrid — dots breathe and code flashes across entire page */}
      <div className="fixed inset-0 z-0 opacity-25">
        <LiveGrid />
      </div>

      {/* Scroll Progress Bar — Nothing: thin, Nexus blue accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-50 bg-nexus-blue origin-left"
        style={{ scaleX }}
      />

      {/* Navbar — always eager */}
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {/* Main Content — above LiveGrid */}
      <main id="main-content" className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
