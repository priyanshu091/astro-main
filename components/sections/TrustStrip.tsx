import CountUp from "@/components/ui/CountUp";

const METRICS = [
  { value: 500, suffix: "+", label: "Consultations completed" },
  { value: 50, suffix: "+", label: "Vedic astrologers" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average rating" },
  { value: 15, suffix: "+", label: "Years combined experience" },
];

/**
 * Sits directly under the hero with no visual break — reads as the hero's tail.
 * 4-up row on desktop, 2x2 grid on mobile (per responsive spec).
 */
export default function TrustStrip() {
  return (
    <section className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 pb-sp-10 lg:pb-sp-16">
        <div className="grid grid-cols-2 gap-y-sp-6 border-y border-[rgba(212,175,106,0.08)] py-sp-6 md:grid-cols-4 md:divide-x md:divide-[rgba(212,175,106,0.08)]">
          {METRICS.map((m) => (
            <div key={m.label} className="px-sp-4 text-center">
              <div className="font-display text-[28px] font-medium text-gold-200">
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
