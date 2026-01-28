'use client';

import React from 'react';
import Link from 'next/link';

const colors = {
  olive: '#5C6B4A',
  warmBrown: '#C9A67A',
  nearBlack: '#1C1917',
  cream: '#FAF7F2',
  creamAlt: '#F5F0E8',
};

export default function AppellantFactumPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <main className="min-h-screen font-sans-light" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
        {/* Navigation */}
        <nav className="py-6 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-3xl mx-auto">
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

        {/* Article */}
        <article className="px-8 pb-20">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="py-12 border-b" style={{ borderColor: `${colors.olive}20` }}>
              <p className="text-xs tracking-[0.25em] uppercase font-light mb-4" style={{ color: colors.warmBrown }}>
                Appellant Factum
              </p>
              <h1 className="font-serif-display text-4xl md:text-5xl font-light leading-tight mb-6">
                <em>R v. Ndhlovu</em>
              </h1>
              <div className="flex items-center gap-4 text-sm font-light" style={{ color: colors.olive }}>
                <span>PO209: Legal Writing</span>
                <span style={{ color: colors.warmBrown }}>|</span>
                <span>December 2024</span>
              </div>
              <p className="text-sm font-light mt-4" style={{ opacity: 0.6 }}>
                Court of Appeal of Wilfrid Laurier University &middot; File No. CA39360
              </p>
            </header>

            {/* Content */}
            <div className="py-12 space-y-8">
              {/* Case info */}
              <div className="p-6" style={{ backgroundColor: colors.creamAlt }}>
                <p className="font-serif-display text-lg mb-4"><strong>His Majesty The King</strong> (Appellant)</p>
                <p className="text-sm font-light mb-2">v.</p>
                <p className="font-serif-display text-lg"><strong>Eugene Ndhlovu</strong> (Respondent)</p>
              </div>

              {/* Lead */}
              <p className="font-serif-display text-xl md:text-2xl leading-relaxed" style={{ color: colors.nearBlack }}>
                On appeal from the order of Justices Andromache Karakatsanis and Sheilah L. Martin of the Supreme Court of Canada pronounced on the 28th of October 2022.
              </p>

              {/* Overview */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Overview
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                This appellant's factum argues that the Supreme Court of Canada erred in declaring sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em> unconstitutional. These provisions mandate registration under the <em>Sex Offender Information Registration Act</em> (SOIRA) for offenders convicted of designated sexual offences.
              </p>

              {/* Pull quote */}
              <blockquote className="py-6 px-8 my-8 border-l-2" style={{ borderColor: colors.olive, backgroundColor: colors.creamAlt }}>
                <p className="font-serif-display text-xl italic leading-relaxed" style={{ color: colors.nearBlack }}>
                  The relevant legislation is carefully designed to balance the offender's rights with public safety and law enforcement needs.
                </p>
              </blockquote>

              {/* Statement of Facts */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Statement of Facts
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                On March 12, 2011, Eugene Ndhlovu attended a party hosted by Ms. RD. Over the course of the evening, Mr. Ndhlovu, Ms. RD, and their mutual friend Ms. CB consumed alcohol together. Both Ms. RD and Ms. CB reported multiple incidents of non-consensual sexual touching by Mr. Ndhlovu. Early the next morning, Ms. RD awoke to find Mr. Ndhlovu sexually assaulting her.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                In 2015, Mr. Ndhlovu pled guilty to two counts of sexual assault. The trial judge sentenced him to six months imprisonment followed by three years of probation, concluding he was unlikely to reoffend. Under sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em>, Mr. Ndhlovu was subject to mandatory lifetime registration on the national sex offender registry.
              </p>

              {/* Issues */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Issues
              </h2>

              <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <li>Do sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em> breach section 7 of the <em>Charter</em>?</li>
                <li>If so, are the breaches justified under section 1 of the <em>Charter</em>?</li>
                <li>If not justified, what is the appropriate remedy?</li>
              </ol>

              {/* Argument */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Argument
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Part I:</strong> The SCC erred in finding that sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em> violate Section 7 of the <em>Charter</em>. While mandatory SOIRA orders engage section 7 by interfering with an offender's liberty, this deprivation is consistent with principles of fundamental justice.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Part II:</strong> The provisions are not arbitrary. There is a clear rational connection between being convicted of a designated sexual offence and being included on the National Registry. The purpose of SOIRA—investigating and preventing sexual crimes—is directly served by maintaining accurate information about convicted offenders.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Part III:</strong> The provisions are not grossly disproportionate. The reporting requirements are minimal, do not prohibit activities or restrain travel, and information is subject to strict confidentiality rules. Any stigma experienced by offenders stems from their convictions, not from registration requirements.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Part IV:</strong> Parliament embedded proportionality into the legislation by linking the duration of SOIRA orders to the maximum term of imprisonment for each offence. Termination orders are available for offenders who can demonstrate truly disproportionate impact on their privacy or liberty.
              </p>
            </div>

            {/* Download */}
            <div className="pt-8 border-t" style={{ borderColor: `${colors.olive}20` }}>
              <a
                href="/papers/appellant-factum.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Download Full Factum
              </a>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="py-10 px-8" style={{ backgroundColor: colors.nearBlack }}>
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <p className="font-serif-display text-lg font-light" style={{ color: colors.cream }}>Melisa Onder</p>
            <Link href="/" className="text-sm font-light hover:opacity-100 transition-opacity" style={{ color: colors.cream, opacity: 0.6 }}>
              Back to Home
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
