import { useEffect, useRef, useState } from 'react';

// Props kept for future use (navigation from within page)
interface SoftwarePageProps {
  onNavigate: (page: 'home' | 'fibra' | 'software') => void;
}

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Stage reveal hook ─────────────────────────────── */
function useStageReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() => prefersReduced());
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Spine fill ────────────────────────────────────── */
function useFillSpine(flowRef: React.RefObject<HTMLElement | null>) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const flow = flowRef.current;
    const fill = fillRef.current;
    if (!flow || !fill) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { fill.style.height = '100%'; return; }
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = flow.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height;
        const passed = Math.min(total, Math.max(0, vh * 0.5 - r.top));
        fill.style.height = (passed / total * 100) + '%';
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [flowRef]);
  return fillRef;
}

/* ── Stage component ───────────────────────────────── */
interface StageProps {
  num: string;
  title: string;
  body: string;
  specs: string[];
  cornerLabel: string;
  diagram: React.ReactNode;
}

function Stage({ num, title, body, specs, cornerLabel, diagram }: StageProps) {
  const { ref, visible } = useStageReveal();
  return (
    <div className={`ns-fo-stage ${visible ? 'in' : ''}`} ref={ref}>
      <div className="node" aria-hidden="true" />
      <div className="ns-fo-diagram">
        <span className="corner">{cornerLabel}</span>
        {diagram}
      </div>
      <div className="ns-fo-text">
        <div className="num">{num}</div>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="specs">
          {specs.map(s => <span key={s}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── SVG diagrams ──────────────────────────────────── */
const DiagramAnalysis = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <g className="dg-line-2">
      <path d="M110 130 H200 M250 130 H340" />
      <path d="M155 160 V230 M295 160 V230" />
      <path d="M155 260 H295" />
    </g>
    <g className="dg-fill" stroke="rgba(245,243,238,0.35)">
      <rect x="110" y="110" width="90" height="40" rx="4" />
      <rect x="250" y="110" width="90" height="40" rx="4" />
      <rect x="110" y="240" width="90" height="40" rx="4" />
    </g>
    <rect x="250" y="240" width="90" height="40" rx="4" className="dg-fill-acc" />
    <rect x="250" y="240" width="90" height="40" rx="4" className="dg-acc" />
    <g className="dg-txt" textAnchor="middle">
      <text x="155" y="134">FLUJO</text>
      <text x="295" y="134">USUARIOS</text>
      <text x="155" y="264">DATOS</text>
      <text x="295" y="264" fill="var(--ns-accent,#FF4D2E)">PROBLEMA</text>
    </g>
    <circle cx="295" cy="260" r="34" className="dg-acc" fill="none" />
    <line x1="320" y1="285" x2="350" y2="315" className="dg-acc" />
  </svg>
);

const DiagramStructure = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <g className="dg-fill" stroke="rgba(245,243,238,0.3)">
      <rect x="96" y="96" width="80" height="52" rx="4" />
      <rect x="96" y="160" width="80" height="52" rx="4" />
      <rect x="96" y="224" width="80" height="52" rx="4" />
    </g>
    <rect x="96" y="96" width="80" height="52" rx="4" className="dg-fill-acc" />
    <rect x="96" y="96" width="80" height="52" rx="4" className="dg-acc" />
    <g className="dg-txt" textAnchor="middle">
      <text x="136" y="126">MÓDULO 1</text>
      <text x="136" y="190">MÓDULO 2</text>
      <text x="136" y="254">MÓDULO 3</text>
    </g>
    <line x1="220" y1="186" x2="400" y2="186" className="dg-line" />
    <circle cx="240" cy="186" r="6" className="dg-node-acc" />
    <circle cx="300" cy="186" r="6" className="dg-fill" stroke="rgba(245,243,238,0.4)" />
    <circle cx="360" cy="186" r="6" className="dg-fill" stroke="rgba(245,243,238,0.4)" />
    <g className="dg-line-2">
      <line x1="240" y1="160" x2="240" y2="174" />
      <line x1="300" y1="198" x2="300" y2="212" />
      <line x1="360" y1="160" x2="360" y2="174" />
    </g>
    <g className="dg-txt" textAnchor="middle">
      <text x="240" y="152">V1</text>
      <text x="300" y="226">V2</text>
      <text x="360" y="152">V3</text>
    </g>
    <text x="220" y="270" className="dg-txt">ROADMAP · PRIORIDADES</text>
  </svg>
);

const DiagramUX = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="70" y="70" width="340" height="220" rx="6" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <line x1="70" y1="100" x2="410" y2="100" className="dg-line-2" />
    <g fill="rgba(245,243,238,0.3)">
      <circle cx="86" cy="85" r="3" />
      <circle cx="98" cy="85" r="3" />
      <circle cx="110" cy="85" r="3" />
    </g>
    <line x1="140" y1="100" x2="140" y2="290" className="dg-line-2" />
    <g className="dg-line-2">
      <line x1="92" y1="124" x2="124" y2="124" />
      <line x1="92" y1="142" x2="124" y2="142" />
      <line x1="92" y1="160" x2="124" y2="160" />
    </g>
    <rect x="160" y="118" width="70" height="44" rx="3" className="dg-fill-acc" />
    <rect x="160" y="118" width="70" height="44" rx="3" className="dg-acc" />
    <rect x="244" y="118" width="70" height="44" rx="3" stroke="rgba(245,243,238,0.3)" fill="none" />
    <rect x="328" y="118" width="62" height="44" rx="3" stroke="rgba(245,243,238,0.3)" fill="none" />
    <rect x="160" y="178" width="154" height="92" rx="3" stroke="rgba(245,243,238,0.2)" fill="none" />
    <path d="M172 250 L200 232 L228 240 L256 214 L284 222 L302 204" className="dg-acc" />
    <g className="dg-line-2">
      <rect x="328" y="178" width="62" height="14" rx="2" fill="none" />
      <rect x="328" y="200" width="62" height="14" rx="2" fill="none" />
      <rect x="328" y="222" width="62" height="14" rx="2" fill="none" />
    </g>
    <rect x="328" y="248" width="40" height="16" rx="2" className="dg-fill-acc" />
  </svg>
);

const DiagramDev = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="70" y="130" width="110" height="100" rx="6" className="dg-fill" stroke="rgba(245,243,238,0.35)" />
    <line x1="70" y1="152" x2="180" y2="152" className="dg-line-2" />
    <g className="dg-line-2">
      <line x1="84" y1="170" x2="166" y2="170" />
      <line x1="84" y1="186" x2="140" y2="186" />
      <line x1="84" y1="202" x2="160" y2="202" />
    </g>
    <text x="76" y="248" className="dg-txt">APP WEB</text>
    <rect x="210" y="150" width="60" height="60" rx="6" className="dg-fill-acc" />
    <rect x="210" y="150" width="60" height="60" rx="6" className="dg-acc" />
    <text x="240" y="184" textAnchor="middle" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">API</text>
    <g className="dg-fill" stroke="rgba(245,243,238,0.35)">
      <ellipse cx="360" cy="148" rx="40" ry="12" />
      <path d="M320 148 V212 a40 12 0 0 0 80 0 V148" />
    </g>
    <path d="M320 180 a40 12 0 0 0 80 0" className="dg-line-2" />
    <text x="360" y="244" textAnchor="middle" className="dg-txt">BASE DE DATOS</text>
    <g className="dg-acc">
      <path d="M180 180 H210" />
      <path d="M270 180 H320" />
    </g>
    <g className="dg-node-acc">
      <circle cx="195" cy="180" r="2.5" />
      <circle cx="295" cy="180" r="2.5" />
    </g>
  </svg>
);

