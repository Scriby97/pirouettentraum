import type { SiteSettings } from "./sanity";

// Feste Testdaten für die automatischen Tests (E2E=1, siehe e2e/). Nicht für die echte Website.
const img = (ref: string, alt?: string) => ({
  _type: "image" as const,
  _key: ref,
  asset: { _type: "reference" as const, _ref: `image-${ref}-900x1200-jpg` },
  alt,
});

export const e2eSettings: SiteSettings = {
  siteName: "Pirouettentraum",
  logo: { _type: "image", asset: { _type: "reference", _ref: "image-logo-500x500-png" } },
  heroTitle: "Herzlich Willkommen",
  heroSubtitle: "Testdaten",
  heroImage: img("hero", "Testkleid"),
  introText: "Einleitung im Test.",
  steps: [
    { _key: "a", title: "Wünsche", text: "Erster Schritt" },
    { _key: "b", title: "Nähen", text: "Zweiter Schritt" },
  ],
  closingText: "Schlusssatz im Test",
  galleryIntro: "Galerie im Test",
  gallery: [img("g1", "Blaues Kleid"), img("g2", "Rotes Kleid"), { ...img("g3", "Goldenes Kleid"), caption: "Mit Pailletten" }, img("g4"), img("g5", "Fünftes Kleid")],
  aboutTitle: "Das bin ich",
  aboutText: "Über mich im Test.",
  costsText: "Kosten im Test.",
  priceFrom: 170,
  setupFee: 30,
  hourlyRate: 25,
  contactText: "Kontakt im Test.",
  email: "test@example.ch",
  phone: "079 000 00 00",
  boerseVisible: true,
  boerseTitle: "Börse Test",
  boerseText: "Börse im Test.",
  ownerName: "Test Inhaberin",
  address: "Teststrasse 1\n3600 Thun",
};
