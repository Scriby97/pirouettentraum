import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { getSettings } from "@/lib/sanity";

export const metadata: Metadata = { title: "Börse EC Thun" };

export default async function BoersePage() {
  const settings = await getSettings();
  // Im Studio ausgeblendet → Seite gibt es nicht
  if (settings.boerseVisible === false) notFound();

  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pb-20 pt-14 md:grid-cols-2">
      <div>
        <PageTitle eyebrow="Secondhand & Club-Bekleidung" title={settings.boerseTitle ?? "Börse EC Thun"} />
        <RichText value={settings.boerseText} className="text-lg leading-relaxed text-muted" />
      </div>
      {settings.boerseImage?.asset && (
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-sand md:mt-16">
          <SanityImage image={settings.boerseImage} alt="Die Börse des EC Thun" sizes="(min-width: 768px) 560px, 100vw" />
        </div>
      )}
    </section>
  );
}
