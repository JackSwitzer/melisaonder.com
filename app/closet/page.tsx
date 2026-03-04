'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

interface OutfitPage {
  src: string;
  title: string;
  subtitle?: string;
}

const outfits: OutfitPage[] = [
  { src: '/outfits/slides/formal-5.jpg', title: 'JackSwitzer.com + MelisaOnder.com', subtitle: 'Formal' },
  { src: '/outfits/slides/formal-1.jpg', title: 'The Power Suit', subtitle: 'Formal' },
  { src: '/outfits/slides/formal-10.jpg', title: 'Golden Hour', subtitle: 'Formal' },
  { src: '/outfits/slides/formal-20.jpg', title: 'Refined Ivory', subtitle: 'Formal' },
  { src: '/outfits/slides/formal-15.jpg', title: 'Skating in Burberry', subtitle: 'Formal' },
  { src: '/outfits/slides/casual-1.jpg', title: 'Fur & Leather', subtitle: 'Everyday' },
  { src: '/outfits/slides/casual-10.jpg', title: 'Camel & Burgundy', subtitle: 'Everyday' },
  { src: '/outfits/slides/casual-15.jpg', title: 'Moto Luxe', subtitle: 'Everyday' },
  { src: '/outfits/slides/casual-25.jpg', title: 'Off-Duty Cool', subtitle: 'Everyday' },
  { src: '/outfits/slides/casual-30.jpg', title: 'Denim & Knits', subtitle: 'Everyday' },
];

