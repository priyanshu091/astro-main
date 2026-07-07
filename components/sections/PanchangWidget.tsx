"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Types matching actual Prokerala API response ───────────────────────── */
interface PeriodSlot { start: string; end: string; }
interface NamedPeriod { id: number; name: string; type: string; period: PeriodSlot[]; }
interface PanchangItem { id: number; name: string; paksha?: string; lord?: { name: string; vedic_name: string }; start: string; end: string; }

interface PanchangData {
  vaara: string;
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  tithi: PanchangItem[];
  nakshatra: PanchangItem[];
  yoga: PanchangItem[];
  karana: PanchangItem[];
  auspicious_period?: NamedPeriod[];
  inauspicious_period?: NamedPeriod[];
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmt(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
    });
  } catch { return iso; }
}

function findPeriod(list: NamedPeriod[] | undefined, keyword: string): PeriodSlot | undefined {
  const found = list?.find((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));
  return found?.period?.[0];
}

/* ─── DESCRIPTIONS ───────────────────────────────────────────────────────── */
const INAUSPICIOUS_DESC: Record<string, string> = {
  rahu: "Avoid starting new tasks",
  gulika: "Saturn's unfavourable period",
  yamaganda: "Avoid auspicious work",
};

export default function PanchangWidget() {
  const [data, setData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/panchang")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setData(j.panchang))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

  // Pick the currently active tithi (the one whose end is after now, or last one)
  const activeTithi = data?.tithi?.find((t) => new Date(t.end) > new Date()) ?? data?.tithi?.[0];
  const activeNakshatra = data?.nakshatra?.find((n) => new Date(n.end) > new Date()) ?? data?.nakshatra?.[0];
  const activeYoga = data?.yoga?.find((y) => new Date(y.end) > new Date()) ?? data?.yoga?.[0];
  const activeKarana = data?.karana?.find((k) => new Date(k.end) > new Date()) ?? data?.karana?.[0];

  const rahuPeriod = findPeriod(data?.inauspicious_period, "rahu");
  const gulikaPeriod = findPeriod(data?.inauspicious_period, "gulika");
  const yamaPeriod = findPeriod(data?.inauspicious_period, "yamaganda");

  return (
    <section
      id="panchang"
      className="border-t border-[rgba(184,146,40,0.08)] bg-bg-void"
      style={{ backgroundImage: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.05) 0%, transparent 70%)" }}
    >
      <div className="mx-auto max-w-content px-sp-5 py-sp-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-sp-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="eyebrow text-gold-400">Vedic Calendar</span>
            <h2 className="font-display mt-sp-3 text-[clamp(1.75rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
              Today&apos;s Panchang
            </h2>
            <p className="mt-1 font-sans text-sm text-text-muted">{today} · Lucknow, India</p>
          </div>
          <Link
            href="/panchang"
            className="inline-flex items-center gap-2 rounded-btn border border-gold-400/30 bg-gold-100 px-5 py-2.5 font-sans text-sm font-medium text-text-secondary transition-all duration-200 hover:border-gold-400/60 hover:bg-gold-200 hover:text-text-primary"
          >
            View Full Panchang
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-sp-8 grid animate-pulse grid-cols-2 gap-sp-4 md:grid-cols-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-24 rounded-card bg-gold-100" />)}
          </div>
        )}

        {error && (
          <p className="mt-sp-8 text-center font-sans text-sm text-text-muted">Could not load Panchang. Please try again later.</p>
        )}

        {data && !loading && (
          <>
            {/* Sunrise / Sunset row */}
            <div className="mt-sp-8 grid grid-cols-2 gap-sp-4">
              {[
                { icon: "🌅", label: "Sunrise", time: fmt(data.sunrise) },
                { icon: "🌇", label: "Sunset", time: fmt(data.sunset) },
              ].map(({ icon, label, time }) => (
                <div key={label} className="flex items-center gap-4 rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.05)] px-5 py-5">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <p className="eyebrow text-gold-500">{label}</p>
                    <p className="font-display mt-1 text-2xl font-bold text-text-primary">{time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pancha Anga grid */}
            <div className="mt-sp-4 grid grid-cols-2 gap-sp-4 md:grid-cols-4">
              {[
                { label: "Tithi", item: activeTithi, sub: activeTithi?.paksha },
                { label: "Nakshatra", item: activeNakshatra, sub: activeNakshatra?.lord ? `Lord: ${activeNakshatra.lord.vedic_name}` : undefined },
                { label: "Yoga", item: activeYoga, sub: `Ends ${fmt(activeYoga?.end)}` },
                { label: "Karana", item: activeKarana, sub: `Vaara: ${data.vaara}` },
              ].map(({ label, item, sub }) => (
                <div key={label} className="flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-5">
                  <span className="eyebrow text-gold-500">{label}</span>
                  <span className="font-display mt-2 text-base font-semibold leading-tight text-text-primary">{item?.name ?? "—"}</span>
                  {sub && <span className="mt-1 font-sans text-xs text-text-muted">{sub}</span>}
                </div>
              ))}
            </div>

            {/* Inauspicious timings */}
            <div className="mt-sp-4 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-5">
              <span className="eyebrow text-gold-500">Inauspicious Timings</span>
              <div className="mt-sp-3 space-y-2">
                {[
                  { name: "Rahu Kaal", period: rahuPeriod, desc: INAUSPICIOUS_DESC.rahu },
                  { name: "Gulika Kaal", period: gulikaPeriod, desc: INAUSPICIOUS_DESC.gulika },
                  { name: "Yamaghanda", period: yamaPeriod, desc: INAUSPICIOUS_DESC.yamaganda },
                ].map(({ name, period, desc }) => (
                  <div key={name} className="flex items-center justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-bg-void px-4 py-3">
                    <div>
                      <p className="font-sans text-sm font-semibold text-text-primary">{name}</p>
                      <p className="font-sans text-xs text-text-muted">{desc}</p>
                    </div>
                    <span className="font-sans text-sm font-medium text-text-secondary whitespace-nowrap ml-4">
                      {period ? `${fmt(period.start)} – ${fmt(period.end)}` : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
