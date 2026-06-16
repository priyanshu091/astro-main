"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  IconStarFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@/components/ui/Icon";

type Review = {
  quote: string;
  name: string;
  detail: string;
  stars: number;
};

const REVIEWS: Review[] = [
  {
    quote:
      "I went in skeptical and came out with a genuinely useful framework for a job decision. No fear-mongering, no upselling — just a clear read of my chart.",
    name: "Arjun Mehta",
    detail: "Software Engineer, Bangalore · Career & Finance",
    stars: 5,
  },
  {
    quote:
      "The compatibility session was thorough and surprisingly grounded. He walked us through the actual placements instead of vague reassurances.",
    name: "Sneha & Karthik",
    detail: "Couple, Pune · Marriage Compatibility",
    stars: 5,
  },
  {
    quote:
      "Booking was effortless and the recorded session meant I could revisit the remedies later. Soumitra was patient with every question.",
    name: "Priya Nair",
    detail: "Product Manager, Mumbai · Annual Predictions",
    stars: 5,
  },
  {
    quote:
      "Got my muhurta for the house registration in minutes, with a clear explanation of why those dates worked. Felt like talking to a real expert.",
    name: "Rahul Deshpande",
    detail: "Entrepreneur, Hyderabad · Muhurta",
    stars: 4,
  },
  {
    quote:
      "The detailed reading covered my dasha periods in a way no app ever has. It's the first time astrology felt precise rather than generic.",
    name: "Ananya Rao",
    detail: "Doctor, Chennai · Birth Chart Analysis",
    stars: 5,
  },
];

export default function Testimonials() {
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const amount = (card?.offsetWidth ?? el.clientWidth) + 24; // card + gap
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

      if (dir === 1 && atEnd) {
        el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
      } else {
        el.scrollBy({ left: dir * amount, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [reduced]
  );

  // Auto-scroll every 6s, paused on hover and under reduced-motion.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!hovering.current) step(1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduced, step]);

  return (
    <section id="testimonials" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <div className="flex items-end justify-between gap-sp-5">
          <SectionHeader eyebrow="Testimonials" title="What clients say" />

          {/* Nav arrows */}
          <div className="hidden shrink-0 gap-sp-3 sm:flex">
            <ArrowButton label="Previous testimonial" onClick={() => step(-1)}>
              <IconChevronLeft size={18} />
            </ArrowButton>
            <ArrowButton label="Next testimonial" onClick={() => step(1)}>
              <IconChevronRight size={18} />
            </ArrowButton>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          className="mt-sp-8 flex snap-x snap-mandatory gap-sp-5 overflow-x-auto pb-2 lg:mt-sp-10 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              data-card
              className="flex min-w-[85%] shrink-0 snap-start flex-col rounded-card border border-[rgba(184,146,40,0.1)] border-l-[3px] border-l-gold-400 bg-bg-cosmos p-7 sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-saffron-400" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStarFilled
                    key={i}
                    size={15}
                    className={i < r.stars ? "" : "opacity-20"}
                  />
                ))}
              </div>

              <p className="mt-sp-4 flex-1 font-sans text-base italic leading-relaxed text-text-primary">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="mt-sp-5">
                <p className="font-sans text-sm font-semibold text-text-primary">
                  {r.name}
                </p>
                <p className="mt-0.5 font-sans text-[13px] text-text-muted">
                  {r.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
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
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold-400 text-gold-200 transition-colors duration-200 hover:bg-[rgba(184,146,40,0.08)]"
    >
      {children}
    </button>
  );
}
