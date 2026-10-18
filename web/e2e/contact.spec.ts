import { expect, test } from "@playwright/test";
import { mockServices } from "./helpers";

test("Anfrage: alles kommt in der Mail an", async ({ page }) => {
  const { forms } = await mockServices(page);
  await page.goto("/kontakt");
  await page.getByLabel("Name", { exact: true }).fill("Test Mami");
  await page.getByLabel("E-Mail").fill("mami@example.ch");
  await page.getByLabel(/Bis wann/).fill("Wettkampf im März");
  await page.getByLabel(/Kürmusik/).fill("Schwanensee");
  await page.getByLabel(/Deine Wünsche/).fill("Blau mit Glitzer, Grösse 140");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.getByRole("heading", { name: /Danke für Deine Nachricht/ })).toBeVisible();

  expect(forms).toHaveLength(1);
  const mail = forms[0];
  expect(mail.subject).toBe("Anfrage von Test Mami");
  expect(mail.email).toBe("mami@example.ch");
  expect(mail.from_name).toBe("Website Pirouettentraum");
  expect(mail.Telefon).toBe("–");
  expect(mail["Bis wann"]).toBe("Wettkampf im März");
  expect(mail["Kürmusik / Thema"]).toBe("Schwanensee");
  expect(mail.Nachricht).toBe("Blau mit Glitzer, Grösse 140");
});

test("Fehler beim Senden: Meldung, Eingaben bleiben", async ({ page }) => {
  await mockServices(page, { formsFail: true });
  await page.goto("/kontakt");
  await page.getByLabel("Name", { exact: true }).fill("Test");
  await page.getByLabel("E-Mail").fill("t@example.ch");
  await page.getByLabel(/Deine Wünsche/).fill("Hallo");
  await page.getByRole("button", { name: "Anfrage senden" }).click();
  await expect(page.getByText("Die Nachricht konnte nicht gesendet werden.", { exact: false })).toBeVisible();
  await expect(page.getByLabel(/Deine Wünsche/)).toHaveValue("Hallo");
});
