import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

const differentiators = ['planning', 'field', 'documentation', 'coordination'] as const;

export function Values() {
  const { t } = useTranslation();

  return (
    <section className="bg-ink text-paper py-12 md:py-16 border-b border-[color:var(--rule)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-10 md:mb-12">
            <div className="mono-tag text-paper/50 mb-3">02.1 · {t('values.title')}</div>
            <h2 className="font-display text-paper" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontWeight: 300 }}>
              {t('values.title')}<br/>
              <span className="text-paper/50">{t('values.titleHighlight')}</span>
            </h2>
            <p className="text-paper/70 mt-4 max-w-[58ch]" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.55 }}>
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ border: '1px solid var(--rule)' }}>
            {differentiators.map((key, index) => (
              <motion.div
                key={key}
                variants={fadeInUp}
                className="p-5 md:p-6"
                style={{
                  borderLeft: index === 0 ? 'none' : '1px solid var(--rule)',
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="mono-tag text-[color:var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mono-tag text-paper/60">{t(`values.${key}`)}</span>
                </div>
                <p className="text-paper/75 text-[14px] leading-[1.6]">
                  {t(`values.why.${key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}