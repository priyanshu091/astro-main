import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Court Case & Legal Astrology Guidance | Vedic Destiny",
  description:
    "Gain clarity, confidence, and direction in court cases and legal matters with trusted Vedic Astrology guidance.",
};

const CHALLENGES = [
  "Ongoing court cases or litigation",
  "Property disputes or inheritance-related conflicts",
  "Divorce, separation, or family court matters",
  "Child custody concerns",
  "Delays or complications in court proceedings",
  "False allegations or legal pressure",
  "Anxiety regarding judgments or future consequences",
  "Uncertainty about the strength of the opposition",
  "Stress related to court documentation or disputes",
];

const REVEALS = [
  {
    title: "Possibility of Legal Disputes in the Horoscope",
    desc: "Certain planetary combinations may indicate tendencies toward disputes, litigation, conflicts, or complications.",
  },
  {
    title: "Chances of Success or Setbacks",
    desc: "Astrological analysis can help identify periods that may support progress, resolution, or challenges within the case.",
  },
  {
    title: "Favorable & Unfavorable Time Periods",
    desc: "Timing plays an important role in legal matters. Astrology helps identify supportive phases for hearings, negotiations, settlements, or judgments.",
  },
  {
    title: "Strengths & Weaknesses of Opposition",
    desc: "Understanding the planetary influences connected with competitors or opponents can provide strategic awareness and emotional preparedness.",
  },
  {
    title: "Possibility of Delays or Resolution",
    desc: "Some charts indicate prolonged processes, while others support faster resolution and compromise.",
  },
  {
    title: "Presence of Stress-Creating Yogas",
    desc: "Certain planetary combinations may create mental pressure, conflict, emotional instability, or stress, which can be better managed through awareness and remedies.",
  },
  {
    title: "Guidance for Decision-Making",
    desc: "Astrology helps individuals approach situations with improved planning, patience, and timing awareness.",
  },
];

const DIFFERENT_MATTERS = [
  {
    title: "Divorce & Family Court Cases",
    desc: "Guidance related to separation, emotional conflict, family disputes, and proceedings connected with relationships.",
  },
  {
    title: "Property & Inheritance Disputes",
    desc: "Support for issues related to land, ownership, ancestral assets, inheritance claims, and documentation conflicts.",
  },
  {
    title: "Child Custody Matters",
    desc: "Understanding emotional, and timing-related influences connected with custody concerns.",
  },
  {
    title: "Government & Administrative Matters",
    desc: "Insight into delays, approvals, official complications, and administrative legal concerns.",
  },
  {
    title: "Civil & Personal Litigation",
    desc: "Analysis related to ongoing disputes, financial disagreements, personal matters, and conflict resolution possibilities.",
  },
];

const UNDERSTANDING_LIST = [
  "Periods of struggle and relief",
  "Possibility of settlement or prolonged litigation",
  "Strength of opposition or competitors",
  "Emotional impact of legal pressure",
  "The role of effort, patience, and timing",
  "Favorable periods for progress or judgment",
];

const STRATEGIC_GUIDANCE = [
  "Whether the case is moving in a favorable direction",
  "How to approach difficult legal phases",
  "Timing for hearings, negotiations, or outcomes",
  "Ways to reduce stress and emotional confusion",
  "Supportive remedies for clarity and mental stability",
  "How to align important actions with favorable periods",
];

const EVALUATE_MATTERS = [
  "Progress and flow of the case",
  "Pressure periods and emotional challenges",
  "Delays and possible causes behind them",
  "Personal mental and emotional impact",
  "Decision-making timing and preparation",
];

const WHY_SEEK = [
  "Better understanding of complex legal situations",
  "Structured analysis based on Vedic Astrology",
  "Practical and timing-based guidance",
  "Personalized and confidential consultation",
  "Ethical approach without fear-based predictions",
  "Emotional clarity during stressful periods",
];

const GREATER_CONFIDENCE = [
  "Understand the timing more clearly",
  "Reduce emotional stress and anxiety",
  "Make informed decisions during proceedings",
  "Stay mentally prepared for possible outcomes",
  "Approach the situations with patience and clarity",
];

