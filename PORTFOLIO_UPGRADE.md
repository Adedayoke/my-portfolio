# Portfolio Upgrade — Master Plan

> Reference document for the full portfolio overhaul.  
> Check off items as they are completed.

---

## Tech Stack Additions

| Package | Version | Purpose |
|---|---|---|
| `three` | latest | WebGL scene graph |
| `@react-three/fiber` | latest | React renderer for Three.js |
| `@react-three/drei` | latest | Three.js helpers (Float, Sparkles, etc.) |
| `@react-three/postprocessing` | latest | SSAO, Bloom, ChromaticAberration on canvas |
| `framer-motion` | latest | All motion: scroll-linked, entrance, gesture, spring |
| `lenis` | latest | Butter-smooth scroll, replaces browser default |

> All Three.js components are `dynamic(() => import(...), { ssr: false })` — never block server render.

---

## Content Updates (from Resume)

### Experience — all 7 jobs, most recent first:

| # | Company | Role | Period |
|---|---|---|---|
| 1 | **Bloom AI** | Full-stack Developer | Jul 2026 – Present |
| 2 | **LASU CBT18** | Frontend Dev Instructor | Nov 2024 – Sep 2026 |
| 3 | **Viigo** | Mobile Developer (Contract) | Mar 2026 – Aug 2026 |
| 4 | **ORR Solutions** | Frontend Developer (Contract) | Dec 2025 – Mar 2026 |
| 5 | **HNG** | Backend Track Intern | Oct 2025 – Dec 2025 |
| 6 | **Kloud6 Technologies** | Full-Stack Developer | Nov 2024 – Oct 2025 |
| 7 | **Jechres** | Frontend Developer (Contract) | Apr 2024 – Nov 2024 |

Role color-coding: Full-Stack = accent blue · Mobile = purple · Frontend = teal · Backend = orange · Instructor = green

### Bloom AI bullets:
- Built responsive dashboard interfaces for product, order, and cart management using Next.js, TypeScript, Tailwind CSS, and Zustand, integrating real-time backend state with responsive UI flows.
- Built Telegram channel integration across the frontend and backend — real-time WebSocket flows for QR authentication, OTP, 2FA, connection status updates, and session reconnection using Redis Pub/Sub and BullMQ workers.
- Developed commerce functionality for products, orders, and carts: product CRUD, bulk CSV imports with SKU deduplication, transactional cart operations, order management, payment history, and dashboard metrics.

### Viigo bullets:
- Built and shipped the core booking marketplace powering Viigo's two-sided platform (gym owners and users) using React Native and Expo — GPS discovery, live slot pricing, and Razorpay payment integration; published to the Google Play Store.
- Designed the hourly slot-selection and live-pricing flow with automated test coverage for shared booking logic, identifying pricing and availability issues before release.
- Implemented JWT authentication with automatic token refresh, Google OAuth, and OTP login with persistent sessions.

### ORR Solutions bullets:
- Built a responsive, real-time financial analytics dashboard using TypeScript, Zustand, and Recharts — reusable data visualization and table components for scalable feature development.
- Implemented frontend security controls including RBAC, CSRF protection, and XSS prevention, validating protections against common attack vectors.
- Built a rich-text CMS, calendar-integrated meeting scheduler, and audit-logging system for enterprise/regulated clients.

### HNG bullets:
- Built the API Gateway and Authentication microservices within a 5-service distributed notification system (NestJS, RabbitMQ, PostgreSQL) — circuit breakers and retry logic validated by tests.
- Built an asynchronous image-processing service (NestJS, BullMQ) — background queues for resize/compress/thumbnail generation so uploads stay fast.
- Developed a crypto risk-assessment agent (TypeScript, Groq AI/Llama 3.3 70B, CoinGecko API) — automated real-time risk scoring.

### Kloud6 Technologies bullets:
- Built and maintained a full-stack LMS for programming education across Nigeria — 60+ features across responsive learning interfaces, assessments, payments, and live/recorded class experiences using React.js, Next.js, Node.js, and PostgreSQL.
- Integrated Stripe payment flows with access-code generation and automated PDF invoicing.
- Implemented Jest tests covering assessment and learning experience workflows.
- Redesigned the company website — user engagement +25%, conversion rates +35%, Google Lighthouse 92+ across all metrics.

### LASU CBT18 bullets:
- Developed and taught a structured Frontend Web Development curriculum covering HTML, CSS, and JavaScript.
- Created and assigned multiple capstone projects throughout the program to reinforce concepts and build practical mastery.

