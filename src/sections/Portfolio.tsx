import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
  accent: 'laser' | 'paper';
  visual?: string;
}

const projects: Project[] = [
  {
    key: 'ne3', status: 'active', accent: 'laser', visual: '/assets/projects/ne3-distribution-render.jpg',
    metrics: [{ key: 'stage', value: 'NE3' }, { key: 'region', value: 'DE' }, { key: 'year', value: '2026' }],
  },
  {
    key: 'ne4', status: 'active', accent: 'laser', visual: '/assets/projects/ne4-ftth-connection-render.jpg',
    metrics: [{ key: 'stage', value: 'NE4' }, { key: 'region', value: 'DE' }, { key: 'year', value: '2026' }],
  },
  {
    key: 'nas', status: 'active', accent: 'paper', visual: '/assets/projects/nas-access-site-render.jpg',
    metrics: [{ key: 'stage', value: 'NAS' }, { key: 'region', value: 'DE' }, { key: 'year', value: '2026' }],
  },
  {
    key: 'densification', status: 'active', accent: 'paper', visual: '/assets/projects/ftth-densification-render.jpg',
    metrics: [{ key: 'stage', value: 'FTTH' }, { key: 'type', value: 'LAST' }, { key: 'year', value: '2026' }],
  },
];

const detailSteps = ['step1', 'step2', 'step3', 'step4'];
const detailOutputs = ['output1', 'output2', 'output3'];
const detailSignals = ['signal1', 'signal2', 'signal3'];

function getProject(key: string) {
  return projects.find((project) => project.key === key) ?? projects[0];
}

