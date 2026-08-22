"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
] as const;

export default function FloatingHeader() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      // Solid fill after the first viewport so copy stays readable
      // once the sticky coffee frames are no longer behind the bar.
      setIsSolid(window.scrollY >= window.innerHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 w-full"
      style={{
        height: "var(--header-height)",
        zIndex: "var(--header-z)",
        color: "var(--header-fg)",
      }}
    >
      {/* Scrim: never a solid slab over the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, var(--header-scrim-start), var(--header-scrim-end))`,
          opacity: isSolid ? 0 : 1,
          transition: `opacity var(--header-transition) ease`,
        }}
      />
      {/* Brand fill after the hero viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: "var(--color-brand)",
          opacity: isSolid ? 1 : 0,
          transition: `opacity var(--header-transition) ease`,
        }}
      />

      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#hero"
          className="shrink-0 text-lg font-semibold tracking-[0.22em] uppercase"
        >
          Hearth
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#menu"
            className="hidden h-10 items-center rounded-full border bg-transparent px-5 text-sm font-medium transition-colors hover:bg-white/10 md:inline-flex"
            style={{ borderWidth: 1, borderColor: "var(--header-cta-border)" }}
          >
            Order now
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            style={{ borderWidth: 1, borderColor: "var(--header-cta-border)" }}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3.5 w-4" aria-hidden>
              <span
                className="absolute left-0 block h-px w-4 bg-white transition-transform duration-300"
                style={{
                  top: isMenuOpen ? "50%" : 0,
                  transform: isMenuOpen ? "translateY(-50%) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute top-1/2 left-0 block h-px w-4 -translate-y-1/2 bg-white transition-opacity duration-300"
                style={{ opacity: isMenuOpen ? 0 : 1 }}
              />
              <span
                className="absolute left-0 block h-px w-4 bg-white transition-transform duration-300"
                style={{
                  bottom: isMenuOpen ? "50%" : 0,
                  transform: isMenuOpen ? "translateY(50%) rotate(-45deg)" : "none",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className="absolute inset-x-0 top-full origin-top md:hidden"
        hidden={!isMenuOpen}
        style={{
          backgroundColor: "var(--color-brand)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-3 text-base text-white/90 hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#menu"
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full border bg-transparent text-sm font-medium"
            style={{ borderWidth: 1, borderColor: "var(--header-cta-border)" }}
            onClick={() => setIsMenuOpen(false)}
          >
            Order now
          </a>
        </nav>
      </div>
    </header>
  );
}
