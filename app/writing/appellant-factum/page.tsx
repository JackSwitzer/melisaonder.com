'use client';

import React from 'react';
import Link from 'next/link';

const colors = {
  olive: '#5C6B4A',
  softPink: '#E8C4C4',
  plum: '#6B4C7A',
  warmBrown: '#C9A67A',
  nearBlack: '#1C1917',
  cream: '#FAF7F2',
  creamAlt: '#F5F0E8',
};

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
  </svg>
);

export default function AppellantFactumPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
      `}</style>

      <main className="min-h-screen font-sans-light flex flex-col" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-5" style={{ backgroundColor: `${colors.cream}f0`, backdropFilter: 'blur(12px)' }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-serif-display text-2xl tracking-wide hover:opacity-60 transition-opacity">
                Melisa Onder
              </Link>
              <div className="hidden md:flex items-center gap-10">
                <Link href="/#about" className="text-sm font-light hover:opacity-60 transition-opacity">About</Link>
                <Link href="/#experience" className="text-sm font-light hover:opacity-60 transition-opacity">Experience</Link>
                <Link href="/writing" className="text-sm font-light" style={{ color: colors.olive }}>Writing</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="pt-28 pb-8 px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 mb-8 text-sm font-light hover:gap-3 transition-all"
              style={{ color: colors.olive }}
            >
              <ArrowIcon />
              <span className="rotate-180 inline-block"><ArrowIcon /></span>
              Back to Writing
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase font-light mb-3" style={{ color: colors.warmBrown }}>
                  Legal Writing
                </p>
                <h1 className="font-serif-display text-3xl lg:text-4xl font-light mb-4">
                  Appellant Factum: R v. Ndhlovu
                </h1>
                <p className="text-sm font-light" style={{ color: colors.olive }}>
                  PO209 · December 2024
                </p>
              </div>

              <a
                href="/papers/appellant-factum.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide transition-all hover:gap-4"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                <DownloadIcon />
                Download PDF
              </a>
            </div>

            <p className="text-base font-light leading-relaxed max-w-3xl" style={{ opacity: 0.75 }}>
              Formal appellate brief challenging the Supreme Court of Canada&apos;s ruling on mandatory SOIRA registration.
              Structured with statement of facts, issues, and legal argument citing precedent cases.
            </p>
          </div>
        </section>

        {/* PDF Viewer */}
        <section className="flex-1 px-8 pb-12">
          <div className="max-w-6xl mx-auto h-full">
            <div
              className="rounded-sm overflow-hidden h-[75vh] min-h-[600px]"
              style={{ backgroundColor: colors.creamAlt, boxShadow: `0 4px 20px ${colors.nearBlack}10` }}
            >
              <iframe
                src="/papers/appellant-factum.pdf#toolbar=1&navpanes=0&view=FitH"
                className="w-full h-full border-0"
                title="Appellant Factum: R v. Ndhlovu"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-8 mt-auto" style={{ backgroundColor: colors.nearBlack, color: colors.cream }}>
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="font-serif-display text-lg font-light">Melisa Onder</p>
            <Link href="/writing" className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity">
              Back to Writing
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
