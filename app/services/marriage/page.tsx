import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Marriage Guidance & Compatibility Consultation | Vedic Destiny",
  description:
    "Find clarity, harmony & the right life partner with trusted astrology guidance. Detailed Kundli matching, relationship compatibility, and personalized marriage consultation.",
};

const CONCERNS = [
  "Delay in Marriage despite continuous efforts",
  "Difficulty finding the right life partner",
  "Confusion regarding love or arranged relationships",
  "Emotional instability or lack of understanding",
  "Fear of incompatibility or future conflicts in Marriage",
  "Concerns about family acceptance or inter-caste unions",
  "Stress related to emotional bonding or long-term commitment",
  "Fear of separation or emotional disconnect",
  "Uncertainty regarding foreign settlement or overseas alliances",
];

const REVEALS = [
  {
    title: "Timing & Favorable Periods",
    desc: "Discover suitable phases according to your horoscope and planetary positions.",
  },
  {
    title: "Life Partner Insights",
    desc: "Understand the personality, mindset, career potential, financial stability, values, and emotional compatibility of your future partner.",
  },
  {
    title: "Compatibility Analysis",
    desc: "Evaluate emotional bonding, communication, trust, mental understanding, and long-term harmony.",
  },
  {
    title: "Future Relationship Stability",
    desc: "Gain clarity about emotional growth, responsibilities, adjustments, and future possibilities.",
  },
  {
    title: "Family & In-Law Relationships",
    desc: "Understand the family environment, support system, and possible adjustments after commitment.",
  },
  {
    title: "Love or Arranged Union Possibilities",
    desc: "Identify planetary combinations supporting love relationships, arranged alliances, or inter-caste unions.",
  },
  {
    title: "Overseas Possibilities",
    desc: "Explore opportunities related to settlement abroad or relationships connected with foreign countries.",
  },
];

const KUNDLI_POINTS = [
  "Emotional understanding and bonding",
  "Long-term compatibility and stability",
  "Possibility of conflicts or misunderstandings",
  "Strength of trust and communication",
  "Financial and family harmony",
  "Risk of emotional distance or separation",
];

const REMEDIES = [
  "Manglik Dosh (Mangal Dosha) remedies",
  "Delay-related solutions",
  "Conflict resolution",
  "Strengthening emotional bonding",
  "Prevention of separation or misunderstandings",
  "Family acceptance and harmony",
  "Peaceful and stable relationships",
];

const CONSULTATION_INCLUDES = [
  "Detailed horoscope-based analysis",
  "Accurate compatibility insights",
  "Personalized guidance based on your birth chart",
  "Practical solutions and remedies",
  "Honest advice without exaggeration",
  "Clear answers to important relationship questions",
];

const IDEAL_FOR = [
  "Individuals planning their future",
  "People facing delays or obstacles",
  "Couples seeking compatibility guidance",
  "Individuals dealing with emotional challenges",
  "Families seeking Kundli Matching",
  "Anyone looking for clarity before making a life-changing decision",
];

const BENEFITS = [
  "Choose the right life partner",
  "Avoid future misunderstandings and conflicts",
  "Strengthen emotional connection and trust",
  "Improve long-term harmony and stability",
  "Make informed and confident decisions",
  "Create happiness and emotional security",
];

const CTA_POINTS = [
  "Get Personalized Kundli Analysis",
  "Receive Practical Relationship Guidance",
  "Understand Your Compatibility Potential",
  "Begin Your Journey Towards a Happy and Balanced Life",
];

