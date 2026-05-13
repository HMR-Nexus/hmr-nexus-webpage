import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { staggerContainer, cardEntrance } from '@/lib/motion';
import { WorldMapSVG } from '@/components/WorldMapSVG';

interface Hub {
  id: 'germany' | 'colombia';
  code: string;
  country: string;
  city: string;
  role: string;
  description: string;
  timezone: string;
  focus: string[];
}

const mainRoute = 'M328 235 C382 118 462 73 525 108';
const softwareRoute = 'M328 235 C394 188 470 176 525 108';
const coordinationRoute = 'M328 235 C364 292 502 250 525 108';

export function DualMap() {
  const { t } = useTranslation();

  const hubs: Hub[] = [
    {
      id: 'germany',
      code: 'DE',
      country: t('dualMap.germany.country'),
      city: t('dualMap.germany.city'),
      role: t('dualMap.germany.role'),
      description: t('dualMap.germany.description'),
      timezone: 'CET · UTC+1',
      focus: [
        t('dualMap.germany.lanes.fiber'),
        t('dualMap.germany.lanes.quality'),
        t('dualMap.germany.lanes.client'),
      ],
    },
    {
      id: 'colombia',
      code: 'CO',
      country: t('dualMap.colombia.country'),
      city: t('dualMap.colombia.city'),
      role: t('dualMap.colombia.role'),
      description: t('dualMap.colombia.description'),
      timezone: 'COT · UTC-5',
      focus: [
        t('dualMap.colombia.lanes.software'),
        t('dualMap.colombia.lanes.ops'),
        t('dualMap.colombia.lanes.ai'),
      ],
    },
  ];

  return (
    <section id="geography" className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">04 · {t('dualMap.label')}</div>
            </div>
            <div>
              <h2>
                {t('dualMap.title')}<br/>
                <span className="text-paper/50">{t('dualMap.titleHighlight')}</span>
              </h2>
              <p style={{ marginTop: 24 }}>{t('dualMap.subtitle')}</p>
            </div>
          </div>
        </MotionSection>

        <MotionSection>
          <div className="grid lg:grid-cols-[1.22fr_0.78fr]" style={{ border: '1px solid var(--rule)' }}>
            <div className="relative min-h-[420px] md:min-h-[640px] overflow-hidden border-b lg:border-b-0 lg:border-r border-paper/10 bg-[#0A0B0D]">
              <WorldMapSVG className="absolute inset-0 h-full w-full opacity-95" />
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(245,243,238,0.30) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.22) 1px, transparent 1px)',
                  backgroundSize: '64px 64px',
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_53%_25%,rgba(255,77,46,0.08),transparent_23%),radial-gradient(circle_at_30%_48%,rgba(245,243,238,0.07),transparent_21%),linear-gradient(180deg,rgba(10,11,13,0.08)_0%,rgba(10,11,13,0.62)_100%)]" />

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="World map showing operational route between Colombia and Germany">
                <defs>
                  <linearGradient id="routeMain" x1="328" y1="235" x2="525" y2="108" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5F3EE" stopOpacity="0.86" />
                    <stop offset="1" stopColor="#FF4D2E" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="routeSoft" x1="328" y1="235" x2="525" y2="108" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5F3EE" stopOpacity="0.38" />
                    <stop offset="1" stopColor="#F5F3EE" stopOpacity="0.72" />
                  </linearGradient>
                  <filter id="mapNodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path d={mainRoute} fill="none" stroke="rgba(245,243,238,0.14)" strokeWidth="5.5" strokeLinecap="round" />
                <motion.path
                  d={softwareRoute}
                  fill="none"
                  stroke="rgba(245,243,238,0.14)"
                  strokeWidth="1.2"
                  strokeDasharray="4 10"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -28] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d={coordinationRoute}
                  fill="none"
                  stroke="rgba(255,77,46,0.20)"
                  strokeWidth="1.2"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -32] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d={mainRoute}
                  fill="none"
                  stroke="url(#routeMain)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d={softwareRoute}
                  fill="none"
                  stroke="url(#routeSoft)"
                  strokeWidth="1.7"
                  strokeDasharray="7 9"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.78 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d={coordinationRoute}
                  fill="none"
                  stroke="#FF4D2E"
                  strokeWidth="1.5"
                  strokeDasharray="5 11"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.52 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.path
                  d={mainRoute}
                  fill="none"
                  stroke="#F5F3EE"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeDasharray="1 210"
                  animate={{ strokeDashoffset: [60, -260], opacity: [0, 0.82, 0] }}
                  transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d={coordinationRoute}
                  fill="none"
                  stroke="#FF4D2E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="1 190"
                  animate={{ strokeDashoffset: [-120, 190], opacity: [0, 0.62, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                />

                <motion.circle cx="396" cy="132" r="3.2" fill="#F5F3EE" initial={{ opacity: 0 }} whileInView={{ opacity: 0.82 }} viewport={{ once: true }} transition={{ delay: 0.7 }} />
                <motion.circle cx="450" cy="94" r="2.6" fill="rgba(245,243,238,0.68)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.85 }} />

                <g transform="translate(328 235)">
                  <motion.circle
                    r="34"
                    fill="rgba(245,243,238,0.025)"
                    stroke="rgba(245,243,238,0.24)"
                    strokeWidth="1"
                    initial={{ scale: 0.82, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                  />
                  <motion.circle
                    r="24"
                    fill="none"
                    stroke="rgba(245,243,238,0.26)"
                    strokeWidth="1"
                    animate={{ scale: [0.75, 1.65], opacity: [0.42, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <circle r="10" fill="#0A0B0D" stroke="#F5F3EE" strokeWidth="3" filter="url(#mapNodeGlow)" />
                  <circle r="3" fill="#F5F3EE" />
                  <path d="M14 -16L66 -58" stroke="rgba(245,243,238,0.34)" strokeWidth="1" />
                  <rect x="68" y="-84" width="138" height="52" fill="rgba(10,11,13,0.92)" stroke="rgba(245,243,238,0.22)" />
                  <text x="84" y="-62" fill="rgba(245,243,238,0.9)" fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="1.4">COLOMBIA</text>
                  <text x="84" y="-44" fill="rgba(245,243,238,0.48)" fontFamily="JetBrains Mono, monospace" fontSize="10">software · ops</text>
                </g>

                <g transform="translate(525 108)">
                  <motion.circle
                    r="40"
                    fill="rgba(255,77,46,0.035)"
                    stroke="rgba(255,77,46,0.34)"
                    strokeWidth="1"
                    initial={{ scale: 0.82, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.16 }}
                  />
                  <motion.circle
                    r="27"
                    fill="none"
                    stroke="rgba(255,77,46,0.32)"
                    strokeWidth="1"
                    animate={{ scale: [0.72, 1.72], opacity: [0.5, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
                  />
                  <circle r="11" fill="#0A0B0D" stroke="#FF4D2E" strokeWidth="3" filter="url(#mapNodeGlow)" />
                  <circle r="3.5" fill="#FF4D2E" />
                  <path d="M16 13L70 48" stroke="rgba(255,77,46,0.38)" strokeWidth="1" />
                  <rect x="72" y="26" width="132" height="52" fill="rgba(10,11,13,0.84)" stroke="rgba(255,77,46,0.28)" />
                  <text x="88" y="48" fill="#FF4D2E" fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="1.4">GERMANY</text>
                  <text x="88" y="66" fill="rgba(245,243,238,0.52)" fontFamily="JetBrains Mono, monospace" fontSize="10">field delivery</text>
                </g>
              </svg>

              <div className="absolute left-5 top-5 border border-paper/10 bg-ink/70 px-3 py-2 mono-tag text-paper/55 backdrop-blur-sm">OPERATIONS MAP · CO ⇄ DE</div>
              <div className="absolute bottom-5 left-5 right-5 grid sm:grid-cols-3 border border-paper/10 bg-ink/86 backdrop-blur-md">
                <div className="p-4 border-b sm:border-b-0 sm:border-r border-paper/10">
                  <div className="mono-tag text-paper/40">01 · FIELD</div>
                  <div className="font-display text-[18px] text-paper">{t('dualMap.flow.field')}</div>
                </div>
                <div className="p-4 border-b sm:border-b-0 sm:border-r border-paper/10">
                  <div className="mono-tag text-paper/40">02 · SOFTWARE</div>
                  <div className="font-display text-[18px] text-paper">{t('dualMap.flow.software')}</div>
                </div>
                <div className="p-4">
                  <div className="mono-tag text-paper/40">03 · CONTROL</div>
                  <div className="font-display text-[18px] text-[color:var(--accent)]">{t('dualMap.flow.control')}</div>
                </div>
              </div>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {hubs.map((hub, idx) => (
                <motion.div
                  key={hub.id}
                  variants={cardEntrance}
                  className="p-7 md:p-9"
                  style={{ borderTop: idx === 0 ? 'none' : '1px solid var(--rule)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="mono-tag text-paper/45">{hub.code} · {hub.role}</span>
                    <span className={hub.id === 'germany' ? 'mono-tag text-[color:var(--accent)]' : 'mono-tag text-paper/60'}>{hub.timezone}</span>
                  </div>
                  <div className="mono-tag text-paper/40 mb-3">{hub.country}</div>
                  <h3 className="font-display text-paper" style={{ fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 0.92, letterSpacing: '-0.035em', fontWeight: 400 }}>
                    {hub.city}
                  </h3>
                  <p className="text-paper/75 text-[15px] leading-[1.6] mt-4 mb-6 max-w-[54ch]">
                    {hub.description}
                  </p>
                  <div className="grid gap-2">
                    {hub.focus.map((item) => (
                      <div key={item} className="flex items-center gap-3 border border-paper/10 px-3 py-2.5">
                        <span className={hub.id === 'germany' ? 'h-1.5 w-1.5 bg-[color:var(--accent)]' : 'h-1.5 w-1.5 bg-paper/70'} />
                        <span className="mono-tag text-paper/65">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
