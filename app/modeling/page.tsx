'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PASSWORD = 'JackLovesMel';

const colors = {
  olive: '#5C6B4A',
  softPink: '#E8C4C4',
  warmBrown: '#C9A67A',
  nearBlack: '#1C1917',
  cream: '#FAF7F2',
  creamAlt: '#F5F0E8',
};

const centerImage = { src: '/modeling/TorsoThighA.JPEG', altText: 'Centerpiece' };
const petalImages = [
  { src: '/modeling/CloseUp.JPEG', altText: 'Close up' },
  { src: '/modeling/FullBody.JPEG', altText: 'Full body' },
  { src: '/modeling/SideZoomOut.JPEG', altText: 'Side zoom out' },
  { src: '/modeling/Side.JPEG', altText: 'Side profile' },
  { src: '/modeling/SideBody.JPEG', altText: 'Side body' },
  { src: '/modeling/TorsoThighB.JPEG', altText: 'Torso thigh B' },
];

const statsData = [
  { label: "Height", value: "173cm" },
  { label: "Waist", value: "25 in" },
  { label: "Hips", value: "39 in" },
  { label: "Shoe", value: "8.5 US" },
  { label: "Hair", value: "Brunette" },
  { label: "Eyes", value: "Brown" },
];

export default function ModelingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Libre+Franklin:wght@200;300;400&display=swap');
          .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
          .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
        `}</style>
        <main className="min-h-screen font-sans-light flex flex-col items-center justify-center p-8" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
          <div className="max-w-md w-full p-10" style={{ backgroundColor: colors.creamAlt }}>
            <h1 className="font-serif-display text-3xl text-center mb-2">Modeling Portfolio</h1>
            <p className="text-center text-sm font-light mb-8" style={{ color: colors.warmBrown }}>Password Protected</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border font-light focus:outline-none focus:ring-2"
                  style={{ borderColor: `${colors.olive}40`, backgroundColor: colors.cream }}
                  placeholder="Enter password"
                />
              </div>
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 text-sm font-light tracking-wide transition-opacity hover:opacity-80"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                Enter
              </button>
            </form>
            <Link href="/" className="block text-center mt-6 text-sm font-light hover:opacity-60 transition-opacity" style={{ color: colors.olive }}>
              Back to Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Libre+Franklin:wght@200;300;400&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
      `}</style>

      <main className="min-h-screen font-sans-light" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-5" style={{ backgroundColor: `${colors.cream}f0`, backdropFilter: 'blur(12px)' }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-serif-display text-2xl tracking-wide hover:opacity-60 transition-opacity">
                Melisa Onder
              </Link>
              <Link href="/" className="text-sm font-light hover:opacity-60 transition-opacity" style={{ color: colors.olive }}>
                Back to Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="pt-32 pb-8 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-light mb-4" style={{ color: colors.warmBrown }}>Portfolio</p>
            <h1 className="font-serif-display text-5xl lg:text-6xl font-light mb-4">Modeling</h1>
            <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: colors.olive }} />
          </div>
        </section>

        {/* Stats */}
        <section className="pb-12 px-8">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {statsData.map((stat) => (
                <div key={stat.label} className="text-center p-4" style={{ backgroundColor: colors.creamAlt }}>
                  <p className="text-xs font-light mb-1" style={{ color: colors.warmBrown }}>{stat.label}</p>
                  <p className="font-serif-display text-lg">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hexagonal Flower Layout */}
        <section className="pb-24 px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full" style={{ height: "650px" }}>
              {/* Centerpiece */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[38%] rounded-sm overflow-hidden shadow-xl">
                <div className="relative w-full pb-[100%]">
                  <Image src={centerImage.src} alt={centerImage.altText} fill className="object-cover object-top" priority />
                </div>
              </div>

              {/* Petals */}
              {petalImages.map((image, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 48;
                const top = 50 - radius * Math.cos(angle);
                const left = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={image.src}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 w-[22%] rounded-sm overflow-hidden shadow-lg transition-all duration-300 hover:scale-110 hover:z-20 hover:shadow-xl"
                    style={{ top: `${top}%`, left: `${left}%` }}
                  >
                    <div className="relative w-full pb-[100%]">
                      <Image src={image.src} alt={image.altText} fill className="object-cover object-top" priority={index < 3} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-8" style={{ backgroundColor: colors.nearBlack, color: colors.cream }}>
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="font-serif-display text-lg font-light">Melisa Onder</p>
            <Link href="/" className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity">Back to Home</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
