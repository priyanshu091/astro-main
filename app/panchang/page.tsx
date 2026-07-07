"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface PeriodSlot { start: string; end: string; }
interface NamedPeriod { id: number; name: string; type: string; period: PeriodSlot[]; }
interface PanchangItem {
  id: number; name: string;
  paksha?: string;
  lord?: { name: string; vedic_name: string };
  start: string; end: string;
}
interface PanchangData {
  vaara: string;
  sunrise: string; sunset: string;
  moonrise?: string; moonset?: string;
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

function toISO(dateStr: string) { return `${dateStr}T00:00:00+05:30`; }

function findPeriod(list: NamedPeriod[] | undefined, keyword: string): PeriodSlot | undefined {
  return list?.find((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))?.period?.[0];
}

function activeItem(items: PanchangItem[] | undefined): PanchangItem | undefined {
  if (!items?.length) return undefined;
  return items.find((i) => new Date(i.end) > new Date()) ?? items[items.length - 1];
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function SunCard({ icon, label, time }: { icon: string; label: string; time: string }) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.06)] px-5 py-6">
      <span className="text-4xl leading-none">{icon}</span>
      <div>
        <p className="eyebrow text-gold-500">{label}</p>
        <p className="font-display mt-1 text-2xl font-bold text-text-primary">{time}</p>
      </div>
    </div>
  );
}

function AngaCard({ label, name, sub1, sub2 }: { label: string; name: string; sub1?: string; sub2?: string }) {
  return (
    <div className="flex flex-col justify-between rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-5">
      <span className="eyebrow text-gold-500">{label}</span>
      <p className="font-display mt-2 text-xl font-semibold leading-tight text-text-primary">{name}</p>
      {sub1 && <p className="mt-1 font-sans text-xs text-text-muted">{sub1}</p>}
      {sub2 && <p className="font-sans text-xs text-text-muted">{sub2}</p>}
    </div>
  );
}

