import type { Metadata } from "next";
import Link from "next/link";
import { RichText } from "@/components/RichText";
import { SanityImage } from "@/components/SanityImage";
import { getSettings } from "@/lib/sanity";

export const metadata: Metadata = { title: "Kosten" };

// Ganze Franken ohne Rappen, z. B. «CHF 170.–»
const chf = (n: number) => `CHF ${Number.isInteger(n) ? `${n}.–` : n.toFixed(2)}`;

export default async function CostsPage() {
  const settings = await getSettings();
  const prices = [
    settings.priceFrom != null && { label: "Kürkleid", value: `ab ${chf(settings.priceFrom)}`, note: "je nach Aufwand und Material" },
    settings.setupFee != null && {
      label: "Auftragspauschale",
      value: chf(settings.setupFee),
      note: "erste Absprachen, Zeichnung, Stoff- und Materialsuche",
    },
    settings.hourlyRate != null && { label: "Stundenansatz", value: `${chf(settings.hourlyRate)} / Std.`, note: "für alles Weitere" },
  ].filter((p) => p !== false);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-6 font-serif text-5xl">Kosten</h1>
      <div className="grid items-start gap-10 md:grid-cols-[3fr_2fr]">
        <RichText value={settings.costsText} className="text-lg leading-relaxed text-muted" />
        {prices.length > 0 && (
          <dl className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
            {prices.map((p) => (
              <div key={p.label} className="flex flex-col border-b border-sand pb-4 last:border-0 last:pb-0">
                <dt className="text-sm uppercase tracking-wide text-accent">{p.label}</dt>
                <dd className="font-serif text-3xl">{p.value}</dd>
                <dd className="text-sm text-muted">{p.note}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <Link href="/kontakt" className="mt-10 inline-block rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-dark">
        Unverbindlichen Kostenvoranschlag anfragen
      </Link>
      {settings.costsImages && settings.costsImages.length > 0 && (
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {settings.costsImages.map((image) => (
            <li key={image._key} className="relative aspect-square overflow-hidden rounded-xl bg-sand">
              <SanityImage image={image} alt="Detail eines Kürkleids" crop={{ width: 800, height: 800 }} sizes="(min-width: 640px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
