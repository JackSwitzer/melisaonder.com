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

const ArrowIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const papers = [
  {
    slug: 'appellant-factum',
    title: 'Appellant Factum: R v. Ndhlovu',
    course: 'PO209 · Legal Writing',
    date: 'December 2024',
    description: 'Formal appellate brief challenging the SCC\'s ruling on mandatory SOIRA registration. Includes statement of facts, issues, and legal argument citing precedent.',
  },
  {
    slug: 'legal-memo',
    title: 'Legal Memorandum: R v. Ndhlovu',
    course: 'PO209 · Legal Writing',
    date: 'December 2024',
    description: 'Constitutional analysis examining whether sections 490.012 and 490.013(2.1) of the Criminal Code violate Section 7 of the Charter.',
  },
  {
    slug: 'op-ed',
    title: 'The Hidden Story Behind Our Food',
    course: 'PO316 · Op-Ed',
    date: '2024',
    description: 'Opinion piece examining the environmental toll of factory farming in Canada, proposing policy measures for sustainable agriculture.',
  },
  {
    slug: 'policy-briefing',
    title: 'Policy Briefing: Child Marriage in India',
    course: 'PO220 · Poverty & Inequality',
    date: 'October 2023',
    description: 'Policy analysis addressing the consequences of child marriage with recommendations for culturally-sensitive interventions.',
  },
];

export default function WritingIndexPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');

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
              <div className="hidden md:flex items-center gap-10">
                <Link href="/#about" className="text-sm font-light hover:opacity-60 transition-opacity">About</Link>
                <Link href="/#education" className="text-sm font-light hover:opacity-60 transition-opacity">Education</Link>
                <Link href="/#experience" className="text-sm font-light hover:opacity-60 transition-opacity">Experience</Link>
                <Link href="/writing" className="text-sm font-light" style={{ color: colors.olive }}>Writing</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="pt-32 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-10 text-sm font-light hover:gap-4 transition-all"
              style={{ color: colors.olive }}
            >
              <ArrowIcon className="w-4 h-4 rotate-180" />
              Back to Home
            </Link>

            <p className="text-xs tracking-[0.3em] uppercase font-light mb-4" style={{ color: colors.warmBrown }}>
              Academic Work
            </p>
            <h1 className="font-serif-display text-5xl lg:text-6xl font-light mb-6">
              Selected Writing
            </h1>
            <div className="w-16 h-px mb-8" style={{ backgroundColor: colors.olive }} />
            <p className="text-lg font-light leading-relaxed max-w-2xl" style={{ opacity: 0.75 }}>
              Legal writing, policy analysis, and opinion pieces from my studies in Political Science
              with a Legal Studies Specialization at Wilfrid Laurier University.
            </p>
          </div>
        </section>

        {/* Papers Grid */}
        <section className="pb-32 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {papers.map((paper, index) => (
                <Link
                  key={paper.slug}
                  href={`/writing/${paper.slug}`}
                  className="group block p-8 lg:p-10 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.creamAlt,
                    borderLeft: `2px solid ${colors.olive}`,
                  }}
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <p className="text-xs tracking-[0.2em] uppercase font-light mb-3" style={{ color: colors.warmBrown }}>
                        0{index + 1}
                      </p>
                      <h2 className="font-serif-display text-2xl lg:text-3xl font-light mb-3 group-hover:opacity-70 transition-opacity">
                        {paper.title}
                      </h2>
                      <p className="text-sm font-light mb-4" style={{ color: colors.olive }}>
                        {paper.course} · {paper.date}
                      </p>
                      <p className="font-light leading-relaxed" style={{ opacity: 0.7 }}>
                        {paper.description}
                      </p>
                    </div>
                    <div
                      className="p-3 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      style={{ color: colors.olive }}
                    >
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8" style={{ backgroundColor: colors.nearBlack, color: colors.cream }}>
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <p className="font-serif-display text-lg font-light">Melisa Onder</p>
            <Link href="/" className="text-sm font-light opacity-60 hover:opacity-100 transition-opacity">
              Back to Home
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