### Jechres bullets:
- Built responsive e-commerce interfaces for a clothing marketplace using React.js and Tailwind CSS.
- Implemented server-state management and data fetching with TanStack React Query, integrating frontend components with backend APIs.

---

## Phase 0 — Foundation [ ]

### 0.1 — Install packages [ ]
```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion lenis
npm install --save-dev @types/three
```

### 0.2 — `lib/motion.ts` — Shared animation variants [ ]
Central file. Every component imports from here. Never define framer-motion variants inline.

```ts
// fadeUp, fadeIn, stagger container, clipReveal, scaleIn
// All variants check useReducedMotion() — if true, return { opacity: 1 }
```

Key variants to define:
- `fadeUp` — `opacity: 0, y: 20` → `opacity: 1, y: 0`, cubic easeOut
- `fadeIn` — opacity only
- `clipReveal` — `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)` — line-by-line text reveal
- `staggerContainer` — parent with `staggerChildren: 0.08`
- `cardEntrance` — fade + translateY for Work cards
- `scaleIn` — `scale: 0.92, opacity: 0` → `scale: 1, opacity: 1`

### 0.3 — `components/LenisProvider.tsx` [ ]
Client component. Initializes Lenis, runs RAF loop, syncs framer-motion's `useScroll` via `lenis.on('scroll', () => ScrollTicker.update(e.time))`. Wraps children. Respects `prefers-reduced-motion` — if user prefers reduced motion, skip Lenis initialization entirely.

### 0.4 — `components/Cursor.tsx` [ ]
Custom cursor with two DOM elements:
- `cursor-dot` (6×6px solid circle, immediate, `pointer-events: none`)
- `cursor-ring` (32×32px hollow ring, lagged via exponential approach in RAF loop)

Behavior:
- Ring approaches dot position using `ring += (dot - ring) * 0.12` per RAF frame
- On hover over `a`, `button`, `.tilt-card`: ring scales to 1.8×, color shifts to `--accent`
- On `mousedown`: ring compresses to 0.7×
- `mix-blend-mode: difference` on dot — visually inverts against any background
- Hide both elements on mobile (`matchMedia("(pointer: coarse")`)
- Set `cursor: none` on `:root` in CSS

### 0.5 — `components/ScrollProgress.tsx` [ ]
A 1–2px line at the very top of the viewport (above the Nav). `scaleX` driven by framer-motion `useScroll` with `transformOrigin: "left"`. Gradient from `--accent` to `--success`. `position: fixed, top: 0, z-index: 100`.

### 0.6 — `app/globals.css` updates [ ]
- Add CSS noise texture via inline SVG `feTurbulence` filter on `body::after` (fixed, full-screen, `opacity: 0.025`, `pointer-events: none`) — creates film grain depth
- Add `cursor: none` to `:root` (after Cursor component)
- New `@keyframes scroll-left` and `@keyframes scroll-right` for marquee
- New `@keyframes float` — sine wave `translateY(-6px)` used on floating elements
- Remove old `.fade-up` CSS class (framer-motion owns all motion now)
- Add `contain: layout style` to `.section-container` utility class

### 0.7 — `app/layout.tsx` updates [ ]
- Wrap children with `<LenisProvider>`
- Add `<Cursor />` before children (renders above everything)
- Add `<ScrollProgress />` before children

---

## Phase 1 — Hero (WOW moment) [ ]

### Visual design
Full-viewport section. Two layers:
1. **Background**: Three.js WebGL canvas — GLSL shader plane + particle network
2. **Foreground**: Animated headline, subtext, CTAs, time display

### 1.1 — `components/HeroCanvas.tsx` (dynamic import, ssr: false) [ ]
React Three Fiber scene:

**Layer A — Shader background plane:**
- `PlaneGeometry` sized to fill viewport (`useThree` viewport size)
- Custom `ShaderMaterial` with:
  - Vertex shader: pass `vUv` to fragment
  - Fragment shader (GLSL):
    - `snoise(vec3(uv * 2.5, time * 0.25))` — simplex noise for organic flowing shapes
    - Two octaves of noise for complexity
    - Mix `--bg` and `--accent` at low opacity (0.06–0.10) — creates subtle glowing shapes
    - `mouse` uniform (vec2): a `smoothstep` radial glow at cursor UV position, +0.04 intensity
  - Uniforms: `time` (float, updated every frame), `mouse` (vec2, updated on mousemove)
  - `depthWrite: false`, `transparent: true`
- The plane is positioned behind everything at Z = -1

