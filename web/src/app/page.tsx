import Image from "next/image";
import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { galleryPhotos, getSettings, imageUrl, siteNameOf } from "@/lib/sanity";

export default async function HomePage() {
  const settings = await getSettings();
  const siteName = siteNameOf(settings);
  const logo = imageUrl(settings.logo);
  const preview = galleryPhotos(settings.gallery?.slice(0, 4), "Kürkleid");

  return (
    <>
      {/* Begrüssung: Logo links, Text auf Taupe rechts – wie auf der bisherigen Seite */}
      <section className="grid md:grid-cols-2">
        <div className="flex items-center justify-center bg-white px-8 py-12">
          {logo ? (
            <Image src={logo} alt={`Logo ${siteName}`} width={520} height={520} priority className="h-auto w-full max-w-sm" />
          ) : (
            <span className="font-serif text-5xl">{siteName}</span>
          )}
        </div>
        <div className="flex flex-col justify-center gap-4 bg-taupe-dark px-8 py-14 text-white sm:px-14">
          <h1 className="font-serif text-5xl leading-tight sm:text-6xl">{settings.heroTitle ?? "Herzlich Willkommen"}</h1>
          <p className="text-lg">bei {siteName}</p>
          {settings.heroSubtitle && <p className="max-w-md text-xl text-white/90">{settings.heroSubtitle}</p>}
          <Link
            href="/kontakt"
            className="mt-4 self-start rounded-full bg-white px-6 py-3 text-ink hover:bg-cream"
          >
            Anfrage stellen
          </Link>
        </div>
      </section>

      {/* Titelbild und Einleitung */}
      <section className="mx-auto mt-16 grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
          <SanityImage image={settings.heroImage} alt="Kürkleid aus dem Pirouettentraum-Atelier" sizes="(min-width: 768px) 560px, 100vw" />
        </div>
        <RichText value={settings.introText} className="text-lg leading-relaxed text-muted" />
      </section>

      {/* Ablauf */}
      {settings.steps && settings.steps.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4">
          <h2 className="mb-8 font-serif text-4xl">So entsteht Dein Kürkleid</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {settings.steps.map((step, i) => (
              <li key={step._key} className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-ice font-serif text-xl text-ink" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="font-serif text-2xl">{step.title}</h3>
                {step.text && <p className="text-sm leading-relaxed text-muted">{step.text}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Galerie-Vorschau */}
      {preview.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-serif text-4xl">Aus dem Atelier</h2>
            <Link href="/galerie" className="text-accent hover:text-accent-dark">
              Ganze Galerie ansehen →
            </Link>
          </div>
          <Gallery photos={preview} />
        </section>
      )}

      {/* Aufruf zur Anfrage */}
      <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
        <p className="font-serif text-3xl leading-snug sm:text-4xl">
          {settings.closingText ?? "Lass uns zusammen Deinen Pirouettentraum entwerfen – ich freue mich darauf!"}
        </p>
        <Link href="/kontakt" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark">
          Jetzt Anfrage stellen
        </Link>
      </section>
    </>
  );
}
