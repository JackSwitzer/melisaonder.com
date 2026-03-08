'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── VARIANT 3: Extracted PPTX items, responsive collage layout ── */

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

interface ManifestItem {
  file: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

interface ManifestLook {
  id: string;
  slideIndex: number;
  backgroundColor: string | null;
  items: ManifestItem[];
}

interface Manifest {
  slideWidth: number;
  slideHeight: number;
  looks: ManifestLook[];
}

export default function Closet3Page() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  // Load manifest
  useEffect(() => {
    fetch('/outfits/extracted/manifest.json')
      .then((r) => r.json())
      .then((data: Manifest) => {
        // Filter out empty looks (title slides)
        data.looks = data.looks.filter((l) => l.items.length > 0);
        setManifest(data);
      })
      .catch(console.error);
  }, []);

  const total = manifest?.looks.length ?? 0;

  const openCover = useCallback(() => {
    if (!manifest) return;
    setShowCover(false);
  }, [manifest]);

  const goNext = useCallback(() => setIdx((i) => Math.min(i + 1, total - 1)), [total]);
  const goPrev = useCallback(() => {
    setIdx((prev) => {
      if (prev === 0) { setShowCover(true); return 0; }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); showCover ? openCover() : goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); if (!showCover) goPrev(); }
      else if (e.key === 'Escape') { setShowCover(true); setIdx(0); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCover, openCover, goNext, goPrev]);

  useEffect(() => { containerRef.current?.focus(); }, [showCover]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  /* ── COVER ── */
  if (showCover) {
    return (
      <div ref={containerRef} tabIndex={-1}
        className="outline-none flex flex-col items-center justify-center px-4 py-12 gap-8 md:gap-10"
        style={{ backgroundColor: c.bg, color: c.text, minHeight: '100dvh' }}>

        <div className="fixed top-3 right-3 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
             style={{ backgroundColor: '#8BC48B', color: c.bg }}>
          Variant 3: Extracted
        </div>

        <div onClick={openCover} role="button" tabIndex={0}
          className="group relative w-[60vw] max-w-[340px] cursor-pointer outline-none shrink-0"
          style={{ aspectRatio: '3 / 4', maxHeight: '50vh' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ backgroundColor: c.card, boxShadow: '4px 8px 32px rgba(0,0,0,0.5)' }}>
            <div className="absolute inset-3 md:inset-4 pointer-events-none" style={{ border: `1px solid ${c.brown}18` }} />
            <p className="text-[9px] tracking-[0.35em] uppercase mb-6" style={{ color: c.brown }}>A Capsule Wardrobe Lookbook</p>
            <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight" style={{ color: c.pink }}>Mel</h1>
            <h2 className="font-display text-3xl md:text-4xl italic font-light mt-1" style={{ color: c.text }}>Outfit Board</h2>
            <div className="w-10 h-px mt-6 mb-5" style={{ backgroundColor: `${c.brown}40` }} />
            <p className="text-[11px] tracking-[0.25em] uppercase font-light" style={{ color: c.brown }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            {manifest && (
              <p className="absolute bottom-4 md:bottom-6 text-[10px] tracking-[0.2em] uppercase" style={{ color: c.brown, opacity: 0.3 }}>
                {total} Looks
              </p>
            )}
            {!manifest && (
              <p className="absolute bottom-9 md:bottom-11 text-[10px] tracking-wider"
                 style={{ color: c.text, opacity: 0.3 }}>
                Loading&hellip;
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!manifest) return null;

  const look = manifest.looks[idx];
  const { slideWidth, slideHeight } = manifest;
  const slideAspect = slideWidth / slideHeight; // 1920/1080 = 16:9

  return (
    <div ref={containerRef} tabIndex={-1}
      className="outline-none flex flex-col overflow-hidden"
      style={{ backgroundColor: c.bg, height: '100dvh' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      <div className="fixed top-3 right-12 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
           style={{ backgroundColor: '#8BC48B', color: c.bg }}>
        V3: Extracted
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 z-20 relative">
        <button onClick={() => { setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
          style={{ color: c.text, opacity: 0.5 }}>&larr; Back</button>
        <span className="text-xs tabular-nums font-light" style={{ color: c.text, opacity: 0.5 }}>{idx + 1} / {total}</span>
      </div>

      {/* Collage area — maintains 16:9 aspect, scales to fit */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-2 md:px-4 pb-2 md:pb-4">
        <div
          className="relative w-full"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: `${slideWidth} / ${slideHeight}`,
            backgroundColor: look.backgroundColor || c.bg,
            overflow: 'hidden',
          }}
        >
          {look.items.map((item) => {
            // Convert absolute px to percentages of the slide
            const leftPct = (item.left / slideWidth) * 100;
            const topPct = (item.top / slideHeight) * 100;
            const widthPct = (item.width / slideWidth) * 100;
            const heightPct = (item.height / slideHeight) * 100;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.file}
                src={`/outfits/extracted/${look.id}/${item.file}`}
                alt=""
                loading="lazy"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  width: `${widthPct}%`,
                  height: `${heightPct}%`,
                  objectFit: 'contain',
                  zIndex: item.zIndex,
                  transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
                  transformOrigin: 'center center',
                }}
              />
            );
          })}
        </div>

        {/* Prev arrow */}
        {idx > 0 && (
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {/* Next arrow */}
        {idx < total - 1 && (
          <button onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
