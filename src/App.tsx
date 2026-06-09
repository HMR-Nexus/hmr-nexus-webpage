import { useState, useEffect, useCallback } from "react";
import { toPageId, type PageId } from "./lib/navigation";
import { NexusNav, NexusSubNav } from "./sections/NexusNav";
import { NexusHome } from "./sections/NexusHome";
import { FibraPage } from "./sections/FibraPage";
import { SoftwarePage } from "./sections/SoftwarePage";
import { useScrollProgress } from "./hooks/useScrollProgress";
import "./i18n";
import "./nexus-site.css";

function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    typeof window === "undefined" ? "home" : toPageId(window.location.hash)
  );

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
        return (
          <FibraPage
            onNavigate={(page) => navigateTo(page)}
          />
        );
      case "software":
        return (
          <SoftwarePage
            onNavigate={(page) => navigateTo(page)}
          />
        );
      case "home":
      default:
        return (
          <NexusHome onNavigate={navigateTo} />
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

      {/* Main content */}
      <main id="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
