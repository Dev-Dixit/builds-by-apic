# REWORK_PLAN.md — fidelity rework against the reference

Reference: https://ayushdhibardesigns.framer.website/ (Framer site; Lenis smooth scroll, Framer scroll-speed
transforms, appear effects, a Spline 3D hero). Inspected live in the desktop app's browser at 1440×900, with the
DOM, computed styles, `@font-face` rules, image requests and scroll-linked transforms read from the page.

Status legend: ☐ open · ◐ partly done · ☑ done · ✗ won't do (reason given)

## How the reference was measured

| What | How |
| --- | --- |
| Fonts | `document.fonts`, inline `@font-face` rules, canvas `measureText` on the loaded faces |
| Layout | `offsetTop` chains and `getBoundingClientRect()` at scroll 0 for every `data-framer-name` layer |
| Parallax | Sampled `transform` of every layer at many scroll positions; translateY is linear in scrollY, so each layer has a fixed rate |
| Motion | Screenshot sequences while wheel-scrolling, plus the start/end transforms of appear effects |

### Measured scroll rates (translateY = rate × scrollY)

| Layer | Rate | Notes |
| --- | --- | --- |
| Hero clouds (left / right) | +0.21 | `mix-blend-mode: overlay` |
| Hero purple mist ellipse | −0.50 | moves up faster than the page |
| Statement cloud ("Cloud 2") | +0.41 | overlay blend |
| Balloon | +0.30 | `opacity .7; filter: blur(2px)` |
| Work-section cloud ("Cloud 3") | +0.31 | sits in front of the cards (z 6) |
| Galaxy | +0.50 | `mix-blend-mode: screen`, rotates in 3D with scroll |
| Books cloud (mirrored "Cloud 2") | +0.41 | fades 0 → 0.9 and slides in x as the section arrives |
| Footer back cloud | +0.04 | |
| Footer floating islands | +0.26 / +0.35 | `blur(2px)` |

### Measured layout at 1440×900 (document y)

| Section | Reference | Current build (before) |
| --- | --- | --- |
| Hero | 0–900 | 0–1039 |
| Who am I (heading) | 1130 | 1289 |
| Polaroids | 921 / 1049 / 1281 / 1313 | 1073 / 1200 / 1296 / 1451 |
| Statement | 2066, not pinned | 1899, pinned 210vh |
| Work heading / first card | 2706 / 2696 | 3789 / 3809 |
| Books heading | 4320 | 5485 |
| Journey heading / first entry | 4860 / 5196 | 6037 / 6377 |
| Contact heading | 8586 | 9711 |
| Page height | 9201 | 10317 |

## Prioritised issues and status

### P1 — Assets and fonts

| # | Issue | Fix | Files | Status |
| --- | --- | --- | --- | --- |
| 1.1 | Display font: the reference uses **against** (177Studio, free for personal use only); the build used Bodoni Moda 500/600, much narrower with a smaller x-height | Playfair Display 400 (OFL) with `size-adjust` and ascent/descent overrides computed from against's measured metrics; a licensed original in `src/assets/fonts/licensed/` is swapped in automatically | `src/styles/fonts.css`, `src/licensedFonts.ts`, `src/main.tsx`, `global.css` | ☑ |
| 1.2 | Marquee font: **ROTHEFIGHT** (personal-use demo) | Six Caps (OFL): same width/height ratio (1.96 vs 1.98), baseline placed so glyphs fill the same 69–422px band of the 448px line | same | ☑ |
| 1.3 | Clouds were CSS radial blobs, the biggest visual gap | Original volumetric cloud WebPs from `scripts/gen-clouds.mjs`, placed with the reference's blend modes | `public/images/clouds/*`, `Scenery.tsx`, `scenery.css` | ☑ |
| 1.4 | Photos, 3D renders, Spline scene, covers, logos | Not reused (no licence); placeholders kept, real photos drop in via `content.ts` | — | ✗ by design |
| 1.5 | Hero lacked the lavender glow plate | `.decor__hero-glow` (3600×1206 at y=174, as measured) | `HomePage.tsx`, `home.css` | ☑ |

### P2 — Layout and composition

| # | Issue | Fix | Status |
| --- | --- | --- | --- |
| 2.1 | Hero 1039px tall, type sizes and line heights off | Hero 900px, title 32/0.8 + 72/0.8, subtitle 14.4/1.0 at the measured offsets; scene re-positioned | ☑ |
| 2.2 | Marquee: wrong font, too small, wrong direction, no dots | 224px / 448px line at y=101, 27px dots with 10px gaps, 0.4 opacity, drifts right at 29px/s | ☑ |
| 2.3 | Who-am-I collage off | Exact reference positions (cqw-based, so it scales below 1083px); polaroid frames 224×253 / 324×253; final rotations 0/0/3/−6° | ☑ |
| 2.4 | Statement pinned 210vh with scrubbed opacity | Normal flow at y=2066, 74px line pitch, per-word appear, −0.1 page-anchored drift | ☑ |
| 2.5 | Project cards 640 wide | 689×438 boxes (incl. dial overhang) with 10px gaps, body 619px wide | ☑ |
| 2.6 | Books row 530 wide | 75×253 books starting at x=732 | ☑ |
| 2.7 | Section offsets drifted by +1100px | Container 1083px; section heights/paddings from the measurements; page is now 9201px like the reference | ☑ |
| 2.8 | Contact sat above the meadow | One 947px footer scene (status 281, heading 332, button 380, email 445, socials 550, white fade, note 898) | ☑ |
| 2.9 | Journey: heading tone, company-name tone, small caps, dot placement | Ink heading, dark gradient company names, small-caps roles, ring dot level with logo | ☑ |

