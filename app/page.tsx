'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Color palette constants
const colors = {
  olive: '#5C6B4A',
  softPink: '#E8C4C4',
  softPinkAlt: '#D4A5A5',
  plum: '#6B4C7A',
  warmBrown: '#C9A67A',
  warmBrownAlt: '#B8956C',
  nearBlack: '#1C1917',
  nearBlackAlt: '#292524',
  cream: '#FAF7F2',
  creamAlt: '#F5F0E8',
};

// Icons
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

// Experience data
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

// Writing samples
const writingSamples = [
  { title: 'Appellant Factum: R v. Ndhlovu', type: 'Legal Writing' },
  { title: 'Legal Memorandum: R v. Ndhlovu', type: 'Legal Writing' },
  { title: 'The Hidden Story Behind Our Food', type: 'Op-Ed' },
  { title: 'Child Marriage in India', type: 'Policy Briefing' },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Libre+Franklin:wght@200;300;400;500&display=swap');

        .font-serif-display {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .font-sans-light {
          font-family: 'Libre Franklin', system-ui, sans-serif;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Selection */
        ::selection {
          background: ${colors.softPink};
          color: ${colors.nearBlack};
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${colors.cream};
        }
        ::-webkit-scrollbar-thumb {
          background: ${colors.olive};
          border-radius: 3px;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-line-expand {
          animation: lineExpand 1s ease-out forwards;
          transform-origin: left;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }
      `}</style>

      <main
        className="min-h-screen font-sans-light antialiased"
        style={{ backgroundColor: colors.cream, color: colors.nearBlack }}
      >
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}
          style={{
            backgroundColor: scrolled ? `${colors.cream}f0` : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? `1px solid ${colors.olive}20` : 'none'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="font-serif-display text-2xl tracking-wide transition-opacity duration-300 hover:opacity-60"
                style={{ color: colors.nearBlack }}
              >
                Melisa Onder
              </Link>
              <div className="hidden md:flex items-center gap-12">
                {['About', 'Education', 'Experience', 'Writing', 'Portfolio'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm tracking-wide font-light transition-all duration-300 hover:opacity-60"
                    style={{ color: colors.nearBlack }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <Link
                href="mailto:melisaonder09@gmail.com"
                className="text-sm tracking-wide font-light transition-all duration-300 hover:opacity-60 flex items-center gap-2"
                style={{ color: colors.olive }}
              >
                <span className="hidden sm:inline">Contact</span>
                <MailIcon />
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen relative flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            {/* Subtle decorative elements */}
            <div
              className="absolute top-1/4 right-0 w-px h-48 animate-line-expand delay-4"
              style={{ backgroundColor: colors.olive }}
            />
            <div
              className="absolute bottom-1/4 left-20 w-32 h-px animate-line-expand delay-5"
              style={{ backgroundColor: colors.warmBrown }}
            />
          </div>

          <div className="relative z-10 w-full pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                {/* Left content */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="max-w-xl">
                    {/* Tagline */}
                    <p
                      className="text-sm tracking-[0.3em] uppercase mb-8 animate-fade-in delay-1 font-light"
                      style={{ color: colors.olive }}
                    >
                      Political Science & Legal Studies
                    </p>

                    {/* Name */}
                    <h1 className="mb-6 animate-fade-in delay-2">
                      <span
                        className="font-serif-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight block"
                        style={{ color: colors.nearBlack }}
                      >
                        Melisa
                      </span>
                      <span
                        className="font-serif-display text-6xl md:text-7xl lg:text-8xl italic font-light tracking-tight block"
                        style={{ color: colors.olive }}
                      >
                        Onder
                      </span>
                    </h1>

                    {/* Divider */}
                    <div
                      className="w-16 h-px mb-8 animate-line-expand delay-3"
                      style={{ backgroundColor: colors.warmBrown }}
                    />

                    {/* University Link - PLUM color only here */}
                    <p className="mb-6 animate-fade-in delay-3">
                      <Link
                        href="https://www.wlu.ca/programs/arts/undergraduate/law-and-society-ba/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base font-light tracking-wide transition-all duration-300 hover:gap-3 group"
                        style={{ color: colors.plum }}
                      >
                        Wilfrid Laurier University
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </p>

                    {/* Bio */}
                    <p
                      className="text-lg leading-relaxed font-light mb-10 animate-fade-in delay-4"
                      style={{ color: colors.nearBlackAlt, opacity: 0.8 }}
                    >
                      Final-year BA Political Science, Legal Studies Specialization.
                      Preparing for LSAT. Trilingual: English, French, Turkish.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 animate-fade-in delay-5">
                      <Link
                        href="mailto:melisaonder09@gmail.com"
                        className="flex items-center gap-3 px-6 py-3 text-sm tracking-wide font-light transition-all duration-300 hover:gap-4"
                        style={{
                          backgroundColor: colors.olive,
                          color: colors.cream,
                        }}
                      >
                        <MailIcon />
                        Email
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 text-sm tracking-wide font-light transition-all duration-300 hover:gap-4"
                        style={{
                          border: `1px solid ${colors.olive}`,
                          color: colors.olive,
                        }}
                      >
                        <LinkedInIcon />
                        LinkedIn
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right - Profile Image */}
                <div className="lg:col-span-5 order-1 lg:order-2 animate-fade-in delay-2">
                  <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
                    {/* Frame accent */}
                    <div
                      className="absolute -top-4 -right-4 w-full h-full"
                      style={{ border: `1px solid ${colors.olive}40` }}
                    />

                    {/* Warm accent corner */}
                    <div
                      className="absolute -bottom-4 -left-4 w-24 h-24"
                      style={{ backgroundColor: colors.softPink, opacity: 0.4 }}
                    />

                    {/* Main image container */}
                    <div
                      className="relative aspect-[3/4] overflow-hidden"
                      style={{
                        boxShadow: `20px 20px 60px ${colors.nearBlack}10`,
                      }}
                    >
                      <Image
                        src="/profile.jpeg"
                        alt="Melisa Onder"
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {/* Subtle overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${colors.nearBlack}10 0%, transparent 30%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span
              className="text-xs tracking-[0.2em] uppercase font-light"
              style={{ color: colors.olive }}
            >
              Scroll
            </span>
            <div
              className="w-px h-12"
              style={{ backgroundColor: colors.olive }}
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.creamAlt }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left - Section Label */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  01
                </p>
                <h2
                  className="font-serif-display text-4xl lg:text-5xl font-light"
                  style={{ color: colors.nearBlack }}
                >
                  About
                </h2>
                <div
                  className="w-12 h-px mt-6"
                  style={{ backgroundColor: colors.olive }}
                />
              </div>

              {/* Right - Content */}
              <div className="lg:col-span-9 lg:pl-12">
                <p
                  className="font-serif-display text-2xl lg:text-3xl font-light leading-relaxed mb-8"
                  style={{ color: colors.nearBlack }}
                >
                  I am a detail-oriented professional with experience in project management,
                  event coordination, and client relations.
                </p>
                <p
                  className="text-base leading-relaxed font-light mb-12"
                  style={{ color: colors.nearBlackAlt, opacity: 0.75 }}
                >
                  My background spans marketing, customer service, and hospitality, where I have
                  consistently demonstrated adaptability in fast-paced environments. With professional
                  experience in CRM software, content creation, and remote work, I bring a blend of
                  technical proficiency and interpersonal skills to every role. I am passionate about
                  law, policy, and making meaningful impact.
                </p>

                {/* Languages */}
                <div
                  className="pt-8"
                  style={{ borderTop: `1px solid ${colors.olive}20` }}
                >
                  <p
                    className="text-xs tracking-[0.3em] uppercase font-light mb-6"
                    style={{ color: colors.warmBrown }}
                  >
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {['English', 'French', 'Turkish'].map((lang) => (
                      <span
                        key={lang}
                        className="px-5 py-2 text-sm font-light tracking-wide"
                        style={{
                          border: `1px solid ${colors.olive}40`,
                          color: colors.nearBlack
                        }}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left - Section Label */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  02
                </p>
                <h2
                  className="font-serif-display text-4xl lg:text-5xl font-light"
                  style={{ color: colors.nearBlack }}
                >
                  Education
                </h2>
                <div
                  className="w-12 h-px mt-6"
                  style={{ backgroundColor: colors.olive }}
                />
              </div>

              {/* Right - Content */}
              <div className="lg:col-span-9 lg:pl-12">
                <div
                  className="p-8 lg:p-12"
                  style={{
                    backgroundColor: colors.creamAlt,
                    border: `1px solid ${colors.olive}15`
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div>
                      {/* University name - PLUM color only here */}
                      <Link
                        href="https://www.wlu.ca/programs/arts/undergraduate/law-and-society-ba/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h3
                          className="font-serif-display text-2xl lg:text-3xl font-light mb-3 inline-flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-70"
                          style={{ color: colors.plum }}
                        >
                          Wilfrid Laurier University
                          <ArrowUpRight className="w-5 h-5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>
                      </Link>
                      <p
                        className="text-lg font-light"
                        style={{ color: colors.nearBlack }}
                      >
                        Bachelor of Arts in Political Science
                      </p>
                      <p
                        className="font-serif-display italic text-lg"
                        style={{ color: colors.olive }}
                      >
                        Legal Studies Specialization
                      </p>
                    </div>
                    <p
                      className="text-sm tracking-wide font-light flex-shrink-0"
                      style={{ color: colors.warmBrown }}
                    >
                      Sept 2022 - April 2026
                    </p>
                  </div>

                  <div
                    className="w-full h-px my-6"
                    style={{ backgroundColor: colors.olive, opacity: 0.15 }}
                  />

                  <p
                    className="text-base leading-relaxed font-light"
                    style={{ color: colors.nearBlackAlt, opacity: 0.75 }}
                  >
                    Currently preparing for the LSAT. Coursework includes legal writing,
                    constitutional law, poverty & inequality policy, and political theory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.nearBlack }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              {/* Left - Section Label */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  03
                </p>
                <h2
                  className="font-serif-display text-4xl lg:text-5xl font-light"
                  style={{ color: colors.cream }}
                >
                  Experience
                </h2>
                <div
                  className="w-12 h-px mt-6"
                  style={{ backgroundColor: colors.olive }}
                />
              </div>
            </div>

            {/* Experience Cards */}
            <div className="space-y-px">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 transition-all duration-500 hover:bg-opacity-50"
                  style={{
                    backgroundColor: `${colors.nearBlackAlt}80`,
                    borderLeft: `1px solid ${colors.olive}40`
                  }}
                >
                  <div className="lg:col-span-3">
                    <p
                      className="text-sm font-light tracking-wide mb-2"
                      style={{ color: colors.warmBrown }}
                    >
                      {exp.period}
                    </p>
                    <p
                      className="text-sm font-light"
                      style={{ color: colors.cream, opacity: 0.5 }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h3
                      className="font-serif-display text-xl lg:text-2xl font-light mb-4"
                      style={{ color: colors.cream }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed font-light"
                      style={{ color: colors.cream, opacity: 0.6 }}
                    >
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left - Section Label */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  04
                </p>
                <h2
                  className="font-serif-display text-4xl lg:text-5xl font-light"
                  style={{ color: colors.nearBlack }}
                >
                  Writing
                </h2>
                <div
                  className="w-12 h-px mt-6 mb-8"
                  style={{ backgroundColor: colors.olive }}
                />
                <p
                  className="text-base leading-relaxed font-light mb-8"
                  style={{ color: colors.nearBlackAlt, opacity: 0.75 }}
                >
                  Selected academic writing samples demonstrating analytical and research capabilities.
                </p>
                <Link
                  href="/writing"
                  className="inline-flex items-center gap-3 text-sm tracking-wide font-light transition-all duration-300 hover:gap-4 group"
                  style={{ color: colors.olive }}
                >
                  View All Writing
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Right - Writing Samples */}
              <div className="lg:col-span-9 lg:pl-12">
                <div className="space-y-4">
                  {writingSamples.map((sample, index) => (
                    <Link
                      key={index}
                      href="/writing"
                      className="group block p-6 transition-all duration-300"
                      style={{
                        backgroundColor: colors.creamAlt,
                        borderLeft: `2px solid transparent`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor = colors.olive;
                        e.currentTarget.style.backgroundColor = colors.softPink + '30';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.backgroundColor = colors.creamAlt;
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4
                            className="font-serif-display text-lg lg:text-xl font-light mb-1"
                            style={{ color: colors.nearBlack }}
                          >
                            {sample.title}
                          </h4>
                          <p
                            className="text-sm font-light"
                            style={{ color: colors.warmBrown }}
                          >
                            {sample.type}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: colors.olive }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.creamAlt }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
              {/* Left - Section Label */}
              <div className="lg:col-span-3">
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  05
                </p>
                <h2
                  className="font-serif-display text-4xl lg:text-5xl font-light"
                  style={{ color: colors.nearBlack }}
                >
                  Portfolio
                </h2>
                <div
                  className="w-12 h-px mt-6"
                  style={{ backgroundColor: colors.olive }}
                />
              </div>
            </div>

            {/* Portfolio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Writing Portfolio Card */}
              <Link
                href="/writing"
                className="group relative p-10 lg:p-12 transition-all duration-500"
                style={{
                  backgroundColor: colors.cream,
                  border: `1px solid ${colors.olive}20`
                }}
              >
                <div
                  className="absolute top-0 left-0 w-0 h-full transition-all duration-500 group-hover:w-1"
                  style={{ backgroundColor: colors.olive }}
                />
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  Academic Work
                </p>
                <h3
                  className="font-serif-display text-2xl lg:text-3xl font-light mb-4"
                  style={{ color: colors.nearBlack }}
                >
                  Writing Samples
                </h3>
                <p
                  className="text-base font-light mb-8"
                  style={{ color: colors.nearBlackAlt, opacity: 0.75 }}
                >
                  Legal writing, policy analysis, and academic papers
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm tracking-wide font-light transition-all duration-300 group-hover:gap-3"
                  style={{ color: colors.olive }}
                >
                  View Writing
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>

              {/* Modeling Portfolio Card */}
              <Link
                href="/modeling"
                className="group relative p-10 lg:p-12 transition-all duration-500"
                style={{
                  backgroundColor: colors.nearBlack,
                  border: `1px solid ${colors.olive}40`
                }}
              >
                <div
                  className="absolute top-0 left-0 w-0 h-full transition-all duration-500 group-hover:w-1"
                  style={{ backgroundColor: colors.warmBrown }}
                />
                <p
                  className="text-xs tracking-[0.3em] uppercase font-light mb-4"
                  style={{ color: colors.warmBrown }}
                >
                  Creative Work
                </p>
                <h3
                  className="font-serif-display text-2xl lg:text-3xl font-light mb-4"
                  style={{ color: colors.cream }}
                >
                  Modeling Portfolio
                </h3>
                <p
                  className="text-base font-light mb-8"
                  style={{ color: colors.cream, opacity: 0.6 }}
                >
                  Professional modeling photos and creative work
                </p>
                <div
                  className="inline-flex items-center gap-2 text-sm tracking-wide font-light transition-all duration-300 group-hover:gap-3"
                  style={{ color: colors.warmBrown }}
                >
                  View Portfolio
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 px-6 lg:px-12" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ color: colors.warmBrown }}
            >
              Get in Touch
            </p>
            <h2
              className="font-serif-display text-4xl lg:text-6xl font-light mb-6"
              style={{ color: colors.nearBlack }}
            >
              Let&apos;s Connect
            </h2>
            <div
              className="w-16 h-px mx-auto mb-8"
              style={{ backgroundColor: colors.olive }}
            />
            <p
              className="text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto"
              style={{ color: colors.nearBlackAlt, opacity: 0.75 }}
            >
              I&apos;m always open to discussing new opportunities, collaborations,
              or conversations about law, policy, and everything in between.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:melisaonder09@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-wide font-light transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: colors.olive,
                  color: colors.cream
                }}
              >
                <MailIcon />
                melisaonder09@gmail.com
              </Link>
              <Link
                href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-wide font-light transition-all duration-300"
                style={{
                  border: `1px solid ${colors.olive}`,
                  color: colors.olive
                }}
              >
                <LinkedInIcon />
                LinkedIn Profile
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 px-6 lg:px-12"
          style={{
            backgroundColor: colors.nearBlack,
            borderTop: `1px solid ${colors.olive}20`
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p
                  className="font-serif-display text-xl font-light mb-1"
                  style={{ color: colors.cream }}
                >
                  Melisa Onder
                </p>
                <p
                  className="text-sm font-light"
                  style={{ color: colors.cream, opacity: 0.5 }}
                >
                  Political Science & Legal Studies
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-60"
                  style={{ color: colors.cream }}
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </Link>
                <Link
                  href="mailto:melisaonder09@gmail.com"
                  className="transition-opacity duration-300 hover:opacity-60"
                  style={{ color: colors.cream }}
                  aria-label="Email"
                >
                  <MailIcon />
                </Link>
              </div>
            </div>
            <div
              className="mt-8 pt-8 text-center text-xs font-light"
              style={{
                borderTop: `1px solid ${colors.olive}15`,
                color: colors.cream,
                opacity: 0.4
              }}
            >
              2024 Melisa Onder. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
