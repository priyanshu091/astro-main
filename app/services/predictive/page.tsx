import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Predictive Guidance | Vedic Destiny",
  description:
    "Trusted predictive consultation through Astrology, Numerology, Vastu & Lal Kitab. Gain deeper awareness, clarity, and confidence for the future.",
};

const VEDIC_ASTROLOGY = [
  "Career & professional success",
  "Marriage & relationship compatibility",
  "Financial growth & stability",
  "Business opportunities & partnerships",
  "Health & emotional well-being",
  "Education & career planning",
  "Foreign travel & settlement opportunities",
  "Timing of important life events",
];

const COMMON_SEARCHES = [
  "Future prediction by date of birth",
  "Career prediction astrology",
  "Marriage prediction astrology",
  "Business success through horoscope",
  "When will good time start in life?",
];

const NUMEROLOGY = [
  "Life Path & Destiny Numbers",
  "Personal strengths and hidden talents",
  "Career suitability and business growth",
  "Relationship compatibility",
  "Name correction and vibrational harmony",
  "Favourable dates and opportunities",
];

const VASTU = [
  "Financial instability",
  "Career stagnation",
  "Family conflicts",
  "Lack of peace at home",
  "Business challenges",
  "Health-related disturbances",
];

const LAL_KITAB = [
  "Career obstacles and job delays",
  "Financial problems",
  "Relationship and family concerns",
  "Health challenges",
  "Planetary imbalances",
  "Emotional stress and instability",
];

const WHY_CHOOSE_US = [
  "Personalised predictive consultation",
  "Expertise in Astrology, Numerology, Vastu & Lal Kitab",
  "Professional and humane guidance",
  "Practical remedies and realistic insights",
  "Confidential and ethical consultation process",
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
export default function PredictiveServicePage() {
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
            eyebrow="Ancient Wisdom"
            title="Predictive Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Discover Insights for Life Through Ancient Wisdom
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
                    Trusted Predictive Consultation
                  </h3>
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Life often brings questions that leave us uncertain about
                      the future. Whether related to career, relationships,
                      finances, health, family, business, education, or personal
                      growth — many people seek clarity before making important
                      life decisions.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we believe prediction is not about fear,
                      blind faith, or creating dependency — it is about gaining
                      deeper awareness, clarity, and confidence. Through
                      time-tested systems of Vedic Astrology, Numerology, Vastu
                      Shastra, and Lal Kitab, we help individuals better
                      understand life patterns, opportunities, challenges, and
                      favourable timings.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Our predictive guidance is designed to be professional,
                      practical, compassionate, and solution-oriented, helping you
                      navigate life with greater confidence and peace of mind.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── THE ART OF PREDICTION ────────── */}
          <div>
            <SectionHeader
              eyebrow="Holistic Guidance"
              title="The Art of Prediction at Vedic Destiny"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Every individual’s life journey is unique. Ancient predictive
                sciences provide meaningful insights into personal strengths,
                challenges, karmic influences, and future possibilities.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                At Vedic Destiny, we integrate multiple predictive systems to
                offer deeper and more holistic guidance.
              </p>
            </div>
          </div>

          {/* ────────── SYSTEM 1: VEDIC ASTROLOGY ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Vedic Astrology Predictions
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Understand Your Life Through Your Birth Chart
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Vedic Astrology (Jyotish Shastra) is one of the most trusted
                    ancient sciences for understanding life events, opportunities,
                    and challenges. Your birth chart acts as a roadmap that
                    reveals important insights related to:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {VEDIC_ASTROLOGY.map((item) => (
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
                      Through detailed horoscope analysis, planetary periods (Dasha),
                      and transit study, we help you make better-informed life
                      decisions.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── LOOKING FOR ANSWERS ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-4">
                    Looking for Answers?
                  </h3>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-4">
                    Many people search for:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {COMMON_SEARCHES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-6">
                    <p className="font-sans text-[15px] font-bold text-gold-600">
                      At Vedic Destiny, we focus on providing practical guidance with
                      clarity and responsibility.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── SYSTEM 2: NUMEROLOGY ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Numerology Predictions
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Decode the Power of Numbers in Your Life
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Numbers influence personality traits, life path,
                    opportunities, relationships, and decision-making patterns.
                    Through Numerology consultation, we help you understand:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {NUMEROLOGY.map((item) => (
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
                      Whether for personal growth, business success, or life
                      planning, numerology can offer meaningful direction.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── SYSTEM 3: VASTU ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Vastu Guidance & Predictive Energy Balance
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Harmonise Your Home & Workplace
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    The energy of your surroundings can influence peace,
                    prosperity, health, relationships, and success. Vastu
                    Shastra helps identify energy imbalances in homes, offices,
                    shops, and workplaces. Our Vastu consultation can help address
                    concerns related to:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {VASTU.map((item) => (
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
                      Simple and practical Vastu corrections may help improve
                      harmony and positive energy flow.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── SYSTEM 4: LAL KITAB ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 border border-gold-400/10">
                  <h3 className="font-display text-[22px] font-bold text-text-primary mb-2">
                    Lal Kitab Remedies & Predictions
                  </h3>
                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Practical Remedies for Everyday Challenges
                  </p>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-sp-5 max-w-[800px]">
                    Lal Kitab is widely known for its practical and easy-to-follow
                    remedies designed to reduce life obstacles and strengthen
                    positive influences. Lal Kitab guidance may help with:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {LAL_KITAB.map((item) => (
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
                      Our approach focuses on practical, ethical, and meaningful
                      remedies that are simple to follow in everyday life.
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
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we combine traditional wisdom with practical
                understanding to offer guidance that is compassionate, confidential,
                and responsible.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                What Makes Us Different?
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
                      Find Clarity Before Making Important Decisions
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Life becomes easier when decisions are made with awareness and
                      confidence. Whether you are facing uncertainty, seeking answers,
                      or planning for the future, the right guidance can help
                      illuminate your path.
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
                    Begin Your Journey Towards Clarity
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Visit VedicDestiny.in to explore personalised predictive
                    consultations and discover insights through Vedic Astrology,
                    Numerology, Vastu, and Lal Kitab.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-sm italic font-medium leading-relaxed text-text-secondary">
                      The future cannot always be controlled — but it can be better understood.
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
