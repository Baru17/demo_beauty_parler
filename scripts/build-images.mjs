/**
 * Build-time image pipeline for AURELLE.
 *
 * Downloads licensed Pexels photographs, applies a consistent warm grade,
 * crops to the exact slot aspect ratio and exports responsive WebP files.
 *
 * Pexels License: free to use, no attribution required.
 * https://www.pexels.com/license/
 *
 * Run with: node scripts/build-images.mjs
 * Not part of the shipped website bundle.
 */
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const OUT = 'public/images'
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'

/**
 * slot: { id, aspect, widths: [full, small], position }
 * `aspect` is width / height.
 */
const SLOTS = {
  hero: { id: '16534348', aspect: 4 / 5, widths: [1500, 720], position: 'attention' },
  'hero-inset': { id: '7195809', aspect: 4 / 5, widths: [700, 340], position: 'attention' },
  about: { id: '7823407', aspect: 4 / 5, widths: [1100, 560], position: 'attention' },
  'about-detail': { id: '3993448', aspect: 1, widths: [720, 360], position: 'attention' },
  'service-hair': { id: '28863315', aspect: 4 / 5, widths: [900, 460], position: 'attention' },
  'service-skin': { id: '37229305', aspect: 4 / 5, widths: [900, 460], position: 'attention' },
  'service-bridal': { id: '37710473', aspect: 4 / 5, widths: [900, 460], position: 'attention' },
  'service-grooming': { id: '3998426', aspect: 4 / 5, widths: [900, 460], position: 'attention' },
  'featured-main': { id: '15507425', aspect: 4 / 5, widths: [1100, 560], position: 'attention' },
  'featured-hair': { id: '3065209', aspect: 4 / 5, widths: [950, 480], position: 'attention' },
  'featured-skin': { id: '15866041', aspect: 4 / 5, widths: [950, 480], position: 'attention' },
  'featured-makeup': { id: '35538643', aspect: 4 / 5, widths: [950, 480], position: 'attention' },
  modal: { id: '10317450', aspect: 4 / 5, widths: [820, 420], position: 'attention' },
  'gallery-haircut-1': { id: '20092122', aspect: 4 / 3, widths: [1000, 520], position: 'attention' },
  'gallery-haircut-2': { id: '6487882', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
  'gallery-colour-1': { id: '4981476', aspect: 4 / 3, widths: [1000, 520], position: 'attention' },
  'gallery-colour-2': { id: '28868043', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
  'gallery-hairstyle-1': { id: '10751388', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
  'gallery-hairstyle-2': { id: '11652342', aspect: 4 / 3, widths: [1000, 520], position: 'attention' },
  'gallery-makeup-1': { id: '7588619', aspect: 4 / 3, widths: [1000, 520], position: 'attention' },
  'gallery-makeup-2': { id: '19891850', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
  'gallery-treatment': { id: '23349910', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
  'gallery-interior-1': { id: '7195801', aspect: 4 / 3, widths: [1000, 520], position: 'attention' },
  'gallery-interior-2': { id: '12164645', aspect: 3 / 4, widths: [760, 380], position: 'attention' },
}

await mkdir(OUT, { recursive: true })
await mkdir('raw-images/source', { recursive: true })

const credits = []

async function sourceFile(id, width) {
  const file = `raw-images/source/${id}-${width}.jpg`
  if (existsSync(file)) return file
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`photo ${id}: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(file, buf)
  return file
}

async function encode(input, width, aspect, position) {
  const height = Math.round(width / aspect)
  return sharp(input)
    .rotate()
    .resize(width, height, { fit: 'cover', position })
    .modulate({ saturation: 0.93, brightness: 1.015 })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 76, effort: 6, smartSubsample: true })
    .toBuffer()
}

for (const [slot, cfg] of Object.entries(SLOTS)) {
  try {
    const src = await sourceFile(cfg.id, 1800)
    const [fullW, smallW] = cfg.widths
    const full = await encode(src, fullW, cfg.aspect, cfg.position)
    const small = await encode(src, smallW, cfg.aspect, cfg.position)
    await writeFile(`${OUT}/${slot}.webp`, full)
    await writeFile(`${OUT}/${slot}-sm.webp`, small)
    credits.push({
      slot,
      photoId: cfg.id,
      width: fullW,
      height: Math.round(fullW / cfg.aspect),
      source: `https://www.pexels.com/photo/${cfg.id}/`,
      kb: Math.round(full.length / 1024),
    })
    console.log(`ok   ${slot.padEnd(22)} ${fullW}x${Math.round(fullW / cfg.aspect)}  ${Math.round(full.length / 1024)} KB`)
  } catch (err) {
    console.log(`FAIL ${slot}: ${err.message}`)
  }
}

// --- Open Graph image: 1200x630 editorial composition ----------------------
try {
  const base = await sharp(await sourceFile('7823407', 1800))
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.8, brightness: 0.95 })
    .toBuffer()

  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#141312" stop-opacity="0.92"/>
        <stop offset="0.55" stop-color="#141312" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#141312" stop-opacity="0.12"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="7" fill="#C8A978">UNISEX HAIR &amp; BEAUTY STUDIO</text>
    <text x="74" y="315" font-family="Georgia, 'Times New Roman', serif" font-size="104" letter-spacing="10" fill="#F8F5F0">AURELLE</text>
    <text x="80" y="372" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="34" fill="#E8DED1">Beauty Beyond Ordinary.</text>
    <rect x="80" y="416" width="64" height="1" fill="#C8A978"/>
    <text x="80" y="462" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="3" fill="#D9D2C8">RAMANATHAPURAM, TAMIL NADU</text>
  </svg>`)

  const og = await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .webp({ quality: 82, effort: 6 })
    .toBuffer()
  await writeFile(`${OUT}/og.webp`, og)
  console.log(`ok   og                     1200x630  ${Math.round(og.length / 1024)} KB`)
} catch (err) {
  console.log('FAIL og:', err.message)
}

await writeFile('raw-images/image-credits.json', JSON.stringify(credits, null, 2))
console.log(`\n${credits.length} images written to ${OUT}`)
