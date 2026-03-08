'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── VARIANT 2: Raw <img> with explicit dimensions, no Next.js Image at all ── */

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

interface Look { src: string; title?: string; }

const titledLooks: Look[] = [
  { src: '/outfits/slides/formal-5.jpg', title: 'JackSwitzer.com + MelisaOnder.com' },
  { src: '/outfits/slides/formal-1.jpg', title: 'The Power Suit' },
  { src: '/outfits/slides/formal-10.jpg', title: 'Golden Hour' },
  { src: '/outfits/slides/formal-20.jpg', title: 'Refined Ivory' },
  { src: '/outfits/slides/formal-15.jpg', title: 'Skating in Burberry' },
  { src: '/outfits/slides/casual-1.jpg', title: 'Fur & Leather' },
  { src: '/outfits/slides/casual-10.jpg', title: 'Camel & Burgundy' },
  { src: '/outfits/slides/casual-15.jpg', title: 'Moto Luxe' },
  { src: '/outfits/slides/casual-25.jpg', title: 'Off-Duty Cool' },
  { src: '/outfits/slides/casual-30.jpg', title: 'Denim & Knits' },
];

const titledSrcs = new Set(titledLooks.map((l) => l.src));

function buildAllLooks(): Look[] {
  const out: Look[] = [...titledLooks];
  for (let i = 1; i <= 34; i++) {
    const src = `/outfits/slides/formal-${i}.jpg`;
    if (!titledSrcs.has(src)) out.push({ src });
  }
  for (let i = 1; i <= 49; i++) {
    const src = `/outfits/slides/casual-${i}.jpg`;
    if (!titledSrcs.has(src)) out.push({ src });
  }
  return out;
}

const allLooks = buildAllLooks();

export default function Closet2Page() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const total = allLooks.length;

  const openCover = useCallback(() => setShowCover(false), []);
  const goNext = useCallback(() => setIdx((i) => Math.min(i + 1, total - 1)), [total]);
  const goPrev = useCallback(() => {
    setIdx((prev) => { if (prev === 0) { setShowCover(true); return 0; } return prev - 1; });
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

  if (showCover) {
    return (
      <div ref={containerRef} tabIndex={-1}
        className="outline-none flex flex-col items-center justify-center px-4 py-12 gap-8 md:gap-10"
        style={{ backgroundColor: c.bg, color: c.text, minHeight: '100dvh' }}>

        <div className="fixed top-3 right-3 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
             style={{ backgroundColor: '#C9A67A', color: c.bg }}>
          Variant 2: Native img
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
          </div>
        </div>
      </div>
    );
  }

  const look = allLooks[idx];

  return (
    <div ref={containerRef} tabIndex={-1}
      className="outline-none flex flex-col overflow-hidden"
      style={{ backgroundColor: c.bg, height: '100dvh' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      <div className="fixed top-3 right-12 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
           style={{ backgroundColor: '#C9A67A', color: c.bg }}>
        V2: Native img
      </div>

      <div className="flex items-center justify-between px-4 py-3 shrink-0 z-20 relative">
        <button onClick={() => { setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
          style={{ color: c.text, opacity: 0.5 }}>&larr; Back</button>
        <span className="text-xs tabular-nums font-light" style={{ color: c.text, opacity: 0.5 }}>{idx + 1} / {total}</span>
      </div>

      {/* KEY CHANGE: native <img> with explicit dimensions, flexbox centering */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-2 md:px-4 pb-2 md:pb-4">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={look.src}
            src={look.src}
            alt={look.title || `Look ${idx + 1}`}
            width={1200}
            height={675}
            className="max-w-full max-h-full object-contain"
            style={{ display: 'block' }}
          />

          {look.title && (
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 z-10"
              style={{ background: `linear-gradient(to top, ${c.bg}dd, ${c.bg}66, transparent)` }}>
              <h3 className="font-display text-lg md:text-2xl font-light" style={{ color: c.pink }}>{look.title}</h3>
            </div>
          )}
        </div>

        {idx > 0 && (
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
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
