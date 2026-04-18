import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

/**
 * NEXUS Values — inline value rail, mono-labels.
 */
export function Values() {
  const { t } = useTranslation();

  const values = [
    { key: '01', label: t('values.quality') },
    { key: '02', label: t('values.innovation') },
    { key: '03', label: t('values.service') },
  ];

  return (
    <div className="py-8 md:py-10 rule-bottom bg-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <motion.div
          className="flex flex-wrap items-center gap-x-12 gap-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <span className="mono-tag text-paper/40 pr-6 border-r border-[color:var(--rule)]">
            PRINCIPLES
          </span>
          {values.map((v) => (
            <motion.div
              key={v.key}
              className="flex items-baseline gap-3"
              variants={fadeInUp}
            >
              <span className="mono-tag text-[color:var(--accent)]">{v.key}</span>
              <span className="text-paper text-[15px] font-medium">{v.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
