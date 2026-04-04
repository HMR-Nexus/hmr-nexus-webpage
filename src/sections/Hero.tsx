import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToServices: () => void;
  onScrollToProducts: () => void;
}

const NOTHING_EASE = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: NOTHING_EASE },
  },
};

export function Hero({ onScrollToServices, onScrollToProducts }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background handled by global LiveGrid in App.tsx */}

      {/* Single accent moment: a subtle Nexus blue dot-glow, top-right */}
      <div
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, var(--nexus-blue) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
        <motion.div
          className="text-center max-w-[1200px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8"
            variants={childVariants}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-blue" />
            <span className="nothing-label">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Title — Space Grotesk for words (legible), sweep for flair */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-nd-text-display mb-8"
            variants={childVariants}
          >
            <span className="block nexus-sweep">{t('hero.title1')}</span>
            <span className="block nexus-sweep" style={{ animationDelay: '0.4s' }}>{t('hero.title2')}</span>
            <span className="block text-nd-text-secondary font-light">{t('hero.title3')}</span>
            <span className="block nexus-sweep" style={{ animationDelay: '0.8s' }}>{t('hero.title4')}</span>
            <span className="block text-nd-text-secondary font-light">{t('hero.title5')}</span>
            <span className="block nexus-sweep" style={{ animationDelay: '1.2s' }}>{t('hero.title6')}</span>
          </motion.h1>

          {/* Subtitle — wider container so it doesn't clip */}
          <motion.p
            className="text-nd-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={childVariants}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
            variants={childVariants}
          >
            <button
              onClick={onScrollToServices}
              className="inline-flex items-center justify-center gap-2 bg-nd-text-display text-nd-black px-6 py-3.5 rounded-full font-mono text-[13px] uppercase tracking-[0.06em] hover:bg-nd-text-primary transition-colors duration-200"
            >
              {t('hero.btnPrimary')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onScrollToProducts}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-nd-text-primary px-6 py-3.5 rounded-full font-mono text-[13px] uppercase tracking-[0.06em] border border-nd-border-visible hover:border-nd-text-secondary transition-colors duration-200"
            >
              {t('hero.btnSecondary')}
            </button>
          </motion.div>

          {/* Stats Row — Doto only for numbers (where pixel look shines) */}
          <motion.div
            className="flex justify-center gap-10 md:gap-16"
            variants={childVariants}
          >
            {[
              { value: '15+', label: t('hero.stats.km') },
              { value: '150+', label: t('hero.stats.connections') },
              { value: '2', label: t('hero.stats.countries') },
            ].map((stat, index) => (
              <div key={index}>
                <div className="nothing-data text-3xl md:text-4xl tabular-nums">
                  {stat.value}
                </div>
                <div className="nothing-label mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2 text-nd-text-disabled"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
            {t('hero.scroll', 'Scroll')}
          </span>
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