function PeriodRow({ name, desc, period, accent = false }: {
  name: string; desc: string; period: PeriodSlot | undefined; accent?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between rounded-input border px-5 py-4 ${
      accent
        ? "border-gold-400/20 bg-[rgba(212,168,83,0.06)]"
        : "border-[rgba(184,146,40,0.1)] bg-bg-void"
    }`}>
      <div>
        <p className={`font-sans text-sm font-semibold ${accent ? "text-gold-600" : "text-text-primary"}`}>{name}</p>
        <p className="mt-0.5 font-sans text-xs text-text-muted">{desc}</p>
      </div>
      <span className="ml-4 whitespace-nowrap font-sans text-sm font-medium text-text-secondary">
        {period ? `${fmt(period.start)} – ${fmt(period.end)}` : "—"}
      </span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PanchangPage() {
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [data, setData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async (dateStr: string) => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/panchang?datetime=${encodeURIComponent(toISO(dateStr))}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json.panchang);
    } catch { setError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(selectedDate); }, [selectedDate, load]);

  const displayDate = new Date(selectedDate + "T00:00:00+05:30").toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

  const curTithi    = activeItem(data?.tithi);
  const curNakshatra = activeItem(data?.nakshatra);
  const curYoga     = activeItem(data?.yoga);
  const curKarana   = activeItem(data?.karana);

  const rahu     = findPeriod(data?.inauspicious_period, "rahu");
  const gulika   = findPeriod(data?.inauspicious_period, "gulika");
  const yama     = findPeriod(data?.inauspicious_period, "yamaganda");
  const durMuh   = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("dur"));
  const varjyam  = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("varjyam"));

  const abhijit  = findPeriod(data?.auspicious_period, "abhijit");
  const amrit    = findPeriod(data?.auspicious_period, "amrit");
  const brahma   = findPeriod(data?.auspicious_period, "brahma");

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen bg-bg-void pt-[88px]"
        style={{ backgroundImage: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 60%)" }}
      >
        <div className="mx-auto max-w-content px-sp-5 py-sp-10">

          {/* Page Header */}
          <div className="flex flex-col gap-sp-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow text-gold-400">Vedic Calendar</span>
              <h1 className="font-display mt-sp-3 text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.01em] text-text-primary">
                Daily Panchang
              </h1>
              <p className="mt-2 font-sans text-sm text-text-muted">Accurate Vedic Panchang for Lucknow, India</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="panchang-date" className="eyebrow text-gold-500">Select Date</label>
              <input
                id="panchang-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-input border border-[rgba(184,146,40,0.25)] bg-gold-100 px-4 py-2.5 font-sans text-sm text-text-primary focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Date strip */}
          <div className="mt-sp-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-5 py-4">
            <span className="font-display text-base font-semibold text-text-primary">{displayDate}</span>
            {data?.vaara && (
              <span className="rounded-full bg-gold-200 px-3 py-0.5 font-sans text-xs font-semibold text-gold-600">{data.vaara}</span>
            )}
            {curTithi?.paksha && (
              <span className="font-sans text-sm text-text-muted">{curTithi.paksha}</span>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-sp-8 grid animate-pulse grid-cols-2 gap-sp-4 md:grid-cols-4">
              {[...Array(8)].map((_, i) => <div key={i} className="h-28 rounded-card bg-gold-100" />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-sp-8 rounded-card border border-[rgba(184,146,40,0.1)] bg-gold-100 p-8 text-center">
              <p className="font-sans text-sm text-text-muted">Could not load Panchang data. Please try again.</p>
              <button
                onClick={() => load(selectedDate)}
                className="mt-4 rounded-btn bg-gold-400 px-5 py-2 font-sans text-sm font-medium text-text-on-gold transition-opacity hover:opacity-80"
              >Retry</button>
            </div>
          )}

          {data && !loading && (
            <div className="mt-sp-8 space-y-sp-6">

              {/* Sunrise / Sunset / Moonrise / Moonset */}
              <div className="grid grid-cols-2 gap-sp-4 md:grid-cols-4">
                <SunCard icon="🌅" label="Sunrise"  time={fmt(data.sunrise)} />
                <SunCard icon="🌇" label="Sunset"   time={fmt(data.sunset)} />
                <SunCard icon="🌕" label="Moonrise" time={fmt(data.moonrise)} />
                <SunCard icon="🌑" label="Moonset"  time={fmt(data.moonset)} />
              </div>

              {/* Pancha Anga */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Pancha Anga</h2>
                <div className="grid grid-cols-2 gap-sp-4 md:grid-cols-3">
                  <AngaCard
                    label="Tithi" name={curTithi?.name ?? "—"}
                    sub1={curTithi?.paksha}
                    sub2={curTithi ? `Until ${fmt(curTithi.end)}` : undefined}
                  />
                  <AngaCard
                    label="Nakshatra" name={curNakshatra?.name ?? "—"}
                    sub1={curNakshatra?.lord ? `Lord: ${curNakshatra.lord.vedic_name} (${curNakshatra.lord.name})` : undefined}
                    sub2={curNakshatra ? `Until ${fmt(curNakshatra.end)}` : undefined}
                  />
                  <AngaCard
                    label="Yoga" name={curYoga?.name ?? "—"}
                    sub1="Luni-Solar Yoga"
                    sub2={curYoga ? `Until ${fmt(curYoga.end)}` : undefined}
                  />
                  <AngaCard
                    label="Karana" name={curKarana?.name ?? "—"}
                    sub1="Half-Tithi"
                    sub2={curKarana ? `Until ${fmt(curKarana.end)}` : undefined}
                  />
                  <AngaCard label="Vaara" name={data.vaara} sub1="Day of the week" />
                </div>
              </div>

              {/* Inauspicious Timings */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Inauspicious Timings</h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow name="Rahu Kaal"  desc="Avoid starting new tasks"       period={rahu} />
                  <PeriodRow name="Gulika Kaal" desc="Saturn's unfavourable period"   period={gulika} />
                  <PeriodRow name="Yamaghanda" desc="Avoid auspicious work"           period={yama} />
                  {durMuh && durMuh.period.map((slot, i) => (
                    <PeriodRow key={i} name="Dur Muhurat" desc="Inauspicious time window" period={slot} />
                  ))}
                  {varjyam && varjyam.period.map((slot, i) => (
                    <PeriodRow key={i} name="Varjyam" desc="Period of loss — avoid new work" period={slot} />
                  ))}
                </div>
              </div>

              {/* Auspicious Timings */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Auspicious Timings</h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow accent name="Abhijit Muhurat" desc="Most auspicious 48-min window" period={abhijit} />
                  <PeriodRow accent name="Amrit Kaal"      desc="Highly auspicious period"       period={amrit} />
                  <PeriodRow accent name="Brahma Muhurat"  desc="Best time for meditation & prayer" period={brahma} />
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-sans text-xs text-text-muted text-center pt-sp-2">
                Panchang for Lucknow, Uttar Pradesh (26.85°N, 80.95°E) · IST (UTC+5:30) · Powered by Prokerala
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
