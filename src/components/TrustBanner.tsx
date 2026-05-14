import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

/**
 * NEXUS TrustBanner — mono-label rail. No icons, no ornament.
 * Text does the work.
 */
export function TrustBanner() {
  const { t } = useTranslation();

  const trustItems = [
    { text: t('trustBanner.germanTech') },
    { text: t('trustBanner.iso') },
    { text: t('trustBanner.ftth') },
    { text: t('trustBanner.availability') },
  ];

  return (
    <div className="w-full rule-top rule-bottom bg-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7 py-4">
        <motion.div
          className="flex flex-wrap items-center gap-x-10 gap-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="mono-tag text-paper/40 pr-6 border-r border-[color:var(--rule)]"
          >
            {t('trustBanner.label')}
          </motion.span>
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              variants={fadeInUp}
            >
              <span className="dot-accent" style={{ background: 'var(--paper)', opacity: 0.4, width: 4, height: 4 }} />
              <span className="mono-tag text-paper/70">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
