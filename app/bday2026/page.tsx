'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PHOTOS } from './photos';

/* ============================ Sunshine ============================ */

const Sun = ({ small = false }: { small?: boolean }) => (
  <div
    className={`relative ${small ? 'w-20 h-20' : 'w-44 h-44 md:w-56 md:h-56'}`}
    aria-hidden
  >
    {/* rays */}
    <div className="absolute inset-0 animate-sunSpin">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 origin-center"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div
            className="rounded-full bg-amber-300/70"
            style={{
              width: small ? '3px' : '5px',
              height: small ? '14px' : '30px',
              transform: `translate(-50%, ${small ? '-46px' : '-104px'})`,
            }}
          />
        </div>
      ))}
    </div>
    {/* glow */}
    <div className="absolute inset-2 rounded-full bg-amber-200/40 blur-2xl animate-sunPulse" />
    {/* body */}
    <div className="absolute inset-4 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 shadow-[0_0_60px_20px_rgba(251,191,36,0.35)]" />
  </div>
);

/* Slow-drifting warm motes, like dust in morning light */
type Mote = { left: number; size: number; duration: number; delay: number };

const Motes = () => {
  // Generated after mount, never during render: the random values differ
  // between the server pass and the client pass, which React flags as a
  // hydration mismatch. Rendering nothing on the server sidesteps it.
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    setMotes(
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {motes.map((mote, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full bg-amber-200/60"
          style={{
            left: `${mote.left}%`,
            width: mote.size,
            height: mote.size,
            animation: `moteRise ${mote.duration}s linear ${mote.delay}s infinite`,
          }}
        />
      ))}
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

/** Text beats woven between the photos. */
const OPENING_LINES = [
  'Good morning, sunshine.',
  'It is your day.',
];

const CLOSING_LINES = [
  'So excited for another year of loving you ❤️',
];

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

const Line = ({ children }: { children: React.ReactNode }) => (
  <Reveal className="w-full max-w-2xl px-6 py-20 md:py-28 text-center">
    <p className="font-display text-3xl md:text-5xl leading-snug text-stone-800">
      {children}
    </p>
  </Reveal>
);

const PhotoCard = ({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) => (
  <Reveal className="w-full max-w-md px-6">
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-xl shadow-amber-900/10 bg-amber-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, 28rem"
        className="object-cover"
        priority={priority}
      />
    </div>
    {caption && (
      <p className="mt-4 text-center font-display italic text-lg md:text-xl text-stone-600">
        {caption}
      </p>
    )}
  </Reveal>
);

/* ============================ Page ============================ */

const BDay2026Page = () => {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const open = () => {
    setOpened(true);
    audioRef.current?.play().catch(() => {});
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 text-stone-800 relative overflow-x-hidden">
      <style jsx global>{`
        @keyframes sunSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sunPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 0.8; }
        }
        @keyframes moteRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-105vh) translateX(20px); opacity: 0; }
        }
        @keyframes sunRise {
          from { transform: translateY(30vh) scale(1.3); opacity: 0.4; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-sunSpin { animation: sunSpin 60s linear infinite; }
        .animate-sunPulse { animation: sunPulse 5s ease-in-out infinite; }
        .animate-sunRise { animation: sunRise 1.6s ease-out both; }
      `}</style>

      <audio ref={audioRef} src="/bday2026/sunday-morning.mp3" loop preload="auto" />

      {/* ---------- Opening: the sunshine ---------- */}
      {!opened && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-amber-100 via-orange-100 to-rose-100 px-6">
          <Motes />
          <Sun />
          <h1 className="mt-10 font-display text-4xl md:text-6xl text-stone-800 text-center">
            Happy birthday, my love
          </h1>
          <button
            onClick={open}
            className="mt-10 rounded-full bg-amber-400 px-8 py-3 font-body text-lg text-stone-900 shadow-lg shadow-amber-500/30 transition-transform duration-300 hover:scale-105"
          >
            let the sun in
          </button>
        </div>
      )}

      {/* ---------- The letter ---------- */}
      {opened && (
        <>
          <Motes />

          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute music' : 'Mute music'}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/60 bg-white/70 text-stone-600 shadow-lg shadow-amber-900/10 backdrop-blur-sm transition-colors hover:text-stone-900"
          >
            {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
          </button>

          <main className="relative z-10 flex flex-col items-center pb-32">
            <div className="pt-20 pb-4 animate-sunRise">
              <Sun small />
            </div>

            {OPENING_LINES.map((line) => (
              <Line key={line}>{line}</Line>
            ))}

            {PHOTOS.map((photo, i) => (
              <React.Fragment key={photo.src}>
                <PhotoCard {...photo} priority={i === 0} />
                <div className="h-16 md:h-24" />
              </React.Fragment>
            ))}

            {CLOSING_LINES.map((line) => (
              <Line key={line}>{line}</Line>
            ))}

            {/* Final card */}
            <Reveal className="w-full max-w-2xl px-6 pt-8">
              <div className="rounded-2xl border border-amber-300/60 bg-white/60 backdrop-blur-sm p-8 md:p-12 text-center shadow-xl shadow-amber-900/5">
                <p className="font-display text-3xl md:text-5xl text-stone-800">
                  Happy birthday my love
                </p>
                <div className="mx-auto my-7 h-px w-16 bg-amber-400/70" />
                <p className="font-display text-xl md:text-2xl leading-relaxed text-stone-700">
                  you are so beautiful and loving and fantastic and funny and
                  cute and adorable and artistic and fierce and so, so much
                  more
                </p>
                <p className="mt-8 text-3xl" aria-hidden>
                  &#9728;&#65039; &#10084;&#65039;
                </p>
              </div>
            </Reveal>
          </main>
        </>
      )}
    </div>
  );
};

export default BDay2026Page;
