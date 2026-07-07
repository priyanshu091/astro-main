import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerReveal, StaggerItem } from "@/components/shared/StaggerReveal";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Education Stream Astrological Guidance | Vedic Destiny",
  description:
    "Find clarity for your future. Choose the right education stream after 10th or 12th through Vedic Astrology and personalized insight.",
};

const COMMON_QUESTIONS = [
  "Which stream is best after Class 10 or Class 12?",
  "Should I choose Science, Commerce, or Humanities?",
  "Which education path suits my personality and strengths?",
  "Why is my child struggling to focus or perform academically?",
  "Which course will bring long-term success and satisfaction?",
  "Is my chosen field aligned with future career opportunities?",
];

const STREAM_QUESTIONS = [
  "Science, Commerce, or Arts – which stream should I choose?",
  "Best career-oriented education path according to date of birth",
  "Which course matches my strengths and abilities?",
  "How to choose the right stream after 10th or 12th?",
  "Professional course or traditional education?",
  "Will technical, management, medical, legal, or creative fields suit me?",
];

const HOW_WE_HELP = [
  {
    title: "Educational Aptitude Analysis",
    desc: "Every student has hidden talents and natural strengths. We help identify subjects and learning areas best aligned with individual abilities.",
  },
  {
    title: "Stream Selection After 10th & 12th",
    desc: "Selecting the right stream after school can shape an entire career. Get clarity on whether Science, Commerce, Arts, Technology, Medical, Design, Law, or Business Studies may be more suitable.",
  },
  {
    title: "Academic Challenges & Learning Difficulties",
    desc: "Facing concentration issues, low confidence, exam stress, or inconsistent performance? Understand the underlying factors and receive practical guidance to improve focus and direction.",
  },
  {
    title: "Higher Education & Professional Course Guidance",
    desc: "Confused between multiple options for graduation or specialised studies? Receive insights for suitable higher education paths and future growth opportunities.",
  },
  {
    title: "Career-Oriented Educational Planning",
    desc: "Education and career success go hand in hand. Choosing the right academic path early can create stronger opportunities for long-term professional success.",
  },
];

const WHY_CHOOSE_US = [
  "Personalised education guidance by date of birth",
  "Practical and confidential consultation",
  "Professional yet humane approach for students and parents",
  "Guidance based on Vedic Astrology, Numerology & Vastu",
  "Clarity for better educational and career decisions",
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
export default function EducationServicePage() {
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
            eyebrow="Academic Focus"
            title="Education Stream Guidance"
            align="center"
          />
          <p className="mx-auto mt-sp-5 max-w-[740px] font-sans text-lg leading-relaxed text-text-secondary">
            Confused About Choosing the Right Education Stream? Find Clarity for Your Future
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
                      Choosing the right education stream is one of the most
                      important decisions in a student’s life. Yet, many students
                      and parents often feel confused when deciding between Science,
                      Commerce, Arts, Management, Technology, Medical, Law, Creative
                      Fields, or Professional Courses.
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                      At Vedic Destiny, we understand that choosing the wrong
                      educational path can lead to stress, lack of confidence,
                      academic struggles, and career dissatisfaction later in life.
                      Every child and student is unique, with different talents,
                      strengths, interests, and potential.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── COMMON QUESTIONS ────────── */}
          <div>
            <SectionHeader
              eyebrow="Dilemmas"
              title="Questions and Confusion"
            />
            <p className="mt-sp-4 max-w-[700px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
              Students and parents are often faced with crucial questions such as:
            </p>

            <StaggerReveal
              amount={0.05}
              className="mt-sp-6 grid grid-cols-1 gap-sp-3 md:grid-cols-2"
            >
              {COMMON_QUESTIONS.map((q) => (
                <StaggerItem key={q}>
                  <div className="flex items-start gap-3 rounded-card border border-gold-400/10 bg-card p-sp-4 h-full">
                    <GoldDot />
                    <span className="font-sans text-sm leading-relaxed text-text-secondary">
                      {q}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>

            <p className="mt-sp-6 font-sans text-[15px] italic leading-relaxed text-text-secondary">
              Through authentic Vedic Astrology, Numerology, and personalised analysis,
              we help students and parents make informed and confident educational decisions.
            </p>
          </div>

          {/* ────────── GUIDANCE BY DOB ────────── */}
          <div>
            <SectionHeader
              eyebrow="Insight"
              title="Education Guidance by Date of Birth"
            />
            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none max-w-[900px]">
                  <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    A student’s birth chart can offer meaningful insights into natural abilities,
                    aptitude, learning style, strengths, and suitable fields of education.
                    Our education stream guidance consultation helps identify academic directions
                    aligned with an individual’s personality and potential.
                  </p>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── WHICH STREAM ────────── */}
          <div>
            <SectionHeader
              eyebrow="Choices"
              title="Which Education Stream Is Best for You?"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                Many students struggle with specific questions and uncertainties regarding
                their path.
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-sp-4">
                    {STREAM_QUESTIONS.map((item) => (
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
                      If you are uncertain about educational choices, proper guidance can
                      help avoid confusion and future regret.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerReveal>
          </div>

          {/* ────────── HOW WE HELP ────────── */}
          <div>
            <SectionHeader
              eyebrow="Solutions"
              title="How Vedic Destiny Helps in Choosing the Right Stream"
            />

            <StaggerReveal
              amount={0.05}
              className="mt-sp-8 grid grid-cols-1 gap-sp-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {HOW_WE_HELP.map((r) => (
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

          {/* ────────── WHY TRUST US ────────── */}
          <div>
            <SectionHeader
              eyebrow="Trust"
              title="Why Parents & Students Trust Vedic Destiny"
            />
            <div className="mt-sp-5 space-y-4 max-w-[700px]">
              <p className="font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                At Vedic Destiny, we believe educational guidance should be compassionate,
                practical, and empowering — not fear-based. Our goal is to help students
                discover paths that align with their potential and future aspirations.
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                Why Choose Us?
              </p>
            </div>

            <StaggerReveal amount={0.1} className="mt-sp-6">
              <StaggerItem>
                <Card className="p-sp-6 lg:p-sp-8 bg-[rgba(184,146,40,0.05)] border-gold-400/10 shadow-none max-w-[800px]">
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
                    Give Your Child the Right Direction
                  </h2>
                  <p className="mx-auto mt-sp-4 max-w-[640px] font-sans text-[15px] leading-relaxed text-text-secondary lg:text-base">
                    Education is not only about marks — it is about discovering strengths,
                    passion, and the right path for future success. Making the right
                    educational choice today can help build a more confident and
                    fulfilling tomorrow.
                  </p>

                  <div className="mt-sp-8 rounded-xl bg-[rgba(184,146,40,0.05)] p-sp-5 border border-gold-400/10 mx-auto max-w-[680px]">
                    <p className="font-sans text-[16px] font-bold text-gold-600 mb-2">
                      Book Your Education Stream Consultation Today
                    </p>
                    <p className="font-sans text-sm italic leading-relaxed text-text-secondary">
                      The right education choice can shape the right future. Let wisdom guide the journey.
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
