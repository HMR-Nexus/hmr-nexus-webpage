import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { TrustBanner } from './components/TrustBanner';
import './i18n';

// Lazy-load below-the-fold sections for faster initial paint
const Values      = lazy(() => import('./sections/Values').then(m => ({ default: m.Values })));
const Services    = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Products    = lazy(() => import('./sections/Products').then(m => ({ default: m.Products })));
const Stats       = lazy(() => import('./sections/Stats').then(m => ({ default: m.Stats })));
const DualMap     = lazy(() => import('./components/DualMap').then(m => ({ default: m.DualMap })));
const TeamSection = lazy(() => import('./components/TeamSection').then(m => ({ default: m.TeamSection })));
const Portfolio   = lazy(() => import('./sections/Portfolio').then(m => ({ default: m.Portfolio })));
const Contact     = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));
const Footer      = lazy(() => import('./sections/Footer').then(m => ({ default: m.Footer })));
const ChatWidget  = lazy(() => import('./components/ChatWidget').then(m => ({ default: m.ChatWidget })));

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
    <div className="min-h-screen bg-[#050a14] text-white font-sans overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-gradient-to-r from-[#0066ff] to-[#a855f7] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar — always eager */}
      <Navbar onScrollToContact={() => scrollToContact()} />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero — eager (above the fold) */}
        <Hero
          onScrollToServices={scrollToServices}
          onScrollToProducts={scrollToProducts}
        />
        <TrustBanner />

        {/* Below-the-fold — lazy loaded with split boundaries to avoid waterfalls */}
        <Suspense fallback={null}>
          <Values />
          <Services />
          <Products onRequestDemo={() => scrollToContact('saas')} />
          <Stats />
        </Suspense>
        <Suspense fallback={null}>
          <DualMap />
          <TeamSection />
          <Portfolio />
        </Suspense>
        <Suspense fallback={null}>
          <div ref={contactRef}>
            <Contact preselectedType={preselectedProjectType} />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <ChatWidget />
      </Suspense>
    </div>
  );
}

export default App;
