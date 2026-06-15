// Hand-rolled inline SVGs in the Tabler "outline" style (24x24, 1.75 stroke).
// Using SVG — never emoji or Unicode glyphs — per the design system.

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconForms({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3" />
      <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3" />
      <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7" />
      <path d="M5 7H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" />
      <path d="M17 12h.01M13 12h.01" />
    </svg>
  );
}

export function IconChartDots({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M9 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
      <path d="M19 7m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
      <path d="M14 15m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
      <path d="M10.16 10.62l2.34 3.5M15.088 13.328l3.012-4.32" />
    </svg>
  );
}

export function IconCalendarEvent({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 5m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M16 3v4M8 3v4M4 11h16M8 15h2v2H8z" />
    </svg>
  );
}

// --- Service icons --------------------------------------------------------

export function IconBirthChart({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 L21 12 L12 21 L3 12 Z" />
      <path d="M3 3 L21 21 M21 3 L3 21" opacity="0.5" />
    </svg>
  );
}

export function IconRings({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="8.5" cy="13.5" r="6.5" />
      <circle cx="15.5" cy="13.5" r="6.5" />
      <path d="M12 2.5 L13.6 5 H10.4 Z" />
    </svg>
  );
}

export function IconBriefcase({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18M12 12v2" />
    </svg>
  );
}

export function IconClock({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconGem({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M6 4h12l3 5-9 11L3 9z" />
      <path d="M3 9h18M9 4 7.5 9 12 20M15 4l1.5 5L12 20" />
    </svg>
  );
}

export function IconSparkle({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7z" />
      <path d="M19 4v3M20.5 5.5h-3" opacity="0.6" />
    </svg>
  );
}

export function IconCheck({ size = 24, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function IconLock({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M5 11a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
      <path d="M8 9V6a4 4 0 1 1 8 0v3M12 14v2" />
    </svg>
  );
}

export function IconChevronDown({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconMapPin({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconStarFilled({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.56 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96z" />
    </svg>
  );
}

export function IconChevronLeft({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight({ size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

// --- Brand icons (Tabler outline style) -----------------------------------

export function IconInstagram({ size = 20, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16.5 7.5v.01" />
    </svg>
  );
}

export function IconTwitter({ size = 20, className, strokeWidth = 1.75 }: IconProps) {
  // Modern X glyph.
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768M13.232 10.768L20 4" />
    </svg>
  );
}

export function IconYoutube({ size = 20, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" />
    </svg>
  );
}
