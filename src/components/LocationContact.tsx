"use client";

import { useEffect, useState } from "react";

export type WeekdayHours = {
  day: string;
  weekday: number;
  open: string | null;
  close: string | null;
};

export type SocialLink = {
  label: string;
  href: string;
};

type LocationContactProps = {
  hours: WeekdayHours[];
  address: string;
  phone: string;
  mapSrc?: string;
  socials?: SocialLink[];
};

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function isOpenNow(hours: WeekdayHours[], now = new Date()) {
  const today = hours.find((entry) => entry.weekday === now.getDay());
  if (!today?.open || !today.close) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  return current >= toMinutes(today.open) && current < toMinutes(today.close);
}

function formatRange(entry: WeekdayHours) {
  if (!entry.open || !entry.close) return "Closed";
  return `${entry.open} – ${entry.close}`;
}

export default function LocationContact({
  hours,
  address,
  phone,
  mapSrc = "https://maps.google.com/maps?q=coffee+shop&output=embed",
  socials = [],
}: LocationContactProps) {
  const [open, setOpen] = useState<boolean | null>(null);
  const tel = phone.replace(/[^\d+]/g, "");

  useEffect(() => {
    setOpen(isOpenNow(hours));
  }, [hours]);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-stretch">
      <div className="min-h-[320px] overflow-hidden bg-stone-900 lg:min-h-[480px]">
        <iframe
          title="Shop location"
          src={mapSrc}
          className="h-full min-h-[320px] w-full border-0 lg:min-h-[480px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex flex-col justify-center text-left text-stone-200">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs tracking-[0.35em] uppercase text-amber-100/70">Visit</p>
          {open !== null && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide ${
                open ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-stone-400"
              }`}
            >
              {open ? "Open now" : "Closed"}
            </span>
          )}
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Come sit with the roast.
        </h2>

        <table className="mt-8 w-full text-sm">
          <tbody>
            {hours.map((entry) => (
              <tr key={entry.day} className="border-b border-white/10">
                <th className="py-2 pr-6 text-left font-medium text-white">{entry.day}</th>
                <td className="py-2 text-right text-stone-400">{formatRange(entry)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-stone-300">{address}</p>
        <a href={`tel:${tel}`} className="mt-2 text-sm text-white/80 hover:text-white">
          {phone}
        </a>

        <a
          href={`https://wa.me/${tel.replace(/^\+/, "")}`}
          className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full border px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          style={{ borderWidth: 1, borderColor: "var(--header-cta-border)" }}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>

        {socials.length > 0 && (
          <ul className="mt-6 flex gap-3">
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
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2m5.79 13.98c-.24.68-1.4 1.3-1.94 1.34-.5.04-1.12.06-1.81-.11-.42-.11-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.24-.27.64-.39 1.02-.39h.73c.23 0 .55-.09.86.66.33.79 1.11 2.72 1.21 2.92.1.2.16.43.03.7-.12.27-.19.43-.37.67-.18.23-.38.52-.54.7-.18.2-.36.41-.15.8.2.4.9 1.48 1.93 2.4 1.33 1.18 2.45 1.55 2.84 1.73.4.18.63.15.86-.09.23-.24.99-1.15 1.26-1.55.26-.4.53-.33.88-.2.36.13 2.26 1.07 2.65 1.26.39.2.65.3.74.46.1.16.1.94-.14 1.62" />
    </svg>
  );
}

export function SocialGlyph({ label }: { label: string }) {
  const className = "h-4 w-4 fill-current";
  if (label.toLowerCase() === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4m5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5M17.8 6.2a1.05 1.05 0 1 0 1.05 1.05 1.05 1.05 0 0 0-1.05-1.05M12 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1" />
    </svg>
  );
}
