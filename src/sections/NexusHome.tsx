import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { PageId } from '@/lib/navigation';
import { consumePendingAnchor } from '@/lib/navAnchor';
import type { LegalPage } from '@/components/LegalOverlay';

interface NexusHomeProps {
  onNavigate: (page: PageId) => void;
  onLegal?: (page: LegalPage) => void;
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Animated counter hook ─────────────────────────── */
function useCounter(target: number, dec = 0, suffix = '', trigger: boolean) {
  const [val, setVal] = useState(() => prefersReduced() ? target.toFixed(dec) + suffix : '0');
  useEffect(() => {
    if (!trigger) return;
    if (prefersReduced()) {
      requestAnimationFrame(() => setVal(target.toFixed(dec) + suffix));
      return;
    }
    const dur = 1500;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setVal(target * ease(p) < target ? (target * ease(p)).toFixed(dec) + suffix : target.toFixed(dec) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, dec, suffix]);
  return val;
}

/* ── Intersection reveal hook ──────────────────────── */
function useReveal(threshold = 0.16) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() => prefersReduced());
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Stats row ─────────────────────────────────────── */
function StatItem({ value, dec, suffix, label, hl }: {
  value: number; dec?: number; suffix?: string; label: string; hl?: boolean;
}) {
  const { ref, visible } = useReveal(0.5);
  const display = useCounter(value, dec ?? 0, suffix ?? '', visible);
  return (
    <div className="ns-stat" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`num ${hl ? 'hl' : ''}`}>{display}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

/* ── Terminal ──────────────────────────────────────── */
const TERMINAL_LINES = [
  { l: 'project', v: 'FTTH Celle-Ost', cls: '' },
  { l: 'segment', v: 'NE3 / NE4 · K-042', cls: '' },
  { l: 'cable',   v: '144F SMF-28e', cls: '' },
  { l: 'blown',   v: '917 m / 1 200 m · 76%', cls: '' },
  { l: 'loss',    v: '0.04 dB ✓ within spec', cls: 'ok' },
  { l: 'crew',    v: 'TEAM KILO · 04 ops', cls: '' },
  { l: 'eta',     v: '2026-04-22', cls: '' },
  { l: 'axon',    v: '○ monitoring · 3 alerts cleared', cls: 'acc' },
];

function Terminal() {
  const { ref, visible } = useReveal(0.4);
  const [shown, setShown] = useState<boolean[]>(() =>
    prefersReduced() ? Array(TERMINAL_LINES.length).fill(true) : Array(TERMINAL_LINES.length).fill(false)
  );

  useEffect(() => {
    if (!visible) return;
    if (prefersReduced()) {
      requestAnimationFrame(() => setShown(Array(TERMINAL_LINES.length).fill(true)));
      return;
    }
    const timers = TERMINAL_LINES.map((_, i) =>
      setTimeout(() => setShown(prev => { const n = [...prev]; n[i] = true; return n; }), 240 + i * 360)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div
      className="ns-terminal"
      ref={ref as React.RefObject<HTMLDivElement>}
      data-ns-reveal
      data-visible={visible}
    >
      <div className="bar">
        <span className="d r" />
        <span className="d" />
        <span className="d" />
        <span className="label">nexus.live · segment K-042</span>
      </div>
      <div className="body">
        {TERMINAL_LINES.map((ln, i) => (
          <div key={ln.l} className={`ln ${ln.cls} ${shown[i] ? 'show' : ''}`}>
            <span className="l">{ln.l}</span>
            <span className="v">
              {ln.v}
              {i === TERMINAL_LINES.length - 1 && shown[i] && <span className="ns-caret" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Process section ───────────────────────────────── */
function ProcessSection() {
  const { t } = useTranslation();
  const secRef = useRef<HTMLElement | null>(null);
  const [sectionVisible, setSectionVisible] = useState(() => prefersReduced());

  const phases = [
    t('nexus.home.process.phases.01', { returnObjects: true }),
    t('nexus.home.process.phases.02', { returnObjects: true }),
    t('nexus.home.process.phases.03', { returnObjects: true }),
    t('nexus.home.process.phases.04', { returnObjects: true }),
  ] as Array<{ phase: string; title: string; body: string }>;

  useEffect(() => {
    if (prefersReduced()) return;
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionVisible(true); io.disconnect(); } },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`ns-blk ns-process ${sectionVisible ? 'in' : ''}`}
      id="ns-process"
      ref={secRef as React.RefObject<HTMLElement>}
    >
      <div className="inner">
        <div className="ns-sec-head">
          <div className="idx" data-ns-reveal>{t('nexus.home.process.idx')}</div>
          <h2 data-ns-reveal>
            {t('nexus.home.process.h2a')}<br /><em>{t('nexus.home.process.h2em')}</em> {t('nexus.home.process.h2b')}
          </h2>
        </div>
        <div className="ns-timeline" data-ns-stagger>
          <div className="trackline" />
          {phases.map((p, i) => (
            <div key={p.title} className="ns-tstep" style={{ '--i': i } as React.CSSProperties}>
              <div className="ns-tstep-num" />
              <div className="ph">{p.phase}</div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main component ────────────────────────────────── */
export function NexusHome({ onNavigate, onLegal }: NexusHomeProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroIn, setHeroIn] = useState(false);
  const [utcTime, setUtcTime] = useState('');
  const [kmVal, setKmVal] = useState('2.8 KM');
  const kmRef = useRef(2.8);

  const marqueeItems = t('nexus.home.marquee.items', { returnObjects: true }) as string[];

  /* Hero entrance + consume any pending scroll anchor from nav */
  useEffect(() => {
    requestAnimationFrame(() => setHeroIn(true));
    const anchor = consumePendingAnchor();
    if (anchor) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    }
  }, []);

  /* UTC clock */
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, '0');
      setUtcTime(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  /* KM counter */
  useEffect(() => {
    const id = setInterval(() => {
      kmRef.current += Math.random() * 0.02;
      setKmVal(kmRef.current.toFixed(1) + ' KM');
    }, 4200);
    return () => clearInterval(id);
  }, []);

  /* Fibre path draw */
  useEffect(() => {
    const path = document.getElementById('ns-fibrePath') as SVGPathElement | null;
    if (!path) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1)';
      path.style.strokeDashoffset = '0';
    });
  }, []);

  /* Hero fibre parallax */
  useEffect(() => {
    const fibre = heroRef.current?.querySelector('.fibre') as HTMLElement | null;
    if (!fibre) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) fibre.style.transform = `translateY(${y * 0.18}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Generic reveal observer — runs on every render so it catches FibraPage/SoftwarePage too */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('[data-ns-reveal]:not(.ns-hero *), [data-ns-stagger], [data-ns-clip], .ns-process, .ns-timeline');
    if (reduced) { targets.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const reduced = prefersReduced();

  /* Framer-motion hero stagger variants */
  const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  };
  const heroLine = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  };
  const heroSub = {
    hidden: { opacity: 0, y: reduced ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  };

  return (
    <div className="ns-root">
      {/* ═══ HERO ═══ */}
      <section
        className={`ns-hero ${heroIn ? 'in' : ''}`}
        id="top"
        ref={heroRef as React.RefObject<HTMLElement>}
        aria-label="Hero"
      >
        <div className="fibre" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900" fill="none">
            <defs>
              <linearGradient id="ns-fg" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF4D2E" stopOpacity="0" />
                <stop offset="0.5" stopColor="#FF4D2E" stopOpacity="0.38" />
                <stop offset="1" stopColor="#FF4D2E" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="ns-haze" cx="0.78" cy="0.12" r="0.6">
                <stop stopColor="#FF4D2E" stopOpacity="0.05" />
                <stop offset="1" stopColor="#FF4D2E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#ns-haze)" />
            <g stroke="rgba(245,243,238,0.04)" strokeWidth="1">
              <path d="M0 220 H1440 M0 450 H1440 M0 680 H1440" />
              <path d="M360 0 V900 M720 0 V900 M1080 0 V900" />
            </g>
            <path
              id="ns-fibrePath"
              d="M-50 700 C 250 680, 380 420, 700 440 S 1120 620, 1500 380"
              stroke="url(#ns-fg)"
              strokeWidth="2"
              fill="none"
            />
            <circle r="4" fill="#FF4D2E">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                rotate="auto"
                path="M-50 700 C 250 680, 380 420, 700 440 S 1120 620, 1500 380"
              />
              <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle r="11" fill="none" stroke="#FF4D2E" strokeOpacity="0.4">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M-50 700 C 250 680, 380 420, 700 440 S 1120 620, 1500 380"
              />
              <animate attributeName="opacity" values="0;0.5;0.5;0" dur="5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="ticker" aria-label="Live status">
          <div><span className="live">●</span> {t('nexus.home.ticker.live')}</div>
          <div>{t('nexus.home.ticker.location')} · <span className="v">{utcTime}</span></div>
          <div>{t('nexus.home.ticker.fibreLaid')} · <span className="v">{kmVal}</span></div>
        </div>

        <div className="inner">
          <div className="eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            {t('nexus.home.eyebrow')}
          </div>

          <motion.h1
            variants={heroContainer}
            initial="hidden"
            animate={heroIn ? 'visible' : 'hidden'}
          >
            <motion.span className="line" variants={heroLine}><span>{t('nexus.home.hero.line1')}</span></motion.span>
            <motion.span className="line" variants={heroLine}><span>{t('nexus.home.hero.line2')}</span></motion.span>
            <motion.span className="line" variants={heroLine}><span className="hl">{t('nexus.home.hero.line3')}</span></motion.span>
          </motion.h1>

          <motion.p
            className="sub"
            variants={heroSub}
            initial="hidden"
            animate={heroIn ? 'visible' : 'hidden'}
            transition={{ delay: 0.45 }}
          >
            {t('nexus.home.hero.subtitle')}
          </motion.p>

          <motion.div
            className="actions"
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={heroIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.6, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="ns-btn ns-btn-primary"
              onClick={() => document.getElementById('ns-contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nexus.home.hero.ctaPrimary')} <span className="ar">→</span>
            </button>
            <button
              className="ns-btn ns-btn-ghost"
              onClick={() => document.getElementById('ns-work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nexus.home.hero.ctaSecondary')}
            </button>
          </motion.div>
        </div>

        <div className="scrollcue" aria-hidden="true">
          <span className="scue-label">{t('nexus.home.hero.scroll')}</span>
          <span className="bar" />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="ns-marquee" aria-hidden="true">
        <div className="track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={`${item}-${idx}`} className="item">{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ DIVISION 01 · FIELD ═══ */}
      <section className="ns-blk" id="ns-work">
        <div className="inner">
          <div className="ns-sec-head">
            <div className="idx" data-ns-reveal>{t('nexus.home.div01.idx')}</div>
            <h2 data-ns-reveal>
              {t('nexus.home.div01.h2a')}<br /><em>{t('nexus.home.div01.h2b')}</em>.
            </h2>
          </div>
          <div className="ns-software">
            <div className="copy" data-ns-reveal>
              <p>{t('nexus.home.div01.body1')}</p>
              <p>{t('nexus.home.div01.body2')}</p>
              <div className="ns-feat">
                {(['01','02','03','04','05'] as const).map(k => (
                  <div key={k} className="row">
                    <span className="k">{k}</span>
                    <span className="t">{t(`nexus.home.div01.feat.${k}`)}</span>
                  </div>
                ))}
              </div>
              <button
                className="ns-btn ns-btn-primary"
                style={{ marginTop: 36 }}
                onClick={() => onNavigate('fibra')}
              >
                {t('nexus.home.div01.cta')} <span className="ar">→</span>
              </button>
            </div>
            <div data-ns-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 480 360" style={{ width: '100%', maxWidth: 480, opacity: 0.85 }} fill="none" aria-hidden="true">
                <rect width="480" height="360" fill="rgba(245,243,238,0.02)" rx="8" />
                <line x1="40" y1="200" x2="440" y2="200" stroke="rgba(245,243,238,0.4)" strokeWidth="1.4" />
                <text x="44" y="190" fontFamily="var(--f-mono,'JetBrains Mono',monospace)" fontSize="10" fill="rgba(245,243,238,0.5)" letterSpacing="0.06em">SURFACE</text>
                <path d="M160 200 L180 310 L300 310 L320 200" fill="rgba(245,243,238,0.05)" stroke="rgba(245,243,238,0.3)" strokeWidth="1.2" />
                <rect x="195" y="255" width="90" height="30" rx="15" fill="rgba(245,243,238,0.06)" stroke="rgba(245,243,238,0.35)" strokeWidth="1.2" />
                <circle cx="240" cy="270" r="8" fill="rgba(255,77,46,0.18)" stroke="#FF4D2E" strokeWidth="1.5" />
                <circle cx="240" cy="270" r="3" fill="#FF4D2E" />
                <text x="300" y="275" fontFamily="var(--f-mono,'JetBrains Mono',monospace)" fontSize="10" fill="var(--ns-accent,#FF4D2E)" letterSpacing="0.08em">FIBRE</text>
                <g stroke="rgba(245,243,238,0.2)" strokeWidth="1">
                  <line x1="40" y1="225" x2="440" y2="225" />
                  <line x1="40" y1="250" x2="440" y2="250" />
                </g>
                <line x1="80" y1="120" x2="80" y2="200" stroke="rgba(245,243,238,0.4)" strokeWidth="1.5" />
                <line x1="400" y1="100" x2="400" y2="200" stroke="rgba(245,243,238,0.4)" strokeWidth="1.5" />
                <line x1="80" y1="120" x2="400" y2="100" stroke="rgba(245,243,238,0.18)" strokeWidth="1" strokeDasharray="4 4" />
                <text x="120" y="310" fontFamily="var(--f-mono,'JetBrains Mono',monospace)" fontSize="9" fill="rgba(245,243,238,0.35)" letterSpacing="0.08em">TIEFBAU · NE3 · DACH REGION</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="ns-blk light" id="ns-numbers">
        <div className="inner">
          <div className="ns-sec-head">
            <div className="idx" data-ns-reveal>{t('nexus.home.stats.idx')}</div>
            <h2 data-ns-reveal>{t('nexus.home.stats.h2a')}<br />{t('nexus.home.stats.h2b')} <em>{t('nexus.home.stats.h2em')}</em>.</h2>
          </div>
          <div className="ns-stats" data-ns-stagger>
            <StatItem value={40} suffix="+" label={t('nexus.home.stats.km')} />
            <StatItem value={0.04} dec={2} label={t('nexus.home.stats.splice')} />
            <StatItem value={72} suffix="h" label={t('nexus.home.stats.sla')} />
            <StatItem value={1} label={t('nexus.home.stats.system')} hl />
          </div>
        </div>
      </section>

      {/* ═══ DIVISION 02 · CODE ═══ */}
      <section className="ns-blk" id="ns-software">
        <div className="inner">
          <div className="ns-sec-head">
            <div className="idx" data-ns-reveal>{t('nexus.home.div02.idx')}</div>
            <h2 data-ns-reveal>
              {t('nexus.home.div02.h2a')}<br />{t('nexus.home.div02.h2b')} <em>{t('nexus.home.div02.h2em')}</em>.
            </h2>
          </div>
          <div className="ns-software">
            <div className="copy" data-ns-reveal>
              <p>{t('nexus.home.div02.body1')}</p>
              <p>{t('nexus.home.div02.body2')}</p>
              <div className="ns-feat">
                {(['01','02','03'] as const).map(k => (
                  <div key={k} className="row">
                    <span className="k">{k}</span>
                    <span className="t">{t(`nexus.home.div02.feat.${k}`)}</span>
                  </div>
                ))}
              </div>
              <button
                className="ns-btn ns-btn-primary"
                style={{ marginTop: 36 }}
                onClick={() => onNavigate('software')}
              >
                {t('nexus.home.div02.cta')} <span className="ar">→</span>
              </button>
            </div>
            <Terminal />
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <ProcessSection />

      {/* ═══ QUOTE ═══ */}
      <section className="ns-blk light" id="ns-thesis">
        <div className="inner ns-quote-blk">
          <div className="ns-idx-mono" data-ns-reveal style={{ opacity: 0.55 }}>{t('nexus.home.thesis.idx')}</div>
          <div>
            <blockquote data-ns-reveal>
              {t('nexus.home.thesis.quote1')}<br />
              {t('nexus.home.thesis.quote2')} <em>{t('nexus.home.thesis.quoteEm')}</em>.
            </blockquote>
            <div className="ns-quote-cite" data-ns-reveal>
              {t('nexus.home.thesis.cite')}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="ns-cta-blk" id="ns-contact">
        <h2 data-ns-reveal>
          {t('nexus.home.cta.h2a')}<br /><em>{t('nexus.home.cta.h2em')}</em> {t('nexus.home.cta.h2b')}
        </h2>
        <div className="actions" data-ns-reveal>
          <a href="mailto:info@hmr-nexus.com" className="ns-btn ns-btn-primary">
            {t('nexus.home.cta.email')} <span className="ar">→</span>
          </a>
          <a href="tel:+4917631524448" className="ns-btn ns-btn-ghost">
            {t('nexus.home.cta.phone')}
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="ns-footer">
        <div className="huge" data-ns-clip>
          NEXUS<span className="dot">.</span>
        </div>
        <div className="slogan-tag" data-ns-reveal>
          <span>{t('nexus.home.footer.slogan.innovation')}</span><span className="sep">·</span>
          <span>{t('nexus.home.footer.slogan.quality')}</span><span className="sep">·</span>
          <span>{t('nexus.home.footer.slogan.commitment')}</span>
        </div>
        <div className="cols">
          <div data-ns-reveal style={{ '--i': 0 } as React.CSSProperties}>
            <h4>{t('nexus.home.footer.contact.heading')}</h4>
            <ul>
              <li><a href="mailto:info@hmr-nexus.com">info@hmr-nexus.com</a></li>
              <li>+49 176 31524448</li>
              <li>{t('nexus.home.footer.contact.hours')}</li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <h4>{t('nexus.home.footer.address.heading')}</h4>
            <ul>
              <li>{t('nexus.home.footer.address.street')}</li>
              <li>{t('nexus.home.footer.address.city')}</li>
              <li>{t('nexus.home.footer.address.country')}</li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <h4>{t('nexus.home.footer.company.heading')}</h4>
            <ul>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => onNavigate('fibra')}
                >
                  {t('nexus.home.footer.company.fibra')}
                </button>
              </li>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => onNavigate('software')}
                >
                  {t('nexus.home.footer.company.software')}
                </button>
              </li>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => document.getElementById('ns-process')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('nexus.home.footer.company.process')}
                </button>
              </li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 3 } as React.CSSProperties}>
            <h4>{t('nexus.home.footer.legal.heading')}</h4>
            <ul>
              <li>{t('nexus.home.footer.legal.register')}</li>
              <li><a href="https://hmr-nexus.com">hmr-nexus.com</a></li>
              {onLegal && (
                <>
                  <li>
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                      onClick={() => onLegal('imprint')}
                    >
                      {t('nexus.home.footer.legal.imprint')}
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                      onClick={() => onLegal('privacy')}
                    >
                      {t('nexus.home.footer.legal.privacy')}
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                      onClick={() => onLegal('terms')}
                    >
                      {t('nexus.home.footer.legal.terms')}
                    </button>
                  </li>
                </>
              )}
              <li>© {new Date().getFullYear()} HMR Nexus Engineering GmbH</li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <div>© {new Date().getFullYear()} HMR Nexus Engineering GmbH</div>
          <div><span className="live">●</span> {t('nexus.home.footer.status')}</div>
        </div>
      </footer>
    </div>
  );
}
