import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Remedial Solutions | Vedic Destiny",
  description:
    "Powerful & practical remedies in Astrology, Numerology, Vastu, & Lal Kitab to bring positive transformation and balance to your life.",
};

const ASTROLOGY_REMEDIES = [
  "Strengthening favourable planets",
  "Reducing negative planetary effects",
  "Improving career and financial stability",
  "Enhancing relationship harmony",
  "Supporting mental peace and emotional balance",
  "Timing important actions for better results",
];

const NUMEROLOGY_REMEDIES = [
  "Name correction and vibration alignment",
  "Business name optimisation for growth",
  "Improving luck cycles and opportunities",
  "Enhancing personal confidence and clarity",
  "Selecting favourable dates and numbers",
  "Strengthening life path energy",
];

const VASTU_REMEDIES = [
  "Financial blocks and business stagnation",
  "Stress and lack of peace at home",
  "Career obstacles and workplace challenges",
  "Health-related disturbances",
  "Relationship conflicts within family spaces",
  "Energy imbalance in homes, offices, or shops",
];

const LAL_KITAB_REMEDIES = [
  "Overcoming career and job delays",
  "Improving financial conditions",
  "Reducing relationship misunderstandings",
  "Resolving repeated life obstacles",
  "Strengthening planetary weaknesses",
  "Bringing stability in uncertain phases",
];

const WHY_CHOOSE_US = [
  "Ethical and responsible guidance",
  "Personalized remedies based on analysis",
  "Practical solutions instead of fear-based suggestions",
  "Confidential and compassionate consultation",
  "Integration of Astrology, Numerology, Vastu & Lal Kitab",
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

/* ═════════════════════════════ PAGE ═════════════════════════════ */
export default function RemedialSolutionsPage() {
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
            eyebrow="Positive Transformation"
            title="Remedial Solutions"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Powerful & Practical Remedies in Astrology, Numerology, Vastu & Lal Kitab
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
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Life is full of challenges — some visible, some subtle, and
                      some that repeat despite our best efforts. Delays in career
                      growth, financial instability, relationship struggles, health
                      concerns, or mental stress often leave people feeling
                      confused and stuck.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we believe that remedies are not about
                      superstition or fear — they are about restoring balance,
                      improving awareness, and creating positive energetic alignment
                      in life. Through time-tested systems like Vedic Astrology,
                      Numerology, Vastu Shastra, and Lal Kitab, we provide practical
                      and ethical remedial guidance that supports emotional
                      well-being, clarity, and life improvement.
                    </p>
                    <div className="mt-sp-6 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-4 border border-gold-400/10">
                      <p className="font-sans text-sm font-medium text-gold-600 text-center uppercase tracking-wide">
                        Understand the problem → Identify the root cause → Offer practical remedies → Support positive change
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── ASTROLOGY REMEDIES ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Astrology-Based Remedies
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Balance Planetary Influences for Better Life Flow
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    In Vedic Astrology, planetary positions influence different areas
                    of life such as career, relationships, health, and finances.
                    When certain planetary energies become weak or imbalanced,
                    challenges may arise. Our astrological remedial guidance helps you with:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {ASTROLOGY_REMEDIES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-6 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-4 border border-gold-400/10">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Remedies may include personalised suggestions such as mantras,
                      rituals, lifestyle adjustments, donations, or spiritual
                      practices — always shared in a practical and responsible manner.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── NUMEROLOGY REMEDIES ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Numerology Remedies
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Align Your Life With Positive Number Vibrations
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Numbers carry energetic frequencies that influence personality,
                    decision-making, and life outcomes. When numbers in your name,
                    date of birth, or business alignment are imbalanced, challenges
                    may arise. Our Numerology remedial consultation helps in:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {NUMEROLOGY_REMEDIES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-6 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-4 border border-gold-400/10">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Even small numerical adjustments can create meaningful
                      improvements in personal and professional life.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── VASTU REMEDIES ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Vastu Remedies
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Restore Harmony in Your Living and Working Spaces
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Your environment has a direct impact on your thoughts, emotions,
                    health, and success. Vastu Shastra focuses on balancing spatial
                    energies to create harmony and prosperity. Our Vastu remedial
                    guidance helps address issues such as:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {VASTU_REMEDIES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-6 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-4 border border-gold-400/10">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      We provide simple, practical, and non-destructive Vastu
                      remedies that can be implemented without major structural
                      changes in most cases.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── LAL KITAB REMEDIES ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Lal Kitab Remedies
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Simple, Effective & Practical Solutions for Life Problems
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Lal Kitab remedies are known for their simplicity and powerful
                    impact. They focus on correcting planetary imbalances through
                    easy and practical steps that can be followed in daily life.
                    Our Lal Kitab guidance may support you in:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {LAL_KITAB_REMEDIES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-6 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-4 border border-gold-400/10">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      These remedies are designed to be simple, ethical, and
                      accessible, making them suitable for everyday application.
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
              title="Why Choose Remedial Guidance from Vedic Destiny?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we understand that every individual’s situation is
                unique. Our remedial solutions are not generic — they are carefully
                personalised after understanding your life pattern and challenges.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Our Approach Includes:
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
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Move From Problem to Possibility
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Life challenges are not permanent — they are signals guiding
                      you toward balance and growth. With the right remedial
                      direction, many individuals experience improved clarity,
                      confidence, and stability.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
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
                    Take the First Step Towards Positive Change
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Visit VedicDestiny.in to explore personalised remedial
                    consultations and discover how Astrology, Numerology, Vastu,
                    and Lal Kitab can help bring balance and positivity into your
                    life.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-sm italic font-medium leading-relaxed text-text-secondary">
                      When energy aligns, life begins to flow in the right direction.
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

                  {/* Sets the paid-service expectation right where the visitor is
                      being asked to book. */}
                  <p className="mt-sp-4 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600">
                    Paid consultation services only
                  </p>
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
