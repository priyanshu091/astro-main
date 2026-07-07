"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
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
interface HoraTiming {
  hora: { id: number; name: string; vedic_name: string };
  type: string; is_day: boolean; start: string; end: string;
}
interface ChoghadiyaMuhurat {
  id: number; name: string; type: string;
  vela: string | null; is_day: boolean; start: string; end: string;
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
function toISO(d: string) { return `${d}T00:00:00+05:30`; }
function addDays(d: string, n: number): string {
  const dt = new Date(d + "T00:00:00+05:30");
  dt.setDate(dt.getDate() + n);
  return dt.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
function findPeriod(list: NamedPeriod[] | undefined, kw: string): PeriodSlot | undefined {
  return list?.find((p) => p.name.toLowerCase().includes(kw.toLowerCase()))?.period?.[0];
}
function activeItem(items: PanchangItem[] | undefined): PanchangItem | undefined {
  if (!items?.length) return undefined;
  return items.find((i) => new Date(i.end) > new Date()) ?? items[items.length - 1];
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const PLANET_SYMBOL: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄",
};
const HORA_COLOR: Record<string, string> = {
  "Good": "text-emerald-600",
  "Not Bad": "text-blue-500",
  "Neither Good Nor Bad": "text-text-muted",
  "Bad": "text-red-500",
};
const CHOG_DOT: Record<string, string> = {
  "Most Auspicious": "bg-emerald-500",
  "Good": "bg-blue-400",
  "Inauspicious": "bg-red-500",
};
const CHOG_DESC: Record<string, string> = {
  Amrut: "Nectar · Very Auspicious",
  Shubh: "Auspicious",
  Labh: "Profit · Good for Business",
  Char: "Movement · Good for Travel",
  Udveg: "Agitated · Avoid",
  Kaal: "Inauspicious · Avoid",
  Rog: "Disease · Avoid",
};
const TABS = ["Overview", "Muhurta", "Planetary Hora", "Chaughadiya"] as const;
type Tab = typeof TABS[number];

/* ─── Small Components ───────────────────────────────────────────────────── */
function SunCard({ icon, label, time }: { icon: string; label: string; time: string }) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.06)] px-4 py-5">
      <span className="text-3xl leading-none">{icon}</span>
      <div>
        <p className="eyebrow text-gold-500">{label}</p>
        <p className="font-display mt-1 text-xl font-bold text-text-primary">{time}</p>
      </div>
    </div>
  );
}
function AngaCard({ label, name, sub1, sub2 }: { label: string; name: string; sub1?: string; sub2?: string }) {
  return (
    <div className="flex flex-col rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] px-4 py-4">
      <span className="eyebrow text-gold-500">{label}</span>
      <p className="font-display mt-2 text-lg font-semibold leading-tight text-text-primary">{name}</p>
      {sub1 && <p className="mt-1 font-sans text-xs text-text-muted">{sub1}</p>}
      {sub2 && <p className="font-sans text-xs text-text-muted">{sub2}</p>}
    </div>
  );
}
function PeriodRow({ name, desc, period, accent }: { name: string; desc: string; period: PeriodSlot | undefined; accent?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-input border px-5 py-4 ${accent ? "border-gold-400/20 bg-[rgba(212,168,83,0.06)]" : "border-[rgba(184,146,40,0.1)] bg-bg-void"}`}>
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
function HoraRow({ h, now }: { h: HoraTiming; now: Date }) {
  const isActive = new Date(h.start) <= now && now < new Date(h.end);
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 ${isActive ? "bg-gold-100" : ""}`}>
      <div className="flex items-center gap-3">
        <span className={`w-7 text-center text-xl font-bold ${HORA_COLOR[h.type] ?? "text-text-muted"}`}>{PLANET_SYMBOL[h.hora.name] ?? "●"}</span>
        <div>
          <p className="font-sans text-sm font-semibold text-text-primary">
            {h.hora.name} Hora
            {isActive && <span className="ml-2 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-text-on-gold">NOW</span>}
          </p>
          <p className={`font-sans text-xs ${HORA_COLOR[h.type] ?? "text-text-muted"}`}>{h.type}</p>
        </div>
      </div>
      <span className="font-sans text-sm text-text-secondary whitespace-nowrap">{fmt(h.start)} – {fmt(h.end)}</span>
    </div>
  );
}
function ChogRow({ m, now }: { m: ChoghadiyaMuhurat; now: Date }) {
  const isActive = new Date(m.start) <= now && now < new Date(m.end);
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 ${isActive ? "bg-gold-100" : ""}`}>
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${CHOG_DOT[m.type] ?? "bg-text-muted"}`} />
        <div>
          <p className="font-sans text-sm font-semibold text-text-primary">
            {m.name}
            {m.vela && <span className="ml-2 font-sans text-[11px] text-gold-500">({m.vela})</span>}
            {isActive && <span className="ml-2 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-text-on-gold">NOW</span>}
          </p>
          <p className="font-sans text-xs text-text-muted">{CHOG_DESC[m.name] ?? m.type}</p>
        </div>
      </div>
      <span className="font-sans text-sm text-text-secondary whitespace-nowrap">{fmt(m.start)} – {fmt(m.end)}</span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PanchangPage() {
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [data, setData] = useState<PanchangData | null>(null);
  const [horaData, setHoraData] = useState<{ hora_timing: HoraTiming[] } | null>(null);
  const [chogData, setChogData] = useState<{ muhurat: ChoghadiyaMuhurat[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async (dateStr: string) => {
    setLoading(true); setError(false);
    const dt = toISO(dateStr);
    try {
      const [panRes, horaRes] = await Promise.all([
        fetch(`/api/panchang?datetime=${encodeURIComponent(dt)}`),
        fetch(`/api/hora?datetime=${encodeURIComponent(dt)}`),
      ]);
      if (!panRes.ok) throw new Error();
      const [panJson, horaJson] = await Promise.all([panRes.json(), horaRes.json()]);
      setData(panJson.panchang);
      if (horaRes.ok) { setHoraData(horaJson.hora); setChogData(horaJson.choghadiya); }
    } catch { setError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(selectedDate); }, [selectedDate, load]);

  const isToday = selectedDate === todayStr;
  const now = new Date();

  const displayDate = new Date(selectedDate + "T00:00:00+05:30").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });
  const fullDate = new Date(selectedDate + "T00:00:00+05:30").toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

  const curTithi    = activeItem(data?.tithi);
  const curNakshatra = activeItem(data?.nakshatra);
  const curYoga     = activeItem(data?.yoga);
  const curKarana   = activeItem(data?.karana);

  const rahu   = findPeriod(data?.inauspicious_period, "rahu");
  const gulika = findPeriod(data?.inauspicious_period, "gulika");
  const yama   = findPeriod(data?.inauspicious_period, "yamaganda");
  const durMuh = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("dur"));
  const varjyam = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("varjyam"));

  const abhijit = findPeriod(data?.auspicious_period, "abhijit");
  const amrit   = findPeriod(data?.auspicious_period, "amrit");
  const brahma  = findPeriod(data?.auspicious_period, "brahma");

  const dayHoras  = horaData?.hora_timing?.filter((h) => h.is_day) ?? [];
  const nightHoras = horaData?.hora_timing?.filter((h) => !h.is_day) ?? [];
  const dayChog   = chogData?.muhurat?.filter((m) => m.is_day) ?? [];
  const nightChog = chogData?.muhurat?.filter((m) => !m.is_day) ?? [];

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen bg-bg-void pt-[88px]"
        style={{ backgroundImage: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 60%)" }}
      >
        <div className="mx-auto max-w-content px-sp-5 py-sp-8">

          {/* Breadcrumb */}
          <nav className="mb-sp-5 flex items-center gap-2 font-sans text-xs text-text-muted">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-secondary">Daily Panchang</span>
          </nav>

          {/* Heading */}
          <div className="mb-sp-6 text-center">
            <span className="eyebrow text-gold-400">Vedic Almanac</span>
            <h1 className="font-display mt-sp-2 text-[clamp(2.5rem,6vw,4rem)] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-text-primary">
              Aaj Ka Panchang
            </h1>
            <p className="mt-2 font-sans text-sm text-text-muted">{fullDate}</p>
          </div>

          {/* Date navigator + Location */}
          <div className="mb-sp-6 rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.03)] overflow-hidden">
            {/* Date row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(184,146,40,0.08)]">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="eyebrow text-gold-500">Date</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,146,40,0.2)] text-text-muted hover:border-gold-400 hover:text-text-primary transition-all"
                  aria-label="Previous day"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="text-center">
                  <p className="font-sans text-sm font-semibold text-text-primary">{displayDate}</p>
                  {isToday && <p className="font-sans text-[10px] text-gold-500">Today · Tap to change</p>}
                </div>
                <button
                  onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,146,40,0.2)] text-text-muted hover:border-gold-400 hover:text-text-primary transition-all"
                  aria-label="Next day"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
                {/* Hidden native date input triggered on center click */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                  className="absolute opacity-0 w-0 h-0 pointer-events-none"
                  id="panchang-date-hidden"
                />
              </div>
              <label
                htmlFor="panchang-date-hidden"
                className="cursor-pointer rounded-btn border border-[rgba(184,146,40,0.2)] bg-gold-100 px-3 py-1.5 font-sans text-xs font-medium text-text-secondary hover:bg-gold-200 transition-colors"
              >
                Pick Date
              </label>
            </div>
            {/* Location row */}
            <div className="flex items-center gap-2 px-5 py-3">
              <svg className="h-4 w-4 text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" /><circle cx="12" cy="8" r="2" />
              </svg>
              <span className="eyebrow text-gold-500">Location</span>
              <span className="ml-2 flex items-center gap-1 rounded-full border border-[rgba(184,146,40,0.2)] bg-gold-100 px-3 py-1 font-sans text-xs text-text-secondary">
                <svg className="h-3 w-3 text-gold-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" /></svg>
                Lucknow, India
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-sp-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full border px-5 py-2 font-sans text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "border-gold-500 bg-gold-500 text-text-on-gold shadow-sm"
                    : "border-[rgba(184,146,40,0.2)] bg-[rgba(212,168,83,0.04)] text-text-muted hover:border-gold-400 hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="animate-pulse space-y-sp-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-card bg-gold-100" />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="rounded-card border border-[rgba(184,146,40,0.1)] bg-gold-100 p-8 text-center">
              <p className="font-sans text-sm text-text-muted">Could not load Panchang. Please try again.</p>
              <button onClick={() => load(selectedDate)} className="mt-4 rounded-btn bg-gold-400 px-5 py-2 font-sans text-sm font-medium text-text-on-gold hover:opacity-80 transition-opacity">
                Retry
              </button>
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {!loading && !error && activeTab === "Overview" && data && (
            <div className="space-y-sp-6">
              {/* Sun/Moon */}
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
                  <AngaCard label="Tithi"     name={curTithi?.name ?? "—"}     sub1={curTithi?.paksha}    sub2={curTithi ? `Until ${fmt(curTithi.end)}` : undefined} />
                  <AngaCard label="Nakshatra" name={curNakshatra?.name ?? "—"} sub1={curNakshatra?.lord ? `Lord: ${curNakshatra.lord.vedic_name}` : undefined} sub2={curNakshatra ? `Until ${fmt(curNakshatra.end)}` : undefined} />
                  <AngaCard label="Yoga"      name={curYoga?.name ?? "—"}      sub1="Luni-Solar Yoga"     sub2={curYoga ? `Until ${fmt(curYoga.end)}` : undefined} />
                  <AngaCard label="Karana"    name={curKarana?.name ?? "—"}    sub1="Half-Tithi"          sub2={curKarana ? `Until ${fmt(curKarana.end)}` : undefined} />
                  <AngaCard label="Vaara"     name={data.vaara}                sub1="Day of the week" />
                </div>
              </div>

              {/* Quick Inauspicious Strip */}
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Inauspicious Timings</h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow name="Rahu Kaal"   desc="Avoid starting new tasks"       period={rahu} />
                  <PeriodRow name="Gulika Kaal" desc="Saturn's unfavourable period"   period={gulika} />
                  <PeriodRow name="Yamaghanda"  desc="Avoid auspicious work"          period={yama} />
                </div>
              </div>
            </div>
          )}

          {/* ── MUHURTA TAB ── */}
          {!loading && !error && activeTab === "Muhurta" && data && (
            <div className="space-y-sp-6">
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Auspicious Timings</h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow accent name="Abhijit Muhurat" desc="Most auspicious 48-min window"       period={abhijit} />
                  <PeriodRow accent name="Amrit Kaal"      desc="Highly auspicious — good for all"    period={amrit} />
                  <PeriodRow accent name="Brahma Muhurat"  desc="Best time for meditation & prayer"   period={brahma} />
                </div>
              </div>
              <div>
                <h2 className="font-display mb-sp-4 text-xl font-semibold text-text-primary">Inauspicious Timings</h2>
                <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] p-5 space-y-sp-2">
                  <PeriodRow name="Rahu Kaal"   desc="Avoid starting new tasks"               period={rahu} />
                  <PeriodRow name="Gulika Kaal" desc="Saturn's unfavourable period"           period={gulika} />
                  <PeriodRow name="Yamaghanda"  desc="Avoid auspicious work"                  period={yama} />
                  {durMuh && durMuh.period.map((slot, i) => (
                    <PeriodRow key={i} name="Dur Muhurat" desc="Inauspicious time window"      period={slot} />
                  ))}
                  {varjyam && varjyam.period.map((slot, i) => (
                    <PeriodRow key={i} name="Varjyam" desc="Period of loss — avoid new work"  period={slot} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PLANETARY HORA TAB ── */}
          {!loading && !error && activeTab === "Planetary Hora" && (
            <div className="space-y-sp-5">
              {[{ label: "Day Horas", items: dayHoras }, { label: "Night Horas", items: nightHoras }].map(({ label, items }) =>
                items.length > 0 && (
                  <div key={label}>
                    <p className="eyebrow text-gold-500 mb-sp-2">· {label}</p>
                    <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] divide-y divide-[rgba(184,146,40,0.08)]">
                      {items.map((h, i) => <HoraRow key={i} h={h} now={now} />)}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* ── CHAUGHADIYA TAB ── */}
          {!loading && !error && activeTab === "Chaughadiya" && (
            <div className="space-y-sp-5">
              {[{ label: "Day Chaughadiya", items: dayChog }, { label: "Night Chaughadiya", items: nightChog }].map(({ label, items }) =>
                items.length > 0 && (
                  <div key={label}>
                    <p className="eyebrow text-gold-500 mb-sp-2">· {label}</p>
                    <div className="rounded-card border border-[rgba(184,146,40,0.12)] bg-[rgba(212,168,83,0.04)] divide-y divide-[rgba(184,146,40,0.08)]">
                      {items.map((m, i) => <ChogRow key={i} m={m} now={now} />)}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Disclaimer */}
          {!loading && (
            <p className="mt-sp-8 font-sans text-xs text-text-muted text-center">
              Panchang for Lucknow, Uttar Pradesh (26.85°N, 80.95°E) · IST (UTC+5:30) · Powered by Prokerala
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
