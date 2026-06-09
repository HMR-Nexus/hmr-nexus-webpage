import { useEffect, useRef, useState } from 'react';

// Props kept for future use (navigation from within page)
interface FibraPageProps {
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

/* ── Reveal hook ───────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() => prefersReduced());
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Spine fill on scroll ──────────────────────────── */
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
const Diagram01 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="120" y="70" width="240" height="230" rx="4" className="dg-fill" stroke="rgba(245,243,238,0.22)" />
    <line x1="148" y1="104" x2="300" y2="104" className="dg-line" />
    <line x1="148" y1="128" x2="252" y2="128" className="dg-line-2" />
    <rect x="148" y="158" width="150" height="10" rx="2" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <rect x="148" y="182" width="184" height="10" rx="2" className="dg-fill-acc" />
    <rect x="148" y="182" width="184" height="10" rx="2" className="dg-acc" />
    <rect x="148" y="206" width="110" height="10" rx="2" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <rect x="148" y="230" width="160" height="10" rx="2" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <circle cx="135" cy="163" r="3" className="dg-node-acc" />
    <circle cx="135" cy="187" r="3" className="dg-node-acc" />
    <circle cx="135" cy="211" r="3" className="dg-node" />
    <circle cx="135" cy="235" r="3" className="dg-node" />
  </svg>
);

const Diagram02 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="118" y="62" width="244" height="236" rx="4" className="dg-fill" stroke="rgba(245,243,238,0.22)" />
    <line x1="118" y1="98" x2="362" y2="98" className="dg-line-2" />
    <g className="dg-txt">
      <text x="140" y="128">OBRA CIVIL</text><text x="318" y="128" textAnchor="end" fill="rgba(245,243,238,0.7)">— —</text>
      <text x="140" y="156">NE3</text><text x="318" y="156" textAnchor="end" fill="rgba(245,243,238,0.7)">— —</text>
      <text x="140" y="184">FUSIONES</text><text x="318" y="184" textAnchor="end" fill="rgba(245,243,238,0.7)">— —</text>
      <text x="140" y="212">SOPLADO</text><text x="318" y="212" textAnchor="end" fill="rgba(245,243,238,0.7)">— —</text>
      <text x="140" y="240">ACTIVACIÓN</text><text x="318" y="240" textAnchor="end" fill="rgba(245,243,238,0.7)">— —</text>
    </g>
    <line x1="140" y1="258" x2="320" y2="258" className="dg-line-2" />
    <text x="140" y="284" className="dg-txt" fill="var(--ns-accent,#FF4D2E)" style={{ letterSpacing: '0.1em' }}>TOTAL</text>
    <rect x="270" y="272" width="50" height="14" rx="2" className="dg-fill-acc" />
    <rect x="270" y="272" width="50" height="14" rx="2" className="dg-acc" />
  </svg>
);

const Diagram03 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="150" y="86" width="180" height="150" rx="4" className="dg-fill" stroke="rgba(245,243,238,0.22)" />
    <line x1="150" y1="116" x2="330" y2="116" className="dg-line-2" />
    <g stroke="rgba(245,243,238,0.18)" strokeWidth="1">
      <line x1="195" y1="116" x2="195" y2="236" />
      <line x1="240" y1="116" x2="240" y2="236" />
      <line x1="285" y1="116" x2="285" y2="236" />
      <line x1="150" y1="146" x2="330" y2="146" />
      <line x1="150" y1="176" x2="330" y2="176" />
      <line x1="150" y1="206" x2="330" y2="206" />
    </g>
    <rect x="198" y="149" width="39" height="24" className="dg-fill-acc" />
    <rect x="243" y="179" width="39" height="24" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <g className="dg-node-acc">
      <circle cx="100" cy="300" r="9" />
      <circle cx="240" cy="320" r="9" />
      <circle cx="380" cy="300" r="9" />
    </g>
    <g className="dg-acc dg-dash">
      <path d="M100 291 L218 165" />
      <path d="M240 311 L240 173" />
      <path d="M380 291 L262 165" />
    </g>
    <g className="dg-txt" textAnchor="middle">
      <text x="100" y="332">CLIENTE</text>
      <text x="240" y="345">TÉCNICO</text>
      <text x="380" y="332">SITIO</text>
    </g>
  </svg>
);

