// All editable site content lives here. Everything below is sample/placeholder
// copy: replace names, dates, links and text with your own.
// Any `src` left undefined renders an original illustrated placeholder.

import type { ArtKind } from './components/PlaceholderArt'
import type { MockupKind } from './components/Mockup'
import { userAsset } from './userAssets'

function consoleFor(slug: string, hover: 'purple' | 'orange' | 'white') {
  const led = userAsset(`led-${slug}`)
  return led && userAsset('console-base-white') ? { led, lottie: userAsset(`lottie-${slug}`), hover } : undefined
}

export const site = {
  name: 'Jayesh',
  fullName: 'Jayesh Goswami',
  tagline: ['A Product Designer & Developer who builds products,', 'with a problem solving and creative mindset.'],
  email: 'hello@example.com',
  resumeUrl: '#resume',
  footerNote: 'Made with love, late at night',
  marquee: ['Product', 'UI/UX', 'Illustrations', 'Graphics', '3D', 'Vibe Coding'],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
    { label: 'Medium', href: 'https://medium.com/', icon: 'medium' },
  ] as const,
}

export const intro = {
  heading: 'Who am I?',
  body:
    'Hey, I’m Jayesh — an engineer who turned into a designer. I work across product and visual design and front-end development, and have had the opportunity to design for startups, studios and consumer brands.',
  photos: [
    // Final rotations as on the reference collage
    { caption: 'Me', art: 'portrait' as ArtKind, rot: 0, src: userAsset('photo-me') },
    { caption: 'Also Me', art: 'track' as ArtKind, rot: 0, src: userAsset('photo-also-me') },
    { caption: 'My Uni', art: 'campus' as ArtKind, rot: 3, src: userAsset('photo-uni') },
    { caption: 'And my internship', art: 'team' as ArtKind, rot: -6, src: userAsset('photo-internship') },
  ],
}

// The statement paragraph; `{chip:n}` tokens render brand chips from `chips`.
export const statement = {
  text: 'From designing at {chip:0} to building for {br} {chip:1} and {chip:2} I’ve tasted both fast-moving {br} consumer platforms and design-driven product {br} ecosystems.',
  chips: [
    { label: 'northwind', sub: 'Studio', style: 'script' },
    { label: 'Acme', style: 'badge', img: userAsset('chip-swiggy'), h: 44 },
    { label: 'brightside', style: 'plain', img: userAsset('chip-doctor-towels'), h: 26 },
  ] as const,
}

export type Project = {
  slug: string
  title: string
  lcd: string
  highlight?: string
  accent: string
  logo: string
  mockup: MockupKind
  /** Real screenshot (src/assets/user/project-<slug>.*); falls back to `mockup`. */
  screen?: string
  /** Study mode: original console layers (src/study/original.ts). `hover` is the colour it lights up in. */
  console?: { led: string; lottie?: string; hover: 'purple' | 'orange' | 'white' }
  date: string
  client: string
  work: string
  period: string
  summary: string
  tags: string[]
  sections: { heading: string; body: string[]; figure?: MockupKind }[]
  external?: string
}

