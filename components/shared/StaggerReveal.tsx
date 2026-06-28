"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Scroll-triggered stagger container. Wrap children in <StaggerItem>.
 * Reveals once and respects reduced-motion.
 */
export function StaggerReveal({
  children,
  stagger = 0.08,
  className = "",
  amount = 0.05,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 16,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion() ?? false;

  const item: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : duration, ease: EASE },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
