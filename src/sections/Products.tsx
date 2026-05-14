import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface ProductsProps {
  onRequestDemo: () => void;
}

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

const products: Product[] = [
  { key: 'lumen', status: 'dev', image: '/assets/software/lumen-ops-render.jpg' },
  { key: 'workmanager', status: 'live', image: '/assets/software/work-manager-render.jpg' },
  { key: 'fincontrol', status: 'live', image: '/assets/software/fincontrol-render.jpg' },
  { key: 'kundenbot', status: 'beta', image: '/assets/software/kundenbot-render.jpg' },
];

const METRIC_INDEXES = [0, 1, 2];

export function Products({ onRequestDemo }: ProductsProps) {
  const { t } = useTranslation();

  const renderStatus = (statusKey: string) => {
    const s = STATUS_CONFIG[statusKey];
    return (
      <span className={`inline-flex items-center gap-1.5 mono-tag ${s.label}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
        {t(`products.status.${statusKey}`)}
      </span>
    );
  };

  const renderMetrics = (productKey: Product['key']) => (
    <div className="grid grid-cols-3 gap-3 py-4 rule-top rule-bottom mb-5">
      {METRIC_INDEXES.map((i) => (
        <div key={i}>
          <div className="font-display text-paper tabular-nums text-[18px] leading-none tracking-[-0.03em] font-medium">
            {t(`products.${productKey}.metrics.${i}.value`)}
          </div>
          <div className="mono-tag text-paper/50 mt-2 text-[9px]">
            {t(`products.${productKey}.metrics.${i}.label`)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="products" className="bg-ink text-paper py-16 md:py-20 pt-28 md:pt-32 min-h-[calc(100svh-80px)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">04 · {t('products.label')}</div>
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 xl:grid-cols-4"
          style={{ border: '1px solid var(--rule)' }}
        >
          {products.map((p, idx) => (
            <motion.article
              key={p.key}
              variants={cardEntrance}
              className="p-5 md:p-6 hover:bg-paper/[0.02] transition-colors duration-200 flex flex-col min-h-[500px]"
              style={{
                borderLeft: idx % 4 === 0 ? 'none' : '1px solid var(--rule)',
                borderTop: idx >= 4 ? '1px solid var(--rule)' : 'none',
              }}
            >
              <div className="flex items-center justify-between mb-4 gap-4">
                <span className="mono-tag text-paper/45">
                  04.{idx + 1} · {t(`products.${p.key}.type`)}
                </span>
                {renderStatus(p.status)}
              </div>

              <div className="relative overflow-hidden aspect-[16/10] mb-5 bg-paper/[0.025]" style={{ border: '1px solid var(--rule)' }}>
                <img
                  src={p.image}
                  alt={t(`products.${p.key}.imageAlt`)}
                  className="absolute inset-0 h-full w-full object-cover opacity-100 saturate-[1.03] brightness-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                {idx === 0 && (
                  <div className="absolute left-3 bottom-3 mono-tag text-paper/60">
                    {t('products.visualSafeLabel')}
                  </div>
                )}
              </div>

              <h3 className="font-display text-paper text-[26px] leading-[1] tracking-[-0.025em] font-medium mb-3">
                {t(`products.${p.key}.title`)}
              </h3>
              <p className="text-paper/68 text-[14px] leading-[1.55] mb-5">
                {t(`products.${p.key}.description`)}
              </p>

              <div className="mt-auto">
                {renderMetrics(p.key)}
                <button
                  onClick={onRequestDemo}
                  className="mono-tag text-[color:var(--accent)] hover:opacity-80 transition-opacity text-left"
                >
                  {t(`products.${p.key}.cta`)} →
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
