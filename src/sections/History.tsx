import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance, listItemSlide } from '@/lib/motion';

const historySteps = ['origin', 'field', 'software', 'today'];
const principles = ['field', 'documentation', 'control'];

export function History() {
  const { t } = useTranslation();

  return (
    <section id="history" className="bg-ink text-paper py-16 md:py-20 pt-28 md:pt-32 min-h-[calc(100svh-80px)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">01 · {t('history.label')}</div>
            </div>
            <div>
              <h2>
                {t('history.title')}<br/>
                <span className="text-paper/50">{t('history.titleHighlight')}</span>
              </h2>
              <p style={{ marginTop: 24 }}>{t('history.subtitle')}</p>
            </div>
          </div>
        </MotionSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-[0.9fr_1.35fr] gap-8 lg:gap-12"
        >
          <motion.div variants={cardEntrance} className="border border-[color:var(--rule)] p-6 md:p-8 bg-paper/[0.02]">
            <div className="mono-tag text-[color:var(--accent)] mb-5">HMR Nexus Engineering GmbH</div>
            <p className="text-paper/76 text-[16px] leading-[1.65] mb-8">
              {t('history.intro')}
            </p>
            <div className="grid gap-3">
              {principles.map((item, index) => (
                <div key={item} className="grid grid-cols-[40px_1fr] gap-3 border border-paper/10 px-4 py-3">
                  <span className="mono-tag text-paper/38">0{index + 1}</span>
                  <span className="text-paper/72 text-[14px] leading-[1.45]">{t(`history.principles.${item}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2" style={{ border: '1px solid var(--rule)' }}>
            {historySteps.map((step, index) => (
              <motion.article
                key={step}
                variants={listItemSlide}
                className="p-5 md:p-6 min-h-[210px]"
                style={{
                  borderLeft: index % 2 === 0 ? 'none' : '1px solid var(--rule)',
                  borderTop: index >= 2 ? '1px solid var(--rule)' : 'none',
                }}
              >
                <div className="mono-tag text-paper/42 mb-8">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-paper text-[24px] leading-[1] tracking-[-0.025em] font-medium mb-4">
                  {t(`history.steps.${step}.title`)}
                </h3>
                <p className="text-paper/66 text-[14px] leading-[1.55]">
                  {t(`history.steps.${step}.text`)}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
