import { useTranslation } from 'react-i18next';
import { Globe, Code2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance, listItemSlide } from '@/lib/motion';

export function Services() {
  const { t } = useTranslation();

  const fiberServices = [
    { key: 'ne3', labelKey: 'services.fiber.items.ne3_label' },
    { key: 'ne4', labelKey: 'services.fiber.items.ne4_label' },
    { key: 'tiefbau', labelKey: 'services.fiber.items.tiefbau_label' },
    { key: 'pm', labelKey: 'services.fiber.items.pm_label' },
  ];

  const softwareServices = [
    { key: 'control', labelKey: 'services.software.items.control_label' },
    { key: 'bot', labelKey: 'services.software.items.bot_label' },
    { key: 'mobile', labelKey: 'services.software.items.mobile_label' },
    { key: 'integration', labelKey: 'services.software.items.integration_label' },
  ];

  return (
    <section id="services" className="py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <MotionSection className="mb-20 md:mb-28">
          <span className="nothing-label block mb-4">{t('services.label')}</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-nd-text-display leading-[1.05]">
            {t('services.title')}{' '}
            <span className="text-nd-text-secondary">{t('services.titleHighlight')}</span>
          </h2>
        </MotionSection>

        {/* Fiber Infrastructure — asymmetric layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 mb-24 md:mb-36"
        >
          <motion.div variants={cardEntrance}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
              <span className="nothing-label">{t('services.fiber.subtitle')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-nd-text-display mb-4 leading-tight">
              {t('services.fiber.title')}
            </h3>
            <p className="text-nd-text-secondary text-base leading-relaxed max-w-md">
              {t('services.fiber.description')}
            </p>
          </motion.div>

          <motion.div variants={cardEntrance}>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              className="space-y-0 divide-y divide-nd-border"
            >
              {fiberServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={listItemSlide}
                  className="flex items-center gap-4 py-5"
                >
                  <Check className="w-4 h-4 text-nd-text-disabled flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <span className="text-nd-text-display text-base block font-medium">{t(service.labelKey)}</span>
                    <span className="text-nd-text-secondary text-sm block">{t(`services.fiber.items.${service.key}`)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Software & Digital — reversed asymmetry */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20"
        >
          <motion.div variants={cardEntrance} className="lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
              <span className="nothing-label">{t('services.software.subtitle')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-nd-text-display mb-4 leading-tight">
              {t('services.software.title')}
            </h3>
            <p className="text-nd-text-secondary text-base leading-relaxed max-w-md">
              {t('services.software.description')}
            </p>
          </motion.div>

          <motion.div variants={cardEntrance} className="lg:order-1">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
              className="space-y-0 divide-y divide-nd-border"
            >
              {softwareServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={listItemSlide}
                  className="flex items-center gap-4 py-5"
                >
                  <Check className="w-4 h-4 text-nd-text-disabled flex-shrink-0" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <span className="text-nd-text-display text-base block font-medium">{t(service.labelKey)}</span>
                    <span className="text-nd-text-secondary text-sm block">{t(`services.software.items.${service.key}`)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
