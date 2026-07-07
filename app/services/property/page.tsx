import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Property & Real Estate Astrology Guidance | Vedic Destiny",
  description:
    "Make confident property decisions with expert astrological guidance. Resolve land disputes, plan real estate investments, and secure long-term financial stability.",
};

const CHALLENGES = [
  "Delays in buying or selling real estate",
  "Cancellation of important deals",
  "Legal disputes or documentation problems",
  "Difficulty securing loans or approvals",
  "Confusion regarding investment timing",
  "Issues connected with ancestral assets",
  "Financial stress related to investments",
  "Uncertainty while selecting the right location or opportunity",
];

const REVEALS = [
  "Favorable periods for buying or selling",
  "Timing for profitable investments",
  "Chances of financial gain or loss",
  "Possibility of loan approval and financial flow",
  "Causes behind delays and recurring obstacles",
  "Guidance regarding inherited assets",
  "Remedies for disputes and legal concerns",
  "Suitable investment choices according to your horoscope",
  "Long-term stability and future growth possibilities",
];

const RIGHT_DIRECTION = [
  "Which type of investment is more suitable",
  "Whether a deal will bring stability or stress",
  "Favorable timing for major financial commitments",
  "Hidden risks connected with investments",
  "Better directions and locations for long-term benefits",
  "How to avoid unnecessary losses and delays",
];

const PROFESSIONAL_GUIDANCE = [
  "Buying and selling delays",
  "Investment confusion",
  "Legal and documentation issues",
  "Loan-related challenges",
  "Ancestral asset concerns",
  "Financial losses and deal cancellations",
  "Timing analysis for future opportunities",
];

const CONSULTATION_INCLUDES = [
  "Detailed horoscope analysis",
  "Easy-to-understand guidance",
  "Practical Vedic remedies",
  "Investment timing insights",
  "Personalized recommendations",
  "Complete confidentiality and privacy",
];

const WHY_TRUST = [
  "30+ years of professional experience",
  "Deep knowledge of Vedic Astrology and Vastu",
  "Structured and accurate analysis",
  "Practical and result-oriented solutions",
  "Honest guidance without exaggeration",
  "Personalized consultation approach",
  "Focus on clarity, stability, and long-term growth",
];

const RIGHT_MOVE = [
  "Avoid major financial setbacks",
  "Improve investment timing",
  "Resolve ongoing disputes",
  "Reduce delays and obstacles",
  "Strengthen long-term financial stability",
  "Make confident and informed decisions",
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
export default function PropertyServicePage() {
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
            eyebrow="Real Estate & Investments"
            title="Property Astrology & Real Estate Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Make Confident Property Decisions with Expert Astrological Guidance
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
                      Property decisions are among the most important financial and
                      emotional commitments in life. Whether you are planning to buy
                      a new home, invest in real estate, sell an existing asset, or
                      resolve legal issues related to land and ownership, the right
                      timing and proper guidance can make a significant difference. A
                      well-planned property decision can create financial stability,
                      long-term growth, and peace of mind, while a wrong move may lead
                      to stress, delays, or financial setbacks.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Property Astrology combines the wisdom of Vedic Astrology with
                      practical insight to help individuals make informed and confident
                      choices. Your birth chart contains important indications connected
                      with wealth, real estate, investments, inheritance, and future
                      financial security. By understanding planetary influences, it
                      becomes easier to identify favorable periods for important
                      transactions and avoid unnecessary risks.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CHALLENGES ────────── */}
          <div>
            <SectionHeader
              eyebrow="Common Challenges"
              title="Are You Facing Property-Related Challenges?"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Many people experience unexpected difficulties while dealing with
              property matters. Even after careful planning, delays and obstacles
              may arise due to unfavorable timing or planetary influences. Professional
              astrological guidance can help identify the root cause of these
              challenges and provide practical solutions.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              You may benefit from consultation if you are facing:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-4"
            >
              {CHALLENGES.map((c) => (
                <StaggerItem key={c}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4 h-full">
                    <GoldDot />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {c}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Understanding these factors can help reduce confusion and improve decision-making.
            </p>
          </div>

          {/* ────────── WHAT ASTROLOGY CAN REVEAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Property Astrology Can Reveal"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                A detailed horoscope analysis can provide valuable insights related to
                property matters and financial planning. Astrology helps identify
                opportunities, risk periods, and future possibilities connected with
                investments and ownership.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Consultation may reveal:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {REVEALS.map((item) => (
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
                      These insights help individuals make practical decisions with
                      greater confidence and clarity.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── RIGHT DIRECTION ────────── */}
          <div>
            <SectionHeader
              eyebrow="Strategic Planning"
              title="Choose the Right Direction for Long-Term Stability"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Every person has unique planetary combinations that influence financial
                growth, investment success, and decision-making ability. Through proper
                astrological analysis, you can understand which opportunities are most
                suitable according to your horoscope.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                This guidance can help you understand:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {RIGHT_DIRECTION.map((item) => (
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
                      Astrology does not replace practical planning. Instead, it supports
                      smarter and more balanced decisions by identifying favorable timing
                      and reducing uncertainty.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── PROFESSIONAL GUIDANCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Consultation"
              title="Professional Guidance for Real Estate Concerns"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                With years of experience in Vedic Astrology, Numerology, and Vastu,
                Soumitra Roy Chowdhury offers practical consultation for individuals
                dealing with complex property-related situations. The focus is always
                on accurate analysis, practical remedies, and realistic guidance
                rather than fear-based predictions.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Consultation support includes:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {PROFESSIONAL_GUIDANCE.map((item) => (
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
                      Each consultation is personalized according to the individual
                      horoscope and current planetary periods.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CONFIDENTIALITY ────────── */}
          <div>
            <SectionHeader
              eyebrow="Privacy"
              title="Personal Consultation with Complete Confidentiality"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                A one-on-one consultation provides detailed analysis and clear guidance
                based on your specific concerns and future goals. The process is simple,
                confidential, and focused on practical solutions.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Consultation Includes:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
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
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHY TRUST ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust & Authority"
              title="Why Clients Trust This Guidance"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Over the years, many clients across India and internationally have
                trusted this approach because of its practical and honest nature.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Key Reasons Include:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHY_TRUST.map((item) => (
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
                      The objective is always to help individuals make confident decisions
                      supported by proper timing and astrological insight.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── MAKE THE RIGHT MOVE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Timing"
              title="Make the Right Move at the Right Time"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Financial decisions connected with land, homes, and investments should
                never be rushed. Proper timing and informed planning can help avoid
                unnecessary stress and future complications. Astrology provides a deeper
                understanding of favorable opportunities and possible challenges so that
                decisions become more stable and rewarding.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                With the right guidance, you can:
              </p>
            </div>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-3"
            >
              {RIGHT_MOVE.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4 h-full">
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
                    Take the First Step Toward Financial Stability
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Do not let confusion, delays, or uncertainty prevent you from moving
                    forward. Expert astrological consultation can help you gain clarity
                    before making important financial commitments. Get personalized
                    guidance from Soumitra Roy Chowdhury and make decisions with
                    confidence, clarity, and proper timing.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Build Wealth with Clarity, Timing & Insight
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      When decisions align with favorable planetary influences, results
                      often become more stable, balanced, and rewarding. The right
                      guidance can help transform uncertainty into confidence and support
                      smarter long-term investment choices.
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
