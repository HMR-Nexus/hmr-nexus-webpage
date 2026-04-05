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

const heroProduct: Product = {
  key: 'workmanager', icon: Hammer, status: 'live', link: 'https://jarl9801.github.io/work-manager/',
};

const otherProducts: Product[] = [
  { key: 'fincontrol', icon: BarChart3, status: 'live' },
  { key: 'bot', icon: Bot, status: 'beta' },
  { key: 'aianalytics', icon: Database, status: 'roadmap' },
];

export function Products({ onRequestDemo }: ProductsProps) {
  const { t } = useTranslation();

  const renderStatusChip = (statusKey: string) => {
    const status = STATUS_CONFIG[statusKey];
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-0.5 border border-nd-border-visible rounded-sm ${status.label_color}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
        {t(`products.status.${statusKey}`)}
      </span>
    );
  };

  return (
    <section id="products" className="py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <MotionSection className="mb-20 md:mb-28">
          <span className="nothing-label block mb-4">{t('products.label')}</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-nd-text-display leading-[1.05]">
            {t('products.title')}{' '}
            <span className="text-nd-text-secondary">{t('products.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary text-base md:text-lg max-w-2xl mt-4">
            {t('products.subtitle')}
          </p>
        </MotionSection>

        {/* Hero Product — Full width featured */}
        <MotionSection className="mb-8">
          <div className="border border-nd-border rounded-lg p-8 md:p-12 hover:border-nd-border-visible transition-colors duration-200">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <heroProduct.icon className="w-6 h-6 text-nd-text-disabled" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium text-nd-text-display">
                      {t(`products.${heroProduct.key}.title`)}
                    </h3>
                    <p className="nothing-label mt-0.5">{t(`products.${heroProduct.key}.type`)}</p>
                  </div>
                  <div className="ml-auto">{renderStatusChip(heroProduct.status)}</div>
                </div>

                <p className="text-nd-text-secondary text-base leading-relaxed mb-8 max-w-2xl">
                  {t(`products.${heroProduct.key}.description`)}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-nd-text-secondary">
                      <Check className="w-3.5 h-3.5 mt-0.5 text-nd-text-disabled" strokeWidth={1.5} />
                      {t(`products.${heroProduct.key}.features.${i}`)}
                    </li>
                  ))}
                </ul>

                {heroProduct.link && (
                  <a
                    href={heroProduct.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${t(`products.${heroProduct.key}.title`)} — external link`}
                    className="inline-flex items-center gap-2 bg-nd-text-display text-nd-black px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] hover:bg-nd-text-primary transition-colors duration-200"
                  >
                    {t(`products.${heroProduct.key}.cta`)}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Big metrics — right side */}
              <div className="flex lg:flex-col gap-8 lg:gap-6 lg:pl-8 lg:border-l border-nd-border">
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <div className="nothing-data text-3xl md:text-4xl tabular-nums">
                      {t(`products.${heroProduct.key}.metrics.${i}.value`)}
                    </div>
                    <div className="nothing-label mt-1">
                      {t(`products.${heroProduct.key}.metrics.${i}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Other Products — compact grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-4"
        >
          {otherProducts.map((p) => {
            const Icon = p.icon;
            const featureCount = p.status === 'roadmap' ? 2 : 3;

            return (
              <motion.div
                key={p.key}
                variants={cardEntrance}
                className="border border-nd-border rounded-lg p-6 hover:border-nd-border-visible transition-colors duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
                    <h3 className="text-base font-medium text-nd-text-display">
                      {t(`products.${p.key}.title`)}
                    </h3>
                  </div>
                  {renderStatusChip(p.status)}
                </div>

                <p className="nothing-label mb-3">{t(`products.${p.key}.type`)}</p>

                <p className="text-nd-text-secondary text-sm leading-relaxed mb-4">
                  {t(`products.${p.key}.description`)}
                </p>

                {/* Metrics */}
                <div className="flex gap-4 mb-4 py-3 border-y border-nd-border">
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
                <ul className="space-y-1.5 mb-4">
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
      </div>
    </section>
  );
}
