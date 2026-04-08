'use client';

import React from 'react';
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

const videos = [
  {
    src: '/dance/winter-2026-jazz-funk.mp4',
    title: 'Winter 2026',
    style: 'Jazz Funk',
  },
  {
    src: '/dance/winter-2026-latin.mp4',
    title: 'Winter 2026',
    style: 'Latin',
  },
  {
    src: '/dance/fall-2025.mp4',
    title: 'Fall 2025',
    style: 'Jazz Funk',
  },
];

export default function DancePage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:py-24"
      style={{ backgroundColor: colors.cream }}
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href="/#projects"
          className="inline-block mb-12 text-sm font-light transition-opacity hover:opacity-70"
          style={{ color: colors.warmBrown }}
        >
          &larr; Back
        </Link>

        <h1
          className="font-serif-display text-4xl md:text-5xl font-light mb-3"
          style={{ color: colors.nearBlack }}
        >
          Laurier Rec Dance
        </h1>
        <p
          className="text-base font-light mb-16"
          style={{ color: colors.warmBrown }}
        >
          Showcase performances from Wilfrid Laurier University recreational dance.
        </p>

        <div className="space-y-16">
          {videos.map((video) => (
            <section key={video.src}>
              <div className="mb-4">
                <h2
                  className="font-serif-display text-xl font-light"
                  style={{ color: colors.nearBlack }}
                >
                  {video.title}
                </h2>
                <p
                  className="text-sm font-light"
                  style={{ color: colors.warmBrown }}
                >
                  {video.style}
                </p>
              </div>
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded"
                style={{ backgroundColor: colors.creamAlt }}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
