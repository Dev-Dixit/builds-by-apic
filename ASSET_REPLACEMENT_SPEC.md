# ASSET_REPLACEMENT_SPEC.md

Specs for your own replacements of the reference visuals, from measurements of the reference files (aspect ratio, pixel size, average colour). Save finished files in `src/assets/user/` using the names in `ASSET_FILES_NEEDED.md`; they are picked up automatically (`src/userAssets.ts`). Photos are the only ones that need real content from you; the rest already have working stand-ins.

| § | Slot | Aspect / size to deliver | Palette (measured average) | Subject | Currently |
| --- | --- | --- | --- | --- | --- |
| 1 | **Polaroid photos** (4; `intro.photos` in `content.ts`, set `src`) | "Me", "Also Me", "My Uni": square 1:1, ≥ 1000×1000 px. "And my internship": 4:3 landscape, ≥ 1600×1200 px | Natural photos; warm, slightly desaturated (reference averages: #6b695d, #65656d, #ad9781, #8f969b) | A portrait of you, an action/sport shot, your campus or study place, a team shot. Caption in Caveat 22.4px | `PlaceholderArt` illustration |
| 2 | **Hero glow and clouds** | Page-wide layers: 3600×1779 and 1500×302 with alpha (as measured) | #8174a1, #a596c7 (lavender, translucent) | Soft sky glow and cloud strips, overlay blend | Generated WebPs + CSS glow |
| 3 | **Book covers** (5; `books` in `content.ts`) | Portrait covers, ratios 1050×1350, 647×1000, 1730×2560, 786×1214, 1040×1400 (≈ 0.65–0.81 w/h); shown 75×253 as spines | #212a35, #e04385, #f8eede, #a94e8c, #a4a4a4 | The covers of books you actually read. Use your own scans or the publisher's press images where their terms allow | CSS spines in the book colours |
| 4 | **Project console screens** (3 on Home; `projects[].mockup`) | Landscape screen render ≈ 1271×655 with alpha for the console body; 230×212 LED logo tile | Console body #19110c–#17161c (dark plastic); LED #3c3436 | A screenshot or mock of each project, framed in the console | CSS console + `Mockup` |
| 5 | **Company logos** (journey, statement chips) | Square 123×123 tiles (source 100–160 px, so deliver ≥ 246×246); statement chips 170×44 and 141×16 wordmarks | #e6c6c5, #7366e5, #f07034, #d4d4d4 | Your employers' / clubs' marks, used with their guidelines | Letter tiles, text chips |
| 6 | **Footer meadow** | 3000×571 and 1653×1028 with alpha; social tiles 120×120 and 128×128 | greens #3b4026, #1b1f11; tiles #2d2d2d, #dd648e | Grass/flower hill, three social tiles | `Meadow` SVG, `SocialGlyph` |
| 7 | **Fonts** | woff2 | — | If you license *against* and *ROTHEFIGHT*, save as `src/assets/fonts/licensed/against.woff2` and `rothefight.woff2`; they load automatically | Playfair Display, Six Caps (OFL) |
