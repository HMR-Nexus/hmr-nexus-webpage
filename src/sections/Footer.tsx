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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="py-12 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="mb-2">
                  <img src="/logo-full.png" alt="HMR Nexus Engineering" width={200} height={64} loading="lazy" className="h-16 w-auto" />
                </div>
                <p className="text-[#64748b] text-sm mb-2">{t('footer.description')}</p>
                <p className="text-sm text-[#94a3b8]">{t('footer.tagline')}</p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">{t('footer.navigation')}</h4>
                <ul className="space-y-2">
                  {['home', 'services', 'products', 'portfolio', 'contact'].map((id) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors"
                      >
                        {t(`nav.${id}`)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">{t('footer.services')}</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('services.fiber.items.ne3_label')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('services.fiber.items.ne4_label')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('services')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('services.software.title')}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">{t('footer.legal')}</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => setLegalPage('imprint')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('footer.legalLinks.imprint')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLegalPage('privacy')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('footer.legalLinks.privacy')}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setLegalPage('terms')} className="text-[#64748b] text-sm hover:text-[#00d4ff] transition-colors">
                      {t('footer.legalLinks.terms')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </MotionSection>

          {/* Bottom */}
          <MotionSection delay={0.2}>
            <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#64748b]">
              <p>{t('footer.copyright')}</p>
              <p>{t('footer.madeIn')}</p>
            </div>
          </MotionSection>
        </div>
      </footer>

      <LegalOverlay page={legalPage} onClose={() => setLegalPage(null)} />
    </>
  );
}
