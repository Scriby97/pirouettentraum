import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-20 bg-taupe-dark text-white print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-2xl">{settings.siteName ?? "Pirouettentraum"}</span>
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="hover:underline">
              {settings.email}
            </a>
          )}
          {settings.phone && (
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:underline">
              {settings.phone}
            </a>
          )}
        </div>
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-1">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
