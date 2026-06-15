"use client";

import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";
import {
  IconBirthChart,
  IconRings,
  IconBriefcase,
  IconClock,
  IconCalendarEvent,
  IconGem,
  IconSparkle,
} from "@/components/ui/Icon";

const SERVICES = [
  {
    Icon: IconBirthChart,
    name: "Birth chart analysis",
    desc: "A full reading of your D1 and D9 charts — strengths, challenges, and the dasha periods shaping your life.",
    price: "From ₹1,499",
  },
  {
    Icon: IconRings,
    name: "Marriage compatibility",
    desc: "Guna Milan and chart-to-chart analysis for couples weighing a serious commitment.",
    price: "From ₹1,999",
  },
  {
    Icon: IconBriefcase,
    name: "Career & finance",
    desc: "Timing for job changes, business moves, and investments, read through your 10th and 11th houses.",
    price: "From ₹1,799",
  },
  {
    Icon: IconClock,
    name: "Muhurta (auspicious timing)",
    desc: "Find the right moment for a wedding, launch, or housewarming based on planetary transits.",
    price: "From ₹999",
  },
  {
    Icon: IconCalendarEvent,
    name: "Annual predictions",
    desc: "A month-by-month forecast for the year ahead, grounded in your Varshaphal chart.",
    price: "From ₹2,499",
  },
  {
    Icon: IconGem,
    name: "Remedial measures",
    desc: "Practical, tradition-rooted remedies — gemstones, mantras, and rituals matched to your chart.",
    price: "From ₹1,299",
  },
  {
    Icon: IconSparkle,
    name: "Child naming",
    desc: "An auspicious name and starting syllable chosen from your child's nakshatra and Moon sign.",
    price: "From ₹1,499",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader eyebrow="Services" title="Guidance for every area of life" />

        <StaggerReveal
          stagger={0.08}
          amount={0.15}
          className="mt-sp-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-sp-5 lg:mt-sp-10"
        >
          {SERVICES.map((s) => (
            <StaggerItem key={s.name} className="h-full">
              <Card as="a" href="#pricing" className="flex h-full flex-col p-7">
                <s.Icon
                  size={28}
                  className="text-gold-400 transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="mt-sp-5 font-sans text-lg font-semibold text-text-primary">
                  {s.name}
                </h3>
                <p className="mt-sp-3 flex-1 font-sans text-sm leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
                <p className="mt-sp-5 font-sans text-sm font-medium text-gold-400">
                  {s.price}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
