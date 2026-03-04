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
const FLIP_MS = 400;

export default function ClosetPage() {
  const [showCover, setShowCover] = useState(true);
  const [coverFlipping, setCoverFlipping] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState<{ target: number; dir: 'fwd' | 'back' } | null>(null);
  const [busy, setBusy] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const total = allLooks.length;

  /* ── open cover with page-flip ── */
  const openCover = useCallback(() => {
    if (busy || !showCover) return;
    setBusy(true);
    setCoverFlipping(true);
    setTimeout(() => {
      setShowCover(false);
      setCoverFlipping(false);
      setBusy(false);
    }, 500);
  }, [busy, showCover]);

  /* ── navigate forward ── */
  const goNext = useCallback(() => {
    if (busy || idx >= total - 1) return;
    const next = idx + 1;
    if (idx < TITLED_COUNT) {
      // page flip for titled section
      setBusy(true);
      setFlip({ target: next, dir: 'fwd' });
      setTimeout(() => {
        setIdx(next);
        setFlip(null);
        setBusy(false);
      }, FLIP_MS);
    } else {
      // slide for collection
      setIdx(next);
    }
  }, [idx, total, busy]);

  /* ── navigate backward ── */
  const goPrev = useCallback(() => {
    if (busy) return;
    if (idx === 0) { setShowCover(true); return; }
    const prev = idx - 1;
    if (idx <= TITLED_COUNT && prev < TITLED_COUNT) {
      // reverse page flip for titled section
      setBusy(true);
      setFlip({ target: prev, dir: 'back' });
      setTimeout(() => {
        setIdx(prev);
        setFlip(null);
        setBusy(false);
      }, FLIP_MS);
    } else {
      // slide for collection
      setIdx(prev);
    }
  }, [idx, busy]);

  /* ── keyboard ── */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showCover ? openCover() : goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!showCover) goPrev();
      } else if (e.key === 'Escape') {
        setShowCover(true); setIdx(0); setFlip(null); setBusy(false);
      } else if (e.key === 'Enter' && showCover) {
        e.preventDefault(); openCover();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCover, openCover, goNext, goPrev]);

  useEffect(() => { mainRef.current?.focus(); }, [showCover]);

  /* ── preload ── */
  useEffect(() => {
    for (let i = Math.max(0, idx - 2); i <= Math.min(total - 1, idx + 5); i++) {
      const img = new window.Image(); img.src = allLooks[i].src;
    }
  }, [idx, total]);

  useEffect(() => {
    for (let i = 0; i < Math.min(6, total); i++) {
      const img = new window.Image(); img.src = allLooks[i].src;
    }
  }, [total]);

  /* ── render title with links for first look ── */
  function renderTitle(look: Look, i: number) {
    if (i === 0) {
      return (
        <h3 className="font-display text-2xl md:text-3xl" style={{ color: c.pink }}>
          <a href="https://jackswitzer.com" target="_blank" rel="noopener noreferrer"
             className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity">
            JackSwitzer.com
          </a>
          <span className="mx-2 opacity-40">+</span>
          <Link href="/" className="underline decoration-1 underline-offset-4 hover:opacity-70 transition-opacity">
            MelisaOnder.com
          </Link>
        </h3>
      );
    }
    return <h3 className="font-display text-2xl md:text-3xl" style={{ color: c.pink }}>{look.title}</h3>;
  }

  /* ═══════════════════════ COVER ═══════════════════════ */
  if (showCover) {
    return (
      <div ref={mainRef} tabIndex={-1}
           className="outline-none min-h-screen flex flex-col items-center justify-center px-6"
           style={{ backgroundColor: c.bg, color: c.text }}>
        <div
          onClick={openCover} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCover(); } }}
          className="group relative w-full max-w-md cursor-pointer outline-none"
          style={{ aspectRatio: '3/4', perspective: '2500px' }}
        >
          {/* First page (visible behind cover as it flips) */}
          <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: c.card, borderRadius: '2px' }}>
            <Image src={allLooks[0].src} alt={allLooks[0].title || 'Look 1'} fill
                   className="object-contain" sizes="(max-width: 768px) 100vw, 500px" priority />
          </div>

          {/* Book cover - flips open on click */}
          <div
            className="absolute inset-0"
            style={{
              transformOrigin: 'left center',
              transform: coverFlipping ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: coverFlipping ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              backfaceVisibility: 'hidden',
              willChange: coverFlipping ? 'transform' : 'auto',
              zIndex: 2,
            }}
          >
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.005]"
                 style={{ backgroundColor: c.card, boxShadow: '6px 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,180,160,0.06)' }}>
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

          {/* Shadow that appears during cover flip */}
          {coverFlipping && (
            <div className="absolute inset-0 pointer-events-none" style={{
              zIndex: 3,
              background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 50%)',
              animation: 'shadowPulse 0.5s ease-out forwards',
            }} />
          )}
        </div>
        <div className="mt-6 max-w-md text-center text-sm leading-relaxed font-light" style={{ color: c.text, opacity: 0.45 }}>
          <p>A creative project in maximizing timeless, fashion-forward looks from a capsule wardrobe&mdash;specifically, my own closet. Each outfit is built by sourcing my exact pieces from store websites or photographing them myself, then composing looks in Canva Pro drawn from inspiration across Pinterest, Instagram, film, and everyday life.</p>
          <p className="mt-3">What began as a passion project has become one of my most practical and consistently used personal tools. My outfit board is an ongoing creative outlet with endless possibility within a defined, intentional, and timelessly fashionable wardrobe.</p>
        </div>
        <Link href="/" className="mt-4 text-xs tracking-wider opacity-25 hover:opacity-50 transition-opacity" style={{ color: c.text }}>melisaonder.com</Link>
      </div>
    );
  }

  /* ═══════════════════════ LOOKBOOK ═══════════════════════ */
  const look = allLooks[idx];
  const isTitled = idx < TITLED_COUNT;
  const isFlipping = flip !== null;

  return (
    <div ref={mainRef} tabIndex={-1} className="outline-none h-screen flex flex-col overflow-hidden"
         style={{ backgroundColor: c.bg, color: c.text }}>
      {/* Top bar */}
      <nav className="flex items-center justify-between px-5 py-2 shrink-0">
        <button onClick={() => { setShowCover(true); setIdx(0); setFlip(null); setBusy(false); }}
                className="font-display text-lg tracking-wide hover:opacity-60 transition-opacity">
          Outfit Board
        </button>
        <div className="flex items-center gap-5">
          <span className="text-xs tabular-nums" style={{ color: c.pink, opacity: 0.6 }}>{idx + 1}/{total}</span>
          <Link href="/" className="text-xs opacity-25 hover:opacity-50 transition-opacity">Back</Link>
        </div>
      </nav>

      {/* Image area */}
      <div className="flex-1 relative mx-2 mb-1 overflow-hidden"
           style={{ backgroundColor: c.card, perspective: isTitled ? '2500px' : 'none' }}>

        {isTitled ? (
          /* ── PAGE FLIP for titled/curated looks ── */
          <>
            {isFlipping ? (
              <>
                {/* Static layer underneath (revealed page) */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                  <Image
                    src={flip.dir === 'fwd' ? allLooks[flip.target].src : look.src}
                    alt="" fill className="object-contain" sizes="100vw" />
                </div>

                {/* Flipping page on top */}
                <div className="absolute inset-0" style={{
                  zIndex: 2,
                  transformOrigin: 'left center',
                  animation: `${flip.dir === 'fwd' ? 'pageFlipFwd' : 'pageFlipBack'} ${FLIP_MS}ms cubic-bezier(0.4,0,0.2,1) forwards`,
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                }}>
                  <Image
                    src={flip.dir === 'fwd' ? look.src : allLooks[flip.target].src}
                    alt="" fill className="object-contain" sizes="100vw" />
                </div>

                {/* Page fold shadow during flip */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  zIndex: 3,
                  background: `linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 15%, transparent 50%)`,
                  animation: `shadowPulse ${FLIP_MS}ms ease-in-out forwards`,
                }} />
              </>
            ) : (
              /* Static current page (no flip in progress) */
              <div className="absolute inset-0" style={{ zIndex: 2 }}>
                <Image src={look.src} alt={look.title || `Look ${idx + 1}`} fill
                       className="object-contain" sizes="100vw" priority />
              </div>
            )}
          </>
        ) : (
          /* ── SLIDE for collection looks ── */
          <>
            {[idx - 1, idx, idx + 1].filter(i => i >= 0 && i < total).map(i => {
              const dist = i - idx;
              return (
                <div key={i} className="absolute inset-0" style={{
                  opacity: dist === 0 ? 1 : 0,
                  transform: dist === 0 ? 'none' : dist > 0 ? 'translateX(100%)' : 'translateX(-100%)',
                  transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                  zIndex: dist === 0 ? 2 : 1,
                }}>
                  <Image src={allLooks[i].src} alt={allLooks[i].title || `Look ${i + 1}`} fill
                         className="object-contain" sizes="100vw" priority={dist === 0} />
                </div>
              );
            })}
          </>
        )}

        {/* Inspo label - top right of image */}
        {!isFlipping && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 font-light"
                  style={{ color: c.pink, backgroundColor: `${c.bg}bb`, borderRadius: '3px', border: `1px solid ${c.brown}30` }}>
              Inspo &rarr;
            </span>
          </div>
        )}

        {/* Title overlay - only for titled looks, hidden during flip */}
        {isTitled && look.title && !isFlipping && (
          <div key={`title-${idx}`} className="absolute bottom-0 left-0 right-0 px-5 py-4 z-30"
               style={{
                 background: `linear-gradient(to top, ${c.bg}ee, ${c.bg}88, transparent)`,
                 animation: 'fadeUp 0.3s ease-out both',
               }}>
            {renderTitle(look, idx)}
          </div>
        )}

        {/* Arrow buttons */}
        <div className="absolute bottom-16 left-3 z-20 flex gap-2">
          <button onClick={goPrev} className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${c.bg}cc`, opacity: idx === 0 ? 0.2 : 0.5 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goNext} className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${c.bg}cc`, opacity: idx >= total - 1 ? 0.2 : 0.5 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Scrubber */}
      <div className="px-5 pb-2 shrink-0">
        <div className="relative h-px cursor-pointer" style={{ backgroundColor: `${c.pink}15` }}
             onClick={(e) => {
               if (busy) return;
               const rect = e.currentTarget.getBoundingClientRect();
               const pct = (e.clientX - rect.left) / rect.width;
               const target = Math.max(0, Math.min(total - 1, Math.round(pct * (total - 1))));
               setIdx(target);
             }}>
          <div className="absolute left-0 top-0 h-full transition-all duration-150" style={{ width: `${((idx + 1) / total) * 100}%`, backgroundColor: c.pink }} />
          <div className="absolute top-0 h-full" style={{ left: 0, width: `${(TITLED_COUNT / total) * 100}%`, borderRight: `1px solid ${c.brown}30` }} />
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
        @keyframes pageFlipFwd {
          0% { transform: rotateY(0deg) scale(1); }
          40% { transform: rotateY(-90deg) scale(1.02); }
          100% { transform: rotateY(-180deg) scale(1); }
        }
        @keyframes pageFlipBack {
          0% { transform: rotateY(-180deg) scale(1); }
          60% { transform: rotateY(-90deg) scale(1.02); }
          100% { transform: rotateY(0deg) scale(1); }
        }
        @keyframes shadowPulse {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