const DiagramAI = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <g className="dg-line-2">
      <rect x="60" y="120" width="90" height="20" rx="3" fill="none" />
      <rect x="60" y="150" width="90" height="20" rx="3" fill="none" />
      <rect x="60" y="180" width="90" height="20" rx="3" fill="none" />
      <rect x="60" y="210" width="90" height="20" rx="3" fill="none" />
    </g>
    <text x="60" y="110" className="dg-txt">TAREAS</text>
    <path d="M240 130 L290 160 L290 215 L240 245 L190 215 L190 160 Z" className="dg-fill-acc" />
    <path d="M240 130 L290 160 L290 215 L240 245 L190 215 L190 160 Z" className="dg-acc" />
    <path d="M232 172 l-14 26 h18 l-6 22 l22 -32 h-18 l8 -16 z" className="dg-node-acc" />
    <text x="240" y="270" textAnchor="middle" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">AGENTE IA</text>
    <rect x="330" y="150" width="96" height="80" rx="4" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <g className="dg-acc">
      <path d="M344 170 l5 5 l9 -10" />
    </g>
    <g className="dg-line-2">
      <line x1="366" y1="172" x2="412" y2="172" />
      <line x1="344" y1="194" x2="412" y2="194" />
      <line x1="344" y1="212" x2="412" y2="212" />
    </g>
    <text x="330" y="246" className="dg-txt">REPORTE</text>
    <g className="dg-line-2">
      <path d="M150 175 L186 185" />
      <path d="M290 188 L330 190" />
    </g>
  </svg>
);

