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
  // current index within the real reviews (0..n-1), but we render 3× clones
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);

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

  const n = reviews.length;

  // When reviews load, start at middle clone set
  useEffect(() => {
    if (n > 0) setCurrent(n); // start at index n (middle copy)
  }, [n]);

  // Scroll track to the correct card instantly (no animation)
  const jumpTo = useCallback(
    (idx: number) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const cardW = (card?.offsetWidth ?? el.clientWidth) + 20; // card + gap
      el.scrollTo({ left: idx * cardW, behavior: "instant" as ScrollBehavior });
    },
    []
  );

  // Scroll track to the correct card with smooth animation
  const scrollTo = useCallback(
    (idx: number) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const cardW = (card?.offsetWidth ?? el.clientWidth) + 20;
      el.scrollTo({ left: idx * cardW, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );

  // Sync scroll position whenever current changes
  useEffect(() => {
    if (n === 0) return;
    scrollTo(current);
  }, [current, scrollTo, n]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      setCurrent((prev) => {
        const next = prev + dir;
        return next;
      });

      // After animation (~400ms), if we're in the cloned zone, silently reset
      setTimeout(() => {
        setCurrent((prev) => {
          if (prev >= n * 2) {
            // jumped into 3rd copy → reset to 2nd copy (same visual position)
            jumpTo(prev - n);
            return prev - n;
          }
          if (prev < n) {
            // jumped into 1st copy → reset to 2nd copy (same visual position)
            jumpTo(prev + n);
            return prev + n;
          }
          return prev;
        });
        isAnimating.current = false;
      }, 420);
    },
    [n, jumpTo]
  );

  // Auto-scroll every 5s, paused on hover and under reduced-motion.
  useEffect(() => {
    if (reduced || n <= 1) return;
    const id = window.setInterval(() => {
      if (!hovering.current) step(1);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduced, step, n]);

  if (n === 0) return null;

  // Render 3 copies for seamless infinite loop
  const displayReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section id="testimonials" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <div className="flex items-end justify-between gap-sp-5">
          <SectionHeader eyebrow="Testimonials" title="What clients say" />

          {/* Nav arrows */}
          {n > 1 && (
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
          style={{ scrollSnapType: "x mandatory" }}
        >
          {displayReviews.map((r, i) => (
            <div
              key={`${r.id || r.name}-${i}`}
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
