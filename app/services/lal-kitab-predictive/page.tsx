import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Lal Kitab Predictive Guidance | Vedic Destiny",
  description:
    "Real-life predictions based on Lal Kitab wisdom. Understand your life through practical astrology, empowering you to move forward with clarity.",
};

const WHAT_IT_REVEALS = [
  "Career growth, job changes, and professional stability",
  "Financial ups and downs and income patterns",
  "Marriage, relationships, and emotional connections",
  "Health trends and lifestyle influences",
  "Family dynamics and domestic peace",
  "Business opportunities and challenges",
  "Periods of struggle, transformation, and success",
];

const CAREER_PREDICTIONS = [
  "When career growth opportunities are likely to arise",
  "Phases of job stability or transition",
  "Chances of job change or professional shift",
  "Periods of struggle or workplace pressure",
  "Direction for long-term professional improvement",
];

const FINANCIAL_PREDICTIONS = [
  "Periods of financial improvement or slowdown",
  "Patterns of unexpected expenses or savings growth",
  "Business expansion opportunities",
  "Stability in income sources",
  "Timing of financial decisions and investments",
];

const RELATIONSHIP_PREDICTIONS = [
  "Relationship stability and emotional bonding",
  "Possibilities of misunderstandings or distance",
  "Marriage timing and relationship development",
  "Family harmony or stress periods",
  "Emotional cycles affecting personal life",
];

const HEALTH_PREDICTIONS = [
  "Periods of low energy or stress",
  "Emotional imbalance and mental pressure phases",
  "General health sensitivity periods",
  "Lifestyle influences on overall vitality",
];

const WHY_UNIQUE = [
  "Easy to understand and apply in real life",
  "Based on personalised birth chart analysis",
  "Focused on clarity, not confusion or fear",
  "Designed to support better decision-making",
  "Delivered with ethical and compassionate guidance",
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
export default function LalKitabPredictivePage() {
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
            eyebrow="Understand Your Life"
            title="Lal Kitab Predictive Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Through Practical Astrology and Real-Life Predictions
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
                      Life often moves through phases of uncertainty—some filled with progress, and some marked by repeated challenges, delays, or confusion. During such times, people naturally seek clarity about their future, relationships, career, finances, and overall direction in life.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Lal Kitab predictive astrology offers a uniquely practical and grounded approach to understanding life patterns. Unlike complex interpretations, Lal Kitab focuses on real-life outcomes, simple principles, and actionable insights that reflect how planetary energies influence everyday experiences.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we provide personalised Lal Kitab predictive consultation designed to help you understand what your current life phase indicates—and how to move forward with clarity and confidence.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Our approach is professional, ethical, and deeply humane, focusing on guidance that empowers rather than creates fear.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHAT IT REVEALS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Lal Kitab Predictions Reveal"
            />
            <div className="mt-sp-5 space-y-4 max-w-[800px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Lal Kitab astrology is known for its practical predictive system that highlights how life unfolds through karmic patterns and planetary influences.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Through detailed analysis, Lal Kitab predictions can provide insights into:
              </p>
            </div>
            
            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHAT_IT_REVEALS.map((item) => (
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
                      Instead of overwhelming technical language, Lal Kitab predictions focus on clear, understandable life indications that help you make better decisions.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── COMMON PREDICTIONS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Applications"
              title="Lal Kitab Predictions for Life Themes"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2"
            >
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Career & Work Life
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Your professional journey often follows specific cycles of progress and delay. Lal Kitab predictive analysis helps in understanding:
                  </p>
                  <ul className="space-y-sp-2 flex-1">
                    {CAREER_PREDICTIONS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[13px] italic text-text-secondary">
                      This guidance helps you prepare mentally and practically for upcoming changes in your career path.
                    </p>
                  </div>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Financial Predictions
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Money flow is one of the most common concerns in life. Lal Kitab predictions help identify:
                  </p>
                  <ul className="space-y-sp-2 flex-1">
                    {FINANCIAL_PREDICTIONS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[13px] italic text-text-secondary">
                      The aim is to help you understand when to act and when to be cautious.
                    </p>
                  </div>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Relationship & Family
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Relationships form the emotional core of life. Lal Kitab predictive insights help understand:
                  </p>
                  <ul className="space-y-sp-2 flex-1">
                    {RELATIONSHIP_PREDICTIONS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[13px] italic text-text-secondary">
                      These predictions support better emotional awareness and decision-making.
                    </p>
                  </div>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Health & Life Energy Patterns
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Lal Kitab also highlights subtle indications related to well-being, such as:
                  </p>
                  <ul className="space-y-sp-2 flex-1">
                    {HEALTH_PREDICTIONS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[13px] italic text-text-secondary">
                      This helps individuals take better preventive care of their physical and emotional health.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHY UNIQUE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Why Lal Kitab Predictive Guidance is Unique"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Lal Kitab stands apart because it is not overly complex or symbolic. It is a practical system that connects astrology with real-life experiences in a simple and understandable way.
              </p>
              <p className="font-sans text-[15px] font-bold text-gold-600 lg:text-base">
                At Vedic Destiny, our predictions are:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHY_UNIQUE.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <h4 className="font-display text-lg font-bold text-text-primary mb-2">
                      A Clear Path Forward Through Understanding
                    </h4>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary mb-3">
                      Predictions are not meant to create fear about the future—they are meant to create awareness of timing, patterns, and possibilities so that life decisions become more confident and grounded.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary">
                      Lal Kitab predictive guidance helps you see life not as uncertainty, but as a sequence of meaningful phases that can be navigated with awareness.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── BOOK CTA ────────── */}
          <div>
            <StaggerReveal amount={0.1}>
              <StaggerItem>
                <Card className="relative overflow-hidden p-sp-8 lg:p-sp-10 text-center">
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(184,146,40,0.15) 0%, transparent 60%)",
                    }}
                  />

                  <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                    Discover What Your Future Is Indicating
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    If you are facing confusion about your career, relationships, finances, or life direction, Lal Kitab predictive guidance may offer valuable clarity and understanding.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[15px] font-medium leading-relaxed text-text-secondary">
                      When you understand your timing, life decisions become simpler and more powerful.
                    </p>
                  </div>

                  <div className="mt-sp-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-sans text-sm font-bold text-text-on-gold shadow-lg transition-all duration-200 hover:bg-gold-500 hover:shadow-xl"
                    >
                      Take the First Step Today
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
