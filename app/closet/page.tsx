'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  tag: string;
}

/* ── titled curated looks (shown first) ── */
const titledLooks: Look[] = [
  { src: '/outfits/slides/formal-5.jpg', title: 'JackSwitzer.com + MelisaOnder.com', tag: 'Formal' },
  { src: '/outfits/slides/formal-1.jpg', title: 'The Power Suit', tag: 'Formal' },
  { src: '/outfits/slides/formal-10.jpg', title: 'Golden Hour', tag: 'Formal' },
  { src: '/outfits/slides/formal-20.jpg', title: 'Refined Ivory', tag: 'Formal' },
  { src: '/outfits/slides/formal-15.jpg', title: 'Skating in Burberry', tag: 'Formal' },
  { src: '/outfits/slides/casual-1.jpg', title: 'Fur & Leather', tag: 'Everyday' },
  { src: '/outfits/slides/casual-10.jpg', title: 'Camel & Burgundy', tag: 'Everyday' },
  { src: '/outfits/slides/casual-15.jpg', title: 'Moto Luxe', tag: 'Everyday' },
  { src: '/outfits/slides/casual-25.jpg', title: 'Off-Duty Cool', tag: 'Everyday' },
  { src: '/outfits/slides/casual-30.jpg', title: 'Denim & Knits', tag: 'Everyday' },
];

/* ── remaining looks (no titles) ── */
const titledSrcs = new Set(titledLooks.map((l) => l.src));

function remainingLooks(): Look[] {
  const out: Look[] = [];
  for (let i = 1; i <= 34; i++) {
    const src = `/outfits/slides/formal-${i}.jpg`;
    if (!titledSrcs.has(src)) out.push({ src, tag: 'Formal' });
  }
  for (let i = 1; i <= 49; i++) {
    const src = `/outfits/slides/casual-${i}.jpg`;
    if (!titledSrcs.has(src)) out.push({ src, tag: 'Everyday' });
  }
  return out;
}

const allLooks: Look[] = [...titledLooks, ...remainingLooks()];
const TITLED_COUNT = titledLooks.length;

