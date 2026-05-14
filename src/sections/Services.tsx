import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance, listItemSlide } from '@/lib/motion';

interface ServicesProps {
  onRequestNE4Briefing?: () => void;
}

type FiberServiceKey = 'ne3' | 'ne4' | 'tiefbau' | 'pm';

interface FiberService {
  key: FiberServiceKey;
  marker: string;
}

const fiberServices: FiberService[] = [
  { key: 'ne3', marker: 'NE3' },
  { key: 'ne4', marker: 'NE4' },
  { key: 'tiefbau', marker: 'CIVIL' },
  { key: 'pm', marker: 'QA' },
];

const lifecycleSteps = ['survey', 'install', 'splice', 'document'];
const qualitySignals = ['photos', 'checks', 'handover'];

function CapabilityCards({ t }: { t: TFunction }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="grid md:grid-cols-2 xl:grid-cols-4"
      style={{ border: '1px solid var(--rule)' }}
    >
      {fiberServices.map((service, index) => (
        <motion.article
          key={service.key}
          variants={cardEntrance}
          className="p-5 md:p-6 min-h-[220px] flex flex-col hover:bg-paper/[0.025] transition-colors"
          style={{
            borderLeft: index % 4 === 0 ? 'none' : '1px solid var(--rule)',
            borderTop: index >= 4 ? '1px solid var(--rule)' : 'none',
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="mono-tag text-paper/42">{String(index + 1).padStart(2, '0')}</span>
            <span className="mono-tag text-[color:var(--accent)]">{service.marker}</span>
          </div>
          <h3 className="font-display text-paper text-[24px] leading-[1] tracking-[-0.025em] font-medium mb-4">
            {t(`services.fiber.items.${service.key}_label`)}
          </h3>
          <p className="text-paper/68 text-[14px] leading-[1.55] mt-auto">
            {t(`services.fiber.items.${service.key}`)}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}

function ExecutionSummary({ onRequestNE4Briefing, t }: { onRequestNE4Briefing?: () => void; t: TFunction }) {
  return (
    <MotionSection className="mt-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="grid lg:grid-cols-[0.9fr_1.35fr] gap-8 lg:gap-12 border border-[color:var(--rule)] p-5 md:p-7"
      >
        <motion.div variants={cardEntrance}>
          <div className="mono-tag text-paper/50 mb-4">01.1 · {t('services.ne4.label')}</div>
          <h3 className="font-display text-paper text-[30px] md:text-[42px] leading-[0.98] tracking-[-0.03em] font-normal mb-4">
            {t('services.ne4.title')}
          </h3>
          <p className="text-paper/68 text-[15px] leading-[1.55] max-w-[52ch] mb-6">
            {t('services.ne4.intro')}
          </p>
          <button
            type="button"
            onClick={onRequestNE4Briefing}
            className="inline-flex items-center gap-3 px-5 py-3 mono-tag bg-laser text-ink hover:opacity-90 transition-opacity disabled:opacity-40"
            disabled={!onRequestNE4Briefing}
          >
            <span className="dot-accent" style={{ background: 'var(--ink)' }} />
            {t('services.ne4.cta')} →
          </button>
        </motion.div>

        <motion.div variants={cardEntrance} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <div className="mono-tag text-paper/45 mb-4">{t('services.ne4.lifecycle.title')}</div>
            <motion.ol variants={staggerContainer} className="grid gap-3">
              {lifecycleSteps.map((step, index) => (
                <motion.li key={step} variants={listItemSlide} className="grid grid-cols-[34px_1fr] gap-3 border border-paper/10 px-3 py-3">
                  <span className="mono-tag text-paper/40">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-paper/70 text-[13px] leading-[1.45]">
                    {t(`services.ne4.lifecycle.steps.${step}`)}
                  </span>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div>
            <div className="mono-tag text-paper/45 mb-4">{t('services.ne4.quality.title')}</div>
            <motion.ul variants={staggerContainer} className="grid gap-3">
              {qualitySignals.map((signal) => (
                <motion.li key={signal} variants={listItemSlide} className="flex gap-3 border border-paper/10 px-3 py-3 text-paper/70 text-[13px] leading-[1.45]">
                  <span className="dot-accent mt-1.5 shrink-0" />
                  <span>{t(`services.ne4.quality.signals.${signal}`)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>
    </MotionSection>
  );
}

export function Services({ onRequestNE4Briefing }: ServicesProps) {
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-ink text-paper py-16 md:py-20 pt-28 md:pt-32 min-h-[calc(100svh-80px)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">02 · {t('services.label')}</div>
            </div>
            <div>
              <h2>
                {t('services.title')}<br/>
                <span className="text-paper/50">{t('services.titleHighlight')}</span>
              </h2>
              <p style={{ marginTop: 24 }}>{t('services.subtitle')}</p>
            </div>
          </div>
        </MotionSection>

        <CapabilityCards t={t} />
        <ExecutionSummary onRequestNE4Briefing={onRequestNE4Briefing} t={t} />
      </div>
    </section>
  );
}
