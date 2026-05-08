import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance, listItemSlide } from '@/lib/motion';

type ServiceBase = 'fiber' | 'software';

interface ServiceItem {
  key: string;
}

/**
 * NEXUS Services — 01 · Two disciplines, one system.
 * Editorial section-head + numbered disciplines, mono-labels, no icons dressing.
 */
interface ServicesProps {
  onRequestNE4Briefing?: () => void;
}

interface DisciplineProps {
  num: string;
  subtitle: string;
  title: string;
  description: string;
  items: ServiceItem[];
  base: ServiceBase;
  t: TFunction;
}

interface NE4HighlightProps {
  onRequestNE4Briefing?: () => void;
  t: TFunction;
}

const fiberServices: ServiceItem[] = [
  { key: 'ne3' },
  { key: 'ne4' },
  { key: 'tiefbau' },
  { key: 'pm' },
];

const softwareServices: ServiceItem[] = [
  { key: 'control' },
  { key: 'bot' },
  { key: 'mobile' },
  { key: 'integration' },
];

const ne4ScopeItems = ['handover', 'connection', 'splice', 'activation'];
const ne4LifecycleSteps = ['survey', 'install', 'splice', 'document'];
const ne4QualitySignals = ['photos', 'checks', 'handover'];

function Discipline({ num, subtitle, title, description, items, base, t }: DisciplineProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 py-14 md:py-20 rule-top"
    >
      <motion.div variants={cardEntrance}>
        <div className="mono-tag text-paper/50 mb-5">{num} · {subtitle}</div>
        <h3
          className="font-display text-paper mb-5"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 400 }}
        >
          {title}
        </h3>
        <p className="text-paper/70 text-[16px] leading-[1.55] max-w-[44ch]">
          {description}
        </p>
      </motion.div>

      <motion.div variants={cardEntrance}>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          className="divide-y divide-[color:var(--rule)]"
        >
          {items.map((service, index) => (
            <motion.li
              key={service.key}
              variants={listItemSlide}
              className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto] gap-4 md:gap-8 py-5 items-baseline"
            >
              <span className="mono-tag text-paper/40">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-display text-paper text-[20px] md:text-[22px] font-medium block leading-tight">
                  {t(`services.${base}.items.${service.key}_label`)}
                </span>
                <span className="text-paper/60 text-[14px] block mt-1">
                  {t(`services.${base}.items.${service.key}`)}
                </span>
              </div>
              <span className="mono-tag text-paper/40 hidden md:inline text-right">
                ↗
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

function NE4Highlight({ onRequestNE4Briefing, t }: NE4HighlightProps) {
  return (
    <MotionSection className="py-14 md:py-20 rule-top">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="grid lg:grid-cols-[0.9fr_1.5fr] gap-12 lg:gap-20 border border-[color:var(--rule)] p-6 md:p-8 lg:p-10"
      >
        <motion.div variants={cardEntrance}>
          <div className="mono-tag text-paper/50 mb-5">01.1A · {t('services.ne4.label')}</div>
          <h3
            className="font-display text-paper mb-5"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 400 }}
          >
            {t('services.ne4.title')}
          </h3>
          <p className="text-paper/70 text-[16px] leading-[1.55] max-w-[46ch] mb-8">
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

        <motion.div variants={cardEntrance} className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mono-tag text-paper/45 mb-4">{t('services.ne4.scope.title')}</div>
            <motion.ul variants={staggerContainer} className="space-y-4">
              {ne4ScopeItems.map((item) => (
                <motion.li key={item} variants={listItemSlide} className="rule-top pt-4">
                  <span className="font-display text-paper text-[18px] block leading-tight">
                    {t(`services.ne4.scope.items.${item}.label`)}
                  </span>
                  <span className="text-paper/60 text-[14px] block mt-1 leading-[1.5]">
                    {t(`services.ne4.scope.items.${item}.text`)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <div className="mono-tag text-paper/45 mb-4">{t('services.ne4.lifecycle.title')}</div>
            <motion.ol variants={staggerContainer} className="space-y-4">
              {ne4LifecycleSteps.map((step, index) => (
                <motion.li key={step} variants={listItemSlide} className="grid grid-cols-[32px_1fr] gap-3 rule-top pt-4">
                  <span className="mono-tag text-paper/40">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-paper/70 text-[14px] leading-[1.5]">
                    {t(`services.ne4.lifecycle.steps.${step}`)}
                  </span>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div>
            <div className="mono-tag text-paper/45 mb-4">{t('services.ne4.quality.title')}</div>
            <motion.ul variants={staggerContainer} className="space-y-4">
              {ne4QualitySignals.map((signal) => (
                <motion.li key={signal} variants={listItemSlide} className="flex gap-3 rule-top pt-4 text-paper/70 text-[14px] leading-[1.5]">
                  <span className="dot-accent mt-2 shrink-0" />
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
    <section id="services" className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        {/* Section Head — brand system pattern */}
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">01 · {t('services.label')}</div>
            </div>
            <div>
              <h2>
                {t('services.title')}<br/>
                <span className="text-paper/50">{t('services.titleHighlight')}</span>
              </h2>
            </div>
          </div>
        </MotionSection>

        <Discipline
          num="01.1"
          subtitle={t('services.fiber.subtitle')}
          title={t('services.fiber.title')}
          description={t('services.fiber.description')}
          items={fiberServices}
          base="fiber"
          t={t}
        />

        <NE4Highlight onRequestNE4Briefing={onRequestNE4Briefing} t={t} />

        <Discipline
          num="01.2"
          subtitle={t('services.software.subtitle')}
          title={t('services.software.title')}
          description={t('services.software.description')}
          items={softwareServices}
          base="software"
          t={t}
        />
      </div>
    </section>
  );
}