export const projects: Project[] = [
  {
    slug: 'checkout-revamp',
    screen: userAsset('project-checkout-revamp'),
    console: consoleFor('checkout-revamp', 'purple'),
    title: 'Improving a D2C brand’s checkout conversion',
    lcd: 'Improving a D2C Brand’s Checkout Conversion',
    accent: '#ffffff',
    logo: '◎',
    mockup: 'hand-phone',
    date: 'Feb 1, 2026',
    client: 'Lumen Goods',
    work: 'Product Design',
    period: 'Jan – Feb 2026',
    summary:
      'Lumen Goods is a direct-to-consumer homeware brand. The goal was to make the path from product page to payment shorter, clearer and more trustworthy on mobile.',
    tags: ['Product Design', 'E-commerce'],
    sections: [
      {
        heading: 'Introduction',
        body: [
          'Most visitors arrived on mobile from social ads, browsed one or two products and dropped off at the cart. I worked with the founders and one engineer to find out why.',
        ],
        figure: 'flow',
      },
      {
        heading: 'Approach',
        body: [
          'Session recordings, a short survey and five customer interviews pointed to three issues: surprise shipping costs, a long address form and weak trust signals near the pay button.',
          'We moved shipping estimates onto the product page, collapsed the form into a single smart address field and added delivery dates and returns information beside the CTA.',
        ],
        figure: 'phones',
      },
    ],
  },
  {
    slug: 'field-sales-app',
    screen: userAsset('project-field-sales-app'),
    console: consoleFor('field-sales-app', 'orange'),
    title: 'Improving the workflow of a field sales team: a case study',
    lcd: 'Improving the Workflow of the {Field Sales} Team: A Case Study',
    highlight: '#ff8a3d',
    accent: '#ff6a1a',
    logo: '⚑',
    mockup: 'screens',
    date: 'Aug 1, 2025',
    client: 'Acme Foods',
    work: 'Product Design',
    period: 'Jul – Aug 2025',
    summary:
      'Acme Foods runs a restaurant partnerships programme. Its account managers juggled spreadsheets, chats and three internal tools to track their partners every day.',
    tags: ['Product Design', 'Internship'],
    sections: [
      {
        heading: 'Introduction',
        body: [
          'As a product design intern I was asked to look at how account managers plan their day, follow up with partners and report performance to city leads.',
        ],
        figure: 'org',
      },
      {
        heading: 'The solution',
        body: [
          'A single mobile app that brings partner health, tasks and performance into one place, with a daily plan generated from the most urgent follow-ups.',
        ],
        figure: 'phones',
      },
    ],
  },
  {
    slug: 'admin-panel',
    screen: userAsset('project-admin-panel'),
    console: consoleFor('admin-panel', 'white'),
    title: 'Improving the admin panel experience of a study portal',
    lcd: 'Improving the Admin Panel User Experience of {Study Hub}: A Case Study',
    highlight: '#7aa8ff',
    accent: '#ff5a5a',
    logo: 'S',
    mockup: 'table',
    date: 'Aug 1, 2023',
    client: 'Study Hub',
    work: 'UX Design',
    period: 'Jun – Aug 2023',
    summary:
      'Study Hub is a student-run portal for sharing course material. Moderators were spending hours every week approving and organising uploads.',
    tags: ['UX Design', 'Student Club'],
    sections: [
      {
        heading: 'Introduction',
        body: [
          'I mapped the moderation workflow end to end and redesigned the upload queue around bulk actions, smart filters and clear statuses.',
        ],
        figure: 'table',
      },
    ],
  },
  {
    slug: 'meal-planner',
    screen: userAsset('project-meal-planner'),
    title: 'Meals: smart meal planning meets instant grocery',
    lcd: '{Meals}: Smart Meal Planning Meets Instant Grocery',
    highlight: '#ffb020',
    accent: '#5b4bf5',
    logo: 'M',
    mockup: 'grocery',
    date: 'Apr 1, 2025',
    client: 'Concept',
    work: 'Product Design',
    period: 'Mar – Apr 2025',
    summary: 'A concept that turns a weekly meal plan into a one-tap grocery order.',
    tags: ['Concept', 'Mobile'],
    sections: [
      {
        heading: 'Introduction',
        body: ['Planning meals and ordering groceries are usually two separate chores. Meals joins them into a single flow.'],
        figure: 'phones',
      },
    ],
  },
]

export const archive = [
  { title: 'Redesigning the user interface of a blog website', tags: ['UI Redesign', 'Freelance'], mockup: 'laptop-warm' as MockupKind },
  { title: 'Redesigning a project tracker to enhance UX', tags: ['UI Redesign', 'Assignment'], mockup: 'laptop-cool' as MockupKind },
]

export const books = [
  // spine colours, title colours and titles as measured on the reference
  { title: 'Refactoring UI', cover: userAsset('book-refactoring-ui'), color: '#0f1c2a', ink: '#ffffff' },
  { title: 'THE MOM TEST', cover: userAsset('book-the-mom-test'), color: '#bd002d', ink: '#d5d5d5' },
  { title: 'INSPIRED', cover: userAsset('book-inspired'), color: '#ffffff', ink: '#dfc035' },
  { title: 'Preparing for product Interviews', cover: userAsset('book-hooked'), color: '#7e1386', ink: '#edeef0' },
  { title: 'STEVE JOBS', cover: userAsset('book-steve-jobs'), color: '#ededed', ink: '#16191f' },
]

export const wisdom = {
  heading: ['Wisdom that', 'shaped me'],
  quote:
    '“Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while. That’s because they were able to connect experiences they’ve had and synthesize new things.”',
  author: 'Steve Jobs',
}

export const journey = [
  { dates: 'Apr 2022 – May 2026', role: 'Designer', org: 'Pixel Club', logoSrc: userAsset('logo-pixel-club'), text: 'Where I learned the basics of design, product thinking and UI/UX fundamentals.', logo: 'P', tile: '#ffffff', ink: '#111' },
  { dates: 'May – Jun 2025', role: 'UX Design Intern', org: 'northwind', logoSrc: userAsset('logo-northwind'), text: 'Hands-on real industry projects, mentored by senior design leaders.', logo: 'n', tile: '#5b4bf5', ink: '#fff' },
  { dates: 'Jun – Aug 2025', role: 'Product Design Intern', org: 'Acme', logoSrc: userAsset('logo-acme'), text: 'Learnt product thinking from some of the best product people around.', logo: 'A', tile: '#ff6a1a', ink: '#fff' },
  { dates: 'Feb 2026 – Present', role: 'Design Lead', org: 'Brightside', logoSrc: userAsset('logo-brightside'), text: 'Designing and shipping to live for thousands of customers.', logo: '◎', tile: '#ffffff', ink: '#111' },
]

