"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Palette (Antique Ivory — high contrast)                             */
/* ------------------------------------------------------------------ */
const C = {
  gold: "#8A6B12",
  goldLight: "#B89228",
  ink: "#1A0900",
  maroon: "#7A0E20",
  textMuted: "#6B4020",
  divider: "rgba(26, 9, 0, 0.45)",
  dividerSoft: "rgba(138, 107, 18, 0.35)",
  tooltipBg: "#FDFAF3",
  tooltipBorder: "rgba(122, 14, 32, 0.35)",
};

const ELEMENT_COLOR: Record<string, string> = {
  Fire: "#9C1A1A",
  Earth: "#4A6B1A",
  Air: "#1A4A8C",
  Water: "#1A5A7A",
};

const PLANET_GLYPH: Record<string, string> = {
  Mars: "♂",
  Venus: "♀",
  Mercury: "☿",
  Moon: "☾",
  Sun: "☉",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "♅",
  Neptune: "♆",
};

function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ------------------------------------------------------------------ */
/* Zodiac data                                                         */
/* ------------------------------------------------------------------ */
const SIGNS = [
  { name: "Aries", glyph: "♈", element: "Fire", planet: "Mars", dates: "Mar 21–Apr 19", deg: 0 },
  { name: "Taurus", glyph: "♉", element: "Earth", planet: "Venus", dates: "Apr 20–May 20", deg: 30 },
  { name: "Gemini", glyph: "♊", element: "Air", planet: "Mercury", dates: "May 21–Jun 20", deg: 60 },
  { name: "Cancer", glyph: "♋", element: "Water", planet: "Moon", dates: "Jun 21–Jul 22", deg: 90 },
  { name: "Leo", glyph: "♌", element: "Fire", planet: "Sun", dates: "Jul 23–Aug 22", deg: 120 },
  { name: "Virgo", glyph: "♍", element: "Earth", planet: "Mercury", dates: "Aug 23–Sep 22", deg: 150 },
  { name: "Libra", glyph: "♎", element: "Air", planet: "Venus", dates: "Sep 23–Oct 22", deg: 180 },
  { name: "Scorpio", glyph: "♏", element: "Water", planet: "Mars", dates: "Oct 23–Nov 21", deg: 210 },
  { name: "Sagittarius", glyph: "♐", element: "Fire", planet: "Jupiter", dates: "Nov 22–Dec 21", deg: 240 },
  { name: "Capricorn", glyph: "♑", element: "Earth", planet: "Saturn", dates: "Dec 22–Jan 19", deg: 270 },
  { name: "Aquarius", glyph: "♒", element: "Air", planet: "Uranus", dates: "Jan 20–Feb 18", deg: 300 },
  { name: "Pisces", glyph: "♓", element: "Water", planet: "Neptune", dates: "Feb 19–Mar 20", deg: 330 },
] as const;

type Sign = (typeof SIGNS)[number];

/* ------------------------------------------------------------------ */
/* Arc math helpers                                                    */
/* ------------------------------------------------------------------ */
function polarToCart(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segmentPath(
  cx: number,
  cy: number,
  r1: number,
  r2: number,
  startDeg: number,
  endDeg: number
): string {
  const p1 = polarToCart(cx, cy, r2, startDeg);
  const p2 = polarToCart(cx, cy, r2, endDeg);
  const p3 = polarToCart(cx, cy, r1, endDeg);
  const p4 = polarToCart(cx, cy, r1, startDeg);
  return `M ${p1.x} ${p1.y} A ${r2} ${r2} 0 0 1 ${p2.x} ${p2.y}
          L ${p3.x} ${p3.y} A ${r1} ${r1} 0 0 0 ${p4.x} ${p4.y} Z`;
}

/* ------------------------------------------------------------------ */
/* Geometry (internal viewBox is always 500, center 250)              */
/* ------------------------------------------------------------------ */
const VB = 500;
const CX = 250;
const CY = 250;

const R_STAR = 24;            // center ornament
const R_HN_IN = 30;           // house-number ring
const R_HN_OUT = 60;
const R_HN = 45;
const R_PL_IN = 60;           // ruling-planet ring
const R_PL_OUT = 94;
const R_PL = 77;
const R_Z_IN = 94;            // main zodiac ring (interactive)
const R_Z_OUT = 162;
const R_GLYPH = 128;
const R_L_IN = 162;           // sign-name label ring
const R_L_OUT = 194;
const R_LABEL = 178;
const R_TICK = 197;           // degree-tick ring base
const R_B1 = 213;             // inner gold border
const R_B2 = 219;             // outer maroon border
const R_DOTS = 229;           // rotating outer ring
const R_SPIN_IN = 84;         // counter-rotating inner accent ring
const R_TIP = 250;            // tooltip anchor

/* 8-pointed gold star center ornament */
function starPath(): string {
  const outer = R_STAR;
  const inner = 9;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const o = polarToCart(CX, CY, outer, i * 45);
    const n = polarToCart(CX, CY, inner, i * 45 + 22.5);
    pts.push(`${i === 0 ? "M" : "L"} ${o.x} ${o.y}`, `L ${n.x} ${n.y}`);
  }
  return pts.join(" ") + " Z";
}

