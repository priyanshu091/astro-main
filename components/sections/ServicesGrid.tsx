"use client";

import { useCallback, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Card from "@/components/ui/Card";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/Icon";

const EASE = [0.22, 0.61, 0.36, 1] as const;

// Custom inline SVG icons
function IconChildren(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="6" cy="13" r="1" />
      <circle cx="18" cy="13" r="1" />
    </svg>
  );
}

function IconCareer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18M3 17h6v4H3zM9 13h6v8H9zM15 9h6v12h-6z" />
      <path d="M18 5l-3 3M18 5h-4M18 5v4" />
    </svg>
  );
}

function IconProperty(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12l9-9 9 9M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
    </svg>
  );
}

function IconBusiness(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2" />
    </svg>
  );
}

function IconMedical(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconEducation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function IconLegal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v17M12 5h8M12 5H4M20 5l-2 5H22zM4 5L2 10H6zM12 20H4M12 20h8" />
    </svg>
  );
}

function IconMarriage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
      <path d="M11 8.5l1 1" />
    </svg>
  );
}

function IconForeign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7H8l2-7H6l-2 2H2l1-4-1-4h2l2 2h4l-2-7h4z" />
    </svg>
  );
}

function IconLoan(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8l-8 8M9 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    </svg>
  );
}

function IconStock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 3v18h18M9 15v4M9 5v4M9 9h4M15 11v6M15 5v2M15 17h4" />
      <rect x="7" y="9" width="4" height="6" rx="1" />
      <rect x="13" y="7" width="4" height="4" rx="1" />
    </svg>
  );
}

function IconClockEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l2.5 1.5M18.5 18.5l2.5 2.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
    </svg>
  );
}

function IconPredictive(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="10" r="7" />
      <path d="M5 18a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2H5z" />
      <path d="M10 7a2 2 0 0 1 2-2" opacity="0.6" />
    </svg>
  );
}

function IconRemedial(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21a6 6 0 0 0 6-6c0-3-6-9-6-9s-6 6-6 6a6 6 0 0 0 6 6z" />
      <path d="M12 11a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" opacity="0.7" />
    </svg>
  );
}

function IconVastu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18M3 12h18M12 3l3 3M12 3L9 6M12 21l3-3M12 21l-3-3M21 12l-3 3M21 12l-3-3M3 12l3 3M3 12l3-3" />
    </svg>
  );
}

function IconLalKitabPred(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h13z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function IconLalKitabRem(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h13z" />
      <path d="M14 10l4-4M18 6v4M18 6h-4" />
    </svg>
  );
}

function IconRudrakshaGems(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3h12l3 5-9 11L3 9z" />
      <path d="M3 9h18M9 3l-1.5 6h9L15 3M9 9l3 10 3-10" />
    </svg>
  );
}

