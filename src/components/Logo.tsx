export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-accent-600/90 text-white shadow-lg shadow-accent-600/20 ring-1 ring-accent-400/30 overflow-hidden">
        <svg viewBox="0 0 100 100" className="h-8 w-8" aria-hidden="true">
          {/*
            Arc: 7 segments in a semicircle, center (50, 57).
            Angles run from 200° to 340° (through 270° = top in SVG).
            Inner radius 20, outer radius 32. 6° gap between segments.
            Total span = 140°, 6 gaps × 6° = 36°, leaving 104° for 7 segments = ~14.86° each.
          */}
          {(() => {
            const cx = 50, cy = 57, ri = 20, ro = 32;
            const totalSpan = 140;
            const gapDeg = 6;
            const count = 7;
            const segSpan = (totalSpan - (count - 1) * gapDeg) / count;
            const startDeg = 200;
            const toRad = (d: number) => (d * Math.PI) / 180;
            return Array.from({ length: count }, (_, idx) => {
              const s = toRad(startDeg + idx * (segSpan + gapDeg));
              const e = toRad(startDeg + idx * (segSpan + gapDeg) + segSpan);
              const x1 = (cx + ri * Math.cos(s)).toFixed(3);
              const y1 = (cy + ri * Math.sin(s)).toFixed(3);
              const x2 = (cx + ro * Math.cos(s)).toFixed(3);
              const y2 = (cy + ro * Math.sin(s)).toFixed(3);
              const x3 = (cx + ro * Math.cos(e)).toFixed(3);
              const y3 = (cy + ro * Math.sin(e)).toFixed(3);
              const x4 = (cx + ri * Math.cos(e)).toFixed(3);
              const y4 = (cy + ri * Math.sin(e)).toFixed(3);
              return (
                <path
                  key={idx}
                  d={`M${x2},${y2} A${ro},${ro} 0 0,1 ${x3},${y3} L${x4},${y4} A${ri},${ri} 0 0,0 ${x1},${y1} Z`}
                  fill="white"
                />
              );
            });
          })()}

          {/*
            Needle: bold triangle pointing to ~11 o'clock (upper-left).
            Base is a thin line near the arc center (50,57), tip points upper-left.
            Matches the large filled triangle in the reference image.
          */}
          <polygon points="50,56 47,58 30,35" fill="white" />

          {/*
            Anvil body: sits directly below the arc.
            Top surface spans from x=30 to x=88 at y=60 (wide flat top).
            Body curves inward at the bottom: x=35 to x=82 at y=73.
            Horn: triangular beak extending left from the left side of the top.
            Base pedestal: trapezoid centered below.
          */}
          {/* Main anvil body — wide top, curves under */}
          <path d="M30,60 L88,60 L84,73 L37,73 Q33,73 30,60 Z" fill="white" />
          {/* Left horn — triangular, extends left from top of anvil */}
          <path d="M30,60 L12,63 L18,70 L30,68 Z" fill="white" />
          {/* Base pedestal — wider at top, narrower at bottom */}
          <path d="M42,73 L58,73 L64,85 L36,85 Z" fill="white" />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ animation: 'sweep 3s ease-in-out infinite' }}
        />
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        <span className="text-white light:text-neutral-900">Dash</span>
        <span className="text-accent-400">Forge</span>
      </span>
    </span>
  );
}
