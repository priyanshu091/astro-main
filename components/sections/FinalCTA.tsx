"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function FinalCTA() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="bg-bg-void"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(40, 30, 70, 0.3) 0%, transparent 70%)",
      }}
    >
      <motion.div
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="mx-auto flex max-w-[640px] flex-col items-center px-sp-5 py-sp-16 text-center lg:py-[160px]"
      >
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
          Ready to see your chart?
        </h2>
        <p className="mt-sp-4 max-w-[420px] font-sans text-base text-text-secondary">
          Generate your free Kundli or book a session with an expert today.
        </p>

        <div className="mt-sp-6 flex flex-col gap-sp-4 sm:flex-row sm:items-center">
          <Button as="a" href="#pricing" variant="primary" size="lg">
            Book a consultation
          </Button>
          <Button as="a" href="#kundli" variant="secondary" size="lg">
            Generate free Kundli
          </Button>
        </div>

        <p className="mt-sp-5 font-mono text-[13px] text-text-muted">
          500+ consultations completed &middot; 4.9&#9733; average rating
        </p>
      </motion.div>
    </section>
  );
}