/* ─────────────────────── tiny decorative icons ──────────────────────── */
function GoldDot() {
  return (
    <span className="mt-[7px] block h-2 w-2 shrink-0 rounded-full bg-gold-400" />
  );
}

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
export default function MarriageServicePage() {
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
            eyebrow="Marriage & Compatibility"
            title="Marriage Guidance & Compatibility Consultation"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Find Clarity, Harmony &amp; the Right Life Partner with Trusted
            Astrology Guidance
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
                      Marriage is one of the most meaningful and life-changing
                      decisions in life. It is not just a social bond but an
                      emotional and spiritual partnership built on trust,
                      understanding, love, and shared responsibilities. While this
                      journey brings happiness and companionship, many individuals
                      experience confusion, delays, emotional stress, or
                      uncertainty before taking such an important step.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Whether you are searching for the right life partner, facing
                      repeated obstacles in relationships, or seeking answers about
                      your future, the right astrological guidance can help you
                      make informed and confident decisions.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Astrology provides valuable insight into compatibility,
                      relationship timing, emotional harmony, and long-term
                      stability through detailed Kundli (birth chart) analysis. By
                      understanding planetary influences, individuals can gain
                      clarity about their relationships and avoid unnecessary
                      emotional struggles or future conflicts.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CONCERNS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Common Concerns"
              title="Are You Facing Marriage & Relationship Concerns?"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Many people experience emotional confusion and uncertainty in
              marriage despite sincere efforts. Astrology helps uncover hidden
              causes behind delays, misunderstandings, and recurring challenges.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              You may benefit from consultation if you are facing:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-3"
            >
              {CONCERNS.map((c) => (
                <StaggerItem key={c}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
                    <GoldDot />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {c}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Astrological guidance offers practical insight to help you move
              forward with greater confidence and emotional balance.
            </p>
          </div>

          {/* ────────── WHAT ASTROLOGY CAN REVEAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Astrology Can Reveal About Your Future"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              A detailed horoscope analysis can provide valuable answers related
              to relationships, compatibility, and long-term harmony. Astrology
              helps identify favorable timing, emotional compatibility,
              relationship patterns, and possible future challenges.
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {REVEALS.map((r) => (
                <StaggerItem key={r.title}>
                  <Card
                    interactive
                    className="flex h-full flex-col p-sp-6"
                  >
                    <div className="mb-sp-4 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(184,146,40,0.08)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {r.title}
                    </h3>
                    <p className="mt-sp-2 flex-1 font-sans text-sm leading-relaxed text-text-secondary">
                      {r.desc}
                    </p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-8 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Astrology does not simply predict future events—it helps individuals
              make wiser and more balanced life decisions.
            </p>
          </div>

          {/* ────────── KUNDLI MATCHING ────────── */}
          <div>
            <SectionHeader
              eyebrow="Compatibility"
              title="Kundli Matching – The Foundation of Long-Term Harmony"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Kundli Matching is an important process in Vedic Astrology
                that helps evaluate compatibility between two individuals. It
                is not merely a ritual but a detailed system designed to
                understand emotional, mental, physical, and spiritual
                compatibility.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Proper matching helps identify:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {KUNDLI_POINTS.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      A strong compatibility analysis can help couples build a
                      healthier and more harmonious future together.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── PRACTICAL SOLUTIONS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Remedies"
              title="Practical Solutions for Relationship Challenges"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              If your horoscope shows obstacles, conflicts, or delays, the right
              remedies can help reduce negative influences and improve harmony.
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {REMEDIES.map((r) => (
                <StaggerItem key={r}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
                    <GoldCheckmark />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {r}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              All remedies are practical, ethical, simple to follow, and focused on
              positive transformation rather than fear-based predictions.
            </p>
          </div>

          {/* ────────── HOW SOUMITRA HELPS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Your Guide"
              title="How Acharya Soumitra Roy Chowdhury Helps You"
            />
            <p className="mt-sp-5 font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base max-w-[700px]">
              With years of experience in Vedic Astrology, relationship
              analysis, Numerology, and Vastu, Acharya Soumitra Roy Chowdhury provides
              honest and personalized guidance designed to help individuals
              make confident life decisions.
            </p>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-5">
                    Consultation Includes
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {CONSULTATION_INCLUDES.map((item) => (
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
                      Every consultation focuses on clarity, emotional balance,
                      and practical guidance for real-life situations.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── IDEAL FOR ────────── */}
          <div>
            <SectionHeader
              eyebrow="Who It's For"
              title="Ideal for Every Stage of Your Journey"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Whether you are single, engaged, in a relationship, or already
              committed, astrological guidance can help you better understand your
              emotional path and future possibilities.
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {IDEAL_FOR.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
                    <GoldDot />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* ────────── BUILD A HAPPY FUTURE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Your Future"
              title="Build a Happy, Stable & Harmonious Future"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              A successful partnership is not only about finding the right
              person—it is also about timing, understanding, emotional maturity,
              and conscious decision-making.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              With the right guidance, you can:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {BENEFITS.map((b) => (
                <StaggerItem key={b}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
                    <GoldCheckmark />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {b}
                    </span>
                  </div>
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
                    Take the Right Step Towards a Better Future
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Do not leave one of life&apos;s most important decisions to
                    confusion or uncertainty. Get trusted astrology guidance from
                    Acharya Soumitra Roy Chowdhury and gain clarity about your future
                    partner, compatibility, timing, and relationship journey.
                  </p>

                  <h3 className="mt-sp-8 font-display text-xl font-bold text-gold-600">
                    Book Your Consultation Today
                  </h3>

                  <ul className="mx-auto mt-sp-5 flex max-w-md flex-col gap-sp-3 text-left">
                    {CTA_POINTS.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mx-auto mt-sp-6 max-w-[580px] font-sans text-sm italic leading-relaxed text-text-secondary">
                    When decisions are made with clarity and proper timing,
                    relationships become stronger, healthier, and more fulfilling.
                  </p>

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
