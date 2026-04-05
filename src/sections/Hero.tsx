import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToServices: () => void;
  onScrollToProducts: () => void;
}

const NOTHING_EASE = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: NOTHING_EASE },
  },
};

export function Hero({ onScrollToServices }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      {/* Atmospheric blue glow — bigger, more dramatic */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, var(--nexus-blue) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, var(--nexus-blue) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 pb-24 md:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8 md:mb-12"
            variants={childVariants}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-blue" />
            <span className="nothing-label">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Title — Massive, left-aligned, asymmetric */}
          <motion.h1
            className="text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-bold leading-[0.95] tracking-tight text-nd-text-display mb-8 md:mb-12"
            variants={childVariants}
          >
            <span className="block">{t('hero.title1')}</span>
            <span className="block nexus-sweep">{t('hero.title2')}</span>
            <span className="block text-nd-text-secondary font-light text-[0.45em] mt-2">
              {t('hero.title3')} <span className="text-nd-text-display font-bold">{t('hero.title4')}</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-nd-text-secondary text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            variants={childVariants}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Single CTA — confident, no second-guessing */}
          <motion.div variants={childVariants} className="mb-20 md:mb-28">
            <button
              onClick={onScrollToServices}
              className="inline-flex items-center justify-center gap-2 bg-nd-text-display text-nd-black px-8 py-4 rounded-full font-mono text-[13px] uppercase tracking-[0.06em] hover:bg-nd-text-primary transition-colors duration-200"
            >
              {t('hero.btnPrimary')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Stats Strip — big Doto numbers */}
          <motion.div
            className="flex gap-12 md:gap-20 border-t border-nd-border pt-8"
            variants={childVariants}
          >
            {[
              { value: '15+', unit: 'KM', label: t('hero.stats.km') },
              { value: '150+', unit: 'HÜP', label: t('hero.stats.connections') },
              { value: '2', unit: '', label: t('hero.stats.countries') },
            ].map((stat, index) => (
              <div key={index}>
                <div className="nothing-data text-4xl md:text-5xl tabular-nums">
                  {stat.value}
                  {stat.unit && (
                    <span className="nothing-label text-nd-text-disabled ml-1 text-xs align-top">{stat.unit}</span>
                  )}
                </div>
                <div className="nothing-label mt-2 text-nd-text-disabled">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
