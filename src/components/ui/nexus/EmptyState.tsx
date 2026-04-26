/**
 * NEXUS.OS — EmptyState
 * Standard empty placeholder for tables, lists, panels.
 */
import type { ReactNode, ComponentType } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: ComponentType<{ size?: number; className?: string }>;
  className?: string;
}

const EmptyState = ({ title, description, action, icon: Icon, className = '' }: EmptyStateProps) => (
  <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
    {Icon && (
      <div className="w-10 h-10 rounded-md border border-[var(--rule)] bg-[var(--graphite)] flex items-center justify-center mb-4">
        <Icon size={16} className="text-[var(--mist)]" />
      </div>
    )}
    {title && (
      <p className="nd-label mb-2">[{title}]</p>
    )}
    {description && (
      <p className="text-[13px] text-[var(--mist)] max-w-[400px] leading-relaxed">
        {description}
      </p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
