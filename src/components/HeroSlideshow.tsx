import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideImage {
  src: string;
  label: string;
  sub: string;
}

interface Props {
  images: SlideImage[];
  intervalMs?: number;
}

export function HeroSlideshow({ images, intervalMs = 4000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      next();
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, intervalMs, paused, next]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Image slideshow"
      className="group relative h-[380px] overflow-hidden rounded-2xl sm:h-[480px] lg:h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            i === index
              ? 'translate-x-0 opacity-100'
              : i === (index - 1 + images.length) % images.length
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
          }`}
        >
          <img
            src={img.src}
            alt={`${img.label} ${img.sub}`}
            className="h-full w-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="text-sm font-semibold text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">{img.label}</p>
            <p className="text-xs text-white/70">{img.sub}</p>
          </div>
        </div>
      ))}

      {/* Arrow buttons — show on hover/focus */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-accent-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
