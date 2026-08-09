'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PHOTOS, type Photo } from './photos';

/** The sunset shot from the album, used as the backdrop behind the words. */
const HERO_PHOTO = '/bday2026/hero-olive-grove.jpg';

/* Slow-drifting warm motes, like dust in morning light */
const Motes = () => {
  const motes = Array.from({ length: 18 }).map((_, i) => {
    const left = Math.random() * 100;
    const size = Math.random() * 6 + 3;
    const duration = Math.random() * 10 + 12;
    const delay = Math.random() * 10;
    return (
      <div
        key={i}
        className="absolute bottom-0 rounded-full bg-amber-200/60"
        style={{
          left: `${left}%`,
          width: size,
          height: size,
          animation: `moteRise ${duration}s linear ${delay}s infinite`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {motes}
    </div>
  );
};

/* ============================ Music ============================ */

const SpeakerOnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6.5 8.5H3.5v7h3L11 19V5Z" />
    <path strokeLinecap="round" d="M15 9.5a3.5 3.5 0 0 1 0 5M17.8 7a7 7 0 0 1 0 10" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6.5 8.5H3.5v7h3L11 19V5Z" />
    <path strokeLinecap="round" d="m15.5 10 4 4m0-4-4 4" />
  </svg>
);

/* ============================ Scenes ============================ */

const Reveal = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

/** Quiet little sunbreak that sits between the photos. */
const Divider = () => (
  <Reveal className="flex items-center justify-center gap-3 py-14 md:py-20">
    <span className="h-px w-10 bg-amber-300/70" aria-hidden />
    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" aria-hidden />
    <span className="h-px w-10 bg-amber-300/70" aria-hidden />
  </Reveal>
);

const PhotoCard = ({
  src,
  alt,
  landscape,
  priority,
}: Photo & { priority?: boolean }) => (
  <Reveal className={`w-full px-6 ${landscape ? 'max-w-2xl' : 'max-w-md'}`}>
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl shadow-amber-900/10 bg-amber-100 ${
        landscape ? 'aspect-[4/3]' : 'aspect-[3/4]'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={landscape ? '(max-width: 768px) 90vw, 42rem' : '(max-width: 768px) 90vw, 28rem'}
        className="object-cover"
        priority={priority}
      />
    </div>
  </Reveal>
);

/* ============================ Page ============================ */

const BDay2026Page = () => {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  /* Browsers refuse to start audio before the visitor has interacted with the
     page, so try on load and otherwise catch the first gesture. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;

    const stopListening = () => {
      events.forEach((event) => window.removeEventListener(event, start));
    };

    function start() {
      audio!.play().then(stopListening).catch(() => {});
    }

    start();
    events.forEach((event) =>
      window.addEventListener(event, start, { passive: true })
    );

    return stopListening;
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const scrollPhotos = PHOTOS.filter((photo) => photo.src !== HERO_PHOTO);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 text-stone-800 relative overflow-x-hidden">
      <style jsx global>{`
        /* White type over the photo, warmed and anchored so it reads against
           both the bright sky and the treeline. */
        .on-photo {
          text-shadow: 0 2px 10px rgba(58, 38, 18, 0.55),
            0 1px 3px rgba(58, 38, 18, 0.7),
            0 0 44px rgba(58, 38, 18, 0.35);
        }
        @keyframes moteRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-105vh) translateX(20px); opacity: 0; }
        }
      `}</style>

      <audio ref={audioRef} src="/bday2026/sunday-morning.mp3" loop preload="auto" />

      <Motes />

      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/60 bg-white/70 text-stone-600 shadow-lg shadow-amber-900/10 backdrop-blur-sm transition-colors hover:text-stone-900"
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
      </button>

      <main className="relative z-10 flex flex-col items-center pb-32">
        {/* ---------- The words, over the sunset ---------- */}
        <section className="relative w-full flex flex-col items-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src={HERO_PHOTO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Warm shade over the photo so the white type reads the whole way
                down. The photo keeps its colour to a clean bottom edge. */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/35 via-stone-900/25 to-stone-900/40" />
          </div>

          <h1 className="on-photo px-6 pt-28 md:pt-36 pb-16 md:pb-20 text-center font-display text-4xl md:text-6xl text-white">
            Happy birthday, my love
          </h1>

          <Reveal className="on-photo w-full max-w-2xl px-6 pb-28 md:pb-36 text-center">
            <p className="font-display text-3xl md:text-5xl leading-snug text-white">
              So excited for another year of loving you &#10084;&#65039;
            </p>
            <p className="mt-12 font-display text-xl md:text-2xl leading-relaxed text-white/95">
              you are so beautiful and loving and fantastic and funny and cute
              and adorable and artistic and fierce and so, so much more
            </p>
          </Reveal>
        </section>

        {/* ---------- Then the photos ---------- */}
        {scrollPhotos.map((photo, i) => (
          <React.Fragment key={photo.src}>
            <Divider />
            <PhotoCard {...photo} priority={i === 0} />
          </React.Fragment>
        ))}
      </main>
    </div>
  );
};

export default BDay2026Page;
