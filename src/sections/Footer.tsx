import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LegalOverlay } from '@/components/LegalOverlay';
import type { LegalPage } from '@/components/LegalOverlay';
import { NexusLockup } from '@/components/NexusLockup';

/**
 * NEXUS Footer — editorial, mono-labels, system-metadata.
 * Voice: Direct. Technical. Calm.
 */
export function Footer() {
  const { t } = useTranslation();
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const navLinks = ['services', 'products', 'portfolio', 'contact'];
  const legalLinks: { key: string; page: LegalPage }[] = [
    { key: 'imprint', page: 'imprint' },
    { key: 'privacy', page: 'privacy' },
    { key: 'terms', page: 'terms' },
  ];

  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-ink text-paper rule-top">
        <div className="max-w-[1440px] mx-auto px-6 md:px-7 py-16 md:py-20">
          {/* Big wordmark + lockup */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-7">
              <NexusLockup variant="vertical" size={120} color="var(--paper)" showSuper={true} className="scale-[0.65] md:scale-100 origin-top-left" />
            </div>

            <div className="md:col-span-5 md:pl-8 md:border-l md:border-[color:var(--rule)] mono-tag text-paper/55 space-y-2">
              <div className="rule-bottom pb-3 mb-3 text-paper/85">CONTACT</div>
              <div>HMR Nexus Engineering GmbH</div>
              <div>Am Riethkamp 1E</div>
              <div>29229 Celle · Deutschland</div>
              <div className="pt-3">
                <a href="mailto:info@hmr-nexus.com" className="text-paper hover:text-[color:var(--accent)] transition-colors">
                  info@hmr-nexus.com
                </a>
              </div>
            </div>
          </div>

          {/* Mid: nav + legal in columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 rule-top pt-10">
            <div>
              <div className="mono-tag text-paper/50 mb-4">SECTIONS</div>
              <ul className="space-y-2.5">
                {navLinks.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(id);
                      }}
                      className="text-paper/80 hover:text-paper text-[15px] transition-colors"
                    >
                      {t(`nav.${id}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono-tag text-paper/50 mb-4">LEGAL</div>
              <ul className="space-y-2.5">
                {legalLinks.map(({ key, page }) => (
                  <li key={key}>
                    <button
                      onClick={() => setLegalPage(page)}
                      className="text-paper/80 hover:text-paper text-[15px] transition-colors"
                    >
                      {t(`footer.legalLinks.${key}`)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono-tag text-paper/50 mb-4">SPECIALTY</div>
              <ul className="space-y-2.5 text-paper/80 text-[15px]">
                <li>NE3 / NE4 Fibre</li>
                <li>Blown · Splice · QA</li>
                <li>Operations software</li>
                <li>Field analytics</li>
              </ul>
            </div>

            <div>
              <div className="mono-tag text-paper/50 mb-4">STATUS</div>
              <ul className="space-y-2.5 text-paper/80 text-[15px]">
                <li className="flex items-center gap-2">
                  <span className="dot-accent animate-pulse-laser" />
                  <span>Operational</span>
                </li>
                <li className="mono-tag text-paper/50 pt-2">LAST SYNC · {new Date().toISOString().slice(0, 10)}</li>
              </ul>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="rule-top pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mono-tag text-paper/55">
            <div>© {year} HMR NEXUS ENGINEERING GMBH</div>
            <div>CELLE · DE · {year}</div>
            <div>Brand System · v1 · 2026</div>
          </div>
        </div>
      </footer>

      <LegalOverlay page={legalPage} onClose={() => setLegalPage(null)} />
    </>
  );
}
