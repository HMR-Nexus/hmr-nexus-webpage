import { useTranslation } from 'react-i18next';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';

interface Metric {
  key: string;
  value: string;
}

interface Project {
  key: string;
  gradient: string;
  accentColor: string;
  metrics: Metric[];
  status: 'completed' | 'active';
}

const projects: Project[] = [
  {
    key: 'celle',
    gradient: 'from-[#0066ff] to-[#00d4ff]',
    accentColor: '#00d4ff',
    status: 'completed',
    metrics: [
      { key: 'km',     value: '45' },
      { key: 'hup',    value: '320' },
      { key: 'months', value: '8' },
    ],
  },
  {
    key: 'suedheide',
    gradient: 'from-[#00d4ff] to-[#0066ff]',
    accentColor: '#3d8bff',
    status: 'completed',
    metrics: [
      { key: 'units',  value: '500+' },
      { key: 'km',     value: '28' },
      { key: 'ontime', value: '✓' },
    ],
  },
  {
    key: 'saas',
    gradient: 'from-[#a855f7] to-[#c084fc]',
    accentColor: '#c084fc',
    status: 'completed',
    metrics: [
      { key: 'cloud',     value: 'Cloud' },
      { key: 'available', value: '99.9%' },
      { key: 'languages', value: '3 Lang' },
    ],
  },
  {
    key: 'mdu',
    gradient: 'from-[#f59e0b] to-[#10b981]',
    accentColor: '#10b981',
    status: 'active',
    metrics: [
      { key: 'type',  value: 'MDU' },
      { key: 'level', value: 'NE4' },
      { key: 'start', value: '2026' },
    ],
  },
];

export function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <MotionSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d8bff] uppercase tracking-widest mb-3">
            <Briefcase className="w-4 h-4" />
            {t('portfolio.label')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('portfolio.title')}{' '}
            <span className="text-[#3d8bff]">{t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </MotionSection>

        {/* Project Cards 2×2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.key}
              variants={cardEntrance}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-300"
            >
              {/* Top gradient bar */}
              <div className={`h-[2px] bg-gradient-to-r ${project.gradient}`} />

              {/* Active project: subtle animated glow */}
              {project.status === 'active' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  animate={{ opacity: [0, 0.06, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}, transparent 70%)` }}
                />
              )}

              <div className="p-6">
                {/* Tag + status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white`}
                  >
                    {t(`portfolio.projects.${project.key}.tag`)}
                  </span>

                  {project.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-full border border-[#10b981]/20">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      {t('portfolio.status.active')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748b] bg-white/[0.04] px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      {t('portfolio.status.completed')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2">
                  {t(`portfolio.projects.${project.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-[#94a3b8] text-sm mb-5 leading-relaxed">
                  {t(`portfolio.projects.${project.key}.description`)}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {project.metrics.map((m) => (
                    <div key={m.key} className="bg-white/[0.04] rounded-lg p-2.5 text-center">
                      <div
                        className="font-bold text-sm"
                        style={{ color: project.accentColor }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[#64748b] text-[10px] mt-0.5">
                        {t(`portfolio.projects.${project.key}.metrics.${m.key}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
