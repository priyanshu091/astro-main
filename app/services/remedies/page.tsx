import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Lal Kitab Remedies | Vedic Destiny",
  description:
    "Authentic Lal Kitab Remedies for career, marriage, health, and financial challenges. Find balance and practical solutions for life's obstacles.",
};

const WHAT_MAKES_SPECIAL = [
  "Planetary imbalances affecting your life",
  "Root causes of repeated problems",
  "Simple corrective actions for improvement",
  "Practical steps for positive energy alignment",
];

const CAREER_CHALLENGES = [
  "Reducing career obstacles",
  "Improving job stability and performance",
  "Enhancing promotion opportunities",
  "Supporting better decision-making in career matters",
];

const FINANCIAL_CHALLENGES = [
  "Removing money-block patterns",
  "Improving savings and stability",
  "Supporting business and income growth",
  "Reducing financial stress cycles",
];

const RELATIONSHIP_CHALLENGES = [
  "Improving communication and understanding",
  "Reducing conflicts and emotional stress",
  "Strengthening family harmony",
  "Supporting peaceful relationships",
];

const HEALTH_CHALLENGES = [
  "Emotional balance and peace of mind",
  "Reducing stress-related patterns",
  "Improving overall well-being",
  "Creating positive lifestyle alignment",
];

const LIFE_OBSTACLES = [
  "Identifying karmic patterns and blockages",
  "Breaking negative cycles",
  "Encouraging positive life flow",
  "Creating stability and clarity",
];

const WHY_CHOOSE_US = [
  "Personalised Lal Kitab analysis based on your birth details",
  "Simple and practical remedies suitable for daily routine",
  "Ethical, non-fear-based guidance",
  "Confidential and respectful consultation",
  "Focus on long-term improvement, not temporary fixes",
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
export default function LalKitabServicePage() {
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
            eyebrow="Simple Solutions for Complex Problems"
            title="Lal Kitab Remedies"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Practical & Powerful Lal Kitab Guidance for Real-Life Challenges
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
                      Life often brings situations where problems seem to repeat despite sincere efforts — whether it is career delays, financial instability, relationship misunderstandings, health concerns, or constant mental stress.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Lal Kitab is a unique and practical system of astrology known for offering simple, effective, and result-oriented remedies that can be easily applied in daily life without complex rituals or expensive procedures.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we provide personalised Lal Kitab remedial guidance designed to help individuals reduce obstacles, improve life balance, and create positive momentum in different areas of life.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      Our approach is humane, practical, and responsibility-driven — focused on solutions, not fear.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHAT MAKES IT SPECIAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Unique Approach"
              title="What Makes Lal Kitab Remedies Special?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[800px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Lal Kitab is different from traditional astrological approaches because it focuses on real-life actions and practical corrections rather than complex rituals. Its remedies are simple, symbolic, and deeply effective when applied correctly and consistently.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                It helps in identifying:
              </p>
            </div>
            
            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHAT_MAKES_SPECIAL.map((item) => (
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

          {/* ────────── COMMON CHALLENGES ────────── */}
          <div>
            <SectionHeader
              eyebrow="Applications"
              title="Lal Kitab Remedies for Common Life Problems"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Career & Job Problems
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Struggling with job delays, workplace stress, lack of growth, or frequent job changes?
                  </p>
                  <ul className="space-y-sp-2">
                    {CAREER_CHALLENGES.map((item) => (
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
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Financial Stability
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Facing financial ups and downs or unexpected expenses?
                  </p>
                  <ul className="space-y-sp-2">
                    {FINANCIAL_CHALLENGES.map((item) => (
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
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Relationship Harmony
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Experiencing misunderstandings or emotional distance in relationships?
                  </p>
                  <ul className="space-y-sp-2">
                    {RELATIONSHIP_CHALLENGES.map((item) => (
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
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Health & Mental Peace
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    Feeling low energy, stress, or repeated health concerns?
                  </p>
                  <ul className="space-y-sp-2">
                    {HEALTH_CHALLENGES.map((item) => (
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
                <Card className="h-full p-sp-6 border border-gold-400/10 lg:col-span-2">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Life Obstacles & Repeated Problems
                  </h3>
                  <p className="mb-sp-4 font-sans text-[13px] text-text-secondary/80">
                    When life feels stuck or problems keep repeating:
                  </p>
                  <ul className="space-y-sp-2 grid grid-cols-1 md:grid-cols-2">
                    {LIFE_OBSTACLES.map((item) => (
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
            </StaggerReveal>
          </div>

          {/* ────────── WHY CHOOSE US ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Why Choose Lal Kitab Guidance from Vedic Destiny?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we believe remedies should be ethical, practical, and easy to follow. Our Lal Kitab consultations are designed to provide clarity and realistic steps that can be incorporated into daily life.
              </p>
              <p className="font-sans text-[15px] font-bold text-gold-600 lg:text-base">
                Our Commitment to You:
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
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── REAL LIFE IMPACT ────────── */}
          <div>
            <SectionHeader
              eyebrow="Impact"
              title="Simple Remedies. Real-Life Impact."
            />
            <StaggerReveal amount={0.05} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8">
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Lal Kitab teaches us that even small, consistent actions can create meaningful changes in life. When applied correctly, these remedies help in restoring balance and improving overall life direction.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      They are not about complexity — they are about awareness, discipline, and positive correction.
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
                    Bring Harmony Back to Your Life
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Book your personalized Lal Kitab Consultation today and discover
                    practical solutions tailored to your unique journey.
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
