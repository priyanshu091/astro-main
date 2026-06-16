import CountUp from "@/components/ui/CountUp";

const METRICS = [
  { value: 10000, suffix: "+", label: "Consultations completed" },
  { value: 30, suffix: "+", label: "Years expert experience" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average rating" },
  { value: 100, suffix: "%", label: "Realistic remedies" },
];

/**
 * Sits directly under the hero with no visual break — reads as the hero's tail.
 * 4-up row on desktop, 2x2 grid on mobile (per responsive spec).
 */
export default function TrustStrip() {
  return (
    <section className="bg-bg-stats">
      <div className="mx-auto max-w-content px-sp-5 py-sp-8 lg:py-sp-10">
        <div className="grid grid-cols-2 gap-y-sp-6 border-y border-[rgba(184,146,40,0.15)] py-sp-6 md:grid-cols-4 md:divide-x md:divide-[rgba(184,146,40,0.15)]">
          {METRICS.map((m) => (
            <div key={m.label} className="px-sp-4 text-center">
              <div className="font-display text-[28px] font-medium text-gold-500">
                <CountUp value={m.value} decimals={m.decimals ?? 0} suffix={m.suffix} />
              </div>
              <div className="mt-sp-2 font-sans text-[13px] text-text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
