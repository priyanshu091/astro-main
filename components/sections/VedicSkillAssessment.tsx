"use client";

import { useId, useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { IconLock, IconChevronDown } from "@/components/ui/Icon";

type Status = "idle" | "loading" | "done";

// Built-in city list stand-in
const CITIES = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh, Punjab",
  "Indore, Madhya Pradesh",
];

const DOMAINS = [
  { value: "tech", label: "Software & Technology" },
  { value: "design", label: "Design & Creative Arts" },
  { value: "business", label: "Business & Entrepreneurship" },
  { value: "science", label: "Science & Research" },
  { value: "strategy", label: "Strategy & Consulting" },
  { value: "healing", label: "Healing & Wellness" },
];

const SKILL_PROFILES: Record<
  string,
  {
    title: string;
    description: string;
    skills: { name: string; score: number }[];
    badges: string[];
    influences: { factor: string; placement: string; description: string }[];
    roles: string[];
  }
> = {
  tech: {
    title: "Vedic Architect of Systems (Mercury & Saturn Dominant)",
    description: "Your birth chart shows a strong alignment between Mercury (logic and computation) and Saturn (structure and discipline). You are highly suited for engineering, logic systems, and architectural scalability, with a focus on long-term structure and precision.",
    skills: [
      { name: "Logical Problem Solving (Mercury)", score: 94 },
      { name: "System Architecture (Saturn)", score: 88 },
      { name: "Technical Execution (Mars)", score: 85 },
      { name: "Creative Logic (Venus)", score: 72 },
    ],
    badges: ["Systems Architect", "Logical Genius", "Disciplined Engineer"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Saturn in Capricorn",
        description: "Provides immense perseverance and deep structural understanding. Excellent for managing massive scale and infrastructure.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Virgo (Exalted)",
        description: "Creates a sharp, compiler-like intellect. Exceptional at debugging, coding, and logical breakdown.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Revati Nakshatra",
        description: "Connects technical systems back to human needs. Fosters high user empathy and clean UX principles.",
      },
    ],
    roles: ["Software Architect", "Lead Engineer", "Systems Analyst", "DevOps Strategist"],
  },
  design: {
    title: "Cosmic Visual Alchemist (Venus & Moon Dominant)",
    description: "Your birth chart highlights an extraordinary connection between Venus (aesthetics, design, art) and the Moon (emotion, user empathy). Your professional path is driven by visual balance, spatial arrangement, and crafting delightful, responsive human experiences.",
    skills: [
      { name: "Visual Aesthetics (Venus)", score: 96 },
      { name: "User Empathy & Intuition (Moon)", score: 92 },
      { name: "Creative Strategy (Jupiter)", score: 84 },
      { name: "Interface Crafting (Mars)", score: 75 },
    ],
    badges: ["Visual Storyteller", "Empathy Advocate", "Pixel Alchemist"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Venus in Taurus",
        description: "Brings strong appreciation for harmony, color, and premium design. Makes you a natural design leader.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Gemini",
        description: "Enables fast ideation, rich prototyping, and clear presentation of complex ideas to cross-functional teams.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Chitra Nakshatra",
        description: "The Nakshatra of the cosmic craftsman. Gives unparalleled attention to detail, symmetry, and architectural aesthetics.",
      },
    ],
    roles: ["Lead UI/UX Designer", "Product Designer", "Creative Director", "Frontend Architect"],
  },
  business: {
    title: "Cosmic Enterprise Sovereign (Sun & Mars Dominant)",
    description: "Your birth chart indicates a powerful alignment of the Sun (leadership, authority, status) and Mars (action, execution, courage). You possess a high risk-tolerance, strong strategic vision, and natural leadership capabilities.",
    skills: [
      { name: "Leadership & Decision Making (Sun)", score: 95 },
      { name: "Execution & Drive (Mars)", score: 90 },
      { name: "Strategic Vision (Jupiter)", score: 86 },
      { name: "Resource Management (Saturn)", score: 78 },
    ],
    badges: ["Natural Leader", "Market Pioneer", "Execution Dynamo"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Sun in Leo",
        description: "Creates an authoritative presence. You command respect and excel in high-stakes environments where direction is needed.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Aries",
        description: "Fosters rapid decision-making, direct communication, and a bias-to-action mindset.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Krithika Nakshatra",
        description: "A Nakshatra of sharp determination and cutting-edge vision. Excellent for driving growth and business transformation.",
      },
    ],
    roles: ["Founder / Entrepreneur", "VP of Product", "Operations Director", "Business Strategist"],
  },
  science: {
    title: "Vedic Truth Seeker & Researcher (Ketu & Jupiter Dominant)",
    description: "Your birth chart shows a strong influence of Ketu (deep spiritual and analytical penetration) and Jupiter (wisdom, higher knowledge). You have a deep-dive mindset, highly analytical cognitive style, and a love for solving complex, fundamental mysteries.",
    skills: [
      { name: "Analytical Depth (Ketu)", score: 97 },
      { name: "Systemic Wisdom (Jupiter)", score: 91 },
      { name: "Research Methodology (Saturn)", score: 84 },
      { name: "Pattern Recognition (Mercury)", score: 82 },
    ],
    badges: ["Deep-Dive Analyst", "Truth Seeker", "Insight Generator"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Jupiter in Sagittarius",
        description: "Gives a philosophical and highly organized approach to complex research and systemic modeling.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Aquarius",
        description: "Enables highly unconventional, lateral thinking and outstanding abstract mathematical problem-solving.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Shatabhisha Nakshatra",
        description: "The Nakshatra of 'a hundred healers' and secret codes. Gives supreme aptitude for research, statistics, and uncovering hidden truths.",
      },
    ],
    roles: ["Data Scientist", "Research Lead", "AI Researcher", "Cryptographer / Security Specialist"],
  },
  strategy: {
    title: "Vedic Strategy Counselor (Jupiter & Mercury Dominant)",
    description: "Your birth chart highlights an exceptional harmony between Jupiter (guidance, consulting, expansion) and Mercury (analysis, communication, planning). You are built to advise, structure frameworks, and map out paths of growth.",
    skills: [
      { name: "Growth Strategy (Jupiter)", score: 93 },
      { name: "Consulting & Advice (Mercury)", score: 90 },
      { name: "Structured Planning (Saturn)", score: 83 },
      { name: "Creative Ideation (Venus)", score: 79 },
    ],
    badges: ["Strategic Counselor", "Growth Advisor", "Framework Architect"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Jupiter in Pisces",
        description: "Brings intuitive advisory skills, helping companies align profit with ethical responsibility and large-scale vision.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Libra",
        description: "Enables highly balanced, diplomatic problem-solving that synthesizes multiple stakeholder perspectives.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Uttara Ashadha Nakshatra",
        description: "Brings enduring success, respect, and deep strategic focus to executive counseling roles.",
      },
    ],
    roles: ["Strategy Consultant", "Product Manager", "Management Advisor", "Growth Strategist"],
  },
  healing: {
    title: "Pranic Healing & Wellness Specialist (Moon & Ketu Dominant)",
    description: "Your birth chart shows a strong placement of the Moon (nurturing, empathy) and Ketu (spiritual healing, alternative therapies). You are naturally aligned with mental wellness, healing, medicine, and empathetic service.",
    skills: [
      { name: "Empathy & Care (Moon)", score: 98 },
      { name: "Intuitive Healing (Ketu)", score: 92 },
      { name: "Ethical Leadership (Jupiter)", score: 85 },
      { name: "Wellness Integration (Venus)", score: 80 },
    ],
    badges: ["Empathetic Healer", "Pranic Guide", "Wellness Catalyst"],
    influences: [
      {
        factor: "10th House (Karma Bhava)",
        placement: "Moon in Cancer",
        description: "Fosters deep emotional intelligence and nurturing qualities, perfect for health, therapy, and coaching.",
      },
      {
        factor: "Cognitive Style (Mercury)",
        placement: "Mercury in Pisces (Debilitated but Cancelled)",
        description: "Intuitive, non-linear thinking that excels at reading vibes and emotions rather than dry analytical data.",
      },
      {
        factor: "Instinct & Empathy (Nakshatra)",
        placement: "Ashwini Nakshatra",
        description: "Represented by the horse-headed healers of heaven. Gives rapid healing abilities, vital energy, and clinical intuition.",
      },
    ],
    roles: ["Therapist / Counselor", "Health Consultant", "Wellness Program Designer", "Empathetic Coach"],
  },
};

