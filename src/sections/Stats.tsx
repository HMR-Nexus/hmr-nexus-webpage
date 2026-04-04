import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { staggerContainer, cardEntrance, useCountUp } from '@/lib/motion';
import { MotionSection } from '@/components/MotionSection';

interface StatItem {
  numericValue: number;
  suffix: string;
  label: string;
  unit: string;
}

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const count = useCountUp(stat.numericValue, 2, inView);

  return (
    <div className="text-center">
      {/* Nothing: large Doto number as primary layer */}
      {/* Doto for numbers only — pixel look works great for digits */}
      <div className="nothing-data text-5xl md:text-6xl mb-1 tabular-nums">
        {count}{stat.suffix}
      </div>
      {stat.unit && (
        <div className="nothing-label mb-2">{stat.unit}</div>
      )}
      <div className="text-nd-text-secondary text-sm">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats: StatItem[] = [
    { numericValue: 15, suffix: '+', unit: 'KM', label: t('stats.experience') },
    { numericValue: 150, suffix: '+', unit: 'HÜP', label: t('stats.connections') },
    { numericValue: 2, suffix: '', unit: '', label: t('stats.countries') },
    { numericValue: 3, suffix: '', unit: '', label: t('stats.founders') },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-10">
          <span className="nothing-label block mb-3">{t('stats.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-2">{t('stats.title')}</h2>
          <p className="text-nd-text-secondary max-w-lg mx-auto text-sm">{t('stats.subtitle')}</p>
        </MotionSection>

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="border border-nd-border rounded-lg p-8 md:p-12 dot-grid-subtle"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={cardEntrance}>
                <AnimatedStat stat={stat} inView={inView} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
