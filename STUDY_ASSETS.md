# STUDY_ASSETS.md — original assets in the local project

For private study only. Do not publish. The files remain the property of their authors, and the personal-use fonts must not ship publicly.

## Downloaded (`study-assets/`, git-ignored, outside `public/` and `src/`)

| Folder | Files | Size | Verification |
| --- | --- | --- | --- |
| `images/` | 54 originals, un-resized | 28.9 MB | HTTP 200, decoded by sharp |
| `fonts/` | 7 WOFF2 (against, ROTHEFIGHT, 4 Fontshare, 1 more) | 0.4 MB | `wOF2` signature |
| `scene/` | `scene.splinecode`, `process.wasm` | 1.3 MB | valid header; scene renders |
| `lottie/` | 3 JSON animations | 3.5 MB | parse as JSON; all 3 play |

Scene source: `raw.githubusercontent.com/leo-310/Portfolio-Assets/main/scene.splinecode` (a different GitHub account from the site's author). Other source URLs: `ASSET_MANIFEST.md`.

## How it is wired

Local study mode is on by default in `npm run dev`; `?original=0` shows the generic version. The code is in `src/study/`, `src/components/LottieScreen.tsx` and small hooks (`userAssets.ts`, `main.tsx`, `HomePage.tsx`, `Contact.tsx`, `ProjectCard.tsx`). `src/study/original.ts` maps each file to its slot by position on the reference page.

| Item | Status |
| --- | --- |
| Hero Spline scene | Renders (about 10–15 s to appear), placed like the reference's embed |
| *against* and *ROTHEFIGHT* fonts | Loaded, replacing the substitutes |
| 4 polaroid photos, 5 book covers, 3 timeline logos | Real files; seen on screen |
| Project consoles (3 cards): shell, LCD panel, glow, hover colour | **Wired.** Geometry measured from the base image's alpha channel (screen hole at 384,181; LCD at 721,174) |
| Console left screens: the 3 Lottie animations | **Wired and playing** (phone-in-hand, Swiggy app screens), paused when off screen |
| Hero glow/ellipse/mist, hero clouds, cloud 2/3, balloon, galaxy (with scroll-linked tilt) | **Wired**, at the reference's positions and scroll rates |
| Footer: hill, back and front grass, white cloud, 3 social tiles, 2 floating islands, 5 butterflies (two wing poses, flapping) | **Wired.** Butterfly positions use the reference's three; two extra reuse the same art |
| Console "button pressed" state, the 4th logo, and a few unidentified images (e.g. `xL46HDxeeb3S…` 1839×2772) | Not wired / not confirmed on screen |

## Verification

- `tsc -b` passes; no console errors in the browser pane on the home page (hero, works, books, journey, footer).
- Production build: `dist/` is 3.6 MB and contains **none** of the study images, scene, WASM, Lottie files or the Spline/Lottie runtimes (searched file names and bundle contents; `npm run build` passes).

## Known gaps

- Scroll behaviour of the Spline scene: I found no scroll-driven transform on the reference's embed beyond its page position, so none was added. The scene reacts to the pointer through Spline's own runtime.
- The first frame may show the substitute fonts and hero before the scene and fonts finish loading.
- Not compared pixel-for-pixel against the reference after these changes; checked by eye in the browser pane.

## Right-sized image copies (smooth scrolling)

Some originals are camera-sized (a 13-megapixel photo shown at 324px). Decoding them the first time they scroll into view
stalls a frame for 100ms+. `node scripts/optimize-study-images.mjs` writes capped copies to `study-assets/images-opt/`
(2–3× the largest displayed size, read from `study-assets/image-sizes.json`); `src/study/original.ts` prefers them and
falls back to the originals. Re-run it after adding images. Both folders are git-ignored and never reach `dist`.

## Interactive Mode

Off by default (choice stored under `interactive-mode-v2`). Off = native scrolling, no preloader, no parallax, and the
static hero render instead of the live Spline scene. On = Lenis smooth scroll, parallax, the Spline scene (which lowers
its own render resolution if it cannot hold ~30fps).
