// Startinhalt: Texte und Bilder der bisherigen Jimdo-Seite nach Sanity übertragen.
// Ausführen (einmalig): npx sanity exec scripts/seed.ts --with-user-token
// Überschreibt nichts: legt das Dokument «Website» nur an, wenn es noch nicht existiert.
import {createReadStream} from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'
import {placeholderSettings as text} from '../../web/src/lib/placeholder'
import {privacyDefault} from '../../web/src/lib/privacy-default'

const client = getCliClient({apiVersion: '2025-01-01'})
const dir = path.resolve(process.cwd(), '../material/bilder')

if (await client.getDocument('siteSettings')) {
  console.log('Das Dokument «Website» existiert schon – nichts geändert.')
  process.exit(0)
}

let n = 0
const key = () => `k${(n++).toString(36)}`

// Reiner Text → Editor-Blöcke («## » = Zwischentitel, «- » = Aufzählung, Leerzeile = neuer Absatz)
function blocks(value: unknown) {
  if (typeof value !== 'string') return undefined
  return value.split(/\n{2,}/).flatMap((para) => {
    const lines = para.split('\n')
    const out: object[] = []
    let rest = lines
    if (lines[0].startsWith('## ')) {
      out.push(block(lines[0].slice(3), 'h3'))
      rest = lines.slice(1)
    }
    const bullets = rest.filter((l) => l.startsWith('- '))
    const plain = rest.filter((l) => !l.startsWith('- '))
    if (plain.length) out.push(block(plain.join('\n')))
    for (const b of bullets) out.push({...block(b.slice(2)), listItem: 'bullet', level: 1})
    return out
  })
}
function block(t: string, style = 'normal') {
  return {_type: 'block', _key: key(), style, markDefs: [], children: [{_type: 'span', _key: key(), text: t, marks: []}]}
}

async function image(file: string, alt?: string, extra: object = {}) {
  const asset = await client.assets.upload('image', createReadStream(path.join(dir, file)), {filename: file})
  console.log('  hochgeladen:', file)
  return {_type: 'image', _key: key(), asset: {_type: 'reference', _ref: asset._id}, ...(alt ? {alt} : {}), ...extra}
}

const galleryAlts = [
  'Bordeauxrotes Spitzen-Kürkleid mit goldener Korsage',
  'Eiskunstläuferin im bordeauxroten Kleid mit goldener Korsage',
  'Petrolfarbenes Kürkleid mit gestickter Pfauenfeder',
  'Türkises Paillettenkleid mit schwarzer Schnürkorsage',
  'Schwarzes Kürkleid mit Mesh und goldenen Blättern',
  'Schwarzes Kürkleid mit pinkem Einsatz und Glitzersteinen',
  'Eiskunstläufer im schwarz-roten Kürkostüm',
  'Eiskunstläuferin im schwarz-roten Kleid',
  'Eiskunstläuferin im gelb-schwarzen Sonnenkleid',
  'Gelb-schwarzes Kürkleid mit Spitze, daneben Schlittschuhe',
  'Zwei rot-schwarz-weisse Kürkleider',
  'Türkis-goldenes Kürkleid mit Spitzenrock',
  'Türkis-goldenes Kürkleid mit Spitzenrock, zweite Ansicht',
  'Schwarzes Kürkleid mit türkis-goldener Stickerei',
  'Detail einer türkis-goldenen Blütenstickerei',
  'Hellblaues Kürkleid mit Glitzersteinen und Tüllrock',
  'Hellblaues Kürkleid von hinten mit Glitzer-Trägern',
  'Schwarzes Kürkleid mit violetter Spitze',
  'Rosa Kürkleid mit Mesh und Blumenstickerei',
  'Dunkelblaues Kürkleid mit hellblauen Volantärmeln',
  'Dunkelblaues Spitzenkleid mit türkisem Rock',
]

console.log('Bilder hochladen …')
const gallery = []
for (const [i, alt] of galleryAlts.entries()) gallery.push(await image(`galerie-${String(i).padStart(2, '0')}.jpg`, alt))
const costsImages = [
  await image('kosten-00.jpg', 'Detail: Blumenstickerei mit Steinen auf pinkem Stoff'),
  await image('kosten-01.jpg', 'Schwarzes Kürkleid mit pinkem Einsatz und Glitzersteinen'),
  await image('kosten-02.jpg', 'Kürkleid in Arbeit an der Schneiderbüste, mit goldenen Blättern'),
  await image('kosten-03.jpg', 'Zugeschnittene schwarz-goldene Blätter als Applikationen'),
]
const strip = ({_key, ...rest}: {_key: string}) => rest

const doc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  ...text,
  logo: strip(await image('logo.png')),
  heroImage: strip(await image('home-01.jpg', 'Schwarz-rotes Kürkleid im Lederjacken-Look mit Glitzersteinen')),
  introText: blocks(text.introText),
  gallery,
  aboutText: blocks(text.aboutText),
  aboutImage: strip(await image('stephanie-00.jpg', 'Kürkleid in Arbeit mit aufgenähten Blättern')),
  costsText: blocks(text.costsText),
  costsImages,
  contactText: blocks(text.contactText),
  contactImage: strip(await image('kontakt-00.jpg', 'Rosa Kürkleid mit Blumenstickerei und Schal')),
  boerseText: blocks(text.boerseText),
  boerseImage: strip(await image('boerse-ec-thun-00.jpg', 'Blick in die Börse des EC Thun mit Eislaufbekleidung')),
  privacyText: blocks(privacyDefault),
  comingSoon: true,
  previewPassword: 'Pirouette',
}

await client.createIfNotExists(doc)
console.log('Fertig: Dokument «Website» angelegt (Wartungsmodus an, Passwort «Pirouette»).')
