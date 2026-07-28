"use client";

import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";
import Button from "@/components/ui/Button";

export default function AstrologerProfiles() {
  return (
    <section id="about" className="bg-bg-void border-t border-[rgba(184,146,40,0.1)]">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader
          eyebrow="Meet Your Astrologer"
          title="Acharya Soumitra Roy Chowdhury"
        />

        <div className="mt-sp-8 grid grid-cols-1 gap-sp-8 lg:mt-sp-10 lg:grid-cols-12 lg:gap-sp-10 items-center">
          {/* Photo: 5 of 12 cols */}
          <div className="lg:col-span-5 flex flex-col items-center gap-3">
            <div className="relative h-72 w-72 overflow-hidden rounded-card ring-4 ring-gold-400/35 shadow-chart-float">
              <Image
                src="/astrologer.webp"
                alt="Portrait of Acharya Soumitra Roy Chowdhury"
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
            {/* Certified Astrologer badge below photo */}
            <div className="flex items-center gap-2 rounded-full border border-gold-400/30 bg-bg-cosmos px-4 py-1.5 shadow-[0_0_12px_rgba(184,146,40,0.12)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400 shrink-0" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-gold-500">
                Certified Astrologer
              </span>
            </div>
          </div>

          {/* Biography details: 7 of 12 cols */}
          <div className="lg:col-span-7 space-y-sp-4">
            <h3 className="font-display text-2xl font-bold text-text-primary">
              Vedic Astrology, Vastu Shastra &amp; Lal Kitab Expert
            </h3>
            {/* Certified badge inline with bio heading */}
            <div className="flex items-center gap-2 w-fit rounded-full border border-gold-400/20 bg-[rgba(184,146,40,0.06)] px-3 py-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold-400 shrink-0" aria-hidden="true">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-500/90">
                Certified Astrologer · 30+ Years Experience
              </span>
            </div>
            
            <p className="font-sans text-base leading-relaxed text-text-secondary">
              Based in Lucknow, **Acharya Soumitra Roy Chowdhury** is a professional astrologer with over 30 years of consulting experience. His practice stands apart by providing logical, practical, and highly realistic remedies rather than fear-based, deterministic predictions.
            </p>

            <p className="font-sans text-base leading-relaxed text-text-secondary">
              He specializes in analyzing career charts, marriage compatibility (Kundli Matching), court/legal matters, property investments, and Vastu space energy alignments. He prescribes customized gemstones, Rudraksha, and Lal Kitab remedial rituals tailored to restore karmic harmony.
            </p>

            <div className="flex flex-wrap gap-sp-3 pt-sp-2">
              <div className="rounded-input border border-gold-400/15 bg-bg-cosmos px-4 py-2 text-center">
                <span className="block text-xs text-text-muted uppercase font-bold font-sans">Experience</span>
                <span className="block font-display text-lg font-semibold text-gold-600">30+ Years</span>
              </div>
              <div className="rounded-input border border-gold-400/15 bg-bg-cosmos px-4 py-2 text-center">
                <span className="block text-xs text-text-muted uppercase font-bold font-sans">Consultations</span>
                <span className="block font-display text-lg font-semibold text-gold-600">10,000+</span>
              </div>
              <div className="rounded-input border border-gold-400/15 bg-bg-cosmos px-4 py-2 text-center">
                <span className="block text-xs text-text-muted uppercase font-bold font-sans">Languages</span>
                <span className="block font-display text-lg font-semibold text-gold-600">Hindi, English, Bengali</span>
              </div>
            </div>

            <div className="pt-sp-4">
              <Button as="a" href="#social-profiles" variant="primary" size="lg">
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
