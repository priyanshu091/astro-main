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
const HORA_COLOR: Record<string, string> = { "Good": "text-emerald-400", "Not Bad": "text-blue-400", "Neither Good Nor Bad": "text-white/60", "Bad": "text-rose-400" };
const CHOG_DOT: Record<string, string> = { "Most Auspicious": "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]", "Good": "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]", "Inauspicious": "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" };
const CHOG_DESC: Record<string, string> = { Amrut: "Nectar", Shubh: "Auspicious", Labh: "Profit", Char: "Movement", Udveg: "Agitated", Kaal: "Inauspicious", Rog: "Disease" };

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PanchangPage() {
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [data, setData] = useState<PanchangData | null>(null);
  const [horaData, setHoraData] = useState<{ hora_timing: HoraTiming[] } | null>(null);
  const [chogData, setChogData] = useState<{ muhurat: ChoghadiyaMuhurat[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (dateStr: string) => {
    setLoading(true);
    const dt = toISO(dateStr);
    try {
      const [panRes, horaRes] = await Promise.all([
        fetch(`/api/panchang?datetime=${encodeURIComponent(dt)}`), fetch(`/api/hora?datetime=${encodeURIComponent(dt)}`)
      ]);
      const [panJson, horaJson] = await Promise.all([panRes.json(), horaRes.json()]);
      setData(panJson.panchang);
      setHoraData(horaJson.hora);
      setChogData(horaJson.choghadiya);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(selectedDate); }, [selectedDate, load]);

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
      <main className="min-h-screen bg-bg-void pt-[88px] pb-24 text-white" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(212,168,83,0.08) 0%, transparent 70%)" }}>
        
        {/* Date Selector Header - Sticky */}
        <div className="sticky top-[88px] z-40 border-b border-white/5 bg-bg-void/80 backdrop-blur-xl">
          <div className="mx-auto max-w-content px-sp-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
                <span className="text-xl">🕉️</span>
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-white tracking-wide">VEDIC ALMANAC</h1>
                <p className="font-sans text-xs text-gold-400">Lucknow, India</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 rounded-full p-1 border border-white/10">
              <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="px-3 text-center min-w-[140px]">
                <p className="font-sans text-sm font-semibold text-white">{displayDate}</p>
                {isToday && <p className="font-sans text-[9px] text-gold-400 uppercase tracking-widest">Today</p>}
              </div>
              <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="relative border-l border-white/10 pl-1">
                <input type="date" value={selectedDate} onChange={(e) => e.target.value && setSelectedDate(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
                <button className="h-8 px-4 rounded-full bg-gold-500 text-bg-void font-bold text-xs hover:bg-gold-400 transition-colors pointer-events-none">PICK DATE</button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mx-auto max-w-content px-sp-5 py-sp-10 animate-pulse space-y-8">
            <div className="h-32 bg-white/5 rounded-2xl" />
            <div className="grid grid-cols-2 gap-4"><div className="h-48 bg-white/5 rounded-2xl"/><div className="h-48 bg-white/5 rounded-2xl"/></div>
          </div>
        ) : data ? (
          <div className="mx-auto max-w-content px-sp-5 py-sp-8 space-y-sp-10">
            
            {/* 1. At A Glance Strip (Glassmorphism) */}
            <section>
              <div className="flex flex-wrap items-stretch justify-center gap-4">
                {[
                  { label: "TITHI", val: curTithi?.name, sub: curTithi?.paksha },
                  { label: "NAKSHATRA", val: curNakshatra?.name, sub: curNakshatra?.lord?.vedic_name },
                  { label: "YOGA", val: curYoga?.name, sub: "Luni-Solar" },
                  { label: "KARANA", val: curKarana?.name, sub: "Half-Tithi" },
                  { label: "VAARA", val: data.vaara, sub: "Weekday" },
                ].map((item, i) => (
                  <div key={i} className="flex-1 min-w-[140px] relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 text-center transition-transform hover:-translate-y-1 hover:bg-white/[0.04]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-50" />
                    <p className="font-sans text-[10px] font-bold text-white/50 tracking-widest uppercase mb-2">{item.label}</p>
                    <p className="font-display text-lg font-semibold text-gold-400">{item.val ?? "—"}</p>
                    {item.sub && <p className="font-sans text-xs text-white/40 mt-1">{item.sub}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Solar Times (Image Cards) */}
            <section className="grid md:grid-cols-2 gap-sp-5">
              <div className="relative rounded-3xl overflow-hidden aspect-[2/1] md:aspect-auto md:h-64 border border-white/10 group">
                <Image src="/panchang_sunrise.png" alt="Sunrise" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void/90 via-bg-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                  <div>
                    <p className="font-sans text-xs font-bold text-white/70 tracking-widest uppercase mb-1">Sunrise</p>
                    <p className="font-display text-4xl font-bold text-white drop-shadow-lg">{fmt(data.sunrise)}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <span className="text-2xl">🌅</span>
                  </div>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-[2/1] md:aspect-auto md:h-64 border border-white/10 group">
                <Image src="/panchang_sunset.png" alt="Sunset" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void/90 via-bg-void/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                  <div>
                    <p className="font-sans text-xs font-bold text-white/70 tracking-widest uppercase mb-1">Sunset</p>
                    <p className="font-display text-4xl font-bold text-white drop-shadow-lg">{fmt(data.sunset)}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <span className="text-2xl">🌇</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Muhurta Dashboard (Auspicious vs Inauspicious side-by-side) */}
            <section className="grid lg:grid-cols-2 gap-sp-6">
              {/* Auspicious Block */}
              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
                <h3 className="font-display text-2xl font-semibold text-emerald-400 mb-6 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm">✨</span>
                  Auspicious Timings
                </h3>
                <div className="space-y-4">
                  {[ { n: "Abhijit Muhurat", p: abhijit, d: "Most auspicious 48-min window" }, { n: "Amrit Kaal", p: amrit, d: "Highly auspicious — good for all" }, { n: "Brahma Muhurat", p: brahma, d: "Best for meditation & study" } ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <div>
                        <p className="font-sans text-sm font-bold text-white">{item.n}</p>
                        <p className="font-sans text-xs text-white/50 mt-1">{item.d}</p>
                      </div>
                      <p className="font-sans text-sm font-medium text-emerald-300 mt-2 sm:mt-0">{item.p ? `${fmt(item.p.start)} – ${fmt(item.p.end)}` : "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inauspicious Block */}
              <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
                <h3 className="font-display text-2xl font-semibold text-rose-400 mb-6 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center text-sm">⚠️</span>
                  Inauspicious Timings
                </h3>
                <div className="space-y-4">
                  {[ { n: "Rahu Kaal", p: rahu }, { n: "Gulika Kaal", p: gulika }, { n: "Yamaghanda", p: yama } ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <p className="font-sans text-sm font-bold text-white">{item.n}</p>
                      <p className="font-sans text-sm font-medium text-rose-300 mt-2 sm:mt-0">{item.p ? `${fmt(item.p.start)} – ${fmt(item.p.end)}` : "—"}</p>
                    </div>
                  ))}
                  {durMuh && durMuh.period.map((slot, i) => (
                    <div key={`dur-${i}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="font-sans text-sm font-bold text-white">Dur Muhurat</p>
                      <p className="font-sans text-sm font-medium text-rose-300 mt-2 sm:mt-0">{fmt(slot.start)} – {fmt(slot.end)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Planetary Hora (Timeline split) */}
            <section className="pt-sp-4">
              <div className="text-center mb-sp-8">
                <h2 className="font-display text-3xl font-bold text-white mb-2">Planetary Hora</h2>
                <p className="font-sans text-sm text-white/50">Planetary hours governing auspiciousness of activities.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-sp-6">
                {/* Day Horas */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  <h4 className="font-sans text-xs font-bold text-gold-400 tracking-widest uppercase mb-6 flex items-center gap-2"><span className="text-lg">☀️</span> Day Horas</h4>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {dayHoras.map((h, i) => {
                      const isActive = new Date(h.start) <= now && now < new Date(h.end);
                      return (
                        <div key={i} className="relative flex items-center justify-between group">
                          <div className={`absolute left-0 top-1/2 -mt-1.5 h-3 w-3 rounded-full border-2 border-bg-void ${isActive ? "bg-gold-400 scale-150" : "bg-white/30"} z-10 transition-transform`} />
                          <div className={`ml-8 w-full flex items-center justify-between p-3 rounded-xl transition-colors ${isActive ? "bg-gold-500/10 border border-gold-500/30" : "bg-white/5 border border-transparent hover:bg-white/10"}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-xl text-white/60">{PLANET_SYMBOL[h.hora.name]}</span>
                              <div>
                                <p className="font-sans text-sm font-bold text-white">{h.hora.name}</p>
                                <p className={`font-sans text-[10px] uppercase tracking-wider ${HORA_COLOR[h.type]}`}>{h.type}</p>
                              </div>
                            </div>
                            <span className="font-sans text-sm font-medium text-white/70">{fmt(h.start)} – {fmt(h.end)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Night Horas */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  <h4 className="font-sans text-xs font-bold text-blue-300 tracking-widest uppercase mb-6 flex items-center gap-2"><span className="text-lg">🌙</span> Night Horas</h4>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {nightHoras.map((h, i) => {
                      const isActive = new Date(h.start) <= now && now < new Date(h.end);
                      return (
                        <div key={i} className="relative flex items-center justify-between group">
                          <div className={`absolute left-0 top-1/2 -mt-1.5 h-3 w-3 rounded-full border-2 border-bg-void ${isActive ? "bg-gold-400 scale-150" : "bg-white/30"} z-10 transition-transform`} />
                          <div className={`ml-8 w-full flex items-center justify-between p-3 rounded-xl transition-colors ${isActive ? "bg-gold-500/10 border border-gold-500/30" : "bg-white/5 border border-transparent hover:bg-white/10"}`}>
                            <div className="flex items-center gap-3">
                              <span className="text-xl text-white/60">{PLANET_SYMBOL[h.hora.name]}</span>
                              <div>
                                <p className="font-sans text-sm font-bold text-white">{h.hora.name}</p>
                                <p className={`font-sans text-[10px] uppercase tracking-wider ${HORA_COLOR[h.type]}`}>{h.type}</p>
                              </div>
                            </div>
                            <span className="font-sans text-sm font-medium text-white/70">{fmt(h.start)} – {fmt(h.end)}</span>
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
              <div className="text-center mb-sp-8">
                <h2 className="font-display text-3xl font-bold text-white mb-2">Chaughadiya</h2>
                <p className="font-sans text-sm text-white/50 mb-6">Vedic time periods for auspicious activities.</p>
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 text-xs font-sans">
                  {Object.entries(CHOG_DESC).map(([key, desc]) => (
                    <div key={key} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <span className={`h-2 w-2 rounded-full ${CHOG_DOT[Object.keys(CHOG_DOT).find(k => k.includes(key) || desc.includes(k)) || "Good"] ?? "bg-white"}`} />
                      <span className="text-white/80"><span className="font-bold text-white">{key}</span> ({desc})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-sp-6">
                {/* Day Chaughadiya */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  <h4 className="font-sans text-xs font-bold text-gold-400 tracking-widest uppercase mb-6 flex items-center gap-2"><span className="text-lg">☀️</span> Day Chaughadiya</h4>
                  <div className="space-y-3">
                    {dayChog.map((m, i) => {
                      const isActive = new Date(m.start) <= now && now < new Date(m.end);
                      return (
                        <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${isActive ? "bg-gold-500/10 border-gold-500/30 scale-[1.02]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                          <div className="flex items-center gap-3">
                            <span className={`h-3 w-3 rounded-full ${CHOG_DOT[m.type] ?? "bg-white/20"}`} />
                            <div>
                              <p className="font-sans text-sm font-bold text-white">{m.name}</p>
                              {m.vela && <p className="font-sans text-[10px] text-white/40">{m.vela}</p>}
                            </div>
                          </div>
                          <span className="font-sans text-sm font-medium text-white/70">{fmt(m.start)} – {fmt(m.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Night Chaughadiya */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                  <h4 className="font-sans text-xs font-bold text-blue-300 tracking-widest uppercase mb-6 flex items-center gap-2"><span className="text-lg">🌙</span> Night Chaughadiya</h4>
                  <div className="space-y-3">
                    {nightChog.map((m, i) => {
                      const isActive = new Date(m.start) <= now && now < new Date(m.end);
                      return (
                        <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${isActive ? "bg-gold-500/10 border-gold-500/30 scale-[1.02]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                          <div className="flex items-center gap-3">
                            <span className={`h-3 w-3 rounded-full ${CHOG_DOT[m.type] ?? "bg-white/20"}`} />
                            <div>
                              <p className="font-sans text-sm font-bold text-white">{m.name}</p>
                              {m.vela && <p className="font-sans text-[10px] text-white/40">{m.vela}</p>}
                            </div>
                          </div>
                          <span className="font-sans text-sm font-medium text-white/70">{fmt(m.start)} – {fmt(m.end)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
