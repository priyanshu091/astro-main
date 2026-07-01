import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Career & Business Guidance | Vedic Destiny",
  description:
    "Career and Business Guidance through Astrology for long-term success, stability, financial growth, and strategic professional decisions.",
};

const CHALLENGES = [
  "Confusion regarding the right profession or industry",
  "Lack of growth despite hard work and dedication",
  "Frequent job changes or instability",
  "Delays in promotions and recognition",
  "Business losses or financial instability",
  "Difficulty making important professional decisions",
  "Career dissatisfaction and emotional stress",
  "Partnership conflicts in business",
  "Fear of career transition or expansion",
  "Uncertainty regarding long-term professional stability",
];

const REVEALS = [
  {
    title: "Professional Strengths & Natural Abilities",
    desc: "Understand your core talents, leadership qualities, communication style, and natural professional inclinations.",
  },
  {
    title: "Suitable Career Paths",
    desc: "Identify industries, professions, and work environments aligned with your abilities and long-term success potential.",
  },
  {
    title: "Favorable Timing for Growth",
    desc: "Discover the right periods for promotions, career shifts, investments, expansion, or important decisions.",
  },
  {
    title: "Business Stability & Expansion",
    desc: "Gain insight into financial growth, partnership success, business opportunities, and long-term sustainability.",
  },
  {
    title: "Challenges & Risk Factors",
    desc: "Understand potential obstacles, delays, competition, or financial risks and learn how to manage them strategically.",
  },
  {
    title: "Financial Growth Opportunities",
    desc: "Identify favorable periods for income improvement, investments, savings, and financial planning.",
  },
];

const REPORTS = [
  "1-Year Strategic Career Report",
  "2-Year Growth Analysis",
  "3-Year Career & Business Forecast",
  "5-Year Professional Stability Report",
  "7-Year Long-Term Financial Outlook",
  "10-Year Career & Business Forecasting",
  "Business Expansion & Partnership Reports",
  "Personalized Remedial Solutions for Career & Business Challenges",
];

const PRACTICAL_APPROACH = [
  "Understanding your strengths, values, and interests",
  "Exploring suitable industries and opportunities",
  "Building skills and professional expertise",
  "Making timely and strategic career decisions",
  "Maintaining financial discipline and long-term planning",
];

const EXPERT_FOCUS = [
  "Practical career alignment",
  "Professional growth strategies",
  "Financial stability and planning",
  "Business timing and expansion",
  "Long-term success and decision-making",
  "Personalized solutions based on individual charts",
];

const BENEFITS = [
  "Improve professional clarity and focus",
  "Identify suitable career opportunities",
  "Reduce confusion and uncertainty",
  "Plan business decisions more strategically",
  "Understand favorable growth periods",
  "Improve long-term financial stability",
  "Build confidence in professional decisions",
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
export default function CareerBusinessServicePage() {
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
            eyebrow="Professional Growth"
            title="Career & Business Guidance for Long-Term Success"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Career & Business Guidance Through Astrology – Clarity, Direction & Strategic Growth
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
                      Uncertainty in professional life can affect confidence,
                      financial stability, and long-term growth. Many individuals
                      work hard for years yet continue to face delays, confusion,
                      lack of recognition, unstable income, or difficulty making
                      the right professional decisions. Whether you are
                      struggling with career direction, facing repeated setbacks,
                      planning a business expansion, or looking for the right
                      growth opportunities, proper guidance can help you move
                      forward with greater clarity and confidence.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Career & Business Astrology offers a structured and
                      insightful approach to understanding professional potential,
                      financial growth, leadership abilities, and future
                      opportunities. Through detailed horoscope analysis and
                      planetary evaluation, it becomes easier to identify strengths,
                      suitable career paths, favorable timing, and possible
                      obstacles that may affect professional success.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      By aligning your efforts with the right timing and strategic
                      decisions, you can improve stability, confidence, and
                      long-term progress in both Career & Business matters.
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
              title="Are You Facing Career & Business Challenges?"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Many people experience confusion and uncertainty despite sincere
              efforts and qualifications. Astrology helps identify hidden patterns
              influencing professional growth and financial success.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              You may benefit from Career & Business guidance if you are facing:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2"
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
              Astrology provides valuable insight into timing, opportunities,
              strengths, and challenges, helping individuals make more balanced and
              informed decisions.
            </p>
          </div>

          {/* ────────── WHAT ASTROLOGY CAN REVEAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Career & Business Astrology Can Reveal"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              A detailed horoscope analysis can provide practical and valuable
              insights related to professional life, income, growth opportunities,
              and financial stability. Career & Business Astrology helps identify:
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

            <p className="mt-sp-8 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              By understanding these planetary influences, individuals can make
              practical decisions with better timing and confidence.
            </p>
          </div>

          {/* ────────── FORECASTING ────────── */}
          <div>
            <SectionHeader
              eyebrow="Forecasting"
              title="Comprehensive Career & Business Forecasting"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                For individuals seeking long-term clarity and strategic
                direction, Soumitra Roy Chowdhury offers personalized and
                time-based Career & Business reports designed to support
                informed professional decisions.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Available Report Options:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {REPORTS.map((p) => (
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
                      Each report is carefully prepared according to your unique
                      birth chart and planetary periods, offering practical
                      guidance and actionable recommendations.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── PRACTICAL APPROACH ────────── */}
          <div>
            <SectionHeader
              eyebrow="Strategy"
              title="A Balanced & Practical Approach"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              While astrology offers powerful insight, professional success also
              depends on practical planning, continuous learning, discipline, and
              informed decision-making. Choosing the right direction requires:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PRACTICAL_APPROACH.map((r) => (
                <StaggerItem key={r}>
                  <div className="flex h-full items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(184,146,40,0.08)]">
                      <span className="h-2 w-2 rounded-full bg-gold-400" />
                    </div>
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {r}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Career & Business Astrology complements this process by adding
              clarity, timing, and deeper self-awareness, helping individuals
              avoid unnecessary confusion and make smarter professional choices.
            </p>
          </div>

          {/* ────────── EXPERT GUIDANCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Experience"
              title="Expert Guidance Backed by Experience"
            />
            <p className="mt-sp-5 font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base max-w-[700px]">
              With over 30 years of professional experience, Soumitra Roy
              Chowdhury provides practical, analytical, and result-oriented
              Career & Business guidance designed to support long-term growth
              and stability.
            </p>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-5">
                    Consultations Focus On
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {EXPERT_FOCUS.map((item) => (
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
                      Rather than offering unrealistic predictions, the focus
                      remains on clarity, structured analysis, and practical
                      guidance that individuals can apply in real life.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── INFORMED DECISIONS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Success"
              title="Make Informed Career & Business Decisions"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Professional success is not only about hard work—it also depends on
              timing, direction, planning, and the ability to make informed
              choices. A well-guided approach helps individuals move forward with
              confidence, clarity, and better understanding.
            </p>
            <p className="mt-sp-3 font-sans text-sm font-semibold text-text-primary">
              With proper Career & Business guidance, you can:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {BENEFITS.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex h-full items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4">
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
                    Take the Next Step Towards Success
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Do not allow uncertainty, confusion, or repeated setbacks to
                    limit your true potential. Get personalized Career & Business
                    consultation from Soumitra Roy Chowdhury and gain practical
                    insight into your professional path, financial growth, and
                    future opportunities.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Plan Strategically. Grow Confidently. Move Forward with Clarity.
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      When the right decisions are made at the right time,
                      professional growth becomes more stable, balanced, and rewarding.
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
