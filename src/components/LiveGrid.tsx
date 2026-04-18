import { useRef, useEffect, useCallback } from 'react';

/**
 * LiveGrid — animated dot-matrix background.
 * Dots breathe on/off with occasional blue wave pulses.
 */

const GRID_SIZE = 16;
const DOT_RADIUS = 0.8;

interface Dot {
  opacity: number;
  targetOpacity: number;
  speed: number;
}

export function LiveGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dotsRef = useRef<Dot[][]>([]);
  const frameRef = useRef(0);
  const sizeRef = useRef({ cols: 0, rows: 0, w: 0, h: 0 });

  const initDots = useCallback((cols: number, rows: number) => {
    const dots: Dot[][] = [];
    for (let r = 0; r < rows; r++) {
      dots[r] = [];
      for (let c = 0; c < cols; c++) {
        dots[r][c] = {
          opacity: Math.random() * 0.15 + 0.03,
          targetOpacity: Math.random() * 0.15 + 0.03,
          speed: Math.random() * 0.008 + 0.003,
        };
      }
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Guard: skip if layout hasn't resolved yet
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(rect.width / GRID_SIZE) + 1;
      const rows = Math.ceil(rect.height / GRID_SIZE) + 1;

      if (cols !== sizeRef.current.cols || rows !== sizeRef.current.rows) {
        sizeRef.current = { cols, rows, w: rect.width, h: rect.height };
        dotsRef.current = initDots(cols, rows);
      } else {
        sizeRef.current.w = rect.width;
        sizeRef.current.h = rect.height;
      }
    };

    // Defer first resize to next frame so layout is resolved
    requestAnimationFrame(resize);
    window.addEventListener('resize', resize);

    const animate = () => {
      const { cols, rows, w, h } = sizeRef.current;
      // Skip if not initialized
      if (cols === 0 || rows === 0) {
        resize();
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const frame = frameRef.current++;
      const dots = dotsRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dot = dots[r]?.[c];
          if (!dot) continue;

          const diff = dot.targetOpacity - dot.opacity;
          dot.opacity += diff * dot.speed * 3;

          if (Math.abs(diff) < 0.005) {
            dot.targetOpacity = Math.random() * 0.25 + 0.02;
            dot.speed = Math.random() * 0.008 + 0.003;
          }

          // Wave pulse
          let pulse = 0;
          if (frame % 360 < 120) {
            const waveX = ((frame % 360) / 120) * (cols + 20) - 10;
            const dist = Math.abs(c - waveX);
            if (dist < 6) {
              pulse = (1 - dist / 6) * 0.3;
            }
          }

          const alpha = Math.min(dot.opacity + pulse, 0.5);

          if (pulse > 0.05) {
            ctx.fillStyle = `rgba(255, 77, 46, ${alpha})`;
          } else {
            // Base — paper, very low alpha
            ctx.fillStyle = `rgba(245, 243, 238, ${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(c * GRID_SIZE, r * GRID_SIZE, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    // Pause when tab is hidden, resume when visible
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        resize();
        animRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
