"use client";

import { motion } from "framer-motion";
import { HOUSE_CENTROIDS } from "./chartData";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * North Indian diamond grid drawn as a single continuous path so the
 * stroke-dashoffset draw-in animation reads as one motion.
 *
 *   - Outer square: 0,0 -> 300,300
 *   - Diagonals: corner to corner (both)
 *   - Inner diamond: connecting the four edge midpoints
 */
const GRID_PATH = [
  // outer square
  "M0 0 H300 V300 H0 Z",
  // both diagonals
  "M0 0 L300 300",
  "M300 0 L0 300",
  // inner diamond (edge midpoints)
  "M150 0 L300 150 L150 300 L0 150 Z",
].join(" ");

export default function KundliGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 300 300"
      width="100%"
      height="100%"
      role="img"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <filter id="grid-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2"
            floodColor="#D4A256"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <motion.path
        d={GRID_PATH}
        fill="none"
        stroke="var(--copper-400)"
        strokeWidth={1.25}
        strokeLinejoin="round"
        filter="url(#grid-glow)"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 1.5, delay: 0.5, ease: EASE }
        }
      />

      {/* House reference numbers — muted, not the focus */}
      {Object.entries(HOUSE_CENTROIDS).map(([house, c]) => (
        <text
          key={house}
          x={(c.left / 100) * 300}
          y={(c.top / 100) * 300}
          fontSize={11}
          fill="var(--copper-600)"
          fillOpacity={0.5}
          fontFamily="var(--font-fraunces), serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {house}
        </text>
      ))}
    </svg>
  );
}
