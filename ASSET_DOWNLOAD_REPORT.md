# ASSET_DOWNLOAD_REPORT.md

## Result

| | Count |
| --- | --- |
| Entries in the manifest | 52 (50 images, 2 custom fonts) |
| Source URL accessible (HTTP 200) | **52** |
| Fetched to a scratch folder outside the project, only to measure size, format, alpha and colour | **50 images** (fonts: response size only) |
| Saved into the project | **0** |
| Reuse permission established | **0** |
| Need confirmation or replacement | **52** |
| Failed downloads | **0** (no errors, all HTTP 200) |

Access and retrieval work for all 52. Reuse permission is established for none, so none is in `public/` or `src/`. Fetching a file to measure it is not the same as adopting it: the scratch copies are not used by the site.

## What was actually executed

1. Fetched all 52 URLs with HTTP GET; recorded status, content type, bytes, pixel size, alpha and average colour (results in `ASSET_MANIFEST.md`).
2. Created `public/assets/{images,svg,fonts,videos,other}/`. `images/` holds our own generated clouds; `svg`, `fonts`, `videos` and `other` are empty with a README because there is no authorized asset of those types (the reference has no video and no SVG files, only inline SVG data URIs).
3. Moved the generated clouds to `public/assets/images/clouds/` and updated every path (`Scenery.tsx`, `Preloader.tsx`, `scripts/gen-clouds.mjs`, README).
4. Wrote `ASSET_REPLACEMENT_SPEC.md`: size, aspect ratio, palette and subject for each reference visual, so you can supply your own files.
5. Rebuilt `ASSET_MANIFEST.md` and this report from the real results.

Fonts: Google Fonts families (Montserrat, Inter, Caveat, Doto) stay configured through `@fontsource` (OFL). The two custom fonts are personal-use only, so Playfair Display and Six Caps remain.

## Verification

`tsc -b` passes after the path move. Headless Chrome on `/`, `/works` and `/about-me`, scrolling each page end to end: 0 console or page errors, 0 failed or 4xx requests, 0 broken images, 0 font errors. `/assets/images/clouds/floor.webp` returns 200.

## Files changed this turn

- Moved: `public/images/*` → `public/assets/images/*`
- Edited: `src/components/Scenery.tsx`, `src/components/Preloader.tsx`, `scripts/gen-clouds.mjs`, `public/assets/images/README.md`
- Added: `public/assets/{svg,fonts,videos,other}/README.md`, `ASSET_REPLACEMENT_SPEC.md`
- Updated: `ASSET_MANIFEST.md`, `ASSET_DOWNLOAD_REPORT.md`
- Not changed: `src/content.ts` (no authorized asset to point it at), Lenis, parallax, hero.

## What needs your input

Only this. Nothing else is blocked.

- **Permission or licences.** If any of the 52 entries are yours to use, name them (for example "Ayush gave me written permission for the hero renders", "I own both font licences") and I will download exactly those at original resolution, verify them and wire them in.
- **Your own files** for the four polaroids, the five book covers, the company logos and the project screenshots, sized per `ASSET_REPLACEMENT_SPEC.md`. Drop them in `public/assets/images/` and set the paths in `src/content.ts`; I can wire them in once they exist.

## Update — placeholders wired for your own files

- `src/userAssets.ts` finds files in `src/assets/user/` at build time; `content.ts` now looks up `photo-*`, `project-*`, `book-*` and `logo-*` names, and `Polaroid`, `ProjectCard`, `Books` and the journey tiles render the image when present and the placeholder otherwise (no 404s).
- Tested with a throwaway `photo-me.jpg`: it rendered in the first polaroid with no console or network errors, then was deleted. The folder currently holds no images, so every placeholder is still showing.
- The exact list of files to supply is `ASSET_FILES_NEEDED.md`.
