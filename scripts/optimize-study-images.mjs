// Local study mode only. Writes right-sized copies of study-assets/images into study-assets/images-opt.
//
// The originals are camera-sized in places (a 13-megapixel photo shown at 324px wide), and decoding them
// the first time they scroll into view stalls a frame for 100ms+. Each copy is capped at 3-4.5x the largest size
// the image is ever displayed at (study-assets/image-sizes.json, measured on the running page), which keeps
// it sharp on 2x screens; images that are not oversized are left alone and the loader falls back to them.
import { mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const src = 'study-assets/images'
const dst = 'study-assets/images-opt'
const sizes = JSON.parse(readFileSync('study-assets/image-sizes.json', 'utf8'))
mkdirSync(dst, { recursive: true })

let saved = 0
for (const file of readdirSync(src)) {
  const ext = extname(file).toLowerCase()
  const seen = sizes[file]
  if (!seen || !['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
  const shown = Math.max(seen.w, seen.h)
  const cap = Math.max(768, Math.ceil(shown * (shown > 700 ? 3 : 4.5)))
  // only worth a second copy when it removes at least 40% of the pixels
  if ((cap * cap) / (Math.max(seen.nw, seen.nh) ** 2) > 0.6) continue
  let img = sharp(join(src, file)).resize({ width: cap, height: cap, fit: 'inside', withoutEnlargement: true })
  if (ext === '.png') img = img.png({ compressionLevel: 9, adaptiveFiltering: true })
  else if (ext === '.webp') img = img.webp({ quality: 95 })
  else img = img.jpeg({ quality: 95, mozjpeg: true })
  const out = join(dst, file)
  await img.toFile(out)
  const before = statSync(join(src, file)).size
  const after = statSync(out).size
  if (after > before * 1.5) {
    // smooth alpha art (clouds) can re-encode larger; keep the original
    rmSync(out)
    continue
  }
  saved += before - after
  console.log(`${file.slice(0, 14)}  ${seen.nw}x${seen.nh} -> cap ${cap}  ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB`)
}
console.log(`saved ${(saved / 1048576).toFixed(1)} MB`)
