import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { WorldMapSVG, germanyPath, colombiaPath } from '@/components/WorldMapSVG';
import { staggerContainer, cardEntrance } from '@/lib/motion';

/* ─── Types ─────────────────────────────────────────────────── */

interface Location {
  id: 'germany' | 'colombia';
  city: string;
  role: string;
  description: string;
  timezone: string;
  phone: string;
  email: string;
  labelPos: { x: number; y: number };
  countryPath: string;
  stats: { label: string; value: string }[];
}

/* ─── Component ────────────────────────────────────────────── */

/**
 * NEXUS DualMap — 06 · Two countries, one vision.
 * Editorial world map with accent highlight on Germany (HQ),
 * paper tint on Colombia (dev hub).
 */
export function DualMap() {
  const { t } = useTranslation();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const locations: Location[] = [
    {
      id: 'germany',
      city: t('dualMap.germany.city'),
      role: t('dualMap.germany.role'),
      description: t('dualMap.germany.description'),
      timezone: 'CET · UTC+1',
      phone: '+49 176 31524448',
      email: 'info@hmr-nexus.com',
      labelPos: { x: 516, y: 78 },
      countryPath: germanyPath,
      stats: [],
    },
    {
      id: 'colombia',
      city: t('dualMap.colombia.city'),
      role: t('dualMap.colombia.role'),
      description: t('dualMap.colombia.description'),
      timezone: 'COT · UTC-5',
      phone: '+57 · on request',
      email: 'info@hmr-nexus.com',
      labelPos: { x: 287, y: 258 },
      countryPath: colombiaPath,
      stats: [],
    },
  ];

  const connectionPath = 'M 287,236 Q 420,140 516,100';

  return (
    <section className="bg-ink text-paper py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-7">
        {/* Section head — brand pattern */}
        <MotionSection>
          <div className="section-head">
            <div>
              <div className="meta">06 · {t('dualMap.label')}</div>
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

        {/* Map Container */}
        <MotionSection className="relative">
          <div
            className="relative aspect-[16/9] overflow-hidden bg-ink"
            style={{ border: '1px solid var(--rule)' }}
          >
            <WorldMapSVG className="absolute inset-0 w-full h-full" />

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Germany — accent highlight */}
              <motion.path
                d={germanyPath}
                fill="rgba(255,77,46,0.22)"
                stroke="#FF4D2E"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onMouseEnter={() => setActiveLocation('germany')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />
              <circle cx="516" cy="100" r="3.5" fill="#FF4D2E" />

              {/* Colombia — paper/bone tint */}
              <motion.path
                d={colombiaPath}
                fill="rgba(245,243,238,0.10)"
                stroke="#EAE6DC"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                onMouseEnter={() => setActiveLocation('colombia')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />
              <circle cx="287" cy="236" r="3.5" fill="#EAE6DC" />

              {/* Connection line */}
              <motion.path
                d={connectionPath}
                stroke="rgba(245,243,238,0.22)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="6,4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />

              {/* Labels — mono-tag style */}
              {locations.map((loc) => (
                <g key={`label-${loc.id}`}>
                  <rect
                    x={loc.labelPos.x - 52}
                    y={loc.labelPos.y - 14}
                    width="104"
                    height="30"
                    fill="#0A0B0D"
                    stroke="rgba(245,243,238,0.24)"
                    strokeWidth="0.6"
                  />
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 1}
                    textAnchor="middle"
                    fill="#F5F3EE"
                    fontSize="8"
                    fontWeight="500"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.14em"
                  >
                    {loc.city.toUpperCase()}
                  </text>
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 12}
                    textAnchor="middle"
                    fill="#9A9A94"
                    fontSize="6"
                    fontWeight="400"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.1em"
                  >
                    {loc.role.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Info cards — editorial, mono, no rounded */}
          <motion.div
            className="grid md:grid-cols-2 -mt-px"
            style={{ border: '1px solid var(--rule)' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {locations.map((location, idx) => {
              const isDE = location.id === 'germany';
              return (
                <motion.div
                  key={location.id}
                  variants={cardEntrance}
                  className="p-8 md:p-10 transition-colors duration-200"
                  style={{
                    borderLeft: idx === 0 ? 'none' : '1px solid var(--rule)',
                    background: activeLocation === location.id ? 'rgba(245,243,238,0.02)' : 'transparent',
                  }}
                >
                  {/* Top: 06.N + role */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="mono-tag text-paper/45">
                      06.{idx + 1} · {location.role.toUpperCase()}
                    </span>
                    <span
                      className={`mono-tag ${isDE ? 'text-[color:var(--accent)]' : 'text-paper/60'}`}
                    >
                      {isDE ? 'HQ · DE' : 'ROADMAP · CO'}
                    </span>
                  </div>

                  {/* City as display */}
                  <h3
                    className="font-display text-paper"
                    style={{
                      fontSize: 'clamp(40px, 5vw, 72px)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.035em',
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {location.city}
                  </h3>

                  <p className="text-paper/70 text-[14px] leading-[1.55] mt-4 mb-6 max-w-[52ch]">
                    {location.description}
                  </p>

                  {/* Stats row — only render when stats exist */}
                  {location.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 py-4 rule-top rule-bottom mb-5">
                      {location.stats.map((stat, i) => (
                        <div key={i}>
                          <div
                            className="font-display text-paper tabular-nums"
                            style={{ fontSize: 28, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 500 }}
                          >
                            {stat.value}
                          </div>
                          <div className="mono-tag text-paper/45 mt-1.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact block — mono grid */}
                  <div className="space-y-1.5 mono-tag text-paper/65">
                    <div className="flex gap-4">
                      <span className="text-paper/40 w-14">TZ</span>
                      <span>{location.timezone}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-paper/40 w-14">TEL</span>
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-paper/40 w-14">MAIL</span>
                      <a
                        href={`mailto:${location.email}`}
                        className="text-paper/90 hover:text-[color:var(--accent)] transition-colors"
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </MotionSection>
      </div>
    </section>
  );
}
