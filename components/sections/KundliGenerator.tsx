"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import KundliChart from "@/components/chart/KundliChart";
import ChartPlaceholder from "@/components/chart/ChartPlaceholder";
import { IconLock, IconChevronDown } from "@/components/ui/Icon";

type Status = "idle" | "loading" | "done";

// Small built-in city list — stands in for a Places API / city database.
const CITIES = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Chandigarh, Punjab",
  "Indore, Madhya Pradesh",
];

const FIELD_LABEL =
  "mb-1.5 block font-sans text-[13px] font-medium text-text-secondary";

export default function KundliGenerator() {
  const reduced = useReducedMotion() ?? false;
  const uid = useId();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("");
  const [gender, setGender] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const cityMatches = useMemo(() => {
    const q = place.trim().toLowerCase();
    if (!q) return [];
    return CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 5);
  }, [place]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Simulated calculation — the real chart comes from the ephemeris engine.
    window.setTimeout(() => setStatus("done"), reduced ? 0 : 1600);
  }

  return (
    <section id="kundli" className="bg-bg-void">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <SectionHeader
          eyebrow="Free Kundli"
          title="Generate your birth chart in seconds"
        />

        <div className="mt-sp-8 grid grid-cols-1 gap-sp-8 lg:mt-sp-10 lg:grid-cols-2 lg:gap-sp-10">
          {/* Left: form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-sp-4">
              <Input
                id={`${uid}-name`}
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />

              <div className="grid grid-cols-1 gap-sp-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-dob`} className={FIELD_LABEL}>
                    Date of birth
                  </label>
                  <input
                    id={`${uid}-dob`}
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="h-12 w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-tob`} className={FIELD_LABEL}>
                    Time of birth
                  </label>
                  <input
                    id={`${uid}-tob`}
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    required
                    className="h-12 w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                  />
                </div>
              </div>

              {/* Place of birth — autocomplete */}
              <div className="relative">
                <Input
                  id={`${uid}-place`}
                  label="Place of birth"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                    setShowCities(true);
                  }}
                  onFocus={() => setShowCities(true)}
                  onBlur={() => window.setTimeout(() => setShowCities(false), 120)}
                  autoComplete="off"
                  required
                />
                {showCities && cityMatches.length > 0 && (
                  <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-input border border-[rgba(184,146,40,0.18)] bg-bg-elevated shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
                    {cityMatches.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setPlace(c);
                            setShowCities(false);
                          }}
                          className="flex w-full cursor-pointer items-center px-4 py-2.5 text-left font-sans text-sm text-text-secondary transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Gender */}
              <div>
                <label htmlFor={`${uid}-gender`} className={FIELD_LABEL}>
                  Gender
                </label>
                <div className="relative">
                  <select
                    id={`${uid}-gender`}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="h-12 w-full appearance-none rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 pr-10 font-sans text-[15px] text-text-primary transition-[border-color,box-shadow] duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none"
                    style={{ color: gender ? "var(--text-primary)" : "var(--text-muted)" }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <IconChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-sp-2 w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Calculating…" : "Generate my Kundli"}
              </Button>
            </form>

            {/* Privacy note */}
            <p className="mt-sp-4 flex items-center gap-sp-2 font-sans text-xs text-text-muted">
              <IconLock size={14} className="shrink-0 text-text-muted" />
              Your birth data is encrypted and never shared. We use it only to
              generate your chart.
            </p>
          </div>

          {/* Right: chart display */}
          <div className="flex flex-col">
            <div
              className="rounded-card border border-[rgba(184,146,40,0.12)] bg-bg-cosmos p-sp-5"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="chart"
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduced ? 0 : 0.4 }}
                  >
                    <KundliChart />
                    <div className="mt-sp-4 border-t border-[rgba(184,146,40,0.08)] pt-sp-4">
                      <dl className="flex flex-wrap gap-x-sp-8 gap-y-sp-2 font-mono text-[13px]">
                        <div>
                          <dt className="inline text-text-muted">Ascendant: </dt>
                          <dd className="inline text-text-primary">Leo</dd>
                        </div>
                        <div>
                          <dt className="inline text-text-muted">Moon sign: </dt>
                          <dd className="inline text-text-primary">Scorpio</dd>
                        </div>
                      </dl>
                      <a
                        href="#pricing"
                        className="mt-sp-3 inline-block font-sans text-sm font-medium text-gold-400 transition-colors hover:text-gold-200"
                      >
                        Book a detailed reading &rarr;
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3 }}
                  >
                    <ChartPlaceholder loading={status === "loading"} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
