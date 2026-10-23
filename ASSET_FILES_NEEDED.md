# ASSET_FILES_NEEDED.md — the files to supply

Save these in **`src/assets/user/`** (jpg, jpeg, png, webp, avif or svg; the extension is up to you). Each file that exists
replaces its placeholder on the next reload; missing files keep the illustrated placeholder. Nothing else needs editing.
Deliver at 2× the displayed size where the table says so, with the original aspect ratio.

| Filename (stem) | Where it shows | Deliver | Notes |
| --- | --- | --- | --- |
| `photo-me` | Home, Who am I, polaroid 1 | 1000×1000 (1:1) | Portrait of you |
| `photo-also-me` | polaroid 2 | 1000×1000 (1:1) | Action / sport / hobby shot |
| `photo-uni` | polaroid 3 | 1000×1000 (1:1) | Campus or study place |
| `photo-internship` | polaroid 4 | 1600×1200 (4:3) | Team or workplace shot |
| `project-checkout-revamp` | Home + Works card 1 screen | 1200×1000 (≈ 1.2:1, shown ~320×360 plus crop) | Screenshot or mock of that project |
| `project-field-sales-app` | card 2 | 1200×1000 | same |
| `project-admin-panel` | card 3 | 1200×1000 | same |
| `project-meal-planner` | Works card 4 | 1200×1000 | same |
| `book-refactoring-ui`, `book-the-mom-test`, `book-inspired`, `book-hooked`, `book-steve-jobs` | Home, Wisdom; the spine is 75×253 | 600×2000 or the cover's own ratio (≈ 0.3:1 spine crop) | Only covers/spines you may use (publisher press images or your own photos) |
| `logo-pixel-club`, `logo-northwind`, `logo-acme`, `logo-brightside` | Home, Journey tiles (123×123) | 246×246 square, transparent PNG/SVG | Your own employers/clubs; the tile colour stays behind it |
| Case-study figures | Case study pages | Currently drawn mockups; no file hook yet | Say if you want screenshots wired per section |

Fonts: *against* and *ROTHEFIGHT* are not needed. If you hold licences, save `against.woff2` / `rothefight.woff2` in
`src/assets/fonts/licensed/`.
