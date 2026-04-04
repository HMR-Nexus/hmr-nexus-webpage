import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Bot, BarChart3, Hammer, Database, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface ProductsProps {
  onRequestDemo: () => void;
}

/* Nothing status: monochrome labels with color only on the value dot */
const STATUS_CONFIG: Record<string, { color: string; label_color: string }> = {
  live:    { color: '#4A9E5C', label_color: 'text-nd-success' },
  beta:    { color: '#5B9BF6', label_color: 'text-nd-interactive' },
  dev:     { color: '#D4A843', label_color: 'text-nd-warning' },
  roadmap: { color: '#666666', label_color: 'text-nd-text-disabled' },
};

interface Product {
  key: string;
  icon: React.ElementType;
  status: 'live' | 'beta' | 'dev' | 'roadmap';
  link?: string;
}

const products: Product[] = [
  { key: 'workmanager', icon: Hammer, status: 'live', link: 'https://jarl9801.github.io/work-manager/' },
  { key: 'fincontrol', icon: BarChart3, status: 'live' },
  { key: 'bot', icon: Bot, status: 'beta' },
  { key: 'aianalytics', icon: Database, status: 'roadmap' },
];

export function Products({ onRequestDemo }: ProductsProps) {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="mb-14">
          <span className="nothing-label block mb-3">{t('products.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('products.title')}{' '}
            <span className="text-nd-text-secondary">{t('products.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl">
            {t('products.subtitle')}
          </p>
        </MotionSection>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-4 mb-10"
        >
          {products.map((p) => {
            const Icon = p.icon;
            const status = STATUS_CONFIG[p.status];
            const statusLabel = t(`products.status.${p.status}`);
            const featureCount = p.status === 'roadmap' ? 2 : 3;

            return (
              <motion.div
                key={p.key}
                variants={cardEntrance}
                className="bg-nd-surface border border-nd-border rounded-lg p-6 hover:border-nd-border-visible transition-colors duration-200"
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-base font-medium text-nd-text-display">
                        {t(`products.${p.key}.title`)}
                      </h3>
                      <p className="nothing-label mt-0.5">
                        {t(`products.${p.key}.type`)}
                      </p>
                    </div>
                  </div>
                  {/* Status chip — Nothing style */}
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border border-nd-border-visible rounded-sm ${status.label_color}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
                    {statusLabel}
                  </span>
                </div>

                {/* Description */}
                <p className="text-nd-text-secondary text-sm leading-relaxed mb-5">
                  {t(`products.${p.key}.description`)}
                </p>

                {/* Metrics — Nothing data row */}
                <div className="flex gap-4 mb-5 py-3 border-y border-nd-border">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1">
                      <div className="nothing-data text-sm tabular-nums">
                        {t(`products.${p.key}.metrics.${i}.value`)}
                      </div>
                      <div className="nothing-label mt-0.5">
                        {t(`products.${p.key}.metrics.${i}.label`)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                  {Array.from({ length: featureCount }).map((_, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-nd-text-secondary">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-nd-text-disabled" strokeWidth={1.5} />
                      {t(`products.${p.key}.features.${i}`)}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {p.status === 'roadmap' ? (
                  <span className="nothing-label text-nd-text-disabled">
                    {t(`products.${p.key}.cta`)}
                  </span>
                ) : p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${t(`products.${p.key}.title`)} — external link`}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-nd-interactive hover:text-nd-text-display transition-colors duration-200"
                  >
                    {t(`products.${p.key}.cta`)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={onRequestDemo}
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-nd-interactive hover:text-nd-text-display transition-colors duration-200"
                  >
                    {t(`products.${p.key}.cta`)}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <MotionSection delay={0.2}>
          <div className="border border-nd-border-visible rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6">
            <div>
              <h3 className="text-base font-medium text-nd-text-display mb-1">{t('products.cta.title')}</h3>
              <p className="text-nd-text-secondary text-sm">{t('products.cta.subtitle')}</p>
            </div>
            <button
              onClick={onRequestDemo}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-nd-text-display text-nd-black px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] hover:bg-nd-text-primary transition-colors duration-200"
            >
              {t('products.cta.btn')}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
