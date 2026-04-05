import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MotionSection } from '@/components/MotionSection';
import { LegalOverlay } from '@/components/LegalOverlay';
import type { LegalPage } from '@/components/LegalOverlay';

export function Footer() {
  const { t } = useTranslation();
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['home', 'services', 'products', 'portfolio', 'contact'];
  const legalLinks: { key: string; page: LegalPage }[] = [
    { key: 'imprint', page: 'imprint' },
    { key: 'privacy', page: 'privacy' },
    { key: 'terms', page: 'terms' },
  ];

  return (
    <>
      <footer className="py-16 border-t border-nd-border">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <MotionSection>
            {/* Top row — brand + nav + legal in one line */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 mb-12">
              {/* Brand */}
              <span className="font-display text-2xl font-bold text-nd-text-display tracking-tight">
                NEXUS
              </span>

              {/* Navigation — pipe separated */}
              <nav className="flex flex-wrap items-center gap-0">
                {navLinks.map((id, i) => (
                  <span key={id} className="flex items-center">
                    {i > 0 && <span className="text-nd-border-visible mx-2 select-none">|</span>}
                    <button
                      onClick={() => scrollToSection(id)}
                      className="font-mono text-[11px] uppercase tracking-[0.08em] text-nd-text-disabled hover:text-nd-text-display transition-colors duration-200"
                    >
                      {t(`nav.${id}`)}
                    </button>
                  </span>
                ))}
              </nav>

              {/* Legal links */}
              <div className="flex items-center gap-4 lg:ml-auto">
                {legalLinks.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => setLegalPage(link.page)}
                    className="font-mono text-[10px] uppercase tracking-[0.08em] text-nd-text-disabled hover:text-nd-text-display transition-colors duration-200"
                  >
                    {t(`footer.legalLinks.${link.key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom — copyright */}
            <div className="pt-6 border-t border-nd-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="nothing-label">{t('footer.copyright')}</p>
              <p className="nothing-label">{t('footer.madeIn')}</p>
            </div>
          </MotionSection>
        </div>
      </footer>

      <LegalOverlay page={legalPage} onClose={() => setLegalPage(null)} />
    </>
  );
}
