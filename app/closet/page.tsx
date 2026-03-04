'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const colors = {
  olive: '#8A9B7A',
  softPink: '#E8C4C4',
  plum: '#9B7AAF',
  warmBrown: '#C9A67A',
  nearBlack: '#FAF7F2',
  cream: '#261A14',
  creamAlt: '#332520',
};

const CASUAL_COUNT = 49;
const FORMAL_COUNT = 34;

type Category = 'casual' | 'formal';

const categoryMeta: Record<Category, { label: string; count: number; prefix: string }> = {
  casual: { label: 'Everyday Casual', count: CASUAL_COUNT, prefix: 'casual' },
  formal: { label: 'Formal', count: FORMAL_COUNT, prefix: 'formal' },
};

function slideSrc(prefix: string, n: number) {
  return `/outfits/slides/${prefix}-${n}.jpg`;
}

export default function ClosetPage() {
  const [category, setCategory] = useState<Category>('casual');
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const preloadRef = useRef<Set<string>>(new Set());

  const meta = categoryMeta[category];

  const next = () => { setLoaded(false); setPage((p) => Math.min(p + 1, meta.count)); };
  const prev = () => { setLoaded(false); setPage((p) => Math.max(p - 1, 1)); };

  const switchCategory = (cat: Category) => {
    if (cat === category) return;
    setLoaded(false);
    setCategory(cat);
    setPage(1);
  };

  // Preload adjacent images
  useEffect(() => {
    const toPreload: string[] = [];
    for (let offset = 1; offset <= 3; offset++) {
      if (page + offset <= meta.count) toPreload.push(slideSrc(meta.prefix, page + offset));
      if (page - offset >= 1) toPreload.push(slideSrc(meta.prefix, page - offset));
    }
    toPreload.forEach((src) => {
      if (!preloadRef.current.has(src)) {
        preloadRef.current.add(src);
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [page, meta.count, meta.prefix]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const currentSrc = slideSrc(meta.prefix, page);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${colors.softPink}; color: ${colors.cream}; }
      `}</style>

      <main className="min-h-screen font-sans-light antialiased" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
        {/* Header */}
        <nav className="py-5 px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-serif-display text-xl tracking-wide hover:opacity-60 transition-opacity">
              Melisa Onder
            </Link>
            <Link href="/#projects" className="text-sm font-light hover:opacity-60 transition-opacity">
              Back to Portfolio
            </Link>
          </div>
        </nav>

        {/* Title + Description */}
        <div className="max-w-6xl mx-auto px-8 pt-4 pb-8">
          <h1 className="font-serif-display text-4xl md:text-5xl font-light mb-3" style={{ color: colors.softPink }}>
            Outfit Board
          </h1>
          <p className="text-sm leading-relaxed font-light max-w-2xl" style={{ opacity: 0.7 }}>
            What began as a passion project has become one of my most practical and consistently used personal tools. My outfit board is an ongoing creative outlet with endless possibility within a defined, intentional, and timelessly fashionable wardrobe.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center gap-3 mt-6">
            {(Object.keys(categoryMeta) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => switchCategory(cat)}
                className="px-5 py-2 text-sm font-light tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: category === cat ? colors.softPink : 'transparent',
                  color: category === cat ? colors.cream : colors.softPink,
                  border: `1px solid ${colors.softPink}${category === cat ? '' : '60'}`,
                }}
              >
                {categoryMeta[cat].label}
                <span className="ml-2 text-xs" style={{ opacity: 0.6 }}>
                  {categoryMeta[cat].count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Flipbook */}
        <div className="max-w-6xl mx-auto px-8 pb-12">
          <div className="relative">
            {/* Slide display */}
            <div
              className="relative w-full overflow-hidden"
              style={{ backgroundColor: colors.creamAlt }}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  key={currentSrc}
                  src={currentSrc}
                  alt={`${meta.label} outfit ${page}`}
                  fill
                  className={`object-contain transition-opacity duration-150 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  onLoad={() => setLoaded(true)}
                />
              </div>

              {/* Click zones for prev/next */}
              <button
                onClick={prev}
                disabled={page === 1}
                className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-10 group"
                aria-label="Previous"
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: `${colors.cream}cc` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>
              </button>
              <button
                onClick={next}
                disabled={page === meta.count}
                className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-10 group"
                aria-label="Next"
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: `${colors.cream}cc` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Bottom bar: page counter + scrubber */}
            <div className="flex items-center gap-4 mt-4">
              <p className="text-xs font-light tabular-nums shrink-0" style={{ color: colors.softPink }}>
                {String(page).padStart(2, '0')} / {String(meta.count).padStart(2, '0')}
              </p>

              {/* Progress scrubber */}
              <div className="flex-1 relative h-1 group cursor-pointer"
                style={{ backgroundColor: `${colors.softPink}20` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  const newPage = Math.max(1, Math.min(meta.count, Math.round(pct * meta.count)));
                  setLoaded(false);
                  setPage(newPage);
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-200"
                  style={{
                    width: `${(page / meta.count) * 100}%`,
                    backgroundColor: colors.softPink,
                  }}
                />
              </div>

              <p className="text-xs font-light shrink-0" style={{ opacity: 0.4 }}>
                Use arrow keys or click sides to navigate
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
