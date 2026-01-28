import React from 'react';
import Link from 'next/link';

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 rotate-180">
    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
  </svg>
);

export default function OpEdPage() {
  return (
    <main className="min-h-screen bg-beige-pink flex flex-col">
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
      <section className="pt-32 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-deep-brown/70 hover:text-deep-brown transition-colors mb-6"
          >
            <BackIcon />
            <span className="text-sm">Back to Writing</span>
          </Link>

          <div className="bg-warm-white p-6 md:p-8 rounded-lg border-l-4 border-olive-green">
            <h1 className="font-serif text-2xl md:text-3xl text-deep-brown mb-3 tracking-wide">
              The Hidden Story Behind Our Food
            </h1>
            <div className="flex flex-wrap gap-4 text-sm mb-4">
              <span className="text-olive-green font-medium">PO316 - Op-Ed</span>
              <span className="text-deep-brown/50">|</span>
              <span className="text-deep-brown/70">2024</span>
            </div>
            <p className="text-deep-brown/70 leading-relaxed mb-6">
              Opinion piece examining the environmental toll of factory farming in Canada, proposing policy measures including subsidy redirection, environmental regulations, and green label certification programs.
            </p>
            <a
              href="/papers/op-ed-factory-farming.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-olive-green text-white rounded-md hover:bg-olive-green/80 transition-colors"
            >
              <DownloadIcon />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="flex-1 px-6 pb-8">
        <div className="max-w-5xl mx-auto h-full">
          <div className="bg-warm-white rounded-lg overflow-hidden shadow-lg h-[70vh] min-h-[500px]">
            <iframe
              src="/papers/op-ed-factory-farming.pdf"
              className="w-full h-full border-0"
              title="The Hidden Story Behind Our Food - Op-Ed"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-deep-brown text-ivory mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm">
            Melisa Onder
          </p>
          <Link href="/writing" className="text-ivory/70 hover:text-ivory transition-colors text-sm">
            Back to Writing
          </Link>
        </div>
      </footer>
    </main>
  );
}
