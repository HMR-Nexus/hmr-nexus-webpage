import { useEffect, useRef, useState } from 'react';
import type { PageId } from '@/lib/navigation';
import { consumePendingAnchor } from '@/lib/navAnchor';

interface NexusHomeProps {
  onNavigate: (page: PageId) => void;
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
const PHASES = [
  {
    phase: 'Phase 01', title: 'Survey',
    body: 'We walk the route, model it to scale, and quote to the metre — no surprises buried in the contract.',
  },
  {
    phase: 'Phase 02', title: 'Build',
    body: 'Crews pull, blow and splice. Every action logged on-site, synced live. You watch progress the moment it happens.',
  },
  {
    phase: 'Phase 03', title: 'Activate',
    body: 'FTTH commissioning and OTDR-verified handover. Splice loss, port maps and as-builts exported in one pack.',
  },
  {
    phase: 'Phase 04', title: 'Operate',
    body: 'We monitor the network around the clock. Faults raise tickets, dispatch the nearest crew, and close the loop — fast.',
  },
];

function ProcessSection() {
  const secRef = useRef<HTMLElement | null>(null);
  const [sectionVisible, setSectionVisible] = useState(() => prefersReduced());

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
          <div className="idx" data-ns-reveal>How a project runs</div>
          <h2 data-ns-reveal>
            Four phases.<br /><em>One</em> source of truth.
          </h2>
        </div>
        <div className="ns-timeline" data-ns-stagger>
          <div className="trackline" />
          {PHASES.map((p, i) => (
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
export function NexusHome({ onNavigate }: NexusHomeProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroIn, setHeroIn] = useState(false);
  const [utcTime, setUtcTime] = useState('');
  const [kmVal, setKmVal] = useState('2.8 KM');
  const kmRef = useRef(2.8);

  /* Hero entrance + consume any pending scroll anchor from nav */
  useEffect(() => {
    requestAnimationFrame(() => setHeroIn(true));
    const anchor = consumePendingAnchor();
    if (anchor) {
      // Wait for the component to paint before scrolling
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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
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
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) fibre.style.transform = `translateY(${y * 0.18}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Stagger h1 line delays */
  useEffect(() => {
    document.querySelectorAll('.ns-hero h1 .line > span').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${0.15 + i * 0.11}s`;
    });
  }, []);

  /* Generic reveal observer */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('[data-ns-reveal]:not(.ns-hero *), [data-ns-stagger], [data-ns-clip], .ns-process, .ns-timeline');
    if (prefersReduced) { targets.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

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
          <div><span className="live">●</span> LIVE · 12 CREWS IN FIELD</div>
          <div>CELLE · DE · <span className="v">{utcTime}</span></div>
          <div>FIBRE LAID TODAY · <span className="v">{kmVal}</span></div>
        </div>

        <div className="inner">
          <div className="eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            HMR · NEXUS ENGINEERING GMBH
          </div>
          <h1>
            <span className="line"><span>Innovación.</span></span>
            <span className="line"><span>Calidad.</span></span>
            <span className="line"><span className="hl">Compromiso.</span></span>
          </h1>
          <p className="sub">
            An engineering company held to three principles — and measured by them on every project, in every discipline.
          </p>
          <div className="actions">
            <button
              className="ns-btn ns-btn-primary"
              onClick={() => document.getElementById('ns-contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a project <span className="ar">→</span>
            </button>
            <button
              className="ns-btn ns-btn-ghost"
              onClick={() => document.getElementById('ns-work')?.scrollIntoView({ behavior: 'smooth' })}
            >
              What we do
            </button>
          </div>
        </div>

        <div className="scrollcue" aria-hidden="true">
          <span className="scue-label">Scroll</span>
          <span className="bar" />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="ns-marquee" aria-hidden="true">
        <div className="track">
          {['Innovación','Calidad','Compromiso','Kabelzug','Einblasung RA / RD','Fusion Splicing','FTTH Activation','NE3 · NE4','OTDR Verified'].map(item => (
            <span key={item} className="item">{item}</span>
          ))}
          {['Innovación','Calidad','Compromiso','Kabelzug','Einblasung RA / RD','Fusion Splicing','FTTH Activation','NE3 · NE4','OTDR Verified'].map(item => (
            <span key={`${item}-2`} className="item">{item}</span>
          ))}
        </div>
      </div>

      {/* ═══ DIVISION 01 · FIELD ═══ */}
      <section className="ns-blk" id="ns-work">
        <div className="inner">
          <div className="ns-sec-head">
            <div className="idx" data-ns-reveal>Division 01 · Field</div>
            <h2 data-ns-reveal>
              Fibre, in the<br /><em>ground</em>.
            </h2>
          </div>
          <div className="ns-software">
            <div className="copy" data-ns-reveal>
              <p>Subcontract engineering for German carriers. We pull cable, blow tubes, splice fibre and activate homes — to spec, on schedule, with the paperwork that survives an audit.</p>
              <p>Hard hats, OTDRs, and NE3 / NE4 project leadership across the DACH region. Field engineering that holds up under audit.</p>
              <div className="ns-feat">
                {[
                  ['01', 'Kabelzug · 144F & 288F'],
                  ['02', 'Einblasung · RA / RD'],
                  ['03', 'Spleißarbeiten · ≤ 0.08 dB'],
                  ['04', 'FTTH Aktivierung'],
                  ['05', 'NE3 / NE4 Projektleitung'],
                ].map(([k, t]) => (
                  <div key={k} className="row">
                    <span className="k">{k}</span>
                    <span className="t">{t}</span>
                  </div>
                ))}
              </div>
              <button
                className="ns-btn ns-btn-primary"
                style={{ marginTop: 36 }}
                onClick={() => onNavigate('fibra')}
              >
                Ver trabajos de fibra <span className="ar">→</span>
              </button>
            </div>
            <div data-ns-reveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Decorative fibre cross-section graphic */}
              <svg viewBox="0 0 480 360" style={{ width: '100%', maxWidth: 480, opacity: 0.85 }} fill="none" aria-hidden="true">
                <rect width="480" height="360" fill="rgba(245,243,238,0.02)" rx="8" />
                {/* Ground layer */}
                <line x1="40" y1="200" x2="440" y2="200" stroke="rgba(245,243,238,0.4)" strokeWidth="1.4" />
                <text x="44" y="190" fontFamily="var(--f-mono,'JetBrains Mono',monospace)" fontSize="10" fill="rgba(245,243,238,0.5)" letterSpacing="0.06em">SURFACE</text>
                {/* Trench */}
                <path d="M160 200 L180 310 L300 310 L320 200" fill="rgba(245,243,238,0.05)" stroke="rgba(245,243,238,0.3)" strokeWidth="1.2" />
                {/* Duct */}
                <rect x="195" y="255" width="90" height="30" rx="15" fill="rgba(245,243,238,0.06)" stroke="rgba(245,243,238,0.35)" strokeWidth="1.2" />
                {/* Fibre cable */}
                <circle cx="240" cy="270" r="8" fill="rgba(255,77,46,0.18)" stroke="#FF4D2E" strokeWidth="1.5" />
                <circle cx="240" cy="270" r="3" fill="#FF4D2E" />
                <text x="300" y="275" fontFamily="var(--f-mono,'JetBrains Mono',monospace)" fontSize="10" fill="var(--ns-accent,#FF4D2E)" letterSpacing="0.08em">FIBRE</text>
                {/* OTDR signal lines */}
                <g stroke="rgba(245,243,238,0.2)" strokeWidth="1">
                  <line x1="40" y1="225" x2="440" y2="225" />
                  <line x1="40" y1="250" x2="440" y2="250" />
                </g>
                {/* Poles / towers */}
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
            <div className="idx" data-ns-reveal>By the numbers</div>
            <h2 data-ns-reveal>Measured.<br />Not <em>marketed</em>.</h2>
          </div>
          <div className="ns-stats" data-ns-stagger>
            <StatItem value={40} suffix="+" label="KM fibre · per month" />
            <StatItem value={0.04} dec={2} label="Avg splice loss · dB" />
            <StatItem value={72} suffix="h" label="Fault → fix · SLA" />
            <StatItem value={1} label="System · end to end" hl />
          </div>
        </div>
      </section>

      {/* ═══ DIVISION 02 · CODE ═══ */}
      <section className="ns-blk" id="ns-software">
        <div className="inner">
          <div className="ns-sec-head">
            <div className="idx" data-ns-reveal>Division 02 · Code</div>
            <h2 data-ns-reveal>
              The software<br />we use <em>on site</em>.
            </h2>
          </div>
          <div className="ns-software">
            <div className="copy" data-ns-reveal>
              <p>One operational stack for telecom field work: production metrics, cost-per-unit, quality control and open tickets — synced in real time to a portal your customer can watch.</p>
              <p>Production-grade software sold to carriers and contractors who need real-time control over their networks.</p>
              <div className="ns-feat">
                <div className="row">
                  <span className="k">01</span>
                  <span className="t">Live production dashboards — every segment, every crew.</span>
                </div>
                <div className="row">
                  <span className="k">02</span>
                  <span className="t">Cost &amp; margin truth, down to the metre.</span>
                </div>
                <div className="row">
                  <span className="k">03</span>
                  <span className="t">AXON — the AI agent that flags drift before it costs you.</span>
                </div>
              </div>
              <button
                className="ns-btn ns-btn-primary"
                style={{ marginTop: 36 }}
                onClick={() => onNavigate('software')}
              >
                Ver desarrollo de software <span className="ar">→</span>
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
          <div className="ns-idx-mono" data-ns-reveal style={{ opacity: 0.55 }}>Thesis</div>
          <div>
            <blockquote data-ns-reveal>
              Most contractors vanish at handover.<br />
              We&apos;re measured on <em>what happens next</em>.
            </blockquote>
            <div className="ns-quote-cite" data-ns-reveal>
              — Horstmann · Melhs · Romero · Founders
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="ns-cta-blk" id="ns-contact">
        <h2 data-ns-reveal>
          Let&apos;s build the<br /><em>next</em> one.
        </h2>
        <div className="actions" data-ns-reveal>
          <a
            href="mailto:info@hmr-nexus.com"
            className="ns-btn ns-btn-primary"
          >
            info@hmr-nexus.com <span className="ar">→</span>
          </a>
          <a
            href="tel:+4917631524448"
            className="ns-btn ns-btn-ghost"
          >
            +49 176 31524448
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="ns-footer">
        <div className="huge" data-ns-clip>
          NEXUS<span className="dot">.</span>
        </div>
        <div className="slogan-tag" data-ns-reveal>
          <span>Innovación</span><span className="sep">·</span>
          <span>Calidad</span><span className="sep">·</span>
          <span>Compromiso</span>
        </div>
        <div className="cols">
          <div data-ns-reveal style={{ '--i': 0 } as React.CSSProperties}>
            <h4>Kontakt</h4>
            <ul>
              <li><a href="mailto:info@hmr-nexus.com">info@hmr-nexus.com</a></li>
              <li>+49 176 31524448</li>
              <li>Mo–Fr · 08:00–18:00</li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <h4>Sitz</h4>
            <ul>
              <li>Am Riethkamp 1E</li>
              <li>29229 Celle</li>
              <li>Deutschland</li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <h4>Company</h4>
            <ul>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => onNavigate('fibra')}
                >
                  Trabajos de fibra
                </button>
              </li>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => onNavigate('software')}
                >
                  Desarrollo de software
                </button>
              </li>
              <li>
                <button
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, font: 'inherit' }}
                  onClick={() => document.getElementById('ns-process')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Process
                </button>
              </li>
            </ul>
          </div>
          <div data-ns-reveal style={{ '--i': 3 } as React.CSSProperties}>
            <h4>Legal</h4>
            <ul>
              <li>AG Celle</li>
              <li><a href="https://hmr-nexus.com">hmr-nexus.com</a></li>
              <li>© {new Date().getFullYear()} HMR Nexus Engineering GmbH</li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <div>© {new Date().getFullYear()} HMR Nexus Engineering GmbH</div>
          <div><span className="live">●</span> All systems · operational</div>
        </div>
      </footer>
    </div>
  );
}
