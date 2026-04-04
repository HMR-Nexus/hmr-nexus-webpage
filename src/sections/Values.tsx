import { useTranslation } from 'react-i18next';
import { Layers, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export function Values() {
  const { t } = useTranslation();

  const values = [
    { icon: Layers, label: t('values.quality') },
    { icon: Zap, label: t('values.innovation') },
    { icon: Users, label: t('values.service') },
  ];

  return (
    <div className="py-8 md:py-12 border-b border-nd-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-10 md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              variants={fadeInUp}
            >
              <value.icon className="w-5 h-5 text-nd-text-disabled" strokeWidth={1.5} />
              <span className="text-nd-text-display font-medium">{value.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
