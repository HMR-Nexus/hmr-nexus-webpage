import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance, listItemSlide } from '@/lib/motion';

/**
 * NEXUS Services — 01 · Two disciplines, one system.
 * Editorial section-head + numbered disciplines, mono-labels, no icons dressing.
 */
export function Services() {
  const { t } = useTranslation();

  const fiberServices = [
    { key: 'ne3' },
    { key: 'ne4' },
    { key: 'tiefbau' },
    { key: 'pm' },
  ];

  const softwareServices = [
    { key: 'control' },
    { key: 'bot' },
    { key: 'mobile' },
    { key: 'integration' },
  ];

  const Discipline = ({
    num, subtitle, title, description, items, base,
  }: {
    num: string;
    subtitle: string;
    title: string;
    description: string;
    items: { key: string }[];
    base: 'fiber' | 'software';
  }) => (
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
              key={index}
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
        />

        <Discipline
          num="01.2"
          subtitle={t('services.software.subtitle')}
          title={t('services.software.title')}
          description={t('services.software.description')}
          items={softwareServices}
          base="software"
        />
      </div>
    </section>
  );
}
