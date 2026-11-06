// All editable site content lives here. Everything below is sample/placeholder
// copy: replace names, dates, links and text with your own.
// Any `src` left undefined renders an original illustrated placeholder.

import type { ArtKind } from './components/PlaceholderArt'
import type { MockupKind } from './components/Mockup'
import { userAsset } from './userAssets'

// Study mode only: the reference's console renders. Without a baked LCD image (`led-<slug>`) the LCD is drawn from the project's text.
function consoleFor(slug: string, hover: 'purple' | 'orange' | 'white') {
  return userAsset('console-base-white') ? { led: userAsset(`led-${slug}`), hover } : undefined
}

export const site = {
  name: 'Aman',
  fullName: 'Aman Dixit',
  tagline: ['A Full-Stack Developer who builds products,', 'with a problem solving and engineering mindset.'],
  email: 'amandixit5102002@gmail.com',
  phone: '+91-8770923503',
  resumeUrl: '/Aman-Dixit-Full-Stack-Developer.pdf',
  footerNote: 'Made with love, late at night',
  marquee: ['Full-Stack', 'React', 'Node.js', 'Real-time', 'AWS', 'TypeScript'],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'http://www.linkedin.com/in/aman-dixit-fsd', icon: 'linkedin' },
    { label: 'Medium', href: 'https://medium.com/', icon: 'medium' },
  ] as const,
}

export const intro = {
  heading: 'Who am I?',
  body:
    'Hey, I’m Aman Dixit, a full-stack developer proficient in React.js, Node.js, Angular.js, TypeScript and JavaScript. I craft user-centric applications, enhance performance and deliver scalable, innovative solutions.',
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
  text: 'From building at {chip:0} to shipping for {br} {chip:1} and {chip:2} I’ve worked across {br} streaming, gaming and payments platforms, {br} from real-time backends to polished web apps.',
  chips: [
    { label: 'Carina', sub: 'Softlabs', style: 'script' },
    { label: 'POPIL', style: 'badge' },
    { label: 'Warvox', style: 'plain' },
  ] as { label: string; sub?: string; style: 'script' | 'badge' | 'plain'; img?: string; h?: number }[],
}

export type Project = {
  slug: string
  title: string
  lcd: string
  highlight?: string
  accent: string
  logo: string
  /** Logo drawn in the LCD instead of the `logo` glyph. */
  logoImg?: string
  mockup: MockupKind
  /** Real screenshot (src/assets/user/project-<slug>.*); falls back to `mockup`. */
  screen?: string
  /** Study mode: original console layers (src/study/original.ts). `hover` is the colour it lights up in. */
  console?: { led?: string; lottie?: string; hover: 'purple' | 'orange' | 'white' }
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
    slug: 'warvox',
    external: 'https://playwarvox-staging.vercel.app/en',
    screen: userAsset('project-warvox'),
    console: consoleFor('warvox', 'purple'),
    title: 'Warvox: a game publisher platform, localized into 10 languages',
    lcd: 'Warvox: a Game Publisher Platform in 11 Languages',
    accent: '#ffffff',
    logo: 'W',
    mockup: 'screens',
    date: 'Jun 2024 – Present',
    client: 'Carina Softlabs Inc.',
    work: 'Full-Stack Development',
    period: '2024 – Present',
    summary:
      'A 137K-line game publisher platform: a moderated community forum, Stripe commerce that delivers items into the game, entitlement-gated media and a CMS in 11 locales.',
    tags: ['Next.js', 'Node.js', 'AWS'],
    sections: [
      {
        heading: 'Translating a game platform into 10 languages',
        body: [
          'Content is translated field by field: a content hash decides which fields changed, a rate-limited queue worker batches the work, AWS Translate does the bulk and AWS Bedrock (Claude) validates game terminology.',
        ],
      },
    ],
  },
  {
    slug: 'popil',
    screen: userAsset('project-popil'),
    console: consoleFor('popil', 'orange'),
    title: 'POPIL: movies, series and music with three revenue models',
    lcd: 'POPIL: Streaming with 3 Revenue Models',
    highlight: '#ff8a3d',
    accent: '#ff6a1a',
    logo: 'P',
    logoImg: userAsset('logo-popil'),
    mockup: 'screens',
    date: 'Jun 2024 – Present',
    client: 'Carina Softlabs Inc.',
    work: 'Full-Stack Development',
    period: '2024 – Present',
    summary:
      'A 114K-line OTT and music streaming platform: subscriptions, per-title rentals and production-house payouts over one catalog, with webhook-driven Razorpay reconciliation and a LightFM recommender.',
    tags: ['Angular', 'Next.js', 'Razorpay'],
    sections: [
      {
        heading: 'Three ways to make money from one catalog',
        body: [
          'Entitlement resolves subscription tier, active rental, free flag and geo licence before a media URL is issued; payments are driven by Razorpay webhooks and payouts land in an auditable ledger.',
        ],
      },
    ],
  },
  {
    slug: 'mpl',
    external: 'https://play.google.com/store/apps/details?id=com.TechyMauGameStudios.Mpl&pcampaignid=web_share',
    screen: userAsset('project-mpl'),
    console: consoleFor('mpl', 'white'),
    title: 'MPL: the real-time backend of a multiplayer cricket game',
    lcd: 'MPL: a Real-Time Multiplayer Cricket Backend',
    highlight: '#7aa8ff',
    accent: '#ff5a5a',
    logo: 'M',
    mockup: 'screens',
    date: 'Jun 2024 – Present',
    client: 'Carina Softlabs Inc.',
    work: 'Backend Architecture',
    period: '2024 – Present',
    summary:
      'Socket.IO match engines, matchmaking, tournament brackets with playoff tie-breaking and Redis leaderboards, built against a 974-line socket contract that a separate Unity team integrated with.',
    tags: ['Socket.IO', 'Redis', 'Docker'],
    sections: [
      {
        heading: 'A socket contract two teams could build against',
        body: [
          'The contract came before the engine: every event, payload and failure path was specified first, so integration with the Unity client was verification, not negotiation.',
        ],
      },
    ],
  },
  {
    slug: 'rolegate',
    external: 'https://www.npmjs.com/package/@rolegate/express',
    screen: userAsset('project-rolegate'),
    console: consoleFor('rolegate', 'purple'),
    title: 'Rolegate: a type-safe authorization library on npm',
    lcd: 'Rolegate: Type-Safe RBAC on {npm}',
    highlight: '#c792ea',
    accent: '#ffffff',
    logo: 'R',
    mockup: 'screens',
    date: 'Open source',
    client: 'Open source',
    work: 'Library design',
    period: 'MIT licensed',
    summary:
      'An open-source, type-safe RBAC library published on npm as a dual-package pnpm monorepo (@rolegate/core, @rolegate/express), with 95% coverage thresholds and an automated release pipeline.',
    tags: ['TypeScript', 'npm', 'RBAC'],
    sections: [
      {
        heading: 'Invalid permissions fail at compile time',
        body: [
          'TypeScript const generics infer permission and role unions from config, and a discriminated AuthorizationDecision returns typed denial reasons instead of a boolean.',
        ],
      },
    ],
  },
]