function FieldConnectionGraphic({ project }: { project: Project }) {
  const isNe4 = project.key === 'ne4';
  const isNas = project.key === 'nas';
  const accent = project.accent === 'laser' ? '#FF4D2E' : '#F5F3EE';

  if (isNe4) {
    return (
      <div className="relative border border-paper/10 bg-paper/[0.025] p-5 md:p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(245,243,238,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.45) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <svg className="relative w-full h-[250px] md:h-[320px]" viewBox="0 0 760 320" role="img" aria-hidden="true">
          <defs>
            <filter id="ne4-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M22 274H738" stroke="rgba(245,243,238,.18)" strokeWidth="2" />
          <path d="M86 274V214H184V274" fill="rgba(245,243,238,.035)" stroke="rgba(245,243,238,.22)" />
          <text x="135" y="203" textAnchor="middle" fill="rgba(245,243,238,.55)" fontFamily="JetBrains Mono, monospace" fontSize="11">DP</text>
          <path d="M284 274V108L376 48L468 108V274Z" fill="rgba(245,243,238,.035)" stroke="rgba(245,243,238,.22)" />
          <path d="M284 164H468M376 48V274" stroke="rgba(245,243,238,.1)" />
          <path d="M542 274V72H682V274Z" fill="rgba(245,243,238,.035)" stroke="rgba(245,243,238,.22)" />
          <path d="M542 138H682M542 206H682M612 72V274" stroke="rgba(245,243,238,.1)" />
          <motion.path d="M135 214 C198 204 224 250 282 248 L330 248 L330 218 L376 218 L376 126 L422 126" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="square" filter="url(#ne4-glow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
          <motion.path d="M135 214 C238 194 508 244 578 238 L578 108 L646 108" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="square" strokeDasharray="10 9" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .72 }} transition={{ duration: 1.15, delay: .2 }} />
          {[
            ['HÜP', 330, 218], ['GF-TA', 422, 126], ['ONT', 454, 126], ['RISER', 578, 174], ['GF-TA', 646, 108], ['DP', 135, 214]
          ].map(([label, x, y], index) => (
            <motion.g key={`${label}-${x}`} initial={{ opacity: 0, transform: 'translateY(8px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ delay: .15 + index * .06 }}>
              <rect x={Number(x) - 31} y={Number(y) - 17} width="62" height="28" fill="#0A0B0D" stroke={index === 2 ? 'rgba(245,243,238,.22)' : accent} />
              <text x={Number(x)} y={Number(y) + 4} textAnchor="middle" fill="rgba(245,243,238,.82)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing=".08em">{label}</text>
            </motion.g>
          ))}
          <text x="376" y="302" textAnchor="middle" fill="rgba(245,243,238,.45)" fontFamily="JetBrains Mono, monospace" fontSize="11">single-family route · basement entry → fiber outlet</text>
          <text x="612" y="302" textAnchor="middle" fill="rgba(245,243,238,.45)" fontFamily="JetBrains Mono, monospace" fontSize="11">multi-dwelling · DP → riser → units</text>
        </svg>
      </div>
    );
  }

  if (isNas) {
    return (
      <div className="relative border border-paper/10 bg-paper/[0.025] p-5 md:p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(245,243,238,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.45) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <svg className="relative w-full h-[250px] md:h-[320px]" viewBox="0 0 760 320" role="img" aria-hidden="true">
          <defs>
            <filter id="nas-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M28 262H732" stroke="rgba(245,243,238,.16)" strokeWidth="2" />
          <path d="M62 262C126 238 188 248 238 262" fill="none" stroke="rgba(245,243,238,.12)" strokeWidth="18" />
          <text x="118" y="238" textAnchor="middle" fill="rgba(245,243,238,.58)" fontFamily="JetBrains Mono, monospace" fontSize="11">ACOMETIDA</text>
          <path d="M286 262V116L378 56L470 116V262Z" fill="rgba(245,243,238,.035)" stroke="rgba(245,243,238,.22)" />
          <path d="M286 166H470M378 56V262" stroke="rgba(245,243,238,.1)" />
          <path d="M548 262V90H682V262Z" fill="rgba(245,243,238,.035)" stroke="rgba(245,243,238,.22)" />
          <path d="M548 148H682M548 206H682M615 90V262" stroke="rgba(245,243,238,.1)" />
          <path d="M182 252C236 226 272 218 318 226" fill="none" stroke="rgba(245,243,238,.18)" strokeWidth="28" strokeLinecap="square" />
          <text x="246" y="210" textAnchor="middle" fill="rgba(245,243,238,.5)" fontFamily="JetBrains Mono, monospace" fontSize="10">GARDEN ROUTE</text>
          <motion.path d="M90 248 C166 240 214 228 260 232 L320 232 L320 214 L378 214 L378 130 L426 130" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="square" filter="url(#nas-glow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
          <motion.path d="M90 248 C212 232 508 240 580 226 L580 120 L648 120" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="square" strokeDasharray="10 9" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .72 }} transition={{ duration: 1.15, delay: .2 }} />
          {[
            ['WALL ENTRY', 320, 232, 84], ['HÜP', 378, 214, 62], ['GF-TA', 426, 130, 62], ['ONT', 456, 130, 62], ['RISER', 580, 178, 70], ['GF-TA', 648, 120, 62]
          ].map(([label, x, y, w], index) => (
            <motion.g key={`${label}-${x}`} initial={{ opacity: 0, transform: 'translateY(8px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ delay: .15 + index * .06 }}>
              <rect x={Number(x) - Number(w) / 2} y={Number(y) - 17} width={Number(w)} height="28" fill="#0A0B0D" stroke={index === 3 ? 'rgba(245,243,238,.22)' : accent} />
              <text x={Number(x)} y={Number(y) + 4} textAnchor="middle" fill="rgba(245,243,238,.82)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing=".06em">{label}</text>
            </motion.g>
          ))}
          <text x="376" y="302" textAnchor="middle" fill="rgba(245,243,238,.45)" fontFamily="JetBrains Mono, monospace" fontSize="11">customer connection · garden route → wall entry → equipment</text>
          <text x="612" y="302" textAnchor="middle" fill="rgba(245,243,238,.45)" fontFamily="JetBrains Mono, monospace" fontSize="11">equipment mounting · GF-TA / ONT · photo QA</text>
        </svg>
      </div>
    );
  }

  return <WorkFlowGraphic project={project} />;
}

