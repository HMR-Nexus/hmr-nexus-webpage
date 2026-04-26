/**
 * NEXUS.OS — Panel
 * The base "card" container. Border + radius-md, surface bg, no shadow.
 * Optional header with title + meta + actions slot.
 */
import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  padding?: boolean;
  className?: string;
  bodyClassName?: string;
}

const Panel = ({
  title,
  meta,
  actions,
  children,
  padding = true,
  className = '',
  bodyClassName = '',
}: PanelProps) => {
  const hasHeader = title || meta || actions;
  return (
    <section className={`panel ${className}`}>
      {hasHeader && (
        <header className="phead">
          <div className="flex items-center gap-3 min-w-0">
            {title && <h3 className="title truncate">{title}</h3>}
            {meta && <span className="m">{meta}</span>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </header>
      )}
      <div className={`${padding ? 'pbody' : ''} ${bodyClassName}`}>{children}</div>
    </section>
  );
};

export default Panel;
