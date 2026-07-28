import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background ramp
        "bg-void": "#FDFAF3",
        "bg-cosmos": "#FDFAF3",
        "bg-elevated": "#F4EAD0",
        "bg-surface": "#F4EAD0",
        "bg-surface-hover": "#EDE0C2",
        "bg-stats": "#F4EAD0",
        // Gold / sacred metal ramp
        gold: {
          50: "#FDFAF3",
          100: "#F4EAD0",
          200: "#E8D9B5",
          400: "#B89228",
          500: "#8A6B12",
          600: "#7A5E10",
          800: "#5C470C",
        },
        // Saffron / copper
        saffron: {
          400: "#B89228",
          500: "#8A6B12",
        },
        copper: {
          400: "#6B4020",
          600: "#7A0E20",
          800: "#5A0A18",
        },
        // Card
        card: "#FFFFFF",
        // Semantic
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        // Accent
        accent: "#7A0E20",
        // Text
        "text-primary": "#1A0900",
        "text-secondary": "#6B4020",
        "text-muted": "#6B4020",
        "text-on-gold": "#FDFAF3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // System monospace stack — no webfont download. Resolves to SF Mono on
        // macOS/iOS, Segoe UI Mono / Consolas on Windows, Liberation Mono on Linux.
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
        input: "8px",
      },
      spacing: {
        "sp-1": "4px",
        "sp-2": "8px",
        "sp-3": "12px",
        "sp-4": "16px",
        "sp-5": "24px",
        "sp-6": "32px",
        "sp-8": "48px",
        "sp-10": "64px",
        "sp-16": "128px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        "chart-float": "0 30px 80px -24px rgba(0,0,0,0.6)",
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
