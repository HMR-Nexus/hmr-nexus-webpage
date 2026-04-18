import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToServices: () => void;
  onScrollToProducts: () => void;
}

const NEXUS_EASE = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: NEXUS_EASE } },
};

/**
 * NEXUS Hero — D1 editorial headline, 70/25/5 composition, brand voice copy.
 * Headline stays bilingual: "Glasfaser, präzise." is the signature.
 */
export function Hero({ onScrollToServices, onScrollToProducts }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col bg-ink text-paper overflow-hidden pt-20"
    >
      {/* Top meta rail — editorial metadata */}
      <div className="border-b border-[color:var(--rule)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-7 py-3 flex items-center justify-between mono-tag text-paper/60">
          <span>00 · Intro</span>
          <span className="hidden md:inline">Celle · DE · 2026</span>
          <span>HMR Nexus Engineering GmbH</span>
        </div>
      </div>

      {/* Main composition */}
      <div className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto px-6 md:px-7 py-14 md:py-20">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Section label */}
          <motion.div variants={childVariants} className="flex items-center gap-2.5 mb-10 md:mb-16">
            <span className="dot-accent animate-pulse-laser" />
            <span className="mono-tag text-paper/70">{t('hero.badge')}</span>
          </motion.div>

          {/* D1 headline — canonical: "Glasfaser, rebuilt around software." */}
          <motion.h1
            variants={childVariants}
            className="font-display text-paper"
            style={{
              fontSize: 'clamp(52px, 10vw, 160px)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.055em',
              margin: 0,
              maxWidth: '14ch',
            }}
          >
            {t('hero.title1')}{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>
              {t('hero.title2')}
            </em>
            <br />
            {t('hero.title3')}{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
              {t('hero.title4')}
            </span>
          </motion.h1>

          {/* Subline + technical metadata */}
          <motion.div
            variants={childVariants}
            className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
          >
            <div className="md:col-span-1 mono-tag text-paper/50 pt-2">00.1</div>

            <p
              className="md:col-span-6 text-paper/85"
              style={{
                fontFamily: 'var(--f-text)',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                lineHeight: 1.5,
                fontWeight: 400,
                maxWidth: '52ch',
              }}
            >
              {t('hero.subtitle')}
            </p>

            <div className="md:col-span-5 mono-tag text-paper/50 leading-relaxed">
              <div className="rule-top pt-4 space-y-1.5">
                <div>SEGMENT&nbsp;&nbsp;&nbsp;// NE3 · NE4</div>
                <div>REGION&nbsp;&nbsp;&nbsp;&nbsp;// DE · Niedersachsen</div>
                <div>METHOD&nbsp;&nbsp;&nbsp;&nbsp;// Blown fibre · Splice · QA</div>
                <div>STATUS&nbsp;&nbsp;&nbsp;&nbsp;// <span className="text-[color:var(--accent)]">OPERATIONAL</span></div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTAs + footer anchor */}
        <motion.div
          variants={childVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onScrollToServices}
              className="inline-flex items-center gap-3 px-6 py-4 bg-laser text-ink mono-tag hover:opacity-90 transition-opacity"
            >
              <span className="dot-accent" style={{ background: 'var(--ink)' }} />
              {t('hero.btnPrimary')}  →
            </button>

            <button
              onClick={onScrollToProducts}
              className="inline-flex items-center gap-3 px-6 py-4 mono-tag text-paper hover:bg-paper/5 transition-colors"
              style={{ border: '1px solid var(--rule-strong)' }}
            >
              {t('hero.btnSecondary')}  →
            </button>
          </div>

          <div className="mono-tag text-paper/45 max-w-xs md:text-right">
            {t('hero.title3')} {t('hero.title4')}<br/>
            {t('hero.title5')} {t('hero.title6')}
          </div>
        </motion.div>
      </div>

      {/* Bottom rule + accent bar — 70 / 25 / 5 composition echo */}
      <div className="flex h-2" aria-hidden>
        <div className="flex-[70] bg-ink" style={{ borderTop: '1px solid var(--rule)' }} />
        <div className="flex-[25] bg-paper/5" style={{ borderTop: '1px solid var(--rule)' }} />
        <div className="flex-[5] bg-laser" />
      </div>
    </section>
  );
}
