// Generates the soft volumetric cloud textures in public/assets/images/clouds/.
// They are original, procedurally generated assets (fractal value noise + a
// cheap light-march for self-shadowing), so they carry no third-party license.
//
//   node scripts/gen-clouds.mjs
//
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'images', 'clouds')
mkdirSync(OUT, { recursive: true })

// ---------- noise ----------
function mulberry(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeNoise(seed) {
  const r = mulberry(seed)
  const perm = new Uint8Array(512)
  const vals = new Float32Array(256)
  for (let i = 0; i < 256; i++) {
    perm[i] = i
    vals[i] = r()
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[perm[i], perm[j]] = [perm[j], perm[i]]
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i]
  const v = (x, y) => vals[perm[(x & 255) + perm[y & 255]]]
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
  const noise = (x, y) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = x - xi
    const yf = y - yi
    const u = fade(xf)
    const w = fade(yf)
    const a = v(xi, yi) + (v(xi + 1, yi) - v(xi, yi)) * u
    const b = v(xi, yi + 1) + (v(xi + 1, yi + 1) - v(xi, yi + 1)) * u
    return a + (b - a) * w
  }
  const fbm = (x, y, oct = 5) => {
    let s = 0
    let a = 0.5
    let f = 1
    let n = 0
    for (let i = 0; i < oct; i++) {
      s += a * noise(x * f, y * f)
      n += a
      a *= 0.5
      f *= 2.03
    }
    return s / n
  }
  return { noise, fbm }
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// ---------- cloud ----------
/**
 * Cumulus built as a soft-max of spherical lobes stacked on a flat base: each
 * lobe reads as its own rounded billow when lit from above. Outlines are broken
 * up with domain-warped fractal noise; the underside picks up a lavender shadow.
 *
 * @param {object} o
 * @param {number} o.w,o.h      output size
 * @param {number} o.seed
 * @param {number} o.blobs      number of lobes (more = more billows)
 * @param {number} o.base       baseline (0–1 of height) the lobes sit on
 * @param {number} o.height     how tall the lobes stack (0–1 of height)
 * @param {number} o.detail     noise frequency (cells across the width)
 * @param {number} o.wisp       0 = puffy cumulus, 1 = stretched stratus
 * @param {number[]} o.shadow   rgb of the shadowed underside
 */
async function cloud(name, o) {
  const { w, h, seed, blobs, base, height, detail, wisp = 0, shadow = [172, 160, 226], spanX = [0.1, 0.9], size = 1 } = o
  const r = mulberry(seed)
  const { fbm } = makeNoise(seed * 7 + 3)
  const N = w * h

  // edge-breakup noise, sampled once per pixel
  const noise = new Float32Array(N)
  const fx = detail / w
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const wx = fbm(x * fx * 0.5 + 11.3, y * fx * 0.5 * (1 + wisp * 2), 3)
      const wy = fbm(x * fx * 0.5 + 3.7, y * fx * 0.5 * (1 + wisp * 2) + 7.1, 3)
      noise[y * w + x] = fbm(x * fx * (1 - wisp * 0.5) + wx * 1.6, y * fx * (1 + wisp * 3) + wy * 1.6, 6)
    }

  const lobes = []
  for (let i = 0; i < blobs; i++) {
    const t = spanX[0] + r() * (spanX[1] - spanX[0])
    const env = Math.pow(Math.sin(Math.PI * ((t - spanX[0]) / (spanX[1] - spanX[0]))), 0.7)
    const big = r() < 0.3
    const rad = (big ? 0.06 + r() * 0.05 : 0.022 + r() * 0.035) * w * size * (0.5 + env * 0.7)
    const rx = rad * (1 + wisp * 3.5)
    const ry = rad * (1 - wisp * 0.65)
    // stack: lobes sit on the base line, higher lobes toward the middle
    let y = base * h - ry * 0.35 - r() * env * height * h
    y = Math.max(y, ry * 1.3 + h * 0.02)
    lobes.push({ x: t * w, y, rx, ry, rad })
  }

  const T = w * 0.012 // soft-max temperature: smaller = sharper creases between lobes
  const S = new Float64Array(N)
  const C = new Float32Array(N)
  for (const l of lobes) {
    const x0 = Math.max(0, Math.floor(l.x - l.rx * 1.3))
    const x1 = Math.min(w - 1, Math.ceil(l.x + l.rx * 1.3))
    const y0 = Math.max(0, Math.floor(l.y - l.ry * 1.3))
    const y1 = Math.min(h - 1, Math.ceil(l.y + l.ry * 1.3))
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const i = y * w + x
        const dx = (x - l.x) / l.rx
        const dy = (y - l.y) / l.ry
        const q0 = dx * dx + dy * dy
        // noise roughens the rims but leaves the billow interiors smooth
        const q = q0 * (1 + (noise[i] - 0.5) * 1.1 * smoothstep(0.35, 1, q0))
        if (q >= 1) continue
        const z = l.rad * Math.sqrt(1 - q) + (base * h - l.y) * 0.25 // higher lobes sit a bit closer
        S[i] += Math.exp(z / T)
        if (1 - q > C[i]) C[i] = 1 - q
      }
  }

  const Hf = new Float32Array(N)
  for (let i = 0; i < N; i++) Hf[i] = S[i] > 0 ? T * Math.log(S[i]) : 0

  const buf = Buffer.alloc(N * 4)
  const L = [-0.3, -0.75, 0.6]
  const ll = Math.hypot(...L)
  const g = 2
  const top = Math.max(0, (base - height) * h)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      const cov = C[i]
      if (cov <= 0) continue
      const bottom = 1 - smoothstep(base * h - h * 0.05, base * h + h * (0.05 + wisp * 0.2), y + (noise[i] - 0.5) * h * 0.12)
      const a = smoothstep(0.0, 0.3, cov) * bottom * (0.97 - wisp * 0.32)
      if (a <= 0.003) continue
      const hx = (Hf[y * w + Math.min(w - 1, x + g)] - Hf[y * w + Math.max(0, x - g)]) / (2 * g)
      const hy = (Hf[Math.min(h - 1, y + g) * w + x] - Hf[Math.max(0, y - g) * w + x]) / (2 * g)
      const nl = Math.hypot(hx, hy, 1)
      const lam = Math.max(0, (-hx * L[0] - hy * L[1] + L[2]) / (nl * ll))
      const vert = smoothstep(top, base * h, y)
      const rim = 1 - smoothstep(0.0, 0.35, cov) // thin edges glow
      let light = 0.18 + lam * 0.9 - vert * 0.28 + rim * 0.3 + (noise[i] - 0.5) * 0.06
      light = Math.min(1, Math.max(0, light))
      const o4 = i * 4
      buf[o4] = Math.round(shadow[0] + (255 - shadow[0]) * light)
      buf[o4 + 1] = Math.round(shadow[1] + (255 - shadow[1]) * light)
      buf[o4 + 2] = Math.round(shadow[2] + (255 - shadow[2]) * light)
      buf[o4 + 3] = Math.round(255 * a)
    }
  }

  const file = path.join(OUT, `${name}.webp`)
  await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
    .blur(o.blur ?? 2)
    .webp({ quality: 86, alphaQuality: 90, effort: 5 })
    .toFile(file)
  console.log('wrote', file)
}

await cloud('bank-wide', { w: 2400, h: 900, seed: 11, blobs: 150, base: 0.84, height: 0.55, detail: 14 })
await cloud('bank-tall', { w: 1600, h: 1000, seed: 23, blobs: 110, base: 0.88, height: 0.7, detail: 11, spanX: [0.12, 0.88], size: 1.2 })
await cloud('puff', { w: 1400, h: 700, seed: 5, blobs: 70, base: 0.82, height: 0.55, detail: 9, spanX: [0.16, 0.84], size: 1.25 })
await cloud('wisp', { w: 2000, h: 600, seed: 41, blobs: 60, base: 0.7, height: 0.3, detail: 8, wisp: 1, shadow: [200, 194, 242], blur: 5 })
await cloud('floor', { w: 2800, h: 800, seed: 77, blobs: 240, base: 0.94, height: 0.4, detail: 18, spanX: [0.01, 0.99], shadow: [198, 186, 240] })
