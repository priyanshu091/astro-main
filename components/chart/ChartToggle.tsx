"use client";

import { motion } from "framer-motion";
import type { ChartVarga } from "./chartData";

const OPTIONS: { value: ChartVarga; label: string }[] = [
  { value: "D1", label: "D1" },
  { value: "D9", label: "D9" },
];

export default function ChartToggle({
  value,
  onChange,
}: {
  value: ChartVarga;
  onChange: (v: ChartVarga) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Chart varga"
      className="relative flex items-center gap-1 rounded-full border border-[rgba(212,175,106,0.12)] bg-bg-surface p-1"
    >
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className="relative cursor-pointer rounded-full px-3 py-1 font-sans text-xs font-semibold transition-colors duration-200"
            style={{ color: active ? "var(--text-on-gold)" : "var(--text-secondary)" }}
          >
            {active && (
              <motion.span
                layoutId="varga-pill"
                className="brass-orb absolute inset-0 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
