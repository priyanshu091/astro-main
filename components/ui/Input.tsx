"use client";

import { forwardRef } from "react";

/**
 * Text input with the animated floating-label pattern (§7.2).
 * Label starts as placeholder, floats up + shrinks on focus or when filled.
 * Relies on a " " placeholder so the `:placeholder-shown` selector works.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={
            "peer h-14 w-full rounded-input border bg-bg-surface px-4 pb-1.5 pt-5 font-sans text-[15px] text-text-primary " +
            "placeholder-transparent transition-[border-color,box-shadow] duration-200 focus:outline-none " +
            (error
              ? "border-error focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1)] "
              : "border-[rgba(212,175,106,0.12)] focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(212,162,86,0.12)] ") +
            className
          }
          aria-invalid={!!error}
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-sans text-[15px] text-text-muted transition-all duration-200
            peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-gold-200
            peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium"
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1.5 font-sans text-[13px] text-error">{error}</p>}
    </div>
  );
});

export default Input;
