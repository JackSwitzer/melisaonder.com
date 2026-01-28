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

export default function OpEdPage() {
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
                Op-Ed
              </p>
              <h1 className="font-serif-display text-4xl md:text-5xl font-light leading-tight mb-6">
                The Hidden Story Behind Our Food
              </h1>
              <div className="flex items-center gap-4 text-sm font-light" style={{ color: colors.olive }}>
                <span>PO316</span>
                <span style={{ color: colors.warmBrown }}>|</span>
                <span>2024</span>
              </div>
            </header>

            {/* Content */}
            <div className="py-12 space-y-8">
              {/* Lead paragraph */}
              <p className="font-serif-display text-xl md:text-2xl leading-relaxed" style={{ color: colors.nearBlack }}>
                When we savor a juicy steak, unwrap a delicious burger, or take that first crispy bite of a chicken nugget, we rarely stop to ask ourselves: Where does our food actually come from?
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                When thinking of the farms that produce our meat products, we might envision animals grazing freely on grassy green fields. The truth is far darker; most of our meat comes from factory farms, where animals are raised in overcrowded industrial facilities that prioritize profit over environmental sustainability. Despite this, more than half of Canadians believe farming practices here are environmentally responsible—and that is exactly what large-scale factory farms want you to believe. But as the environmental consequences of factory farming mount, it's time to face the truth behind our food. The time to demand change for the health of our planet is now.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                The Environmental Toll of Factory Farming
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Factory farming isn't just a system of food production; it's an environmental disaster. Growing animal feed crops releases carbon dioxide through the use of chemical fertilizers, while farm operations like heating and machinery add even more carbon emissions. Additionally, vast expanses of forests are cleared to grow feed crops, contributing to deforestation and biodiversity loss, while producing beef or cow milk consumes significantly more water than growing plant-based alternatives.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Plus, methane emissions from animal agriculture account for almost half of the world's methane output. In fact, cutting the methane emissions from factory farming is identified as the quickest route to slowing global warming. Canada's agricultural sector has seen the steepest rise in emissions outside the oil and gas sector, making it impossible to meet our national climate goals.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Why Change Has Stalled
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                This all raises the question: How have we allowed the factory farming industry to wreak such havoc on the environment? In part, it boils down to money—corporations prioritize profits while consumers prioritize affordability. The factory farming industry also benefits from government subsidies and a lack of policies enforcing environmental accountability in this sector.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                The political influence of the powerful agribusiness lobby also plays a part in the current inefficiencies in government policies, pushing the Canadian government to prioritize industry interests over environmental concerns. To make matters worse, the Canadian demand for retail beef is currently the highest it has been in over 30 years. Consumers remain largely unaware of the true environmental costs of their food choices.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                A Strategy for Change
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                So, what can we do about it? The answer lies in tackling the issue from multiple angles: economically, politically, and socially. First, let's talk money. Government subsidies funding an industry that is destroying our planet need to go. These funds, adding up to billions of dollars annually, can be redirected to support sustainable farms and the production of plant-based proteins.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Next, the government needs to implement enforceable environmental regulations. Factory farms must be required to cap their greenhouse gas emissions and report transparently on their use of resources like water and fertilizer. These reports would highlight the comparative environmental benefits of sustainably produced meat and dairy products alongside plant-based proteins.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Finally, it's time to equip consumers with the tools to make informed choices. A green label certification program for sustainable meat and dairy products would make it simple to spot eco-friendly food options on store shelves. Promoting plant-based alternatives in grocery stores through prominent placement and marketing can further encourage consumers to incorporate these foods into their diets.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                Why This Strategy Will Succeed
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                These changes aren't just wishful thinking—they're practical, achievable steps that address all the major economic, social, and political roadblocks. Redirecting subsidies will give sustainable farms a chance to compete with factory farms, reducing the financial edge that enables factory farms to keep their products priced so cheaply.
              </p>

              {/* Pull quote */}
              <blockquote className="py-6 px-8 my-8 border-l-2" style={{ borderColor: colors.olive, backgroundColor: colors.creamAlt }}>
                <p className="font-serif-display text-xl italic leading-relaxed" style={{ color: colors.nearBlack }}>
                  The livestock industry contributes around $24 billion annually to Canada's GDP and generates around 347,000 jobs. But we're already paying the price for factory farming, just not at the checkout counter.
                </p>
              </blockquote>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Some might argue that these measures could ramp up food prices or hurt the economy, and that's a fair concern. But here's the thing: we're already paying the price for factory farming, just not at the checkout counter. Climate change, air pollution, and biodiversity loss are all rapidly accelerating due to factory farming's unchecked emissions and resource use.
              </p>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                Besides, transitioning to sustainable farming will create new job opportunities and economic growth in this sector. Support for new industry players outside of factory farms will diversify Canada's agriculture sector and reduce our economic dependency on resource-intensive food production methods.
              </p>

              {/* Section */}
              <h2 className="font-serif-display text-2xl md:text-3xl font-light pt-8" style={{ color: colors.nearBlack }}>
                The Path Forward
              </h2>

              <p className="text-base leading-relaxed font-light" style={{ opacity: 0.8 }}>
                The environmental consequences of factory farming are too urgent to ignore. The next time you savor a breakfast of eggs and bacon, take a second to think about the story behind what's on your plate—a story of forests torn down, greenhouse gases emitted, and ecosystems destroyed. It's time to rewrite this story, hold factory farms accountable, and demand a food system that prioritizes sustainability over profit—because the future of our planet depends on it.
              </p>

              {/* Footer note */}
              <p className="text-sm font-light italic pt-8" style={{ opacity: 0.5 }}>
                AI was used to polish this essay.
              </p>
            </div>

            {/* Download */}
            <div className="pt-8 border-t" style={{ borderColor: `${colors.olive}20` }}>
              <a
                href="/papers/op-ed-factory-farming.pdf"
                download
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.olive, color: colors.cream }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Download PDF
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
