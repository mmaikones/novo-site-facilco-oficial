import React, { useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CarouselImage = {
  src: string;
  alt: string;
  label?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  images: CarouselImage[];
};

const FullBleedImageCarousel: React.FC<Props> = ({ title, subtitle, images }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const uid = useMemo(() => `carousel-${Math.random().toString(16).slice(2)}`, []);

  const scrollByOne = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-carousel-item]');
    const w = first?.offsetWidth ?? 320;
    el.scrollBy({ left: dir * (w + 16), behavior: 'smooth' });
  };

  if (!images?.length) return null;

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen overflow-x-clip">
      <div className="px-6 md:px-10">
        {(title || subtitle) && (
          <div className="max-w-6xl mx-auto mb-4 md:mb-6">
            {title && (
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">{title}</h3>
            )}
            {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Voltar"
          onClick={() => scrollByOne(-1)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-lg items-center justify-center hover:scale-105 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollerRef}
          id={uid}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-10 pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {images.map((img) => (
            <div
              key={img.src}
              data-carousel-item
              className="relative snap-start shrink-0 w-[86vw] sm:w-[70vw] md:w-[58vw] lg:w-[46vw] xl:w-[38vw] overflow-hidden rounded-2xl border border-white/30 shadow-[0_16px_34px_rgba(0,0,0,0.18)] bg-black"
            >
              <img src={img.src} alt={img.alt} className="w-full h-[240px] sm:h-[280px] md:h-[320px] object-cover" />
              {img.label && (
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                  <p className="text-white font-semibold drop-shadow">{img.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Avancar"
          onClick={() => scrollByOne(1)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-lg items-center justify-center hover:scale-105 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Hide scrollbar (WebKit) */}
      <style>{`
        #${uid}::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default FullBleedImageCarousel;

