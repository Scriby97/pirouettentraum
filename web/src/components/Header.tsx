import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

// Bleibt beim Scrollen oben stehen; der Stern aus dem Logo, rechts das Menü und der Knopf zur Anfrage
export function Header({ siteName, links }: { siteName: string; links: { href: string; label: string }[] }) {
  const menu = links.filter((l) => l.href !== "/kontakt");
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-8 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <Image src="/logo-stern.png" alt="" width={40} height={40} className="size-10" priority />
          <span className="truncate font-serif text-2xl">{siteName}</span>
        </Link>
        <nav aria-label="Hauptmenü" className="hidden items-center gap-x-7 text-sm lg:flex">
          {menu.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted transition hover:text-ink">
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt" className="rounded-full bg-night px-5 py-2 text-white transition hover:bg-accent">
            Anfrage
          </Link>
        </nav>
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