**Layer B — Particle network:**
- ~500 particles using `InstancedMesh` (single draw call, GPU-efficient)
- Each particle: random position within a `[-3, 3]` box, random velocity `[−0.001, 0.001]` per axis
- Every frame: update positions, wrap around bounds
- Connect nearest particle pairs (distance < 1.2) with `Line2` segments, opacity inversely proportional to distance
- On mouse move: particles within 0.8 units of cursor ray are pulled toward it with `lerp` (spring back when cursor leaves)
- Particle color: `--accent` at 0.7 opacity
- Line color: `--accent` at 0.15 opacity

**Postprocessing (via `@react-three/postprocessing`):**
- `<Bloom>` — luminanceThreshold: 0.8, intensity: 0.4 — makes bright particles glow
- `<ChromaticAberration>` — offset: [0.0003, 0.0003] — very subtle RGB split at edges

**Performance guards:**
- Pause RAF when tab is backgrounded (`document.visibilitychange`)
- Cap `devicePixelRatio` at 2
- On mobile (matchMedia pointer:coarse): disable mouse interaction, reduce particle count to 200

### 1.2 — `components/Hero.tsx` rewrite [ ]

**Scroll-linked parallax (3 layers):**
```
useScroll({ target: section }) + useTransform(scrollYProgress, [0, 1], ...)
```
- Canvas: Y = `scrollYProgress * 0 ` (fixed in place — it's the background)
- Headline group: Y = `scrollYProgress * -60px` (moves up slower than scroll)  
- Buttons group: Y = `scrollYProgress * -100px` (moves up faster — creates depth)

**Text entrance (on mount):**
- Headline "Software Engineer." is split into individual characters
- Each character wrapped in `<motion.span>` with `clipReveal` variant, staggered 25ms per char
- Monospace font, character count ~19 — total entrance ~500ms
- After headline completes, subtext fades up (400ms delay)
- After subtext, buttons scale in (600ms delay)

**Magnetic CTAs:**
- "view work →" and "get in touch" buttons use `useMagnet` hook
- When cursor enters 60px radius: button translates toward cursor (max 18px)
- Uses `useMotionValue` + `useSpring` for smooth return
- `mix-blend-mode` shift on the primary button for visual feedback

**Scroll indicator:**
- A small animated chevron (↓) at the bottom center of the hero
- Bounces on a `float` keyframe loop
- `opacity: 0` after 3s or after user scrolls 5px (whichever comes first)
- Disappears via `useScroll` + `useTransform` — natural fade

**Content:**
- Retain the live Lagos time in WAT diff format (existing logic)
- Add a subtle `// habeeb oke` label above the headline
- Subtext: "I don't just write code. I solve problems other people give up on."
- CTAs: "view work →" (primary) and "get in touch" (ghost)

---

## Phase 2 — Skills Marquee (new section) [ ]

Inserted between About and Work. `id="skills"` added to StatusRail.

### 2.1 — `components/Skills.tsx` [ ]

**Layout:** Two horizontal rows, each is a duplicated list for seamless loop.
- Row 1: scrolls left, speed: 35s per cycle
- Row 2: scrolls right, speed: 50s per cycle (feels different = natural)
- On `hover` of the row: `animation-play-state: paused`
- Pure CSS `@keyframes scroll-left/right` — zero JS

**Chips per row:**

Row 1 (Languages + Frontend):
`JavaScript` `TypeScript` `React.js` `Next.js` `Vue.js` `React Native` `Tailwind CSS` `Styled-Components` `HTML5` `CSS3` `Zustand` `Redux`

Row 2 (Backend + Tools + Mobile):
`Node.js` `Express.js` `NestJS` `PostgreSQL` `MongoDB` `Prisma ORM` `Redis` `BullMQ` `RabbitMQ` `Docker` `Expo` `Jest` `Solana Pay` `Razorpay` `Stripe` `Git` `Vercel`

**Chip design:** Monospace text, `border border-border`, `bg-bg-raised`, subtle `text-ink-muted`. Accent chips (e.g. highlight React, TypeScript) get `border-accent/40 text-accent` treatment.

**Section header:** `// tech stack` in accent monospace, followed by a line divider. No large `<h2>` — keep it understated.

---

## Phase 3 — Work / Projects [ ]

### 3.1 — 3D tilt cards [ ]

**`lib/hooks/useTilt.ts`:**
```ts
// Accepts ref to card element
// Returns { rotateX, rotateY, shine } as MotionValues
// On mousemove: compute angle from card center (max ±12deg)
// useSpring(rawValue, { stiffness: 300, damping: 25 }) for smoothing
// On mouseleave: spring to 0
```

Each project card:
- `motion.div` with `style={{ rotateX, rotateY, transformPerspective: 800 }}`
- `transform-style: preserve-3d`
- Inner `.shine` layer: `radial-gradient` that follows mouse, `opacity: 0.08`, like a holographic card
- On hover: a subtle `box-shadow` with accent color bleeds outward (the "glow" effect)

### 3.2 — Animated gradient border on hover [ ]
On `.tilt-card:hover`:
```css
background: conic-gradient(from var(--angle), transparent 30%, var(--accent) 50%, transparent 70%);
```
`@property --angle` + `@keyframes rotate-angle` → the gradient rotates around the border.
Mask with `padding-box` to show only the border area.

### 3.3 — Staggered scroll reveal [ ]
- `motion.div` wrapper around the grid
- Children use `staggerContainer` variant with `whileInView` + `viewport={{ once: true, margin: "-10%" }}`
- `cardEntrance` variant: `opacity 0→1, y 30→0`, cubic easeOut
- 120ms stagger between cards

### 3.4 — Content updates [ ]
- Keep existing 5 projects
- Optionally add Bloom AI dashboard as a new entry (internal tool)
- Ensure Viigo shows "Published to Google Play Store" in description

---

## Phase 4 — Experience Timeline [ ]

### 4.1 — Animated vertical timeline line [ ]

**Mechanism:**
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start 80%", "end 20%"]
});
const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
```
A `<motion.div>` tall line on the left, `scaleY` animated, `transformOrigin: "top"`. The line draws itself as the section scrolls through the viewport.

**Connector dots:** Each job entry has a circle on the timeline. It uses `useInView` to fade + scale in when its position is reached.

### 4.2 — Job entry structure [ ]

Each entry:
```
[dot on timeline]
  [role tag chip] [company name] [dates]
  [location · type]
  [2–3 visible bullets]
  [show more / collapse toggle]
