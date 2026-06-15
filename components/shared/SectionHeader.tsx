"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Eyebrow + section-title pattern used to head every section.
 * Fades up once on scroll into view.
 */
export default function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
      className={`flex flex-col ${alignment} ${className}`}
    >
      <span className="eyebrow text-gold-400">{eyebrow}</span>
      <h2 className="font-display mt-sp-3 text-[clamp(1.75rem,4vw,2.625rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
        {title}
      </h2>
    </motion.div>
  );
}
