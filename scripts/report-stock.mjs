import { readFileSync, writeFileSync } from 'node:fs'

const items = JSON.parse(readFileSync('raw-images/candidates.json', 'utf8'))

const warm = (hex = [0, 0, 0]) => hex[0] - hex[2]
const lum = (hex = [0, 0, 0]) => Math.round(0.2126 * hex[0] + 0.7152 * hex[1] + 0.0722 * hex[2])
const hex = (rgb = []) => '#' + rgb.map((n) => n.toString(16).padStart(2, '0')).join('')

const byQuery = new Map()
for (const it of items) {
  if (!it.queries) continue
  for (const q of it.queries) {
    if (!byQuery.has(q)) byQuery.set(q, [])
    byQuery.get(q).push(it)
  }
}

let out = '# Pexels candidates\n\n'
for (const [q, list] of byQuery) {
  out += `## ${q}\n\n`
  const sorted = list
    .filter((x) => x.width >= 2000 && x.height >= 1400)
    .sort((a, b) => {
      const score = (x) => warm(x.dominant) * 1.5 + (x.starred ? 25 : 0) + Math.min(lum(x.dominant), 200) * 0.08
      return score(b) - score(a)
    })
    .slice(0, 8)
  for (const x of sorted) {
    out += `- **${x.id}** ${x.ratio >= 1 ? 'land' : 'port'} ${x.width}x${x.height} warm:${warm(x.dominant)} lum:${lum(x.dominant)} ${hex(x.dominant)} ${x.starred ? 'STAR ' : ''}\n`
    out += `  - alt: ${x.alt}\n`
    out += `  - by ${x.photographer} | tags: ${x.tags.slice(0, 12).join(', ')}\n`
  }
  out += '\n'
}
writeFileSync('raw-images/candidates.md', out)
console.log(out)
