import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Child Astrology & Progeny Guidance | Vedic Destiny",
  description:
    "Bring clarity, hope & blessings to your child & parenthood journey. Detailed Kundli analysis for progeny yoga, timing, and child development.",
};

const CONCERNS = [
  "Delay in conception despite medical efforts?",
  "Anxiety or uncertainty about having a child?",
  "Concerns related to pregnancy or childbirth timing?",
  "Looking for guidance on IVF or adoption possibilities?",
  "Confusion about the best time for conception?",
  "Worries about your child’s health, behavior, or future?",
];

const REVEALS = [
  "Possibility of a child (Progeny Yoga)",
  "Timing of pregnancy and childbirth",
  "Reasons behind delays in conceiving a child",
  "Favorable periods for conception",
  "Chances of IVF or medical support success",
  "Adoption possibilities and timing",
  "Child’s health, nature, and personality traits",
  "Parent–child emotional bonding",
];

const TIMING_INSIGHTS = [
  "The most favorable planetary periods for conceiving a child",
  "Safe and supportive phases for pregnancy",
  "Energetically strong timeframes for childbirth",
];

const BEYOND_BIRTH = [
  {
    title: "Child’s Nature & Behavior",
    items: [
      "Emotional patterns and sensitivities",
      "Learning style and cognitive tendencies",
      "Strengths and potential challenges",
    ],
  },
  {
    title: "Parenting Guidance",
    items: [
      "Building a strong bond with your child",
      "Managing behavioral concerns like anger or stubbornness",
      "Supporting emotional and mental development of your child",
    ],
  },
  {
    title: "Life Direction Insights",
    items: [
      "Early identification of a child’s talents",
      "Educational and personality development guidance",
    ],
  },
];

const MODERN_CHOICES = [
  "IVF success timing support for having a child",
  "Adoption-related insights",
  "C-section auspicious timing",
  "Child naming (as per numerology & astrology)",
  "Pregnancy planning alignment",
];

const HOW_HELPS = [
  "Accurate Kundli-based analysis",
  "Clear answers to sensitive concerns about your child",
  "Practical remedies",
  "Compassionate consultation",
  "Guidance aligned with real-life situations",
];

const JOURNEY_HOPE = [
  "Understand the right timing for a child",
  "Reduce stress and uncertainty",
  "Gain confidence in your journey",
  "Strengthen family harmony",
];

