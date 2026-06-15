"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import { IconForms, IconChartDots, IconCalendarEvent } from "@/components/ui/Icon";

const STEPS = [
  {
    Icon: IconForms,
    title: "Enter your birth details",
    desc: "Share your date, time, and place of birth. It takes less than a minute.",
  },
  {
    Icon: IconChartDots,
    title: "Get your chart instantly",
    desc: "Your Kundli is calculated and rendered on screen — D1 and D9, ready to explore.",
  },
  {
    Icon: IconCalendarEvent,
    title: "Book a deep reading",
    desc: "Sit with a certified astrologer who walks you through what your chart means.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section id="how-it-works" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader eyebrow="How it works" title="Three steps to clarity" />

        <div className="relative mt-sp-8 lg:mt-sp-10">
          {/* Connecting line — desktop only, behind the step orbs */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[16.67%] right-[16.67%] hidden h-px origin-left bg-copper-800 lg:block"
            style={{ top: 56 }}
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduced ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
          />

          <StaggerReveal
            stagger={0.2}
            amount={0.4}
            className="grid grid-cols-1 gap-sp-8 md:grid-cols-3 md:gap-sp-5"
          >
            {STEPS.map((step, i) => (
              <StaggerItem key={step.title} className="relative z-10 flex flex-col items-center text-center">
                {/* Icon (24px) above the step number */}
                <step.Icon size={24} className="text-gold-400" />

                {/* Brass orb step number (40px) */}
                <div className="brass-orb mt-sp-3 flex h-10 w-10 items-center justify-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,248,231,0.55)]">
                  <span className="font-sans text-sm font-semibold text-text-on-gold">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-sp-4 font-sans text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-sp-2 max-w-[260px] font-sans text-sm leading-relaxed text-text-secondary">
                  {step.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
