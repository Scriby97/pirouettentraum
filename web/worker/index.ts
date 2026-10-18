// Cloudflare Worker: liefert die statische Seite aus `out/` aus und meldet fehlgeschlagene Builds per ntfy
// (build-notify.ts, sobald Queue und Secret NTFY_TOPIC eingerichtet sind).

import { buildNotification, sendToNtfy, type BuildEvent } from "./build-notify";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  NTFY_TOPIC?: string;
}

type QueueBatch = { messages: { body: unknown; ack(): void; retry(): void }[] };

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
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