```

Show more toggle: `motion.div` with `height: 0 → auto` using `AnimatePresence` + `motion.div` height animation. Framer-motion handles the smooth expand.

### 4.3 — Role tags [ ]
```
Full-Stack  → bg-accent/10 text-accent border-accent/30
Mobile      → bg-purple-500/10 text-purple-400 border-purple-500/30
Frontend    → bg-teal-500/10 text-teal-400 border-teal-500/30
Backend     → bg-orange-500/10 text-orange-400 border-orange-500/30
Instructor  → bg-green-500/10 text-green-400 border-green-500/30
```

### 4.4 — Scroll reveal per entry [ ]
Each job `motion.div` uses `whileInView` with `fadeUp` variant, `viewport: { once: true, margin: "-15%" }`. Stagger 80ms between entries.

---

## Phase 5 — About Section [ ]

### 5.1 — Journey path visualization [ ]

Below the existing personal text, a horizontal SVG path connecting 5 milestone nodes:
```
● Frontend  ──────  ● Mobile  ──────  ● Backend  ──────  ● Full-Stack  ──────  ● AI/ML
```

**Animation:**
- The SVG `<path>` uses `pathLength` as a framer-motion value, animated from 0 to 1 when in view (`useInView` trigger)
- Duration: 1.2s, easeInOut
- Each milestone dot fades in sequentially as the path "reaches" it (delay = node position * 1.2s)
- On hover over a node: tooltip-style label appears with role count or year range

### 5.2 — Stats mini-row [ ]

A 4-column strip between the personal text and journey path:

| Stat | Value |
|---|---|
| Experience | 3+ years |
| Companies | 7 |
| Features shipped | 60+ |
| Lighthouse score | 92+ |

**Animation:** Each number uses a count-up animation:
- `useMotionValue` starting at 0
- `animate` to final value over 1.5s with `ease: "easeOut"` when `useInView` triggers
- `useTransform` to format as string (add `+` suffix etc.)

### 5.3 — Scroll reveals for paragraphs [ ]
Each `<p>` in About uses `clipReveal` variant — text revealed from bottom by a rising clip-path mask. More dramatic than a simple fade.

---

## Phase 6 — Now Section [ ]

### 6.1 — Content update [ ]
- Update "What I'm building" to lead with **Bloom AI** (current role since Jul 2026)
- Update graduation mention — now graduated
- Keep the personal voice and honesty intact

### 6.2 — Visual enhancements [ ]
- Each subsection (`What I'm building`, `What I'm learning`, etc.) uses `fadeUp` with `whileInView`
- The "Bloom" strong tag gets a subtle underline in accent color
- A small "currently at" badge at the top of the Now section: `● Bloom AI · Full-stack Dev` with a pulse animation on the dot

---

## Phase 7 — Contact Section [ ]

### 7.1 — Floating label inputs [ ]
Replace current static labels with CSS floating labels:
- On focus OR when field has value: label slides up and shrinks (`transform: translateY(-1.2rem) scale(0.75)`)
- Smooth `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- Label color shifts to `--accent` on focus

