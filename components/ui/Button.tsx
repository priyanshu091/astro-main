"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
}

const base =
  "inline-flex items-center justify-center font-sans font-semibold cursor-pointer transition-all duration-200 ease-out select-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "rounded-btn px-7 py-2.5 text-sm",
  lg: "rounded-btn px-8 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "text-text-on-gold border-0 bg-[linear-gradient(155deg,var(--gold-100),var(--gold-500))] hover:-translate-y-px hover:bg-[linear-gradient(155deg,var(--gold-200),var(--gold-600))] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "border border-gold-400 text-gold-600 bg-transparent hover:bg-[rgba(184,146,40,0.08)] hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
  ghost:
    "border-0 bg-transparent text-gold-400 hover:text-gold-600 px-2 py-1",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className = "", as = "button", href, ...props },
  ref
) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (as === "a") {
    const { children, ...rest } = props;
    return (
      <a href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return <button ref={ref} className={cls} {...props} />;
});

export default Button;