const CTA_POINTS = [
  "Get personalized child astrology consultation",
  "Understand your progeny yoga and timing",
  "Receive clear guidance for your child and family",
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
export default function ChildrenServicePage() {
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
            eyebrow="Children & Progeny"
            title="Child Astrology & Progeny Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Bring Clarity, Hope & Blessings to Your Child & Parenthood Journey
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
                      The arrival of a child is one of life’s most beautiful
                      blessings—it brings joy, emotional fulfilment, and a deep
                      sense of completeness to a family. For many, parenthood
                      represents not just a milestone, but a meaningful
                      transformation filled with love, responsibility, and
                      purpose centered around the well-being of a child.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Yet, for several couples, this journey toward having a child
                      is not always straightforward. It may be accompanied by
                      questions, unexpected delays, emotional stress, or
                      uncertainty about the future. These challenges can create
                      anxiety and confusion, making it difficult to move forward
                      with confidence.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      Child astrology offers deep, meaningful guidance to bring
                      clarity, timing, and hope to this important phase of life.
                      By understanding planetary influences and individual birth
                      charts, it becomes possible to identify patterns, remove
                      doubts, and make informed decisions about having a child.
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
              title="Are You Facing Any of These Child-Related Concerns?"
            />

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-3 md:grid-cols-2 lg:grid-cols-3"
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
              If you resonate with any of these, astrology can offer direction,
              reassurance, and practical solutions to support your journey toward
              a healthy and happy child.
            </p>
          </div>

          {/* ────────── WHAT ASTROLOGY CAN REVEAL ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insights"
              title="What Child Astrology Can Reveal"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Through detailed Kundli analysis, child astrology can provide
                valuable insights into your parenthood journey and the future
                of your child.
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {REVEALS.map((p) => (
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
                      Child astrology is not just about prediction—it is about
                      empowering you with clarity to plan a secure, joyful, and
                      blessed future for your child.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── PLAN THE RIGHT TIME ────────── */}
          <div>
            <SectionHeader
              eyebrow="Timing"
              title="Plan the Right Time for Your Child"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Timing plays a crucial role in conception and childbirth. Even with
              the best efforts, unfavorable periods may delay the arrival of a
              child. Astrology helps identify:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-3"
            >
              {TIMING_INSIGHTS.map((r) => (
                <StaggerItem key={r}>
                  <div className="flex h-full items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-5">
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
              This guidance allows couples to move forward with greater
              confidence, clarity, and positivity in welcoming a child.
            </p>
          </div>

          {/* ────────── GUIDANCE BEYOND BIRTH ────────── */}
          <div>
            <SectionHeader
              eyebrow="Parenting"
              title="Guidance Beyond Birth – Raising a Balanced Child"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Child astrology goes beyond conception—it also supports parents in
              understanding and nurturing their child effectively.
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 lg:grid-cols-3"
            >
              {BEYOND_BIRTH.map((category) => (
                <StaggerItem key={category.title}>
                  <Card interactive className="flex h-full flex-col p-sp-6">
                    <h3 className="font-display text-lg font-bold text-gold-600 mb-sp-4">
                      {category.title}
                    </h3>
                    <ul className="flex-1 space-y-sp-3">
                      {category.items.map((item) => (
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
              ))}
            </StaggerReveal>

            <p className="mt-sp-8 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              This holistic approach helps parents raise a balanced, confident,
              and emotionally secure child.
            </p>
          </div>

          {/* ────────── MODERN CHOICES ────────── */}
          <div>
            <SectionHeader
              eyebrow="Modern Solutions"
              title="Support for Modern Child & Parenthood Choices"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Acharya Soumitra Roy Chowdhury provides tailored guidance for modern
              parenthood challenges and choices:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 flex flex-wrap gap-sp-3"
            >
              {MODERN_CHOICES.map((r) => (
                <StaggerItem key={r}>
                  <div className="flex items-center gap-3 rounded-full border border-gold-400/20 bg-[rgba(184,146,40,0.03)] px-5 py-2.5">
                    <GoldCheckmark />
                    <span className="font-sans text-sm font-medium text-text-secondary">
                      {r}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Every recommendation is practical, ethical, and tailored to your
              unique horoscope and your journey toward a child.
            </p>
          </div>

          {/* ────────── HOW SOUMITRA HELPS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Expertise"
              title="How Acharya Soumitra Roy Chowdhury Helps You"
            />
            <p className="mt-sp-5 font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base max-w-[700px]">
              With deep expertise in Vedic Astrology and specialized knowledge
              in progeny matters, he provides reliable guidance to navigate
              your parenthood journey.
            </p>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-sp-4">
                    {HOW_HELPS.map((item) => (
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

          {/* ────────── JOURNEY OF HOPE ────────── */}
          <div>
            <SectionHeader
              eyebrow="Confidence"
              title="A Journey of Hope, Trust & Clarity for Your Child"
            />
            <p className="mt-sp-4 font-sans text-[15px] font-semibold text-text-primary">
              With the right astrological guidance, you can:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {JOURNEY_HOPE.map((item) => (
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
                    Take the First Step Toward Your Child’s Future
                  </h2>

                  <ul className="mx-auto mt-sp-8 flex max-w-md flex-col gap-sp-3 text-left">
                    {CTA_POINTS.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <GoldCheckmark />
                        <span className="font-sans text-sm font-semibold text-text-secondary">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[15px] font-bold text-gold-600 mb-2">
                      Your Child, Your Future, Your Blessing
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      With the right guidance, confusion transforms into clarity—and
                      hope transforms into direction. Acharya Soumitra Roy Chowdhury helps
                      you move forward with confidence, peace, and trust in your
                      journey toward a blessed and fulfilling life with your child.
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
