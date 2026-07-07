import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Birth Time Rectification | Vedic Destiny",
  description:
    "Discover the missing link in your destiny. Correct your birth time with authentic Vedic Astrology principles, life event matching, and deep horoscope analysis.",
};

const WHEN_TO_CONSIDER = [
  "You do not know your accurate birth time",
  "Your recorded birth time seems incorrect",
  "Horoscope predictions are not matching your real-life experiences",
  "You want accurate guidance for marriage, career, business, finances, children, or foreign settlement",
  "You are planning important remedies or life decisions based on astrology",
];

const LIFE_EVENTS = [
  "Education and career turning points",
  "Marriage or relationship experiences",
  "Financial ups and downs",
  "Health challenges",
  "Relocation or foreign travel",
  "Family and emotional patterns",
];

const VEDIC_EXAM = [
  "Lagna (Ascendant) corrections",
  "Planetary positions and house placements",
  "Dasha and Antardasha timing",
  "Transit validation (Gochar)",
  "Divisional Charts (Navamsha & others)",
];

const WHY_IT_MATTERS = [
  "Career & Business Predictions",
  "Marriage Compatibility & Timing",
  "Health Analysis",
  "Financial Growth & Investments",
  "Foreign Travel or Settlement Possibilities",
  "Children & Family Matters",
  "Property & Life Decisions",
  "Personalized Vedic Remedies",
];

const WHY_CHOOSE_US = [
  "Personalized attention",
  "Confidential consultation",
  "Detailed analysis based on authentic Vedic principles",
  "Honest guidance — no fear-based predictions",
  "Professional and compassionate support",
];

const FAQS = [
  {
    q: "Can my birth time really be corrected?",
    a: "Yes. Through careful analysis of major life events, planetary periods, and Vedic techniques, birth time can often be refined with a high degree of accuracy.",
  },
  {
    q: "What if I only know an approximate time?",
    a: "That is completely fine. Even an approximate birth window can help begin the rectification process.",
  },
  {
    q: "How long does the process take?",
    a: "The duration depends on complexity and available information. A detailed consultation ensures better accuracy.",
  },
  {
    q: "Is my information confidential?",
    a: "Absolutely. Your personal details and discussions remain strictly private and confidential.",
  },
];

