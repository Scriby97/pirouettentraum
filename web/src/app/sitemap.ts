import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/sanity";

// Statischer Export: wird beim Build als out/sitemap.xml erzeugt
export const dynamic = "force-static";

const base = "https://pirouettentraum.ch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const pages = ["", "/galerie", "/ueber-mich", "/kosten", "/kontakt", "/impressum", "/datenschutz"];
  if (settings.boerseVisible !== false) pages.push("/boerse-ec-thun");
  return pages.map((path) => ({ url: `${base}${path}` }));
}
