"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Logo from "@/components/shared/Logo";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-[350ms] ease-out"
      style={{
        backgroundColor: scrolled ? "rgba(255, 253, 247, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(184,146,40, 0.1)" : "transparent"}`,
      }}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-sp-5 py-sp-4">
        {/* Logo */}
        <Logo />

        {/* Center links — desktop */}
        <ul className="hidden items-center gap-sp-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-sm font-medium text-text-primary opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <div className="hidden md:block">
          <Button as="a" href="/about" variant="primary" size="md">
            Connect
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-text-primary"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-6 bg-text-primary"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-6 bg-text-primary"
          />
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 flex h-full w-72 flex-col gap-sp-5 bg-bg-elevated px-sp-6 pt-[96px] md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-base font-medium text-text-primary opacity-80 transition-opacity hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
            <Button
              as="a"
              href="/about"
              variant="primary"
              size="lg"
              className="mt-sp-3 w-full"
              onClick={() => setOpen(false)}
            >
              Connect
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
