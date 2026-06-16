"use client";

import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Button from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icon";

type Tier = {
  name: string;
  duration: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Quick reading",
    duration: "20 minutes",
    features: ["Vedic chart overview", "One primary area of focus", "Actionable remedies"],
    cta: "Book quick reading",
  },
  {
    name: "Deep consultation",
    duration: "45 minutes",
    features: [
      "Full chart analysis",
      "Dasha period breakdown",
      "Detailed Q&A",
      "Remedial suggestions",
      "Recorded session",
    ],
    cta: "Book consultation",
    featured: true,
  },
  {
    name: "Comprehensive package",
    duration: "90 minutes · across 2 sessions",
    features: [
      "Everything in Deep consultation",
      "Annual predictions & transits",
      "Muhurta recommendations",
      "Follow-up session",
      "Detailed PDF report",
    ],
    cta: "Book package",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader
          eyebrow="Consultations"
          title="Tailored consultation packages"
        />

        <StaggerReveal
          stagger={0.1}
          amount={0.15}
          className="mt-sp-8 grid grid-cols-1 items-start gap-sp-5 lg:mt-sp-10 lg:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <StaggerItem
              key={tier.name}
              className={`h-full ${tier.featured ? "order-first lg:order-none" : ""}`}
            >
              <div
                className={
                  "relative flex h-full flex-col rounded-card bg-bg-cosmos p-8 " +
                  (tier.featured
                    ? "border-2 border-gold-400 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.7)] lg:-translate-y-2"
                    : "border border-[rgba(184,146,40,0.1)]")
                }
                style={{
                  backgroundImage:
                    "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
                }}
              >
                {tier.featured && (
                  <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-gold-400 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-text-on-gold">
                    Most popular
                  </span>
                )}

                <h3 className="eyebrow text-gold-200">{tier.name}</h3>

                <p className="mt-sp-3 font-sans text-sm text-text-primary font-semibold">
                  Duration: {tier.duration}
                </p>

                <ul className="mt-sp-5 flex flex-1 flex-col gap-sp-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-sp-2">
                      <IconCheck
                        size={18}
                        className="mt-0.5 shrink-0 text-gold-400"
                      />
                      <span className="font-sans text-sm text-text-secondary">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-sp-6">
                  <Button
                    as="a"
                    href="#skills"
                    variant={tier.featured ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
