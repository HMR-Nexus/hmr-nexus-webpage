import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface ProductsProps {
  onRequestDemo: () => void;
}

// NEXUS status taxonomy — monochrome + accent dot for live, functional signals elsewhere.
const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  live:    { color: '#FF4D2E', label: 'text-[color:var(--accent)]' },
  beta:    { color: '#FFB800', label: 'text-[#FFB800]' },
  dev:     { color: '#FFB800', label: 'text-[#FFB800]' },
  roadmap: { color: '#6B6B66', label: 'text-paper/40' },
};

interface Product {
  key: string;
  status: 'live' | 'beta' | 'dev' | 'roadmap';
  link?: string;
}

const heroProduct: Product = {
  key: 'workmanager', status: 'live', link: 'https://jarl9801.github.io/work-manager/',
};

const otherProducts: Product[] = [
  { key: 'fincontrol',  status: 'live' },
  { key: 'bot',         status: 'beta' },
  { key: 'aianalytics', status: 'roadmap' },
];

/**
 * NEXUS Products — 02 · Software stack.
 * Editorial cards, mono-label metadata, laser accent only for live status.
 */
export function Products({ onRequestDemo }: ProductsProps) {
  const { t } = useTranslation();

  const renderStatus = (statusKey: string) => {
    const s = STATUS_CONFIG[statusKey];
    return (
      <span className={`inline-flex items-center gap-1.5 mono-tag ${s.label}`}>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: s.color }}
        />
        {t(`products.status.${statusKey}`)}
      </span>
    );
  };

  return (
    <section id="products" className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">02 · {t('products.label')}</div>
            </div>
            <div>
              <h2>
                {t('products.title')}<br/>
                <span className="text-paper/50">{t('products.titleHighlight')}</span>
              </h2>
              <p style={{ marginTop: 24 }}>{t('products.subtitle')}</p>
            </div>
          </div>
        </MotionSection>

        {/* Hero Product — featured row */}
        <MotionSection className="mb-0">
          <div
            className="p-8 md:p-12 hover:bg-paper/[0.02] transition-colors duration-200"
            style={{ border: '1px solid var(--rule)' }}
          >
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
              <div>
                <div className="mono-tag text-paper/50 mb-4">02.1 · FEATURED · {t(`products.${heroProduct.key}.type`)}</div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3
                    className="font-display text-paper"
                    style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 400, margin: 0 }}
                  >
                    {t(`products.${heroProduct.key}.title`)}
                  </h3>
                  {renderStatus(heroProduct.status)}
                </div>

                <p className="text-paper/70 text-[16px] leading-[1.55] mb-8 max-w-[58ch]">
                  {t(`products.${heroProduct.key}.description`)}
                </p>

                <ul className="space-y-2.5 mb-8 divide-y divide-[color:var(--rule)]">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex items-baseline gap-3 pt-2.5 first:pt-0 text-[15px] text-paper/85">
                      <span className="mono-tag text-paper/35 w-6 flex-shrink-0">{`0${i + 1}`}</span>
                      <span>{t(`products.${heroProduct.key}.features.${i}`)}</span>
                    </li>
                  ))}
                </ul>

                {heroProduct.link && (
                  <a
                    href={heroProduct.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-3 mono-tag bg-laser text-ink hover:opacity-90 transition-opacity"
                  >
                    <span className="dot-accent" style={{ background: 'var(--ink)' }} />
                    {t(`products.${heroProduct.key}.cta`)}  ↗
                  </a>
                )}
              </div>

              {/* Right: metrics stack */}
              <div
                className="grid grid-cols-3 lg:grid-cols-1 lg:divide-y divide-[color:var(--rule)] lg:border-l lg:border-[color:var(--rule)] lg:pl-10"
              >
                {[0, 1, 2].map((i) => (
                  <div key={i} className="py-4 first:pt-0 lg:first:pt-0 px-3 lg:px-0">
                    <div
                      className="font-display text-paper tabular-nums"
                      style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 400 }}
                    >
                      {t(`products.${heroProduct.key}.metrics.${i}.value`)}
                    </div>
                    <div className="mono-tag text-paper/50 mt-2">
                      {t(`products.${heroProduct.key}.metrics.${i}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Secondary products grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 mt-[-1px]"
          style={{ border: '1px solid var(--rule)' }}
        >
          {otherProducts.map((p, idx) => {
            const featureCount = p.status === 'roadmap' ? 2 : 3;
            return (
              <motion.div
                key={p.key}
                variants={cardEntrance}
                className="p-8 hover:bg-paper/[0.02] transition-colors duration-200"
                style={{ borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="mono-tag text-paper/45 mb-1.5">
                      02.{idx + 2} · {t(`products.${p.key}.type`)}
                    </div>
                    <h3
                      className="font-display text-paper"
                      style={{ fontSize: 26, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500, margin: 0 }}
                    >
                      {t(`products.${p.key}.title`)}
                    </h3>
                  </div>
                  {renderStatus(p.status)}
                </div>

                <p className="text-paper/70 text-[14px] leading-[1.55] mb-5">
                  {t(`products.${p.key}.description`)}
                </p>

                <div className="grid grid-cols-3 gap-3 py-4 rule-top rule-bottom mb-5">
                  {[0, 1, 2].map((i) => (
                    <div key={i}>
                      <div
                        className="font-display text-paper tabular-nums"
                        style={{ fontSize: 18, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500 }}
                      >
                        {t(`products.${p.key}.metrics.${i}.value`)}
                      </div>
                      <div className="mono-tag text-paper/45 mt-1" style={{ fontSize: 9 }}>
                        {t(`products.${p.key}.metrics.${i}.label`)}
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-1.5 mb-6">
                  {Array.from({ length: featureCount }).map((_, i) => (
                    <li key={i} className="flex items-baseline gap-2 text-[13px] text-paper/75">
                      <span className="mono-tag text-paper/30">0{i + 1}</span>
                      <span>{t(`products.${p.key}.features.${i}`)}</span>
                    </li>
                  ))}
                </ul>

                {p.status === 'roadmap' ? (
                  <span className="mono-tag text-paper/40">
                    {t(`products.${p.key}.cta`)}
                  </span>
                ) : (
                  <button
                    onClick={onRequestDemo}
                    className="mono-tag text-[color:var(--accent)] hover:opacity-80 transition-opacity"
                  >
                    {t(`products.${p.key}.cta`)}  →
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