const Diagram04 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <line x1="40" y1="120" x2="440" y2="120" className="dg-line" />
    <g className="dg-line-2">
      <line x1="40" y1="120" x2="40" y2="135" />
      <line x1="120" y1="120" x2="120" y2="135" />
      <line x1="360" y1="120" x2="360" y2="135" />
      <line x1="440" y1="120" x2="440" y2="135" />
    </g>
    <text x="48" y="110" className="dg-txt">SUPERFICIE</text>
    <path d="M170 120 L200 250 L280 250 L310 120" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <path d="M170 120 L200 250 L280 250 L310 120" className="dg-line" />
    <circle cx="225" cy="222" r="20" className="dg-fill" stroke="rgba(245,243,238,0.4)" />
    <circle cx="225" cy="222" r="11" className="dg-fill-acc" />
    <circle cx="225" cy="222" r="11" className="dg-acc" />
    <circle cx="258" cy="222" r="14" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <g stroke="rgba(245,243,238,0.12)">
      <line x1="40" y1="160" x2="440" y2="160" />
      <line x1="40" y1="200" x2="440" y2="200" />
      <line x1="40" y1="240" x2="440" y2="240" />
    </g>
    <text x="300" y="245" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">DUCTO</text>
  </svg>
);

const Diagram05 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <path d="M40 250 H200 M200 250 V160 H300 M300 160 H440 M200 250 H360 M360 250 V300" className="dg-acc" />
    <g className="dg-node-acc">
      <circle cx="200" cy="250" r="5" />
      <circle cx="300" cy="160" r="5" />
      <circle cx="360" cy="250" r="5" />
    </g>
    <g className="dg-fill" stroke="rgba(245,243,238,0.4)">
      <rect x="290" y="96" width="44" height="64" />
      <rect x="40" y="226" width="40" height="56" />
      <rect x="340" y="300" width="46" height="40" />
    </g>
    <g stroke="rgba(245,243,238,0.2)">
      <line x1="300" y1="110" x2="324" y2="110" />
      <line x1="300" y1="126" x2="324" y2="126" />
      <line x1="300" y1="142" x2="324" y2="142" />
    </g>
    <text x="44" y="110" className="dg-txt">RUTA PRINCIPAL</text>
    <text x="300" y="86" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">PUNTO DE ENTREGA</text>
  </svg>
);

const Diagram06 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="150" y="92" width="180" height="80" rx="40" className="dg-fill" stroke="rgba(245,243,238,0.35)" />
    <g className="dg-line-2">
      <path d="M70 116 H150" />
      <path d="M70 132 H150" />
      <path d="M70 148 H150" />
      <path d="M330 116 H410" />
      <path d="M330 132 H410" />
      <path d="M330 148 H410" />
    </g>
    <g className="dg-node-acc">
      <circle cx="190" cy="132" r="3" />
      <circle cx="240" cy="132" r="3" />
      <circle cx="290" cy="132" r="3" />
    </g>
    <text x="150" y="84" className="dg-txt">CAJA · ODF / CTO</text>
    <rect x="90" y="210" width="300" height="110" rx="4" stroke="rgba(245,243,238,0.18)" fill="none" />
    <text x="102" y="230" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">OTDR</text>
    <path d="M100 300 L160 270 L160 282 L240 258 L240 268 L320 246 L380 244" className="dg-acc" />
    <g stroke="rgba(245,243,238,0.1)">
      <line x1="90" y1="270" x2="390" y2="270" />
      <line x1="90" y1="240" x2="390" y2="240" />
    </g>
  </svg>
);

