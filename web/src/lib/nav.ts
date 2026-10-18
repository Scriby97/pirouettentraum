import type { SiteSettings } from "./sanity";

// Hauptmenü; die Börse-Seite lässt sich im Studio ausblenden
export function navLinks(settings: SiteSettings) {
  return [
    { href: "/", label: "Startseite" },
    { href: "/galerie", label: "Galerie" },
    { href: "/ueber-mich", label: "Über mich" },
    { href: "/kosten", label: "Kosten" },
    { href: "/kontakt", label: "Kontakt" },
    ...(settings.boerseVisible !== false ? [{ href: "/boerse-ec-thun", label: "Börse EC Thun" }] : []),
  ];
}
