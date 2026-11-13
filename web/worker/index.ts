// Cloudflare Worker: liefert die statische Seite aus `out/` aus und meldet fehlgeschlagene Builds per ntfy
// (build-notify.ts, sobald Queue und Secret NTFY_TOPIC eingerichtet sind).

import { buildNotification, NtfyError, sendToNtfy, type BuildEvent } from "./build-notify";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  NTFY_TOPIC?: string;
  NTFY_TOKEN?: string;
}

type QueueBatch = { messages: { body: unknown; ack(): void; retry(options?: { delaySeconds?: number }): void }[] };

// Adressen der alten Jimdo-Seite, die neu anders heissen (Links bei Google, Lesezeichen).
// Seiten mit gleicher Adresse (z. B. /galerie/) liefert Cloudflare direkt aus, ohne Umweg über den Worker.
const OLD_PAGES: Record<string, string> = {
  "/stephanie": "/ueber-mich",
  "/cookie-einstellungen": "/datenschutz",
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const target = OLD_PAGES[url.pathname.replace(/\/+$/, "")];
    if (target) return Response.redirect(new URL(target, url).toString(), 301);
    return env.ASSETS.fetch(request);
  },

  async queue(batch: QueueBatch, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const event = message.body as BuildEvent;
      const notification = buildNotification(event);
      console.log("Build-Ereignis:", event?.type, notification ? "→ ntfy" : "→ keine Nachricht", env.NTFY_TOPIC ? "" : "(NTFY_TOPIC fehlt)");
      if (!notification || !env.NTFY_TOPIC) {
        message.ack();
        continue;
      }
      try {
        await sendToNtfy(env.NTFY_TOPIC, notification, env.NTFY_TOKEN);
        message.ack();
        console.log("ntfy: gesendet");
      } catch (error) {
        console.error("ntfy fehlgeschlagen:", String(error));
        // Falsches Topic o. Ä. (4xx) wird nicht besser → aufgeben; Überlastung (429, 5xx, Netz) → in einer Minute nochmals
        const status = error instanceof NtfyError ? error.status : 0;
        if (status >= 400 && status < 500 && status !== 429) message.ack();
        else message.retry({ delaySeconds: 60 });
      }
    }
  },
};

export default worker;
