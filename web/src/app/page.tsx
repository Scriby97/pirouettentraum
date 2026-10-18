import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { galleryPhotos, getSettings, siteNameOf } from "@/lib/sanity";

export default async function HomePage() {
  const settings = await getSettings();
  const siteName = siteNameOf(settings);
  const preview = galleryPhotos(settings.gallery?.slice(0, 4), "Kürkleid");

  return (
    <>
      {/* Einstieg: dunkle Fläche, in die das Titelbild (Kleid vor Schwarz) übergeht, mit türkisem Schimmer */}
      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="pointer-events-none absolute -left-40 -top-40 size-[36rem] rounded-full bg-ice/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-14 md:grid-cols-[1.1fr_1fr] md:pt-0">
          <div className="flex flex-col gap-6 md:py-24">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-ice">
              {settings.heroTitle ?? "Herzlich Willkommen"} bei {siteName}
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
              {settings.heroSubtitle ?? "Kürkleiddesign für den glänzenden Auftritt auf dem Eis"}
            </h1>
            <p className="max-w-md text-lg text-white/75">
              Kürkleider nach Deinen Wünschen, genäht in meinem kleinen Atelier bei Thun. Jedes Kleid ein Unikat.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt" className="rounded-full bg-ice px-6 py-3 font-medium text-night transition hover:bg-white">
                Anfrage stellen
              </Link>
              <Link
                href="/galerie"
                className="rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white"
              >
                Galerie ansehen
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[38rem]">
            <SanityImage
              image={settings.heroImage}
              alt="Kürkleid aus dem Pirouettentraum-Atelier"
              sizes="(min-width: 768px) 560px, 100vw"
              priority
            />
            {/* weicher Übergang ins Dunkle */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" aria-hidden />
          </div>
        </div>
      </section>

      {/* Einleitung */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">Willkommen im Atelier</p>
        <RichText value={settings.introText} className="text-xl leading-relaxed text-muted sm:text-2xl sm:leading-relaxed" />
      </section>

      {/* Ablauf */}
      {settings.steps && settings.steps.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">So entsteht Dein Kürkleid</h2>
            <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {settings.steps.map((step, i) => (
                <li key={step._key} className="flex flex-col gap-3 border-t-2 border-ice pt-5">
                  <span className="font-serif text-4xl text-accent" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  {step.text && <p className="leading-relaxed text-muted">{step.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Galerie-Vorschau */}
      {preview.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">Galerie</p>
              <h2 className="font-serif text-4xl sm:text-5xl">Aus dem Atelier</h2>
            </div>
            <Link href="/galerie" className="rounded-full border border-ink/20 px-5 py-2.5 transition hover:border-ink">
              Alle Kleider ansehen →
            </Link>
          </div>
          <Gallery photos={preview} />
        </section>
      )}

      {/* Aufruf zur Anfrage */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-white sm:px-16">
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-ice/25 blur-3xl"
            aria-hidden
          />
          <p className="relative mx-auto max-w-2xl font-serif text-3xl leading-snug sm:text-4xl">
            {settings.closingText ?? "Lass uns zusammen Deinen Pirouettentraum entwerfen – ich freue mich darauf!"}
          </p>
          <Link
            href="/kontakt"
            className="relative mt-8 inline-block rounded-full bg-ice px-7 py-3 font-medium text-night transition hover:bg-white"
          >
            Jetzt Anfrage stellen
          </Link>
        </div>
      </section>
    </>
  );
}
