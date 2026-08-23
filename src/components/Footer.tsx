import { SocialGlyph, type WeekdayHours } from "@/components/LocationContact";

type FooterProps = {
  hours: WeekdayHours[];
  socials?: { label: string; href: string }[];
};

const QUICK_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

function formatRange(entry: WeekdayHours) {
  if (!entry.open || !entry.close) return "Closed";
  return `${entry.open} – ${entry.close}`;
}

export default function Footer({ hours, socials = [] }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#120c08] text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="#hero" className="text-lg font-semibold tracking-[0.22em] uppercase text-white">
            Hearth
          </a>
          <p className="mt-3 max-w-xs text-sm text-stone-400">
            Slow-roasted in small batches since the first pour.
          </p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                    aria-label={social.label}
                  >
                    <SocialGlyph label={social.label} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase text-amber-100/70">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase text-amber-100/70">Hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {hours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span className="text-white">{entry.day}</span>
                <span className="text-stone-400">{formatRange(entry)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase text-amber-100/70">Newsletter</h3>
          <p className="mt-4 text-sm text-stone-400">New roasts and quiet hours, in your inbox.</p>
          <form className="mt-4 flex flex-col gap-2" action="#" method="post">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="h-11 border border-white/20 bg-transparent px-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-white/50"
            />
            <button
              type="submit"
              className="h-11 border text-sm font-medium text-white transition-colors hover:bg-white/10"
              style={{ borderWidth: 1, borderColor: "var(--header-cta-border)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-5 text-sm text-stone-500">
        © {year} Hearth. All rights reserved.
      </div>
    </footer>
  );
}
