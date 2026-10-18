import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

// In der Kopfzeile nur der Stern aus dem Logo (das ganze Logo mit Schriftzug steht auf der Startseite)
export function Header({ siteName, links }: { siteName: string; links: { href: string; label: string }[] }) {
  return (
    <header className="relative border-b border-sand bg-white/60 print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-8 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/logo-stern.png" alt="" width={48} height={48} className="size-11" priority />
          <span className="truncate font-serif text-2xl sm:text-3xl">{siteName}</span>
        </Link>
        <nav aria-label="Hauptmenü" className="hidden items-center gap-x-6 text-sm lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
