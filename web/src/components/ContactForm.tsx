"use client";

import { useState, type FormEvent } from "react";
import { inputClass, sendForm, web3formsKey } from "@/lib/web3forms";

type Status = "idle" | "sending" | "success" | "error";

// Anfrage für ein Kürkleid – geht per Web3Forms als E-Mail an Stephanie
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const optional = (name: string) => String(form.get(name) ?? "").trim() || "–";
    try {
      await sendForm({
        subject: `Anfrage von ${form.get("name")}`,
        botcheck: form.get("botcheck"),
        Name: form.get("name"),
        email: form.get("email"),
        Telefon: optional("phone"),
        "Bis wann": optional("deadline"),
        "Kürmusik / Thema": optional("music"),
        Nachricht: form.get("message"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 font-serif text-3xl">Danke für Deine Nachricht!</h2>
        <p className="text-muted">Ich melde mich so bald wie möglich bei Dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {!web3formsKey && (
        <p className="rounded-lg bg-yellow-100 p-3 text-sm text-yellow-900">
          NEXT_PUBLIC_WEB3FORMS_KEY fehlt – das Formular kann noch nicht versendet werden.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Name
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          E-Mail
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Telefon (optional)
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Bis wann brauchst Du das Kleid? (optional)
          <input name="deadline" className={inputClass} placeholder="z. B. Wettkampf im März" />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Kürmusik oder Thema (optional)
        <input name="music" className={inputClass} placeholder="z. B. «Schwanensee» oder Tango" />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Deine Wünsche und Fragen
        <textarea
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Farben, Stoffe, Ideen, Grösse – alles, was Dir für Dein Kleid wichtig ist"
        />
      </label>
      {/* Spam-Schutz: für Menschen unsichtbar, Bots füllen es aus */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {status === "error" && (
        <p className="text-sm text-red-700">
          Die Nachricht konnte nicht gesendet werden. Bitte versuche es nochmals oder schreib mir direkt eine E-Mail.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending" || !web3formsKey}
        className="self-start rounded-full bg-night px-6 py-3 text-white transition hover:bg-accent disabled:opacity-50"
      >
        {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
      </button>
      <p className="text-xs text-muted">
        Unverbindlich. Deine Angaben verwende ich nur, um Deine Anfrage zu beantworten (siehe Datenschutz).
      </p>
    </form>
  );
}
