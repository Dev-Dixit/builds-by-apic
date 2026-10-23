// Your own photos, screenshots and logos.
//
// Drop files into src/assets/user/ using the names listed in ASSET_FILES_NEEDED.md
// (e.g. photo-me.jpg, book-the-mom-test.jpg, project-field-sales.png). Any file that exists
// replaces the matching placeholder; anything missing keeps the illustrated placeholder, so the
// site never shows a broken image and never requests a file that is not there.

const files = import.meta.glob<string>('./assets/user/*.{jpg,jpeg,png,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byStem = new Map<string, string>()
for (const [path, url] of Object.entries(files)) {
  byStem.set(path.split('/').pop()!.replace(/\.[a-z]+$/i, '').toLowerCase(), url)
}

/** Local study mode adds its own mappings through this (see src/study/original.ts). */
export function registerUserAssets(map: Record<string, string>) {
  for (const [k, v] of Object.entries(map)) byStem.set(k.toLowerCase(), v)
}

/** URL of src/assets/user/<stem>.<ext> if it exists, otherwise undefined. */
export const userAsset = (stem: string): string | undefined => byStem.get(stem.toLowerCase())
