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
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="mb-12">
          <span className="nothing-label block mb-3">{t('services.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('services.title')}{' '}
            <span className="text-nd-text-secondary">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl">
            {t('services.subtitle')}
          </p>
        </MotionSection>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-px bg-nd-border rounded-lg overflow-hidden"
        >
          {/* Fiber Infrastructure */}
          <motion.div
            variants={cardEntrance}
            className="bg-nd-surface p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-medium text-nd-text-display">{t('services.fiber.title')}</h3>
                <span className="nothing-label">{t('services.fiber.subtitle')}</span>
              </div>
            </div>

            <p className="text-nd-text-secondary text-sm mb-6 leading-relaxed">
              {t('services.fiber.description')}
            </p>

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
                  className="flex items-center gap-3 py-3"
                >
                  <Check className="w-3.5 h-3.5 text-nd-text-disabled" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <span className="text-nd-text-display text-sm block">{t(service.labelKey)}</span>
                    <span className="text-nd-text-disabled text-xs block truncate">{t(`services.fiber.items.${service.key}`)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Software & Digital */}
          <motion.div
            variants={cardEntrance}
            className="bg-nd-surface p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
              <div>
                <h3 className="text-lg font-medium text-nd-text-display">{t('services.software.title')}</h3>
                <span className="nothing-label">{t('services.software.subtitle')}</span>
              </div>
            </div>

            <p className="text-nd-text-secondary text-sm mb-6 leading-relaxed">
              {t('services.software.description')}
            </p>

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
                  className="flex items-center gap-3 py-3"
                >
                  <Check className="w-3.5 h-3.5 text-nd-text-disabled" strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <span className="text-nd-text-display text-sm block">{t(service.labelKey)}</span>
                    <span className="text-nd-text-disabled text-xs block truncate">{t(`services.software.items.${service.key}`)}</span>
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
