"use client";

import { motion, useReducedMotion } from "framer-motion";
import KundliChart from "@/components/chart/KundliChart";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function HeroChart() {
  const reduced = useReducedMotion() ?? false;

  // Free-floating — no card, border, fill, or shadow behind the wheel.
  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.6, ease: EASE }}
      className="relative mx-auto w-full max-w-[460px]"
    >
      <KundliChart />
    </motion.div>
  );
}
