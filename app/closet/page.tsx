'use client';

import React, { useState } from 'react';

const c = {
  pink: '#E8C4C4',
  brown: '#C9A67A',
  text: '#FAF7F2',
  bg: '#261A14',
  card: '#332520',
};

export default function ClosetPage() {
  const [opened, setOpened] = useState(false);

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className="outline-none flex flex-col items-center justify-center px-4 py-12 gap-8 md:gap-10"
      style={{ backgroundColor: c.bg, color: c.text, minHeight: '100dvh' }}
    >
      {/* Full-screen Coming Soon overlay */}
      {opened && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: c.bg }}
          onClick={() => setOpened(false)}
        >
          {/* Decorative border */}
          <div
            className="absolute inset-4 md:inset-8 pointer-events-none"
            style={{ border: `1px solid ${c.brown}15` }}
          />

          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-8"
            style={{ color: c.brown, opacity: 0.5 }}
          >
            A Capsule Wardrobe Lookbook
          </p>

          <h2
            className="font-serif-display text-5xl md:text-7xl font-light tracking-wide mb-3"
            style={{ color: c.pink }}
          >
            Coming Soon
          </h2>

          <div className="w-12 h-px my-6" style={{ backgroundColor: `${c.brown}40` }} />

          <p
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-light mb-2"
            style={{ color: c.brown }}
          >
            83 Looks in progress
          </p>

          <p
            className="text-[11px] tracking-[0.2em] uppercase font-light mt-8"
            style={{ color: c.text, opacity: 0.15 }}
          >
            Tap anywhere to close
          </p>
        </div>
      )}

      {/* Magazine cover */}
      <div
        onClick={() => setOpened(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpened(true); } }}
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

          <p className="absolute bottom-9 md:bottom-11 text-[10px] tracking-wider opacity-0 group-hover:opacity-30 transition-opacity duration-500"
             style={{ color: c.text }}>
            Click to open
          </p>
        </div>
      </div>

      {/* Bio */}
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
