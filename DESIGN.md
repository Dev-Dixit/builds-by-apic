# DESIGN.md — Visual Design System

Reference studied: `https://ayushdhibardesigns.framer.website/` (a Framer-built designer portfolio).
This document records the *design language* observed there, translated into an original
implementation. No proprietary images, renders, logos, copy, or Framer source are reused.

## Pages inspected (live, in the browser, 1440×900 desktop and 375×812 mobile)

| Route | What it is | Inspected |
| --- | --- | --- |
| `/` | Home: hero, who-am-I, statement, projects, books, journey timeline, contact, footer | Desktop + mobile |
| `/home-lite` | Same as Home with "Interactive Mode" OFF (static, fewer effects) | Desktop |
| `/works` | Works hero, project cards, "Wall of Visual Design" corkboard, archive list | Desktop |
| `/about-me` | Intro text + scroll-driven fly-through of polaroid clusters | Desktop |
| `/works/swiggy-stride` | Case-study template (CMS) | Desktop |
| `/works/study-portal` | Same case-study template (confirmed headings/layout) | Desktop |

Not opened individually: `/works/leadlist`, `/works/ocfunfrenzy`, `/works/presto`, `/works-lite`.
They are linked from the same CMS list, so they are assumed to share the case-study template.

## 1. Mood

Dreamy "sky" aesthetic: saturated blue at the top fading through lavender to near-white,
soft volumetric clouds, faint stars, playful 3D props (monitor, mug, books, handheld-console
project cards), polaroid photos with handwritten captions, and a flowery hill at the very bottom.
Typography mixes a high-contrast display serif with a clean geometric sans.

## 2. Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--sky-blue` | `#1769F6` | Top of Home gradient |
| `--lavender` | `#B39CEF` | Home gradient stop (18%) / tags |
| `--violet` | `#7970CD` | Home gradient stop (30%), Works mid |
| `--indigo` | `#4D45BF` | Top of Works gradient |
| `--mist` | `#ECE7FB` | Bottom of Home gradient |
| `--mist-2` | `#F3F2FF` | Works bottom |
| `--paper` | `#F9F7FE` | Case-study page background |
| `--periwinkle` | `#B8BFFE` | About gradient bottom |
| `--ink-purple` | `#3F30C5` | Gradient heading on light backgrounds ("Journey so far") |
| `--text-dark` | `#0F0F0F` | Body on light |
| `--text-muted` | `#666666` | Case-study body |
| `--text-faint` | `#888888` | Dates in lists |
| `--white-85` | `rgba(255,255,255,.85)` | Hero subtitle |
| `--status-green` | `#16C60C` | "Open to new opportunities" dot |
| `--accent-orange` | `#FF7A1A` | Hover glow on project-card button |

Page backgrounds (exact values read from computed styles):

- Home: `linear-gradient(#1769F6 0%, #B39CEF 18.4%, #7970CD 29.9%, #ECE7FB 100%)`
- Works: `linear-gradient(#4D45BF 0%, #7971CC 20%, #F3F2FF 38%)`
- About: `linear-gradient(#7970CC 0%, #B8BFFE 100%)` with star field and nebula haze
- Case study: `#F9F7FE` plus a top wash `linear-gradient(rgba(179,156,239,.3) 0%, transparent 26%)`
- Footer fade: `linear-gradient(rgba(255,255,255,0) 6%, #fff 81%)`

## 3. Typography

| Role | Reference font | Implementation (licensed substitute) | Size / LH |
| --- | --- | --- | --- |
| Display (headings, name, active nav, buttons) | "against" (177Studio, personal-use licence) | **Playfair Display** 400 (OFL), metric-matched to against (see `ASSET_AUDIT.md`) | 72/0.8 name · 48/1.2 section · 36.8/1.5 timeline · 32 hello |
| Marquee | "ROTHEFIGHT" (suhadidesign, personal-use demo) | **Six Caps** (OFL), metric-matched | 224px / 448px line, uppercase |
| Body / UI | Montserrat | **Montserrat** (OFL) | 16/1.6, letter-spacing −0.02em |
| Handwritten captions | Caveat | **Caveat** (OFL) | 22.4/1.2 |
| List titles / book spines | Inter | **Inter** (OFL) | 16/1.4, 600 |
| Pixel LCD text on project cards | (image in reference) | **Doto** (OFL, dot-matrix) | 18–22px |

Display headings use a **gradient text fill**: white → transparent toward the bottom
(`linear-gradient(0deg, rgba(255,255,255,0) -15%, #fff 62%)`) on dark/saturated backgrounds, and
`#3F30C5 → transparent` on light backgrounds. Timeline company names use `#0F0F0F 34% → transparent 100%`
(fades toward the top).

