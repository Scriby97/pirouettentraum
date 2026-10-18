import type { SiteSettings } from "./sanity";

// Inhalte der bisherigen Jimdo-Seite pirouettentraum.ch (Stand Oktober 2026).
// Werden angezeigt, solange kein Sanity-Projekt verbunden ist, und dienen als Startinhalt fürs Studio
// (studio/scripts/seed.ts). Bilder gibt es erst mit Sanity.

export const placeholderSettings: SiteSettings = {
  siteName: "Pirouettentraum",
  heroTitle: "Herzlich Willkommen",
  heroSubtitle: "Kürkleiddesign für den glänzenden Auftritt auf dem Eis",
  introText: `Hast Du bereits eine Kürmusik und möchtest Dein Kürkleid darauf abstimmen? Oder hast Du Dein Traumkleid bereits im Kopf und möchtest es mit mir zusammen entwickeln? Eventuell suchst Du noch nach einer Idee für Dein neues Kleid und findest in der Galerie eine Inspiration?

Ich nähe Kürkleider nach Kundenwunsch in meinem kleinen, aber feinen Atelier. Jedes Kleid ist ein Unikat.`,
  steps: [
    {
      _key: "s1",
      title: "Deine Wünsche",
      text: "Nach Deiner Kontaktaufnahme frage ich Dich nach Deinen Wünschen und Vorstellungen – gerne auch passend zu Deiner Kürmusik.",
    },
    {
      _key: "s2",
      title: "Skizze & Stoffe",
      text: "Du erhältst von mir eine Ideenskizze und Materialvorschläge.",
    },
    {
      _key: "s3",
      title: "Nähen",
      text: "Sobald ich Deine Masse habe, mache ich mich an die Arbeit. Während des Nähens melde ich mich das eine oder andere Mal bei Dir, damit das Kleid wirklich Deinen Wünschen entspricht.",
    },
    {
      _key: "s4",
      title: "Dein Kürkleid",
      text: "Das fertige Kleid kommt per Post zu Dir – mit einer detaillierten Abrechnung und als kleines Dankeschön einem passenden Scrunchie.",
    },
  ],
  closingText: "Lass uns zusammen Deinen Pirouettentraum entwerfen – ich freue mich darauf!",

  galleryIntro: "Eine Auswahl meiner Kürkleider – vielleicht findest Du hier die Inspiration für Dein nächstes Kleid.",

  aboutTitle: "Das bin ich",
  aboutText: `Mein Name ist Stephanie. Ich wohne mit meiner Familie in der Nähe von Thun und arbeite im Teilpensum mit Leib und Seele als Sekundarschullehrerin.

Eiskunstlauf-Mamas und -Papas kennen das Problem: Neue Saison, neue Kür, neues Kleid … neue Ideen sind gefragt. Musik und Kleid sollen zusammenpassen. Das kann herausfordernd sein.

Als Hobbynäherin habe ich mich vor einigen Jahren an meine ersten Kürkleider herangewagt. Nach unzähligen Übungsstunden, Fehlern, Tränen und Erfolgserlebnissen ist es für mich heute jedes Mal mit viel Freude und Motivation verbunden, ein neues Kürkleid-Projekt zu starten. Ich liebe es, neue Stoffkombinationen mit edlen Accessoires zu kombinieren.

Meine Kürkleider nähe ich am liebsten mit Lycra, Samt oder Mesh. Aber auch elastische Spitze finde ich wunderbar. Die Hauptsache ist, dass der Stoff angenehm elastisch ist und die Eisprinzessinnen und Eisprinzen sich darin wohlfühlen.`,

  costsText: `Ein Kürkleid herzustellen fordert qualitativ gute Stoffe, Accessoires und Zeit. Dank meiner Erfahrung kann ich Dir gerne einen unverbindlichen Kostenvoranschlag machen, sobald Du mir Deine Wünsche und Vorstellungen verraten hast.

Ich würde mich sehr freuen, von Dir zu hören, damit wir gemeinsam Dein nächstes Kürkleid – Deinen nächsten Pirouettentraum – kreieren können.`,
  priceFrom: 170,
  setupFee: 30,
  hourlyRate: 25,

  contactText: "Der 1. Schritt zu Deinem neuen Pirouettentraum: Schreib mir Deine Fragen und Wünsche – per Formular oder per E-Mail. Ich freue mich!",
  email: "pirouettentraum@gmail.com",
  phone: "079 199 11 68",

  boerseVisible: true,
  boerseTitle: "Börse Eislauf-Club Thun",
  boerseText: `Die Börse des EC Thun befindet sich in Höfen bei Thun.

Hier findest Du Secondhand-Eislaufbekleidung, Zubehör und Schlittschuhe und kannst die offizielle EC-Thun-Bekleidung beziehen. Ausserdem findest Du hier Kürkleider aus dem Pirouettentraum-Atelier.

Terminvereinbarung unter 079 199 11 68 (Stephanie).`,

  ownerName: "Stephanie Luginbühl",

  comingSoonText: "Ich nehme gerade ein paar Änderungen vor – schau bald wieder vorbei!",
};
