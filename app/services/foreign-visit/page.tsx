import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Foreign Visit & Settlement | Vedic Destiny",
  description:
    "Discover your global opportunities through astrology. Planning to travel, work, study, or settle abroad? Get expert guidance for your international journey.",
};

const ASTROLOGY_INDICATORS = [
  "Possibility of foreign travel",
  "Opportunities for overseas education",
  "Career or job prospects abroad",
  "Business expansion in foreign countries",
  "Chances of permanent settlement overseas",
  "Timing of international opportunities",
  "Delays, obstacles, or repeated visa challenges",
  "Favorable periods for relocation",
];

const CONSULTATION_PROCESS = [
  "Houses Connected to Foreign Travel & Settlement",
  "Planetary Strengths & Weaknesses",
  "Current Dasha and Transit Effects",
  "Career, Education & Relocation Indicators",
  "Timing of Favorable Opportunities",
  "Challenges Causing Delays or Obstacles",
];

const WHY_CHOOSE_US = [
  "Personalized horoscope-based guidance",
  "Honest and realistic consultation",
  "Ethical, fear-free astrology",
  "Confidential and respectful support",
  "Practical and compassionate understanding",
];

const FAQS = [
  {
    q: "Can astrology predict foreign settlement?",
    a: "Astrology may indicate possibilities, supportive periods, and challenges related to foreign travel or settlement. Outcomes also depend on personal effort, opportunities, and circumstances.",
  },
  {
    q: "Can astrology help with visa delays?",
    a: "Horoscope analysis may provide insight into timing, obstacles, and supportive periods for applications or travel plans.",
  },
  {
    q: "Can I know if I will work abroad?",
    a: "Career and relocation-related planetary combinations can be studied to understand overseas work possibilities.",
  },
  {
    q: "Are remedies compulsory?",
    a: "No. Remedies, when suggested, are intended to support positivity and balance and are always optional.",
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
export default function ForeignVisitPage() {
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
            eyebrow="Global Opportunities"
            title="Foreign Visit & Settlement"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Discover Your Global Opportunities Through Astrology
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
                    Planning to Travel, Work, Study or Settle Abroad?
                  </h3>
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Dreaming of a foreign visit, overseas career, higher education abroad, business expansion, or permanent settlement in another country?
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      For many individuals, international opportunities represent growth, better prospects, education, financial stability, or a fresh beginning. Yet delays, visa issues, uncertainty, repeated obstacles, or changing circumstances often create confusion and emotional stress.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we offer Foreign Visit & Settlement Astrology Consultation through authentic Vedic horoscope analysis to help understand the possibilities, timing, opportunities, and challenges related to international travel and overseas settlement.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Because major life decisions deserve thoughtful guidance and clarity.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CAN ASTROLOGY INDICATE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Astrological Indicators"
              title="Can Astrology Indicate Foreign Travel or Settlement?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[800px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                In Vedic Astrology, foreign travel and settlement possibilities are traditionally studied through planetary combinations, house placements, Dasha periods, transits, and karmic influences.
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
                      At Vedic Destiny, we provide balanced guidance based on astrological indicators while respecting practical realities and personal effort.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── AREAS WE HELP YOU UNDERSTAND ────────── */}
          <div>
            <SectionHeader
              eyebrow="Clarity & Direction"
              title="Areas We Help You Understand"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2"
            >
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Foreign Travel Opportunities
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Whether for tourism, professional assignments, business, or personal reasons, astrology may indicate supportive travel periods and opportunities.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Higher Education Abroad
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Students planning international studies often seek clarity regarding timing, admission opportunities, and favorable phases.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Overseas Career & Job Opportunities
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Many professionals explore possibilities for global careers, migration, or relocation for better growth and financial prospects.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Permanent Settlement Abroad
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    If you aspire to settle overseas, horoscope analysis may help assess long-term settlement possibilities and favorable timing.
                  </p>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 lg:col-span-2">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Visa Delays & Repeated Obstacles
                  </h3>
                  <p className="font-sans text-[14px] leading-relaxed text-text-secondary">
                    Unexpected delays, rejections, or recurring challenges may sometimes reflect unfavorable planetary timing requiring careful evaluation.
                  </p>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CONSULTATION PROCESS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Our Process"
              title="Personalized Foreign Settlement Consultation"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, every consultation is personalized and confidential. We carefully analyze:
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
                      Where suitable, we may also recommend:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Vedic remedies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Lal Kitab remedies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Suitable gemstones or Rudraksha guidance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[14px] leading-relaxed text-text-secondary">Spiritual practices for clarity and confidence</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Our focus remains practical, supportive, and responsible.
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
                Humane Guidance Rooted in Authentic Vedic Wisdom
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we understand that moving abroad often involves dreams, emotions, financial investment, and family expectations.
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
                      We aim to help you make informed decisions with greater clarity and confidence.
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
                    Take the Next Step Toward Your Global Dreams
                  </p>
                  <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                    Vedic Destiny – Helping You Navigate Life’s Opportunities with Clarity & Wisdom
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Whether your goal is overseas education, international career growth, business expansion, travel, or permanent settlement abroad, clarity can make the journey easier.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[15px] font-medium leading-relaxed text-text-secondary">
                      If you are seeking answers about your Foreign Visit & Settlement possibilities, let Vedic Destiny guide you with wisdom, authenticity, and compassionate support.
                    </p>
                  </div>

                  <div className="mt-sp-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-sans text-sm font-bold text-text-on-gold shadow-lg transition-all duration-200 hover:bg-gold-500 hover:shadow-xl"
                    >
                      Book Your Personalized Consultation
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