### 7.2 — Magnetic submit button [ ]
Apply `useMagnet` to the submit button. When cursor comes within 80px: button moves toward cursor (max 20px displacement, spring back on leave).

### 7.3 — Scroll reveal [ ]
Left column (links) and right column (form) use `fadeUp` with `whileInView`, offset 100ms between columns.

---

## Phase 8 — Nav + StatusRail polish [ ]

### 8.1 — Nav logo hover effect [ ]
`native.dev` — on hover, each character in `native` randomly shuffles through ASCII chars before settling back on the real letter (scramble effect). Pure JS, ~20 lines. Triggered by `mouseenter`, completes in 400ms.

### 8.2 — Nav links underline animation [ ]
Replace hover color change with a sliding underline: a `<motion.span>` underline that `layoutId="nav-underline"` moves between active links. Shared layout animation via framer-motion.

### 8.3 — StatusRail update [ ]
- Add `{ id: "skills", label: "SKILLS" }` between about and work
- Add `{ id: "experience", label: "EXP" }` (already exists, keep)
- The active dot gets a subtle `boxShadow` pulse keyframe in accent color

---

## Phase 9 — About Page (`/about`) [ ]

### 9.1 — Page enter animation [ ]
The page wrapper uses `motion.main` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` and a `transition={{ duration: 0.4 }}`. 

### 9.2 — Reading progress bar [ ]
A fixed progress bar at the very top of `/about` (separate from main site's ScrollProgress). Tracks scroll of the article specifically.

### 9.3 — Paragraph reveals [ ]
Each `<p>` uses `clipReveal` variant with `whileInView`, staggered by 60ms. Reading the page feels like the text materializes as you go.

---

## Phase 10 — Global Polish [ ]

### 10.1 — `prefers-reduced-motion` [ ]
All framer-motion variants check `useReducedMotion()`. If true: return `{ opacity: 1, y: 0, clipPath: "none" }` — no motion. Three.js canvas: show a static gradient fallback (pure CSS). Cursor: hide entirely, restore system cursor.

### 10.2 — Footer update [ ]
```
colophon: nextjs · tailwind · framer-motion · three.js · jetbrains mono + inter
```

### 10.3 — Nav links [ ]
Add `experience` anchor to the Nav.

### 10.4 — `app/page.tsx` [ ]
Insert `<Skills />` between `<About />` and `<Work />`.

---

## File Change Map

### New files:
- `components/HeroCanvas.tsx` — Three.js scene (dynamic, ssr:false)
- `components/Skills.tsx` — Marquee section
- `components/Cursor.tsx` — Custom cursor
- `components/LenisProvider.tsx` — Smooth scroll
- `components/ScrollProgress.tsx` — Top progress bar
- `lib/motion.ts` — Shared variants
- `lib/hooks/useMagnet.ts` — Magnetic hook
- `lib/hooks/useTilt.ts` — 3D tilt hook

### Modified files:
- `app/layout.tsx` — Add LenisProvider, Cursor, ScrollProgress
- `app/page.tsx` — Add Skills section
- `app/globals.css` — Noise texture, new keyframes, cursor:none, marquee keyframes
- `app/about/page.tsx` — Enter animation, paragraph reveals, reading progress
- `components/Hero.tsx` — Full rewrite (canvas bg, split-char animate, parallax, magnetic CTAs)
- `components/About.tsx` — Journey path, stats row, clip reveals
- `components/Work.tsx` — 3D tilt, gradient border, stagger reveal
- `components/Experience.tsx` — Full timeline, all 7 jobs, animated line
- `components/Now.tsx` — Content update + scroll reveals
- `components/Contact.tsx` — Floating labels, magnetic submit
- `components/Nav.tsx` — Scramble logo, layout underline, experience link
- `components/StatusRail.tsx` — Add skills, dot pulse
- `components/Footer.tsx` — Update colophon

---

## Execution Order

- [ ] **Phase 0** — Install packages, foundation files (motion.ts, LenisProvider, Cursor, ScrollProgress, globals.css updates)
- [ ] **Phase 1** — Hero (HeroCanvas WebGL + rewrite Hero.tsx)
- [ ] **Phase 2** — Skills marquee (new component + add to page.tsx + StatusRail)
- [ ] **Phase 3** — Work cards (useTilt, gradient border, stagger)
- [ ] **Phase 4** — Experience (full timeline, all 7 jobs, animated line draw)
- [ ] **Phase 5** — About (journey path, stats, clip reveals)
- [ ] **Phase 6** — Now (content update + reveals)
- [ ] **Phase 7** — Contact (floating labels, magnetic button)
- [ ] **Phase 8** — Nav + StatusRail polish
- [ ] **Phase 9** — About page (/about) enhancements
- [ ] **Phase 10** — Global polish, prefers-reduced-motion audit, footer, final pass

---

## Performance Constraints (non-negotiable)

1. Three.js canvas: `dynamic(() => import(...), { ssr: false })` + `<Suspense fallback={null}>`
2. All animated properties must be `transform` or `opacity` only — no layout/paint reflow
3. `will-change: transform` applied dynamically (add on IO entry, remove on exit) — not statically
4. Canvas `devicePixelRatio` capped at `Math.min(window.devicePixelRatio, 2)`
5. RAF paused on `document.visibilitychange` (hidden)
6. Scroll event listeners: `{ passive: true }` everywhere
7. Lenis + framer-motion: sync via `lenis.on('scroll', ScrollTicker.update)` so `useScroll` works correctly
8. Mobile fallbacks: disable cursor, reduce particle count, disable mouse tracking, respect `pointer: coarse`
9. `contain: layout style` on Work grid and Experience section to isolate reflow
10. Lighthouse target: maintain 90+ performance score after all additions

---

## Key Design Decisions

- **Keep the existing design language** — dark theme, monospace, minimal. The WOW factor comes from depth and motion layered on top, not a redesign.
- **Accent color (#5b8def)** is the primary motion color — glows, lines, active states all use it
- **Everything must degrade gracefully** — if JS fails, the site still renders with clean HTML/CSS
- **No animation should feel gimmicky** — every motion must have a purpose (guide attention, communicate state, show depth)
- **The visitor should feel the portfolio was built by someone who cares about craft** — not just someone who installed libraries

---

## Anti-AI-Design Rules (NON-NEGOTIABLE)

These apply to every line of CSS, every shader, every color decision:

### Colors
- **No purple, violet, or indigo** (#7c3aed, #8b5cf6, #6366f1, etc.) — they're the defining AI aesthetic
- **No neon cyan or neon green** — the "hacker" cliché
- **No rainbow or multicolor anything** — no multi-stop gradients that cycle through hues
- **No pink-to-purple or blue-to-purple gradients** — the LLM landing page look
- Palette stays: near-black bg, warm dark grays, single blue accent (#5b8def), success green for status only

### Gradients
- **No colorful mesh gradients** (animated blobs in multiple colors)
- **No glassmorphism** with saturated color bleeds behind it
- If a gradient is used: it's either **one color fading to transparent** or **bg → slightly lighter bg** — never two distinct hues
- The GLSL shader in the hero creates **depth and texture**, not a color show — near-monochromatic, very subtle opacity (≤ 0.08 of accent color)

### Effects
- **No `ChromaticAberration` postprocessing** — looks like a cheap Instagram filter
- **Bloom only at very low intensity** (≤ 0.3) — visible glow on bright particles only, not the whole scene
- **No rainbow/holographic shine layer** on cards — the tilt + single-color radial highlight is enough
- **The conic-gradient border animation** stays **single accent color**, not a color wheel
- Custom cursor: plain dot + ring, no color inversion (`mix-blend-mode: difference` removed) — just solid accent

### Three.js / WebGL
- Particle network: monochromatic — `--ink-faint` (#4a5163) for lines, `--accent` (#5b8def) for particle dots at ≤ 0.5 opacity. No other colors.
- Shader background: the noise-based displacement creates **form**, not color. Mix only between `--bg` (#0b0e14) and a slightly lighter version of it. The accent color appears as a barely-there atmospheric glow at the cursor only.

### Overall philosophy
The WOW comes from **technical precision, smooth motion, and spatial depth** — not from color spectacle. A visitor should notice "this feels alive and crafted" before they notice any individual color. If the first thing you see is a colorful gradient, we've failed.
