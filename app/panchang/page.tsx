"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Period {
  name: string;
  begin: string;
  end: string;
}
interface PanchangData {
  tithi: { name: string; end_time?: string }[];
  nakshatra: { name: string; end_time?: string }[];
  yoga: { name: string; end_time?: string }[];
  karana: { name: string }[];
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
  vaara?: string;
  hindu_maah?: { amanta?: { name: string }; purnimanta?: { name: string } };
  paksha?: string;
  auspicious_period?: Period[];
  inauspicious_period?: Period[];
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
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

function toISO(date: string): string {
  // date is YYYY-MM-DD, convert to ISO with IST offset
  return `${date}T00:00:00+05:30`;
}

function toDateInput(iso: string): string {
  return iso.slice(0, 10);
}

function findPeriod(periods: Period[] | undefined, name: string) {
  return periods?.find((p) => p.name.toLowerCase().includes(name.toLowerCase()));
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function InfoCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col justify-center rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-5">
      <span className="eyebrow text-gold-500">{label}</span>
      <span className="font-display mt-2 text-lg font-semibold leading-tight text-text-primary">{value}</span>
      {sub && <span className="mt-1 font-sans text-xs text-text-muted">{sub}</span>}
    </div>
  );
}

function SunCard({ icon, label, time }: { icon: string; label: string; time: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.06)] px-6 py-6 text-center">
      <span className="text-3xl">{icon}</span>
      <span className="eyebrow text-gold-500">{label}</span>
      <span className="font-display text-2xl font-bold text-text-primary">{time}</span>
    </div>
  );
}

