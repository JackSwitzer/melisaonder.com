'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ══════════════════════════════════════════════════════════════
   VARIANT 3 — Outfit Board (Body-Relative Flat-Lay)

   Layout is body-shaped: accessories placed where they'd be worn.
     HEAD ROW  — hats, sunglasses, earrings side-by-side
     NECK      — scarves overlap into top of garment stack
     BODY      — garment stack (center) + bag (right) + watch (left)
     FEET      — shoes overlap bottom of pants/dress
     STRIP     — necklaces, rings, small extras

   All sizes driven by SIZES config, auto-scaled via useScale().
   ══════════════════════════════════════════════════════════════ */

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

/* ══════════════════════════════════════════════════════════════
   SIZES — All layout constants. Tuned for ~820px viewport.
   Scaled proportionally for smaller screens.

   TUNING GUIDE:
   - garment heights control item prominence
   - stackOverlap: more negative = tighter garment layering
   - shoeOverlap: negative value tucks shoes under pants
   - sideInset: how far bag/watch sit from garment edge
   ══════════════════════════════════════════════════════════════ */
const SIZES = {
  // Garment heights by type
  outerwear: 175,
  top: 135,
  dress: 210,
  bottom: 150,
  shoes: 78,
  bag: 90,

  // Accessory heights by subtype
  hat: 55,
  sunglasses: 40,
  earrings: 32,
  headband: 30,
  hairClip: 30,
  scarf: 65,
  watch: 34,
  bracelet: 30,
  necklace: 34,
  ring: 24,
  gloves: 44,
  socks: 55,
  genericAcc: 36,
  genericJewelry: 30,

  // Layout spacing
  stackOverlap: -22,   // overlap between stacked garments
  shoeOverlap: -12,    // shoes tuck under pants
  headGap: 6,          // gap between head accessories
  colW: 240,           // outfit column width
  garmentW: 180,       // center garment stack width
  sideItemW: 65,       // max width for side accessories
  outfitGap: 32,       // gap between outfit columns
  inspoW: 170,
  inspoH: 230,
};

type SizesType = typeof SIZES;

function useScaledSizes(): SizesType {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return useMemo(() => {
    const scale = Math.min(1, Math.max(0.55, (vw - 48) / 780));
    const s = (v: number) => Math.round(v * scale);
    return Object.fromEntries(
      Object.entries(SIZES).map(([k, v]) => [k, s(v)])
    ) as unknown as SizesType;
  }, [vw]);
}

/* ═══════════════════════════════════════
   SUBTYPE DETECTION — classify accessories
   by what they are, so we know WHERE to place them
   ═══════════════════════════════════════ */
type Subtype =
  | 'hat' | 'sunglasses' | 'glasses' | 'earrings' | 'headband' | 'hairClip'
  | 'scarf' | 'necklace' | 'watch' | 'bracelet' | 'ring'
  | 'gloves' | 'socks' | 'belt' | 'unknown';

const SUBTYPE_RULES: [Subtype, RegExp][] = [
  ['hat',       /\b(hat|cap|beret|beanie|ushanka|trapper|turban|visor|fedora|bucket)\b/i],
  ['sunglasses',/\b(sunglasses|shades|sunglass)\b/i],
  ['glasses',   /\b(glasses|frames|blue.?light)\b/i],
  ['earrings',  /\b(earring|hoop|stud|ear\s?ring)\b/i],
  ['headband',  /\b(headband|hair.?band)\b/i],
  ['hairClip',  /\b(barrette|hair.?clip|bow|hair\s?bow)\b/i],
  ['scarf',     /\b(scarf|pashmina|wrap|shawl|muffler)\b/i],
  ['necklace',  /\b(necklace|pendant|chain|choker)\b/i],
  ['watch',     /\b(watch|timepiece|wristwatch)\b/i],
  ['bracelet',  /\b(bracelet|bangle|cuff)\b/i],
  ['ring',      /\b(ring)\b/i],
  ['gloves',    /\b(glove|mitten)\b/i],
  ['socks',     /\b(sock|stocking|tight|knee.?high|over.?the.?knee)\b/i],
  ['belt',      /\b(belt)\b/i],
];

function detectSubtype(item: ManifestItem): Subtype {
  const desc = item.description || '';
  for (const [subtype, re] of SUBTYPE_RULES) {
    if (re.test(desc)) return subtype;
  }
  return 'unknown';
}

