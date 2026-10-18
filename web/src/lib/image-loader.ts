// Bilder kommen vom Sanity-CDN, das Grösse und Format selbst anpasst
export default function sanityImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Lokale Dateien (Logo-Stern, Vorschaubilder): unverändert, die Breite nur angehängt, damit Next zufrieden ist
  if (!src.startsWith("https://cdn.sanity.io/")) return `${src}?w=${width}`;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 80));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
