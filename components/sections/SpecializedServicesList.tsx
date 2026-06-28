"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Subcategory {
  name: string;
  href?: string;
}

interface SpecializedServicesListProps {
  subcategories: Subcategory[];
}

export default function SpecializedServicesList({ subcategories }: SpecializedServicesListProps) {
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(subcategories.length / itemsPerPage);

  // If 4 or fewer items, render them statically
  if (subcategories.length <= itemsPerPage) {
    return (
      <ul className="space-y-3">
        {subcategories.map((sub, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-gold-400" />
            {sub.href ? (
              <a href={sub.href} className="font-sans text-[15px] text-text-primary hover:text-gold-600 transition-colors">
                {sub.name}
              </a>
            ) : (
              <span className="font-sans text-[15px] text-text-primary">{sub.name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalPages]);

  const currentItems = subcategories.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div
      className="relative flex flex-col justify-between h-full min-h-[175px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={page}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-3"
          >
            {currentItems.map((sub, i) => {
              const originalIndex = page * itemsPerPage + i;
              return (
                <li key={`${originalIndex}-${i}`} className="flex items-start gap-3">
                  <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 items-center justify-center rounded-full bg-gold-400" />
                  {sub.href ? (
                    <a href={sub.href} className="font-sans text-[15px] text-text-primary hover:text-gold-600 transition-colors">
                      {sub.name}
                    </a>
                  ) : (
                    <span className="font-sans text-[15px] text-text-primary">{sub.name}</span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="mt-sp-4 flex items-center gap-1.5 pt-sp-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              page === idx
                ? "w-4 bg-gold-400"
                : "w-1.5 bg-gold-400/20 hover:bg-gold-400/40"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
