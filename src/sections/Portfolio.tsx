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
    key: 'celle',
    status: 'completed',
    metrics: [
      { key: 'km', value: '45' },
      { key: 'hup', value: '320' },
      { key: 'months', value: '8' },
    ],
  },
  {
    key: 'suedheide',
    status: 'completed',
    metrics: [
      { key: 'units', value: '500+' },
      { key: 'km', value: '28' },
      { key: 'ontime', value: '✓' },
    ],
  },
  {
    key: 'saas',
    status: 'completed',
    metrics: [
      { key: 'cloud', value: 'Cloud' },
      { key: 'available', value: '99.9%' },
      { key: 'languages', value: '3 Lang' },
    ],
  },
  {
    key: 'mdu',
    status: 'active',
    metrics: [
      { key: 'type', value: 'MDU' },
      { key: 'level', value: 'NE4' },
      { key: 'start', value: '2026' },
    ],
  },
];

export function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="mb-12">
          <span className="nothing-label block mb-3">{t('portfolio.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('portfolio.title')}{' '}
            <span className="text-nd-text-secondary">{t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary text-base max-w-2xl">
            {t('portfolio.subtitle')}
          </p>
        </MotionSection>

        {/* Project Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.key}
              variants={cardEntrance}
              className="bg-nd-surface border border-nd-border rounded-lg p-6 hover:border-nd-border-visible transition-colors duration-200"
            >
              {/* Tag + status */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-nd-text-display px-2 py-0.5 border border-nd-border-visible rounded-sm">
                  {t(`portfolio.projects.${project.key}.tag`)}
                </span>

                {project.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-nd-success">
                    <span className="w-1.5 h-1.5 rounded-full bg-nd-success animate-pulse" />
                    {t('portfolio.status.active')}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-nd-text-disabled">
                    {t('portfolio.status.completed')}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-medium text-nd-text-display mb-2">
                {t(`portfolio.projects.${project.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-nd-text-secondary text-sm mb-5 leading-relaxed">
                {t(`portfolio.projects.${project.key}.description`)}
              </p>

              {/* Metrics — Nothing data row */}
              <div className="flex gap-4 pt-4 border-t border-nd-border">
                {project.metrics.map((m) => (
                  <div key={m.key} className="flex-1">
                    <div className="nothing-data text-sm tabular-nums">
                      {m.value}
                    </div>
                    <div className="nothing-label mt-0.5">
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
