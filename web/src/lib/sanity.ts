import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { defineQuery } from "groq";
import type { RichText, SETTINGS_QUERY_RESULT } from "../sanity.types";
import { e2eSettings } from "./e2e-fixtures";
import { placeholderSettings } from "./placeholder";

// E2E=1: feste Testdaten für die automatischen Tests (npm run test:e2e), unabhängig von den echten Inhalten
const e2e = process.env.E2E === "1";
const projectId = e2e ? undefined : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Ohne Project-ID (lokal, bevor Sanity eingerichtet ist) werden Platzhalter angezeigt
const client = projectId
  ? createClient({ projectId, dataset, apiVersion: "2026-09-01", useCdn: false })
  : null;

// In den Tests zeigen Bild-URLs auf ein Fantasie-Projekt; die Tests beantworten diese Anfragen selbst
const builder = projectId || e2e ? createImageUrlBuilder({ projectId: projectId ?? "e2etest", dataset }) : null;

export type SanityImage = SanityImageSource & { alt?: string | null };

/** Text aus dem Studio-Editor (Blöcke) – oder reiner Text (Platzhalter, Standard-Datenschutztext) */
export type RichTextValue = string | RichText;

// Die Abfrage ist mit defineQuery markiert: `npm run typegen` im Ordner studio/ erzeugt daraus
// src/sanity.types.ts – der Typ unten passt dadurch immer zu Schema und Abfrage.
const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  ...,
  // Leere Bildplätze (Bild hinzugefügt, aber keine Datei gewählt) weglassen
  "gallery": gallery[defined(asset)],
  "costsImages": costsImages[defined(asset)]
}`);

type SettingsDocument = Omit<NonNullable<SETTINGS_QUERY_RESULT>, "_id" | "_type" | "_createdAt" | "_updatedAt" | "_rev">;
type RichTextKeys = { [K in keyof SettingsDocument]-?: NonNullable<SettingsDocument[K]> extends RichText ? K : never }[keyof SettingsDocument];

/**
 * Inhalte der Website ohne die Systemfelder des Dokuments. Lange Texte dürfen zusätzlich reiner Text sein,
 * damit Platzhalter und Testdaten sie ohne Editor-Blöcke liefern können.
 */
export type SiteSettings = Partial<Omit<SettingsDocument, RichTextKeys>> & { [K in RichTextKeys]?: RichTextValue };
export type GalleryItem = NonNullable<SiteSettings["gallery"]>[number];

export async function getSettings(): Promise<SiteSettings> {
  if (e2e) return e2eSettings;
  if (!client) return placeholderSettings;
  return (await client.fetch(SETTINGS_QUERY)) ?? {};
}

/** Bild-URL; mit `crop` schneidet Sanity auf dieses Seitenverhältnis zu – nach dem Bildausschnitt (Hotspot) im Studio */
export function imageUrl(image?: SanityImage | null, crop?: { width: number; height: number }): string | null {
  // Bildplatz ohne Datei (im Studio hinzugefügt, aber leer gelassen): kein Bild statt Build-Abbruch
  if (!builder || !image || (typeof image === "object" && "_type" in image && !("asset" in image && image.asset))) {
    return null;
  }
  const img = builder.image(image);
  return (crop ? img.width(crop.width).height(crop.height).fit("crop") : img).url();
}

/** Ganzer Seitenname, z. B. «Pirouettentraum» */
export function siteNameOf(settings: SiteSettings) {
  return settings.siteName || "Pirouettentraum";
}

/** Galeriebilder für <Gallery>: Vorschau im Hochformat (nach Bildausschnitt), gross das ganze Bild */
export function galleryPhotos(items: GalleryItem[] | null | undefined, fallbackAlt: string) {
  return (items ?? []).flatMap((item, i) => {
    const thumb = imageUrl(item, { width: 900, height: 1200 });
    const full = imageUrl(item);
    return thumb && full ? [{ thumb, full, alt: item.alt || `${fallbackAlt} ${i + 1}`, caption: item.caption }] : [];
  });
}
