/**
 * NEXUS.OS — Toast
 * Floating notification, top-right. Auto-dismisses after `duration` ms (default 3000).
 */
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

type Variant = 'ok' | 'warn' | 'err';

interface ToastProps {
  variant?: Variant;
  children?: ReactNode;
  duration?: number;
  onDismiss?: () => void;
}

const VARIANT = {
  ok: { icon: CheckCircle2, color: 'var(--success)' },
  warn: { icon: AlertTriangle, color: 'var(--warning)' },
  err: { icon: XCircle, color: 'var(--error)' },
} as const;

const Toast = ({ variant = 'ok', children, duration = 3000, onDismiss }: ToastProps) => {
  useEffect(() => {
    if (!duration || !onDismiss) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  const v = VARIANT[variant];
  const Icon = v.icon;

  return (
    <div
      className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-md border bg-[var(--graphite)] animate-fadeIn"
      style={{ borderColor: v.color }}
      role="status"
    >
      <Icon size={16} style={{ color: v.color, flexShrink: 0 }} />
      <span className="text-[13px] text-[var(--paper)]">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-2 text-[var(--mist)] hover:text-[var(--paper)] transition-colors"
          aria-label="Cerrar"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default Toast;
