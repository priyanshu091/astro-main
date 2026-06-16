"use client";

/**
 * Base surface card per design system §2.4 / §7.3.
 * Subtle gradient overlay, faint gold border, and (when interactive) a lift +
 * border-brighten hover. Use `group` so children can react to hover.
 */
export default function Card({
  children,
  className = "",
  interactive = true,
  as = "div",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "a";
  href?: string;
}) {
  const cls =
    "group relative rounded-card border border-[rgba(184,146,40,0.1)] bg-bg-cosmos " +
    (interactive
      ? "cursor-pointer transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:border-[rgba(184,146,40,0.25)] hover:bg-bg-surface-hover active:-translate-y-0.5 active:scale-[0.995] "
      : "") +
    className;

  const style = {
    backgroundImage:
      "linear-gradient(165deg, rgba(255,255,255,0.025), rgba(255,255,255,0) 60%)",
  };

  if (as === "a") {
    return (
      <a href={href} className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
