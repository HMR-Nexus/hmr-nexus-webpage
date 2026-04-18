/**
 * NEXUS Lockup — canonical brand mark.
 * Built per the Brand Guidelines marks.jsx spec:
 *  - Symbol: "nexus point" — crosshair + inner dot, geometric & precise
 *  - Wordmark: NEXUS in Space Grotesk Medium, -0.05em tracking
 *  - Super: HMR · ENGINEERING in JetBrains Mono, 0.22em tracking
 *
 * Usage:
 *   <NexusLockup variant="horizontal" size={28} color="var(--paper)" />
 *   <NexusLockup variant="symbol" size={32} color="var(--accent)" />
 *   <NexusLockup variant="wordmark" size={40} showSuper={false} />
 */

type LockupVariant = 'horizontal' | 'vertical' | 'wordmark' | 'symbol';

interface NexusLockupProps {
  variant?: LockupVariant;
  /** cap-height of NEXUS wordmark in px; symbol scales from it */
  size?: number;
  color?: string;
  /** show HMR · ENGINEERING super */
  showSuper?: boolean;
  className?: string;
}

export function NexusSymbol({
  size = 32,
  color = 'currentColor',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
      style={{ display: 'block' }}
    >
      <circle cx="32" cy="32" r="10" fill={color} />
      <circle cx="32" cy="32" r="22" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <line x1="32" y1="2"  x2="32" y2="10" stroke={color} strokeWidth="1.2" />
      <line x1="32" y1="54" x2="32" y2="62" stroke={color} strokeWidth="1.2" />
      <line x1="2"  y1="32" x2="10" y2="32" stroke={color} strokeWidth="1.2" />
      <line x1="54" y1="32" x2="62" y2="32" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

export function NexusWordmark({
  size = 40,
  color = 'currentColor',
  showSuper = true,
  className = '',
}: {
  size?: number;
  color?: string;
  showSuper?: boolean;
  className?: string;
}) {
  const superSize = Math.max(8, size * 0.22);

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        color,
        fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
        lineHeight: 1,
      }}
    >
      {showSuper && (
        <div
          style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: superSize,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: size * 0.18,
          }}
        >
          HMR · ENGINEERING
        </div>
      )}
      <div
        style={{
          fontSize: size,
          fontWeight: 500,
          letterSpacing: '-0.05em',
          lineHeight: 0.9,
        }}
      >
        NEXUS
      </div>
    </div>
  );
}

export function NexusLockup({
  variant = 'horizontal',
  size = 28,
  color = 'currentColor',
  showSuper = true,
  className = '',
}: NexusLockupProps) {
  if (variant === 'symbol') {
    return <NexusSymbol size={size * 1.5} color={color} className={className} />;
  }
  if (variant === 'wordmark') {
    return <NexusWordmark size={size} color={color} showSuper={showSuper} className={className} />;
  }
  if (variant === 'vertical') {
    return (
      <div
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.5, color }}
      >
        <NexusSymbol size={size * 1.6} color={color} />
        <NexusWordmark size={size} color={color} showSuper={showSuper} />
      </div>
    );
  }
  // horizontal
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.55,
        color,
      }}
    >
      <NexusSymbol size={size * 1.25} color={color} />
      <NexusWordmark size={size} color={color} showSuper={showSuper} />
    </div>
  );
}
