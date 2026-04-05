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
    <section id="portfolio" className="py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <MotionSection className="mb-20 md:mb-28">
          <span className="nothing-label block mb-4">{t('portfolio.label')}</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-nd-text-display leading-[1.05]">
            {t('portfolio.title')}{' '}
            <span className="text-nd-text-secondary">{t('portfolio.titleHighlight')}</span>
          </h2>
        </MotionSection>

        {/* Projects — data-first asymmetric grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-px bg-nd-border rounded-lg overflow-hidden"
        >
          {projects.map((project) => (
            <motion.div
              key={project.key}
              variants={cardEntrance}
              className="bg-nd-black p-8 md:p-10 hover:bg-nd-surface transition-colors duration-300"
            >
              {/* Tag + status */}
              <div className="flex items-center justify-between mb-6">
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

              {/* Big hero metric — the first metric gets star treatment */}
              <div className="mb-6">
                <div className="nothing-data text-5xl md:text-6xl tabular-nums mb-1">
                  {project.metrics[0].value}
                </div>
                <div className="nothing-label text-nd-text-disabled">
                  {t(`portfolio.projects.${project.key}.metrics.${project.metrics[0].key}`)}
                </div>
              </div>

              {/* Title + description */}
              <h3 className="text-lg font-medium text-nd-text-display mb-2">
                {t(`portfolio.projects.${project.key}.title`)}
              </h3>
              <p className="text-nd-text-secondary text-sm mb-6 leading-relaxed">
                {t(`portfolio.projects.${project.key}.description`)}
              </p>

              {/* Secondary metrics */}
              <div className="flex gap-6 pt-4 border-t border-nd-border">
                {project.metrics.slice(1).map((m) => (
                  <div key={m.key}>
                    <div className="nothing-data text-base tabular-nums">{m.value}</div>
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
