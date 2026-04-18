import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Subtle radial gradient that follows the mouse within a container.
 * Wrap a section with this component to add a spotlight effect.
 */
interface MouseGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

export function MouseGlow({
  children,
  className = '',
  color = 'rgba(198,255,61,0.06)',
  size = 400,
  opacity = 1,
}: MouseGlowProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(-size);
  const y = useMotionValue(-size);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };

    const onLeave = () => {
      x.set(-size);
      y.set(-size);
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [isMobile, x, y, size]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-3xl"
          style={{
            x: springX,
            y: springY,
            width: size,
            height: size,
            translateX: '-50%',
            translateY: '-50%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
          }}
        />
      )}
      {children}
    </div>
  );
}
