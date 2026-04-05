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
    <div className="w-full border-t border-nd-border">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-5">
        <motion.div
          className="flex flex-wrap justify-start items-center gap-6 md:gap-10"
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
              <item.icon className="w-3.5 h-3.5 text-nd-text-disabled" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-nd-text-disabled">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
