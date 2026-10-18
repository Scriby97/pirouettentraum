import type { Page } from "@playwright/test";

type Form = Record<string, string>;

// 1×1-PNG für Bilder vom (Fantasie-)Sanity-CDN der Testdaten
const pixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

/** Fängt alles ab, was die Seite nach aussen schickt (Formular, Bilder, Statistik); die Tests prüfen den Inhalt */
export async function mockServices(page: Page, { formsFail = false } = {}) {
  const forms: Form[] = [];
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
  await page.route("https://api.web3forms.com/**", async (route) => {
    forms.push(route.request().postDataJSON());
    await route.fulfill({ json: formsFail ? { success: false, message: "Testfehler" } : { success: true } });
  });
  await page.route("https://cdn.sanity.io/**", (route) => route.fulfill({ body: pixel, contentType: "image/png" }));
  return { forms };
}
