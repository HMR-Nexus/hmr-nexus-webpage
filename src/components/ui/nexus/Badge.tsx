/**
 * NEXUS.OS — Badge
 * Tiny mono uppercase pill for status, tags, counters.
 */
import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'ok' | 'warn' | 'err' | 'info' | 'neutral';

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  variant?: Variant;
  dot?: boolean;
  children?: ReactNode;
}

const VARIANT: Record<Variant, string> = {
  ok: 'nx-badge nx-badge-ok',
  warn: 'nx-badge nx-badge-warn',
  err: 'nx-badge nx-badge-err',
  info: 'nx-badge nx-badge-info',
  neutral: 'nx-badge nx-badge-neutral',
};

const Badge = ({ variant = 'neutral', dot = false, children, className = '', ...rest }: BadgeProps) => (
  <span
    className={`${VARIANT[variant]} ${dot ? 'nx-badge-dot' : ''} ${className}`}
    {...rest}
  >
    {children}
  </span>
);

export default Badge;
