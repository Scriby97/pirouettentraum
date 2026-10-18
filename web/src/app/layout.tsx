import type { Metadata } from "next";
import { Abel, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MaintenanceGate } from "@/components/MaintenanceGate";
import { navLinks } from "@/lib/nav";
import { getSettings, imageUrl, siteNameOf, type SiteSettings } from "@/lib/sanity";
import "./globals.css";

// Token aus Cloudflare → Web Analytics (öffentlich, steht ohnehin im HTML). Leer = keine Statistik.
// TODO: nach dem Einrichten in Cloudflare eintragen. In den Tests (E2E=1) immer aus.
const analyticsToken = process.env.E2E === "1" ? "" : "";

// Abel wie auf der bisherigen Seite (schmale, elegante Überschriften), Inter für den Fliesstext
const heading = Abel({ variable: "--font-heading", subsets: ["latin"], weight: "400" });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = siteNameOf(settings);
  // Vorschaubild beim Teilen des Links (WhatsApp, Facebook, …): das Titelbild, ganz, auf Creme
  const og = settings.heroImage
    ? imageUrl(settings.heroImage, { width: 1200, height: 630 })
    : null;
  return {
    title: { default: `${siteName} – Kürkleider nach Mass`, template: `%s | ${siteName}` },
    description: settings.heroSubtitle ?? undefined,
    metadataBase: new URL("https://pirouettentraum.ch"),
    openGraph: { images: og ? [{ url: og, width: 1200, height: 630 }] : undefined, locale: "de_CH", siteName },
  };
}

// Wartungsmodus aus dem Studio. Google wird bewusst nicht ausgesperrt: die Inhalte stehen weiter im HTML,
// und ein «noindex» würde die Seite bei längerer Wartung aus den Suchergebnissen werfen.
function isMaintenance(settings: SiteSettings) {
  return settings.comingSoon === true;
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const siteName = siteNameOf(settings);
  const page = (
    <>
      <Header siteName={siteName} logo={settings.logo} links={navLinks(settings)} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
  return (
    <html lang="de-CH" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {isMaintenance(settings) ? (
          <MaintenanceGate
            siteName={siteName}
            text={settings.comingSoonText || "Ich nehme gerade ein paar Änderungen vor – schau bald wieder vorbei!"}
            password={settings.previewPassword ?? undefined}
          >
            {page}
          </MaintenanceGate>
        ) : (
          page
        )}
        {analyticsToken && (
          // Cloudflare Web Analytics: ohne Cookies, zählt Seitenaufrufe (auch beim Wechsel zwischen Seiten)
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
