"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconMapPin, IconClock, IconStarFilled } from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function FinalCTA() {
  const reduced = useReducedMotion() ?? false;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          subject: `New Contact from ${name} — Vedic Destiny`,
          from_name: "Vedic Destiny Website",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-bg-void border-t border-[rgba(184,146,40,0.08)]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(212, 168, 83, 0.05) 0%, transparent 70%)",
      }}
    >
      <motion.div
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, ease: EASE }}
        className="mx-auto max-w-content px-sp-5 py-sp-16 lg:py-24"
      >
        <div className="text-center mb-sp-8">
          <span className="eyebrow text-gold-500 tracking-[0.2em] mb-3">Get in Touch</span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.01em] text-text-primary">
            Contact Us
          </h2>
          <p className="mt-sp-3 max-w-[600px] mx-auto font-sans text-base text-text-secondary leading-relaxed">
            Connect directly with Astrologer Acharya Soumitra Roy Chowdhury for career, marriage, health, and Vastu consultations.
          </p>
        </div>

        {/* Split Grid: Left = Info, Right = Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-sp-8 items-start mt-sp-8">
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">
              Consultation Details
            </h3>

            {/* Email Card */}
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm flex flex-col justify-between">
              <div>
                <span className="block font-sans text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:soumitrarc101010@gmail.com" className="font-display font-semibold text-text-primary text-base hover:text-gold-600 transition-colors break-words">
                  soumitrarc101010@gmail.com
                </a>
              </div>
              <p className="font-sans text-xs text-text-secondary mt-3">Replies within 24 hours</p>
            </div>

            {/* WhatsApp & Phone Card */}
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm flex flex-col justify-between">
              <div>
                <span className="block font-sans text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Call / WhatsApp</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 font-display font-semibold text-text-primary text-base">
                  <a href="https://wa.me/7800333373" target="_blank" rel="noopener noreferrer" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                    {/* WhatsApp Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success shrink-0">
                      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                    </svg>
                    WhatsApp
                  </a>
                  <span className="hidden sm:inline text-gold-400/30">|</span>
                  <a href="tel:+917800333373" className="hover:text-gold-600 transition-colors flex items-center gap-1">
                    {/* Phone Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-500 shrink-0">
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2A16 16 0 0 1 3 6a2 2 0 0 1 2 -2" />
                    </svg>
                    +91 78003 33373
                  </a>
                </div>
              </div>
              <p className="font-sans text-xs text-text-secondary mt-3">Direct Astrologer Connection</p>
            </div>

            {/* Location Card */}
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm flex flex-col justify-between">
              <div>
                <span className="block font-sans text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Office Address</span>
                <a 
                  href="https://maps.app.goo.gl/AmrvJAkc9UEATBLi6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-display font-semibold text-text-primary text-base hover:text-gold-600 transition-colors flex items-start gap-1"
                >
                  <IconMapPin size={18} className="text-gold-500 shrink-0 mt-0.5" />
                  <span>D-63, Jankipuram Gardens, Lucknow</span>
                </a>
              </div>
              <p className="font-sans text-xs text-text-secondary mt-3 hover:text-gold-600 transition-colors">
                <a href="https://maps.app.goo.gl/AmrvJAkc9UEATBLi6" target="_blank" rel="noopener noreferrer">
                  📍 Click to view on Google Maps
                </a>
              </p>
            </div>

            {/* Consultation Hours */}
            <div className="bg-bg-cosmos border border-gold-400/10 p-5 rounded-card shadow-sm flex flex-col justify-between">
              <div>
                <span className="block font-sans text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Consultation Hours</span>
                <span className="font-display font-semibold text-text-primary text-base flex items-center gap-1">
                  <IconClock size={16} className="text-gold-500 shrink-0" />
                  By Appointment Only
                </span>
              </div>
              <p className="font-sans text-xs text-text-secondary mt-3">Flexible online & in-person sessions</p>
            </div>

            {/* Social Presence Links */}
            <div className="pt-4 border-t border-gold-400/10">
              <h4 className="font-sans text-[11px] text-text-muted font-bold uppercase tracking-wider mb-3">Direct Message Handles</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gold-600 uppercase font-sans">
                <a href="https://www.quora.com/profile/Soumitra-Roy-Chowdhury-1" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">Quora</a>
                <span className="text-gold-400/30">&bull;</span>
                <a href="https://medium.com/@soumitrarc101010" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">Medium</a>
                <span className="text-gold-400/30">&bull;</span>
                <a href="https://www.reddit.com/user/According-Vast1873" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">Reddit</a>
                <span className="text-gold-400/30">&bull;</span>
                <a href="https://in.pinterest.com/soumitrarc101010/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-800 transition-colors">Pinterest</a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-bg-cosmos border border-gold-400/15 rounded-card p-6 lg:p-8 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    Send a Message
                  </h3>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    Fill in your details below to request a callback or ask a question.
                  </p>
                </div>

                <Input
                  id="contact-name"
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  id="contact-details"
                  label="WhatsApp Number / Email Address"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />

                <div className="w-full">
                  <textarea
                    id="contact-query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Your Query or Message (optional)"
                    rows={4}
                    className="peer w-full rounded-input border border-[rgba(184,146,40,0.12)] bg-bg-surface px-4 py-3 font-sans text-[15px] text-text-primary placeholder-text-muted focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(138,107,18,0.12)] focus:outline-none transition-[border-color,box-shadow] duration-200"
                  />
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
                className="text-center py-10 space-y-sp-4"
              >
                {/* Success Checkmark */}
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

                <h3 className="font-display text-2xl font-bold text-text-primary">
                  Thank You, {name}!
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-[320px] mx-auto">
                  Your message has been sent successfully. Astrologer Acharya Soumitra Roy Chowdhury will get in touch with you shortly.
                </p>

                <div className="pt-4 max-w-[160px] mx-auto">
                  <Button type="button" variant="secondary" size="md" className="w-full" onClick={() => { setSubmitted(false); setName(""); setContact(""); setQuery(""); setError(""); }}>
                    Send Another Message
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gold-400/10 pt-6">
          <p className="font-mono text-[13px] text-text-muted flex items-center justify-center gap-1">
            <IconStarFilled size={14} className="text-gold-400" />
            10,000+ consultations completed &middot; 4.9 rating
          </p>
        </div>
      </motion.div>
    </section>
  );
}
