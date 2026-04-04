import { type Variants, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

// Nothing Design: subtle ease-out, opacity-first. No spring, no bounce.
const NOTHING_EASE = [0.25, 0.1, 0.25, 1] as const;

// Note: initial="hidden" sets opacity:0 only after JS hydrates.
// Before that, elements are visible via CSS (no layout shift on slow connections).
export const fadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: NOTHING_EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardEntrance: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: NOTHING_EASE },
  },
};

export const listItemSlide: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: NOTHING_EASE } },
};

// Reduced motion helper
export function safeVariants(variants: Variants, reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }
  return variants;
}

// Count-up hook for animated numbers
export function useCountUp(target: number, duration = 2, trigger = false) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (trigger) {
      const controls = animate(count, target, { duration, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [trigger, target, duration, count]);

  useEffect(() => {
    return rounded.on('change', (v) => setDisplay(v));
  }, [rounded]);

  return display;
}
