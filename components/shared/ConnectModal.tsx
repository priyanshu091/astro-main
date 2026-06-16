"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function IconX({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ConnectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Show popup on every visit after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-connect-modal", handleOpen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-connect-modal", handleOpen);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "3bf10923-e0fb-45d8-9e24-ee3e8ec97194",
          name,
          contact,
          message: query,
          subject: `New Popup Contact from ${name} — Vedic Destiny`,
          from_name: "Vedic Destiny Website (Popup)",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-sp-5">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-[480px] bg-bg-cosmos border border-gold-400/20 rounded-card p-6 lg:p-8 shadow-2xl overflow-hidden z-10"
            style={{
              backgroundImage:
                "linear-gradient(165deg, rgba(184,146,40,0.05), rgba(255,255,255,0) 70%)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <IconX size={20} />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-sp-4">
                  <span className="eyebrow text-gold-500 block">Vedic Destiny</span>
                  <h2 className="font-display text-2xl font-bold text-text-primary mt-1">
                    Astrologer Acharya Soumitra Roy Chowdhury
                  </h2>
                  <p className="font-sans text-xs text-text-secondary mt-1 max-w-[320px] mx-auto leading-relaxed">
                    Leave your details below. Receive guidance and practical solutions directly from Lucknow's trusted Vedic expert.
                  </p>
                </div>

                <Input
                  id="modal-name"
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  id="modal-contact"
                  label="WhatsApp Number / Email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />

                <div className="w-full">
                  <div className="relative">
                    <textarea
                      id="modal-query"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Your Query (optional)"
                      rows={3}
                      className="peer w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 py-3 font-sans text-[15px] text-text-primary placeholder-text-muted focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none transition-[border-color,box-shadow] duration-200"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-center font-sans text-sm text-error font-medium">
                    {error}
                  </p>
                )}

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Submit Details"}
                  </Button>
                </div>

                <p className="text-center font-sans text-[11px] text-text-muted">
                  🔒 Your details are 100% secure and confidential.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-sp-4"
              >
                {/* Success Orb */}
                <div className="mx-auto w-16 h-16 rounded-full border border-gold-400/20 bg-bg-surface flex items-center justify-center text-gold-500 shadow-sm animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary">
                  Thank You, {name}!
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-[280px] mx-auto">
                  Your request has been received. Astrologer Acharya Soumitra Roy Chowdhury will get in touch with you shortly.
                </p>

                <div className="pt-4 max-w-[160px] mx-auto">
                  <Button type="button" variant="secondary" size="md" className="w-full" onClick={handleClose}>
                    Close Window
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
