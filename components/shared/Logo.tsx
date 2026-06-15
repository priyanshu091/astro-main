/** Simplified yantra mark + wordmark, shared by the nav and footer. */
function YantraMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" stroke="var(--gold-400)" strokeWidth="1" />
      <path d="M12 2.5 L21.5 19 H2.5 Z" stroke="var(--gold-400)" strokeWidth="1" fill="none" />
      <path d="M12 21.5 L2.5 5 H21.5 Z" stroke="var(--gold-400)" strokeWidth="1" fill="none" />
      <circle cx="12" cy="12" r="2.2" fill="var(--gold-400)" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-sp-2 ${className}`} aria-label="Drishti — home">
      <YantraMark />
      <span className="font-display text-xl font-semibold text-text-primary">
        Drishti
      </span>
    </a>
  );
}
