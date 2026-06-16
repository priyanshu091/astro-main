"use client";

const ZODIAC_SIGNS = [
  { name: "AQUARIUS", symbol: "\u2652\uFE0E" },
  { name: "PISCES", symbol: "\u2653\uFE0E" },
  { name: "ARIES", symbol: "\u2648\uFE0E" },
  { name: "TAURUS", symbol: "\u2649\uFE0E" },
  { name: "GEMINI", symbol: "\u264A\uFE0E" },
  { name: "CANCER", symbol: "\u264B\uFE0E" },
  { name: "LEO", symbol: "\u264C\uFE0E" },
  { name: "VIRGO", symbol: "\u264D\uFE0E" },
  { name: "LIBRA", symbol: "\u264E\uFE0E" },
  { name: "SCORPIO", symbol: "\u264F\uFE0E" },
  { name: "SAGITTARIUS", symbol: "\u2650\uFE0E" },
  { name: "CAPRICORN", symbol: "\u2651\uFE0E" },
];

export default function KundliChart() {
  // Build ticks
  const ticks = [];
  for (let i = 0; i < 72; i++) {
    const angle = i * 5;
    const isLarge = i % 6 === 0;
    ticks.push(
      <line
        key={i}
        x1="120"
        y1={isLarge ? "15" : "18"}
        x2="120"
        y2="22"
        transform={`rotate(${angle} 120 120)`}
        stroke="var(--gold-400)"
        strokeWidth={isLarge ? 0.6 : 0.3}
        opacity={isLarge ? 0.7 : 0.4}
      />
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-full border border-gold-400/10 bg-bg-surface/10 p-2 shadow-[0_0_50px_rgba(184,146,40,0.03)]"
      style={{ aspectRatio: "1 / 1" }}
      role="img"
      aria-label="Interactive decorative rotating Zodiac wheel"
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full select-none"
      >
        {/* GPU accelerated rotating group */}
        <g className="animate-zodiac-rotate">
          {/* Background space fill */}
          <circle cx="120" cy="120" r="115" fill="var(--bg-cosmos)" opacity="0.6" />

          {/* Grid concentric circles */}
          <circle cx="120" cy="120" r="115" stroke="var(--gold-400)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <circle cx="120" cy="120" r="105" stroke="var(--gold-400)" strokeWidth="0.6" fill="none" opacity="0.4" />
          <circle cx="120" cy="120" r="90" stroke="var(--gold-400)" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="120" cy="120" r="70" stroke="var(--gold-400)" strokeWidth="0.5" fill="none" opacity="0.3" />
          <circle cx="120" cy="120" r="50" stroke="var(--gold-400)" strokeWidth="0.6" fill="none" opacity="0.4" />
          <circle cx="120" cy="120" r="25" stroke="var(--gold-400)" strokeWidth="0.5" fill="none" opacity="0.2" />

          {/* Division separators */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="70"
              x2="120"
              y2="15"
              transform={`rotate(${i * 30} 120 120)`}
              stroke="var(--gold-400)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Star geometry inside core */}
          <rect x="85" y="85" width="70" height="70" stroke="var(--gold-400)" strokeWidth="0.4" fill="none" opacity="0.35" transform="rotate(0 120 120)" />
          <rect x="85" y="85" width="70" height="70" stroke="var(--gold-400)" strokeWidth="0.4" fill="none" opacity="0.35" transform="rotate(30 120 120)" />
          <rect x="85" y="85" width="70" height="70" stroke="var(--gold-400)" strokeWidth="0.4" fill="none" opacity="0.35" transform="rotate(60 120 120)" />

          {/* Central star center sun */}
          <circle cx="120" cy="120" r="10" stroke="var(--gold-400)" strokeWidth="0.4" fill="none" opacity="0.4" />
          <polygon
            points="120,115 121.5,118.5 125,120 121.5,121.5 120,125 118.5,121.5 115,120 118.5,118.5"
            fill="var(--gold-400)"
            opacity="0.7"
          />

          {/* Ticks */}
          {ticks}

          {/* Signs text and symbols */}
          {ZODIAC_SIGNS.map((s, i) => {
            const angle = i * 30 + 15;
            return (
              <g key={s.name} transform={`rotate(${angle} 120 120)`}>
                {/* Capitalized Sign Name */}
                <text
                  x="120"
                  y="13"
                  textAnchor="middle"
                  fontSize="4.2"
                  fontFamily="var(--font-sans)"
                  fontWeight="700"
                  fill="var(--text-primary)"
                  letterSpacing="0.08em"
                  opacity="0.95"
                >
                  {s.name}
                </text>
                {/* Unicode Glyph */}
                <text
                  x="120"
                  y="23"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="var(--font-sans)"
                  fill="var(--gold-400)"
                  opacity="0.9"
                >
                  {s.symbol}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
