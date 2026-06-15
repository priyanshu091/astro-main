import Logo from "@/components/shared/Logo";
import { IconInstagram, IconTwitter, IconYoutube } from "@/components/ui/Icon";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Birth chart analysis", href: "#services" },
      { label: "Marriage compatibility", href: "#services" },
      { label: "Career & finance", href: "#services" },
      { label: "Muhurta", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: IconInstagram },
  { label: "Twitter", href: "#", Icon: IconTwitter },
  { label: "YouTube", href: "#", Icon: IconYoutube },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(212,175,106,0.08)] bg-bg-elevated">
      <div className="mx-auto max-w-content px-sp-5 py-sp-10 lg:py-sp-16">
        <div className="grid grid-cols-2 gap-sp-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-sp-4 max-w-[220px] font-sans text-sm leading-relaxed text-text-secondary">
              Private, certified Vedic astrology — clarity for life&rsquo;s biggest
              decisions.
            </p>
            <div className="mt-sp-5 flex gap-sp-4">
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
              <ul className="mt-sp-4 flex flex-col gap-sp-3">
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

        <div className="mt-sp-10 border-t border-[rgba(212,175,106,0.08)] pt-sp-6 text-center">
          <p className="font-sans text-xs text-text-muted">
            © {new Date().getFullYear()} Drishti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
