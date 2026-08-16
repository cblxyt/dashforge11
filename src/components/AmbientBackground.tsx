import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: Dot[] = [];
    let scrollY = window.scrollY;
    let scrollVel = 0;
    let width = 0;
    let height = 0;
    let raf = 0;

    const AREA = 16000;
    const MAX_DIST = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const MAX_SCROLL_PARALLAX = 300;

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((width * height) / AREA));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.5,
        depth: Math.random() * 0.8 + 0.2,
      }));
    }

    function onScroll() {
      const next = window.scrollY;
      scrollVel = (next - scrollY) * 0.15;
      scrollY = next;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      const dotColor = isLight ? '80, 80, 80' : '139, 142, 249';
      const lineColor = isLight ? '120, 120, 120' : '139, 142, 249';
      const scrollFrac = Math.min(Math.abs(scrollY) / MAX_SCROLL_PARALLAX, 1);
      const dirSign = scrollY >= 0 ? 1 : -1;
      const baseShift = scrollFrac * dirSign;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy + scrollVel * 0.004 * d.depth;

        if (d.x < -20) d.x = width + 20;
        if (d.x > width + 20) d.x = -20;
        if (d.y < -20) d.y = height + 20;
        if (d.y > height + 20) d.y = -20;
      }

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DIST_SQ) {
            const alpha = (1 - distSq / MAX_DIST_SQ) * 0.25;
            ctx!.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const parallax = baseShift * 50 * d.depth;
        const alpha = 0.25 + d.depth * 0.45;
        ctx!.fillStyle = `rgba(${dotColor}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y + parallax, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      scrollVel *= 0.9;
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLight]);

  const bgColor = isLight ? '#fafafa' : '#08080f';
  const vignette = isLight ? 'rgba(250,250,250,0)' : 'rgba(8,8,15,0)';

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${vignette} 40%, ${bgColor} 100%)` }}
      />
    </div>
  );
}
