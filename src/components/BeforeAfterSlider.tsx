import { useCallback, useRef, useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
}

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, label }: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    if ('touches' in e) updatePos(e.touches[0].clientX);
    else updatePos(e.clientX);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    if ('touches' in e) updatePos(e.touches[0].clientX);
    else updatePos(e.clientX);
  };

  const onUp = () => setDragging(false);

  return (
    <div
      ref={ref}
      className="relative h-72 w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 sm:h-96"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${ref.current?.clientWidth ?? 1000}px`, maxWidth: 'none' }} draggable={false} />
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">Before</span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">After</span>

      <div className="absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2">
          <div className="h-full w-0.5 bg-accent-400" />
        </div>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-accent-400 bg-neutral-900/90 text-accent-400 shadow-xl backdrop-blur-sm">
            <ChevronsLeftRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {label && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-sm font-semibold text-white">{label}</p>
        </div>
      )}
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/50">Drag to compare</p>
    </div>
  );
}
