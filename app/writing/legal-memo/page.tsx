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

export default function LegalMemoPage() {
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
                Legal Memorandum
              </p>
              <h1 className="font-serif-display text-4xl md:text-5xl font-light leading-tight mb-6">
                <em>R v. Ndhlovu</em>
              </h1>
              <div className="flex items-center gap-4 text-sm font-light" style={{ color: colors.olive }}>
                <span>PO209: Legal Writing</span>
                <span style={{ color: colors.warmBrown }}>|</span>
                <span>December 2024</span>
              </div>
            </header>

            {/* Content */}
            <div className="py-12 space-y-8">
              {/* Memo header */}
              <div className="p-6" style={{ backgroundColor: colors.creamAlt }}>
                <p className="text-sm font-light mb-2"><strong>To:</strong> WLU LLP, Wilma Willwe, Senior Partner</p>
                <p className="text-sm font-light mb-2"><strong>From:</strong> Melisa Onder</p>
                <p className="text-sm font-light"><strong>RE:</strong> Memorandum of Law</p>
              </div>

              {/* Overview */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Overview
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                This legal memorandum analyzes the errors of law in the Supreme Court of Canada's decision in <em>R v. Ndhlovu</em>. This criminal law case examines the constitutionality of mandatory <em>Sex Offender Information Registration Act</em> (SOIRA) orders for those convicted of designated offences. The provisions are outlined in sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em>.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                This legislation was challenged as violating section 7 of the <em>Canadian Charter of Rights and Freedoms</em>, which outlines the right to life, liberty, and security of the person, as well as section 12, which protects the right not to be subjected to cruel and unusual treatment or punishment.
              </p>

              {/* Pull quote */}
              <blockquote className="py-6 px-8 my-8 border-l-2" style={{ borderColor: colors.olive, backgroundColor: colors.creamAlt }}>
                <p className="font-serif-display text-xl italic leading-relaxed" style={{ color: colors.nearBlack }}>
                  This analysis shows that the Crown has grounds for appeal based on a failure to properly apply relevant precedents, including <em>R v. Redhead</em>, <em>R v. Long</em>, and <em>R v. Dyck</em>.
                </p>
              </blockquote>

              {/* Facts */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Facts
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                In 2015, Mr. Ndhlovu pled guilty to two counts of sexual assault which had occurred at a party on March 12th, 2011. At the time of the incidents, Mr. Ndhlovu was 19 years old. During sentencing, the trial judge considered the circumstances of the offence, Mr. Ndhlovu's apparent remorse, and his lack of criminal history. Based on these factors, Mr. Ndhlovu received a sentence of six months imprisonment followed by three years of probation, with the judge concluding that he was unlikely to reoffend.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Section 490.012 of the <em>Criminal Code</em> states that SOIRA orders are mandatory for offenders convicted of designated offences including sexual assault, while section 490.013(2.1) mandates lifetime registration for individuals convicted of more than one designated offence. Based on this legislation, Mr. Ndhlovu was subject to mandatory lifetime registration without room for judicial discretion.
              </p>

              {/* Procedural History */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Procedural History
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <em>R v. Ndhlovu</em> began at the Court of King's Bench of Alberta, then proceeded to the Court of Appeal of Alberta, and was ultimately adjudicated by the SCC in 2022. The trial judge determined that Section 490.012 unjustifiably infringes section 7 of the Charter based on her finding that mandatory SOIRA orders deprive offenders of their liberty contrary to principles of fundamental justice.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                In 2020, the Court of Appeal found that the sentencing judge erred and that sections 490.012 and 490.013(2.1) were constitutionally valid. Finally, the SCC ruled that these sections infringe section 7 of the Charter and cannot be saved by section 1, declaring the provisions of no force or effect.
              </p>

              {/* Issue */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Issue
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                The core issue on appeal is whether the SCC erred in its determination that sections 490.012 and 490.013(2.1) of the <em>Criminal Code</em> violate Section 7 of the Charter and are thus unconstitutional. The provisions, both in general and in their application to Mr. Ndhlovu's case, are neither arbitrary, overbroad nor grossly disproportionate.
              </p>

              {/* Analysis */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Analysis
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Arbitrariness:</strong> Mandatory SOIRA orders are not arbitrary. There is a clear rational connection between being convicted of a designated sexual offence and being included on the National Registry. Having accurate and up-to-date information about persons more likely to commit sexual offences is directly connected to SOIRA's purpose of investigating and preventing sexual crimes.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                <strong>Gross Disproportionality:</strong> While the registration and reporting requirements under SOIRA impose a burden on offenders, these requirements are not so burdensome that they can be disconnected from the legislation's purpose. The burdens are minimal and reasonable compared to the significant objective of protecting society from recidivist sexual offenders. Access to the Registry is controlled and confidential, with information strictly limited to police use.
              </p>
            </div>

            {/* Download */}
            <div className="pt-8 border-t" style={{ borderColor: `${colors.olive}20` }}>
              <a
                href="/papers/legal-memo.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Download Full Memorandum
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