function WorkFlowGraphic({ project }: { project: Project }) {
  const accent = project.accent === 'laser' ? '#FF4D2E' : '#F5F3EE';

  return (
    <div className="relative border border-paper/10 bg-paper/[0.025] p-5 md:p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.09]" style={{ backgroundImage: 'linear-gradient(rgba(245,243,238,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.45) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <svg className="relative w-full h-[240px] md:h-[300px]" viewBox="0 0 760 300" role="img" aria-hidden="true">
        <defs>
          <linearGradient id={`flow-${project.key}`} x1="80" y1="150" x2="680" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(245,243,238,0.55)" />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
          <filter id={`soft-${project.key}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M80 150 C170 74 250 226 340 150 S520 74 680 150"
          fill="none"
          stroke={`url(#flow-${project.key})`}
          strokeWidth="3"
          strokeDasharray="12 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
        {[80, 250, 510, 680].map((x, i) => (
          <motion.g key={x} initial={{ opacity: 0, transform: 'translateY(10px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ delay: 0.12 * i, duration: 0.35 }}>
            <circle cx={x} cy={i % 2 ? 200 : 100} r="42" fill="rgba(10,11,13,0.92)" stroke="rgba(245,243,238,0.2)" />
            <circle cx={x} cy={i % 2 ? 200 : 100} r="8" fill={i === 3 ? accent : '#F5F3EE'} filter={`url(#soft-${project.key})`} />
            <text x={x} y={(i % 2 ? 200 : 100) + 70} textAnchor="middle" fill="rgba(245,243,238,0.65)" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="0.08em">0{i + 1}</text>
          </motion.g>
        ))}
        <motion.rect x="55" y="26" width="650" height="248" fill="none" stroke="rgba(245,243,238,0.10)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      </svg>
    </div>
  );
}

function ProjectDetailWindow({ projectKey, onClose }: { projectKey: string; onClose: () => void }) {
  const { t } = useTranslation();
  const project = getProject(projectKey);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-ink/88 backdrop-blur-md px-4 py-5 md:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-detail-${project.key}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="relative mx-auto max-w-[1180px] border border-paper/15 bg-[#0A0B0D] text-paper shadow-2xl"
        initial={{ opacity: 0, transform: 'translateY(18px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        exit={{ opacity: 0, transform: 'translateY(12px)' }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper/10 bg-[#0A0B0D]/94 backdrop-blur px-5 py-4 md:px-7">
          <div className="mono-tag text-paper/50">{t(`portfolio.projects.${project.key}.tag`)} · {t('portfolio.detail.window')}</div>
          <button onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center border border-paper/15 text-paper/70 hover:text-paper hover:border-[color:var(--accent)] transition-colors" aria-label={t('portfolio.detail.close')}>
            <X size={18} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="p-6 md:p-9 border-b lg:border-b-0 lg:border-r border-paper/10">
            <div className="mono-tag text-[color:var(--accent)] mb-5">{project.metrics[0].value} · {t(`portfolio.projects.${project.key}.metrics.${project.metrics[0].key}`)}</div>
            <h3 id={`project-detail-${project.key}`} className="font-display text-paper" style={{ fontSize: 'clamp(42px, 7vw, 92px)', lineHeight: 0.87, letterSpacing: '-0.045em', fontWeight: 300 }}>
              {t(`portfolio.projects.${project.key}.title`)}
            </h3>
            <p className="mt-7 text-paper/76 text-[16px] leading-[1.65] max-w-[62ch]">
              {t(`portfolio.projects.${project.key}.detail.intro`)}
            </p>

            <div className="grid grid-cols-3 mt-8 border border-paper/10">
              {project.metrics.map((metric) => (
                <div key={metric.key} className="p-4 border-r border-paper/10 last:border-r-0">
                  <div className="font-display text-[28px] leading-none text-paper">{metric.value}</div>
                  <div className="mono-tag text-paper/45 mt-2">{t(`portfolio.projects.${project.key}.metrics.${metric.key}`)}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="mono-tag text-paper/45 mb-3">{t('portfolio.detail.outputs')}</div>
              <div className="grid gap-2">
                {detailOutputs.map((item) => (
                  <div key={item} className="flex gap-3 border border-paper/10 px-3 py-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--accent)]" />
                    <span className="text-paper/73 text-[14px] leading-[1.45]">{t(`portfolio.projects.${project.key}.detail.${item}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-9">
            {project.visual && (
              <div className="relative mb-5 overflow-hidden border border-paper/10 bg-paper/[0.025]">
                <img src={project.visual} alt="" className="h-auto w-full opacity-100" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/35 via-transparent to-transparent" />
              </div>
            )}
            <FieldConnectionGraphic project={project} />

            <div className="mt-8 grid md:grid-cols-4 gap-3">
              {detailSteps.map((step, index) => (
                <motion.div
                  key={step}
                  className="border border-paper/10 bg-paper/[0.025] p-4 min-h-[132px]"
                  initial={{ opacity: 0, transform: 'translateY(12px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.28 }}
                >
                  <div className="mono-tag text-paper/38 mb-4">0{index + 1}</div>
                  <p className="text-paper/78 text-[13px] leading-[1.5]">{t(`portfolio.projects.${project.key}.detail.${step}`)}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-3 border border-paper/10">
              {detailSignals.map((signal, index) => (
                <div key={signal} className="p-5 border-b md:border-b-0 md:border-r border-paper/10 last:border-r-0 last:border-b-0">
                  <motion.div
                    className="h-1 bg-paper/10 mb-4 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.24 + index * 0.08 }}
                  >
                    <motion.div
                      className="h-full bg-[color:var(--accent)]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${64 + index * 12}%` }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                  <div className="mono-tag text-paper/45 mb-2">{t('portfolio.detail.signal')} 0{index + 1}</div>
                  <p className="text-paper/74 text-[13px] leading-[1.5]">{t(`portfolio.projects.${project.key}.detail.${signal}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const { t } = useTranslation();
  const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null);

  return (
    <section id="portfolio" className="bg-ink text-paper py-16 md:py-20 pt-28 md:pt-32 min-h-[calc(100svh-80px)]">
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
              <p style={{ marginTop: 24 }}>{t('portfolio.subtitle')}</p>
            </div>
          </div>
        </MotionSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 xl:grid-cols-4"
          style={{ border: '1px solid var(--rule)' }}
        >
          {projects.map((project, idx) => (
            <motion.button
              type="button"
              key={project.key}
              variants={cardEntrance}
              onClick={() => setActiveProjectKey(project.key)}
              className="group p-5 md:p-6 hover:bg-paper/[0.025] transition-colors duration-300 text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--accent)] flex flex-col min-h-[430px]"
              style={{
                borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)',
              }}
            >
              <div className="flex items-center justify-between mb-4 gap-4">
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

              {project.visual && (
                <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-paper/10 bg-paper/[0.025]">
                  <img
                    src={project.visual}
                    alt=""
                    className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0B0D]/65 via-[#0A0B0D]/10 to-transparent" />
                </div>
              )}

              <div className="mono-tag text-[color:var(--accent)] mb-2">
                {project.metrics[0].value} · {t(`portfolio.projects.${project.key}.metrics.${project.metrics[0].key}`)}
              </div>
              <h3 className="font-display text-paper text-[24px] leading-[1] tracking-[-0.025em] font-medium mb-3">
                {t(`portfolio.projects.${project.key}.title`)}
              </h3>
              <p className="text-paper/65 text-[14px] leading-[1.55] mb-5">
                {t(`portfolio.projects.${project.key}.description`)}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 rule-top mt-auto">
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
              <div className="mt-5 mono-tag text-paper/40 group-hover:text-[color:var(--accent)] transition-colors">{t('portfolio.detail.open')}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProjectKey && (
          <ProjectDetailWindow projectKey={activeProjectKey} onClose={() => setActiveProjectKey(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
