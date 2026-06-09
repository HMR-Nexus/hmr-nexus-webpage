import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toPageId, type PageId } from "./lib/navigation";
import { NexusNav, NexusSubNav } from "./sections/NexusNav";
import { NexusHome } from "./sections/NexusHome";
import { FibraPage } from "./sections/FibraPage";
import { SoftwarePage } from "./sections/SoftwarePage";
import { LegalOverlay, type LegalPage } from "./components/LegalOverlay";
import { ChatWidget } from "./components/ChatWidget";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { useScrollProgress } from "./hooks/useScrollProgress";
import "./i18n";
import "./nexus-site.css";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageVariants = {
  initial: { opacity: 0, y: prefersReduced() ? 0 : 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, y: prefersReduced() ? 0 : -6, transition: { duration: 0.2 } },
};

function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    typeof window === "undefined" ? "home" : toPageId(window.location.hash)
  );
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(toPageId(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigateTo = useCallback((page: PageId) => {
    setActivePage(page);
    if (typeof window !== "undefined") {
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const isSubPage = activePage === "fibra" || activePage === "software";

  const renderPage = () => {
    switch (activePage) {
      case "fibra":
        return <FibraPage onNavigate={(page) => navigateTo(page)} />;
      case "software":
        return <SoftwarePage onNavigate={(page) => navigateTo(page)} />;
      case "home":
      default:
        return (
          <NexusHome
            onNavigate={navigateTo}
            onLegal={(page) => setLegalPage(page)}
          />
        );
    }
  };

  return (
    <div
      className="ns-root"
      style={{
        background: "#0A0B0D",
        minHeight: "100vh",
        color: "#F5F3EE",
        overflowX: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div className="ns-grain" aria-hidden="true" />

      {/* Scroll progress bar */}
      <div
        className="ns-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Navigation */}
      {isSubPage ? (
        <NexusSubNav onBack={() => navigateTo("home")} />
      ) : (
        <NexusNav activePage={activePage} onNavigate={navigateTo} />
      )}

      {/* Main content with page transitions */}
      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Legal overlay */}
      <LegalOverlay page={legalPage} onClose={() => setLegalPage(null)} />

      {/* Floating widgets */}
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
}

export default App;
