/**
 * NEXUS.OS — KPI + KPIGrid
 *
 * Signature pattern: a row of metric cards inside one bordered container,
 * separated by gap-px (renders as 1px dividers on the surface underneath).
 */
import type { ReactNode, ComponentType, KeyboardEvent } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

type Tone = 'default' | 'ok' | 'warn' | 'err' | 'info';
type Cols = 2 | 3 | 4 | 5;
type Size = 'sm' | 'md' | 'lg';

interface KPIGridProps {
  cols?: Cols;
  children?: ReactNode;
  className?: string;
}

interface KPIProps {
  label: string;
  value: ReactNode;
  meta?: ReactNode;
  delta?: ReactNode;
  trend?: 'up' | 'down';
  tone?: Tone;
  size?: Size;
  icon?: ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
  className?: string;
}

const TONE: Record<Tone, string> = {
  default: 'var(--text-primary)',
  ok: 'var(--success)',
  warn: 'var(--warning)',
  err: 'var(--error)',
  info: 'var(--info)',
};

export const KPIGrid = ({ cols = 4, children, className = '' }: KPIGridProps) => {
  const colCls: Record<Cols, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
  };

  return (
    <div
      className={`grid ${colCls[cols]} gap-px border border-[var(--rule)] rounded-md overflow-hidden bg-[var(--rule)] ${className}`}
    >
      {children}
    </div>
  );
};

export const KPI = ({
  label,
  value,
  meta,
  delta,
  trend,
  tone = 'default',
  size = 'md',
  icon: Icon,
  onClick,
  className = '',
}: KPIProps) => {
  const valueColor = TONE[tone];
  const isClickable = typeof onClick === 'function';

  const valueSize =
    size === 'lg' ? 'text-[40px] leading-[1]' : size === 'sm' ? 'text-[18px]' : 'text-[22px]';

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      className={`bg-[var(--ink)] px-5 py-4 ${
        isClickable ? 'cursor-pointer hover:bg-[var(--graphite)] transition-colors' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="nd-label">{label}</p>
        {Icon && <Icon size={14} className="text-[var(--mist)] flex-shrink-0 mt-0.5" />}
      </div>
      <p
        className={`nd-mono ${valueSize} tabular-nums tracking-tight mt-2`}
        style={{ color: valueColor }}
      >
        {value}
      </p>
      {(meta || delta) && (
        <div className="flex items-center gap-2 mt-2">
          {delta && (
            <span
              className="nd-mono text-[11px] flex items-center gap-1"
              style={{ color: trend === 'down' ? 'var(--error)' : 'var(--success)' }}
            >
              {trend === 'down' ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
              {delta}
            </span>
          )}
          {meta && <p className="nd-mono text-[11px] text-[var(--mist)]">{meta}</p>}
        </div>
      )}
    </div>
  );
};

export default KPI;
