"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icon";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 flex-1 pb-16">
        {/* Hero Banner Section */}
        <section className="relative px-sp-5 py-sp-8 text-center max-w-content mx-auto">
          <span className="eyebrow text-gold-500 tracking-[0.2em]">About the Astrologer</span>
          <h1 className="font-display mt-sp-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Acharya Soumitra Roy Chowdhury
          </h1>
          {/* Certified Astrologer badge */}
          <div className="mt-3 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-bg-cosmos px-4 py-1.5 shadow-[0_0_12px_rgba(184,146,40,0.1)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400 shrink-0" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-gold-500">
                Certified Astrologer
              </span>
            </div>
          </div>
          <p className="mt-sp-2 text-md font-medium tracking-tight text-gold-600 font-sans uppercase">
            Lucknow &bull; Guiding Lives With Ancient Wisdom &amp; Cosmic Insight
          </p>
          <div className="mt-sp-6 mx-auto max-w-[720px] text-base leading-relaxed text-text-secondary border-y border-gold-400/20 py-6 font-sans">
            At <strong className="text-text-primary">VedicDestiny.in</strong>, we blend the timeless knowledge of Vedic Astrology with modern technology to illuminate your path, empower your decisions, and enrich your life.
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-bg-cosmos border-y border-gold-400/10 py-16 px-sp-5">
          <div className="max-w-content mx-auto">
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-center text-text-primary mb-12">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { title: "Truth", desc: "We believe in delivering honest and accurate astrological insights." },
                { title: "Integrity", desc: "We maintain the highest ethical standards in every consultation." },
                { title: "Wisdom", desc: "We preserve and share the timeless wisdom of Vedic Astrology." },
                { title: "Empowerment", desc: "We empower you to make better decisions and create a better life." },
                { title: "Accessibility", desc: "We make astrology simple, practical & accessible to all." },
              ].map((v) => (
                <div key={v.title} className="bg-bg-void p-6 rounded-card border border-gold-400/10 flex flex-col justify-between shadow-[0_4px_20px_-8px_rgba(140,106,58,0.15)]">
                  <h3 className="font-display text-lg font-bold text-gold-500 mb-2 border-b border-gold-400/15 pb-2">
                    {v.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed flex-1">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biography Detail */}
        <section className="max-w-content mx-auto px-sp-5 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative h-72 w-72 overflow-hidden rounded-card ring-4 ring-gold-400/35 shadow-chart-float mb-4">
                <Image
                  src="/astrologer.webp"
                  alt="Portrait of Acharya Soumitra Roy Chowdhury"
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </div>

              {/* Certified Astrologer badge below photo */}
              <div className="mb-6 flex items-center gap-2 rounded-full border border-gold-400/30 bg-bg-cosmos px-4 py-1.5 shadow-[0_0_12px_rgba(184,146,40,0.12)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400 shrink-0" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-gold-500">
                  Certified Astrologer
                </span>
              </div>
              <div className="w-full bg-bg-cosmos border border-gold-400/10 rounded-card p-6 space-y-4">
                <h4 className="font-display text-md font-bold text-text-primary uppercase tracking-wider text-center border-b border-gold-400/10 pb-2">
                  Qualifications
                </h4>
                <div className="space-y-3 font-sans text-sm text-text-secondary">
                  <div className="flex gap-2 items-start">
                    <span className="text-gold-500 font-bold">&bull;</span>
                    <span><strong>Visharad Qualification</strong> from Indian Council of Astrological Sciences (ICAS)</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-gold-500 font-bold">&bull;</span>
                    <span><strong>Certified Lal Kitab Expert</strong> with advanced training from occult science institutions</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-gold-500 font-bold">&bull;</span>
                    <span><strong>30+ Years</strong> of consultation experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <span className="eyebrow text-gold-500 block">Vedic Astrologer | Numerologist | Vastu Expert | Lal Kitab Expert | Life Guide in Lucknow</span>
              <h2 className="font-display text-3xl font-bold text-text-primary">
                A Journey Rooted in Wisdom &amp; Experience
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed text-text-secondary font-sans">
                <p>
                  Acharya Soumitra Roy Chowdhury is a highly respected practitioner of Vedic sciences with over 30 years of experience in Astrology, Numerology, and Vastu Shastra. Based in Lucknow, India, his work today reaches clients across the globe, helping individuals and businesses align with the natural laws of the universe.
                </p>
                <p>
                  His approach combines ancient Vedic wisdom with practical, modern-day application, offering clarity, direction, and meaningful solutions for life’s most important decisions. Clients from Lucknow and other parts of India trust his guidance for both personal and professional challenges.
                </p>
                <p>
                  From an early age, Soumitra was deeply drawn to astrology, philosophy, and the Vedas. What began as curiosity evolved into a lifelong mission—to understand cosmic patterns and help others navigate life with awareness and confidence.
                </p>
                <p>
                  Before dedicating himself fully to Vedic sciences, he built a successful corporate career. Apart from this, he earned the prestigious <strong>Visharad</strong> qualification from the Indian Council of Astrological Sciences (ICAS) and became a <strong>Certified Lal Kitab Expert</strong> with advanced training from respected institutions of Astrology, Numerology, and occult sciences in India.
                </p>
                <p>
                  This unique blend of corporate insight and spiritual understanding allows him to guide individuals from Lucknow and worldwide with a balanced and practical approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Areas of Expertise */}
        <section className="bg-bg-cosmos border-y border-gold-400/10 py-16 px-sp-5">
          <div className="max-w-content mx-auto">
            <h2 className="font-display text-3xl font-semibold text-center text-text-primary mb-12">
              Areas of Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Vedic Astrology", desc: "Deep analysis of birth charts (Kundali) to understand life patterns, timing, and opportunities." },
                { title: "Numerology", desc: "Name correction, business name alignment, lucky numbers, mobile numbers, and signature analysis." },
                { title: "Lal Kitab Remedies", desc: "Simple and practical remedies focused on karmic correction and positive transformation." },
                { title: "Vastu Shastra", desc: "Consultations for homes, offices, and commercial spaces to improve harmony, prosperity, and energy balance." },
                { title: "Gemstone & Rudraksha Guidance", desc: "Personalized recommendations aligned with planetary influences and individual charts." },
                { title: "Life Guidance & Planetary Cycles", desc: "Support during major life transitions, challenging planetary periods, and important decision-making phases." },
              ].map((e) => (
                <div key={e.title} className="bg-bg-void p-6 rounded-card border border-gold-400/10 shadow-[0_4px_20px_-8px_rgba(140,106,58,0.15)] flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    {e.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {e.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Approach */}
        <section className="max-w-[800px] mx-auto px-sp-5 py-16 text-center">
          <span className="eyebrow text-gold-500 block">Philosophy</span>
          <h2 className="font-display text-3xl font-semibold text-text-primary mt-2 mb-6">
            Awareness Over Fear
          </h2>
          <p className="text-base text-text-secondary leading-relaxed font-sans mb-8">
            Unlike many practitioners, Soumitra strongly believes that astrology should empower individuals rather than create fear.
          </p>
          
          <blockquote className="bg-bg-cosmos border-l-4 border-gold-500 rounded-r-card p-6 text-xl italic font-display text-text-primary shadow-sm mb-8">
            &ldquo;Don&rsquo;t try to fix your stars. Fix your karma.&rdquo;
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-semibold text-gold-600 uppercase font-sans mb-8">
            {["Karmic understanding", "Behavioural correction", "Practical life decisions", "Spiritual alignment"].map((item) => (
              <div key={item} className="bg-bg-cosmos border border-gold-400/10 rounded-full py-2 px-4 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-display font-bold text-xl text-text-primary mb-6 text-center">
              Ethics &amp; Commitment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[720px] mx-auto">
              {[
                { title: "No Fear-Based Predictions", desc: "Astrology should empower you, not create fear" },
                { title: "No Unrealistic Promises", desc: "Honest, transparent readings based on chart facts" },
                { title: "No Unnecessary Rituals", desc: "Practical remedies that fit your modern life" }
              ].map((item) => (
                <div key={item.title} className="bg-bg-cosmos border border-gold-400/15 p-5 rounded-card shadow-sm hover:border-gold-400/30 transition-all text-center flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-400/10 flex items-center justify-center mb-3">
                    <IconCheck size={18} className="text-gold-600" />
                  </div>
                  <h4 className="font-sans text-sm font-bold text-text-primary mb-1">{item.title}</h4>
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Him Different & Trusted By Clients */}
        <section className="bg-bg-cosmos border-y border-gold-400/10 py-16 px-sp-5">
          <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                What Makes Him Different
              </h2>
              <ul className="space-y-3 font-sans text-sm text-text-secondary">
                {[
                  "30+ years of consultation experience",
                  "Ethical and transparent approach",
                  "Deep karmic analysis instead of superficial predictions",
                  "Simple remedies rooted in Lal Kitab principles",
                  "Ability to explain complex concepts in simple language",
                  "Personalized consultations for every individual",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-gold-500 mt-1 font-bold">&#10004;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                Trusted by Clients Worldwide
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mb-4">
                Over the years, Soumitra has guided thousands of individuals, families, professionals, and business owners. People from Lucknow and globally seek his consultation for:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs text-text-secondary font-semibold uppercase">
                {[
                  "Accurate & detailed analysis",
                  "Honest & ethical guidance",
                  "Compassionate consultation",
                  "Practical & actionable solutions",
                  "Personalized 1-on-1 attention",
                  "Global Online Access",
                ].map((item) => (
                  <li key={item} className="bg-bg-void/60 border border-gold-400/10 rounded-input py-2 px-3 flex gap-2 items-center shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Services & Process Grid */}
        <section className="max-w-content mx-auto px-sp-5 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-2xl font-bold text-text-primary">
                Detailed Services Offered
              </h2>
              
              <div className="space-y-6 font-sans text-sm text-text-secondary">
                <div className="border border-gold-400/10 p-5 rounded-card bg-bg-cosmos shadow-sm">
                  <h3 className="font-display font-semibold text-text-primary text-base mb-2">Personal Consultations</h3>
                  <p className="leading-relaxed">Detailed analysis covering career &amp; business, marriage &amp; relationships, finance &amp; investments, and health &amp; life direction.</p>
                </div>
                <div className="border border-gold-400/10 p-5 rounded-card bg-bg-cosmos shadow-sm">
                  <h3 className="font-display font-semibold text-text-primary text-base mb-2">Specialized Guidance</h3>
                  <p className="leading-relaxed">Marriage compatibility analysis, career growth and professional stability, business naming and expansion timing, legal matters and property disputes, and birth time rectification.</p>
                </div>
                <div className="border border-gold-400/10 p-5 rounded-card bg-bg-cosmos shadow-sm">
                  <h3 className="font-display font-semibold text-text-primary text-base mb-2">Spiritual &amp; Karmic Guidance</h3>
                  <p className="leading-relaxed">Helping individuals understand past karmic patterns, life lessons, and corrective actions for future growth.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-bg-cosmos border border-gold-400/10 rounded-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4 text-center">
                Consultation Process
              </h2>
              <p className="font-sans text-xs text-text-muted text-center uppercase tracking-wider mb-6 block">
                Online Consultations from Lucknow &ndash; Worldwide Access
              </p>
              
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold-400/20">
                {[
                  { title: "Pre-Session Review", desc: "In-depth review based on birth details before we connect." },
                  { title: "One-on-One Session", desc: "Conducted directly by Acharya Soumitra Roy Chowdhury (strictly confidential)." },
                  { title: "Personalized Remedies", desc: "Practical guidance and karmic corrections suggested." },
                  { title: "Post-Session Support", desc: "Support for additional clarity on topics covered." },
                ].map((step, idx) => (
                  <div key={step.title} className="flex gap-4 items-start relative z-10">
                    <span className="w-8 h-8 rounded-full bg-gold-400 text-text-on-gold flex items-center justify-center font-display text-sm font-bold shadow-md shrink-0">
                      {idx + 1}
                    </span>
                    <div className="pt-0.5 font-sans">
                      <h4 className="text-sm font-bold text-text-primary">{step.title}</h4>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("open-connect-modal"));
                    }
                  }}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Book A Consultation
                </Button>
                {/* /about does not render FinalCTA, so the paid-service note is
                    placed directly with this booking CTA. */}
                <p className="mt-sp-3 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600">
                  Paid consultation services only
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Presence Section */}
        <section id="social-profiles" className="bg-bg-cosmos border-t border-gold-400/10 py-12 px-sp-5">
          <div className="max-w-content mx-auto text-center">
            <h2 className="font-display text-xl font-semibold text-text-primary mb-6">
              Connect With Astrologer Acharya Soumitra Roy Chowdhury On Other Platforms
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto">
              {[
                { name: "Quora", value: "Acharya Soumitra Roy Chowdhury", href: "https://www.quora.com/profile/Soumitra-Roy-Chowdhury-1" },
                { name: "Medium", value: "Soumitrarc", href: "https://medium.com/@soumitrarc101010" },
                { name: "Reddit", value: "u/According-Vast1873", href: "https://www.reddit.com/user/According-Vast1873" },
                { name: "Pinterest", value: "SRC19 soumitrarc101010", href: "https://in.pinterest.com/soumitrarc101010/" },
              ].map((plat) => (
                <a
                  key={plat.name}
                  href={plat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-void p-4 rounded-card border border-gold-400/10 hover:border-gold-400/25 transition-all duration-200 shadow-sm block group"
                >
                  <span className="block font-sans text-xs text-text-muted font-semibold uppercase tracking-wider">{plat.name}</span>
                  <span className="block mt-1 font-display text-sm font-bold text-gold-500 group-hover:text-gold-600 transition-colors truncate">{plat.value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