export const worksPage = {
  heading: 'Turning Ambiguity into Clarity',
  body: 'I work across product strategy, UX, and high-fidelity visuals, helping teams turn vague problem statements into structured product directions, and craft interfaces that are both functional and visually expressive.',
  wall: {
    heading: ['Wall of', 'Visual', 'Design'],
    body: 'Beyond product interfaces, I’ve spent a lot of time creating illustrations and event posters for student communities. It sharpened my visual instincts, composition sense, and attention to detail.',
  },
  posters: [
    { title: 'HACK NIGHT', sub: 'Fri · 9 PM', bg: 'linear-gradient(160deg,#c3122f,#ff5a3c)', ink: '#ffe14d', rot: -2 },
    { title: 'DESIGN JAM', sub: 'Problem statements out', bg: 'linear-gradient(160deg,#1a8a3a,#7ad15a)', ink: '#fff', rot: 1.5 },
    { title: 'TERMINAL', sub: 'Linux install party', bg: 'linear-gradient(160deg,#5b3fd1,#a690ff)', ink: '#fff', rot: -1 },
    { title: 'RETRO LAN', sub: 'Bring your rig', bg: 'linear-gradient(160deg,#fff3c4,#ffd98a)', ink: '#1f2a44', rot: 2 },
    { title: 'CTF 26', sub: 'Capture the flag', bg: 'linear-gradient(160deg,#111,#e85d2a)', ink: '#fff', rot: -1.5 },
    { title: 'DEADLINE+', sub: 'Extended!', bg: 'linear-gradient(160deg,#e9f3ff,#a8cdf5)', ink: '#2754a8', rot: 1 },
    { title: 'SNOW CODE', sub: 'Winter programme', bg: 'linear-gradient(160deg,#dff0ff,#ffffff)', ink: '#1a5fb4', rot: 1.5 },
    { title: 'TORRENTS', sub: 'Intro to P2P', bg: 'linear-gradient(160deg,#0b1f3a,#1d7a4e)', ink: '#bfffd8', rot: -1 },
    { title: 'NIGHT RUN', sub: '5K · Campus loop', bg: 'linear-gradient(160deg,#ffcf9a,#7bb37a)', ink: '#2a1d4e', rot: 2 },
    { title: 'ALGO-RHYTHM', sub: 'Coding contest', bg: 'linear-gradient(160deg,#0e2235,#24597a)', ink: '#7fe3ff', rot: -2 },
  ],
}

export const aboutPage = {
  intro: [
    { t: 'Hey, I’m Jayesh, an engineer who turned into a ' },
    { t: 'product and visual designer', b: true },
    { t: '. I work across design and front-end, with ' },
    { t: 'a few years of hands-on experience', b: true },
    { t: ', and have had the opportunity to design for ' },
    { t: 'startups', b: true },
    { t: ' and studios.' },
  ],
  chapters: [
    {
      text: 'I’m drawn to design problems that start vague and messy. I enjoy breaking down ambiguity, asking the right questions, and shaping clarity through structure, logic, and visuals.',
      photos: [
        { caption: 'The campus', art: 'campus' as ArtKind },
        { caption: 'Discussing random stuff', art: 'team' as ArtKind },
        { caption: 'Club nights', art: 'sketch' as ArtKind },
        { caption: 'My first internship', art: 'landscape' as ArtKind },
      ],
    },
    {
      text: 'Design wasn’t always the plan. In my first year I joined a hackathon with a couple of friends and we won a special mention in the design track. That pulled me into UI, UX, and visual storytelling.',
      photos: [
        { caption: 'Helping freshers into design', art: 'team' as ArtKind },
        { caption: 'Hackathon night', art: 'band' as ArtKind },
        { caption: 'Whiteboards everywhere', art: 'sketch' as ArtKind },
        { caption: 'Demo day', art: 'portrait' as ArtKind },
      ],
    },
    {
      text: 'Besides design, I spent a big part of college on the track. Running taught me what doesn’t fit on a resume: discipline, teamwork, persistence, and staying calm when things get uncomfortable.',
      photos: [
        { caption: 'Race day', art: 'track' as ArtKind },
        { caption: 'Some medals', art: 'landscape' as ArtKind },
        { caption: 'Some discipline', art: 'track' as ArtKind },
        { caption: 'And a lot of pain', art: 'portrait' as ArtKind },
      ],
    },
    {
      heading: 'That’s all about me :)',
      text: 'When I’m not designing or running, I’m usually sketching. Back in school I also got into music. Art and music are still my go-to ways to unwind.',
      photos: [
        { caption: 'School band', art: 'band' as ArtKind },
        { caption: '', art: 'sketch' as ArtKind },
        { caption: '', art: 'guitar' as ArtKind },
        { caption: 'Hyper-realistic artwork', art: 'portrait' as ArtKind },
        { caption: '', art: 'sketch' as ArtKind },
        { caption: 'Sometimes, pastels', art: 'landscape' as ArtKind },
        { caption: '', art: 'campus' as ArtKind },
      ],
    },
  ],
}
