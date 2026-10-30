// LOCAL STUDY MODE. On by default in the dev server (`npm run dev`); add ?original=0 to see the
// generic version. Production builds never include this folder or study-assets/ (the only import of
// it is behind `import.meta.env.DEV` in main.tsx).
//
// Swaps in the downloaded reference assets for private, non-public study: photos, book covers,
// company logos, project screens and the two custom fonts. See ASSET_MANIFEST.md for sources.

import { registerUserAssets } from '../userAssets'

const originals = import.meta.glob<string>('../../study-assets/images/*', { eager: true, query: '?url', import: 'default' })
// right-sized copies of the oversized originals (scripts/optimize-study-images.mjs); preferred when present
const optimised = import.meta.glob<string>('../../study-assets/images-opt/*', { eager: true, query: '?url', import: 'default' })
const images: Record<string, string> = { ...originals }
for (const [path, url] of Object.entries(optimised)) images[path.replace('/images-opt/', '/images/')] = url
const fonts = import.meta.glob<string>('../../study-assets/fonts/*.woff2', { eager: true, query: '?url', import: 'default' })

const find = (dir: Record<string, string>, prefix: string) =>
  Object.entries(dir).find(([p]) => p.split('/').pop()!.toLowerCase().startsWith(prefix.toLowerCase()))?.[1]

// Our slot → filename prefix, matched by position on the reference page.
const slots: Record<string, string> = {
  'photo-me': 'oTRKWc6E',
  'photo-also-me': 'x9pr3GX4',
  'photo-uni': 'q3MJ84So',
  'photo-internship': 'bHtOoas3',
  'book-refactoring-ui': 'polFviad',
  'book-the-mom-test': 'IcLbpym8',
  'book-inspired': '0N4DKFaK',
  'book-hooked': '8DoxpSOJ',
  'book-steve-jobs': 'E6INldlr',
  'logo-pixel-club': 'uCgEXr76',
  'logo-northwind': 'osEhZl6y',
  'logo-acme': 'NcfXiHFH',
  'logo-brightside': 'zRH0QMMM',
  // project console: shells (transparent screen/LED holes), lit-button glows, LCD panels
  'console-base-white': 'zD5TFVng',
  'console-base-orange': 'p2gLJtei',
  'console-base-purple': 'rMVV3g2b',
  'console-glow-white': 'MoBEDx43',
  'console-glow-orange': 'ZrbOazVb',
  'console-glow-purple': 'FJ7iniS4',
  'console-ring': 'ofpBgHfE',
  'console-rim': '4Sg397mc',
  'led-checkout-revamp': '2fZX6w4g',
  'led-field-sales-app': 'mOLi3BnY',
  'led-admin-panel': 'hLXJhFzB',
  // statement logo chips
  'chip-swiggy': 'gswHvRu9',
  'chip-doctor-towels': 'eQU4QtcI',
  // static hero render used below 1000px (an animated GIF on the reference)
  'hero-static': 'KG8R1mCV',
  // the starfield revealed inside the Send button on hover
  'button-stars': 'xL46HDxe',
  // the nebula inside the Interactive Mode switch
  'toggle-stars': 'wTeY9UbxQ6N6H1K6TC',
  // scenery
  'hero-cloud': 'Y2BXve92',
  'hero-glow': 'nOXAMTM3',
  'hero-ellipse': 'bF1i9QNp',
  'hero-mist': 'NwVvnFK7',
  'cloud-2': 'wP4tw3M4',
  'cloud-3': 'gt6foVZ9',
  balloon: '1DBnexK5',
  galaxy: 'LpCdfVdX',
  'footer-cloud': 'Rr9v8yPc',
  // the two floating islands shown in the footer below 1000px
  'island-a': 'z8kGn5qO',
  'island-b': 'RsPRTVes',
  'grass-back': 'D6726FNp',
  'grass-front': 'YX7G1ywB',
  hill: 'syeBc8oc',
  'butterfly-orange': 'LmZx4JMj',
  'social-instagram': 'fvPkxsZZ',
  'social-linkedin': 'ocNAsVEr',
  'social-medium': 'P0iqALBk',
  // butterflies: two wing poses each
  'butterfly-red-a': 'eQQjdIsY',
  'butterfly-red-b': 'cEO6GqAw',
  'butterfly-blue-a': 'u3f4jWZ6',
  'butterfly-blue-b': 'sP5U7Khr',
  'butterfly-yellow-a': 'qPCjWFmv',
  'butterfly-yellow-b': 'ybH0LVU7',
  // the orange butterflies use one wing image (LmZx4…) for both wings
}

// Lottie animations that play in the project cards' left screens (study-assets/lottie/*.json)
const lotties = import.meta.glob<string>('../../study-assets/lottie/*.json', { eager: true, query: '?url', import: 'default' })
const lottieSlots: Record<string, string> = {
  'lottie-checkout-revamp': 'Krh2CbXD',
  'lottie-field-sales-app': 'Kg4RR8Ny',
  'lottie-admin-panel': 'D619fRnv',
}

export async function enableOriginal() {
  const map: Record<string, string> = {}
  for (const [stem, prefix] of Object.entries(slots)) {
    const url = find(images, prefix)
    if (url) map[stem] = url
  }
  for (const [stem, prefix] of Object.entries(lottieSlots)) {
    const url = find(lotties, prefix)
    if (url) map[stem] = url
  }
  registerUserAssets(map)

  const faces: [string, string][] = [
    ['Display', '6aflXj5p3u97SbvzYEWzGk'], // against
    ['Marquee', 'znoXNOhArfvZ0QiPFUMnUHc01Y'], // ROTHEFIGHT
  ]
  for (const [family, prefix] of faces) {
    const url = find(fonts, prefix)
    if (!url) continue
    const face = new FontFace(family, `url(${url})`, { weight: '100 900', display: 'swap' })
    document.fonts.add(face)
    await face.load().catch(() => document.fonts.delete(face))
  }
  document.documentElement.dataset.original = '1'
}
