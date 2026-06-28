import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Our Services | Vedic Destiny",
  description: "Explore all service categories offered by Vedic Destiny including Prediction Services.",
};

const CATEGORIES = [
  {
    id: "prediction",
    title: "Prediction Services",
    description: "Discover what the cosmos holds for you. This includes our detailed Vedic Astrology readings, Lal Kitab remedies, Numerology, and Vastu consultations. Get deep insights into your career, marriage, health, and property.",
    href: "/services/prediction",
    features: [
      "Vedic Astrology",
      "Lal Kitab Remedies",
      "Numerology",
      "Vastu Shastra",
    ],
  },
  // Future categories (like Pooja, Gemstones) can be added here
];

export default function ServicesHubPage() {
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
            eyebrow="Our Offerings"
            title="Explore Our Services"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[600px] font-sans text-base leading-relaxed text-text-secondary">
            Select a service category below to find the guidance, remedies, and support you need on your life's journey.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-bg-void pb-sp-16 lg:pb-24">
        <div className="mx-auto max-w-content px-sp-5">
          <StaggerReveal amount={0.01} className="grid grid-cols-1 md:grid-cols-2 gap-sp-8 lg:gap-sp-10">
            {CATEGORIES.map((category) => (
              <StaggerItem key={category.id}>
                <Card as="a" href={category.href} interactive={true} className="p-sp-6 lg:p-sp-8 h-full flex flex-col group">
                  <div className="mb-sp-5 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-bold text-text-primary group-hover:text-gold-600 transition-colors">
                      {category.title}
                    </h2>
                    <div className="h-10 w-10 rounded-full bg-[rgba(184,146,40,0.08)] flex items-center justify-center group-hover:bg-gold-400 group-hover:text-bg-void transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-6 flex-1">
                    {category.description}
                  </p>

                  <div className="pt-sp-4 border-t border-gold-400/10">
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-text-muted mb-sp-3">
                      Includes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature) => (
                        <span key={feature} className="px-3 py-1 rounded-full bg-[rgba(184,146,40,0.05)] text-text-secondary text-[13px] font-sans font-medium border border-gold-400/10">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
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
