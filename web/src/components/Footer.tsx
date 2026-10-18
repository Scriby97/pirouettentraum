import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/sanity";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-night text-white/80 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2.5 font-serif text-2xl text-white">
            <Image src="/logo-stern.png" alt="" width={36} height={36} className="size-9" />
            {settings.siteName ?? "Pirouettentraum"}
          </span>
          <span>Kürkleider nach Mass – jedes Kleid ein Unikat.</span>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-1">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