export const archive: { title: string; tags: string[]; mockup: MockupKind }[] = []

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
  { dates: 'Aug – Nov 2023', role: 'MERN Stack Trainee', org: 'Dollop', text: 'Dollop Infotech Pvt. Ltd.: algorithmic problem-solving and optimized data structures in C and C++, and responsive, accessible ReactJS interfaces.', logoSrc: userAsset('logo-dollop'), mark: true, logo: 'D', tile: '#ffffff', ink: '#111' },
  { dates: 'Dec 2023 – May 2024', role: 'Full-Stack Developer Intern', org: 'DevBazaar', text: 'Developer Bazaar Technologies: ReactJS with PHP, Tailwind CSS and Bootstrap, plus Ethereum token-conversion and transaction workflows with MetaMask, Suiet and Phantom.', logoSrc: userAsset('logo-devbazaar'), mark: true, logo: 'D', tile: '#ffffff', ink: '#111' },
  { dates: 'Jun 2024 – Present', role: 'Full-Stack Developer', org: 'Carina', text: 'Carina Softlabs Inc.: a 114K-line streaming platform with three revenue models, a real-time multiplayer game backend and a 137K-line game publisher platform.', logoSrc: userAsset('logo-carina'), mark: true, logo: 'C', tile: '#ffffff', ink: '#111' },
] as { dates: string; role: string; org: string; text: string; logo: string; tile: string; ink: string; logoSrc?: string; mark?: boolean }[]

/** Everything else on the resume: summary, skills and the open-source project. */
export const resume = {
  summary:
    'Experienced Full Stack Developer proficient in React.js, Node.js, Angular.js, TypeScript, and JavaScript. Excels in crafting user-centric applications, enhancing performance, and delivering scalable, innovative solutions. Passionate about building intuitive and efficient web experiences.',
  skills: [
    { label: 'Languages', items: ['HTML5', 'CSS', 'SCSS', 'JavaScript (ES6+)', 'TypeScript'] },
    {
      label: 'Frameworks',
      items: ['React.js', 'Node.js', 'Angular.js', 'Express.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Shadcn UI', 'GSAP', 'Framer Motion', 'Three.js', 'Socket.IO', 'TanStack Query'],
    },
    { label: 'Databases', items: ['MongoDB', 'PostgreSQL', 'Redis'] },
    { label: 'Developer tools', items: ['Git', 'Postman', 'VS Code', 'BitBucket', 'Webpack', 'RESTful APIs', 'Chrome DevTools'] },
    { label: 'Cloud & payments', items: ['AWS (EC2, S3, IAM, MediaConvert, Bedrock)', 'Docker', 'Stripe', 'Razorpay', 'Hostinger'] },
  ],
  project: {
    title: 'Rolegate',
    subtitle: 'Type-Safe Authorization Library (npm)',
    href: 'https://www.npmjs.com/package/@rolegate/express',
    summary:
      'Published an open-source, type-safe RBAC library as a dual-package pnpm monorepo (@rolegate/core, @rolegate/express), distributed on npm under the MIT license.',
    points: [
      'Leveraged TypeScript const generics to infer permission and role unions directly from config, turning invalid permission strings into compile-time errors instead of silent runtime denials.',
      'Designed a discriminated AuthorizationDecision type that returns typed denial reasons instead of a boolean, and implemented role inheritance, wildcard grants, and sync/async role resolution.',
      'Enforced 95% coverage thresholds with 100% branch coverage on the core engine, including type-level tests and a packaging smoke test that validates the published tarball actually installs.',
      'Automated the release pipeline with Changesets and GitHub Actions across three CI workflows, shipping dual ESM/CJS builds with Express 4 and 5 middleware support.',
    ],
  },
}

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
    { t: 'Hey, I’m Aman, an engineer who turned into a ' },
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
