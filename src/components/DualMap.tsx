import { useTranslation } from 'react-i18next';
import { Clock, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MotionSection } from '@/components/MotionSection';
import { WorldMapSVG, germanyPath, colombiaPath } from '@/components/WorldMapSVG';
import { staggerContainer, cardEntrance } from '@/lib/motion';

/* ─── SVG Flag components ────────────────────────────────────── */

function FlagDE({ size = 56 }: { size?: number }) {
  const r = size / 2;
  const id = 'clip-de';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs><clipPath id={id}><circle cx={r} cy={r} r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <rect y={0} width={size} height={size / 3} fill="#000000" />
        <rect y={size / 3} width={size} height={size / 3} fill="#DD0000" />
        <rect y={(size / 3) * 2} width={size} height={size / 3} fill="#FFCE00" />
      </g>
    </svg>
  );
}

function FlagCO({ size = 56 }: { size?: number }) {
  const r = size / 2;
  const id = 'clip-co';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs><clipPath id={id}><circle cx={r} cy={r} r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <rect y={0} width={size} height={size / 2} fill="#FCD116" />
        <rect y={size / 2} width={size} height={size / 4} fill="#003893" />
        <rect y={(size / 4) * 3} width={size} height={size / 4} fill="#CE1126" />
      </g>
    </svg>
  );
}

/* ─── Types ─────────────────────────────────────────────────── */

interface Location {
  id: string;
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

export function DualMap() {
  const { t } = useTranslation();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const locations: Location[] = [
    {
      id: 'germany',
      city: t('dualMap.germany.city'),
      role: t('dualMap.germany.role'),
      description: t('dualMap.germany.description'),
      timezone: 'CET (UTC+1)',
      phone: '+49 176 31524448',
      email: 'info@hmr-nexus.com',
      labelPos: { x: 516, y: 78 },
      countryPath: germanyPath,
      stats: [
        { value: '15+', label: t('dualMap.germany.stats.fiber') },
        { value: '100%', label: t('dualMap.germany.stats.quality') },
      ],
    },
    {
      id: 'colombia',
      city: t('dualMap.colombia.city'),
      role: t('dualMap.colombia.role'),
      description: t('dualMap.colombia.description'),
      timezone: 'COT (UTC-5)',
      phone: '+57 ...',
      email: 'latam@hmr-nexus.com',
      labelPos: { x: 287, y: 258 },
      countryPath: colombiaPath,
      stats: [
        { value: '150+', label: t('dualMap.colombia.stats.connections') },
        { value: '24/7', label: t('dualMap.colombia.stats.support') },
      ],
    },
  ];

  const connectionPath = 'M 287,236 Q 420,140 516,100';

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="mb-10">
          <span className="nothing-label block mb-3">{t('dualMap.label')}</span>
          <h2 className="text-3xl md:text-4xl font-light text-nd-text-display mb-3">
            {t('dualMap.title')}{' '}
            <span className="text-nd-text-secondary">{t('dualMap.titleHighlight')}</span>
          </h2>
          <p className="text-nd-text-secondary max-w-xl">{t('dualMap.subtitle')}</p>
        </MotionSection>

        {/* Map Container — Nothing: monochrome, Nexus blue as single accent */}
        <MotionSection className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-nd-border bg-nd-surface">
            <WorldMapSVG className="absolute inset-0 w-full h-full" />

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Germany — Nexus blue highlight (the one accent moment) */}
              <motion.path
                d={germanyPath}
                fill="rgba(0,102,255,0.2)"
                stroke="#0066ff"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onMouseEnter={() => setActiveLocation('germany')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />

              {/* Germany ping */}
              <circle cx="516" cy="100" r="3" fill="#0066ff" />

              {/* Colombia — white/gray */}
              <motion.path
                d={colombiaPath}
                fill="rgba(232,232,232,0.1)"
                stroke="#E8E8E8"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                onMouseEnter={() => setActiveLocation('colombia')}
                onMouseLeave={() => setActiveLocation(null)}
                className="cursor-pointer"
              />

              {/* Colombia ping */}
              <circle cx="287" cy="236" r="3" fill="#E8E8E8" />

              {/* Connection line — dashed, monochrome */}
              <motion.path
                d={connectionPath}
                stroke="#333333"
                strokeWidth="1"
                fill="none"
                strokeDasharray="6,4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />

              {/* Labels */}
              {locations.map((loc) => (
                <g key={`label-${loc.id}`}>
                  <rect
                    x={loc.labelPos.x - 48}
                    y={loc.labelPos.y - 12}
                    width="96"
                    height="28"
                    rx="2"
                    fill="rgba(17,17,17,0.9)"
                    stroke="#333333"
                    strokeWidth="0.5"
                  />
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 1}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8"
                    fontWeight="400"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="0.08em"
                  >
                    {loc.city.toUpperCase()}
                  </text>
                  <text
                    x={loc.labelPos.x}
                    y={loc.labelPos.y + 12}
                    textAnchor="middle"
                    fill="#999999"
                    fontSize="6"
                    fontWeight="400"
                    fontFamily="Space Mono, monospace"
                    letterSpacing="0.06em"
                  >
                    {loc.role.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Info Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-px bg-nd-border mt-px rounded-b-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {locations.map((location) => (
              <motion.div
                key={location.id}
                variants={cardEntrance}
                className={`bg-nd-surface p-6 transition-colors duration-200 ${
                  activeLocation === location.id ? 'bg-nd-surface-raised' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    {location.id === 'germany' ? <FlagDE size={32} /> : <FlagCO size={32} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-nd-text-display">{location.city}</h4>
                    <p className="nothing-label">{location.role}</p>
                  </div>
                </div>

                <p className="text-nd-text-secondary text-sm mb-4">{location.description}</p>

                <div className="flex gap-4 mb-4">
                  {location.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="nothing-data text-sm tabular-nums">{stat.value}</div>
                      <div className="nothing-label mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-3 border-t border-nd-border">
                  <div className="flex items-center gap-2 text-nd-text-disabled text-xs">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="font-mono">{location.timezone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-nd-text-disabled text-xs">
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="font-mono">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-nd-text-disabled text-xs">
                    <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span className="font-mono">{location.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>
      </div>
    </section>
  );
}
