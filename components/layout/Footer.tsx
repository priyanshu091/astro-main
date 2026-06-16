import Logo from "@/components/shared/Logo";
import { IconInstagram, IconFacebook, IconLinkedin, IconThreads } from "@/components/ui/Icon";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Birth chart analysis", href: "/#services" },
      { label: "Marriage compatibility", href: "/#services" },
      { label: "Career & finance", href: "/#services" },
      { label: "Muhurta", href: "/#services" },
    ],
  },
  {
    title: "Practitioner",
    links: [
      { label: "About Soumitra", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "LinkedIn", href: "#", Icon: IconLinkedin },
  { label: "Threads", href: "#", Icon: IconThreads },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(184,146,40,0.08)] bg-bg-elevated">
      <div className="mx-auto max-w-content px-sp-5 py-sp-6 lg:py-sp-10">
        <div className="grid grid-cols-2 gap-sp-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-sp-3 max-w-[220px] font-sans text-sm leading-relaxed text-text-secondary">
              Private, certified Vedic astrology — clarity for life&rsquo;s biggest
              decisions.
            </p>

            {/* Contact Details */}
            <div className="mt-sp-4 space-y-sp-2 font-sans text-xs text-text-secondary">
              <div className="flex flex-col">
                <span className="font-bold text-text-muted text-[9px] uppercase tracking-wider mb-0.5">Call / WhatsApp</span>
                <div className="flex items-center gap-2">
                  <a href="https://wa.me/7800333373" target="_blank" rel="noopener noreferrer" className="hover:text-gold-200 transition-colors font-semibold flex items-center gap-0.5">
                    WhatsApp
                  </a>
                  <span className="text-gold-400/20">|</span>
                  <a href="tel:+917800333373" className="hover:text-gold-200 transition-colors font-medium">
                    +91 78003 33373
                  </a>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-muted text-[9px] uppercase tracking-wider mb-0.5">Email</span>
                <a href="mailto:soumitrarc101010@gmail.com" className="hover:text-gold-200 transition-colors font-medium">
                  soumitrarc101010@gmail.com
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-text-muted text-[9px] uppercase tracking-wider mb-0.5">Address</span>
                <a href="https://maps.app.goo.gl/AmrvJAkc9UEATBLi6" target="_blank" rel="noopener noreferrer" className="hover:text-gold-200 transition-colors font-medium leading-relaxed">
                  D-63, Jankipuram Gardens, Lucknow
                </a>
              </div>
            </div>

            <div className="mt-sp-4 flex gap-sp-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-text-muted transition-colors duration-200 hover:text-gold-400"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-text-muted">{col.title}</h3>
              <ul className="mt-sp-3 flex flex-col gap-sp-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-sm text-text-secondary transition-colors duration-200 hover:text-gold-200"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-sp-6 border-t border-[rgba(184,146,40,0.08)] pt-sp-4 text-center">
          <p className="font-sans text-xs text-text-muted">
            Copyright © {new Date().getFullYear()} Soumitra Roy Chowdhury | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
