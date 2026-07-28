"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const CLARITY_POINTS = [
  "Career growth and business success",
  "Marriage and relationship compatibility",
  "Financial opportunities and stability",
  "Health and emotional well-being",
  "Property, Vastu, and family harmony",
  "Life purpose and spiritual growth",
];

const FAQS: AccordionItem[] = [
  {
    q: "Is Vedic Astrology accurate?",
    a: "Vedic Astrology is an ancient system based on planetary positions and birth details. The accuracy depends on precise birth information and detailed analysis by an experienced practitioner.",
  },
  {
    q: "Can astrology help with career and relationships?",
    a: "Astrological guidance can offer insights into timing, strengths, opportunities, compatibility, and decision-making in important life areas.",
  },
  {
    q: "Do you provide remedies?",
    a: "Yes, suitable remedies may be suggested based on individual analysis and personal circumstances.",
  },
  {
    q: "Is consultation confidential?",
    a: "Absolutely. Every consultation is conducted with complete privacy and professionalism.",
  },
];

export default function VedicWisdom() {
  const reduced = useReducedMotion() ?? false;

  const fadeUp = (delay = 0) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      id="vedic-wisdom"
      className="bg-bg-void border-t border-[rgba(184,146,40,0.08)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(212,168,83,0.04) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        {/* ─── Hero Header ─── */}
        <SectionHeader
          eyebrow="Ancient Wisdom"
          title="Discover the Wisdom of Vedic Astrology"
          align="center"
        />

        {/* ─── Intro Paragraphs ─── */}
        <motion.div
          {...fadeUp(0.1)}
          className="mx-auto mt-sp-8 max-w-[780px] space-y-sp-5 text-center"
        >
          <p className="font-sans text-base leading-[1.75] text-text-secondary">
            At Vedic Destiny, we believe that every life follows a unique cosmic design. Rooted in the ancient wisdom of Vedic Astrology, our guidance helps you understand the deeper patterns influencing your career, relationships, finances, health, and life purpose.
          </p>
          <p className="font-sans text-base leading-[1.75] text-text-secondary">
            Vedic Astrology, also known as <span className="font-semibold text-text-primary">Jyotish Shastra</span>, is a time-tested science that studies planetary positions and their influence on human life. More than prediction, it is a guiding light that helps individuals make informed decisions, overcome challenges, and move forward with greater confidence.
          </p>
          <p className="font-sans text-base leading-[1.75] text-text-secondary">
            Whether you are facing uncertainty in career, delays in marriage, financial instability, emotional stress, or seeking clarity about your future, personalized astrological guidance can reveal hidden opportunities and practical solutions.
          </p>
        </motion.div>

        {/* ─── Our Approach + Why Choose ─── */}
        <div className="mt-sp-10 grid grid-cols-1 gap-sp-8 lg:grid-cols-2 lg:mt-24">
          {/* Our Approach Card */}
          <motion.div
            {...fadeUp(0.15)}
            className="rounded-card border border-[rgba(184,146,40,0.1)] bg-bg-cosmos p-7 lg:p-8"
            style={{
              backgroundImage:
                "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
            }}
          >
            <span className="eyebrow text-gold-400">Our Approach</span>
            <h3 className="font-display mt-sp-3 text-xl font-bold leading-[1.2] text-text-primary lg:text-2xl">
              Personalized Vedic Guidance
            </h3>
            <p className="mt-sp-4 font-sans text-[15px] leading-[1.75] text-text-secondary">
              At Vedic Destiny, every consultation is personalized and based on detailed horoscope analysis rather than generalized assumptions. By carefully studying planetary placements, dashas, transits, and karmic influences, we provide meaningful insights with practical remedies that are relevant to modern life.
            </p>

            <p className="mt-sp-5 font-sans text-sm font-semibold text-text-primary">
              Our consultations may help you gain clarity on:
            </p>
            <ul className="mt-sp-3 space-y-2">
              {CLARITY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 font-sans text-[15px] text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose Card */}
          <motion.div
            {...fadeUp(0.25)}
            className="rounded-card border border-[rgba(184,146,40,0.1)] bg-bg-cosmos p-7 lg:p-8"
            style={{
              backgroundImage:
                "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
            }}
          >
            <span className="eyebrow text-gold-400">Why Us</span>
            <h3 className="font-display mt-sp-3 text-xl font-bold leading-[1.2] text-text-primary lg:text-2xl">
              Why Choose Vedic Destiny?
            </h3>
            <p className="mt-sp-4 font-sans text-[15px] leading-[1.75] text-text-secondary">
              With a compassionate and professional approach, we combine traditional Vedic wisdom with practical guidance to help individuals make confident life decisions. Our goal is not to create fear, but to provide clarity, direction, and positive transformation.
            </p>

            {/* Highlighted callout */}
            <div className="mt-sp-5 rounded-input border-l-[3px] border-l-gold-400 bg-[rgba(184,146,40,0.04)] px-5 py-4">
              <p className="font-sans text-[15px] italic leading-[1.7] text-text-primary">
                Your destiny is not fixed — understanding the right timing and energies can help you make better choices and unlock your true potential.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-sp-8">
              <p className="mb-sp-4 font-sans text-[15px] text-text-secondary">
                Book your personalized consultation today and take the first step toward clarity, balance, and a more fulfilling future.
              </p>
              <Button
                as="a"
                href="#contact"
                variant="primary"
                size="lg"
              >
                Book a Consultation
              </Button>
              {/* Live homepage booking CTA — set the paid expectation here. */}
              <p className="mt-sp-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600">
                Paid consultation services only
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── FAQ ─── */}
        <motion.div {...fadeUp(0.2)} className="mx-auto mt-sp-10 max-w-[720px] lg:mt-24">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            align="center"
          />
          <div className="mt-sp-8 lg:mt-sp-10">
            <Accordion items={FAQS} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
