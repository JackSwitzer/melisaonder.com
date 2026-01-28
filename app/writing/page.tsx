import React from 'react';
import Link from 'next/link';

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

const papers = [
  {
    slug: 'appellant-factum',
    title: 'Appellant Factum: R v. Ndhlovu',
    course: 'PO209 - Legal Writing',
    date: 'December 2024',
    description: 'Formal legal argument challenging the SCC\'s ruling on mandatory SOIRA registration. Structured appellate brief with statement of facts, issues, and legal argument citing precedent cases.',
    color: 'plum',
  },
  {
    slug: 'legal-memo',
    title: 'Legal Memorandum: R v. Ndhlovu',
    course: 'PO209 - Legal Writing',
    date: 'December 2024',
    description: 'Constitutional analysis of mandatory sex offender registration under SOIRA, examining whether sections 490.012 and 490.013(2.1) of the Criminal Code violate Section 7 of the Charter.',
    color: 'pink-accent',
  },
  {
    slug: 'op-ed',
    title: 'The Hidden Story Behind Our Food',
    course: 'PO316 - Op-Ed',
    date: '2024',
    description: 'Opinion piece examining the environmental toll of factory farming in Canada, proposing policy measures including subsidy redirection, environmental regulations, and green label certification programs.',
    color: 'olive-green',
  },
  {
    slug: 'policy-briefing',
    title: 'Policy Briefing: Child Marriage in India',
    course: 'PO220 - Poverty & Inequality in the Global South',
    date: 'October 2023',
    description: 'Policy analysis addressing the socio-economic, psychological, and health consequences of child marriages in India, with recommendations for culturally-sensitive policy measures.',
    color: 'pink-accent',
  },
];

const colorClasses: Record<string, { border: string; hover: string }> = {
  'plum': { border: 'border-plum', hover: 'group-hover:text-plum' },
  'pink-accent': { border: 'border-pink-accent', hover: 'group-hover:text-pink-accent' },
  'olive-green': { border: 'border-olive-green', hover: 'group-hover:text-olive-green' },
};

export default function WritingIndexPage() {
  return (
    <main className="min-h-screen bg-beige-pink">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-beige-pink/95 backdrop-blur-sm z-50 border-b border-pink-accent/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl text-deep-brown tracking-wide">
            Melisa Onder
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="text-deep-brown hover:text-pink-accent transition-colors text-sm tracking-wide">
              About
            </Link>
            <Link href="/#education" className="text-deep-brown hover:text-pink-accent transition-colors text-sm tracking-wide">
              Education
            </Link>
            <Link href="/#experience" className="text-deep-brown hover:text-pink-accent transition-colors text-sm tracking-wide">
              Experience
            </Link>
            <Link href="/writing" className="text-pink-accent text-sm tracking-wide font-medium">
              Writing
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-deep-brown/70 hover:text-deep-brown transition-colors mb-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 rotate-180">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Back to Home</span>
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl text-deep-brown mb-4 tracking-wide">
            Selected Writing
          </h1>
          <p className="text-deep-brown/70 max-w-2xl leading-relaxed">
            A collection of legal writing, policy analysis, and opinion pieces from my studies in Political Science with a Legal Studies Specialization at Wilfrid Laurier University.
          </p>
        </div>
      </section>

      {/* Papers List */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            {papers.map((paper) => {
              const colors = colorClasses[paper.color];
              return (
                <Link
                  key={paper.slug}
                  href={`/writing/${paper.slug}`}
                  className={`group block bg-warm-white p-6 rounded-lg border-l-4 ${colors.border} hover:shadow-lg transition-all`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className={`font-serif text-xl text-deep-brown mb-2 ${colors.hover} transition-colors`}>
                        {paper.title}
                      </h2>
                      <p className="text-olive-green text-sm mb-2">
                        {paper.course} | {paper.date}
                      </p>
                      <p className="text-deep-brown/70 text-sm">
                        {paper.description}
                      </p>
                    </div>
                    <div className="ml-4 p-2 text-deep-brown/40 group-hover:text-deep-brown transition-colors">
                      <ArrowRightIcon />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-deep-brown text-ivory">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm">
            Melisa Onder
          </p>
          <Link href="/" className="text-ivory/70 hover:text-ivory transition-colors text-sm">
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
