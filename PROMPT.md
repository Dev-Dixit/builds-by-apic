# PROMPT.md — Implementation Plan & Requirements

## Goal

Recreate the look, layout, and interactions of the reference portfolio
(`ayushdhibardesigns.framer.website`) as an original React site in this repo, following `DESIGN.md`.
The reference is a design guide only: no copied source, photos, renders, logos, or copy.

## Stack

The project folder was empty (no existing framework), so the stack is the smallest one that fits a
multi-page, animation-heavy site:

- **Vite + React 19 + TypeScript**
- **react-router-dom** for routes
- **@fontsource/** packages to self-host OFL fonts (no runtime calls to Google)
- Plain CSS with custom properties (one global stylesheet plus a stylesheet per page). No UI framework.

## Routes

| Path | Component |
| --- | --- |
| `/` | `HomePage` |
| `/works` | `WorksPage` |
| `/works/:slug` | `CaseStudyPage` (data-driven from `content.ts`) |
| `/about-me` | `AboutPage` |
| `*` | redirect to `/` |

## Structure

```
src/
  main.tsx, App.tsx          router + layout (nav, scroll restore)
  content.ts                 ALL editable copy, projects, timeline, books, socials
  hooks/                     useScrollProgress, useInView, useInteractiveMode
  components/                Nav, Clouds, Stars, GradientText, Polaroid, ProjectCard,
                             Books, Timeline, Contact, Footer, Marquee, MonitorScene, Balloon, ...
  pages/                     HomePage, WorksPage, AboutPage, CaseStudyPage (+ .css each)
  styles/global.css          tokens, typography, utilities
public/images/README.md      where to drop real photos
```

## Requirements checklist

1. Exact page gradients, type scale, and gradient-filled display headings from `DESIGN.md`.
2. Desktop fixed bottom-left nav with active-state font swap, hover opacity, purple glow, and an
   Interactive Mode toggle that persists (localStorage wrapped in try/catch) and disables heavy motion.
3. Mobile (<810px) hamburger with frosted dropdown; all sections single column; no horizontal scroll.
4. Home sections in order: Hero (name, subtitle, marquee, monitor scene, clouds) → Who am I (sticky text +
   polaroid collage) → Statement (scroll word reveal, inline brand chips, balloon, cloud bank) →
   Projects (sticky intro + stacked console cards) → Wisdom (quote + 3D books) → Journey (sticky title,
   progress line, sticky entries) → Contact → Meadow footer.
5. Works: star-field hero with blur-in title, project cards, corkboard poster wall, archive rows, contact, footer.
6. About: centered intro with bold highlights, scroll-driven fly-through of 4 polaroid clusters with
   captions and paragraphs, closing "That's all about me :)".
7. Case study: frosted Back button, blur-in title, intro, hero visual, sticky meta rail + article
   sections, "Other works" list, contact, footer.
8. Hover states: nav opacity, link arrow nudge, polaroid straighten, card button glow + lift,
   book pull-out, archive row thumbnail zoom, button lift.
9. `prefers-reduced-motion` respected. Semantic HTML, alt text, focus-visible rings, keyboard-operable menu.
10. Verify: run `npm run dev`, screenshot each page at 1440 and 375, compare with the reference
    screenshots, fix differences.

## Assets policy

- Fonts: reference uses two custom uploads ("against", "ROTHEFIGHT"); substituted with
  Bodoni Moda and Big Shoulders Display. Montserrat, Inter, Caveat (as in the reference) and Doto are OFL.
- Images: reference photos/3D renders are personal/proprietary and are **not** downloaded. All visuals
  are original CSS/SVG. Placeholders are easy to replace through `content.ts`.
- Brand names of real companies are not used; the content is placeholder text for the site owner to edit.
