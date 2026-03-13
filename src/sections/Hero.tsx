import { useTranslation } from 'react-i18next';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToServices: () => void;
  onScrollToProducts: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export function Hero({ onScrollToServices, onScrollToProducts }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Orbs with floating animation */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#0066ff]/20 to-transparent opacity-40 blur-[80px] -top-[200px] -right-[150px]"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#a855f7]/20 to-transparent opacity-40 blur-[80px] bottom-[0px] -left-[150px]"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-20">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded-full text-sm text-[#94a3b8] mb-6"
            variants={childVariants}
          >
            <span className="w-2 h-2 rounded-full bg-[#00d4ff]" />
            <span className="font-medium">{t('hero.badge')}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-5 text-balance"
            variants={childVariants}
          >
            <span className="block text-white mb-1">{t('hero.title1')}</span>
            <span className="block text-shimmer mb-1">{t('hero.title2')}</span>
            <span className="block text-white/90 mb-1">{t('hero.title3')}</span>
            <span className="block text-shimmer mb-1">{t('hero.title4')}</span>
            <span className="block text-white/90 mb-1">{t('hero.title5')}</span>
            <span className="block text-shimmer mb-1">{t('hero.title6')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[#94a3b8] text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            variants={childVariants}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
            variants={childVariants}
          >
            <motion.button
              onClick={onScrollToServices}
              className="group inline-flex items-center justify-center gap-2 bg-white text-[#050a14] px-6 py-3.5 rounded-full font-semibold text-base hover:bg-[#00d4ff] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{t('hero.btnPrimary')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </motion.button>

            <motion.button
              onClick={onScrollToProducts}
              className="group inline-flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-3.5 rounded-full font-medium text-base border border-white/10 hover:bg-white/10 transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {t('hero.btnSecondary')}
            </motion.button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-3 gap-3 max-w-lg mx-auto"
            variants={childVariants}
          >
            {[
              { value: '15+', label: t('hero.stats.km') },
              { value: '150+', label: t('hero.stats.connections') },
              { value: '2', label: t('hero.stats.countries') },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.05] transition-colors duration-200"
              >
                <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[#64748b] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-[#64748b]"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll', 'Scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
