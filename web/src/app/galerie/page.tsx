import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { galleryPhotos, getSettings } from "@/lib/sanity";

export const metadata: Metadata = { title: "Galerie", description: "Kürkleider aus dem Pirouettentraum-Atelier" };

export default async function GalleryPage() {
  const settings = await getSettings();
  const photos = galleryPhotos(settings.gallery, "Kürkleid");

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-4 font-serif text-5xl">Galerie</h1>
      {settings.galleryIntro && <p className="mb-10 max-w-2xl text-lg text-muted">{settings.galleryIntro}</p>}
      {photos.length ? <Gallery photos={photos} /> : <p className="text-muted">Bald gibt es hier Bilder zu sehen.</p>}
      <p className="mt-12 text-muted">
        Ein Kleid gefällt Dir oder inspiriert Dich?{" "}
        <Link href="/kontakt" className="text-accent underline hover:text-accent-dark">
          Schreib mir
        </Link>{" "}
        – gemeinsam entwerfen wir Dein eigenes.
      </p>
    </section>
  );
}