const DiagramIntegrations = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <circle cx="240" cy="180" r="34" className="dg-fill-acc" />
    <circle cx="240" cy="180" r="34" className="dg-acc" />
    <text x="240" y="184" textAnchor="middle" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">NEXUS</text>
    <g className="dg-line-2">
      <path d="M240 146 V92" />
      <path d="M274 180 H360" />
      <path d="M240 214 V268" />
      <path d="M206 180 H120" />
      <path d="M264 156 L320 110" />
      <path d="M216 204 L160 250" />
    </g>
    <g className="dg-fill" stroke="rgba(245,243,238,0.35)">
      <rect x="206" y="64" width="68" height="28" rx="4" />
      <rect x="360" y="166" width="60" height="28" rx="4" />
      <rect x="206" y="268" width="68" height="28" rx="4" />
      <rect x="60" y="166" width="60" height="28" rx="4" />
      <rect x="312" y="86" width="56" height="26" rx="4" />
      <rect x="112" y="238" width="68" height="26" rx="4" />
    </g>
    <g className="dg-txt" textAnchor="middle">
      <text x="240" y="82">CRM</text>
      <text x="390" y="184">ERP</text>
      <text x="240" y="286">PAGOS</text>
      <text x="90" y="184">MAIL</text>
      <text x="340" y="103">CHAT</text>
      <text x="146" y="255">API</text>
    </g>
  </svg>
);

const DiagramQA = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <path d="M150 86 L218 108 V196 C218 236 186 262 150 278 C114 262 82 236 82 196 V108 Z" className="dg-fill-acc" />
    <path d="M150 86 L218 108 V196 C218 236 186 262 150 278 C114 262 82 236 82 196 V108 Z" className="dg-acc" />
    <path d="M120 188 l20 20 l40 -46" className="dg-acc" strokeWidth="2.4" />
    <g className="dg-acc">
      <path d="M270 120 l5 5 l9 -10" />
      <path d="M270 156 l5 5 l9 -10" />
    </g>
    <g className="dg-line-2">
      <path d="M290 122 H410" />
      <path d="M290 158 H410" />
    </g>
    <g className="dg-line-2">
      <rect x="270" y="190" width="140" height="26" rx="3" fill="none" />
      <rect x="270" y="224" width="140" height="26" rx="3" fill="none" />
    </g>
    <g className="dg-node-acc">
      <rect x="282" y="198" width="10" height="9" rx="1.5" />
      <rect x="282" y="232" width="10" height="9" rx="1.5" />
    </g>
    <g className="dg-acc" fill="none" strokeWidth="1.2">
      <path d="M283 198 v-3 a4 4 0 0 1 8 0 v3" />
      <path d="M283 232 v-3 a4 4 0 0 1 8 0 v3" />
    </g>
    <g className="dg-txt">
      <text x="302" y="207">PERMISOS · ROL</text>
      <text x="302" y="241">TRAZABILIDAD</text>
    </g>
  </svg>
);

const DiagramDeploy = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <path d="M150 150 a34 34 0 0 1 66 -8 a26 26 0 0 1 14 50 H146 a24 24 0 0 1 4 -42 z" className="dg-fill" stroke="rgba(245,243,238,0.35)" />
    <text x="186" y="178" textAnchor="middle" className="dg-txt">DEPLOY</text>
    <rect x="250" y="120" width="160" height="90" rx="4" stroke="rgba(245,243,238,0.2)" fill="none" />
    <path d="M262 196 L292 184 L322 190 L352 166 L382 150 L398 140" className="dg-acc" />
    <g className="dg-line-2">
      <line x1="250" y1="166" x2="410" y2="166" />
    </g>
    <text x="262" y="138" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">MONITOREO</text>
    <g className="dg-acc" fill="none" strokeWidth="1.6">
      <path d="M170 250 a40 40 0 1 1 12 28" />
    </g>
    <path d="M182 268 l-6 16 l16 -4 z" className="dg-node-acc" />
    <text x="240" y="262" className="dg-txt">SOPORTE · MEJORAS CONTINUAS</text>
    <text x="240" y="284" className="dg-txt">ESCALABILIDAD</text>
  </svg>
);

