import type { Metadata } from "next";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { getSettings } from "@/lib/sanity";

export const metadata: Metadata = { title: "Über mich" };

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 md:grid-cols-[3fr_2fr]">
      <div>
        <h1 className="mb-6 font-serif text-5xl">{settings.aboutTitle ?? "Das bin ich"}</h1>
        <RichText value={settings.aboutText} className="text-lg leading-relaxed text-muted" />
      </div>
      {settings.aboutImage?.asset && (
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand md:mt-16">
          <SanityImage image={settings.aboutImage} alt="Aus dem Atelier" sizes="(min-width: 768px) 440px, 100vw" />
        </div>
      )}
    </section>
  );
}
