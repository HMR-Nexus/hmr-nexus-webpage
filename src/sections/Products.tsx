import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface ProductsProps {
  onRequestDemo: () => void;
}

// NEXUS status taxonomy — factual states only. No fake public links, no vanity KPIs.
const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  live: { color: '#FF4D2E', label: 'text-[color:var(--accent)]' },
  beta: { color: '#FFB800', label: 'text-[#FFB800]' },
  dev: { color: '#FFB800', label: 'text-[#FFB800]' },
  roadmap: { color: '#6B6B66', label: 'text-paper/40' },
};

interface Product {
  key: 'lumen' | 'workmanager' | 'fincontrol' | 'kundenbot';
  status: 'live' | 'beta' | 'dev' | 'roadmap';
  image: string;
}

const heroProduct: Product = {
  key: 'lumen',
  status: 'dev',
  image: '/assets/software/lumen-ops.webp',
};

const otherProducts: Product[] = [
  { key: 'workmanager', status: 'live', image: '/assets/software/work-manager.webp' },
  { key: 'fincontrol', status: 'live', image: '/assets/software/fincontrol.webp' },
  { key: 'kundenbot', status: 'beta', image: '/assets/software/kundenbot.webp' },
];

const FEATURE_INDEXES = [0, 1, 2];
const METRIC_INDEXES = [0, 1, 2];

/**
 * NEXUS Products — 02 · Software stack.
 * Real products only: Lumen, Work Manager, FinControl, Kundenbot.
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

  const renderMetrics = (productKey: Product['key'], compact = false) => (
    <div className={compact ? 'grid grid-cols-3 gap-3 py-4 rule-top rule-bottom mb-5' : 'grid grid-cols-3 lg:grid-cols-1 lg:divide-y divide-[color:var(--rule)] lg:border-l lg:border-[color:var(--rule)] lg:pl-10'}>
      {METRIC_INDEXES.map((i) => (
        <div key={i} className={compact ? '' : 'py-4 first:pt-0 lg:first:pt-0 px-3 lg:px-0'}>
          <div
            className="font-display text-paper tabular-nums"
            style={{
              fontSize: compact ? 18 : 'clamp(28px, 3.5vw, 48px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontWeight: compact ? 500 : 400,
            }}
          >
            {t(`products.${productKey}.metrics.${i}.value`)}
          </div>
          <div className="mono-tag text-paper/50 mt-2" style={compact ? { fontSize: 9 } : undefined}>
            {t(`products.${productKey}.metrics.${i}.label`)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderFeatures = (productKey: Product['key'], compact = false) => (
    <ul className={compact ? 'space-y-1.5 mb-6' : 'space-y-2.5 mb-8 divide-y divide-[color:var(--rule)]'}>
      {FEATURE_INDEXES.map((i) => (
        <li
          key={i}
          className={compact
            ? 'flex items-baseline gap-2 text-[13px] text-paper/75'
            : 'flex items-baseline gap-3 pt-2.5 first:pt-0 text-[15px] text-paper/85'}
        >
          <span className={compact ? 'mono-tag text-paper/30' : 'mono-tag text-paper/35 w-6 flex-shrink-0'}>
            0{i + 1}
          </span>
          <span>{t(`products.${productKey}.features.${i}`)}</span>
        </li>
      ))}
    </ul>
  );

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

        {/* Featured product */}
        <MotionSection className="mb-0">
          <div
            className="p-6 md:p-10 hover:bg-paper/[0.02] transition-colors duration-200"
            style={{ border: '1px solid var(--rule)' }}
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-stretch">
              <div className="flex flex-col">
                <div className="mono-tag text-paper/50 mb-4">02.1 · FEATURED · {t(`products.${heroProduct.key}.type`)}</div>
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3
                    className="font-display text-paper"
                    style={{ fontSize: 'clamp(34px, 5vw, 72px)', lineHeight: 0.9, letterSpacing: '-0.04em', fontWeight: 400, margin: 0 }}
                  >
                    {t(`products.${heroProduct.key}.title`)}
                  </h3>
                  {renderStatus(heroProduct.status)}
                </div>

                <p className="text-paper/70 text-[16px] leading-[1.55] mb-8 max-w-[62ch]">
                  {t(`products.${heroProduct.key}.description`)}
                </p>

                {renderFeatures(heroProduct.key)}

                <button
                  onClick={onRequestDemo}
                  className="inline-flex items-center gap-3 px-5 py-3 mono-tag bg-laser text-ink hover:opacity-90 transition-opacity w-fit mt-auto"
                >
                  <span className="dot-accent" style={{ background: 'var(--ink)' }} />
                  {t(`products.${heroProduct.key}.cta`)} →
                </button>
              </div>

              <div className="grid md:grid-cols-[1fr_170px] lg:grid-cols-[1fr_190px] gap-5 min-h-[360px]">
                <div
                  className="relative overflow-hidden bg-paper/[0.025]"
                  style={{ border: '1px solid var(--rule)' }}
                >
                  <img
                    src={heroProduct.image}
                    alt={t(`products.${heroProduct.key}.imageAlt`)}
                    className="absolute inset-0 h-full w-full object-cover opacity-100 saturate-[1.05] brightness-[1.18]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                  <div className="absolute left-4 bottom-4 mono-tag text-paper/60">
                    REAL PRODUCT MAP · NO STOCK CLAIMS
                  </div>
                </div>
                {renderMetrics(heroProduct.key)}
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
          {otherProducts.map((p, idx) => (
            <motion.div
              key={p.key}
              variants={cardEntrance}
              className="p-6 md:p-7 hover:bg-paper/[0.02] transition-colors duration-200 flex flex-col"
              style={{ borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)' }}
            >
              <div
                className="relative overflow-hidden h-44 mb-6 bg-paper/[0.025]"
                style={{ border: '1px solid var(--rule)' }}
              >
                <img
                  src={p.image}
                  alt={t(`products.${p.key}.imageAlt`)}
                  className="absolute inset-0 h-full w-full object-cover opacity-100 saturate-[1.05] brightness-[1.15]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              </div>

              <div className="flex items-start justify-between mb-5 gap-4">
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

              {renderMetrics(p.key, true)}
              {renderFeatures(p.key, true)}

              <button
                onClick={onRequestDemo}
                className="mono-tag text-[color:var(--accent)] hover:opacity-80 transition-opacity mt-auto text-left"
              >
                {t(`products.${p.key}.cta`)} →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
