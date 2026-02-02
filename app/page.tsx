'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const colors = {
  olive: '#8A9B7A',
  softPink: '#E8C4C4',
  plum: '#C4A0D4',
  warmBrown: '#C9A67A',
  nearBlack: '#FAF7F2',
  cream: '#3B1A1A',
  creamAlt: '#4A2828',
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
    title: "Events & Social Media Executive",
    company: "CSA WLU",
    companyUrl: "https://students.wlu.ca/programs/arts/communication-studies/get-involved.html",
    period: "Sept 2024 - Present",
    description: "Events Executive (Sept 2025–Present): Planned and coordinated events by selecting venues, managing budgets, organizing materials, and ensuring smooth execution. Social Media Executive (Sept 2024–May 2025): Created and posted visually appealing content across social media platforms, maintaining a consistent posting schedule to maximize engagement and build a digital presence.",
  },
  {
    title: "Marketing Assistant & Business Developer",
    company: "Fittz Commercial Interiors",
    companyUrl: "https://fittz.ca/",
    period: "Sept 2023 - Aug 2025",
    description: "Business development and marketing at a commercial furniture dealership specializing in interior design and workspace solutions. Engaged in company promotion through outreach calls and industry events, building client relationships and supporting sales initiatives. Designed promotional marketing materials for various product launches and events.",
  },
  {
    title: "Hostess",
    company: "La Vecchia",
    companyUrl: "https://lavecchia.ca/lakeshore/",
    period: "May 2024 - Aug 2024",
    description: "Greeted guests with professionalism and warmth, managed table turnover, and coordinated seating for large groups. Maintained efficiency during peak hours by balancing customer needs with managerial expectations. Demonstrated adaptability in a fast-paced, high-volume environment.",
  },
  {
    title: "Customer Care Representative",
    company: "Arctic Glacier",
    companyUrl: "https://arcticglacier.com/about-us/",
    period: "May 2021 - Aug 2023",
    description: "Managed high-volume inbound call flow from both French and English speaking customers. Utilized CRM software to manage customer accounts, process orders, and resolve cases. Handled up to 100 calls per hour, logging customer information with accuracy and professionalism.",
  },
];