const FIELD_LABEL =
  "mb-1.5 block font-sans text-[13px] font-medium text-text-secondary";

export default function VedicSkillAssessment() {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("");
  const [domain, setDomain] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [loadStep, setLoadStep] = useState(0);

  const cityMatches = useMemo(() => {
    const q = place.trim().toLowerCase();
    if (!q) return [];
    return CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 5);
  }, [place]);

  const loadingPhrases = [
    "Locating 10th Lord (Karma Bhava) in Kundli Houses...",
    "Analyzing Mercury (cognitive power) & Sun (leadership)...",
    "Mapping Nakshatra career indicators & planet strengths...",
    "Compiling professional cosmic skill dashboard...",
  ];

  // Loading animation sequence
  useEffect(() => {
    if (status !== "loading") return;

    let timerId: number;
    const nextStep = () => {
      setLoadStep((prev) => {
        if (prev >= loadingPhrases.length - 1) {
          setStatus("done");
          return 0;
        }
        timerId = window.setTimeout(nextStep, reduced ? 0 : 800);
        return prev + 1;
      });
    };

    timerId = window.setTimeout(nextStep, reduced ? 0 : 800);
    return () => window.clearTimeout(timerId);
  }, [status, reduced]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoadStep(0);
    setStatus("loading");
  }

  const profile = SKILL_PROFILES[domain] || SKILL_PROFILES.tech;

  return (
    <section id="skills" className="bg-bg-void border-t border-[rgba(184,146,40,0.1)]">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader
          eyebrow="Vedic Pro Skills"
          title="Vedic Career Skill Assessment"
        />

        <div className="mt-sp-8 grid grid-cols-1 gap-sp-8 lg:mt-sp-10 lg:grid-cols-12 lg:gap-sp-10">
          {/* Left / Input form: 5 cols */}
          <div className="lg:col-span-5">
            <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-bg-cosmos p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-sp-4">
                <Input
                  id={`${uid}-name`}
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />

                <div className="grid grid-cols-1 gap-sp-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-dob`} className={FIELD_LABEL}>
                      Date of birth
                    </label>
                    <input
                      id={`${uid}-dob`}
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className="h-12 w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-tob`} className={FIELD_LABEL}>
                      Time of birth
                    </label>
                    <input
                      id={`${uid}-tob`}
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      required
                      className="h-12 w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Place of birth — autocomplete */}
                <div className="relative">
                  <Input
                    id={`${uid}-place`}
                    label="Place of birth"
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                      setShowCities(true);
                    }}
                    onFocus={() => setShowCities(true)}
                    onBlur={() => window.setTimeout(() => setShowCities(false), 120)}
                    autoComplete="off"
                    required
                  />
                  {showCities && cityMatches.length > 0 && (
                    <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-input border border-[rgba(184,146,40,0.18)] bg-bg-elevated shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                      {cityMatches.map((c) => (
                        <li key={c}>
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setPlace(c);
                              setShowCities(false);
                            }}
                            className="flex w-full cursor-pointer items-center px-4 py-2.5 text-left font-sans text-sm text-text-secondary transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                          >
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Professional Domain */}
                <div>
                  <label htmlFor={`${uid}-domain`} className={FIELD_LABEL}>
                    Professional Field
                  </label>
                  <div className="relative">
                    <select
                      id={`${uid}-domain`}
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      required
                      className="h-12 w-full appearance-none rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 pr-10 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                      style={{ color: domain ? "var(--text-primary)" : "var(--text-muted)" }}
                    >
                      <option value="" disabled>
                        Select your field
                      </option>
                      {DOMAINS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown
                      size={18}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="mt-sp-2 w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Analyzing Cosmic Alignment..." : "Analyze My Career Skills"}
                </Button>
              </form>

              <p className="mt-sp-4 flex items-center gap-sp-2 font-sans text-xs text-text-muted">
                <IconLock size={14} className="shrink-0 text-text-muted" />
                Vedic algorithms secure your birth charts. Fully private and encrypted.
              </p>
            </div>
          </div>

          {/* Right / Dynamic Dashboard Display: 7 cols */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className="flex-1 rounded-card border border-[rgba(184,146,40,0.12)] bg-bg-cosmos p-6 min-h-[420px] flex flex-col justify-center relative overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, rgba(184,146,40,0.03), rgba(255,255,255,0) 70%)",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-sp-6 flex flex-col items-center justify-center h-full"
                  >
                    {/* Golden decorative astrological icon */}
                    <div className="w-16 h-16 rounded-full border border-gold-400/20 bg-bg-surface flex items-center justify-center text-gold-400 mb-sp-4 shadow-sm animate-pulse">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-8 h-8"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v18M3 12h18" strokeDasharray="3 3" />
                        <path d="M7 7l10 10M17 7L7 17" />
                        <circle cx="12" cy="12" r="3" fill="var(--bg-cosmos)" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      Ready for Skill Horoscope
                    </h3>
                    <p className="mt-sp-3 max-w-sm text-sm text-text-secondary leading-relaxed">
                      Enter your name, birth credentials, and professional discipline on the left to reveal your Vedic cosmic strengths and recommended pro-level roles.
                    </p>
                  </motion.div>
                )}

                {status === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center p-sp-6"
                  >
                    {/* Cosmic revolving loading wheel */}
                    <div className="relative w-24 h-24 mb-sp-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-gold-400/30"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-2 rounded-full border border-saffron-400/50 flex items-center justify-center"
                      >
                        <span className="text-gold-400">☸</span>
                      </motion.div>
                    </div>

                    <h4 className="font-sans text-sm font-semibold tracking-wider text-gold-400 uppercase">
                      Vedic Engine Calculating
                    </h4>
                    <p className="mt-sp-3 font-mono text-sm text-text-primary min-h-[24px]">
                      {loadingPhrases[loadStep]}
                    </p>
                  </motion.div>
                )}

                {status === "done" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {/* Header */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-sp-2">
                        <span className="eyebrow text-saffron-500 font-bold">Your Vedic Cosmic Profile</span>
                        <div className="flex gap-sp-1">
                          {profile.badges.map((b) => (
                            <span
                              key={b}
                              className="rounded-full bg-gold-400/10 px-2 py-0.5 font-sans text-[11px] font-semibold text-gold-600 border border-gold-400/20"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="mt-sp-3 font-display text-2xl font-semibold text-text-primary leading-tight">
                        {profile.title}
                      </h3>
                      <p className="mt-sp-3 text-sm leading-relaxed text-text-secondary">
                        {profile.description}
                      </p>
                    </div>

                    {/* Skill Meters */}
                    <div className="mt-sp-5 space-y-sp-3">
                      <h4 className="font-sans text-[12px] font-bold uppercase tracking-wider text-text-muted">
                        Vedic Strengths Matrix
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {profile.skills.map((s) => (
                          <div key={s.name} className="space-y-1">
                            <div className="flex justify-between font-sans text-xs">
                              <span className="font-medium text-text-secondary">{s.name}</span>
                              <span className="font-semibold text-text-primary">{s.score}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-bg-surface">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.score}%` }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold-400),var(--saffron-400))]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cosmic influences */}
                    <div className="mt-sp-5 space-y-sp-3">
                      <h4 className="font-sans text-[12px] font-bold uppercase tracking-wider text-text-muted">
                        Planetary Placement Drivers
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {profile.influences.map((inf) => (
                          <div
                            key={inf.factor}
                            className="rounded-input border border-gold-400/10 bg-bg-surface/50 p-3 hover:border-gold-400/20 transition-all duration-200"
                          >
                            <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-text-muted">
                              {inf.factor}
                            </span>
                            <span className="block mt-1 font-sans text-xs font-semibold text-gold-600">
                              {inf.placement}
                            </span>
                            <p className="mt-1 font-sans text-[11px] text-text-secondary leading-snug">
                              {inf.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer/CTA */}
                    <div className="mt-sp-6 pt-sp-4 border-t border-[rgba(184,146,40,0.08)] flex flex-col sm:flex-row items-center justify-between gap-sp-3">
                      <div className="text-left">
                        <span className="block font-sans text-[11px] text-text-muted uppercase tracking-wider">
                          Recommended Roles
                        </span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {profile.roles.map((role) => (
                            <span key={role} className="font-sans text-xs font-medium text-text-primary">
                              {role} &middot;
                            </span>
                          ))}
                          <span className="font-sans text-xs font-medium text-text-primary">More</span>
                        </div>
                      </div>

                      <Button
                        as="a"
                        href="/about"
                        variant="secondary"
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        Deep Dive Career Chart &rarr;
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
