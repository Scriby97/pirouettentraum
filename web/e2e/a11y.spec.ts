import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mockServices } from "./helpers";

// Barrierefreiheit (WCAG 2.1 AA) aller Seiten
const pages = ["/", "/galerie", "/ueber-mich", "/kosten", "/kontakt", "/boerse-ec-thun", "/impressum", "/datenschutz"];

for (const path of pages) {
  test(`Barrierefreiheit ${path}`, async ({ page }) => {
    await mockServices(page);
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}