const writingSamples = [
  { title: 'Appellant Factum: R v. Ndhlovu', type: 'Legal Writing', href: '/papers/appellant-factum.pdf' },
  { title: 'Legal Memorandum: R v. Ndhlovu', type: 'Legal Writing', href: '/papers/legal-memo.pdf' },
  { title: 'The Hidden Story Behind Our Food', type: 'Op-Ed', course: 'Canadian Environmental Policy', href: '/papers/op-ed-factory-farming.pdf' },
  { title: 'Child Marriage in India', type: 'Policy Briefing', course: 'Poverty & Inequality in the Global South', href: '/papers/policy-briefing-child-marriage.pdf' },
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
        ::selection { background: ${colors.softPink}; color: ${colors.cream}; }
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
                {['About', 'Education', 'Experience', 'Projects'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-light hover:opacity-60 transition-opacity"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <a
                href="mailto:melisaonder09@gmail.com"
                className="flex items-center gap-2 text-sm font-light hover:opacity-60 transition-opacity p-2 -m-2"
                style={{ color: colors.softPink }}
              >
                <MailIcon />
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-24 pb-8 px-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <div className="order-2 lg:order-1">
                <p className="text-sm tracking-[0.25em] uppercase mb-6 font-light" style={{ color: colors.warmBrown }}>
                  <a href="https://www.wlu.ca" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Political Science & Legal Studies</a>
                </p>

                <h1 className="mb-10">
                  <span className="font-serif-display text-6xl md:text-7xl font-light block" style={{ color: colors.softPink }}>
                    Melisa
                  </span>
                  <span className="font-serif-display text-6xl md:text-7xl italic font-light block" style={{ color: colors.softPink }}>
                    Onder
                  </span>
                </h1>

                <div className="flex items-center gap-4">
                  <a
                    href="mailto:melisaonder09@gmail.com"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: colors.softPink, color: colors.cream }}
                  >
                    <MailIcon />
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-light tracking-wide hover:opacity-80 transition-opacity"
                    style={{ border: `1px solid ${colors.softPink}`, color: colors.softPink }}
                  >
                    <LinkedInIcon />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Right - Profile Image */}
              <div className="order-1 lg:order-2">
                <div className="max-w-[230px] mx-auto lg:ml-auto lg:mr-0">
                  <div className="aspect-[3/4] overflow-hidden" style={{ boxShadow: `0 8px 40px #00000030` }}>
                    <Image
                      src="/profile.jpeg"
                      alt="Melisa Onder"
                      width={400}
                      height={533}
                      className="object-cover w-full h-full scale-110"
                      style={{ objectPosition: 'center 15%' }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="pt-10 pb-16 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.softPink }}>01</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>About</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base leading-relaxed font-light mb-4" style={{ color: colors.warmBrown }}>
                  Final-year BA Political Science, <a href="https://academic-calendar.wlu.ca/program.php?cal=1&d=3094&p=7042&s=1151&y=92" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: colors.plum }}>Legal Studies Specialization</a>. Preparing for LSAT.
                </p>
                <p className="text-base leading-relaxed font-light italic mb-6" style={{ opacity: 0.7 }}>
                  Working across legal analysis, sales, marketing, and events. Drawn to problems that need solving and work that spans disciplines. Passionate about building authentic, valuable connections and preparing for the LSAT while building cross-functional skills.
                </p>
                <p className="text-sm font-light tracking-wide uppercase mb-3" style={{ color: colors.warmBrown }}>Languages</p>
                <div className="flex flex-wrap gap-3">
                  {['English', 'French', 'Turkish'].map((lang) => (
                    <span
                      key={lang}
                      className="px-4 py-2 text-sm font-light"
                      style={{ backgroundColor: colors.softPink + '20', color: colors.softPink }}
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
        <section id="education" className="py-16 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.softPink }}>02</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>Education</h2>
              </div>
              <div className="lg:col-span-8">
                <div className="p-8" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <a
                        href="https://www.wlu.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h3 className="font-serif-display text-2xl font-light mb-2 inline-flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: colors.plum }}>
                          Wilfrid Laurier University
                          <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h3>
                      </a>
                      <p className="text-lg font-light" style={{ color: colors.nearBlack }}>Bachelor of Arts in Political Science</p>
                      <a href="https://academic-calendar.wlu.ca/program.php?cal=1&d=3094&p=7042&s=1151&y=92" target="_blank" rel="noopener noreferrer">
                        <p className="font-serif-display italic text-lg hover:opacity-70 transition-opacity" style={{ color: colors.plum }}>Legal Studies Specialization</p>
                      </a>
                    </div>
                    <p className="text-sm font-light" style={{ color: colors.warmBrown }}>Sept 2022 - April 2026</p>
                  </div>
                  {/* TODO: Add grad photo */}
                  <p className="text-base leading-relaxed font-light italic" style={{ opacity: 0.7 }}>
                    Strong academic foundation in Legal Studies and Political Science, with coursework examining Canadian law, justice systems, and legal analysis. Experienced in reading, summarizing, and extracting key information from legal cases and academic materials, demonstrating attention to detail and analytical precision. GPA: 10.5/12.
                  </p>
                </div>

                {/* Princeton LSAT */}
                <div className="p-8 mt-3" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h3 className="font-serif-display text-2xl font-light mb-2" style={{ color: colors.nearBlack }}>
                        Princeton Review LSAT Prep Course
                      </h3>
                      <p className="text-lg font-light" style={{ color: colors.nearBlack }}>LSAT Preparation</p>
                    </div>
                    <p className="text-sm font-light" style={{ color: colors.warmBrown }}>June 2025 - Aug 2025</p>
                  </div>
                </div>

                {/* Richview */}
                <div className="p-8 mt-3" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-serif-display text-2xl font-light mb-2" style={{ color: colors.nearBlack }}>
                        Richview Collegiate Institute
                      </h3>
                      <p className="text-lg font-light" style={{ color: colors.nearBlack }}>Summa Cum Laude Honours (Grade 11 & 12)</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed font-light italic" style={{ opacity: 0.7 }}>
                    Debate Society, Leadership Club, Athletic Council, and Interact Club.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.softPink }}>03</p>
                <h2 className="font-serif-display text-4xl font-light" style={{ color: colors.nearBlack }}>Experience</h2>
              </div>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-8"
                  style={{ backgroundColor: colors.creamAlt }}
                >
                  <div className="lg:col-span-4">
                    <p className="text-sm font-light mb-1" style={{ color: colors.warmBrown }}>{exp.period}</p>
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-light hover:opacity-70 transition-opacity inline-flex items-center gap-1 group" style={{ color: colors.plum }}>
                        {exp.company}
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <p className="text-sm font-light" style={{ opacity: 0.6 }}>{exp.company}</p>
                    )}
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="font-serif-display text-xl font-light mb-3" style={{ color: colors.nearBlack }}>{exp.title}</h3>
                    <p className="text-base leading-relaxed font-light" style={{ opacity: 0.7 }}>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteer Experience */}
            <div className="mt-10">
              <h3 className="font-serif-display text-2xl font-light mb-4" style={{ color: colors.nearBlack }}>Volunteer</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="lg:col-span-4">
                    <p className="text-sm font-light" style={{ color: colors.warmBrown }}>Volunteer</p>
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="font-serif-display text-xl font-light mb-1" style={{ color: colors.nearBlack }}>CPSC</h3>
                    <p className="text-sm font-light italic" style={{ opacity: 0.5 }}>Details coming soon</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6" style={{ backgroundColor: colors.creamAlt }}>
                  <div className="lg:col-span-4">
                    <p className="text-sm font-light" style={{ color: colors.warmBrown }}>Volunteer</p>
                  </div>
                  <div className="lg:col-span-8">
                    <h3 className="font-serif-display text-xl font-light mb-1" style={{ color: colors.nearBlack }}>Habitat for Humanity</h3>
                    <p className="text-sm font-light italic" style={{ opacity: 0.5 }}>Details coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-8" style={{ backgroundColor: colors.cream }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs tracking-[0.25em] uppercase font-light mb-3" style={{ color: colors.softPink }}>04</p>
                <h2 className="font-serif-display text-4xl font-light mb-6" style={{ color: colors.nearBlack }}>Projects</h2>
              </div>
              <div className="lg:col-span-8">
                {/* Writing */}
                <h3 className="font-serif-display text-xl font-light mb-4" style={{ color: colors.nearBlack }}>Writing</h3>
                <div className="space-y-3 mb-8">
                  {writingSamples.map((sample, index) => (
                    <a
                      key={index}
                      href={sample.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 transition-colors"
                      style={{ backgroundColor: colors.creamAlt }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif-display text-lg font-light mb-1" style={{ color: colors.nearBlack }}>{sample.title}</h4>
                          <p className="text-sm font-light" style={{ color: colors.warmBrown }}>{sample.type}{sample.course && ` · ${sample.course}`}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.softPink }} />
                      </div>
                    </a>
                  ))}
                </div>

                {/* Other Projects */}
                <h3 className="font-serif-display text-xl font-light mb-4" style={{ color: colors.nearBlack }}>Personal</h3>
                <div className="space-y-3">
                  <a
                    href="https://recreation.laurierathletics.com/sports/2021/7/27/dance-class-descriptions.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 transition-colors"
                    style={{ backgroundColor: colors.creamAlt }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif-display text-lg font-light mb-1" style={{ color: colors.nearBlack }}>Laurier Rec Dance</h4>
                        <p className="text-sm font-light" style={{ color: colors.warmBrown }}>Dance</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.softPink }} />
                    </div>
                  </a>
                  <div className="p-5" style={{ backgroundColor: colors.creamAlt }}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-display text-lg font-light" style={{ color: colors.nearBlack }}>Outfit Board</h4>
                      <p className="text-xs font-light italic" style={{ opacity: 0.4 }}>Coming soon</p>
                    </div>
                  </div>
                  <div className="p-5" style={{ backgroundColor: colors.creamAlt }}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-display text-lg font-light" style={{ color: colors.nearBlack }}>Colouring Book</h4>
                      <p className="text-xs font-light italic" style={{ opacity: 0.4 }}>Coming soon</p>
                    </div>
                  </div>
                  <div className="p-5" style={{ backgroundColor: colors.creamAlt }}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif-display text-lg font-light" style={{ color: colors.nearBlack }}>Reading List</h4>
                      <p className="text-xs font-light italic" style={{ opacity: 0.4 }}>Coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-8" style={{ backgroundColor: colors.creamAlt }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-serif-display text-xl font-light" style={{ color: colors.softPink }}>Melisa Onder</p>
                <p className="text-sm font-light" style={{ color: colors.nearBlack, opacity: 0.5 }}>Political Science & Legal Studies</p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  style={{ color: colors.nearBlack }}
                >
                  <LinkedInIcon />
                </a>
                <a href="mailto:melisaonder09@gmail.com" className="hover:opacity-60 transition-opacity" style={{ color: colors.nearBlack }}>
                  <MailIcon />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
