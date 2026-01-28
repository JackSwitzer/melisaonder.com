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

export default function PolicyBriefingPage() {
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
                Policy Briefing
              </p>
              <h1 className="font-serif-display text-4xl md:text-5xl font-light leading-tight mb-6">
                Child Marriage in India
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-light" style={{ color: colors.olive }}>
                <span>PO220: Poverty & Inequality in the Global South</span>
                <span style={{ color: colors.warmBrown }}>|</span>
                <span>October 2023</span>
              </div>
              <p className="text-sm font-light mt-2" style={{ opacity: 0.6 }}>
                Co-authored with Fatmanur Delioglu
              </p>
            </header>

            {/* Content */}
            <div className="py-12 space-y-8">
              {/* Lead paragraph */}
              <p className="font-serif-display text-xl md:text-2xl leading-relaxed" style={{ color: colors.nearBlack }}>
                Every year child marriage strips away the childhoods of over 12 million girls, and India is home to the largest number of child brides in the world.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                When assessing this problem, there are several causal factors and ameliorative components that must be considered before implementing new policies. This paper explores the socio-economic, psychological, and health consequences of child marriages on women in India, and what policy measures can be implemented to eliminate this practice while considering cultural sensitivities.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                This paper is addressed to Priyank Kanoongo, the chairman of the National Commission for Protection of Child Rights (NCPCR). This is the apex body for protecting the rights of children in India as it performs many direct functions to eliminate this practice.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Cultural and Historical Context
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Child marriage is encouraged in many parts of India due to cultural traditions rooted in patriarchal ideologies which dictate gender-discriminatory norms. Historically, religious beliefs and interpretations have been used in certain communities to justify child marriage. This goes hand in hand with the caste system, which is over 3000 years old and also played a part in perpetuating child marriage.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Though it was banned in India's constitution in the 1950s, the caste system divided Hindus into firm hierarchical groups based on their work (karma) and their religion or duty (dharma). Often marriages were used to preserve or even elevate the social status of families, leading to pressure to arrange marriages—including child marriages—within one's own caste.
              </p>

              {/* Pull quote */}
              <blockquote className="py-6 px-8 my-8 border-l-2" style={{ borderColor: colors.olive, backgroundColor: colors.creamAlt }}>
                <p className="font-serif-display text-xl italic leading-relaxed" style={{ color: colors.nearBlack }}>
                  Child marriage is considered the most severe form of child abuse as it has extensive socio-economic, psychological, and health consequences.
                </p>
              </blockquote>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Consequences of Child Marriage
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Early marriage reinforces pre-existing gender inequality because it forces women to miss out on education and career opportunities. This perpetuates cycles of poverty as it often results in child brides being economically dependent on their husbands or families. Child marriage is also associated with numerous psychological conditions such as depression, anxiety, and suicidal ideation. In addition, maternal mortality is much higher among women who marry and conceive early.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                A significant portion of child marriages occur in India, where approximately 47% of all unions involve a child bride. As a result, many policies have been developed over time in an attempt to reduce this number.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Policy Framework
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                India is a signatory to numerous UN human rights conventions, including the Convention on Consent to Marriage, Minimum Age for Marriage, and Registration of Marriages in 1962. The Child Marriage Restraint or "Sarda" Act of 1929 was the first legislation to impose a minimum age on marriage, making it illegal for girls under the age of 14 to get married.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                The Prohibition of Child Marriage Act, 2006 made child marriage a punishable offence and closed loopholes allowing it. Based on this policy, it is illegal for girls under 18 and boys under 21 years of age to get married. The act calls for the implementation of a Child Marriage Prohibition Officer, who must ensure no child marriage takes place in their given jurisdiction.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Progress and Challenges
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Progress has been made in reducing this issue, as the rate of child marriage has declined by 30% in the past 25 years. This advancement is closely associated with transitions of households to an improved standard of living, a decrease in average household size, and an improvement in girls' education.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                However, the negative economic impact of the COVID-19 pandemic could reverse some of this progress. When implementing or modifying policies, key considerations include the underreporting of child marriages in census data and regard for cultural sensitivities—many local populations do not understand why child marriage is a crime, as it is intrinsic to their religious and cultural values.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Recommendations
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                For families, the fear of facing shame due to breaking cultural norms is greater than that of punishment, therefore enforcement must come with community engagement. Utilizing media platforms like radio and TV, along with educating government employees such as teachers and social workers, can significantly influence the views of the public including families of potential victims.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Overall, tackling the deeply rooted issue of child marriage is bound to pose complex challenges. However, assessing child marriage from the perspective of victims and their communities can allow for the formation of policies that will create real progress while still keeping cultural sensitivities in mind.
              </p>
            </div>

            {/* Download */}
            <div className="pt-8 border-t" style={{ borderColor: `${colors.olive}20` }}>
              <a
                href="/papers/policy-briefing-child-marriage.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Download Full PDF
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
