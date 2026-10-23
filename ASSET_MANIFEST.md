# ASSET_MANIFEST.md

Inventory of every image the reference loads (https://ayushdhibardesigns.framer.website/), captured with headless Chrome at 1440×900 after scrolling the whole page to trigger lazy loading. **Nothing in this table has been downloaded into the project** — see *Why nothing was downloaded*.

## Tooling and limits

| Capability | Status |
| --- | --- |
| Open the site, scroll, read DOM / computed styles / transforms | Available (built-in browser, Puppeteer + Chrome) |
| Network responses (URLs, content types, sizes) | Available (Puppeteer response events) |
| Font files and @font-face rules | Available (read from inline styles) |
| Download files | Technically possible; withheld, see below |
| Source maps | Not published by Framer |
| Video / audio | None on the page (0 <video> elements) |

## Libraries and behaviour identified

| Item | Finding |
| --- | --- |
| Builder | Framer (generator `Framer fc3086c`); output is Framer's runtime bundle, not GSAP/ScrollTrigger |
| Smooth scroll | **Lenis** (`html.lenis`), used here too |
| Parallax | Framer scroll-speed transforms, linear in scrollY (rates in REWORK_PLAN.md) |
| Hero 3D | Spline embed (`HostedSplineEmbed`, a canvas); scene file is the author's |
| Entrance effects | Framer appear effects (opacity, scale 1.1→1, blur), IntersectionObserver-driven |
| Fonts | `against Regular` (framerusercontent.com/assets/6aflXj5p3u97SbvzYEWzGk.woff2), `ROTHEFIGHT Regular` (…/znoXNOhArfvZ0QiPFUMnUHc01Y.woff2), Montserrat, Inter, Caveat, Fragment Mono, Montaga (Google Fonts) |

## Status summary

| | Count |
| --- | --- |
| Entries (50 images + 2 custom fonts) | 52 |
| Source URL accessible (HTTP 200) | 52 |
| Retrieved to a scratch folder outside the project, only to measure dimensions, format and colour | 50 images (7.4 MB incl. fonts) |
| Saved into the project | **0** |
| Reuse permission established | **0** |
| Needs confirmation or replacement | 52 |

Access is not permission: every URL above responds, and every one still needs confirmation from the owner named in the table. The scratch copies were not placed in `public/` or `src/` and are not used by the site.

## Entries

| File | Source URL | HTTP | Type | Bytes | Natural px | Section | Local path | Download status | Permission | Replacement in project |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `wTeY9UbxQ6N6H1K6TCz06bc0G4.png` | https://framerusercontent.com/images/wTeY9UbxQ6N6H1K6TCz06bc0G4.png | 200 | image/webp | 9.5 kB | 265×117 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `nOXAMTM3ja1EOAQOZdB9MINQg.png` | https://framerusercontent.com/images/nOXAMTM3ja1EOAQOZdB9MINQg.png | 200 | image/webp | 227.0 kB | 2570×861 (alpha) | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `bF1i9QNpFm5NqpjLLniSV0E6c.png` | https://framerusercontent.com/images/bF1i9QNpFm5NqpjLLniSV0E6c.png | 200 | image/webp | 484.1 kB | 3600×1779 (alpha) | Hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Generated clouds, replacement (spec §2) |
| `NwVvnFK7z5CJEQwMyqOWZYWz9HU.webp` | https://framerusercontent.com/images/NwVvnFK7z5CJEQwMyqOWZYWz9HU.webp | 200 | image/webp | 104.1 kB | 1500×302 (alpha) | Hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Generated clouds, replacement (spec §2) |
| `oTRKWc6E9zKyFAPu1HGJt2kmHdo.jpeg` | https://framerusercontent.com/images/oTRKWc6E9zKyFAPu1HGJt2kmHdo.jpeg | 200 | image/jpeg | 155.3 kB | 1556×1556 | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `x9pr3GX4RYC9ejWFJcnEkAGLI0.jpg` | https://framerusercontent.com/images/x9pr3GX4RYC9ejWFJcnEkAGLI0.jpg | 200 | image/webp | 88.4 kB | 887×887 | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `q3MJ84So5BDrmj51IVel8jUK4w.jpg` | https://framerusercontent.com/images/q3MJ84So5BDrmj51IVel8jUK4w.jpg | 200 | image/webp | 1375.9 kB | 2296×4080 | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `bHtOoas38dd5KI7nCAvdvQJQ.jpg` | https://framerusercontent.com/images/bHtOoas38dd5KI7nCAvdvQJQ.jpg | 200 | image/jpeg | 1310.8 kB | 4160×3120 | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `wP4tw3M4yic1z3HxfN2FNQ22aWo.png` | https://framerusercontent.com/images/wP4tw3M4yic1z3HxfN2FNQ22aWo.png | 200 | image/webp | 687.2 kB | 3000×1297 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `1DBnexK5THFPlzzA69G9l7e0t9Y.png` | https://framerusercontent.com/images/1DBnexK5THFPlzzA69G9l7e0t9Y.png | 200 | image/webp | 145.3 kB | 1932×2680 (alpha) | Books | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `LpCdfVdX6Tuc8o0E0bh8UPEzjMs.png` | https://framerusercontent.com/images/LpCdfVdX6Tuc8o0E0bh8UPEzjMs.png | 200 | image/webp | 95.3 kB | 3001×2001 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `gswHvRu975dfZP42PZu99A9Lcn8.png` | https://framerusercontent.com/images/gswHvRu975dfZP42PZu99A9Lcn8.png | 200 | image/webp | 12.8 kB | 784×204 (alpha) | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `eQU4QtcIbQAi0VGHEAh2HeSHBOc.png` | https://framerusercontent.com/images/eQU4QtcIbQAi0VGHEAh2HeSHBOc.png | 200 | image/webp | 8.6 kB | 1898×210 (alpha) | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `gt6foVZ9UhMDFCVwhFKIeuOftZw.webp` | https://framerusercontent.com/images/gt6foVZ9UhMDFCVwhFKIeuOftZw.webp | 200 | image/webp | 16.9 kB | 600×167 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `2fZX6w4gOzHYAj6IoJhPvr5AMU.png` | https://framerusercontent.com/images/2fZX6w4gOzHYAj6IoJhPvr5AMU.png | 200 | image/webp | 76.2 kB | 1305×1205 | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `FJ7iniS4QiIm3SUTrNFTk0eNp9U.png` | https://framerusercontent.com/images/FJ7iniS4QiIm3SUTrNFTk0eNp9U.png | 200 | image/webp | 26.1 kB | 1267×657 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `rMVV3g2bhnXG0TFH4Tm1rFSqVmM.png` | https://framerusercontent.com/images/rMVV3g2bhnXG0TFH4Tm1rFSqVmM.png | 200 | image/webp | 25.0 kB | 1267×657 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `ZrbOazVb6Md1hhiZAJobOTTdq4.png` | https://framerusercontent.com/images/ZrbOazVb6Md1hhiZAJobOTTdq4.png | 200 | image/webp | 25.2 kB | 1271×655 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `p2gLJteihB2a4wl7CFde3Stfc.png` | https://framerusercontent.com/images/p2gLJteihB2a4wl7CFde3Stfc.png | 200 | image/webp | 24.3 kB | 1271×655 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `zD5TFVngGGNAj23CsJNBNqlF5Y.png` | https://framerusercontent.com/images/zD5TFVngGGNAj23CsJNBNqlF5Y.png | 200 | image/webp | 22.5 kB | 1271×655 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `MoBEDx43F0xDvEzsf5DBrgDi9s.png` | https://framerusercontent.com/images/MoBEDx43F0xDvEzsf5DBrgDi9s.png | 200 | image/webp | 23.6 kB | 1271×655 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `ofpBgHfEMQUQNWgJyf1IbkBOo.png` | https://framerusercontent.com/images/ofpBgHfEMQUQNWgJyf1IbkBOo.png | 200 | image/webp | 3.6 kB | 1249×644 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `4Sg397mcOUjiI84M2T0c9mFJdQU.png` | https://framerusercontent.com/images/4Sg397mcOUjiI84M2T0c9mFJdQU.png | 200 | image/webp | 3.6 kB | 1271×655 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `mOLi3BnY0JZ5C80zysg4ZECYcJg.png` | https://framerusercontent.com/images/mOLi3BnY0JZ5C80zysg4ZECYcJg.png | 200 | image/webp | 9.6 kB | 230×212 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `hLXJhFzB3rzxAoybuvuQLpGMqc.png` | https://framerusercontent.com/images/hLXJhFzB3rzxAoybuvuQLpGMqc.png | 200 | image/webp | 8.9 kB | 230×212 (alpha) | Works cards | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | CSS console + `Mockup`, replacement (spec §4) |
| `polFviadf5SgQyizQLIDbJcmwZU.jpg` | https://framerusercontent.com/images/polFviadf5SgQyizQLIDbJcmwZU.jpg | 200 | image/avif | 18.6 kB | 1050×1350 | Books (book cover) | — | Not downloaded (not authorized) | Needs confirmation: Book publisher | CSS spine, replacement (spec §3) |
| `IcLbpym82Fi9HENPmWqo8WTEaQ.jpg` | https://framerusercontent.com/images/IcLbpym82Fi9HENPmWqo8WTEaQ.jpg | 200 | image/jpeg | 44.5 kB | 647×1000 | Books (book cover) | — | Not downloaded (not authorized) | Needs confirmation: Book publisher | CSS spine, replacement (spec §3) |
| `0N4DKFaKiplaXqT6VPLNeqBUxQ.jpg` | https://framerusercontent.com/images/0N4DKFaKiplaXqT6VPLNeqBUxQ.jpg | 200 | image/webp | 86.9 kB | 1730×2560 | Books (book cover) | — | Not downloaded (not authorized) | Needs confirmation: Book publisher | CSS spine, replacement (spec §3) |
| `8DoxpSOJVBNJR5KbpA3lcHA13w.jpg` | https://framerusercontent.com/images/8DoxpSOJVBNJR5KbpA3lcHA13w.jpg | 200 | image/jpeg | 147.7 kB | 786×1214 | Books (book cover) | — | Not downloaded (not authorized) | Needs confirmation: Book publisher | CSS spine, replacement (spec §3) |
| `E6INldlrxSZt280T8XOsQaS50.jpg` | https://framerusercontent.com/images/E6INldlrxSZt280T8XOsQaS50.jpg | 200 | image/webp | 47.9 kB | 1040×1400 | Books (book cover) | — | Not downloaded (not authorized) | Needs confirmation: Book publisher | CSS spine, replacement (spec §3) |
| `uCgEXr76qrUMVrELG0FXColD1k.png` | https://framerusercontent.com/images/uCgEXr76qrUMVrELG0FXColD1k.png | 200 | image/webp | 1.0 kB | 160×160 | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `osEhZl6ywdxyg5VfqgbjwDor0d8.png` | https://framerusercontent.com/images/osEhZl6ywdxyg5VfqgbjwDor0d8.png | 200 | image/webp | 1.7 kB | 100×100 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `NcfXiHFH8khy1j8XqHusbYQEA.png` | https://framerusercontent.com/images/NcfXiHFH8khy1j8XqHusbYQEA.png | 200 | image/webp | 2.7 kB | 100×100 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `zRH0QMMM9bMnkLBr0qdogUTaxk.png` | https://framerusercontent.com/images/zRH0QMMM9bMnkLBr0qdogUTaxk.png | 200 | image/webp | 1.5 kB | 85×85 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `Y2BXve923rDFTXrvApFNaeOCMoQ.png` | https://framerusercontent.com/images/Y2BXve923rDFTXrvApFNaeOCMoQ.png | 200 | image/webp | 540.4 kB | 3000×2000 (alpha) | Who am I / hero | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | `PlaceholderArt`, replacement (spec §1) |
| `D6726FNpV4SvkfIPS7kRBGhrXLo.png` | https://framerusercontent.com/images/D6726FNpV4SvkfIPS7kRBGhrXLo.png | 200 | image/webp | 606.7 kB | 3012×584 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `syeBc8ocMTgvj8JxUHmyqkfUyQU.png` | https://framerusercontent.com/images/syeBc8ocMTgvj8JxUHmyqkfUyQU.png | 200 | image/webp | 272.8 kB | 2624×1632 (alpha) | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `ocNAsVErl3ej26U1X3qBYQ9hM.png` | https://framerusercontent.com/images/ocNAsVErl3ej26U1X3qBYQ9hM.png | 200 | image/webp | 24.0 kB | 1600×1600 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `P0iqALBkdJpQydINi45dTgd3vuY.png` | https://framerusercontent.com/images/P0iqALBkdJpQydINi45dTgd3vuY.png | 200 | image/webp | 2.7 kB | 300×300 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `fvPkxsZZUTTjfqYGlIiaRRT7v4.png` | https://framerusercontent.com/images/fvPkxsZZUTTjfqYGlIiaRRT7v4.png | 200 | image/webp | 9.2 kB | 300×300 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `YX7G1ywBH5ND7VCUpwcQLFd3ac.png` | https://framerusercontent.com/images/YX7G1ywBH5ND7VCUpwcQLFd3ac.png | 200 | image/webp | 176.4 kB | 3000×571 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `eQQjdIsYJKR4cszyLZU2X3JW80.png` | https://framerusercontent.com/images/eQQjdIsYJKR4cszyLZU2X3JW80.png | 200 | image/webp | 2.9 kB | 50×88 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `cEO6GqAwxzpbO6j1bT6P413epGg.png` | https://framerusercontent.com/images/cEO6GqAwxzpbO6j1bT6P413epGg.png | 200 | image/webp | 3.1 kB | 50×88 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `u3f4jWZ6soScgIL3d6atM7svIE.png` | https://framerusercontent.com/images/u3f4jWZ6soScgIL3d6atM7svIE.png | 200 | image/webp | 2.4 kB | 50×92 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `sP5U7Khr0M44M34SSPR9lNbk4.png` | https://framerusercontent.com/images/sP5U7Khr0M44M34SSPR9lNbk4.png | 200 | image/webp | 2.4 kB | 50×92 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `qPCjWFmvTajogL4Pdjv8ByGRCFs.png` | https://framerusercontent.com/images/qPCjWFmvTajogL4Pdjv8ByGRCFs.png | 200 | image/webp | 1.6 kB | 50×64 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `ybH0LVU7TKolvQRuF8CXQAdIDmE.png` | https://framerusercontent.com/images/ybH0LVU7TKolvQRuF8CXQAdIDmE.png | 200 | image/webp | 1.7 kB | 50×64 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `LmZx4JMj3Ss2ftrWMevFJ0sB9m8.png` | https://framerusercontent.com/images/LmZx4JMj3Ss2ftrWMevFJ0sB9m8.png | 200 | image/webp | 26.5 kB | 368×368 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `Rr9v8yPcCoxlq7TMqU6Vt2FIBo.png` | https://framerusercontent.com/images/Rr9v8yPcCoxlq7TMqU6Vt2FIBo.png | 200 | image/webp | 209.7 kB | 2000×632 (alpha) | Footer / nav | — | Not downloaded (not authorized) | Needs confirmation: Ayush Dhibar | Existing SVG/CSS, replacement (spec §2) |
| `xL46HDxeeb3S2Ou5BiTmMhdEOyw.jpg` | https://framerusercontent.com/images/xL46HDxeeb3S2Ou5BiTmMhdEOyw.jpg | 200 | image/webp | 334.7 kB | 1839×2772 | Journey, statement, decor | — | Not downloaded (not authorized) | Needs confirmation: Trademark owner / author | Letter tile / text chip, replacement (spec §5) |
| `6aflXj5p3u97SbvzYEWzGk.woff2` | https://framerusercontent.com/assets/6aflXj5p3u97SbvzYEWzGk.woff2 | 200 | font/woff2 | 26.5 kB | n/a | Headings / ticker | — | Not downloaded (not authorized) | Needs confirmation: Font licence holder | Playfair Display / Six Caps (OFL), replacement |
| `znoXNOhArfvZ0QiPFUMnUHc01Y.woff2` | https://framerusercontent.com/assets/znoXNOhArfvZ0QiPFUMnUHc01Y.woff2 | 200 | font/woff2 | 10.8 kB | n/a | Headings / ticker | — | Not downloaded (not authorized) | Needs confirmation: Font licence holder | Playfair Display / Six Caps (OFL), replacement |

## Project assets that do exist on disk (our own)

| Path | What | Licence |
| --- | --- | --- |
| `public/assets/images/clouds/{bank-wide,bank-tall,puff,wisp,floor}.webp` | Generated clouds (`scripts/gen-clouds.mjs`) | Original |
| `src/assets/fonts/playfair-display-latin{,-ext}-400-normal.woff2`, `six-caps-latin-400-normal.woff2` | Display and ticker substitutes | SIL OFL 1.1 (texts alongside) |
| `node_modules/@fontsource/{montserrat,inter,caveat,doto}` | Body, UI, caption and LCD fonts | SIL OFL, bundled by Vite |
| `public/assets/{svg,fonts,videos,other}/` | Created, empty (README only) | — |

## Why nothing was downloaded

You asked for assets that are *permitted for reuse*. The site states only `© 2026. Made with love in the dorms of IITR` — no licence, no reuse grant. The list is the author's personal work: portrait and event photos of Ayush Dhibar, renders, project screenshots, covers published by third parties, company logos (trademarks), and two fonts whose own licences are personal-use only. Putting someone else's photographs and identity on a different person's portfolio would also misrepresent them. So I kept every placeholder and substitute that was already in place.

## What is integrated instead

| Need | In the project |
| --- | --- |
| Clouds, glow, mist | Generated WebPs in `public/images/clouds/` |
| Fonts | Playfair Display and Six Caps (OFL), metric-matched, in `src/assets/fonts/` |
| Photos, renders, logos | Placeholders; real files drop into `public/images/` and `src/content.ts` |

## If you do have permission

If Ayush Dhibar has given you written permission (or you hold the font licences), tell me and say which assets. I will download those specific files from the URLs above at original resolution, verify them, and wire them in. Until then, your own photos and logos are the right content for the polaroids and timeline.