/* ── Main component ────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SoftwarePage(_props: SoftwarePageProps) {
  const flowRef = useRef<HTMLElement | null>(null);
  const fillRef = useFillSpine(flowRef);

  const stages = [
    {
      num: 'Etapa 01', title: 'Consultoría & análisis del proceso',
      body: 'Antes de programar, entendemos el negocio: flujos de trabajo, problemas operativos, usuarios, datos, integraciones, riesgos y objetivos reales. El software empieza por la pregunta correcta.',
      specs: ['Flujos', 'Usuarios', 'Datos', 'Riesgos', 'Objetivos'],
      corner: 'FASE · ANÁLISIS',
      diagram: <DiagramAnalysis />,
    },
    {
      num: 'Etapa 02', title: 'Estructuración del proyecto',
      body: 'Definimos alcance, módulos, prioridades, arquitectura, roadmap, presupuesto, tiempos y criterios de entrega. Un plan claro antes de escribir la primera línea.',
      specs: ['Alcance', 'Módulos', 'Arquitectura', 'Roadmap', 'Entrega'],
      corner: 'FASE · ESTRUCTURA',
      diagram: <DiagramStructure />,
    },
    {
      num: 'Etapa 03', title: 'UX/UI & diseño de producto',
      body: 'Interfaces claras, dashboards, paneles administrativos, formularios y flujos internos pensados para el uso diario. Diseño que reduce fricción y errores, no que los suma.',
      specs: ['Dashboards', 'Paneles', 'Formularios', 'Flujos'],
      corner: 'FASE · UX / UI',
      diagram: <DiagramUX />,
    },
    {
      num: 'Etapa 04', title: 'Desarrollo frontend & backend',
      body: 'Construimos aplicaciones web, APIs, bases de datos, paneles internos, sistemas de gestión, portales y herramientas operativas. Software que aguanta el uso real, día tras día.',
      specs: ['App web', 'APIs', 'Base de datos', 'Paneles'],
      corner: 'FASE · DESARROLLO',
      diagram: <DiagramDev />,
    },
    {
      num: 'Etapa 05', title: 'Automatización e inteligencia artificial',
      body: 'Bots, asistentes y automatización de tareas repetitivas. Análisis de datos, generación de reportes, clasificación de información y soporte operativo asistido por IA.',
      specs: ['Bots', 'Asistentes', 'Reportes', 'Clasificación'],
      corner: 'FASE · AUTOMATIZACIÓN · IA',
      diagram: <DiagramAI />,
    },
    {
      num: 'Etapa 06', title: 'Integraciones',
      body: 'Conectamos con CRMs, ERPs, APIs externas, sistemas internos, WhatsApp/Telegram, correo, calendarios, hojas de cálculo, pagos y las plataformas que ya usas. Todo hablando el mismo idioma.',
      specs: ['CRM / ERP', 'APIs', 'Chat', 'Pagos', 'Calendarios'],
      corner: 'FASE · INTEGRACIONES',
      diagram: <DiagramIntegrations />,
    },
    {
      num: 'Etapa 07', title: 'Testing, seguridad & calidad',
      body: 'Pruebas, control de errores, permisos por usuario, validaciones, trazabilidad y backups. Buenas prácticas de arquitectura para que el sistema sea confiable y auditable.',
      specs: ['Pruebas', 'Permisos', 'Validaciones', 'Backups'],
      corner: 'FASE · CALIDAD & SEGURIDAD',
      diagram: <DiagramQA />,
    },
    {
      num: 'Etapa 08', title: 'Deploy, mantenimiento & evolución',
      body: 'Acompañamos el lanzamiento, el monitoreo y el soporte. Mejoras continuas y escalabilidad: el sistema crece con tu operación en lugar de frenarla.',
      specs: ['Lanzamiento', 'Monitoreo', 'Soporte', 'Escalabilidad'],
      corner: 'FASE · DEPLOY & EVOLUCIÓN',
      diagram: <DiagramDeploy />,
    },
  ];

  return (
    <div className="ns-root">
      {/* HERO */}
      <section className="ns-fo-hero">
        <div className="bg" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 700" fill="none">
            <defs>
              <radialGradient id="ns-sw-hz" cx="0.75" cy="0.15" r="0.85">
                <stop stopColor="#FF4D2E" stopOpacity="0.10" />
                <stop offset="1" stopColor="#FF4D2E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="700" fill="url(#ns-sw-hz)" />
            <g stroke="rgba(245,243,238,0.05)" strokeWidth="1">
              <path d="M0 175 H1440 M0 350 H1440 M0 525 H1440" />
              <path d="M360 0 V700 M720 0 V700 M1080 0 V700" />
            </g>
            {/* node network */}
            <g stroke="rgba(255,77,46,0.35)" strokeWidth="1.2" fill="none">
              <path d="M180 480 L420 360 L660 420 L900 300 L1180 360" />
              <path d="M420 360 L520 200 M660 420 L760 560 M900 300 L1040 180" />
            </g>
            <g fill="#FF4D2E">
              <circle cx="180" cy="480" r="3" />
              <circle cx="420" cy="360" r="3" />
              <circle cx="660" cy="420" r="3" />
              <circle cx="900" cy="300" r="3" />
              <circle cx="1180" cy="360" r="3" />
              <circle cx="520" cy="200" r="2.5" opacity="0.6" />
              <circle cx="760" cy="560" r="2.5" opacity="0.6" />
              <circle cx="1040" cy="180" r="2.5" opacity="0.6" />
            </g>
          </svg>
        </div>
        <div className="inner">
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Desarrollo de software
          </div>
          <h1>Procesos complejos,<br />sistemas <span className="hl">claros</span>.</h1>
          <p className="sub">
            Diseñamos software que convierte procesos complejos en sistemas claros, medibles y escalables.
            No solo programamos: analizamos, diseñamos, estructuramos, desarrollamos, integramos, automatizamos y mantenemos.
          </p>
          <div className="actions">
            <button
              className="ns-btn ns-btn-primary"
              onClick={() => document.getElementById('ns-sw-contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Diseñar mi sistema <span className="ar">→</span>
            </button>
            <button
              className="ns-btn ns-btn-ghost"
              onClick={() => document.getElementById('ns-sw-flujo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver el proceso
            </button>
          </div>
        </div>
      </section>

      {/* VERBS */}
      <div className="ns-fo-verbs" aria-label="What we do">
        <div className="inner">
          <div className="lead">No solo programamos</div>
          <div className="chips">
            {['Analiza', 'Diseña', 'Estructura', 'Desarrolla', 'Integra', 'Automatiza', 'Mantiene'].map(v => (
              <span key={v} className="chip">{v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FLOW */}
      <section
        className="ns-fo-flow"
        id="ns-sw-flujo"
        ref={flowRef as React.RefObject<HTMLElement>}
        aria-label="8-stage software development timeline"
      >
        <div className="ns-fo-spine" aria-hidden="true">
          <div className="fill" ref={fillRef} />
        </div>

        {stages.map(s => (
          <Stage
            key={s.num}
            num={s.num}
            title={s.title}
            body={s.body}
            specs={s.specs}
            cornerLabel={s.corner}
            diagram={s.diagram}
          />
        ))}
      </section>

      {/* CTA */}
      <section className="ns-fo-cta" id="ns-sw-contact">
        <div className="glowbg" aria-hidden="true" />
        <div className="inner">
          <div className="eyebrow" data-ns-reveal>Empecemos</div>
          <h2 data-ns-reveal>
            Convirtamos tu operación<br />en un <em>sistema claro</em>.
          </h2>
          <div className="actions" data-ns-reveal>
            <a
              href="mailto:info@hmr-nexus.com?subject=Diseñar mi sistema"
              className="ns-btn ns-btn-primary"
            >
              Diseñar mi sistema <span className="ar">→</span>
            </a>
            <a
              href="mailto:info@hmr-nexus.com?subject=Solicitud de consultoría"
              className="ns-btn ns-btn-ghost"
            >
              Solicitar consultoría
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