/* Which zone each subtype belongs to */
type Zone = 'head' | 'neck' | 'leftSide' | 'rightSide' | 'nearFeet' | 'strip';

const ZONE_MAP: Record<Subtype, Zone> = {
  hat: 'head',
  sunglasses: 'head',
  glasses: 'head',
  earrings: 'head',
  headband: 'head',
  hairClip: 'head',
  scarf: 'neck',
  necklace: 'strip',
  watch: 'leftSide',
  bracelet: 'leftSide',
  ring: 'strip',
  gloves: 'leftSide',
  socks: 'nearFeet',
  belt: 'strip',
  unknown: 'strip',
};

/* ── Types ── */
interface ManifestItem {
  file: string; left: number; top: number; width: number; height: number;
  rotation: number; zIndex: number; imageHash: string; fileSize: number;
  contentType: string; type: string; description: string; confidence: number;
}
interface ManifestLook {
  id: string; slideIndex: number; slideImage: string | null; category: string;
  title: string; description: string; occasion: string;
  colorPalette: string[]; panelColors: string[]; items: ManifestItem[];
}
interface Manifest {
  slideWidth: number; slideHeight: number; totalLooks: number;
  analyzedLooks: number; looks: ManifestLook[];
}

/* Tagged item: original item + detected subtype + zone */
interface PlacedItem {
  item: ManifestItem;
  subtype: Subtype;
  zone: Zone;
}

interface Outfit {
  head: PlacedItem[];       // hats, sunglasses, earrings
  neck: PlacedItem[];       // scarves
  stack: ManifestItem[];    // outerwear → top → dress → bottom
  shoes: ManifestItem[];
  leftSide: PlacedItem[];   // watch, bracelet, gloves
  rightSide: PlacedItem[];  // bags (always here)
  nearFeet: PlacedItem[];   // socks, stockings
  strip: PlacedItem[];      // necklaces, rings, small extras
}

const TYPE_LABELS: Record<string, string> = {
  top: 'Top', bottom: 'Bottoms', outerwear: 'Outerwear', dress: 'Dress',
  shoes: 'Shoes', bag: 'Bag', accessory: 'Accessory', jewelry: 'Jewelry',
  reference_photo: 'Inspo', decorative: '',
};

/* ══════════════════════════════════════════
   buildOutfits — group items spatially, detect subtypes
   ══════════════════════════════════════════ */
function buildOutfits(look: ManifestLook, slideWidth: number) {
  const mid = slideWidth / 2;
  const seenHash = new Set<string>();
  const inspo: ManifestItem[] = [];
  const left: ManifestItem[] = [];
  const right: ManifestItem[] = [];
  const center: ManifestItem[] = [];

  for (const item of look.items) {
    if (item.type === 'decorative' || item.type === 'unknown') continue;
    if (seenHash.has(item.imageHash)) continue;
    seenHash.add(item.imageHash);

    if (item.type === 'reference_photo') { inspo.push(item); continue; }

    const cx = item.left + item.width / 2;
    const dist = Math.abs(cx - mid);
    if (dist < mid * 0.15) center.push(item);
    else if (cx < mid) left.push(item);
    else right.push(item);
  }

  const garmentTypes = new Set(['outerwear', 'top', 'bottom', 'dress', 'shoes']);
  for (const item of center) {
    const lc = left.filter(i => garmentTypes.has(i.type)).length;
    const rc = right.filter(i => garmentTypes.has(i.type)).length;
    (lc <= rc ? left : right).push(item);
  }

  const STACK_ORDER = ['outerwear', 'top', 'dress', 'bottom'];

  const makeOutfit = (items: ManifestItem[]): Outfit => {
    const garments = items.filter(i => garmentTypes.has(i.type));
    const accessories = items.filter(i => !garmentTypes.has(i.type));

    // Detect subtypes and assign zones
    const placed: PlacedItem[] = accessories.map(item => {
      const subtype = detectSubtype(item);
      return { item, subtype, zone: ZONE_MAP[subtype] };
    });

    // Bags always go to rightSide regardless of subtype detection
    const bags = items.filter(i => i.type === 'bag').map(item => ({
      item, subtype: 'unknown' as Subtype, zone: 'rightSide' as Zone,
    }));
    const nonBagPlaced = placed.filter(p => p.item.type !== 'bag');

    return {
      head: nonBagPlaced.filter(p => p.zone === 'head'),
      neck: nonBagPlaced.filter(p => p.zone === 'neck'),
      stack: garments
        .filter(i => STACK_ORDER.includes(i.type))
        .sort((a, b) => STACK_ORDER.indexOf(a.type) - STACK_ORDER.indexOf(b.type)),
      shoes: garments.filter(i => i.type === 'shoes'),
      leftSide: nonBagPlaced.filter(p => p.zone === 'leftSide'),
      rightSide: bags,
      nearFeet: nonBagPlaced.filter(p => p.zone === 'nearFeet'),
      strip: nonBagPlaced.filter(p => p.zone === 'strip'),
    };
  };

  const outfits: Outfit[] = [];
  if (left.length) outfits.push(makeOutfit(left));
  if (right.length) outfits.push(makeOutfit(right));
  if (!outfits.length && (left.length || right.length))
    outfits.push(makeOutfit([...left, ...right]));

  return { outfits, inspo };
}

