import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Medical Astrology & Holistic Health | Vedic Destiny",
  description:
    "Explore the connection between celestial bodies and human health. Medical Astrology for energy balance, physical well-being, and emotional harmony.",
};

const PLANETS = [
  {
    name: "Sun",
    desc: "Governs vitality, heart health, and the core life force",
  },
  {
    name: "Moon",
    desc: "Influences emotional balance, mental stability, and body fluids",
  },
  {
    name: "Mars",
    desc: "Controls energy levels, muscles, and blood circulation",
  },
  {
    name: "Mercury",
    desc: "Affects the nervous system, intellect, and respiratory functions",
  },
  {
    name: "Jupiter",
    desc: "Relates to growth, liver health, and digestion",
  },
  {
    name: "Venus",
    desc: "Governs hormonal balance, reproductive health, and harmony",
  },
  {
    name: "Saturn",
    desc: "Represents bones, teeth, skin, and structural stability",
  },
];

const TRANSFORMS = [
  {
    title: "Self-Awareness & Clarity",
    desc: "Gain a deeper understanding of your strengths, limitations, and recurring life patterns. This clarity empowers better decisions and helps align your actions with your true potential.",
  },
  {
    title: "Harmonizing Opposing Energies",
    desc: "Each individual carries a unique combination of elemental energies—fire, earth, air, and water. Correcting imbalances creates emotional strength and practical stability.",
  },
  {
    title: "Strategic Use of Gemstones",
    desc: "When recommended with precision, authentic gemstones can strengthen positive planetary influences and reduce negative effects, acting as powerful tools for energetic alignment.",
  },
  {
    title: "Navigating Planetary Transits",
    desc: "Periods of planetary movement, including retrogrades, are not obstacles but opportunities. With the right guidance, these phases can be used strategically for growth, planning, and transformation.",
  },
  {
    title: "Elemental Balance",
    desc: "Balancing elemental forces helps restore inner harmony—whether it is calming excessive fire energy or activating dormant potential.",
  },
  {
    title: "Aligning with Your Natural Rhythm",
    desc: "Every individual operates on a unique energetic frequency. Aligning your lifestyle, routines, and decisions with this rhythm enhances productivity, mental peace, and overall success.",
  },
];

const RESULTS = [
  "Improved physical health and mental clarity",
  "Reduced stress and enhanced emotional stability",
  "Better decision-making and clearer life direction",
  "Growth in financial and professional areas",
  "Stronger relationships and a deeper sense of inner peace",
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
export default function MedicalServicePage() {
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
            eyebrow="Medical Astrology"
            title="Holistic Health & Energy Balance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Identify imbalances and apply precise remedies to restore harmony across all aspects of your life and physical well-being.
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
                      A truly fulfilling life rests on three essential pillars—good
                      health, peace of mind, and material stability. While success,
                      wealth, and comfort are important, they lose their
                      significance if they are not supported by physical well-being
                      and emotional harmony. True prosperity is not just about what
                      you achieve externally, but how balanced and aligned you feel
                      internally.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Health is often seen as a result of lifestyle choices such as
                      diet, exercise, and routine. However, a deeper perspective
                      reveals that your well-being is also influenced by the
                      environment you live in, the people you interact with, and
                      the subtle energies that surround you. When these energies
                      are misaligned, they can manifest as persistent stress,
                      unexplained health issues, emotional disturbances, or
                      recurring obstacles in life. Such patterns often indicate
                      deeper imbalances that require a more refined and holistic
                      approach.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── PLANETS & SCIENCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="The Science"
              title="The Science of Medical Astrology"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Medical Astrology, traditionally known as Iatromathematics, is an
                ancient and insightful system that explores the connection between
                celestial bodies and the human body. It studies how planetary
                positions and movements influence physical health, emotional
                states, and overall vitality.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Each planet governs specific aspects of human physiology and
                psychological functioning:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {PLANETS.map((p) => (
                      <li key={p.name} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm leading-relaxed text-text-secondary">
                          <strong className="text-text-primary font-semibold">{p.name}</strong> {p.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      Understanding these planetary influences allows for precise
                      identification of imbalances and enables the application of
                      targeted remedies that restore harmony between your internal
                      and external energies.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── EXPERT GUIDANCE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Expertise"
              title="Expert Guidance You Can Trust"
            />
            <p className="mt-sp-5 font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base max-w-[700px]">
              With decades of experience and deep expertise in astrology,
              numerology, and vastu, Soumitra offers structured and
              result-oriented guidance focused on improving overall quality of
              life. His approach is analytical, personalized, and rooted in a
              profound understanding of planetary dynamics and human behavior.
            </p>
            <p className="mt-sp-4 font-sans text-[15px] italic leading-relaxed text-text-secondary max-w-[700px]">
              Rather than offering generic predictions, the focus is on practical,
              actionable solutions. Clients seek his guidance not only for insight
              into their future but for meaningful strategies that bring
              measurable transformation in their lives.
            </p>
          </div>

          {/* ────────── TRANSFORMS YOUR LIFE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Optimization"
              title="How Energy Balance Transforms Your Life"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              True balance is achieved when your thoughts, actions, environment,
              and planetary influences are in alignment. Through careful analysis
              of your birth chart and ongoing planetary transits, key life areas
              can be optimized:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {TRANSFORMS.map((r) => (
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

          {/* ────────── RESULTS ORIENTED APPROACH ────────── */}
          <div>
            <SectionHeader
              eyebrow="Outcomes"
              title="A Results-Oriented Approach"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                The approach is simple yet powerful—identify imbalances, apply
                precise remedies, and restore harmony across all aspects of life.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Those who follow this process often experience:
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {RESULTS.map((item) => (
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
                    Take the First Step Towards Balance
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    If you are seeking clarity, stability, and a greater sense of
                    control over your life, a personalized consultation can
                    provide the direction you need.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Your journey toward a healthier, more balanced, and fulfilling life
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      begins with understanding your energies—and aligning them effectively.
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
