"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import KundliGrid from "./KundliGrid";
import PlanetOverlay from "./PlanetOverlay";
import ChartToggle from "./ChartToggle";
import { SAMPLE_CHART, type ChartVarga } from "./chartData";

/**
 * Main chart container: SVG diamond grid + HTML planet overlay + D1/D9 toggle.
 * The grid stays static across varga switches; only planet positions change.
 */
export default function KundliChart() {
  const [varga, setVarga] = useState<ChartVarga>("D1");
  const reducedMotion = useReducedMotion() ?? false;
  const planets = SAMPLE_CHART[varga];

  // Visually-hidden text list of positions for screen readers.
  const a11ySummary = planets
    .map((p) => `${p.name} in house ${p.house}`)
    .join(", ");

  return (
    <div>
      <div className="mb-sp-3 flex items-center justify-end">
        <ChartToggle value={varga} onChange={setVarga} />
      </div>

      <div
        className="relative w-full"
        style={{ aspectRatio: "1 / 1" }}
        role="img"
        aria-label={`Sample North Indian Kundli chart (${varga}). ${a11ySummary}.`}
      >
        <KundliGrid reducedMotion={reducedMotion} />
        <PlanetOverlay planets={planets} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}
