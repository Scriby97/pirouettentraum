# Pirouettentraum

Website für Pirouettentraum (Stephanie Luginbühl, Kürkleider nach Mass) – Nachfolger der Jimdo-Seite.
Gleiche Infrastruktur wie evi’s universum: statisch gebaut mit Next.js, Inhalte in Sanity, Anfragen per Formular (Web3Forms),
gehostet als Cloudflare Worker.

- `web/` – die Website (Next.js, statischer Export nach `web/out`)
- `studio/` – Sanity Studio, in dem Stephanie Texte, Bilder und Preise pflegt
- `material/` – Originalbilder und Inhalte der alten Seite (nicht im Repo)

## Lokal starten

```bash
cd web && npm install && npm run dev      # http://localhost:3000
cd studio && npm install && npm run dev   # http://localhost:3333
```

Ohne `web/.env.local` zeigt die Website die Texte der alten Seite als Platzhalter (ohne Bilder).
`npm run preview:local` zeigt dieselben Texte mit den Originalbildern aus `material/` (vorher Bilder nach `web/public/preview` kopieren).
Nicht gleichzeitig `npm run build` oder die Tests laufen lassen – beide nutzen `.next`; sonst liefert die Vorschau 404 (dann `.next` löschen).

## Einrichtung (einmalig)

1. **Sanity-Projekt** anlegen (Konto der Inhaberin), Project ID in `studio/sanity.config.ts`, `studio/sanity.cli.ts`
   und `web/.env.local` eintragen. CORS-Origin `https://pirouettentraum.ch` erlauben.
2. **Startinhalt übertragen:** `cd studio && npx sanity exec scripts/seed.ts --with-user-token`
   (Texte und alle Bilder der alten Seite; Wartungsmodus an, Passwort «Pirouette»).
3. **Studio veröffentlichen:** `cd studio && npm run deploy` → https://pirouettentraum.sanity.studio
4. **Web3Forms:** Access Key → `NEXT_PUBLIC_WEB3FORMS_KEY` (Build-Variable in Cloudflare, lokal `web/.env.local`).
   Web3Forms nimmt Anfragen nur von der beim Formular hinterlegten Website an (im Moment die workers.dev-Adresse,
   lokal von `localhost` aus gesperrt). **Beim Domain-Umzug die Website-Adresse des Formulars auf `https://pirouettentraum.ch` ändern.**
   Empfänger später unter «Linked Emails» auf pirouettentraum@gmail.com umstellen.
5. **Cloudflare:** Worker aus dem GitHub-Repo bauen lassen (Root `web`, Build `npm run build`, Deploy `npx wrangler deploy`),
   Build-Variablen `NEXT_PUBLIC_*` setzen, Deploy-Hook als Sanity-Webhook eintragen.
6. **Domain** pirouettentraum.ch von Jimdo zu Cloudflare umziehen, dann Web Analytics, Search Console,
   Umleitung www → Hauptadresse.

## Neues Feld in Sanity

1. Feld im Schema ergänzen (`studio/schemaTypes/siteSettings.ts`)
2. `cd studio && npm run typegen` – schreibt `studio/schema.json` und `web/src/sanity.types.ts` neu
3. TypeScript zeigt, wo das Feld fehlt; danach Studio deployen

## Tests

```bash
cd web && npm run test:e2e
```

Playwright prüft Startseite, Galerie (inkl. Vollbild), Kosten, Anfrageformular und Barrierefreiheit (WCAG 2.1 AA),
in Desktop- und Handy-Ansicht, mit festen Testdaten (`web/src/lib/e2e-fixtures.ts`). Läuft auf GitHub bei jedem Push.
