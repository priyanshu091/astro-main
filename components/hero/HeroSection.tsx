import HeroText from "./HeroText";
import HeroChart from "./HeroChart";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-bg-void"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 120% 70% at 50% -15%, rgba(40, 30, 70, 0.4) 0%, transparent 65%)",
      }}
    >
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-sp-10 px-sp-5 pb-sp-10 pt-sp-4 lg:grid-cols-12 lg:gap-sp-8 lg:pb-sp-16 lg:pt-sp-6">
        {/* Left: text — 7 of 12 cols (~58%) */}
        <div className="lg:col-span-7">
          <HeroText />
        </div>

        {/* Right: interactive Kundli chart — 5 of 12 cols (~42%) */}
        <div className="lg:col-span-5">
          <HeroChart />
        </div>
      </div>
    </section>
  );
}
