"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface PeriodSlot { start: string; end: string; }
interface NamedPeriod { id: number; name: string; type: string; period: PeriodSlot[]; }
interface PanchangItem { id: number; name: string; paksha?: string; lord?: { name: string; vedic_name: string }; start: string; end: string; }
interface PanchangData { vaara: string; sunrise: string; sunset: string; moonrise?: string; moonset?: string; tithi: PanchangItem[]; nakshatra: PanchangItem[]; yoga: PanchangItem[]; karana: PanchangItem[]; auspicious_period?: NamedPeriod[]; inauspicious_period?: NamedPeriod[]; }
interface HoraTiming { hora: { id: number; name: string; vedic_name: string }; type: string; is_day: boolean; start: string; end: string; }
interface ChoghadiyaMuhurat { id: number; name: string; type: string; vela: string | null; is_day: boolean; start: string; end: string; }

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmt(iso: string | undefined): string {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }); } catch { return iso; }
}
function toISO(d: string) { return `${d}T00:00:00+05:30`; }
function addDays(d: string, n: number): string {
  const dt = new Date(d + "T00:00:00+05:30");
  dt.setDate(dt.getDate() + n);
  return dt.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
function findPeriod(list: NamedPeriod[] | undefined, kw: string) { return list?.find((p) => p.name.toLowerCase().includes(kw.toLowerCase()))?.period?.[0]; }
function activeItem(items: PanchangItem[] | undefined) { if (!items?.length) return undefined; return items.find((i) => new Date(i.end) > new Date()) ?? items[items.length - 1]; }

/* ─── Constants ──────────────────────────────────────────────────────────── */
const PLANET_SYMBOL: Record<string, string> = { Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄" };
const HORA_COLOR: Record<string, string> = { "Good": "text-emerald-500", "Not Bad": "text-blue-500", "Neither Good Nor Bad": "text-text-muted", "Bad": "text-red-500" };
const CHOG_DOT: Record<string, string> = { "Most Auspicious": "bg-emerald-500", "Good": "bg-blue-400", "Inauspicious": "bg-red-500" };
const CHOG_DESC: Record<string, string> = { Amrut: "Nectar", Shubh: "Auspicious", Labh: "Profit", Char: "Movement", Udveg: "Agitated", Kaal: "Inauspicious", Rog: "Disease" };

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PanchangPage() {
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [lat, setLat] = useState("26.8467");
  const [lng, setLng] = useState("80.9462");
  const [locName, setLocName] = useState("Lucknow, India");
  const [locError, setLocError] = useState("");

  const [isSearchingLoc, setIsSearchingLoc] = useState(false);
  const [locQuery, setLocQuery] = useState("");
  const [locResults, setLocResults] = useState<any[]>([]);

  const [data, setData] = useState<PanchangData | null>(null);
  const [horaData, setHoraData] = useState<{ hora_timing: HoraTiming[] } | null>(null);
  const [chogData, setChogData] = useState<{ muhurat: ChoghadiyaMuhurat[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (retryCountdown === null || retryCountdown <= 0) return;
    const timer = setInterval(() => {
      setRetryCountdown((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [retryCountdown]);

  const load = useCallback(async (dateStr: string, latitude: string, longitude: string) => {
    setLoading(true);
    setApiError("");
    const dt = toISO(dateStr);
    try {
      const [panRes, horaRes] = await Promise.all([
        fetch(`/api/panchang?datetime=${encodeURIComponent(dt)}&lat=${latitude}&lng=${longitude}`),
        fetch(`/api/hora?datetime=${encodeURIComponent(dt)}&lat=${latitude}&lng=${longitude}`)
      ]);
      const [panJson, horaJson] = await Promise.all([panRes.json(), horaRes.json()]);
      
      if (!panRes.ok) {
        throw new Error(panJson.error || "Failed to fetch Panchang data");
      }
      if (!horaRes.ok) {
        throw new Error(horaJson.error || "Failed to fetch Hora & Chaughadiya data");
      }

      setData(panJson.panchang);
      setHoraData(horaJson.hora);
      setChogData(horaJson.choghadiya);
    } catch (err: any) { 
      console.error(err); 
      let errMsg = err.message;
      if (errMsg.includes("rate limit")) {
        errMsg = "You have exceeded the free API rate limit (5 requests per minute). Please wait 60 seconds and try again.";
        setRetryCountdown(60);
      } else if (errMsg.startsWith("{")) {
        try {
          const parsed = JSON.parse(errMsg);
          if (parsed.errors && parsed.errors[0]) {
            errMsg = parsed.errors[0].detail || parsed.errors[0].title;
          }
        } catch (e) {}
      }
      setApiError(errMsg || "An unexpected error occurred while fetching data.");
      setData(null);
    }
    finally { setLoading(false); }
  }, []);

  const searchLocation = async () => {
    if (!locQuery.trim()) return;
    try {
      // Routed through our own /api/geocode proxy so the request carries the
      // identifying User-Agent that OpenStreetMap's usage policy requires
      // (browsers refuse to set that header on fetch), and so results are cached.
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(locQuery)}`);
      const data = await res.json();
      setLocResults(Array.isArray(data) ? data : []);
    } catch {
      setLocResults([]);
    }
  };

  // Request location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const newLat = pos.coords.latitude.toFixed(2);
          const newLng = pos.coords.longitude.toFixed(2);
          setLat(newLat);
          setLng(newLng);
          setLocError("");
          try {
            const res = await fetch(`/api/geocode?lat=${newLat}&lon=${newLng}`);
            const locData = await res.json();
            if (locData.address) {
              const city = locData.address.city || locData.address.town || locData.address.county || "Current Location";
              const country = locData.address.country || "";
              setLocName(`${city}${country ? `, ${country}` : ""}`);
            }
          } catch { setLocName("Current Location"); }
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setLocError("You denied permission of location. Search location manually or allow the location permission.");
          }
        }
      );
    }
  }, []);

  useEffect(() => { load(selectedDate, lat, lng); }, [selectedDate, lat, lng, load]);

  const isToday = selectedDate === todayStr;
  const now = new Date();

  const displayDate = new Date(selectedDate + "T00:00:00+05:30").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

  const curTithi = activeItem(data?.tithi);
  const curNakshatra = activeItem(data?.nakshatra);
  const curYoga = activeItem(data?.yoga);
  const curKarana = activeItem(data?.karana);

  const rahu = findPeriod(data?.inauspicious_period, "rahu");
  const gulika = findPeriod(data?.inauspicious_period, "gulika");
  const yama = findPeriod(data?.inauspicious_period, "yamaganda");
  const durMuh = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("dur"));
  const varjyam = data?.inauspicious_period?.find((p) => p.name.toLowerCase().includes("varjyam"));

  const abhijit = findPeriod(data?.auspicious_period, "abhijit");
  const amrit = findPeriod(data?.auspicious_period, "amrit");
  const brahma = findPeriod(data?.auspicious_period, "brahma");

  const dayHoras = horaData?.hora_timing?.filter((h) => h.is_day) ?? [];
  const nightHoras = horaData?.hora_timing?.filter((h) => !h.is_day) ?? [];
  const dayChog = chogData?.muhurat?.filter((m) => m.is_day) ?? [];
  const nightChog = chogData?.muhurat?.filter((m) => !m.is_day) ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-void pt-[88px] pb-24" style={{ backgroundImage: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 60%)" }}>
        
        {/* Date Selector Header - Sticky */}
        <div className="sticky top-[88px] z-40 border-b border-[rgba(184,146,40,0.15)] bg-bg-void/80 backdrop-blur-xl">
          <div className="mx-auto max-w-content px-sp-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
                <span className="text-xl">🕉️</span>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold tracking-wide text-text-primary">VEDIC ALMANAC</h1>
                {!isSearchingLoc ? (
                  <div className="group flex cursor-pointer items-center gap-2 mt-1" onClick={() => setIsSearchingLoc(true)}>
                    <p className="font-sans text-xs text-gold-500 transition-colors group-hover:text-gold-400">{locName}</p>
                    <span className="rounded bg-[rgba(184,146,40,0.1)] px-1.5 py-0.5 font-sans text-[9px] font-bold text-gold-500 uppercase tracking-widest opacity-70 transition-opacity group-hover:opacity-100">
                      Choose Location
                    </span>
                  </div>
                ) : (
                  <div className="relative mt-1">
                    <div className="flex items-center gap-1">
                      <input 
                        type="text" 
                        autoFocus
                        value={locQuery} 
                        onChange={(e) => setLocQuery(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
                        placeholder="Search city..." 
                        className="rounded-full border border-[rgba(184,146,40,0.3)] bg-[rgba(212,168,83,0.05)] px-3 py-1 text-xs text-text-primary outline-none focus:border-gold-500 w-32 sm:w-48"
                      />
                      <button onClick={searchLocation} className="rounded-full bg-gold-500 px-2 py-1 font-sans text-xs font-bold text-bg-void">Find</button>
                      <button onClick={() => { setIsSearchingLoc(false); setLocResults([]); }} className="ml-1 text-xs text-text-muted hover:text-text-primary">✕</button>
                    </div>
                    {locResults.length > 0 && (
                      <div className="absolute left-0 top-full mt-1 max-h-48 w-full min-w-[240px] overflow-y-auto rounded-lg border border-[rgba(184,146,40,0.2)] bg-bg-void shadow-xl z-50">
                        {locResults.map((r, i) => (
                          <div 
                            key={i} 
                            className="cursor-pointer border-b border-[rgba(184,146,40,0.1)] p-2 font-sans text-xs text-text-primary transition-colors hover:bg-[rgba(212,168,83,0.1)] last:border-0"
                            onClick={() => {
                              setLat(Number(r.lat).toFixed(2)); setLng(Number(r.lon).toFixed(2)); 
                              const parts = r.display_name.split(',');
                              setLocName(parts[0] + ', ' + (parts[parts.length-1]?.trim() || ''));
                              setIsSearchingLoc(false); setLocResults([]); setLocError("");
                            }}
                          >
                            {r.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[rgba(184,146,40,0.2)] bg-[rgba(212,168,83,0.05)] p-1">
              <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[rgba(212,168,83,0.1)] hover:text-gold-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="min-w-[140px] px-3 text-center">
                <p className="font-sans text-sm font-semibold text-text-primary">{displayDate}</p>
                {isToday && <p className="font-sans text-[10px] font-medium tracking-widest text-gold-500 uppercase">Today</p>}
              </div>
              <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-[rgba(212,168,83,0.1)] hover:text-gold-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="relative border-l border-[rgba(184,146,40,0.2)] pl-1">
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => e.target.value && setSelectedDate(e.target.value)} 
                  onClick={(e) => {
                    try {
                      if ('showPicker' in HTMLInputElement.prototype) {
                        e.currentTarget.showPicker();
                      }
                    } catch (err) {}
                  }}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0" 
                  style={{ zIndex: 10 }}
                />
                <button className="pointer-events-none h-8 rounded-full bg-gold-400 px-4 font-sans text-xs font-bold text-bg-void transition-colors hover:bg-gold-500">PICK DATE</button>
              </div>
            </div>
          </div>
        </div>

        {locError && (
          <div className="border-b border-red-500/20 bg-red-500/10 px-sp-5 py-3 text-center">
            <p className="font-sans text-xs font-medium text-red-400">
              ⚠️ {locError} <button onClick={() => { setLocError(""); setIsSearchingLoc(true); }} className="ml-2 underline font-bold hover:text-red-300">Search Manually</button>
            </p>
          </div>
        )}

        {apiError && (
          <div className="mx-auto mt-8 max-w-content px-sp-5">
            <div className="rounded-card border border-red-500/30 bg-red-500/5 p-8 text-center">
              <span className="text-3xl">⚠️</span>
              <h2 className="mt-4 font-display text-lg font-bold text-red-600">Failed to load Astro Data</h2>
              <p className="mt-2 font-sans text-sm text-red-500/80">{apiError}</p>
              <button 
                onClick={() => load(selectedDate, lat, lng)} 
                disabled={retryCountdown !== null}
                className={`mt-6 rounded-full px-6 py-2 font-sans text-sm font-bold text-bg-void transition-colors ${
                  retryCountdown !== null 
                    ? "bg-gold-500/50 cursor-not-allowed" 
                    : "bg-gold-500 hover:bg-gold-600"
                }`}
              >
                {retryCountdown !== null ? `Wait ${retryCountdown}s...` : "Try Again"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mx-auto max-w-content space-y-8 px-sp-5 py-sp-10 animate-pulse">
            <div className="h-32 rounded-2xl bg-gold-100" />
            <div className="grid grid-cols-2 gap-4"><div className="h-48 rounded-2xl bg-gold-100"/><div className="h-48 rounded-2xl bg-gold-100"/></div>
          </div>
        ) : data && !apiError ? (
          <div className="mx-auto max-w-content space-y-sp-10 px-sp-5 py-sp-8">
            
            {/* 1. At A Glance Strip */}
            <section>
              <div className="flex flex-wrap items-stretch justify-center gap-4">
                {[
                  { label: "TITHI", val: curTithi?.name, sub: curTithi?.paksha },
                  { label: "NAKSHATRA", val: curNakshatra?.name, sub: curNakshatra?.lord?.vedic_name },
                  { label: "YOGA", val: curYoga?.name, sub: "Luni-Solar" },
                  { label: "KARANA", val: curKarana?.name, sub: "Half-Tithi" },
                  { label: "VAARA", val: data.vaara, sub: "Weekday" },
                ].map((item, i) => (
                  <div key={i} className="flex-1 min-w-[140px] relative overflow-hidden rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.03)] p-5 text-center transition-transform hover:-translate-y-1">
                    <p className="eyebrow mb-2 text-gold-500">{item.label}</p>
                    <p className="font-display text-lg font-semibold text-text-primary">{item.val ?? "—"}</p>
                    {item.sub && <p className="mt-1 font-sans text-xs text-text-muted">{item.sub}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Solar Times (Image Cards) */}
            <section className="grid gap-sp-5 md:grid-cols-2">
              <div className="group relative aspect-[2/1] overflow-hidden rounded-card border border-[rgba(184,146,40,0.15)] md:aspect-auto md:h-64">
                <Image src="/panchang_sunrise.webp" alt="Sunrise" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6">
                  <div>
                    <p className="eyebrow mb-1 text-gold-500">Sunrise</p>
                    <p className="font-display text-4xl font-bold text-text-primary drop-shadow-lg">{fmt(data.sunrise)}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/10 backdrop-blur-md">
                    <span className="text-2xl">🌅</span>
                  </div>
                </div>
              </div>
              <div className="group relative aspect-[2/1] overflow-hidden rounded-card border border-[rgba(184,146,40,0.15)] md:aspect-auto md:h-64">
                <Image src="/panchang_sunset.webp" alt="Sunset" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-6">
                  <div>
                    <p className="eyebrow mb-1 text-gold-500">Sunset</p>
                    <p className="font-display text-4xl font-bold text-text-primary drop-shadow-lg">{fmt(data.sunset)}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/10 backdrop-blur-md">
                    <span className="text-2xl">🌇</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Muhurta Dashboard */}
            <section className="grid gap-sp-6 lg:grid-cols-2">
              {/* Auspicious Block */}
              <div className="relative overflow-hidden rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6 md:p-8">
                <h3 className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold text-text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-sm">✨</span>
                  Auspicious Timings
                </h3>
                <div className="space-y-4">
                  {[ { n: "Abhijit Muhurat", p: abhijit, d: "Most auspicious 48-min window" }, { n: "Amrit Kaal", p: amrit, d: "Highly auspicious — good for all" }, { n: "Brahma Muhurat", p: brahma, d: "Best for meditation & study" } ].map((item, i) => (
                    <div key={i} className="flex flex-col justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-[rgba(212,168,83,0.04)] p-4 transition-colors hover:border-gold-500/30 sm:flex-row sm:items-center">
                      <div>
                        <p className="font-sans text-sm font-bold text-text-primary">{item.n}</p>
                        <p className="mt-1 font-sans text-xs text-text-muted">{item.d}</p>
                      </div>
                      <p className="mt-2 font-sans text-sm font-medium text-emerald-500 sm:mt-0">{item.p ? `${fmt(item.p.start)} – ${fmt(item.p.end)}` : "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inauspicious Block */}
              <div className="relative overflow-hidden rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6 md:p-8">
                <h3 className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold text-text-primary">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-sm">⚠️</span>
                  Inauspicious Timings
                </h3>
                <div className="space-y-4">
                  {[ { n: "Rahu Kaal", p: rahu }, { n: "Gulika Kaal", p: gulika }, { n: "Yamaghanda", p: yama } ].map((item, i) => (
                    <div key={i} className="flex flex-col justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-bg-void p-4 transition-colors hover:border-[rgba(184,146,40,0.3)] sm:flex-row sm:items-center">
                      <p className="font-sans text-sm font-bold text-text-primary">{item.n}</p>
                      <p className="mt-2 font-sans text-sm font-medium text-red-500 sm:mt-0">{item.p ? `${fmt(item.p.start)} – ${fmt(item.p.end)}` : "—"}</p>
                    </div>
                  ))}
                  {durMuh && durMuh.period.map((slot, i) => (
                    <div key={`dur-${i}`} className="flex flex-col justify-between rounded-input border border-[rgba(184,146,40,0.1)] bg-bg-void p-4 transition-colors sm:flex-row sm:items-center">
                      <p className="font-sans text-sm font-bold text-text-primary">Dur Muhurat</p>
                      <p className="mt-2 font-sans text-sm font-medium text-red-500 sm:mt-0">{fmt(slot.start)} – {fmt(slot.end)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Planetary Hora */}
            <section className="pt-sp-4">
              <div className="mb-sp-8 text-center">
                <h2 className="mb-2 font-display text-3xl font-bold text-text-primary">Planetary Hora</h2>
                <p className="font-sans text-sm text-text-muted">Planetary hours governing auspiciousness of activities.</p>
              </div>

              <div className="grid gap-sp-6 lg:grid-cols-2">
                {/* Day Horas */}
                <div className="rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6">
                  <h4 className="eyebrow mb-6 flex items-center gap-2 text-gold-500"><span className="text-lg">☀️</span> Day Horas</h4>
                  <div className="relative space-y-3 before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-px before:-translate-x-px before:bg-[rgba(184,146,40,0.1)] md:before:mx-auto md:before:translate-x-0">
                    {dayHoras.map((h, i) => {
                      const isActive = new Date(h.start) <= now && now < new Date(h.end);
                      return (
                        <div key={i} className="group relative flex items-center justify-between">
                          <div className={`absolute left-0 top-1/2 z-10 -mt-1 h-2.5 w-2.5 rounded-full border-[1.5px] border-bg-void transition-transform ${isActive ? "scale-150 bg-gold-400" : "bg-[rgba(184,146,40,0.4)]"}`} />
                          <div className={`ml-8 flex w-full items-center justify-between rounded-input p-3 transition-colors ${isActive ? "border border-gold-400 bg-[rgba(212,168,83,0.08)]" : "border border-[rgba(184,146,40,0.05)] bg-bg-void hover:border-[rgba(184,146,40,0.2)]"}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-xl text-text-secondary">{PLANET_SYMBOL[h.hora.name]}</span>
                              <div>
                                <p className="font-sans text-sm font-bold text-text-primary">{h.hora.name}</p>
                                <p className={`font-sans text-[10px] uppercase tracking-wider ${HORA_COLOR[h.type]}`}>{h.type}</p>
                              </div>
                            </div>
                            <span className="font-sans text-sm font-medium text-text-secondary">{fmt(h.start)} – {fmt(h.end)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Night Horas */}
                <div className="rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6">
                  <h4 className="eyebrow mb-6 flex items-center gap-2 text-gold-500"><span className="text-lg">🌙</span> Night Horas</h4>
                  <div className="relative space-y-3 before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-px before:-translate-x-px before:bg-[rgba(184,146,40,0.1)] md:before:mx-auto md:before:translate-x-0">
                    {nightHoras.map((h, i) => {
                      const isActive = new Date(h.start) <= now && now < new Date(h.end);
                      return (
                        <div key={i} className="group relative flex items-center justify-between">
                          <div className={`absolute left-0 top-1/2 z-10 -mt-1 h-2.5 w-2.5 rounded-full border-[1.5px] border-bg-void transition-transform ${isActive ? "scale-150 bg-gold-400" : "bg-[rgba(184,146,40,0.4)]"}`} />
                          <div className={`ml-8 flex w-full items-center justify-between rounded-input p-3 transition-colors ${isActive ? "border border-gold-400 bg-[rgba(212,168,83,0.08)]" : "border border-[rgba(184,146,40,0.05)] bg-bg-void hover:border-[rgba(184,146,40,0.2)]"}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-xl text-text-secondary">{PLANET_SYMBOL[h.hora.name]}</span>
                              <div>
                                <p className="font-sans text-sm font-bold text-text-primary">{h.hora.name}</p>
                                <p className={`font-sans text-[10px] uppercase tracking-wider ${HORA_COLOR[h.type]}`}>{h.type}</p>
                              </div>
                            </div>
                            <span className="font-sans text-sm font-medium text-text-secondary">{fmt(h.start)} – {fmt(h.end)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Chaughadiya */}
            <section className="pt-sp-4">
              <div className="mb-sp-8 text-center">
                <h2 className="mb-2 font-display text-3xl font-bold text-text-primary">Chaughadiya</h2>
                <p className="mb-6 font-sans text-sm text-text-muted">Vedic time periods for auspicious activities.</p>
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-3 font-sans text-xs">
                  {Object.entries(CHOG_DESC).map(([key, desc]) => (
                    <div key={key} className="flex items-center gap-2 rounded-full border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.04)] px-3 py-1.5">
                      <span className={`h-2 w-2 rounded-full ${CHOG_DOT[Object.keys(CHOG_DOT).find(k => k.includes(key) || desc.includes(k)) || "Good"] ?? "bg-text-muted"}`} />
                      <span className="text-text-secondary"><span className="font-bold text-text-primary">{key}</span> ({desc})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-sp-6 lg:grid-cols-2">
                {/* Day Chaughadiya */}
                <div className="rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6">
                  <h4 className="eyebrow mb-6 flex items-center gap-2 text-gold-500"><span className="text-lg">☀️</span> Day Chaughadiya</h4>
                  <div className="space-y-3">
                    {dayChog.map((m, i) => {
                      const isActive = new Date(m.start) <= now && now < new Date(m.end);
                      return (
                        <div key={i} className={`flex items-center justify-between rounded-input border p-3.5 transition-all ${isActive ? "scale-[1.01] border-gold-400 bg-[rgba(212,168,83,0.08)]" : "border-[rgba(184,146,40,0.1)] bg-bg-void hover:border-[rgba(184,146,40,0.3)]"}`}>
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${CHOG_DOT[m.type] ?? "bg-[rgba(184,146,40,0.2)]"}`} />
                            <div>
                              <p className="font-sans text-sm font-bold text-text-primary">{m.name}</p>
                              {m.vela && <p className="font-sans text-[10px] text-text-muted">{m.vela}</p>}
                            </div>
                          </div>
                          <span className="font-sans text-sm font-medium text-text-secondary">{fmt(m.start)} – {fmt(m.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Night Chaughadiya */}
                <div className="rounded-card border border-[rgba(184,146,40,0.15)] bg-[rgba(212,168,83,0.02)] p-6">
                  <h4 className="eyebrow mb-6 flex items-center gap-2 text-gold-500"><span className="text-lg">🌙</span> Night Chaughadiya</h4>
                  <div className="space-y-3">
                    {nightChog.map((m, i) => {
                      const isActive = new Date(m.start) <= now && now < new Date(m.end);
                      return (
                        <div key={i} className={`flex items-center justify-between rounded-input border p-3.5 transition-all ${isActive ? "scale-[1.01] border-gold-400 bg-[rgba(212,168,83,0.08)]" : "border-[rgba(184,146,40,0.1)] bg-bg-void hover:border-[rgba(184,146,40,0.3)]"}`}>
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${CHOG_DOT[m.type] ?? "bg-[rgba(184,146,40,0.2)]"}`} />
                            <div>
                              <p className="font-sans text-sm font-bold text-text-primary">{m.name}</p>
                              {m.vela && <p className="font-sans text-[10px] text-text-muted">{m.vela}</p>}
                            </div>
                          </div>
                          <span className="font-sans text-sm font-medium text-text-secondary">{fmt(m.start)} – {fmt(m.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <p className="pt-8 text-center font-sans text-xs text-text-muted border-t border-[rgba(184,146,40,0.1)]">
              Panchang for {locName} ({Number(lat).toFixed(2)}°N, {Number(lng).toFixed(2)}°E) · IST (UTC+5:30) · Powered by Prokerala
            </p>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
