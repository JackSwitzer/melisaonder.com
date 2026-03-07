'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
};

const allSlides: string[] = [
  ...Array.from({ length: 34 }, (_, i) => `/outfits/slides/formal-${i + 1}.jpg`),
  ...Array.from({ length: 49 }, (_, i) => `/outfits/slides/casual-${i + 1}.jpg`),
];

export default function ClosetPage() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const total = allSlides.length;

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const openCover = useCallback(() => setShowCover(false), []);

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

  /* preload around current */
  useEffect(() => {
    for (let i = Math.max(0, idx - 1); i <= Math.min(total - 1, idx + 3); i++) {
      const img = new window.Image();
      img.src = allSlides[i];
    }
  }, [idx, total]);

  /* preload first batch on mount */
  useEffect(() => {
    for (let i = 0; i < Math.min(5, total); i++) {
      const img = new window.Image();
      img.src = allSlides[i];
    }
  }, [total]);

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
        className="outline-none h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: c.bg, color: c.text }}
        onClick={openCover}
        role="button"
      >
        <div className="text-center cursor-pointer group max-w-md mx-auto px-6">
          <h1 className="font-display text-6xl md:text-8xl font-light tracking-tight" style={{ color: c.pink }}>
            Mel
          </h1>
          <h2 className="font-display text-4xl md:text-6xl italic font-light mt-2" style={{ color: c.text }}>
            Outfit Board
          </h2>
          <p className="mt-6 text-sm tracking-[0.2em] uppercase font-light" style={{ color: c.brown }}>
            {dateStr}
          </p>
          <div className="mt-10 space-y-4 text-sm md:text-[15px] leading-relaxed font-light" style={{ color: c.text, opacity: 0.45 }}>
            <p>A creative project in maximizing timeless, fashion-forward looks from a capsule wardrobe&mdash;specifically, my own closet. Each outfit is sourced from store websites or photographed, then composed in Canva Pro drawn from inspiration across Pinterest, Instagram, film, and everyday life.</p>
            <p>What began as a passion project has become one of my most practical and consistently used personal tools&mdash;an ongoing creative outlet with endless possibility within a defined, intentional, and timelessly fashionable wardrobe.</p>
          </div>
          <p className="mt-8 text-xs tracking-wider opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ color: c.text }}>
            Click to open
          </p>
        </div>
      </div>
    );
  }

  /* ── SLIDESHOW ── */
  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="outline-none h-screen w-screen relative overflow-hidden"
      style={{ backgroundColor: c.bg }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Image
        key={allSlides[idx]}
        src={allSlides[idx]}
        alt={`Look ${idx + 1}`}
        fill
        className="object-contain"
        sizes="100vw"
        priority
      />

      {/* Counter */}
      <div className="absolute top-4 right-4 z-10">
        <span className="text-xs tabular-nums font-light" style={{ color: c.text, opacity: 0.5 }}>
          {idx + 1} / {total}
        </span>
      </div>

      {/* Back */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
          style={{ color: c.text, opacity: 0.5 }}
        >
          &larr; Back
        </button>
      </div>

      {/* Prev arrow */}
      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
          style={{ backgroundColor: `${c.bg}80`, opacity: 0.4 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