/* ─────────────────────── tiny decorative icons ──────────────────────── */
function GoldCheckmark() {
  return (
    <svg
      className="mt-[3px] h-4 w-4 shrink-0 text-gold-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function GoldDot() {
  return (
    <span className="mt-[7px] block h-2 w-2 shrink-0 rounded-full bg-gold-400" />
  );
}

/* ═════════════════════════════ PAGE ═════════════════════════════ */
export default function BirthTimeServicePage() {
  return (
    <main>
      <Navbar />

      {/* ────────── HERO ────────── */}
      <section className="relative overflow-hidden bg-bg-void pb-sp-5 pt-[140px] lg:pb-sp-8 lg:pt-[180px]">
        {/* ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(184,146,40,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-content px-sp-5 text-center">
          <SectionHeader
            eyebrow="Precision Astrology"
            title="Birth Time Rectification"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Discover the Missing Link in Your Destiny
          </p>
        </div>
      </section>

      {/* ────────── MAIN CONTENT ────────── */}
      <section className="bg-bg-void pb-sp-16 lg:pb-24">
        <div className="mx-auto max-w-content px-sp-5 flex flex-col gap-sp-10 lg:gap-sp-16">
          
          {/* ────────── INTRODUCTION ────────── */}
          <div>
            <StaggerReveal amount={0.05} className="flex flex-col gap-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8">
                  <h3 className="font-display text-xl font-bold text-text-primary mb-sp-4">
                    Is Your Birth Time Accurate?
                  </h3>
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      In Vedic Astrology, even a difference of a few minutes in
                      birth time can significantly alter predictions related to
                      career, marriage, finances, health, relationships, and life
                      purpose. If your birth time is uncertain, approximate, or
                      remembered differently by family members, your horoscope may
                      not reflect your true life path.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we offer Professional Birth Time
                      Rectification (Janma Samay Shodhan) using authentic Vedic
                      Astrology principles, deep horoscope analysis, life event
                      matching, planetary timing, and intuitive astrological
                      expertise to determine your most accurate birth time.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Because when the foundation is correct, predictions become meaningful.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHAT IS IT ────────── */}
          <div>
            <SectionHeader
              eyebrow="Understanding"
              title="What is Birth Time Rectification?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Birth Time Rectification is a specialized astrological process used
                to identify or refine your exact birth time when:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 gap-sp-4">
                    {WHEN_TO_CONSIDER.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Since the Ascendant (Lagna) changes quickly, even a small
                      inaccuracy can affect your chart interpretation and planetary
                      influences. At Vedic Destiny, we carefully analyze your life
                      journey to align your horoscope with actual events and
                      energetic patterns.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── OUR APPROACH ────────── */}
          <div>
            <SectionHeader
              eyebrow="Methodology"
              title="Our Scientific & Spiritual Approach"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              We follow a detailed, compassionate, and professional process that combines:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-3"
            >
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-4">
                    Life Event Analysis
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-text-secondary mb-3">
                    We study significant milestones in your life such as:
                  </p>
                  <ul className="space-y-sp-2">
                    {LIFE_EVENTS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-4">
                    Vedic Horoscope Examination
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-text-secondary mb-3">
                    Deep analysis of:
                  </p>
                  <ul className="space-y-sp-2">
                    {VEDIC_EXAM.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-4">
                    Intuitive & Human-Centered
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-text-secondary">
                    Every individual’s destiny is unique. We do not rely only on
                    software calculations. We listen, understand, and guide with
                    empathy, clarity, and confidentiality.
                  </p>
                </Card>
              </StaggerItem>
            </StaggerReveal>

            <div className="mt-sp-6 max-w-[800px] rounded-xl bg-[rgba(184,146,40,0.05)] border border-gold-400/10 p-sp-5">
              <p className="font-sans text-[15px] italic leading-relaxed text-text-secondary">
                Our purpose is not just correcting a time — but helping you
                understand why certain events happened and what lies ahead.
              </p>
            </div>
          </div>

          {/* ────────── WHY IT MATTERS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Precision"
              title="Why Accurate Birth Time Matters"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                A rectified birth time can improve accuracy in:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {WHY_IT_MATTERS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      When the birth time is accurate, astrology becomes far more
                      precise and meaningful.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHY CHOOSE US ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Why Choose Vedic Destiny?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] font-bold text-gold-600 lg:text-base">
                Experienced Guidance with a Humane Approach
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we believe astrology should empower, not confuse.
                You receive:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHY_CHOOSE_US.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Our goal is simple: to help you align with your true destiny
                      through accurate astrological insight.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── FAQS ────────── */}
          <div>
            <SectionHeader
              eyebrow="FAQs"
              title="Frequently Asked Questions"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2"
            >
              {FAQS.map((faq) => (
                <StaggerItem key={faq.q}>
                  <Card className="h-full p-sp-6 border border-gold-400/10 bg-[rgba(184,146,40,0.02)]">
                    <h3 className="font-display text-[16px] font-bold text-text-primary mb-sp-2">
                      {faq.q}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-text-secondary">
                      {faq.a}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* ────────── BOOK CONSULTATION CTA ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="relative overflow-hidden p-sp-8 lg:p-sp-10 text-center">
                  {/* decorative glow */}
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(184,146,40,0.15) 0%, transparent 60%)",
                    }}
                  />

                  <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                    Begin Your Journey Toward Accurate Guidance
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Your destiny deserves clarity. If your horoscope has never
                    fully resonated with your life experiences, it may be time to
                    discover the correct birth time hidden within your life journey.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Book Your Birth Time Rectification Consultation Today
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Vedic Destiny – Guiding You with Wisdom, Accuracy & Compassion
                    </p>
                  </div>

                  <div className="mt-sp-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-sans text-sm font-bold text-text-on-gold shadow-lg transition-all duration-200 hover:bg-gold-500 hover:shadow-xl"
                    >
                      Connect Now
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
