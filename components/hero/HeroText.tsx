"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function HeroText() {
  const reduced = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.1 },
    },
  };

  const item: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl"
    >
      <motion.p
        variants={item}
        className="eyebrow text-gold-400"
      >
        Vedic astrology, personalized
      </motion.p>

      <motion.h1
        variants={item}
        className="font-display mt-sp-4 text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-text-primary"
      >
        Clarity for life&rsquo;s biggest decisions
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-sp-5 max-w-[480px] text-[18px] font-normal leading-relaxed text-text-secondary"
      >
        Gain deep cosmic insights and practical remedies for your career, marriage, health, and Vastu from Lucknow's trusted expert.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-sp-6 flex flex-col gap-sp-4 sm:flex-row sm:items-center"
      >
        <Button as="a" href="/about" variant="primary" size="lg">
          Connect with Astrologer Acharya Soumitra Roy Chowdhury
        </Button>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-sp-5 font-mono text-[13px] text-text-muted"
      >
        10,000+ consultations completed &middot; 4.9&#9733; average rating
      </motion.p>
    </motion.div>
  );
}