interface ZodiacWheelProps {
  size?: number;
  className?: string;
  onSignSelect?: (sign: Sign | null) => void;
}

export default function ZodiacWheel({
  size = 500,
  className,
  onSignSelect,
}: ZodiacWheelProps) {
  const reduced = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const active = selected ?? hovered;

  const segments = useMemo(
    () =>
      SIGNS.map((s, i) => ({
        sign: s,
        path: segmentPath(CX, CY, R_Z_IN, R_Z_OUT, s.deg, s.deg + 30),
        mid: s.deg + 15,
        glyphPos: polarToCart(CX, CY, R_GLYPH, s.deg + 15),
        labelPos: polarToCart(CX, CY, R_LABEL, s.deg + 15),
        planetPos: polarToCart(CX, CY, R_PL, s.deg + 15),
        hnPos: polarToCart(CX, CY, R_HN, s.deg + 15),
        index: i,
      })),
    []
  );

  // Full radial spokes at each 30° boundary (astrolabe look).
  const spokes = useMemo(
    () =>
      SIGNS.map((s) => ({
        a: polarToCart(CX, CY, R_HN_IN, s.deg),
        b: polarToCart(CX, CY, R_L_OUT, s.deg),
        deg: s.deg,
      })),
    []
  );

  // Degree ticks every 3°, longer at 15° and 30°.
  const ticks = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const deg = i * 3;
        const len = deg % 30 === 0 ? 14 : deg % 15 === 0 ? 8 : 4;
        const a = polarToCart(CX, CY, R_TICK, deg);
        const b = polarToCart(CX, CY, R_TICK + len, deg);
        return { a, b, major: deg % 30 === 0 };
      }),
    []
  );

  // Outer rotating ring: 72 dots + radial hairs every 5°.
  const outer = useMemo(
    () =>
      Array.from({ length: 72 }, (_, i) => {
        const deg = i * 5;
        const major = deg % 30 === 0;
        const dot = polarToCart(CX, CY, R_DOTS, deg);
        const t1 = polarToCart(CX, CY, R_DOTS + 4, deg);
        const t2 = polarToCart(CX, CY, R_DOTS + (major ? 11 : 7), deg);
        return { dot, t1, t2, r: major ? 2.6 : 1.2, major };
      }),
    []
  );

  // Inner counter-rotating accent ring: 36 short hairs.
  const innerSpin = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const deg = i * 10;
        const a = polarToCart(CX, CY, R_SPIN_IN, deg);
        const b = polarToCart(CX, CY, R_SPIN_IN + 5, deg);
        return { a, b };
      }),
    []
  );

  function toggle(i: number) {
    const next = selected === i ? null : i;
    setSelected(next);
    onSignSelect?.(next === null ? null : SIGNS[next]);
  }
  function deselect() {
    if (selected !== null) {
      setSelected(null);
      onSignSelect?.(null);
    }
  }

  // Tooltip placement — percentage-based, shifted inward to avoid overflow.
  let tip: { left: number; top: number; sign: Sign } | null = null;
  if (active !== null) {
    const s = SIGNS[active];
    const p = polarToCart(CX, CY, R_TIP, s.deg + 15);
    tip = {
      left: Math.max(18, Math.min(82, (p.x / VB) * 100)),
      top: Math.max(12, Math.min(88, (p.y / VB) * 100)),
      sign: s,
    };
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: size,
        aspectRatio: "1 / 1",
        overflow: "visible",
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VB} ${VB}`}
        role="group"
        aria-label="Interactive zodiac wheel"
        initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.9, ease: "easeOut" }}
        onClick={deselect}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* ---- Structural circles (high contrast) ---- */}
        <circle cx={CX} cy={CY} r={R_HN_IN} fill="none" stroke={C.dividerSoft} strokeWidth={1} />
        <circle cx={CX} cy={CY} r={R_PL_IN} fill="none" stroke={C.dividerSoft} strokeWidth={1} />
        <circle cx={CX} cy={CY} r={R_Z_IN} fill="none" stroke={C.gold} strokeWidth={1.25} />
        <circle cx={CX} cy={CY} r={R_Z_OUT} fill="none" stroke={C.gold} strokeWidth={1.25} />
        <circle cx={CX} cy={CY} r={R_L_OUT} fill="none" stroke={C.dividerSoft} strokeWidth={1} />

        {/* ---- Radial spokes at each 30° ---- */}
        {spokes.map((s) => (
          <line
            key={`spoke-${s.deg}`}
            x1={s.a.x}
            y1={s.a.y}
            x2={s.b.x}
            y2={s.b.y}
            stroke={C.gold}
            strokeWidth={1}
            pointerEvents="none"
          />
        ))}

        {/* ---- Element-tinted interactive zodiac segments ---- */}
        <g>
          {segments.map(({ sign, path, index }) => {
            const ec = ELEMENT_COLOR[sign.element];
            const isActive = active === index;
            const fill =
              selected === index
                ? hexToRgba(ec, 0.42)
                : hovered === index
                ? hexToRgba(ec, 0.3)
                : hexToRgba(ec, 0.14);
            return (
              <path
                key={sign.name}
                d={path}
                fill={fill}
                stroke={isActive ? C.maroon : "transparent"}
                strokeWidth={isActive ? 1.75 : 0}
                style={{
                  cursor: "pointer",
                  pointerEvents: "all",
                  transition: "fill 150ms ease, stroke 150ms ease, stroke-width 150ms ease",
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered((h) => (h === index ? null : h))}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(index);
                }}
              >
                <title>{`${sign.name} — ${sign.dates}`}</title>
              </path>
            );
          })}
        </g>

        {/* ---- House numbers (inner ring) ---- */}
        {segments.map(({ sign, hnPos, index }) => (
          <text
            key={`hn-${sign.name}`}
            x={hnPos.x}
            y={hnPos.y}
            fontSize={11}
            fontWeight={700}
            textAnchor="middle"
            dominantBaseline="central"
            fill={active === index ? C.maroon : C.gold}
            pointerEvents="none"
            style={{ transition: "fill 150ms ease" }}
          >
            {index + 1}
          </text>
        ))}

        {/* ---- Ruling-planet glyphs ---- */}
        {segments.map(({ sign, planetPos, index }) => (
          <text
            key={`pl-${sign.name}`}
            x={planetPos.x}
            y={planetPos.y}
            fontSize={14}
            textAnchor="middle"
            dominantBaseline="central"
            fill={active === index ? C.maroon : C.textMuted}
            pointerEvents="none"
            style={{ transition: "fill 150ms ease" }}
          >
            {PLANET_GLYPH[sign.planet]}
          </text>
        ))}

        {/* ---- Big zodiac glyphs ---- */}
        {segments.map(({ sign, glyphPos, index }) => (
          <text
            key={`glyph-${sign.name}`}
            x={glyphPos.x}
            y={glyphPos.y}
            fontSize={26}
            textAnchor="middle"
            dominantBaseline="central"
            fill={active === index ? C.maroon : C.ink}
            pointerEvents="none"
            style={{ transition: "fill 150ms ease", fontWeight: 600 }}
          >
            {sign.glyph}
          </text>
        ))}

        {/* ---- Sign-name labels (tangential, upright) ---- */}
        {segments.map(({ sign, labelPos, mid, index }) => {
          const rot = mid > 90 && mid < 270 ? mid + 180 : mid;
          return (
            <text
              key={`label-${sign.name}`}
              x={labelPos.x}
              y={labelPos.y}
              fontSize={11}
              fontWeight={700}
              letterSpacing="0.1em"
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${rot} ${labelPos.x} ${labelPos.y})`}
              fill={active === index ? C.maroon : C.ink}
              pointerEvents="none"
              style={{ transition: "fill 150ms ease", textTransform: "uppercase" }}
            >
              {sign.name}
            </text>
          );
        })}

        {/* ---- Degree ticks ---- */}
        {ticks.map((t, i) => (
          <line
            key={`tick-${i}`}
            x1={t.a.x}
            y1={t.a.y}
            x2={t.b.x}
            y2={t.b.y}
            stroke={t.major ? C.ink : C.gold}
            strokeWidth={t.major ? 1.3 : 0.7}
            pointerEvents="none"
          />
        ))}

        {/* ---- Double outer border ---- */}
        <circle cx={CX} cy={CY} r={R_B1} fill="none" stroke={C.gold} strokeWidth={1.5} pointerEvents="none" />
        <circle cx={CX} cy={CY} r={R_B2} fill="none" stroke={C.maroon} strokeWidth={1} pointerEvents="none" />

        {/* ---- Counter-rotating inner accent ring ---- */}
        <motion.g
          animate={reduced ? undefined : { rotate: [0, -360] }}
          transition={reduced ? undefined : { duration: 160, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "250px 250px", transformBox: "view-box" } as React.CSSProperties}
          pointerEvents="none"
        >
          {innerSpin.map((s, i) => (
            <line key={i} x1={s.a.x} y1={s.a.y} x2={s.b.x} y2={s.b.y} stroke={C.dividerSoft} strokeWidth={1} />
          ))}
        </motion.g>

        {/* ---- Outer rotating dotted + hair ring ---- */}
        <motion.g
          animate={reduced ? undefined : { rotate: [0, 360] }}
          transition={reduced ? undefined : { duration: 200, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "250px 250px", transformBox: "view-box" } as React.CSSProperties}
          pointerEvents="none"
        >
          {outer.map((d, i) => (
            <g key={i}>
              <line
                x1={d.t1.x}
                y1={d.t1.y}
                x2={d.t2.x}
                y2={d.t2.y}
                stroke={d.major ? C.maroon : C.gold}
                strokeWidth={d.major ? 1.4 : 0.8}
              />
              <circle cx={d.dot.x} cy={d.dot.y} r={d.r} fill={d.major ? C.maroon : C.gold} />
            </g>
          ))}
        </motion.g>

        {/* ---- Center ornament ---- */}
        <circle cx={CX} cy={CY} r={13} fill={C.maroon} />
        <path d={starPath()} fill={C.gold} />
        <circle cx={CX} cy={CY} r={3.5} fill={C.tooltipBg} />
      </motion.svg>

      {/* ---- Tooltip ---- */}
      <AnimatePresence>
        {tip && (
          <motion.div
            key={tip.sign.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="tooltip"
            style={{
              position: "absolute",
              left: `${tip.left}%`,
              top: `${tip.top}%`,
              transform: "translate(-50%, -50%)",
              minWidth: 130,
              padding: "12px 16px",
              background: C.tooltipBg,
              border: `1px solid ${C.tooltipBorder}`,
              borderRadius: 10,
              boxShadow: "0 10px 28px -10px rgba(26, 9, 0, 0.35)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 36, lineHeight: 1, color: C.gold }}>{tip.sign.glyph}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{tip.sign.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{tip.sign.dates}</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
                fontSize: 12,
                color: C.textMuted,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: ELEMENT_COLOR[tip.sign.element],
                  display: "inline-block",
                }}
              />
              <span style={{ fontWeight: 600 }}>{tip.sign.element}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>
                {PLANET_GLYPH[tip.sign.planet]} {tip.sign.planet}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
