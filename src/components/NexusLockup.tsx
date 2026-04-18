/**
 * NEXUS Lockup — canonical brand marks.
 *
 * Geometry per the official SVG set in /public/logos/:
 *   Symbol = stylized N monogram (two 9×42 bars + diagonal slab)
 *   Wordmark = NEXUS in Space Grotesk 500, -0.05em tracking
 *
 * The diagonal stroke of the N is the brand accent (#FF4D2E by default).
 *
 * Usage:
 *   <NexusLockup variant="horizontal" size={22} color="var(--paper)" />
 *   <NexusSymbol size={32} />
 *   <NexusWordmark size={40} showSuper={false} />
 */

type LockupVariant = 'horizontal' | 'vertical' | 'wordmark' | 'symbol';

interface NexusSymbolProps {
  size?: number;
  /** color for the two vertical bars (defaults to currentColor) */
  color?: string;
  /** color for the diagonal slab (defaults to --accent) */
  accent?: string;
  className?: string;
}

export function NexusSymbol({
  size = 32,
  color = 'currentColor',
  accent,
  className = '',
}: NexusSymbolProps) {
  const diag = accent ?? 'var(--accent)';
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
      <rect x="8"  y="8" width="10" height="48" fill={color} />
      <rect x="46" y="8" width="10" height="48" fill={color} />
      <path d="M18 12 L46 60 L46 48 L18 0 Z" fill={diag} />
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
  const superSize = Math.max(9, size * 0.22);
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

interface NexusLockupProps {
  variant?: LockupVariant;
  size?: number;
  color?: string;
  /** override diagonal accent color */
  accent?: string;
  showSuper?: boolean;
  className?: string;
}

export function NexusLockup({
  variant = 'horizontal',
  size = 22,
  color = 'currentColor',
  accent,
  showSuper = true,
  className = '',
}: NexusLockupProps) {
  if (variant === 'symbol') {
    return <NexusSymbol size={size * 1.5} color={color} accent={accent} className={className} />;
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
        <NexusSymbol size={size * 1.6} color={color} accent={accent} />
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
      <NexusSymbol size={size * 1.25} color={color} accent={accent} />
      <NexusWordmark size={size} color={color} showSuper={showSuper} />
    </div>
  );
}