const SERVICES = [
  {
    Icon: IconChildren,
    name: "Children Section",
    desc: "Astrological guidance regarding children’s health, personality development, well-being, and growth prospects.",
  },
  {
    Icon: IconCareer,
    name: "Career Section",
    desc: "Auspicious timings, optimal paths, job changes, and professional promotions aligned with your natal chart.",
  },
  {
    Icon: IconProperty,
    name: "Property Section",
    desc: "Guidance on property transactions, land acquisition, inheritance, investments, and home purchases.",
  },
  {
    Icon: IconBusiness,
    name: "Business Section",
    desc: "Astrological direction for commercial ventures, partnership options, investments, and business growth.",
  },
  {
    Icon: IconMedical,
    name: "Medical Section",
    desc: "Understanding physical/mental health timings, dasha indicators, and suitable holistic wellness practices.",
  },
  {
    Icon: IconEducation,
    name: "Education Section",
    desc: "Subject choices, academic success periods, higher study paths, and competitive exam alignments.",
  },
  {
    Icon: IconLegal,
    name: "Court & Legal Issues",
    desc: "Astrological analysis of transit houses and planets influencing legal disputes and court outcomes.",
  },
  {
    Icon: IconMarriage,
    name: "Marriage Section",
    desc: "Detailed relationship compatibility (Kundli Matching), marital harmony, and auspicious wedding timing.",
  },
  {
    Icon: IconForeign,
    name: "Foreign Visit/Settlement",
    desc: "Opportunities for global travel, higher studies abroad, foreign job postings, and visa approvals.",
  },
  {
    Icon: IconLoan,
    name: "Loan & Debt",
    desc: "Navigating debt release, release from financial pressure, and managing compound interest blocks.",
  },
  {
    Icon: IconStock,
    name: "Share Market Section",
    desc: "Astrological markers driving short-term trading, investments, and wealth accumulative cycles.",
  },
  {
    Icon: IconClockEdit,
    name: "Birth Time Rectification",
    desc: "Fine-tuning birth times down to the minute by matching significant life events with sub-divisional charts.",
  },
  {
    Icon: IconPredictive,
    name: "Predictive Section",
    desc: "Detailed future predictions based on dasha cycles, planetary transits, and progressive charts.",
  },
  {
    Icon: IconRemedial,
    name: "Remedial Section",
    desc: "Authentic, realistic remedies tailored to neutralize planetary afflictions and enhance beneficial placements.",
  },
  {
    Icon: IconVastu,
    name: "Vaastu for Residential & Commercial",
    desc: "Tuning directional energies and balancing element layouts in residential homes or business spaces.",
  },
  {
    Icon: IconLalKitabPred,
    name: "Lal Kitab Predictions",
    desc: "Unique, character-focused horoscope predictions using classic Lal Kitab house placement methods.",
  },
  {
    Icon: IconLalKitabRem,
    name: "Lal Kitab Remedies",
    desc: "Highly practical, simple, and realistic remedies to clear deep karmic debts and planetary blockages.",
  },
  {
    Icon: IconRudrakshaGems,
    name: "Rudraksha & Gems",
    desc: "Prescribing highly accurate gemstones, bead counts, and metals to restore physical and energetic balances.",
  },
];

export default function ServicesGrid() {
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll the mobile carousel one card at a time; loop back at the end.
  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const amount = (card?.offsetWidth ?? el.clientWidth) + 24; // card + gap (sp-5)
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (dir === 1 && atEnd) {
        el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
      } else {
        el.scrollBy({ left: dir * amount, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [reduced]
  );

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.05 } },
  };
  const item: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.5, ease: EASE },
    },
  };

  return (
    <section id="services" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <div className="flex items-end justify-between gap-sp-4">
          <SectionHeader
            eyebrow="Services"
            title="Astrological remedies for every aspect of life’s challenges."
          />

          {/* Carousel arrows — mobile only (desktop shows the full grid) */}
          <div className="flex shrink-0 gap-sp-3 md:hidden">
            <ArrowButton label="Previous services" onClick={() => step(-1)}>
              <IconChevronLeft size={18} />
            </ArrowButton>
            <ArrowButton label="Next services" onClick={() => step(1)}>
              <IconChevronRight size={18} />
            </ArrowButton>
          </div>
        </div>

        {/* Mobile: swipeable left/right carousel · md+: static grid */}
        <motion.div
          ref={trackRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="no-scrollbar mt-sp-8 flex snap-x snap-mandatory gap-sp-5 overflow-x-auto pb-3 md:mt-sp-10 md:grid md:grid-cols-3 md:gap-sp-5 md:overflow-visible md:pb-0 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.name}
              data-card
              variants={item}
              className="h-full min-w-full shrink-0 snap-start md:min-w-0 md:shrink"
            >
              <Card as="a" href="#contact" className="flex h-full flex-col p-6">
                <s.Icon className="text-gold-400 transition-transform duration-300 group-hover:scale-105" />
                <h3 className="mt-sp-4 font-sans text-base font-semibold text-text-primary">
                  {s.name}
                </h3>
                <p className="mt-sp-2 flex-1 font-sans text-[13px] leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ArrowButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gold-400 text-gold-500 transition-colors duration-200 hover:bg-[rgba(184,146,40,0.08)]"
    >
      {children}
    </button>
  );
}