function PeriodRow({ label, period }: { label: string; period: Period | undefined }) {
  return (
    <div className="flex items-center justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-bg-void px-5 py-3.5">
      <span className="font-sans text-sm font-semibold text-text-primary">{label}</span>
      <span className="font-sans text-sm text-text-secondary">
        {period ? `${formatTime(period.begin)} – ${formatTime(period.end)}` : "—"}
      </span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PanchangPage() {
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [data, setData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (dateStr: string) => {
    setLoading(true);
    setError(null);
    try {
      const datetime = toISO(dateStr);
      const res = await fetch(`/api/panchang?datetime=${encodeURIComponent(datetime)}`);
      if (!res.ok) throw new Error("Failed to fetch Panchang data");
      const json = await res.json();
      setData(json.panchang);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(selectedDate);
  }, [selectedDate, load]);

  const displayDate = new Date(selectedDate + "T00:00:00+05:30").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const rahuKaal = findPeriod(data?.inauspicious_period, "rahu");
  const gulikaKaal = findPeriod(data?.inauspicious_period, "gulika");
  const yamaghanda = findPeriod(data?.inauspicious_period, "yamaghanda");
  const abhijitMuhurta = findPeriod(data?.auspicious_period, "abhijit");

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen bg-bg-void pt-[88px]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 60%)",
        }}
      >
        <div className="mx-auto max-w-content px-sp-5 py-sp-10">

          {/* ── Page Header ── */}
          <div className="flex flex-col gap-sp-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow text-gold-400">Vedic Calendar</span>
              <h1 className="font-display mt-sp-3 text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
                Daily Panchang
              </h1>
              <p className="mt-2 font-sans text-sm text-text-muted">
                Accurate Vedic Panchang for Lucknow, India
              </p>
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-1">
              <label htmlFor="panchang-date" className="eyebrow text-gold-500">
                Select Date
              </label>
              <input
                id="panchang-date"
                type="date"
                value={selectedDate}
                max={new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-CA")}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-input border border-[rgba(184,146,40,0.25)] bg-gold-100 px-4 py-2.5 font-sans text-sm text-text-primary focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          {/* ── Date Display ── */}
          <div className="mt-sp-6 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-display text-base font-semibold text-text-primary">{displayDate}</span>
              {data?.hindu_maah?.amanta?.name && (
                <span className="font-sans text-sm text-text-secondary">
                  {data.hindu_maah.amanta.name} Maas
                </span>
              )}
              {data?.paksha && (
                <span className="font-sans text-sm text-text-secondary">{data.paksha} Paksha</span>
              )}
              {data?.vaara && (
                <span className="rounded-full bg-gold-200 px-3 py-0.5 font-sans text-xs font-semibold text-gold-600">
                  {data.vaara}
                </span>
              )}
            </div>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="mt-sp-8 grid animate-pulse grid-cols-2 gap-sp-4 md:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-28 rounded-card bg-gold-100" />
              ))}
            </div>
          )}

          {/* ── Error ── */}
          {error && !loading && (
            <div className="mt-sp-8 rounded-card border border-[rgba(184,146,40,0.1)] bg-gold-100 p-8 text-center">
              <p className="font-sans text-sm text-text-muted">
                Could not load Panchang data. Please check your connection and try again.
              </p>
              <button
                onClick={() => load(selectedDate)}
                className="mt-4 rounded-btn bg-gold-400 px-5 py-2 font-sans text-sm font-medium text-text-on-gold transition-opacity hover:opacity-80"
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Data ── */}
          {data && !loading && (
            <div className="mt-sp-8 space-y-sp-6">

              {/* Sunrise / Sunset / Moonrise / Moonset */}
              <div className="grid grid-cols-2 gap-sp-4 md:grid-cols-4">
                <SunCard icon="🌅" label="Sunrise" time={formatTime(data.sunrise)} />
                <SunCard icon="🌇" label="Sunset" time={formatTime(data.sunset)} />
                <SunCard icon="🌕" label="Moonrise" time={formatTime(data.moonrise)} />
                <SunCard icon="🌑" label="Moonset" time={formatTime(data.moonset)} />
              </div>

              {/* Panchang Details */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">
                  Pancha Anga
                </h2>
                <div className="grid grid-cols-2 gap-sp-4 md:grid-cols-3">
                  <InfoCard
                    label="Tithi"
                    value={data.tithi?.[0]?.name ?? "—"}
                    sub={data.tithi?.[0]?.end_time ? `Ends ${formatTime(data.tithi[0].end_time)}` : undefined}
                  />
                  <InfoCard
                    label="Nakshatra"
                    value={data.nakshatra?.[0]?.name ?? "—"}
                    sub={data.nakshatra?.[0]?.end_time ? `Ends ${formatTime(data.nakshatra[0].end_time)}` : undefined}
                  />
                  <InfoCard
                    label="Yoga"
                    value={data.yoga?.[0]?.name ?? "—"}
                    sub={data.yoga?.[0]?.end_time ? `Ends ${formatTime(data.yoga[0].end_time)}` : undefined}
                  />
                  <InfoCard label="Karana" value={data.karana?.[0]?.name ?? "—"} />
                  <InfoCard label="Vaara" value={data.vaara ?? "—"} />
                  {data.hindu_maah?.amanta?.name && (
                    <InfoCard
                      label="Hindu Month"
                      value={data.hindu_maah.amanta.name}
                      sub={data.paksha ? `${data.paksha} Paksha` : undefined}
                    />
                  )}
                </div>
              </div>

              {/* Inauspicious Timings */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">
                  Inauspicious Timings
                </h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow label="Rahu Kaal" period={rahuKaal} />
                  <PeriodRow label="Gulika Kaal" period={gulikaKaal} />
                  <PeriodRow label="Yamaghanda" period={yamaghanda} />
                </div>
              </div>

              {/* Auspicious Timings */}
              {data.auspicious_period && data.auspicious_period.length > 0 && (
                <div>
                  <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">
                    Auspicious Timings
                  </h2>
                  <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                    {abhijitMuhurta && (
                      <PeriodRow label="Abhijit Muhurta" period={abhijitMuhurta} />
                    )}
                    {data.auspicious_period.filter(p => !p.name.toLowerCase().includes("abhijit")).map((p) => (
                      <PeriodRow key={p.name} label={p.name} period={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <p className="font-sans text-xs text-text-muted text-center pt-sp-2">
                Panchang calculations are for Lucknow, Uttar Pradesh (26.85°N, 80.95°E), IST (UTC+5:30). Powered by Prokerala.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
