import { useTranslation } from 'react-i18next';
import { Globe, Code2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { MouseGlow } from '@/components/MouseGlow';
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
    <section id="services" className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <span className="w-2 h-2 bg-[#3d8bff] rounded-full" />
            {t('services.label')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('services.title')}{' '}
            <span className="text-[#3d8bff]">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </MotionSection>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Fiber Infrastructure */}
          <motion.div
            variants={cardEntrance}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-[#0066ff]/30 transition-colors duration-200 overflow-hidden"
          >
            <MouseGlow color="rgba(0,102,255,0.06)" className="p-6 md:p-8">
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#0066ff]/10 border border-[#0066ff]/20 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#00d4ff]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{t('services.fiber.title')}</h3>
                <span className="text-[#00d4ff] text-sm">{t('services.fiber.subtitle')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#94a3b8] mb-6 leading-relaxed">
              {t('services.fiber.description')}
            </p>

            {/* Services List */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
              className="space-y-3"
            >
              {fiberServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={listItemSlide}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-medium block text-sm">{t(service.labelKey)}</span>
                    <span className="text-[#64748b] text-xs block truncate">{t(`services.fiber.items.${service.key}`)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            </MouseGlow>
          </motion.div>

          {/* Software & Digital */}
          <motion.div
            variants={cardEntrance}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-[#a855f7]/30 transition-colors duration-200 overflow-hidden"
          >
            <MouseGlow color="rgba(168,85,247,0.06)" className="p-6 md:p-8">
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-xl flex items-center justify-center">
                <Code2 className="w-7 h-7 text-[#c084fc]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold">{t('services.software.title')}</h3>
                <span className="text-[#c084fc] text-sm">{t('services.software.subtitle')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#94a3b8] mb-6 leading-relaxed">
              {t('services.software.description')}
            </p>

            {/* Services List */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
              className="space-y-3"
            >
              {softwareServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={listItemSlide}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c084fc]/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#c084fc]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-medium block text-sm">{t(service.labelKey)}</span>
                    <span className="text-[#64748b] text-xs block truncate">{t(`services.software.items.${service.key}`)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            </MouseGlow>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
