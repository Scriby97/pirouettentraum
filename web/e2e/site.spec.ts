import { expect, test } from "@playwright/test";
import { mockServices } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockServices(page);
});

test("Startseite: Begrüssung, Ablauf, Galerie-Vorschau, Anfrage-Knopf", async ({ page }) => {
  await page.goto("/");
  // Begrüssung als kleine Zeile, der Untertitel ist die grosse Überschrift
  await expect(page.getByText("Herzlich Willkommen bei Pirouettentraum")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Testdaten" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "So entsteht Dein Kürkleid" })).toBeVisible();
  await expect(page.locator("ol li")).toHaveCount(2);
  // Vorschau = die ersten vier Galeriebilder
  await expect(page.getByRole("button", { name: /gross anzeigen/ })).toHaveCount(4);
  await page.getByRole("link", { name: "Jetzt Anfrage stellen" }).click();
  await expect(page).toHaveURL(/\/kontakt/);
});

test("Galerie: alle Bilder, gross anzeigen und blättern", async ({ page }) => {
  await page.goto("/galerie");
  await expect(page.getByRole("button", { name: /gross anzeigen/ })).toHaveCount(5);
  await expect(page.getByText("Mit Pailletten")).toBeVisible();
  await page.getByRole("button", { name: "Blaues Kleid gross anzeigen" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("img", { name: "Blaues Kleid" })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("img", { name: "Rotes Kleid" })).toBeVisible();
  await dialog.getByRole("button", { name: "Vorheriges Bild" }).click();
  await expect(dialog.getByRole("img", { name: "Blaues Kleid" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("Kosten: Preise aus dem Studio", async ({ page }) => {
  await page.goto("/kosten");
  await expect(page.getByText("ab CHF 170.–")).toBeVisible();
  await expect(page.getByText("CHF 30.–", { exact: true })).toBeVisible();
  await expect(page.getByText("CHF 25.– / Std.")).toBeVisible();
});

test("Menü enthält alle Seiten, Börse-Seite erreichbar", async ({ page }) => {
  await page.goto("/boerse-ec-thun");
  await expect(page.getByRole("heading", { level: 1, name: "Börse Test" })).toBeVisible();
  for (const path of ["/ueber-mich", "/impressum", "/datenschutz"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await expect(page.getByText("Teststrasse 1")).toBeVisible(); // Verantwortlich in der Datenschutzerklärung
});
