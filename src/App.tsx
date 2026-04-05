import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { TrustBanner } from './components/TrustBanner';
import { LiveGrid } from './components/LiveGrid';
import './i18n';

// Lazy-load below-the-fold sections for faster initial paint
const Services    = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Products    = lazy(() => import('./sections/Products').then(m => ({ default: m.Products })));
const DualMap     = lazy(() => import('./components/DualMap').then(m => ({ default: m.DualMap })));
const TeamSection = lazy(() => import('./components/TeamSection').then(m => ({ default: m.TeamSection })));
const Portfolio   = lazy(() => import('./sections/Portfolio').then(m => ({ default: m.Portfolio })));
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
  const contactRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollToContact = useCallback((projectType?: string) => {
    if (projectType) {
      setPreselectedProjectType(projectType);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-nd-black text-nd-text-primary font-sans overflow-x-hidden relative">
      {/* Global LiveGrid — dots breathe and code flashes across entire page */}
      <div className="fixed inset-0 z-0">
        <LiveGrid />
      </div>

      {/* Scroll Progress Bar — Nothing: thin, Nexus blue accent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-50 bg-nexus-blue origin-left"
        style={{ scaleX }}
      />

      {/* Navbar — always eager */}
      <Navbar onScrollToContact={() => scrollToContact()} />

      {/* Main Content — above LiveGrid */}
      <main id="main-content" className="relative z-10">
        {/* Hero — eager (above the fold) */}
        <Hero
          onScrollToServices={scrollToServices}
          onScrollToProducts={scrollToProducts}
        />
        <TrustBanner />

        {/* Below-the-fold — lazy loaded with generous spacing */}
        <Suspense fallback={<SectionLoader />}>
          <Services />
          <div className="section-divider" />
          <Products onRequestDemo={() => scrollToContact('saas')} />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <div className="section-divider" />
          <Portfolio />
          <div className="section-divider" />
          <DualMap />
          <TeamSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <div className="section-divider" />
          <div ref={contactRef}>
            <Contact preselectedType={preselectedProjectType} />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
