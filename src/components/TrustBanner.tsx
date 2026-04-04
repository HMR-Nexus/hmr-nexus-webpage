import { useTranslation } from 'react-i18next';
import { Shield, Award, Globe2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/motion';

export function TrustBanner() {
  const { t } = useTranslation();

  const trustItems = [
    { icon: Globe2, text: t('trustBanner.germanTech') },
    { icon: Shield, text: t('trustBanner.iso') },
    { icon: Award, text: t('trustBanner.ftth') },
    { icon: Clock, text: t('trustBanner.availability') },
  ];

  return (
    <div className="w-full border-y border-nd-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              variants={fadeInUp}
            >
              <item.icon className="w-4 h-4 text-nd-text-disabled" strokeWidth={1.5} />
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-nd-text-secondary">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
