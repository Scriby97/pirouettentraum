// Cloudflare Worker: liefert die statische Seite aus `out/` aus und meldet fehlgeschlagene Builds per ntfy
// (build-notify.ts, sobald Queue und Secret NTFY_TOPIC eingerichtet sind).

import { buildNotification, sendToNtfy, type BuildEvent } from "./build-notify";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  NTFY_TOPIC?: string;
}

type QueueBatch = { messages: { body: unknown; ack(): void; retry(): void }[] };

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
      const notification = buildNotification(message.body as BuildEvent);
      if (!notification || !env.NTFY_TOPIC) {
        message.ack();
        continue;
      }
      try {
        await sendToNtfy(env.NTFY_TOPIC, notification);
        message.ack();
      } catch {
        message.retry();
      }
    }
  },
};

export default worker;
