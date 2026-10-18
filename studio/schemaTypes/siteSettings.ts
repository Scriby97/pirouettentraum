import {defineArrayMember, defineField, defineType} from 'sanity'
import {altText} from './altText'

// Alle Inhalte der Website in einem Dokument, ein Tab pro Seite
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website',
  type: 'document',
  groups: [
    {name: 'home', title: 'Startseite', default: true},
    {name: 'gallery', title: 'Galerie'},
    {name: 'about', title: 'Über mich'},
    {name: 'costs', title: 'Kosten'},
    {name: 'contact', title: 'Kontakt'},
    {name: 'boerse', title: 'Börse EC Thun'},
    {name: 'legal', title: 'Rechtliches'},
    {name: 'maintenance', title: 'Wartung'},
  ],
  fields: [
    // Startseite
    defineField({name: 'siteName', title: 'Name der Website', type: 'string', group: 'home'}),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Am besten PNG mit transparentem Hintergrund.',
      type: 'image',
      group: 'home',
    }),
    defineField({name: 'heroTitle', title: 'Begrüssung', description: 'z. B. «Herzlich Willkommen»', type: 'string', group: 'home'}),
    defineField({
      name: 'heroSubtitle',
      title: 'Untertitel',
      description: 'z. B. «Kürkleiddesign für den glänzenden Auftritt auf dem Eis»',
      type: 'string',
      group: 'home',
    }),
    defineField({
      name: 'heroImage',
      title: 'Titelbild',
      type: 'image',
      options: {hotspot: true},
      fields: [altText],
      group: 'home',
    }),
    defineField({name: 'introText', title: 'Einleitung', type: 'richText', group: 'home'}),
    defineField({
      name: 'steps',
      title: 'So entsteht dein Kleid',
      description: 'Die Schritte von der Anfrage bis zum fertigen Kleid. Reihenfolge per Ziehen ändern.',
      type: 'array',
      group: 'home',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'closingText',
      title: 'Schlusssatz',
      description: 'z. B. «Lass uns zusammen Deinen Pirouettentraum entwerfen – ich freue mich darauf!»',
      type: 'string',
      group: 'home',
    }),

    // Galerie
    defineField({name: 'galleryIntro', title: 'Text über der Galerie', type: 'text', rows: 3, group: 'gallery'}),
    defineField({
      name: 'gallery',
      title: 'Bilder',
      description:
        'Reihenfolge per Ziehen ändern. Die ersten vier erscheinen auch auf der Startseite. Bitte nur Fotos verwenden, bei denen die Kinder einverstanden sind (oder Gesichter verdeckt).',
      type: 'array',
      group: 'gallery',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            altText,
            defineField({name: 'caption', title: 'Bildunterschrift (optional)', type: 'string'}),
          ],
        }),
      ],
    }),

    // Über mich
    defineField({name: 'aboutTitle', title: 'Titel', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Text', type: 'richText', group: 'about'}),
    defineField({
      name: 'aboutImage',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [altText],
      group: 'about',
    }),

    // Kosten
    defineField({name: 'costsText', title: 'Text', type: 'richText', group: 'costs'}),
    defineField({
      name: 'priceFrom',
      title: 'Kürkleid ab (CHF)',
      type: 'number',
      validation: (r) => r.min(0),
      group: 'costs',
    }),
    defineField({
      name: 'setupFee',
      title: 'Auftragspauschale (CHF)',
      description: 'Erste Absprachen, Zeichnung, Stoff- und Materialsuche. Leer lassen = nicht anzeigen.',
      type: 'number',
      validation: (r) => r.min(0),
      group: 'costs',
    }),
    defineField({
      name: 'hourlyRate',
      title: 'Stundenansatz (CHF)',
      type: 'number',
      validation: (r) => r.min(0),
      group: 'costs',
    }),
    defineField({
      name: 'costsImages',
      title: 'Bilder',
      description: 'Detailaufnahmen, z. B. Stickereien und Accessoires.',
      type: 'array',
      group: 'costs',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}, fields: [altText]})],
    }),

    // Kontakt
    defineField({name: 'contactText', title: 'Text', type: 'richText', group: 'contact'}),
    defineField({name: 'email', title: 'E-Mail', type: 'string', group: 'contact'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string', group: 'contact'}),
    defineField({
      name: 'contactImage',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [altText],
      group: 'contact',
    }),

    // Börse
    defineField({
      name: 'boerseVisible',
      title: 'Seite «Börse EC Thun» anzeigen',
      type: 'boolean',
      initialValue: true,
      group: 'boerse',
    }),
    defineField({name: 'boerseTitle', title: 'Titel', type: 'string', group: 'boerse'}),
    defineField({name: 'boerseText', title: 'Text', type: 'richText', group: 'boerse'}),
    defineField({
      name: 'boerseImage',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      fields: [altText],
      group: 'boerse',
    }),

    // Rechtliches
    defineField({name: 'ownerName', title: 'Name (Inhaberin)', type: 'string', group: 'legal'}),
    defineField({
      name: 'address',
      title: 'Adresse',
      description: 'Für Impressum und Datenschutzerklärung.',
      type: 'text',
      rows: 3,
      group: 'legal',
    }),
    defineField({
      name: 'privacyText',
      title: 'Datenschutzerklärung',
      description: 'Der Abschnitt «Verantwortlich» entsteht automatisch aus Name, Adresse und E-Mail.',
      type: 'richText',
      group: 'legal',
    }),

    // Wartung
    defineField({
      name: 'comingSoon',
      title: 'Website vorübergehend sperren (Wartungsmodus)',
      description:
        'Eingeschaltet: Besucher sehen nur eine Wartungsseite mit deinem Text. Mit dem Passwort kommst du trotzdem auf die Website und kannst deine Änderungen prüfen. Danach ausschalten und Publish – nach 3–5 Minuten ist die Seite wieder für alle offen.',
      type: 'boolean',
      initialValue: false,
      group: 'maintenance',
    }),
    defineField({
      name: 'comingSoonText',
      title: 'Text auf der Wartungsseite',
      type: 'text',
      rows: 3,
      group: 'maintenance',
    }),
    defineField({
      name: 'previewPassword',
      title: 'Passwort, um trotzdem auf die Website zu kommen',
      description: 'Gross-/Kleinschreibung egal.',
      type: 'string',
      group: 'maintenance',
      validation: (r) =>
        r.custom((pw, {document}) =>
          document?.comingSoon && !pw ? 'Bitte ein Passwort eintragen, sonst kommst du selbst nicht mehr auf die Seite.' : true,
        ),
    }),
  ],
  preview: {prepare: () => ({title: 'Website'})},
})