const Diagram07 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <line x1="50" y1="150" x2="430" y2="150" className="dg-line" />
    <line x1="50" y1="210" x2="430" y2="210" className="dg-line" />
    <line x1="50" y1="150" x2="50" y2="210" className="dg-line-2" />
    <line x1="430" y1="150" x2="430" y2="210" className="dg-line-2" />
    <path d="M70 180 H300" className="dg-acc" />
    <circle cx="300" cy="180" r="5" className="dg-node-acc" />
    <g className="dg-line-2">
      <path d="M330 168 L355 180 L330 192" />
      <path d="M360 168 L385 180 L360 192" />
    </g>
    <text x="56" y="138" className="dg-txt">MICRODUCTO</text>
    <text x="318" y="232" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">AIRE → FIBRA</text>
    <text x="70" y="258" className="dg-txt">VALIDACIÓN DE RUTA</text>
    <path d="M70 270 H410" className="dg-line-2 dg-dash" />
  </svg>
);

const Diagram08 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="80" y="90" width="120" height="200" className="dg-fill" stroke="rgba(245,243,238,0.35)" />
    <g stroke="rgba(245,243,238,0.18)">
      <line x1="110" y1="120" x2="130" y2="120" />
      <line x1="150" y1="120" x2="170" y2="120" />
      <line x1="110" y1="150" x2="130" y2="150" />
      <line x1="150" y1="150" x2="170" y2="150" />
      <line x1="110" y1="180" x2="130" y2="180" />
      <line x1="150" y1="180" x2="170" y2="180" />
    </g>
    <path d="M200 230 H300" className="dg-acc" />
    <rect x="300" y="212" width="64" height="40" rx="4" className="dg-fill-acc" />
    <rect x="300" y="212" width="64" height="40" rx="4" className="dg-acc" />
    <text x="300" y="204" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">ONT / ROUTER</text>
    <circle cx="316" cy="232" r="3" className="dg-node-acc" />
    <g className="dg-line-2" fill="none">
      <path d="M376 222 a14 14 0 0 1 0 20" />
      <path d="M386 214 a26 26 0 0 1 0 36" />
    </g>
    <text x="86" y="312" className="dg-txt">CLIENTE FINAL</text>
  </svg>
);

const Diagram09 = () => (
  <svg viewBox="0 0 480 360" aria-hidden="true">
    <rect x="130" y="64" width="180" height="232" rx="4" className="dg-fill" stroke="rgba(245,243,238,0.22)" />
    <line x1="130" y1="98" x2="310" y2="98" className="dg-line-2" />
    <text x="152" y="90" className="dg-txt" fill="var(--ns-accent,#FF4D2E)">REPORTE FINAL</text>
    <g className="dg-acc">
      <path d="M156 126 l6 6 l10 -12" />
      <path d="M156 156 l6 6 l10 -12" />
      <path d="M156 186 l6 6 l10 -12" />
    </g>
    <g className="dg-line-2">
      <line x1="186" y1="128" x2="288" y2="128" />
      <line x1="186" y1="158" x2="288" y2="158" />
      <line x1="186" y1="188" x2="288" y2="188" />
    </g>
    <rect x="156" y="216" width="60" height="46" rx="3" className="dg-fill" stroke="rgba(245,243,238,0.3)" />
    <path d="M156 250 L176 234 L190 246 L204 236 L216 248" className="dg-line" />
    <circle cx="200" cy="228" r="4" className="dg-node" />
    <rect x="228" y="216" width="60" height="46" rx="3" stroke="rgba(245,243,238,0.18)" fill="none" />
    <path d="M240 250 L252 240 L268 250" className="dg-line-2" />
    <text x="156" y="284" className="dg-txt">EVIDENCIA · MEDICIONES · AS-BUILT</text>
  </svg>
);

