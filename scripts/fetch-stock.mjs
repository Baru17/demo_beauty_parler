/**
 * Collects licensed Pexels photo candidates for the AURELLE demo.
 * Pexels License: free to use, no attribution required (credit given anyway).
 * Build-time helper only; not part of the shipped website.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const QUERIES = [
  'luxury hair salon',
  'hair salon interior',
  'hairstylist styling hair',
  'hair coloring salon',
  'bridal makeup',
  'indian bride makeup',
  'facial treatment',
  'skincare treatment',
  'barber beard trim',
  'men haircut salon',
  'beauty salon interior',
  'makeup artist',
  'hair wash salon',
  'bridal hairstyle',
  'beauty portrait woman',
  'indian woman portrait',
  'hair styling salon',
  'spa interior',
  'salon details',
  'hair salon',
  'beauty products flatlay',
  'makeup close up',
]

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function fetchHtml(query) {
  const file = `raw-images/page-${query.replace(/[^a-z0-9]+/gi, '-')}.html`
  try {
    let size = 0
    try {
      size = statSync(file).size
    } catch {
      size = 0
    }
    if (size < 100_000) {
      const out = execFileSync(
        'curl.exe',
        [
          '-sL',
          '-A',
          UA,
          `https://www.pexels.com/search/${encodeURIComponent(query)}/`,
          '-o',
          file,
          '-w',
          '%{http_code}',
        ],
        { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 },
      )
      if (out.trim() !== '200') throw new Error(`HTTP ${out.trim()}`)
    }
    return readFile(file, 'utf8')
  } catch (err) {
    throw new Error(`${query}: ${err.message}`)
  }
}

function parsePhotos(html, query) {
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
  if (!match) throw new Error(`${query}: no __NEXT_DATA__`)
  const data = JSON.parse(match[1])
  const items = []
  for (const block of data.props?.pageProps?.initialData?.data ?? []) {
    if (block?.type !== 'photo' || !block.attributes) continue
    const a = block.attributes
    items.push({
      id: String(a.id),
      query,
      title: a.title,
      alt: a.alt,
      description: a.description,
      width: a.width,
      height: a.height,
      ratio: +(a.width / a.height).toFixed(3),
      dominant: a.main_color,
      photographer: [a.user?.first_name, a.user?.last_name].filter(Boolean).join(' '),
      photographerUrl: a.user?.username ? `https://www.pexels.com/@${a.user.username}/` : 'https://www.pexels.com/',
      url: `https://www.pexels.com/photo/${a.id}/`,
      src: `https://images.pexels.com/photos/${a.id}/pexels-photo-${a.id}.jpeg`,
      tags: (a.tags ?? []).map((t) => t.name),
      starred: Boolean(a.starred),
      badges: (a.badges ?? []).map((b) => b.kind),
    })
  }
  return items
}

await mkdir('raw-images', { recursive: true })
const byId = new Map()
for (const q of QUERIES) {
  try {
    const html = await fetchHtml(q)
    const items = parsePhotos(html, q)
    for (const item of items) {
      const existing = byId.get(item.id)
      if (existing) {
        if (!existing.queries.includes(q)) existing.queries.push(q)
        existing.starred = existing.starred || item.starred
      } else {
        byId.set(item.id, { ...item, queries: [q] })
      }
    }
    console.log(`ok  ${q} (${items.length})`)
  } catch (err) {
    console.log(`ERR ${err.message.slice(0, 200)}`)
  }
  await sleep(4500)
}
const all = [...byId.values()]
await writeFile('raw-images/candidates.json', JSON.stringify(all, null, 2))
console.log(`\nSaved ${all.length} unique candidates to raw-images/candidates.json`)