export default function ClosetPage() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const total = allLooks.length;

  const goNext = useCallback(() => {
    setIdx((cur) => {
      setPrevIdx(cur);
      return Math.min(cur + 1, total - 1);
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setIdx((cur) => {
      if (cur === 0) { setOpen(false); return 0; }
      setPrevIdx(cur);
      return cur - 1;
    });
  }, []);

  /* keyboard - always on window */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (!open) setOpen(true);
        else goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (open) goPrev();
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'Enter' && !open) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, goNext, goPrev]);

  /* focus main on mount and on open */
  useEffect(() => {
    mainRef.current?.focus();
  }, [open]);

  /* preload nearby images */
  useEffect(() => {
    const start = Math.max(0, idx - 2);
    const end = Math.min(total - 1, idx + 5);
    for (let i = start; i <= end; i++) {
      const img = new window.Image();
      img.src = allLooks[i].src;
    }
  }, [idx, total]);

  /* preload first few on mount */
  useEffect(() => {
    for (let i = 0; i < Math.min(6, total); i++) {
      const img = new window.Image();
      img.src = allLooks[i].src;
    }
  }, [total]);

  /* ── COVER ── */
  if (!open) {
    return (
      <div ref={mainRef} tabIndex={-1} className="outline-none min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: c.bg, color: c.text }}>
        <div
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
          className="group relative w-full max-w-md cursor-pointer outline-none"
          style={{ aspectRatio: '3/4' }}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.01]"
            style={{ backgroundColor: c.card, boxShadow: '6px 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,180,160,0.06)' }}
          >
            <div className="absolute inset-4" style={{ border: `1px solid ${c.brown}20` }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <p className="text-[10px] tracking-[0.35em] uppercase mb-8" style={{ color: c.brown }}>A Capsule Wardrobe Lookbook</p>
              <h1 className="font-display text-4xl md:text-5xl mb-1" style={{ color: c.pink }}>Melisa Onder&apos;s</h1>
              <h2 className="font-display text-5xl md:text-6xl italic mb-10" style={{ color: c.text }}>Outfit Board</h2>
              <div className="w-12 h-px mb-6" style={{ backgroundColor: `${c.brown}40` }} />
              <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: c.brown, opacity: 0.5 }}>{total} Looks</p>
              <p className="absolute bottom-8 text-[11px] tracking-wider opacity-0 group-hover:opacity-30 transition-opacity" style={{ color: c.text }}>Click or press arrow key</p>
            </div>
          </div>
        </div>
        <Link href="/" className="mt-6 text-xs tracking-wider opacity-25 hover:opacity-50 transition-opacity" style={{ color: c.text }}>melisaonder.com</Link>
      </div>
    );
  }

  /* ── LOOKBOOK ── */
  const look = allLooks[idx];
  const isTitled = idx < TITLED_COUNT;
  const goingForward = idx >= prevIdx;

  return (
    <div ref={mainRef} tabIndex={-1} className="outline-none h-screen flex flex-col overflow-hidden" style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Top bar */}
      <nav className="flex items-center justify-between px-5 py-2 shrink-0">
        <button onClick={() => setOpen(false)} className="font-display text-lg tracking-wide hover:opacity-60 transition-opacity">
          Outfit Board
        </button>
        <div className="flex items-center gap-5">
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: c.brown, opacity: 0.5 }}>{look.tag}</span>
          <span className="text-xs tabular-nums" style={{ color: c.pink, opacity: 0.6 }}>{idx + 1}/{total}</span>
          <Link href="/" className="text-xs opacity-25 hover:opacity-50 transition-opacity">Back</Link>
        </div>
      </nav>

      {/* Image area */}
      <div className="flex-1 relative mx-2 mb-1 overflow-hidden" style={{ backgroundColor: c.card }}>
        {/* Render current and adjacent slides for smooth transitions */}
        {allLooks.map((l, i) => {
          const dist = i - idx;
          if (Math.abs(dist) > 1) return null;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                opacity: dist === 0 ? 1 : 0,
                transform: dist === 0 ? 'none' : dist > 0 ? 'translateX(100%)' : 'translateX(-100%)',
                transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                zIndex: dist === 0 ? 2 : 1,
              }}
            >
              <Image
                src={l.src}
                alt={l.title || `Look ${i + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority={i < 4}
              />
            </div>
          );
        })}

        {/* Title overlay - only for titled looks */}
        {isTitled && look.title && (
          <div
            key={`title-${idx}`}
            className="absolute bottom-0 left-0 right-0 px-5 py-4 z-10"
            style={{
              background: `linear-gradient(to top, ${c.bg}ee, ${c.bg}88, transparent)`,
              animation: 'fadeUp 0.3s ease-out both',
            }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: c.brown, opacity: 0.6 }}>{look.tag}</p>
            <h3 className="font-display text-2xl md:text-3xl" style={{ color: c.pink }}>{look.title}</h3>
          </div>
        )}

        {/* Nav zones */}
        <div onClick={goPrev} className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-w-resize group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: `${c.bg}cc` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </span>
        </div>
        <div onClick={goNext} className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-e-resize group">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: `${c.bg}cc` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>

      {/* Scrubber */}
      <div className="px-5 pb-2 shrink-0">
        <div
          className="relative h-px cursor-pointer"
          style={{ backgroundColor: `${c.pink}15` }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            const target = Math.max(0, Math.min(total - 1, Math.round(pct * (total - 1))));
            setPrevIdx(idx);
            setIdx(target);
          }}
        >
          <div className="absolute left-0 top-0 h-full transition-all duration-150" style={{ width: `${((idx + 1) / total) * 100}%`, backgroundColor: c.pink }} />
          {/* Titled section marker */}
          <div
            className="absolute top-0 h-full"
            style={{
              left: 0,
              width: `${(TITLED_COUNT / total) * 100}%`,
              borderRight: `1px solid ${c.brown}30`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] uppercase tracking-wider" style={{ color: c.brown, opacity: 0.3 }}>
            {idx < TITLED_COUNT ? 'Curated' : 'Collection'}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