/* ══════════════════════════════════════════
   ItemImg — Image with hover label
   ══════════════════════════════════════════ */
function ItemImg({ item, lookId, height, maxW, label }: {
  item: ManifestItem; lookId: string; height: number; maxW: number; label?: string;
}) {
  return (
    <div className="relative group flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/outfits/extracted/${lookId}/${item.file}`}
        alt={item.description || item.type}
        className="object-contain transition-[filter] duration-200"
        style={{
          height, width: 'auto', maxWidth: maxW,
          filter: 'drop-shadow(0 0 0.4px rgba(0,0,0,0.3)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))',
        }}
        draggable={false}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 0.4px rgba(0,0,0,0.3)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'drop-shadow(0 0 0.4px rgba(0,0,0,0.3)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))';
        }}
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-0.5
                      opacity-0 group-hover:opacity-100 transition-opacity
                      duration-150 pointer-events-none whitespace-nowrap z-50">
        <span className="text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded"
          style={{
            color: c.brown,
            backgroundColor: `${c.bg}E8`,
            border: `1px solid ${c.brown}20`,
          }}>
          {label || TYPE_LABELS[item.type] || item.type}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   OutfitColumn — Body-relative flat-lay
   ══════════════════════════════════════════ */
function OutfitColumn({ outfit, lookId, label, S }: {
  outfit: Outfit; lookId: string; label?: string; S: SizesType;
}) {
  const hasHead = outfit.head.length > 0;
  const hasNeck = outfit.neck.length > 0;
  const hasSides = outfit.leftSide.length > 0 || outfit.rightSide.length > 0;
  const hasNearFeet = outfit.nearFeet.length > 0;
  const hasStrip = outfit.strip.length > 0;

  // Height helper for placed items
  const pH = (p: PlacedItem) => S[p.subtype as keyof SizesType] as number
    || (p.item.type === 'jewelry' ? S.genericJewelry : S.genericAcc);

  return (
    <div className="flex flex-col items-center" style={{ width: S.colW }}>
      {label && (
        <span className="text-[9px] uppercase tracking-[0.15em] mb-1 font-medium"
          style={{ color: c.brown, opacity: 0.3 }}>
          {label}
        </span>
      )}

      {/* HEAD ROW — hats, sunglasses, earrings side by side */}
      {hasHead && (
        <div className="flex items-end justify-center mb-1"
          style={{ gap: S.headGap }}>
          {outfit.head.map(p => (
            <ItemImg key={p.item.file} item={p.item} lookId={lookId}
              height={pH(p)} maxW={S.colW / 3}
              label={p.subtype !== 'unknown' ? p.subtype : undefined} />
          ))}
        </div>
      )}

      {/* NECK — scarves, positioned to overlap into garment stack top */}
      {hasNeck && (
        <div className="flex items-center justify-center" style={{ marginBottom: -8, zIndex: 5 }}>
          {outfit.neck.map(p => (
            <ItemImg key={p.item.file} item={p.item} lookId={lookId}
              height={pH(p)} maxW={S.garmentW * 0.9} />
          ))}
        </div>
      )}

      {/* BODY — garment stack (center) with side accessories */}
      <div className="relative flex items-start justify-center" style={{ width: S.colW }}>

        {/* Left side: watch, bracelet, gloves */}
        {outfit.leftSide.length > 0 && (
          <div className="flex flex-col items-center gap-1 pt-6 flex-shrink-0"
            style={{ width: S.sideItemW }}>
            {outfit.leftSide.map(p => (
              <ItemImg key={p.item.file} item={p.item} lookId={lookId}
                height={pH(p)} maxW={S.sideItemW}
                label={p.subtype !== 'unknown' ? p.subtype : undefined} />
            ))}
          </div>
        )}

        {/* Center: garment stack + shoes */}
        <div className="flex flex-col items-center flex-shrink-0"
          style={{ width: S.garmentW }}>
          {/* Garments with overlap */}
          {outfit.stack.map((item, i) => (
            <div key={item.file} className="relative"
              style={{
                marginTop: i === 0 ? 0 : S.stackOverlap,
                zIndex: outfit.stack.length - i,
              }}>
              <ItemImg item={item} lookId={lookId}
                height={(S[item.type as keyof SizesType] as number) ?? 120}
                maxW={S.garmentW} />
            </div>
          ))}

          {/* Socks near bottom of stack */}
          {hasNearFeet && (
            <div className="flex items-center justify-center gap-1" style={{ marginTop: -4, zIndex: 0 }}>
              {outfit.nearFeet.map(p => (
                <ItemImg key={p.item.file} item={p.item} lookId={lookId}
                  height={pH(p)} maxW={S.garmentW / 2} />
              ))}
            </div>
          )}

          {/* Shoes overlap bottom of pants */}
          {outfit.shoes.length > 0 && (
            <div className="flex items-start justify-center gap-1"
              style={{ marginTop: S.shoeOverlap, zIndex: 0 }}>
              {outfit.shoes.map(item => (
                <ItemImg key={item.file} item={item} lookId={lookId}
                  height={S.shoes} maxW={S.garmentW / 2} />
              ))}
            </div>
          )}
        </div>

        {/* Right side: bags */}
        {outfit.rightSide.length > 0 && (
          <div className="flex flex-col items-center gap-1 pt-4 flex-shrink-0"
            style={{ width: S.sideItemW }}>
            {outfit.rightSide.map(p => (
              <ItemImg key={p.item.file} item={p.item} lookId={lookId}
                height={S.bag} maxW={S.sideItemW}
                label="bag" />
            ))}
          </div>
        )}

        {/* If no sides, still render empty spacers so garments stay centered */}
        {!hasSides && <div style={{ width: 0 }} />}
      </div>

      {/* STRIP — necklaces, rings, small jewelry */}
      {hasStrip && (
        <div className="flex items-center justify-center flex-wrap mt-1"
          style={{ gap: S.headGap }}>
          {outfit.strip.map(p => (
            <ItemImg key={p.item.file} item={p.item} lookId={lookId}
              height={pH(p)} maxW={S.colW / 4}
              label={p.subtype !== 'unknown' ? p.subtype : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   InspoSection — Polaroid reference photos
   ══════════════════════════════════════════ */
function InspoSection({ items, lookId, S }: {
  items: ManifestItem[]; lookId: string; S: SizesType;
}) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <span className="text-[9px] uppercase tracking-[0.15em] font-medium"
        style={{ color: c.brown, opacity: 0.3 }}>
        Inspo
      </span>
      <div className={`flex ${items.length > 1 ? 'flex-col' : ''} gap-2`}>
        {items.map(item => (
          <div key={item.file} className="relative"
            style={{
              padding: '4px 4px 16px 4px',
              backgroundColor: 'rgba(245,240,235,0.6)',
              border: '1px solid rgba(180,160,140,0.12)',
              borderRadius: '2px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/outfits/extracted/${lookId}/${item.file}`}
              alt={item.description || 'Styling reference'}
              className="object-cover rounded-sm"
              style={{
                width: items.length > 1 ? S.inspoW * 0.7 : S.inspoW,
                height: items.length > 1 ? S.inspoH * 0.7 : S.inspoH,
                objectPosition: 'top center',
              }}
              draggable={false}
            />
            <div className="absolute bottom-0.5 left-0 right-0 text-center">
              <span className="text-[7px] uppercase tracking-wider"
                style={{ color: c.text, opacity: 0.2 }}>
                styling reference
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide fallback ── */
function SlideView({ look }: { look: ManifestLook }) {
  if (!look.slideImage) return (
    <p className="text-sm" style={{ color: c.text, opacity: 0.4 }}>
      No slide image available
    </p>
  );
  return (
    <div className="flex flex-col items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={look.slideImage} alt={`Look ${look.id}`}
        className="max-h-[70vh] w-auto rounded shadow-lg" draggable={false} />
      <span className="text-[10px] uppercase tracking-wider"
        style={{ color: c.brown, opacity: 0.4 }}>
        {look.id} &mdash; awaiting analysis
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════ */
export default function Closet3Page() {
  const [showCover, setShowCover] = useState(true);
  const [idx, setIdx] = useState(0);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const S = useScaledSizes();

  useEffect(() => {
    fetch('/outfits/extracted/manifest.json')
      .then(r => r.json())
      .then((data: Manifest) => {
        data.looks = data.looks.filter(l => l.items.length > 0);
        setManifest(data);
      })
      .catch(console.error);
  }, []);

  const total = manifest?.looks.length ?? 0;
  const openCover = useCallback(() => { if (manifest) setShowCover(false); }, [manifest]);

  const navigate = useCallback((dir: 1 | -1) => {
    setTransitioning(true);
    setTimeout(() => {
      setIdx(i => {
        if (dir === -1 && i === 0) { setShowCover(true); return 0; }
        return Math.max(0, Math.min(i + dir, total - 1));
      });
      setTransitioning(false);
    }, 140);
  }, [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault(); showCover ? openCover() : navigate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault(); if (!showCover) navigate(-1);
      } else if (e.key === 'Escape') {
        setShowCover(true); setIdx(0);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCover, openCover, navigate]);

  useEffect(() => { containerRef.current?.focus(); }, [showCover]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  };

  const look = manifest?.looks[idx] ?? null;
  const hasAnalysis = !!(look?.title);

  const { outfits, inspo } = useMemo(() => {
    if (!look || !manifest) return { outfits: [], inspo: [] };
    return buildOutfits(look, manifest.slideWidth);
  }, [look, manifest]);

  const bgStyle = useMemo(() => {
    if (!look?.panelColors?.length) return { backgroundColor: c.bg };
    const [c1, c2] = look.panelColors;
    return {
      backgroundColor: c.bg,
      background: c2
        ? `linear-gradient(135deg, ${c1}20 0%, ${c2}28 100%)`
        : `${c1}18`,
    };
  }, [look]);

  /* ── COVER ── */
  if (showCover) {
    return (
      <div ref={containerRef} tabIndex={-1}
        className="outline-none flex flex-col items-center justify-center px-4 py-12"
        style={{ backgroundColor: c.bg, color: c.text, minHeight: '100dvh' }}>
        <div className="fixed top-3 right-3 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
          style={{ backgroundColor: '#8BC48B', color: c.bg }}>Variant 3: Extracted</div>
        <div onClick={openCover} role="button" tabIndex={0}
          className="group relative w-[60vw] max-w-[340px] cursor-pointer outline-none"
          style={{ aspectRatio: '3 / 4', maxHeight: '50vh' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8
                          transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ backgroundColor: c.card, boxShadow: '4px 8px 32px rgba(0,0,0,0.5)' }}>
            <div className="absolute inset-3 md:inset-4 pointer-events-none"
              style={{ border: `1px solid ${c.brown}18` }} />
            <p className="text-[9px] tracking-[0.35em] uppercase mb-6"
              style={{ color: c.brown }}>A Capsule Wardrobe Lookbook</p>
            <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight"
              style={{ color: c.pink }}>Mel</h1>
            <h2 className="font-display text-3xl md:text-4xl font-light mt-1"
              style={{ color: c.text }}>Outfit Board</h2>
            <div className="w-10 h-px mt-6 mb-5" style={{ backgroundColor: `${c.brown}40` }} />
            <p className="text-[11px] tracking-[0.25em] uppercase font-light"
              style={{ color: c.brown }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            {manifest && (
              <p className="absolute bottom-4 text-[10px] tracking-[0.2em] uppercase"
                style={{ color: c.brown, opacity: 0.3 }}>{total} Looks</p>
            )}
            {!manifest && (
              <p className="absolute bottom-9 text-[10px] tracking-wider"
                style={{ color: c.text, opacity: 0.3 }}>Loading&hellip;</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!manifest || !look) return null;

  return (
    <div ref={containerRef} tabIndex={-1}
      className="outline-none flex flex-col overflow-hidden"
      style={{ ...bgStyle, height: '100dvh' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      <div className="fixed top-3 right-12 z-50 px-2 py-1 text-[10px] tracking-wider uppercase rounded"
        style={{ backgroundColor: '#8BC48B', color: c.bg }}>V3: Extracted</div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 z-30">
        <button onClick={() => { setShowCover(true); setIdx(0); }}
          className="text-xs tracking-wider font-light hover:opacity-70 transition-opacity w-16"
          style={{ color: c.text, opacity: 0.5 }}>&larr; Back</button>

        <div className="flex flex-col items-center gap-0">
          {hasAnalysis ? (
            <>
              <span className="text-sm md:text-base font-light tracking-wide"
                style={{ color: c.text }}>{look.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest"
                  style={{ color: c.brown }}>{look.category}</span>
                <span className="text-[10px]" style={{ color: c.text, opacity: 0.2 }}>&middot;</span>
                <span className="text-[10px] tabular-nums"
                  style={{ color: c.text, opacity: 0.3 }}>{idx + 1} of {total}</span>
              </div>
            </>
          ) : (
            <span className="text-xs tabular-nums"
              style={{ color: c.text, opacity: 0.5 }}>{idx + 1} / {total}</span>
          )}
        </div>

        <div className="flex gap-1 w-16 justify-end">
          {look.colorPalette?.slice(0, 5).map((col, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: col, border: '1px solid rgba(255,255,255,0.08)' }} />
          ))}
        </div>
      </div>

      {/* Main outfit area */}
      <div className={`flex-1 flex items-center justify-center min-h-0
                       overflow-y-auto overflow-x-hidden px-4 md:px-8 pb-2
                       transition-opacity duration-140
                       ${transitioning ? 'opacity-0' : 'opacity-100'}`}>

        {hasAnalysis ? (
          <div className="flex items-start justify-center"
            style={{ gap: S.outfitGap }}>

            {outfits.map((outfit, i) => (
              <OutfitColumn key={i} outfit={outfit} lookId={look.id}
                label={outfits.length > 1 ? `Look ${i + 1}` : undefined}
                S={S} />
            ))}

            {inspo.length > 0 && outfits.length > 0 && (
              <div className="self-stretch flex items-center mx-1">
                <div className="w-px h-2/3" style={{ backgroundColor: `${c.brown}12` }} />
              </div>
            )}

            {inspo.length > 0 && (
              <InspoSection items={inspo} lookId={look.id} S={S} />
            )}
          </div>
        ) : (
          <SlideView look={look} />
        )}
      </div>

      {/* Bottom bar */}
      {hasAnalysis && (
        <div className="shrink-0 px-4 py-2 z-20"
          style={{ borderTop: `1px solid ${c.brown}10` }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-[11px] leading-relaxed font-light mb-1.5"
              style={{ color: c.text, opacity: 0.5 }}>
              {look.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {look.occasion?.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                <span key={i}
                  className="text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${c.brown}12`,
                    color: c.brown,
                    border: `1px solid ${c.brown}15`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nav arrows */}
      {idx > 0 && (
        <button onClick={e => { e.stopPropagation(); navigate(-1); }}
          className="fixed left-2 top-1/2 -translate-y-1/2 z-20
                     w-8 h-8 md:w-10 md:h-10 flex items-center justify-center
                     rounded-full transition-all hover:scale-110"
          style={{ backgroundColor: `${c.bg}90`, backdropFilter: 'blur(4px)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="1.5"
            className="w-3.5 h-3.5 opacity-60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {idx < total - 1 && (
        <button onClick={e => { e.stopPropagation(); navigate(1); }}
          className="fixed right-2 top-1/2 -translate-y-1/2 z-20
                     w-8 h-8 md:w-10 md:h-10 flex items-center justify-center
                     rounded-full transition-all hover:scale-110"
          style={{ backgroundColor: `${c.bg}90`, backdropFilter: 'blur(4px)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={c.text} strokeWidth="1.5"
            className="w-3.5 h-3.5 opacity-60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
