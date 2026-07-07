import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Rudraksh, Gemstones & Crystals | Vedic Destiny",
  description:
    "Align your energy with ancient wisdom. Discover personalized spiritual and planetary guidance for balance, protection, and growth.",
};

const WHY_THEY_MATTER = [
  "Mental clarity and emotional balance",
  "Confidence and inner strength",
  "Spiritual growth and protection",
  "Career and financial focus",
  "Relationship harmony",
  "Reduced stress and emotional disturbances",
  "Positive planetary energy alignment",
];

const RUDRAKSHA_BENEFITS = [
  "Peace of mind and emotional balance",
  "Spiritual progress and meditation",
  "Career confidence and focus",
  "Relationship harmony",
  "Protection from negativity",
  "Improved decision-making",
];

const GEMSTONES_LIST = [
  "Ruby (Sun)",
  "Pearl (Moon)",
  "Yellow Sapphire (Jupiter)",
  "Emerald (Mercury)",
  "Blue Sapphire (Saturn)",
  "Red Coral (Mars)",
  "Diamond (Venus)",
  "Hessonite (Rahu)",
  "Cat’s Eye (Ketu)",
];

const CRYSTALS_LIST = [
  {
    title: "Emotional Healing",
    desc: "Helping create calmness and emotional resilience.",
  },
  {
    title: "Confidence & Motivation",
    desc: "Supporting clarity, self-belief, and focus.",
  },
  {
    title: "Energy Cleansing",
    desc: "Promoting positivity and energetic balance.",
  },
  {
    title: "Meditation & Spiritual Awareness",
    desc: "Enhancing mindfulness and inner connection.",
  },
];

const CONSULTATION_PROCESS = [
  "Detailed Horoscope Analysis",
  "Planetary Strength & Weakness Assessment",
  "Current Dasha & Transit Influence",
  "Life Challenges & Personal Goals Review",
  "Personalized Recommendations Based on Suitability",
];

const WHY_CHOOSE_US = [
  "Personalized recommendations — not generic suggestions",
  "Ethical and honest consultation",
  "Astrologically suitable guidance",
  "Supportive and compassionate approach",
  "Focus on wellbeing and empowerment",
];

