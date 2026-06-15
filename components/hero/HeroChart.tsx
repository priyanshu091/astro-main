"use client";

import { motion, useReducedMotion } from "framer-motion";
import KundliChart from "@/components/chart/KundliChart";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function HeroChart() {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.6, ease: EASE }}
      className="relative rounded-card border border-[rgba(212,175,106,0.12)] bg-bg-cosmos p-sp-5 shadow-chart-float"
      style={{
        backgroundImage:
          "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
      }}
    >
      <KundliChart />

      <a
        href="#kundli"
        className="mt-sp-4 block text-center font-sans text-xs text-text-muted transition-colors hover:text-gold-200"
      >
        Sample chart &mdash; generate yours free &rarr;
      </a>
    </motion.div>
  );
}
