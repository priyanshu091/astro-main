"use client";

const GRID_PATH = [
  "M0 0 H300 V300 H0 Z",
  "M0 0 L300 300",
  "M300 0 L0 300",
  "M150 0 L300 150 L150 300 L0 150 Z",
].join(" ");

/**
 * Faint static diamond outline shown before a chart is generated.
 * `loading` adds a gentle pulse and swaps in the calculating message.
 */
export default function ChartPlaceholder({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      <svg
        viewBox="0 0 300 300"
        width="100%"
        height="100%"
        aria-hidden="true"
        className={loading ? "animate-pulse" : ""}
        style={{ display: "block" }}
      >
        <path
          d={GRID_PATH}
          fill="none"
          stroke="var(--copper-800)"
          strokeWidth={1.25}
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center p-sp-6">
        <p className="max-w-[220px] text-center font-sans text-sm text-text-muted">
          {loading
            ? "Calculating planetary positions…"
            : "Enter your birth details to generate your chart"}
        </p>
      </div>
    </div>
  );
}
