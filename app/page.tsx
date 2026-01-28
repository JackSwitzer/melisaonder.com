'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

const ArrowUpRight = ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} style={style}>
    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.772 13.019H3.565V9h3.544v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const experiences = [
  {
    title: "Marketing Assistant & Business Developer",
    company: "Fittz Commercial Interiors",
    period: "Sept 2023 - Aug 2025",
    description: "Designed promotional marketing materials and coordinated company events. Managed social media presence to enhance brand engagement.",
  },
  {
    title: "Social Media & Events Executive",
    company: "CSA WLU",
    period: "Sept 2024 - Present",
    description: "Events Executive handling venue selection and budget management. Social Media Executive creating content and managing platform presence.",
  },
  {
    title: "Customer Care Representative",
    company: "Arctic Glacier",
    period: "May 2021 - Aug 2023",
    description: "Managed bilingual (French/English) customer support. Utilized CRM software for account management and case resolution.",
  },
];

const writingSamples = [
  { title: 'Appellant Factum: R v. Ndhlovu', type: 'Legal Writing' },
  { title: 'Legal Memorandum: R v. Ndhlovu', type: 'Legal Writing' },
  { title: 'The Hidden Story Behind Our Food', type: 'Op-Ed' },
  { title: 'Child Marriage in India', type: 'Policy Briefing' },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Franklin:wght@200;300;400;500&display=swap');
        .font-serif-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-light { font-family: 'Libre Franklin', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${colors.softPink}; color: ${colors.nearBlack}; }
      `}</style>

      <main className="min-h-screen font-sans-light antialiased" style={{ backgroundColor: colors.cream, color: colors.nearBlack }}>
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}
          style={{
            backgroundColor: scrolled ? `${colors.cream}f0` : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
          }}
        >
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-serif-display text-2xl tracking-wide hover:opacity-60 transition-opacity">
                Melisa Onder
              </Link>
              <div className="hidden md:flex items-center gap-10">
                {['About', 'Education', 'Experience', 'Writing'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-light hover:opacity-60 transition-opacity"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <Link
                href="mailto:melisaonder09@gmail.com"
                className="flex items-center gap-2 text-sm font-light hover:opacity-60 transition-opacity"
                style={{ color: colors.olive }}
              >
                <MailIcon />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-24 pb-16 px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <div className="order-2 lg:order-1">
                <p className="text-sm tracking-[0.25em] uppercase mb-6 font-light" style={{ color: colors.olive }}>
                  Political Science & Legal Studies
                </p>

                <h1 className="mb-8">
                  <span className="font-serif-display text-6xl md:text-7xl font-light block" style={{ color: colors.nearBlack }}>
                    Melisa
                  </span>
                  <span className="font-serif-display text-6xl md:text-7xl italic font-light block" style={{ color: colors.olive }}>
                    Onder
                  </span>
                </h1>

                <p className="mb-4">
                  <Link
                    href="https://www.wlu.ca/programs/arts/undergraduate/law-and-society-ba/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base font-light hover:opacity-70 transition-opacity group"
                    style={{ color: colors.plum }}
                  >
                    Wilfrid Laurier University
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </p>

                <p className="text-lg leading-relaxed font-light mb-10" style={{ opacity: 0.75 }}>
                  Final-year BA Political Science, Legal Studies Specialization.
                  Preparing for LSAT. Trilingual: English, French, Turkish.
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    href="mailto:melisaonder09@gmail.com"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: colors.olive, color: colors.cream }}
                  >
                    <MailIcon />
                    Email
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                    style={{ border: `1px solid ${colors.olive}`, color: colors.olive }}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </Link>
                </div>
              </div>

              {/* Right - Profile Image */}
              <div className="order-1 lg:order-2">
                <div className="max-w-sm mx-auto lg:ml-auto lg:mr-0">
                  <div className="aspect-[3/4] overflow-hidden" style={{ boxShadow: `0 8px 40px ${colors.nearBlack}15` }}>
                    <Image
                      src="/profile.jpeg"
                      alt="Melisa Onder"
                      width={400}
                      height={533}
                      className="object-cover object-top w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.softPink }}>01</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>About</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="font-serif-display text-2xl font-light leading-relaxed mb-6" style={{ color: colors.nearBlack }}>
                  I am a detail-oriented professional with experience in project management, event coordination, and client relations.
                </p>
                <p className="text-base leading-relaxed font-light mb-10" style={{ opacity: 0.7 }}>
                  My background spans marketing, customer service, and hospitality, where I have consistently demonstrated adaptability in fast-paced environments. With professional experience in CRM software, content creation, and remote work, I bring a blend of technical proficiency and interpersonal skills to every role.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['English', 'French', 'Turkish'].map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 text-sm font-light"
                      style={{ backgroundColor: colors.softPink + '40', color: colors.nearBlack }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.olive }}>02</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>Education</h2>
              </div>
              <div className="lg:col-span-8">
                <div className="p-8" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <Link
                        href="https://www.wlu.ca/programs/arts/undergraduate/law-and-society-ba/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h3 className="font-serif-display text-2xl font-light mb-2 inline-flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: colors.plum }}>
                          Wilfrid Laurier University
                          <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h3>
                      </Link>
                      <p className="text-lg font-light" style={{ color: colors.nearBlack }}>Bachelor of Arts in Political Science</p>
                      <p className="font-serif-display italic text-lg" style={{ color: colors.olive }}>Legal Studies Specialization</p>
                    </div>
                    <p className="text-sm font-light" style={{ color: colors.warmBrown }}>Sept 2022 - April 2026</p>
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ opacity: 0.7 }}>
                    Currently preparing for the LSAT. Coursework includes legal writing, constitutional law, poverty & inequality policy, and political theory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.warmBrown }}>03</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>Experience</h2>
              </div>
            </div>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8"
                  style={{ backgroundColor: colors.creamAlt }}
                >
                  <div className="lg:col-span-4">
                    <p className="text-sm font-light mb-1" style={{ color: colors.warmBrown }}>{exp.period}</p>
                    <p className="text-sm font-light" style={{ opacity: 0.6 }}>{exp.company}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="font-serif-display text-xl font-light mb-3" style={{ color: colors.nearBlack }}>{exp.title}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ opacity: 0.7 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-24 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.olive }}>04</p>
                <h2 className="font-serif-display text-4xl font-light mb-6" style={{ color: colors.nearBlack }}>Writing</h2>
                <p className="text-base leading-relaxed font-light mb-6" style={{ opacity: 0.7 }}>
                  Selected academic writing samples demonstrating analytical and research capabilities.
                </p>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-2 text-sm font-light hover:gap-3 transition-all group"
                  style={{ color: colors.olive }}
                >
                  View All Writing
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-3">
                  {writingSamples.map((sample, index) => (
                    <Link
                      key={index}
                      href="/writing"
                      className="group block p-5 transition-colors"
                      style={{ backgroundColor: colors.creamAlt }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif-display text-lg font-light mb-1" style={{ color: colors.nearBlack }}>{sample.title}</h4>
                          <p className="text-sm font-light" style={{ color: colors.warmBrown }}>{sample.type}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.olive }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-8" style={{ backgroundColor: colors.nearBlack }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-serif-display text-xl font-light" style={{ color: colors.cream }}>Melisa Onder</p>
                <p className="text-sm font-light" style={{ color: colors.cream, opacity: 0.5 }}>Political Science & Legal Studies</p>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  style={{ color: colors.cream }}
                >
                  <LinkedInIcon />
                </Link>
                <Link href="mailto:melisaonder09@gmail.com" className="hover:opacity-60 transition-opacity" style={{ color: colors.cream }}>
                  <MailIcon />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
