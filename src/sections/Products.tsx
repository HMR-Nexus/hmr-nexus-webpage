import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Bot, Sparkles, BarChart3, Hammer, BrainCircuit, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { MouseGlow } from '@/components/MouseGlow';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface ProductsProps {
  onRequestDemo: () => void;
}

const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  live:     { color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  beta:     { color: '#3d8bff', bg: 'rgba(61,139,255,0.15)' },
  dev:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  roadmap:  { color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
};

interface Product {
  key: string;
  icon: React.ElementType;
  accent: string;
  borderHover: string;
  status: 'live' | 'beta' | 'dev' | 'roadmap';
  link?: string;
}

const products: Product[] = [
  {
    key: 'workmanager',
    icon: Hammer,
    accent: '#00d4ff',
    borderHover: 'hover:border-[#00d4ff]/40',
    status: 'live',
    link: 'https://jarl9801.github.io/work-manager/',
  },
  {
    key: 'fincontrol',
    icon: BarChart3,
    accent: '#10b981',
    borderHover: 'hover:border-[#10b981]/40',
    status: 'live',
  },
  {
    key: 'bot',
    icon: Bot,
    accent: '#c084fc',
    borderHover: 'hover:border-[#c084fc]/40',
    status: 'beta',
  },
  {
    key: 'aianalytics',
    icon: BrainCircuit,
    accent: '#f59e0b',
    borderHover: 'hover:border-[#f59e0b]/40',
    status: 'roadmap',
  },
];

export function Products({ onRequestDemo }: ProductsProps) {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <MotionSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4" />
            {t('products.label')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('products.title')}{' '}
            <span className="text-[#a855f7]">{t('products.titleHighlight')}</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </MotionSection>

        {/* Products Grid 2×2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-5 mb-10"
        >
          {products.map((p) => {
            const Icon = p.icon;
            const status = STATUS_STYLES[p.status];
            const statusLabel = t(`products.status.${p.status}`);
            const featureCount = p.status === 'roadmap' ? 2 : 3;

            return (
              <motion.div
                key={p.key}
                variants={cardEntrance}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 ${p.borderHover}`}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
                />

                <MouseGlow color={`${p.accent}0D`} className="p-6 h-full flex flex-col">

                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}30` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: p.accent }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight">
                          {t(`products.${p.key}.title`)}
                        </h3>
                        <p className="text-[#64748b] text-xs mt-0.5">
                          {t(`products.${p.key}.type`)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                      style={{ color: status.color, background: status.bg }}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
                    {t(`products.${p.key}.description`)}
                  </p>

                  {/* Mini dashboard mockup */}
                  <div className="mb-5 rounded-xl bg-[#060d18] border border-white/[0.06] p-3.5 flex gap-2.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex-1 bg-white/[0.04] rounded-lg p-2.5 text-center">
                        <div
                          className="text-base font-bold leading-tight"
                          style={{ color: p.accent }}
                        >
                          {t(`products.${p.key}.metrics.${i}.value`)}
                        </div>
                        <div className="text-[9px] text-[#475569] mt-0.5 leading-tight">
                          {t(`products.${p.key}.metrics.${i}.label`)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-5 flex-1">
                    {Array.from({ length: featureCount }).map((_, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                        <Check
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: p.accent }}
                        />
                        {t(`products.${p.key}.features.${i}`)}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {p.status === 'roadmap' ? (
                    <div
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border"
                      style={{ color: p.accent, borderColor: `${p.accent}40` }}
                    >
                      <Sparkles className="w-4 h-4" />
                      {t(`products.${p.key}.cta`)}
                    </div>
                  ) : p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      style={{ background: `${p.accent}18`, color: p.accent }}
                    >
                      {t(`products.${p.key}.cta`)}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onRequestDemo}
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      style={{ background: `${p.accent}18`, color: p.accent }}
                    >
                      {t(`products.${p.key}.cta`)}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                </MouseGlow>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA strip */}
        <MotionSection delay={0.2}>
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/10 via-[#a855f7]/8 to-[#10b981]/10" />
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6">
              <div>
                <h3 className="text-lg font-bold mb-1">{t('products.cta.title')}</h3>
                <p className="text-[#94a3b8] text-sm">{t('products.cta.subtitle')}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onRequestDemo}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0066ff] text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-[#0052cc] transition-colors"
              >
                {t('products.cta.btn')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </MotionSection>

      </div>
    </section>
  );
}
