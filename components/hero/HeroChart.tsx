"use client";

import ZodiacWheel from "@/components/ZodiacWheel";

export default function HeroChart() {
  // Free-floating — no card, no box, no background. The wheel handles its own
  // mount animation (scale 0.85 → 1, fade in) and is fully transparent.
  return (
    <div className="mx-auto w-full max-w-[460px]">
      <ZodiacWheel size={460} />
    </div>
  );
}