export default function ClosetPage() {
  const [currentPage, setCurrentPage] = useState(-1); // -1 = cover showing
  const [isAnimating, setIsAnimating] = useState(false);
  const [coverOpen, setCoverOpen] = useState(false);
  const preloadRef = useRef<Set<string>>(new Set());
  const totalPages = outfits.length;

  const openCover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCoverOpen(true);
    setTimeout(() => {
      setCurrentPage(0);
      setIsAnimating(false);
    }, 800);
  }, [isAnimating]);

  const nextPage = useCallback(() => {
    if (isAnimating || currentPage >= totalPages - 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (isAnimating) return;
    if (currentPage <= 0) {
      // Close cover
      setIsAnimating(true);
      setCoverOpen(false);
      setTimeout(() => {
        setCurrentPage(-1);
        setIsAnimating(false);
      }, 800);
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, currentPage]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentPage === -1) openCover();
        else nextPage();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openCover, nextPage, prevPage, currentPage]);

  // Preload images
  useEffect(() => {
    outfits.forEach((o) => {
      if (!preloadRef.current.has(o.src)) {
        preloadRef.current.add(o.src);
        const img = new window.Image();
        img.src = o.src;
      }
    });
  }, []);

  const outfit = currentPage >= 0 ? outfits[currentPage] : null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${colors.softPink}; color: ${colors.cream}; }

        .book-container {
          perspective: 2000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .book {
          position: relative;
          transform-style: preserve-3d;
        }

        .book-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-style: preserve-3d;
          z-index: 10;
          cursor: pointer;
        }

        .book-cover.open {
          transform: rotateY(-160deg);
        }

        .cover-front, .cover-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .cover-back {
          transform: rotateY(180deg);
        }

        .page-content {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .page-content.entering-right {
          animation: slideInRight 0.5s ease forwards;
        }

        .page-content.entering-left {
          animation: slideInLeft 0.5s ease forwards;
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .page-turn-shadow {
          position: absolute;
          top: 0;
          right: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(to left, rgba(0,0,0,0.08), transparent);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .book:hover .page-turn-shadow {
          opacity: 1;
        }
      `}</style>

      <main
        className="min-h-screen font-sans-light antialiased flex flex-col"
        style={{ backgroundColor: colors.cream, color: colors.nearBlack }}
      >
        {/* Minimal header */}
        <nav className="py-3 px-6 flex items-center justify-between shrink-0 z-20 relative">
          <Link href="/" className="font-serif-display text-lg tracking-wide hover:opacity-60 transition-opacity">
            Melisa Onder
          </Link>
          <Link href="/#projects" className="text-xs font-light hover:opacity-60 transition-opacity" style={{ opacity: 0.5 }}>
            Back to Portfolio
          </Link>
        </nav>

        {/* Book area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
          <div className="book-container w-full max-w-5xl" style={{ height: 'calc(100vh - 120px)' }}>
            <div
              className="book relative"
              style={{
                width: '100%',
                maxWidth: '900px',
                aspectRatio: '16/9',
              }}
            >
              {/* Cover */}
              <div className={`book-cover ${coverOpen ? 'open' : ''}`} onClick={!coverOpen ? openCover : undefined}>
                {/* Cover front */}
                <div
                  className="cover-front flex flex-col items-center justify-center rounded-r-sm"
                  style={{
                    backgroundColor: colors.creamAlt,
                    border: `1px solid ${colors.warmBrown}30`,
                    boxShadow: '4px 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="text-center px-8">
                    <p className="text-xs tracking-[0.3em] uppercase font-light mb-6" style={{ color: colors.warmBrown }}>
                      A Capsule Wardrobe Lookbook
                    </p>
                    <h1 className="font-serif-display text-3xl md:text-5xl font-light mb-2" style={{ color: colors.softPink }}>
                      Melisa Onder&apos;s
                    </h1>
                    <h2 className="font-serif-display text-4xl md:text-6xl italic font-light mb-8" style={{ color: colors.nearBlack }}>
                      Outfit Board
                    </h2>
                    <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: colors.warmBrown + '40' }} />
                    <p className="text-xs font-light tracking-[0.15em]" style={{ color: colors.warmBrown, opacity: 0.6 }}>
                      {totalPages} Looks
                    </p>
                    <p className="text-xs font-light mt-8 animate-pulse" style={{ opacity: 0.3 }}>
                      Click to open
                    </p>
                  </div>
                </div>

                {/* Cover back (hidden, seen when cover flips) */}
                <div
                  className="cover-back"
                  style={{ backgroundColor: colors.creamAlt }}
                />
              </div>

              {/* Pages underneath the cover */}
              <div
                className="absolute inset-0 overflow-hidden rounded-r-sm"
                style={{
                  backgroundColor: colors.creamAlt,
                  boxShadow: '2px 2px 15px rgba(0,0,0,0.2)',
                }}
              >
                {outfit && (
                  <div
                    key={currentPage}
                    className="page-content entering-right absolute inset-0"
                  >
                    {/* Outfit image */}
                    <div className="absolute inset-0">
                      <Image
                        src={outfit.src}
                        alt={outfit.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 900px"
                        priority
                      />
                    </div>

                    {/* Title overlay at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                      style={{
                        background: `linear-gradient(to top, ${colors.cream}ee, ${colors.cream}cc, transparent)`,
                      }}
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-light mb-1" style={{ color: colors.warmBrown }}>
                            {outfit.subtitle}
                          </p>
                          <h3 className="font-serif-display text-xl md:text-2xl font-light" style={{ color: colors.softPink }}>
                            {outfit.title}
                          </h3>
                        </div>
                        <p className="text-xs font-light tabular-nums" style={{ color: colors.warmBrown, opacity: 0.5 }}>
                          {String(currentPage + 1).padStart(2, '0')}/{String(totalPages).padStart(2, '0')}
                        </p>
                      </div>
                    </div>

                    {/* Page turn shadow hint */}
                    <div className="page-turn-shadow" />
                  </div>
                )}

                {/* Welcome text when cover is closed */}
                {!coverOpen && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm font-light" style={{ opacity: 0.3 }}>
                      Open the cover to begin
                    </p>
                  </div>
                )}

                {/* Click zones */}
                {coverOpen && currentPage >= 0 && (
                  <>
                    <button
                      onClick={prevPage}
                      className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize z-10 group"
                      aria-label="Previous"
                    >
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity rounded-full" style={{ backgroundColor: `${colors.cream}cc` }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </div>
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentPage >= totalPages - 1}
                      className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize z-10 group"
                      aria-label="Next"
                    >
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity rounded-full" style={{ backgroundColor: `${colors.cream}cc` }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom scrubber */}
          {coverOpen && currentPage >= 0 && (
            <div className="flex items-center gap-4 mt-3 w-full max-w-5xl px-4">
              <p className="text-xs font-light tabular-nums shrink-0" style={{ color: colors.softPink }}>
                {String(currentPage + 1).padStart(2, '0')}/{String(totalPages).padStart(2, '0')}
              </p>
              <div
                className="flex-1 relative h-0.5 group cursor-pointer"
                style={{ backgroundColor: `${colors.softPink}20` }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  const newPage = Math.max(0, Math.min(totalPages - 1, Math.round(pct * (totalPages - 1))));
                  setCurrentPage(newPage);
                }}
              >
                <div
                  className="absolute left-0 top-0 h-full transition-all duration-200"
                  style={{
                    width: `${((currentPage + 1) / totalPages) * 100}%`,
                    backgroundColor: colors.softPink,
                  }}
                />
              </div>
              <p className="text-[10px] font-light shrink-0 font-serif-display italic" style={{ color: colors.warmBrown, opacity: 0.4 }}>
                {outfit?.title}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
