import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Services | Vedic Destiny",
  description: "Explore our expert services in Vedic Astrology, Lal Kitab, Numerology, and Vastu Shastra for personal and professional guidance.",
};

const SERVICES = [
  {
    id: "astrology",
    title: "Astrology Services",
    description: "Deep dive into your cosmic blueprint. Our Vedic Astrology services provide profound insights into your life path, career, relationships, and health based on precise planetary alignments.",
    subcategories: [
      "Natal Chart (Kundli) Analysis",
      "Career & Finance Prediction",
      "Marriage & Compatibility Matching",
      "Health & Well-being Reading",
      "Dasha & Transit Analysis",
    ],
  },
  {
    id: "lal-kitab",
    title: "Lal Kitab Remedies",
    description: "Discover simple, practical, and highly effective remedies based on Lal Kitab principles. We provide actionable solutions to alleviate planetary afflictions and bring harmony to your life.",
    subcategories: [
      "Personalized Lal Kitab Remedies",
      "Debt & Financial Crisis Solutions",
      "Ancestral Dosha (Pitra Dosh) Remedies",
      "Family Dispute Resolution",
      "Business Blockage Removal",
    ],
  },
  {
    id: "numerology",
    title: "Numerology",
    description: "Unlock the hidden meaning behind your numbers. Our numerology services analyze your birth date and name to reveal your core strengths, life cycles, and optimal career paths.",
    subcategories: [
      "Name Correction & Optimization",
      "Life Path & Destiny Number Analysis",
      "Business Name & Brand Numerology",
      "Lucky Numbers & Dates Selection",
      "Compatibility by Numbers",
    ],
  },
  {
    id: "vastu",
    title: "Vastu Shastra",
    description: "Harmonize your living and workspace with the ancient science of architecture. We offer expert Vastu consultations to enhance prosperity, health, and peace in your environment without structural demolition.",
    subcategories: [
      "Residential Vastu Consultation",
      "Commercial & Office Vastu",
      "Industrial & Factory Vastu",
      "Plot & Property Selection",
      "Remedial Vastu (Without Demolition)",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg-void pb-sp-10 pt-[140px] lg:pb-sp-16 lg:pt-[180px]">
        {/* Background ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(184,146,40,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-content px-sp-5 text-center">
          <SectionHeader
            eyebrow="Our Services"
            title="Comprehensive Astrological Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[700px] font-sans text-base leading-relaxed text-text-secondary">
            Explore our diverse range of services designed to bring clarity, purpose, and prosperity to your life. From detailed Vedic charting to practical Vastu adjustments, we provide holistic solutions tailored to your unique journey.
          </p>
        </div>
      </section>

      {/* Services Content Section */}
      <section className="bg-bg-void pb-sp-16 lg:pb-24">
        <div className="mx-auto max-w-content px-sp-5">
          <StaggerReveal className="flex flex-col gap-sp-10 lg:gap-sp-16">
            {SERVICES.map((service, index) => (
              <StaggerItem key={service.id}>
                <div id={service.id} className="scroll-mt-32">
                  <Card interactive={false} className="p-sp-6 lg:p-sp-8">
                    <div className="flex flex-col gap-sp-6 lg:flex-row lg:items-start lg:gap-sp-10">
                      
                      {/* Left: Title & Description */}
                      <div className="flex-1 lg:max-w-[55%]">
                        <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                          {service.title}
                        </h2>
                        <div className="mt-sp-4 h-1 w-12 bg-gold-400 opacity-50 rounded-full" />
                        <p className="mt-sp-5 font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                          {service.description}
                        </p>
                      </div>

                      {/* Right: Subcategories (Future placeholders) */}
                      <div className="flex-1 rounded-card bg-[rgba(184,146,40,0.03)] p-sp-5 border border-gold-400/10 lg:p-sp-6">
                        <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                          Specialized Services
                        </h3>
                        <ul className="space-y-3">
                          {service.subcategories.map((sub, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-gold-400" />
                              <span className="font-sans text-[15px] text-text-primary">{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
