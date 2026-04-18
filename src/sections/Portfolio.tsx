import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface Metric {
  key: string;
  value: string;
}

interface Project {
  key: string;
  metrics: Metric[];
  status: 'completed' | 'active';
}

const projects: Project[] = [
  {
    key: 'celle', status: 'completed',
    metrics: [{ key: 'km', value: '45' }, { key: 'hup', value: '320' }, { key: 'months', value: '8' }],
  },
  {
    key: 'suedheide', status: 'completed',
    metrics: [{ key: 'units', value: '500+' }, { key: 'km', value: '28' }, { key: 'ontime', value: '✓' }],
  },
  {
    key: 'saas', status: 'completed',
    metrics: [{ key: 'cloud', value: 'Cloud' }, { key: 'available', value: '99.9%' }, { key: 'languages', value: '3 LANG' }],
  },
  {
    key: 'mdu', status: 'active',
    metrics: [{ key: 'type', value: 'MDU' }, { key: 'level', value: 'NE4' }, { key: 'start', value: '2026' }],
  },
];

/**
 * NEXUS Portfolio — 03 · Projects, case-file style.
 */
export function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">03 · {t('portfolio.label')}</div>
            </div>
            <div>
              <h2>
                {t('portfolio.title')}<br/>
                <span className="text-paper/50">{t('portfolio.titleHighlight')}</span>
              </h2>
            </div>
          </div>
        </MotionSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2"
          style={{ border: '1px solid var(--rule)' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.key}
              variants={cardEntrance}
              className="p-8 md:p-10 hover:bg-paper/[0.02] transition-colors duration-300"
              style={{
                borderLeft: idx % 2 === 1 ? '1px solid var(--rule)' : 'none',
                borderTop: idx >= 2 ? '1px solid var(--rule)' : 'none',
              }}
            >
              {/* Top: file number + status */}
              <div className="flex items-center justify-between mb-6">
                <span className="mono-tag text-paper/50">
                  CASE · {String(idx + 1).padStart(3, '0')} · {t(`portfolio.projects.${project.key}.tag`)}
                </span>

                {project.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 mono-tag text-[color:var(--accent)]">
                    <span className="dot-accent animate-pulse-laser" />
                    {t('portfolio.status.active')}
                  </span>
                ) : (
                  <span className="mono-tag text-paper/40">
                    {t('portfolio.status.completed')}
                  </span>
                )}
              </div>

              {/* Hero metric */}
              <div className="mb-7">
                <div
                  className="font-display text-paper tabular-nums"
                  style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.85, letterSpacing: '-0.04em', fontWeight: 300 }}
                >
                  {project.metrics[0].value}
                </div>
                <div className="mono-tag text-paper/55 mt-2">
                  {t(`portfolio.projects.${project.key}.metrics.${project.metrics[0].key}`)}
                </div>
              </div>

              {/* Title + description */}
              <h3
                className="font-display text-paper mb-2"
                style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 500 }}
              >
                {t(`portfolio.projects.${project.key}.title`)}
              </h3>
              <p className="text-paper/65 text-[14px] leading-[1.55] mb-6 max-w-[52ch]">
                {t(`portfolio.projects.${project.key}.description`)}
              </p>

              {/* Secondary metrics */}
              <div className="grid grid-cols-2 gap-6 pt-5 rule-top">
                {project.metrics.slice(1).map((m) => (
                  <div key={m.key}>
                    <div
                      className="font-display text-paper tabular-nums"
                      style={{ fontSize: 20, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 500 }}
                    >
                      {m.value}
                    </div>
                    <div className="mono-tag text-paper/45 mt-1.5">
                      {t(`portfolio.projects.${project.key}.metrics.${m.key}`)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