const CTA_POINTS = [
  "Understand case timing and its flow",
  "Gain clarity before important decisions",
  "Improve emotional balance during disputes",
  "Navigate challenges with awareness and confidence",
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
export default function LegalServicePage() {
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
            eyebrow="Court & Legal Matters"
            title="Court Case Astrological Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Gain Clarity, Confidence & Direction in Court Case Matters with Trusted Astrology Guidance
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
                      Court-related matters can create significant emotional,
                      mental, and financial pressure. Whether the issue is related
                      to property, family matters, inheritance, business
                      disagreements, or ongoing litigation, uncertainty about the
                      future often increases stress and confusion. Many individuals
                      struggle to understand the direction of their case, possible
                      outcomes, and the right timing for important decisions.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Astrology provides a deeper perspective into such situations
                      by analysing planetary influences, timing cycles, and patterns
                      within the birth chart. While astrology does not replace
                      advice or judicial processes, it can offer valuable insight,
                      awareness, and guidance to help individuals approach the
                      challenges with greater preparation and clarity.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CHALLENGES ────────── */}
          <div>
            <SectionHeader
              eyebrow="Common Concerns"
              title="Are You Facing Court-Related Challenges?"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Many people experience prolonged stress and uncertainty during disputes.
              Delays, opposition pressure, emotional exhaustion, and confusion
              regarding outcomes can make decision-making difficult.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              You may benefit from Astrology consultation if you are facing:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-3"
            >
              {CHALLENGES.map((c) => (
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
              Astrological guidance helps individuals better understand timing,
              risk periods, and possible developments connected with their case.
            </p>
          </div>

          {/* ────────── WHAT ASTROLOGY CAN REVEAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Legal Astrology Can Reveal"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Through detailed horoscope analysis and planetary study, astrology can
              provide valuable insights into such matters and court-related situations.
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {REVEALS.map((r) => (
                <StaggerItem key={r.title}>
                  <Card interactive className="flex h-full flex-col p-sp-6">
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
          </div>

          {/* ────────── DIFFERENT MATTERS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Coverage"
              title="Guidance for Different Types of Court Matters"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              This consultation covers a wide range of court-related situations, including:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {DIFFERENT_MATTERS.map((r) => (
                <StaggerItem key={r.title}>
                  <Card interactive className="flex h-full flex-col p-sp-6">
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

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Each case is studied carefully with focus on clarity, timing, and
              practical awareness.
            </p>
          </div>

          {/* ────────── UNDERSTANDING COURT CASES ────────── */}
          <div>
            <SectionHeader
              eyebrow="Understanding"
              title="Understanding Court Cases Through Astrology"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                A birth chart often reveals important patterns connected with court
                struggles, emotional pressure, delays, and opportunities for resolution.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Astrology can help individuals understand:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {UNDERSTANDING_LIST.map((item) => (
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
                      This understanding can help individuals remain mentally
                      stronger and more emotionally balanced during difficult situations.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── STRATEGIC GUIDANCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Decisions"
              title="Strategic Guidance for Better Decision-Making"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Acharya Soumitra Roy Chowdhury provides practical astrological insight designed
                to help individuals to navigate court matters more carefully and
                confidently.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Consultation may help you understand:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {STRATEGIC_GUIDANCE.map((item) => (
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
                      The purpose of guidance is not to create fear but to improve
                      awareness and decision-making ability.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── EVALUATE MATTERS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Evaluation"
              title="Evaluate Your Court Matters More Clearly"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                In addition to timing analysis, consultation may also help individuals
                better evaluate the overall direction and impact of their legal
                matters.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                This includes understanding:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {EVALUATE_MATTERS.map((item) => (
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
                      Astrology offers perspective and insight that can help
                      individuals remain more focused and prepared.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHY INDIVIDUALS SEEK ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Why Individuals Seek This Guidance"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Many people seek Astrology consultation because it provides balanced,
                ethical, and practical insight during emotionally challenging situations.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Key reasons include:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHY_SEEK.map((item) => (
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
                      The focus always remains on awareness, preparation, and practical
                      understanding rather than unrealistic promises.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── GREATER CONFIDENCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Confidence"
              title="Move Through Court Challenges with Greater Confidence"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Court cases can create uncertainty and emotional exhaustion, but the
              right guidance can help reduce confusion and improve clarity.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              With proper awareness, you can:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-3"
            >
              {GREATER_CONFIDENCE.map((item) => (
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
                    Take the First Step Towards Better Clarity
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Do not allow uncertainty and stress to control your peace of
                    mind. Get personalized Astrology consultation from Soumitra Roy
                    Chowdhury and gain practical insight into your case timing &
                    challenges, and future possibilities.
                  </p>

                  <h3 className="mt-sp-8 font-display text-xl font-bold text-gold-600">
                    Consultation Can Help You:
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

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Guidance That Brings Awareness, Not Fear
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Acharya Soumitra Roy Chowdhury provides trusted guidance based on Vedic
                      Astrology to help individuals navigate court-related challenges
                      with clarity, timing awareness, and practical insight. The goal
                      is to help you face difficult situations with greater confidence,
                      emotional balance, and informed decision-making.
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
