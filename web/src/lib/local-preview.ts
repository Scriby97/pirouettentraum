import type { SiteSettings } from "./sanity";
import { placeholderSettings } from "./placeholder";

// Lokale Vorschau ohne Sanity (npm run preview:local): Texte der alten Seite plus die Originalbilder
// aus public/preview (nicht im Repo, wird aus material/bilder erzeugt). Bild-Referenzen «image-local-…»
// löst imageUrl() in sanity.ts zu /preview/… auf.
const img = (file: string, alt?: string, key = file) => ({
  _type: "image" as const,
  _key: key,
  asset: { _type: "reference" as const, _ref: `image-local-${file}` },
  alt,
});

const galleryAlts = [
  "Bordeauxrotes Spitzen-Kürkleid mit goldener Korsage",
  "Eiskunstläuferin im bordeauxroten Kleid",
  "Petrolfarbenes Kürkleid mit gestickter Pfauenfeder",
  "Türkises Paillettenkleid mit schwarzer Schnürkorsage",
  "Schwarzes Kürkleid mit Mesh und goldenen Blättern",
  "Schwarzes Kürkleid mit pinkem Einsatz",
  "Eiskunstläufer im schwarz-roten Kürkostüm",
  "Eiskunstläuferin im schwarz-roten Kleid",
  "Eiskunstläuferin im gelb-schwarzen Sonnenkleid",
  "Gelb-schwarzes Kürkleid mit Spitze",
  "Zwei rot-schwarz-weisse Kürkleider",
  "Türkis-goldenes Kürkleid mit Spitzenrock",
  "Türkis-goldenes Kürkleid, zweite Ansicht",
  "Schwarzes Kürkleid mit türkis-goldener Stickerei",
  "Detail einer Blütenstickerei",
  "Hellblaues Kürkleid mit Tüllrock",
  "Hellblaues Kürkleid von hinten",
  "Schwarzes Kürkleid mit violetter Spitze",
  "Rosa Kürkleid mit Blumenstickerei",
  "Dunkelblaues Kürkleid mit hellblauen Volantärmeln",
  "Dunkelblaues Spitzenkleid mit türkisem Rock",
];

export const localPreviewSettings: SiteSettings = {
  ...placeholderSettings,
  logo: img("logo.png"),
  heroImage: img("home-01.jpg", "Schwarz-rotes Kürkleid im Lederjacken-Look"),
  gallery: galleryAlts.map((alt, i) => img(`galerie-${String(i).padStart(2, "0")}.jpg`, alt)),
  aboutImage: img("stephanie-00.jpg", "Kürkleid in Arbeit"),
  costsImages: ["kosten-00.jpg", "kosten-01.jpg", "kosten-02.jpg", "kosten-03.jpg"].map((f) => img(f, "Detail eines Kürkleids")),
  contactImage: img("kontakt-00.jpg", "Rosa Kürkleid"),
  boerseImage: img("boerse-ec-thun-00.jpg", "Die Börse des EC Thun"),
};
