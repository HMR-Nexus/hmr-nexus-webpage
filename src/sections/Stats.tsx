import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Layers, Users, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, cardEntrance, useCountUp } from '@/lib/motion';
import { MotionSection } from '@/components/MotionSection';

interface StatItem {
  numericValue: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

function AnimatedStat({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const count = useCountUp(stat.numericValue, 2, inView);

  return (
    <div className="relative flex flex-col items-center">
      <div className={`w-14 h-14 rounded-2xl ${stat.gradient} flex items-center justify-center mb-4`}>
        <stat.icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-[#94a3b8] text-sm font-medium">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats: StatItem[] = [
    {
      numericValue: 15,
      suffix: '+',
      label: t('stats.experience'),
      icon: Clock,
      color: 'text-[#00d4ff]',
      gradient: 'bg-gradient-to-br from-[#0066ff] to-[#00d4ff]',
    },
    {
      numericValue: 150,
      suffix: '+',
      label: t('stats.connections'),
      icon: Layers,
      color: 'text-[#c084fc]',
      gradient: 'bg-gradient-to-br from-[#a855f7] to-[#c084fc]',
    },
    {
      numericValue: 2,
      suffix: '',
      label: t('stats.countries'),
      icon: Globe,
      color: 'text-[#3d8bff]',
      gradient: 'bg-gradient-to-br from-[#3d8bff] to-[#0066ff]',
    },
    {
      numericValue: 3,
      suffix: '',
      label: t('stats.founders'),
      icon: Users,
      color: 'text-[#00d4ff]',
      gradient: 'bg-gradient-to-br from-[#00d4ff] to-[#0066ff]',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-8">
          <span className="text-[#64748b] text-sm uppercase tracking-widest">{t('stats.label')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-2">{t('stats.title')}</h2>
          <p className="text-[#94a3b8] max-w-lg mx-auto text-sm">{t('stats.subtitle')}</p>
        </MotionSection>

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/5 via-[#a855f7]/5 to-[#00d4ff]/5 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardEntrance}
                  className="text-center"
                >
                  <AnimatedStat stat={stat} inView={inView} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
