import { defineConfig, devices } from "@playwright/test";

// Automatische Tests: `npm run test:e2e`
// Baut die Seite mit den festen Testdaten aus src/lib/e2e-fixtures.ts (nicht mit den echten Inhalten aus Sanity)
// und klickt Startseite, Galerie und Anfrage durch. Web3Forms und alle externen Anfragen werden abgefangen.
const port = 4332;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  // Die langen Abläufe (Galerie, Formular) brauchen in der Handy-Ansicht etwas länger als die 30 s Standard
  timeout: 60_000,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      // Lokal das vorinstallierte Edge, in GitHub Actions das von Playwright installierte Chromium
      use: { ...devices["Desktop Chrome"], channel: process.env.CI ? undefined : "msedge" },
    },
    {
      name: "handy",
      use: { ...devices["Pixel 7"], channel: process.env.CI ? undefined : "msedge" },
    },
  ],
  webServer: {
    command: `npm run build && npx serve out -l ${port} --no-port-switching`,
    url: `http://localhost:${port}`,
    timeout: 240_000,
    reuseExistingServer: false,
    env: { E2E: "1", NEXT_PUBLIC_WEB3FORMS_KEY: "e2e-test-key" },
  },
});
