import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView, motion } from 'framer-motion';
import { staggerContainer, cardEntrance, useCountUp } from '@/lib/motion';
import { MotionSection } from '@/components/MotionSection';

interface StatItem {
  numericValue: number;
  suffix: string;
  label: string;
  unit: string;
}

function AnimatedStat({ stat, inView, index }: { stat: StatItem; inView: boolean; index: number }) {
  const count = useCountUp(stat.numericValue, 2, inView);
  return (
    <div className="p-6 md:p-8 rule-top md:rule-top-none md:border-l md:border-[color:var(--rule)] first:border-l-0">
      <div className="mono-tag text-paper/45 mb-4">
        {String(index + 1).padStart(2, '0')} · {stat.unit || '—'}
      </div>
      <div
        className="font-display text-paper tabular-nums"
        style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: '-0.04em', fontWeight: 300 }}
      >
        {count}
        <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
      </div>
      <div className="text-paper/70 text-[14px] mt-3 leading-snug">{stat.label}</div>
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
    { numericValue: 2, suffix: '', unit: 'DE · CO', label: t('stats.countries') },
    { numericValue: 3, suffix: '', unit: 'FOUNDERS', label: t('stats.founders') },
  ];

  return (
    <section className="bg-ink text-paper py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14 pb-8 rule-bottom">
            <div>
              <div className="mono-tag text-paper/50 mb-3">{t('stats.label')}</div>
              <h2 className="font-display text-paper" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 400, margin: 0 }}>
                {t('stats.title')}
              </h2>
            </div>
            <p className="text-paper/70 text-[15px] leading-[1.55] max-w-[48ch]">
              {t('stats.subtitle')}
            </p>
          </div>
        </MotionSection>

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ border: '1px solid var(--rule)' }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={cardEntrance}>
              <AnimatedStat stat={stat} inView={inView} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