Root font-size 16px. Uses `rem` multipliers: 1.1 (nav), 1.2 (role / buttons), 2.3 (timeline company), 3 (h2), 4.5 (name).

## 4. Layout & spacing

- Desktop content column: ~1094px wide, starts at x≈173 on a 1440 viewport → `max-width: 1100px; margin: auto`.
- Two-column sections: left text column 349px (sticky at `top: 32px`), right visual column ~630px starting at ~x=590.
- Section rhythm: very tall sections (900–1700px) so sticky elements have room to "hold".
- Journey timeline: vertical 2px white line at ~45% of viewport width; each entry is a ~850px tall
  segment whose content is sticky at `top: 40px`.
- Case study: content column 973px from x=64; two-column body with a 270px sticky meta rail + 730px article.
- Mobile (<810px): single column, 16–20px gutters, no sticky pinning, collage scales down.

## 5. Navigation

- **Desktop:** fixed bottom-left stack (`left: 24px; bottom: 16px`), items 41px apart:
  Home · Works · About me · Resume · Interactive Mode toggle. Inactive: Montserrat 500 17.6px, opacity .7;
  hover → opacity 1. Active: display serif. A blurred purple radial glow sits behind the stack.
- **Interactive Mode toggle:** 44×24 pill, translucent violet, white knob, "ON"/"OFF" label in display serif.
  OFF switches to the "lite" experience (no marquee, no scroll-driven effects).
- **Mobile:** fixed 48×48 hamburger top-right (3 white bars) → opens a frosted dropdown panel
  (rounded 16px, `backdrop-filter: blur`) with items in the display serif; icon morphs to ×.

## 6. Components

- **Text link with arrow:** Montserrat 16, underline offset 3px, followed by a ↗ arrow; arrow nudges on hover.
- **Primary button ("Send a Mail"):** black `#000`, radius 16px, `box-shadow: inset 1px 2.5px 1px -1px rgba(255,255,255,.6)`,
  display serif 19.2px white, ~205×55. Hover: lift 2px + scale 1.02.
- **Back button (case study):** frosted pill, `rgba(255,255,255,.5)` + blur, soft shadow, "‹ Back".
- **Polaroid:** white frame (10px sides, 40px bottom), subtle shadow, rotated −8°…+8°, Caveat caption. Hover: straighten + scale.
- **Project card ("handheld console"):** cream plastic body (radius ~44px, inner bevel, drop shadow), left 4:3.6 screen with
  thumbnail, right top dark LCD panel with a logo tile and pixel-font title, bottom-right twin round buttons in a pill,
  black knurled dial overlapping the top-right corner, gold dotted speaker grille on the left edge.
  Hover: the right button glows orange, card lifts slightly. Cards stack with sticky offsets while scrolling.
- **Book spines:** 3D books (rotateY) with colored spines and vertical titles; hover pulls a book up.
- **Timeline entry:** date (Montserrat 500), 123px white rounded-24 logo tile, small-caps role, display company name, description.
- **Archive row:** 190×110 rounded thumbnail + Inter 600 title + violet pill tags (`#B39CEF`, white 12px).
- **Corkboard:** wooden frame (radius 40, wood gradient) around cork texture; posters pinned with tape; slight rotation.
- **Status pill:** pulsing green dot + "Open to new opportunities".

## 7. Imagery

All imagery is decorative or personal. In this build, every visual is **original**:
CSS/SVG clouds, stars, balloon, monitor scene, mug, books, posters, meadow, and gradient
placeholder "photos". Real photos can be dropped into `public/images/` and referenced from
`src/content.ts` (see `public/images/README.md`).

## 8. Motion

| Effect | Where | Implementation |
| --- | --- | --- |
| Intro blur-in (blur 10px → 0, y 20 → 0, opacity) | Page titles, hero | CSS keyframes |
| Infinite horizontal marquee | Hero skill words | CSS `translateX` loop, drifting right at 29px/s |
| Word-by-word appear + −0.1 scroll drift | Statement paragraph | IntersectionObserver + `useParallax` |
| Sticky pinning | Section headings, project cards, timeline entries | `position: sticky` |
| Timeline progress line | Journey | scroll progress → `scaleY` |
| Fly-through (scale .2→2.4, blur, fade) | About page polaroid clusters | sticky stage + scroll progress |
| Scroll-speed parallax (measured rates) | Clouds, balloon, galaxy, mist | `Parallax` on one shared rAF loop |
| Smooth wheel scrolling | Whole site | Lenis (lerp 0.1) |
| Preloader (% counter, bar) | First load | `Preloader` |
| Reveal on enter (fade/slide) | Cards, rows | IntersectionObserver |

All non-essential motion is disabled when Interactive Mode is OFF or `prefers-reduced-motion: reduce`.
