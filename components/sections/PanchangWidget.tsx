"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PanchangData {
  tithi: { name: string; end_time?: string }[];
  nakshatra: { name: string }[];
  yoga: { name: string }[];
  karana: { name: string }[];
  sunrise: string;
  sunset: string;
  vaara?: string;
  hindu_maah?: { amanta?: { name: string } };
  auspicious_period?: { name: string; begin: string; end: string }[];
  inauspicious_period?: { name: string; begin: string; end: string }[];
}

function formatTime(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return iso;
  }
}

function findPeriod(periods: { name: string; begin: string; end: string }[] | undefined, name: string) {
  return periods?.find((p) => p.name.toLowerCase().includes(name.toLowerCase()));
}

export default function PanchangWidget() {
  const [data, setData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/panchang");
        if (!res.ok) throw new Error("Failed to load Panchang data");
        const json = await res.json();
        setData(json.panchang);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const rahuKaal = findPeriod(data?.inauspicious_period, "rahu");
  const gulikaKaal = findPeriod(data?.inauspicious_period, "gulika");
  const yamaghanda = findPeriod(data?.inauspicious_period, "yamaghanda");

  return (
    <section
      id="panchang"
      className="border-t border-[rgba(184,146,40,0.08)] bg-bg-void"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.05) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-content px-sp-5 py-sp-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <span className="eyebrow text-gold-400">Daily Panchang</span>
            <h2 className="font-display mt-sp-3 text-[clamp(1.75rem,3.5vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
              Today&apos;s Panchang
            </h2>
            <p className="mt-2 font-sans text-sm text-text-muted">{today} · Lucknow, India</p>
          </div>
          <Link
            href="/panchang"
            className="mt-sp-4 inline-flex items-center gap-2 rounded-btn border border-gold-400/30 bg-gold-100 px-5 py-2.5 font-sans text-sm font-medium text-text-secondary transition-all duration-200 hover:border-gold-400/60 hover:bg-gold-200 hover:text-text-primary sm:mt-0"
          >
            Full Panchang
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Content */}
        {loading && (
          <div className="mt-sp-8 grid animate-pulse grid-cols-2 gap-sp-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-card bg-gold-100" />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-sp-8 rounded-card border border-[rgba(184,146,40,0.1)] bg-gold-100 p-6 text-center">
            <p className="font-sans text-sm text-text-muted">Could not load Panchang data. Please try again later.</p>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Sunrise / Sunset */}
            <div className="mt-sp-8 grid grid-cols-2 gap-sp-4 sm:grid-cols-4">
              <div className="col-span-1 flex flex-col items-center justify-center gap-1 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-5 text-center">
                <span className="text-2xl">🌅</span>
                <span className="eyebrow text-gold-500 mt-1">Sunrise</span>
                <span className="font-display text-lg font-semibold text-text-primary">{formatTime(data.sunrise)}</span>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center gap-1 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-5 text-center">
                <span className="text-2xl">🌇</span>
                <span className="eyebrow text-gold-500 mt-1">Sunset</span>
                <span className="font-display text-lg font-semibold text-text-primary">{formatTime(data.sunset)}</span>
              </div>

              {/* Tithi */}
              <div className="col-span-1 flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-5">
                <span className="eyebrow text-gold-500">Tithi</span>
                <span className="font-display mt-1 text-base font-semibold leading-tight text-text-primary">
                  {data.tithi?.[0]?.name ?? "—"}
                </span>
              </div>

              {/* Nakshatra */}
              <div className="col-span-1 flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-5">
                <span className="eyebrow text-gold-500">Nakshatra</span>
                <span className="font-display mt-1 text-base font-semibold leading-tight text-text-primary">
                  {data.nakshatra?.[0]?.name ?? "—"}
                </span>
              </div>
            </div>

            {/* Yoga / Karana / Vaara */}
            <div className="mt-sp-4 grid grid-cols-3 gap-sp-4">
              <div className="flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-4">
                <span className="eyebrow text-gold-500">Yoga</span>
                <span className="font-display mt-1 text-sm font-semibold text-text-primary">
                  {data.yoga?.[0]?.name ?? "—"}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-4">
                <span className="eyebrow text-gold-500">Karana</span>
                <span className="font-display mt-1 text-sm font-semibold text-text-primary">
                  {data.karana?.[0]?.name ?? "—"}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-4">
                <span className="eyebrow text-gold-500">Vaara</span>
                <span className="font-display mt-1 text-sm font-semibold text-text-primary">
                  {data.vaara ?? "—"}
                </span>
              </div>
            </div>

            {/* Inauspicious Timings */}
            <div className="mt-sp-4 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-5">
              <span className="eyebrow text-gold-500">Inauspicious Timings</span>
              <div className="mt-sp-3 grid grid-cols-1 gap-sp-3 sm:grid-cols-3">
                {[
                  { label: "Rahu Kaal", period: rahuKaal },
                  { label: "Gulika Kaal", period: gulikaKaal },
                  { label: "Yamaghanda", period: yamaghanda },
                ].map(({ label, period }) => (
                  <div key={label} className="flex items-center justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-bg-void px-4 py-3 sm:flex-col sm:items-start sm:gap-1">
                    <span className="font-sans text-xs font-semibold text-text-muted">{label}</span>
                    <span className="font-sans text-sm font-medium text-text-primary">
                      {period ? `${formatTime(period.begin)} – ${formatTime(period.end)}` : "—"}
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
