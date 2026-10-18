import Image from "next/image";
import Link from "next/link";
import { imageUrl, type SanityImage } from "@/lib/sanity";
import { MobileMenu } from "./MobileMenu";

export function Header({
  siteName,
  logo,
  links,
}: {
  siteName: string;
  logo?: SanityImage | null;
  links: { href: string; label: string }[];
}) {
  const logoSrc = imageUrl(logo);
  return (
    <header className="relative border-b border-sand bg-white/60 print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-x-8 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          {logoSrc && <Image src={logoSrc} alt="" width={120} height={120} className="h-12 w-auto" priority />}
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
