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

  return (
    <>
      <footer className="py-12 border-t border-nd-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="mb-3">
                  <span className="font-display text-2xl font-bold text-nd-text-display tracking-tight">NEXUS</span>
                </div>
                <p className="text-nd-text-disabled text-sm mb-2">{t('footer.description')}</p>
                <p className="text-nd-text-secondary text-sm">{t('footer.tagline')}</p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="nothing-label block mb-3">{t('footer.navigation')}</h4>
                <ul className="space-y-2">
                  {['home', 'services', 'products', 'portfolio', 'contact'].map((id) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200"
                      >
                        {t(`nav.${id}`)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="nothing-label block mb-3">{t('footer.services')}</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('services.fiber.items.ne3_label')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('services.fiber.items.ne4_label')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('services.software.title')}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="nothing-label block mb-3">{t('footer.legal')}</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setLegalPage('imprint')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('footer.legalLinks.imprint')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLegalPage('privacy')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('footer.legalLinks.privacy')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLegalPage('terms')} className="text-nd-text-disabled text-sm hover:text-nd-text-display transition-colors duration-200">
                      {t('footer.legalLinks.terms')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </MotionSection>

          {/* Bottom */}
          <MotionSection delay={0.2}>
            <div className="pt-6 border-t border-nd-border flex flex-col sm:flex-row justify-between items-center gap-2">
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
