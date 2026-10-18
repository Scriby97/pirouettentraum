import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { getSettings, siteNameOf } from "@/lib/sanity";

export const metadata: Metadata = { title: "Kontakt" };

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[3fr_2fr]">
      <div>
        <h1 className="mb-4 font-serif text-5xl">Kontakt</h1>
        <RichText value={settings.contactText} className="mb-8 text-lg text-muted" />
        <ContactForm />
      </div>
      <aside className="flex flex-col gap-6 self-start md:mt-24">
        <div className="flex flex-col gap-2 rounded-2xl bg-sand p-6 text-sm text-muted">
          <p className="font-serif text-2xl text-ink">{siteNameOf(settings)}</p>
          {settings.ownerName && <p>{settings.ownerName}</p>}
          {settings.email && (
            <a href={`mailto:${settings.email}`} className="text-accent hover:text-accent-dark">
              {settings.email}
            </a>
          )}
          {settings.phone && (
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-accent hover:text-accent-dark">
              {settings.phone}
            </a>
          )}
        </div>
        {settings.contactImage?.asset && (
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand">
            <SanityImage image={settings.contactImage} alt="Kürkleid" decorative sizes="(min-width: 768px) 440px, 100vw" />
          </div>
        )}
      </aside>
    </section>
  );
}
