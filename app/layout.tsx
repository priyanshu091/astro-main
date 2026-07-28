import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import ConnectModal from "@/components/shared/ConnectModal";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// NOTE: JetBrains Mono was removed as a webfont. It was used only for a handful
// of small 13px label/caption lines, which did not justify downloading an entire
// extra font family on every page load. `font-mono` now resolves to the system
// monospace stack (see tailwind.config.ts) — visually near-identical at these
// sizes, with zero network cost.

export const metadata: Metadata = {
  title: "Vedic Destiny — Expert Vedic Astrology by Acharya Soumitra Roy Chowdhury",
  description:
    "Personalized, logical Vedic astrology consultations and practical remedies for career, marriage, health, and Vastu by expert Acharya Soumitra Roy Chowdhury.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <ConnectModal />
      </body>
    </html>
  );
}