/* ── Main component ────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FibraPage(_props: FibraPageProps) {
  const flowRef = useRef<HTMLElement | null>(null);
  const fillRef = useFillSpine(flowRef);

  const { ref: ctaRevRef, visible: ctaRevVisible } = useReveal();

  const stages = [
    {
      num: 'Etapa 01', title: 'Consultoría & estructuración',
      body: 'Analizamos el alcance real del proyecto, definimos fases, organizamos recursos y revisamos requerimientos técnicos para preparar una estructura de ejecución clara y tiempos estimados.',
      specs: ['Alcance', 'Fases', 'Recursos', 'Cronograma'],
      corner: 'FASE · PLANIFICACIÓN',
      diagram: <Diagram01 />,
    },
    {
      num: 'Etapa 02', title: 'Presupuestos',
      body: 'Preparamos presupuestos según alcance real: obra civil, NE3, fusiones, soplado, instalaciones, activaciones, citas, equipos y soporte operativo. Cada partida desglosada y justificada.',
      specs: ['Obra civil', 'NE3', 'Fusiones', 'Soplado', 'Equipos'],
      corner: 'FASE · COSTOS',
      diagram: <Diagram02 />,
    },
    {
      num: 'Etapa 03', title: 'Citas & coordinación operativa',
      body: 'Gestionamos citas con clientes, técnicos, administradores, propietarios y responsables de sitio. Una coordinación precisa evita retrasos y mejora la ejecución en campo.',
      specs: ['Clientes', 'Técnicos', 'Sitios', 'Agenda'],
      corner: 'FASE · COORDINACIÓN',
      diagram: <Diagram03 />,
    },
    {
      num: 'Etapa 04', title: 'Obra civil',
      body: 'Apertura de zanjas, canalizaciones, ductos y permisos. Preparamos el recorrido, resolvemos cruces y cámaras, ejecutamos reparaciones y coordinamos con la infraestructura existente.',
      specs: ['Zanjas', 'Ductos', 'Permisos', 'Cámaras', 'Cruces'],
      corner: 'FASE · OBRA CIVIL',
      diagram: <Diagram04 />,
    },
    {
      num: 'Etapa 05', title: 'Red exterior · NE3',
      body: 'Tendido de fibra, rutas principales y distribución hacia edificios y puntos de entrega. Dejamos la red exterior preparada técnicamente para continuar con la instalación interior.',
      specs: ['Tendido', 'Rutas', 'Distribución', 'Entrega'],
      corner: 'FASE · RED EXTERIOR · NE3',
      diagram: <Diagram05 />,
    },
    {
      num: 'Etapa 06', title: 'Fusiones & mediciones',
      body: 'Empalmes de fibra, cajas, ODF y CTO. Ejecutamos pruebas de continuidad y mediciones OTDR con control de calidad y documentación técnica de cada punto.',
      specs: ['Empalmes', 'ODF / CTO', 'OTDR', 'Continuidad', 'QA'],
      corner: 'FASE · FUSIONES & MEDICIÓN',
      diagram: <Diagram06 />,
    },
    {
      num: 'Etapa 07', title: 'Soplado de fibra',
      body: 'Soplado dentro de ductos y microductos con control de rutas, preparación del cableado y validación del tendido. Verificamos cada tramo antes de continuar.',
      specs: ['Microductos', 'Rutas', 'Cableado', 'Validación'],
      corner: 'FASE · SOPLADO',
      diagram: <Diagram07 />,
    },
    {
      num: 'Etapa 08', title: 'Instalación & activación · NE5',
      body: 'Instalación final en cliente, conexión de equipos y ONT/router cuando aplica. Validamos el servicio, activamos la conexión y ejecutamos la prueba final de funcionamiento.',
      specs: ['ONT / Router', 'Conexión', 'Activación', 'Prueba final'],
      corner: 'FASE · INSTALACIÓN · NE5',
      diagram: <Diagram08 />,
    },
    {
      num: 'Etapa 09', title: 'Entrega & documentación',
      body: 'Cierre técnico con evidencia fotográfica, reportes, mediciones y estado final del proyecto. Entregamos al cliente documentación completa y trazable de toda la ejecución.',
      specs: ['Reportes', 'Evidencia', 'Mediciones', 'As-built'],
      corner: 'FASE · ENTREGA',
      diagram: <Diagram09 />,
    },
  ];

  return (
    <div className="ns-root">
      {/* HERO */}
      <section className="ns-fo-hero">
        <div className="bg" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 700" fill="none">
            <defs>
              <radialGradient id="ns-fo-hz" cx="0.75" cy="0.15" r="0.85">
                <stop stopColor="#FF4D2E" stopOpacity="0.10" />
                <stop offset="1" stopColor="#FF4D2E" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1440" height="700" fill="url(#ns-fo-hz)" />
            <g stroke="rgba(245,243,238,0.05)" strokeWidth="1">
              <path d="M0 175 H1440 M0 350 H1440 M0 525 H1440" />
              <path d="M360 0 V700 M720 0 V700 M1080 0 V700" />
            </g>
            <path
              id="ns-foLine"
              d="M-40 520 C 300 500, 460 250, 760 280 S 1180 460, 1500 220"
              stroke="#FF4D2E"
              strokeOpacity="0.5"
              strokeWidth="1.6"
              fill="none"
            />
            <circle r="3.5" fill="#FF4D2E">
              <animateMotion dur="6s" repeatCount="indefinite" path="M-40 520 C 300 500, 460 250, 760 280 S 1180 460, 1500 220" />
              <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div className="inner">
          <div className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Trabajos de fibra óptica
          </div>
          <h1>De la planificación<br />a la <span className="hl">activación</span>.</h1>
          <p className="sub">
            Ejecutamos proyectos de fibra con control técnico y operativo en cada etapa.
            NEXUS no solo instala: estructura, coordina, ejecuta, mide, documenta y entrega.
          </p>
          <div className="actions">
            <button
              className="ns-btn ns-btn-primary"
              onClick={() => document.getElementById('ns-fo-contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Pedir presupuesto <span className="ar">→</span>
            </button>
            <button
              className="ns-btn ns-btn-ghost"
              onClick={() => document.getElementById('ns-flujo')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver el proceso
            </button>
          </div>
        </div>
      </section>

      {/* VERBS */}
      <div className="ns-fo-verbs" aria-label="What we do">
        <div className="inner">
          <div className="lead">No solo instalamos fibra</div>
          <div className="chips">
            {['Estructura', 'Coordina', 'Ejecuta', 'Mide', 'Documenta', 'Entrega'].map(v => (
              <span key={v} className="chip">{v}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FLOW */}
      <section
        className="ns-fo-flow"
        id="ns-flujo"
        ref={flowRef as React.RefObject<HTMLElement>}
        aria-label="9-stage fibre project timeline"
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
      <section className="ns-fo-cta" id="ns-fo-contact">
        <div className="glowbg" aria-hidden="true" />
        <div className="inner">
          <div className={`eyebrow ${ctaRevVisible ? 'in' : ''}`} data-ns-reveal ref={ctaRevRef as React.RefObject<HTMLDivElement>}>
            Empecemos
          </div>
          <h2 data-ns-reveal>
            Evaluamos tu proyecto<br />de fibra <em>de principio a fin</em>.
          </h2>
          <div className="actions" data-ns-reveal>
            <a
              href="mailto:info@hmr-nexus.com?subject=Evaluación de proyecto de fibra"
              className="ns-btn ns-btn-primary"
            >
              Solicitar evaluación del proyecto <span className="ar">→</span>
            </a>
            <a
              href="mailto:info@hmr-nexus.com?subject=Solicitud de presupuesto"
              className="ns-btn ns-btn-ghost"
            >
              Pedir presupuesto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