Measured result (document y at 1440×900):

| Element | Reference | Before | After |
| --- | --- | --- | --- |
| Polaroid "Me" | 770, 921 | 752, 1073 | 770, 921 |
| Statement | 2066 | 1899 | 2066 |
| Work heading | 2706 | 3789 | 2706 |
| Books heading | 4320 | 5485 | 4320 |
| Journey heading | 4860 | 6037 | 4860 |
| Contact heading | 8586 | 9711 | 8586 |
| Page height | 9201 | 10317 | 9201 |

### P3 — Parallax and scroll-linked motion

| # | Issue | Fix | Status |
| --- | --- | --- | --- |
| 3.1 | No smooth scrolling (the reference runs Lenis) | `lenis` 1.3.27 (MIT), lerp 0.1, driven from the shared rAF loop; off in lite mode and for reduced motion; scroll locked while the preloader is up | ☑ |
| 3.2 | Clouds drifted on a CSS loop, not with scroll | `Parallax` / `useParallax` with the measured rates, page-anchored like Framer's scroll-speed effect, one subscriber loop, transform only | ☑ |
| 3.3 | Galaxy static | +0.5 rate and scroll-linked 3D rotation | ☑ |
| 3.4 | Mirrored cloud missing | Fades 0 → 0.9 and slides 88px between scroll 5600–6400, rate +0.41 | ☑ |
| 3.5 | Statement drift | −0.1 × scrollY (measured −150px at 1500, −210px at 2100), desktop only | ☑ |

### P4 — Animation timing

| # | Issue | Fix | Status |
| --- | --- | --- | --- |
| 4.1 | No preloader | `Preloader`: % counter + 130×12 bar + "turn off Interactive mode" hint; real progress from fonts and critical images, 1.4s minimum, time-based easing, blur-fade exit; skipped in lite mode and for reduced motion | ☑ |
| 4.2 | Polaroids had no appear | Scale 1.1 → 1 and fade with 120ms stagger on enter | ☑ |
| 4.3 | Hero intro started under the loader | `.blur-in` paused until `html.is-loaded` | ☑ |
| 4.4 | Exact Framer spring curves | Approximated with `--ease-spring`; not measurable from outside Framer's runtime | ◐ |

### P5 — Responsive

| # | Issue | Status |
| --- | --- | --- |
| 5.1 | 390px: single column, zig-zag polaroid column as on the reference, marquee scaled, no horizontal overflow (`scrollWidth` = 390) | ☑ |
| 5.2 | Desktop-calibrated layers (page-anchored decor, statement drift) are off below 810px, where the page is a different length | ☑ |
| 5.3 | 768–1100px: decor positions are centre-relative px and the collage uses container units; checked at 1440 and 390, not at every width in between | ◐ |

### P6 — Performance and quality

| # | Issue | Status |
| --- | --- | --- |
| 6.1 | Unused font packages removed (Bodoni Moda, Big Shoulders); Montserrat/Caveat weights matched to the reference | ☑ |
| 6.2 | All scroll work in one rAF loop (`src/hooks/scroll.ts`); subscribers run only when scroll, viewport or layout changes; no per-frame React renders | ☑ |
| 6.3 | `npm run build` passes; no console errors on `/`, `/works`, `/about-me`, `/works/:slug` | ☑ |
| 6.4 | Clouds 26–85 kB WebP; fonts self-hosted with `font-display: swap` and a metric-matched local fallback | ☑ |

## Verification

Screenshots of the reference and this build were captured headlessly (Chrome, 1440×900 and 390×844)
at matching scroll positions (0, 1150, 1750, 2300, 2900, 4150, 5400, 8301), after walking the whole page
so on-enter effects had fired. The side-by-side boards are on the canvas linked in the hand-off notes.

## Remaining discrepancies

| Area | Why |
| --- | --- |
| Hero 3D monitor, photos, project renders, book covers, logos, photographic grass | Third-party assets without a reuse licence (see `ASSET_AUDIT.md`) |
| Display typeface details (swash "A"/"y", slightly taller caps) | *against* is personal-use only; Playfair Display is the closest open match |
| Ticker strokes slightly heavier | Six Caps is bolder than ROTHEFIGHT at the same proportions |
| Exact spring physics of Framer appear effects | Framer computes them at runtime; approximated with cubic-bezier curves |
| Reference mobile below the first two screens | The reference rendered blank under mobile emulation after ~1000px, so deeper mobile sections were compared against the structure only |
