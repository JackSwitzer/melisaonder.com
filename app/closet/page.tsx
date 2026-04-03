'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

interface Look {
  src: string;
  title?: string;
}

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

/* progressive image loader — max concurrent, sequential drip */
const loaded = new Set<string>();
let inFlight = 0;
const MAX_CONCURRENT = 10;

function preloadImage(src: string): Promise<void> {
  if (loaded.has(src)) return Promise.resolve();
  if (inFlight >= MAX_CONCURRENT) return Promise.resolve();
  inFlight++;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => { loaded.add(src); inFlight--; resolve(); };
    img.onerror = () => { inFlight--; resolve(); };
    img.src = src;
  });
}

/* drip-load a list sequentially, one at a time */
async function drip(srcs: string[]) {
  for (const src of srcs) {
    await preloadImage(src);
  }
}

export default function ClosetPage() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const total = allLooks.length;

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  /* phase 1: load first image immediately, then drip 1-4 while on cover */
  useEffect(() => {
    preloadImage(allLooks[0].src).then(() => {
      setReady(true);
      drip(allLooks.slice(1, 5).map((l) => l.src));
    });
  }, []);

  /* phase 2: when slideshow opens, drip-load ahead of current position */
  useEffect(() => {
    if (showCover) return;
    const ahead = allLooks.slice(idx, Math.min(idx + 8, total)).map((l) => l.src);
    const behind = idx > 0 ? [allLooks[idx - 1].src] : [];
    drip([...behind, ...ahead]);
  }, [idx, total, showCover]);

  const openCover = useCallback(() => {
    if (!ready) return;
    setShowCover(false);
  }, [ready]);

  const goNext = useCallback(() => {
    setIdx((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setIdx((prev) => {
      if (prev === 0) {
        setShowCover(true);
        return 0;
      }
      return prev - 1;
    });
  }, []);

  /* keyboard */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showCover ? openCover() : goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!showCover) goPrev();
      } else if (e.key === 'Escape') {
        setShowCover(true);
        setIdx(0);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCover, openCover, goNext, goPrev]);

  useEffect(() => { containerRef.current?.focus(); }, [showCover]);

  /* touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  /* ── COVER ── */
  if (showCover) {
    return (
      <div
        ref={containerRef}
        tabIndex={-1}
        className="outline-none flex flex-col items-center justify-center px-4 py-12 gap-8 md:gap-10"
        style={{ backgroundColor: c.bg, color: c.text, minHeight: '100dvh' }}
      >
        {/* Magazine cover — the clickable book */}
        <div
          onClick={openCover}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCover(); } }}
          className="group relative w-[60vw] max-w-[340px] cursor-pointer outline-none shrink-0"
          style={{
            aspectRatio: '3 / 4',
            maxHeight: '50vh',
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-8 transition-transform duration-300 group-hover:scale-[1.01]"
            style={{
              backgroundColor: c.card,
              boxShadow: '4px 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,180,160,0.06)',
            }}
          >
            <div className="absolute inset-3 md:inset-4 pointer-events-none" style={{ border: `1px solid ${c.brown}18` }} />

            <p className="text-[9px] tracking-[0.35em] uppercase mb-6" style={{ color: c.brown }}>A Capsule Wardrobe Lookbook</p>

            <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight" style={{ color: c.pink }}>
              Mel
            </h1>
            <h2 className="font-display text-3xl md:text-4xl italic font-light mt-1" style={{ color: c.text }}>
              Outfit Board
            </h2>

            <div className="w-10 h-px mt-6 mb-5" style={{ backgroundColor: `${c.brown}40` }} />

            <p className="text-[11px] tracking-[0.25em] uppercase font-light" style={{ color: c.brown }}>
              {dateStr}
            </p>

            <p className="absolute bottom-4 md:bottom-6 text-[10px] tracking-[0.2em] uppercase" style={{ color: c.brown, opacity: 0.3 }}>
              {total} Looks
            </p>

            {ready && (
              <p className="absolute bottom-9 md:bottom-11 text-[10px] tracking-wider opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                 style={{ color: c.text }}>
                Click to open
              </p>
            )}
            {!ready && (
              <p className="absolute bottom-9 md:bottom-11 text-[10px] tracking-wider"
                 style={{ color: c.text, opacity: 0.3 }}>
                Loading&hellip;
              </p>
            )}
          </div>
        </div>

        {/* Bio — separate from the magazine */}
        <div className="max-w-sm md:max-w-md text-center space-y-3 px-2">
          <p className="text-sm md:text-[15px] leading-relaxed font-light" style={{ color: c.text, opacity: 0.4 }}>
            A creative project in maximizing timeless, fashion-forward looks from a capsule wardrobe&mdash;specifically, my own closet. Each outfit is sourced from store websites or photographed, then composed in Canva Pro drawn from inspiration across Pinterest, Instagram, film, and everyday life.
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed font-light" style={{ color: c.text, opacity: 0.4 }}>
            What began as a passion project has become one of my most practical and consistently used personal tools&mdash;an ongoing creative outlet with endless possibility within a defined, intentional, and timelessly fashionable wardrobe.
          </p>
        </div>
      </div>
    );
  }

  /* ── SLIDESHOW ── */
  const look = allLooks[idx];

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="outline-none flex flex-col overflow-hidden"
      style={{ backgroundColor: c.bg, height: '100dvh' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 z-20 relative">
        <button
          onClick={(e) => { e.stopPropagation(); setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
          style={{ color: c.text, opacity: 0.5 }}
        >
          &larr; Back
        </button>
        <span className="text-xs tabular-nums font-light" style={{ color: c.text, opacity: 0.5 }}>
          {idx + 1} / {total}
        </span>
      </div>

      {/* Image area — flexes to fill remaining space */}
      <div className="flex-1 relative min-h-0 mx-2 md:mx-4 mb-2 md:mb-4">
        <Image
          key={look.src}
          src={look.src}
          alt={look.title || `Look ${idx + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />

        {/* Title overlay for titled looks */}
        {look.title && (
          <div
            className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 z-10"
            style={{ background: `linear-gradient(to top, ${c.bg}dd, ${c.bg}66, transparent)` }}
          >
            <h3 className="font-display text-lg md:text-2xl font-light" style={{ color: c.pink }}>
              {look.title}
            </h3>
          </div>
        )}

        {/* Prev arrow */}
        {idx > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next arrow */}
        {idx < total - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
