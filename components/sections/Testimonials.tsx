"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  IconStarFilled,
  IconChevronLeft,
  IconChevronRight,
} from "@/components/ui/Icon";

type Review = {
  id?: string;
  quote: string;
  name: string;
  detail: string;
  stars: number;
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const reduced = useReducedMotion() ?? false;
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  // Sync client-side
  useEffect(() => {
    const localBlogs = localStorage.getItem("astro_blogs_local");
    if (localBlogs) {
      try {
        const parsed = JSON.parse(localBlogs);
        if (parsed.testimonials && parsed.testimonials.length > 0) {
          setReviews(parsed.testimonials);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const json = await res.json();
          if (json.testimonials) {
            setReviews(json.testimonials);
            localStorage.setItem("astro_blogs_local", JSON.stringify(json));
          }
        }
      } catch (e) {
        console.error("Failed to fetch latest testimonials", e);
      }
    };
    fetchLatest();
  }, []);

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
    if (reduced || reviews.length <= 1) return;
    const id = window.setInterval(() => {
      if (!hovering.current) step(1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [reduced, step, reviews.length]);

  if (reviews.length === 0) {
    return null; // Don't render empty section
  }

  return (
    <section id="testimonials" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <div className="flex items-end justify-between gap-sp-5">
          <SectionHeader eyebrow="Testimonials" title="What clients say" />

          {/* Nav arrows */}
          {reviews.length > 1 && (
            <div className="flex shrink-0 gap-sp-3">
              <ArrowButton label="Previous testimonial" onClick={() => step(-1)}>
                <IconChevronLeft size={18} />
              </ArrowButton>
              <ArrowButton label="Next testimonial" onClick={() => step(1)}>
                <IconChevronRight size={18} />
              </ArrowButton>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
          className="no-scrollbar mt-sp-8 flex snap-x snap-mandatory gap-sp-5 overflow-x-auto pb-2 lg:mt-sp-10"
        >
          {reviews.map((r) => (
            <div
              key={r.id || r.name}
              data-card
              className="flex min-w-full shrink-0 snap-center justify-center sm:block sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
            >
              <article
                className="flex h-full w-full max-w-sm flex-col rounded-card border border-[rgba(184,146,40,0.1)] border-l-[3px] border-l-gold-400 bg-bg-cosmos p-7 sm:max-w-none"
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
            </div>
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
