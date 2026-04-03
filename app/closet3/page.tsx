'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ── VARIANT 3: AI-Enriched Editorial Outfit Board ── */

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

/* Type labels + placeholder shop links */
const TYPE_LABELS: Record<string, string> = {
  top: 'Top',
  bottom: 'Bottoms',
  outerwear: 'Outerwear',
  dress: 'Dress',
  shoes: 'Shoes',
  bag: 'Bag',
  accessory: 'Accessory',
  jewelry: 'Jewelry',
  reference_photo: 'Inspo',
  decorative: '',
};

interface ManifestItem {
  file: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  imageHash: string;
  fileSize: number;
  contentType: string;
  type: string;
  description: string;
  confidence: number;
}

interface ManifestLook {
  id: string;
  slideIndex: number;
  slideImage: string | null;
  category: string;
  title: string;
  description: string;
  occasion: string;
  colorPalette: string[];
  panelColors: string[];
  items: ManifestItem[];
}

interface Manifest {
  slideWidth: number;
  slideHeight: number;
  totalLooks: number;
  analyzedLooks: number;
  looks: ManifestLook[];
}

export default function Closet3Page() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  useEffect(() => {
    fetch('/outfits/extracted/manifest.json')
      .then((r) => r.json())
      .then((data: Manifest) => {
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

  const navigate = useCallback((dir: 1 | -1) => {
    setTransitioning(true);
    setHoveredItem(null);
    setShowDrawer(false);
    setTimeout(() => {
      setIdx((i) => {
        if (dir === -1 && i === 0) { setShowCover(true); return 0; }
        return Math.max(0, Math.min(i + dir, total - 1));
      });
      setTransitioning(false);
    }, 180);
  }, [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        showCover ? openCover() : navigate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!showCover) navigate(-1);
      } else if (e.key === 'Escape') {
        setShowCover(true);
        setIdx(0);
      } else if (e.key === 'i' || e.key === 'I') {
        setShowDrawer((d) => !d);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCover, openCover, navigate]);

  useEffect(() => { containerRef.current?.focus(); }, [showCover]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  };

  const look = manifest?.looks[idx] ?? null;
  const hasAnalysis = !!(look?.title);

  /* Split items into categories for the drawer */
  const itemsByType = useMemo(() => {
    if (!look) return {};
    const groups: Record<string, ManifestItem[]> = {};
    for (const item of look.items) {
      if (item.type === 'decorative' || item.type === 'unknown') continue;
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type].push(item);
    }
    return groups;
  }, [look]);

  /* Background gradient from panel colors */
  const bgGradient = useMemo(() => {
    if (!look || !look.panelColors.length) return c.bg;
    const [c1, c2] = look.panelColors;
    if (c2) return `linear-gradient(135deg, ${c1}18 0%, ${c2}25 100%)`;
    return `${c1}15`;
  }, [look]);

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
            <h2 className="font-display text-3xl md:text-4xl font-light mt-1" style={{ color: c.text }}>Outfit Board</h2>
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

  if (!manifest || !look) return null;

  const { slideWidth, slideHeight } = manifest;

  return (
    <div ref={containerRef} tabIndex={-1}
      className="outline-none flex flex-col overflow-hidden"
      style={{
        background: bgGradient,
        backgroundColor: c.bg,
        height: '100dvh',
      }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      <div className="fixed top-3 right-12 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
           style={{ backgroundColor: '#8BC48B', color: c.bg }}>
        V3: Extracted
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 z-30 relative">
        <button onClick={() => { setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
          style={{ color: c.text, opacity: 0.5 }}>&larr; Back</button>

        {hasAnalysis ? (
          <div className="flex flex-col items-center gap-0">
            <span className="text-sm md:text-base font-light tracking-wide" style={{ color: c.text }}>
              {look.title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest font-light" style={{ color: c.brown }}>
                {look.category}
              </span>
              <span className="text-[10px] font-light" style={{ color: c.text, opacity: 0.3 }}>&middot;</span>
              <span className="text-[10px] tabular-nums font-light" style={{ color: c.text, opacity: 0.3 }}>
                {idx + 1} of {total}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-xs tabular-nums font-light" style={{ color: c.text, opacity: 0.5 }}>
            {idx + 1} / {total}
          </span>
        )}

        {hasAnalysis ? (
          <button onClick={() => setShowDrawer((d) => !d)}
            className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity"
            style={{ color: showDrawer ? c.pink : c.text, opacity: showDrawer ? 1 : 0.5 }}>
            {showDrawer ? 'Close' : 'Details'}
          </button>
        ) : <div className="w-12" />}
      </div>

      {/* Main content */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Collage area */}
        <div className={`flex-1 flex items-center justify-center min-h-0 px-2 md:px-6 pb-2 transition-opacity duration-200 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div
            className="relative w-full"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              aspectRatio: `${slideWidth} / ${slideHeight}`,
              overflow: 'hidden',
            }}
          >
            {look.items.map((item) => {
              const leftPct = (item.left / slideWidth) * 100;
              const topPct = (item.top / slideHeight) * 100;
              const widthPct = (item.width / slideWidth) * 100;
              const heightPct = (item.height / slideHeight) * 100;
              const isDecorative = item.type === 'decorative' || item.type === 'unknown';
              const isRef = item.type === 'reference_photo';
              const isHovered = hoveredItem === item.file;
              const isWearable = !isDecorative && !isRef;

              return (
                <div
                  key={item.file}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    width: `${widthPct}%`,
                    height: `${heightPct}%`,
                    zIndex: isHovered ? 999 : item.zIndex,
                    transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
                    transformOrigin: 'center center',
                    cursor: isDecorative ? 'default' : 'pointer',
                  }}
                  onMouseEnter={() => {
                    if (!isDecorative && item.description) setHoveredItem(item.file);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (!isDecorative && item.description) {
                      setHoveredItem(hoveredItem === item.file ? null : item.file);
                    }
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/outfits/extracted/${look.id}/${item.file}`}
                    alt={item.description || ''}
                    loading="lazy"
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      opacity: isDecorative ? 0.8 : 1,
                      transition: 'transform 0.2s ease, filter 0.2s ease',
                      transform: isHovered && isWearable ? 'scale(1.03)' : undefined,
                      filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' : undefined,
                    }}
                  />

                  {/* Reference photo frame */}
                  {isRef && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{
                        border: '3px solid rgba(255,255,255,0.12)',
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                      }}
                    />
                  )}

                  {/* Hover tooltip */}
                  {isHovered && item.description && (
                    <div
                      className="absolute left-1/2 pointer-events-none z-[1000]"
                      style={{
                        bottom: '-6px',
                        transform: 'translateX(-50%) translateY(100%)',
                      }}
                    >
                      <div style={{
                        backgroundColor: 'rgba(38,26,20,0.95)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        fontSize: '11px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        maxWidth: '240px',
                        textAlign: 'center',
                        lineHeight: 1.4,
                        border: `1px solid ${c.brown}30`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      }}>
                        {TYPE_LABELS[item.type] && (
                          <span style={{
                            color: c.pink,
                            textTransform: 'uppercase',
                            fontSize: '9px',
                            letterSpacing: '0.1em',
                            fontWeight: 500,
                            display: 'block',
                            marginBottom: 3,
                          }}>
                            {TYPE_LABELS[item.type]}
                          </span>
                        )}
                        <span style={{ color: c.text, opacity: 0.9 }}>{item.description}</span>
                        {isWearable && (
                          <span style={{
                            display: 'block',
                            marginTop: 4,
                            fontSize: '9px',
                            color: c.brown,
                            opacity: 0.6,
                          }}>
                            Shop link coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Items drawer (slides in from right) */}
        <div
          className="absolute right-0 top-0 bottom-0 z-40 overflow-y-auto transition-transform duration-300 ease-out"
          style={{
            width: '280px',
            maxWidth: '75vw',
            backgroundColor: `${c.bg}F5`,
            backdropFilter: 'blur(16px)',
            borderLeft: `1px solid ${c.brown}20`,
            transform: showDrawer ? 'translateX(0)' : 'translateX(100%)',
            boxShadow: showDrawer ? '-8px 0 32px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <div className="p-4 space-y-5">
            {/* Description */}
            {look.description && (
              <div>
                <p className="text-[11px] leading-relaxed font-light" style={{ color: c.text, opacity: 0.7 }}>
                  {look.description}
                </p>
              </div>
            )}

            {/* Color palette */}
            {look.colorPalette.length > 0 && (
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-2 font-medium" style={{ color: c.brown }}>Palette</p>
                <div className="flex gap-1.5">
                  {look.colorPalette.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.1)' }} />
                      <span className="text-[8px] font-mono" style={{ color: c.text, opacity: 0.3 }}>{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Occasion tags */}
            {look.occasion && (
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-2 font-medium" style={{ color: c.brown }}>Wear to</p>
                <div className="flex flex-wrap gap-1.5">
                  {look.occasion.split(',').map((t) => t.trim()).filter(Boolean).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${c.brown}15`, color: c.text, opacity: 0.7, border: `1px solid ${c.brown}20` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Items list by category */}
            {Object.entries(itemsByType).map(([type, items]) => {
              const label = TYPE_LABELS[type] || type;
              if (!label) return null;
              const seen = new Set<string>();
              const unique = items.filter((item) => {
                if (item.description.toLowerCase().includes('duplicate')) return false;
                if (seen.has(item.description)) return false;
                seen.add(item.description);
                return true;
              });
              if (!unique.length) return null;

              return (
                <div key={type}>
                  <p className="text-[9px] uppercase tracking-widest mb-2 font-medium" style={{ color: c.pink }}>
                    {label}
                  </p>
                  <div className="space-y-2">
                    {unique.map((item) => (
                      <div
                        key={item.file}
                        className="flex items-start gap-2.5 cursor-pointer"
                        onMouseEnter={() => setHoveredItem(item.file)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-10 h-10 shrink-0 rounded overflow-hidden"
                          style={{ backgroundColor: `${c.brown}10` }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/outfits/extracted/${look.id}/${item.file}`}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] leading-snug font-light"
                            style={{
                              color: c.text,
                              opacity: hoveredItem === item.file ? 1 : 0.7,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}>
                            {item.description}
                          </p>
                          <p className="text-[9px] mt-0.5" style={{ color: c.brown, opacity: 0.5 }}>
                            Shop link coming soon
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav arrows */}
        {idx > 0 && (
          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: `${c.bg}90`, backdropFilter: 'blur(4px)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="1.5" className="w-4 h-4 opacity-60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {idx < total - 1 && (
          <button onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{
              backgroundColor: `${c.bg}90`,
              backdropFilter: 'blur(4px)',
              right: showDrawer ? '288px' : '8px',
              transition: 'right 0.3s ease',
            }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="1.5" className="w-4 h-4 opacity-60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom info strip */}
      {hasAnalysis && !showDrawer && (
        <div className="shrink-0 px-4 py-2.5 md:py-3 z-20 flex items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${c.brown}10` }}>
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {look.occasion?.split(',').slice(0, 3).map((t) => t.trim()).filter(Boolean).map((tag, i) => (
              <span key={i} className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0"
                style={{ backgroundColor: `${c.brown}12`, color: c.brown, border: `1px solid ${c.brown}15` }}>
                {tag}
              </span>
            ))}
          </div>
          {look.colorPalette.length > 0 && (
            <div className="flex gap-1 shrink-0">
              {look.colorPalette.map((color, i) => (
                <div key={i} className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.08)' }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
