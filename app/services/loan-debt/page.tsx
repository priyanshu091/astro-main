import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Loan & Debt Problems | Vedic Destiny",
  description:
    "Find clarity, balance, and a positive path forward. Get expert astrological guidance to navigate difficult financial phases and debt-related challenges.",
};

const ASTROLOGY_INDICATORS = [
  "Causes behind recurring financial struggles",
  "Timing of debt recovery or financial relief",
  "Career or business-related financial obstacles",
  "Planetary influences affecting wealth stability",
  "Periods favorable for repayment, restructuring, or growth",
  "Practical and spiritual remedies for financial balance",
];

const CONSULTATION_PROCESS = [
  "Wealth & Debt Houses in Horoscope",
  "Planetary Strengths & Weaknesses",
  "Current Dasha and Transit Effects",
  "Career, Business & Income Patterns",
  "Karmic Influences Affecting Finances",
  "Suitable Astrological & Practical Remedies",
];

const WHY_CHOOSE_US = [
  "Personalized and confidential consultation",
  "Ethical and practical guidance",
  "Fear-free astrological approach",
  "Authentic Vedic insights",
  "Supportive and humane understanding",
];

const FAQS = [
  {
    q: "Can astrology remove debt instantly?",
    a: "Astrology does not replace practical financial planning, but it may help identify supportive periods, recurring patterns, and remedies that complement your efforts.",
  },
  {
    q: "Can astrology help improve financial stability?",
    a: "Through horoscope analysis, guidance may be offered regarding timing, financial behavior, planetary influences, and supportive remedies.",
  },
  {
    q: "Are remedies the same for everyone?",
    a: "No. Financial challenges vary, and recommendations are based on individual horoscope analysis.",
  },
  {
    q: "Is my financial information confidential?",
    a: "Absolutely. Your consultation and personal information remain private and confidential.",
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
export default function LoanDebtPage() {
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
            eyebrow="Financial Clarity"
            title="Loan & Debt Problems"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Find Clarity, Balance & a Positive Path Forward
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
                    Struggling with Loans, Financial Pressure or Recurring Debt?
                  </h3>
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Financial stress can feel overwhelming.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Whether it is mounting debt, business losses, delayed payments, increasing EMIs, unexpected financial setbacks, or constant worry about money, loan and debt-related challenges often affect not just finances — but also emotional peace, relationships, confidence, and overall wellbeing.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we offer astrological guidance for Loan & Debt Problems through detailed horoscope analysis, planetary understanding, practical remedies, and compassionate consultation to help you navigate difficult financial phases with greater clarity and confidence.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Because difficult times are meant to be understood — not feared.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CAN ASTROLOGY HELP ────────── */}
          <div>
            <SectionHeader
              eyebrow="Astrological Insights"
              title="Can Astrology Help with Loan & Debt Challenges?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[800px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                In Vedic Astrology, financial stability and debt-related patterns are often linked with planetary combinations, karmic influences, timing cycles (Dasha), and house placements connected to wealth, liabilities, expenses, and obstacles.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                A detailed horoscope analysis may help identify:
              </p>
            </div>
            
            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {ASTROLOGY_INDICATORS.map((item) => (
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
                      Our purpose is not to create fear — but to provide understanding and guidance during uncertain periods.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── AREAS WE HELP YOU UNDERSTAND ────────── */}
          <div>
            <SectionHeader
              eyebrow="Challenges"
              title="Common Financial Challenges We Help Address"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Loan Burden & EMI Stress
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    If repayments feel unmanageable or financial obligations continue to increase, astrological insight may help understand recurring patterns and supportive periods ahead.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Business Losses & Instability
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Repeated setbacks in business, delayed payments, losses, or inconsistent cash flow may indicate unfavorable timing or energetic imbalance.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Personal Debt & Blockages
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Many individuals experience recurring cycles of borrowing, debt accumulation, or sudden expenses despite sincere efforts.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Delayed Financial Growth
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Hard work without expected financial stability can sometimes point toward deeper planetary influences requiring attention.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem className="md:col-span-2 lg:col-span-2">
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Family Stress Due to Finances
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Money concerns often affect emotional wellbeing, relationships, and peace at home. A balanced perspective and guidance can help reduce uncertainty.
                  </p>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CONSULTATION PROCESS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Our Process"
              title="Personalized Financial Astrology Consultation"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, every consultation is unique and confidential. We carefully analyze:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {CONSULTATION_PROCESS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-sp-8 pt-sp-6 border-t border-gold-400/10">
                    <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                      Our guidance may include:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Personalized astrological insights</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Lal Kitab remedies (where suitable)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Gemstone or Rudraksha recommendations (if appropriate)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Vedic spiritual remedies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Timing guidance for financial decisions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      We believe astrology should empower better decisions — not replace practical action.
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
                Professional Guidance with Compassionate Understanding
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Financial stress can feel deeply personal, and we approach every consultation with empathy, discretion, and professionalism.
              </p>
              <p className="font-sans text-[15px] font-bold text-gold-600 lg:text-base mt-4">
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
                      We focus on helping you regain confidence, perspective, and a more balanced outlook toward financial recovery.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── FAQS ────────── */}
          <div>
            <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="mt-sp-8 grid gap-sp-4 max-w-[900px]">
              {FAQS.map((faq, i) => (
                <Card key={i} className="p-sp-5 lg:p-sp-6 bg-[rgba(184,146,40,0.03)] border-gold-400/10 shadow-none">
                  <h4 className="font-display text-lg font-bold text-text-primary mb-sp-3">
                    {faq.q}
                  </h4>
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary">
                    {faq.a}
                  </p>
                </Card>
              ))}
            </div>
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

                  <p className="font-sans text-sm font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Take the First Step Toward Financial Clarity
                  </p>
                  <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                    Challenging financial periods do not define your future.
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    With the right understanding, timing, and guidance, it is possible to move toward greater balance and renewed confidence.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[15px] font-medium leading-relaxed text-text-secondary">
                      If you are facing Loan & Debt Problems, let Vedic Destiny guide you with wisdom, compassion, and practical astrological insight.
                    </p>
                  </div>

                  <div className="mt-sp-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-sans text-sm font-bold text-text-on-gold shadow-lg transition-all duration-200 hover:bg-gold-500 hover:shadow-xl"
                    >
                      Book Your Personalized Consultation Today
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
