// Swaps in the reference's original faces when a licensed copy is present.
//
// Drop the files into src/assets/fonts/licensed/ with these names and rebuild:
//   against.woff2      → replaces the "Display" substitute
//   rothefight.woff2   → replaces the "Marquee" substitute
//
// Files are discovered at build time, so a missing file costs nothing (no 404s).

const files = import.meta.glob<string>('./assets/fonts/licensed/*.{woff2,woff}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const families: Record<string, string> = { against: 'Display', rothefight: 'Marquee' }

export function loadLicensedFonts() {
  for (const [path, url] of Object.entries(files)) {
    const stem = path.split('/').pop()!.replace(/\.(woff2|woff)$/, '').toLowerCase()
    const family = families[stem]
    if (!family) continue
    // Registered after the bundled @font-face rules, so it wins for the same family name.
    const face = new FontFace(family, `url(${url})`, { weight: '100 900', display: 'swap' })
    document.fonts.add(face)
    face.load().catch(() => document.fonts.delete(face))
  }
}