const FAQS = [
  {
    q: "Can anyone wear any gemstone?",
    a: "No. Gemstones should ideally be selected after proper horoscope analysis to ensure suitability.",
  },
  {
    q: "Are Rudraksha beads suitable for everyone?",
    a: "Different Rudraksha beads have different traditional associations. Guidance based on your personal profile helps in choosing the most suitable one.",
  },
  {
    q: "Do crystals really help?",
    a: "Many people use crystals as supportive tools for mindfulness, emotional grounding, and positive intention-setting. Experiences may vary from person to person.",
  },
  {
    q: "How do I know what suits me?",
    a: "A personalized consultation at Vedic Destiny helps identify options aligned with your horoscope, goals, and challenges.",
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
export default function RudrakshaGemsPage() {
  return (
    <main>
      <Navbar />

      {/* ────────── HERO ────────── */}
      <section className="relative overflow-hidden bg-bg-void pb-sp-5 pt-[140px] lg:pb-sp-8 lg:pt-[180px]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-full max-w-[1200px] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(184,146,40,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-content px-sp-5 text-center">
          <SectionHeader
            eyebrow="Align Your Energy"
            title="Rudraksh, Gemstones & Crystals"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Align Your Energy with Ancient Wisdom
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
                    Discover Personalized Spiritual & Planetary Guidance for Balance, Protection and Growth
                  </h3>
                  <div className="prose-custom space-y-5">
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Since ancient times, Rudraksha, Gemstones, and Healing Crystals have been valued for their spiritual, energetic, and astrological significance. In Vedic traditions, these sacred tools are believed to support emotional wellbeing, spiritual growth, planetary balance, and personal transformation when selected thoughtfully and authentically.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we provide personalized guidance for Rudraksha, Gemstones, and Crystals based on your birth chart, life challenges, planetary influences, and personal aspirations.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Because true guidance is never one-size-fits-all.
                    </p>
                    <p className="font-sans text-[15px] font-medium text-gold-700 lg:text-base">
                      We believe these sacred energies should be approached with wisdom, authenticity, and compassion — not confusion or commercial pressure.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHY THEY MATTER ────────── */}
          <div>
            <SectionHeader
              eyebrow="Energetic Support"
              title="Why Rudraksha, Gemstones & Crystals Matter"
            />
            <div className="mt-sp-5 space-y-4 max-w-[800px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Every individual carries unique energies influenced by planetary positions, karmic patterns, emotional experiences, and life circumstances.
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                When chosen appropriately, Rudraksha, Gemstones, and Crystals are traditionally believed to help support:
              </p>
            </div>
            
            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {WHY_THEY_MATTER.map((item) => (
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
                      At Vedic Destiny, recommendations are made carefully and responsibly — based on astrological suitability, not trends.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── THREE PILLARS (RUDRAKSHA, GEMS, CRYSTALS) ────────── */}
          <div>
            <SectionHeader
              eyebrow="Sacred Tools"
              title="Aligning Your Life Energy"
            />
            
            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 lg:grid-cols-3"
            >
              {/* RUDRAKSHA */}
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Rudraksha
                  </h3>
                  <p className="font-sans text-[13px] font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Sacred Beads of Spiritual Energy
                  </p>
                  <p className="mb-sp-4 font-sans text-[13px] leading-relaxed text-text-secondary/80">
                    Rudraksha beads have been revered for centuries in spiritual traditions and are associated with divine energies and inner transformation. Different Mukhi (faces) of Rudraksha are traditionally believed to support different aspects of life such as:
                  </p>
                  <ul className="space-y-sp-2 flex-1">
                    {RUDRAKSHA_BENEFITS.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <GoldDot />
                        <span className="font-sans text-[13px] leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[12px] italic text-text-secondary">
                      At Vedic Destiny, we help identify the right Rudraksha for your personal needs and astrological profile, ensuring suitability and authenticity.
                    </p>
                  </div>
                </Card>
              </StaggerItem>

              {/* GEMSTONES */}
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Gemstones
                  </h3>
                  <p className="font-sans text-[13px] font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Planetary Support Through Vedic Astrology
                  </p>
                  <p className="mb-sp-4 font-sans text-[13px] leading-relaxed text-text-secondary/80">
                    In Vedic Astrology, gemstones are traditionally associated with planetary energies. A carefully selected gemstone may help strengthen favorable planetary influences in your horoscope. We provide guidance for:
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-1 flex-1">
                    {GEMSTONES_LIST.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <GoldDot />
                        <span className="font-sans text-[13px] leading-relaxed text-text-secondary">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[12px] italic text-text-secondary">
                      Not every gemstone suits every individual. We recommend gemstones only after detailed horoscope assessment and planetary evaluation.
                    </p>
                  </div>
                </Card>
              </StaggerItem>

              {/* CRYSTALS */}
              <StaggerItem>
                <Card className="h-full p-sp-6 border border-gold-400/10 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-sp-2">
                    Healing Crystals
                  </h3>
                  <p className="font-sans text-[13px] font-bold uppercase tracking-wider text-gold-600 mb-sp-4">
                    Supporting Emotional & Energetic Balance
                  </p>
                  <p className="mb-sp-4 font-sans text-[13px] leading-relaxed text-text-secondary/80">
                    Crystals are widely used for mindfulness, emotional grounding, positivity, and spiritual wellbeing. Depending on your needs, crystals may traditionally support:
                  </p>
                  <ul className="space-y-sp-3 flex-1">
                    {CRYSTALS_LIST.map((item) => (
                      <li key={item.title} className="flex flex-col">
                        <span className="font-sans text-[13px] font-bold text-text-primary">
                          {item.title}
                        </span>
                        <span className="font-sans text-[13px] leading-relaxed text-text-secondary">
                          {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-sp-4 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-3 border border-gold-400/10">
                    <p className="font-sans text-[12px] italic text-text-secondary">
                      At Vedic Destiny, we help you choose crystals that align with your emotional, spiritual, and life goals.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── CONSULTATION PROCESS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Our Process"
              title="Our Personalized Consultation Process"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we do not recommend Rudraksha, gemstones, or crystals randomly. Our guidance includes:
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
                  
                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 max-w-[800px]">
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      We prioritize authenticity, ethics, and responsible guidance over unnecessary selling or fear-based advice.
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
                Authentic Guidance with a Humane Approach
              </p>
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we understand that every person’s journey is unique. You receive:
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
                      We believe sacred tools should help bring clarity, positivity, and confidence — while respecting your individuality and free will.
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
                    Begin Your Journey Toward Positive Energy & Clarity
                  </p>
                  <h2 className="font-display text-2xl font-bold text-text-primary lg:text-3xl">
                    Vedic Destiny – Ancient Wisdom, Authentic Guidance & Compassionate Care
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Whether you seek emotional balance, spiritual growth, planetary support, or greater confidence in life, the right guidance can make all the difference.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[15px] font-medium leading-relaxed text-text-secondary">
                      Connect with Vedic Destiny for Personalized Rudraksha, Gemstone & Crystal Guidance and explore what aligns best with your journey.
                    </p>
                  </div>

                  <div className="mt-sp-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 font-sans text-sm font-bold text-text-on-gold shadow-lg transition-all duration-200 hover:bg-gold-500 hover:shadow-xl"
                    >
                      Explore Personalized Guidance Today
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
