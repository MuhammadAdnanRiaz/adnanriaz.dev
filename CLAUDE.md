@AGENTS.md

# Adnan's Portfolio — adnanriaz.dev

Personal portfolio website for Adnan (full-stack web & mobile developer). Built to attract freelance clients and convert traffic into leads.

**Repo:** `git@github.com:MuhammadAdnanRiaz/adnanriaz.dev.git`

---

## Tech Stack

- **Next.js 16** (App Router, static export via `output: 'export'`)
- **Tailwind CSS v4** (CSS-first config via `@theme inline` in `globals.css` — NO `tailwind.config.js`)
- **Framer Motion** (scroll-triggered reveals, hover effects, spring interactions)
- **Lenis** (smooth scrolling)
- **next-themes** (dark/light toggle, `attribute="data-theme"`, default dark)
- **React Hook Form + Zod v4** (contact form validation)
- **Lucide React** (icons, tree-shakeable)
- **Self-hosted fonts** (Space Grotesk + Manrope woff2 in `public/fonts/`)

---

## Architecture

### Project Structure

```
src/
├── app/
│   ├── globals.css        # ALL design tokens, @theme, @font-face, utilities
│   ├── layout.tsx         # Root layout: ThemeProvider > LenisProvider, metadata, JSON-LD
│   └── page.tsx           # Single landing page composing all sections
├── components/
│   ├── layout/            # navbar.tsx, footer.tsx
│   ├── sections/          # hero, services, case-studies, blog, skills-marquee, contact
│   ├── ui/                # button, badge, terminal-widget, theme-toggle
│   └── providers/         # theme-provider.tsx, lenis-provider.tsx
└── lib/
    ├── constants.ts       # ALL static data (siteConfig, navLinks, projects, blog, etc.)
    ├── animations.ts      # Reusable Framer Motion variant objects
    └── schemas.ts         # Zod validation schemas
```

### Key Patterns

- **Static data lives in `src/lib/constants.ts`** — never hardcode text in components. All site content (projects, blog posts, services, skills, nav links, social links, terminal text) is centralized there.
- **`siteConfig`** contains name, brand, title, description, url, email, location — referenced by layout.tsx metadata, navbar, footer, contact section.
- **Framer Motion variants live in `src/lib/animations.ts`** — import `fadeInUp`, `fadeIn`, `staggerContainer`, `scaleIn`, `slideInLeft`, `slideInRight`, `heroStagger` from there. Don't create one-off animation objects in components.
- **Server vs Client components:** `page.tsx` and `layout.tsx` are server components. All section/UI components with interactivity use `"use client"`.
- **No API routes** — this is a static export. Forms submit to external endpoints (Formspree/Web3Forms). The contact form currently logs to console as a placeholder.

---

## Design System — "The Kinetic Architect"

### Creative Direction

High-velocity digital terminal aesthetic. Rejects boxed-in layouts — uses intentional asymmetry, high-contrast typography, overlapping layers, and generous whitespace. Feels like a live IDE: fast, precise, and technically dense.

### Critical Design Rules

1. **NO 1px solid borders for sectioning.** Define section boundaries through background color shifts only (e.g., `bg-surface` to `bg-surface-container-low`). This is a core design principle.
2. **Ghost borders only** where a border is needed: use the `.ghost-border` utility (1px solid outline-variant at 15% opacity).
3. **No standard drop shadows.** Use tonal layering (surface hierarchy) or `.ambient-shadow` / `.ambient-shadow-lg` for floating elements.
4. **Gradient CTAs, not flat colors.** Primary buttons use `.gradient-cta` (linear-gradient 135deg from `--primary` to `--primary-container`). Text color on gradient buttons is `text-on-primary-fixed`.
5. **Glassmorphism for floating elements.** Use `.glass` (navbar, overlays) or `.glass-card` (contact form, cards). Both use `backdrop-filter: blur()` with semi-transparent backgrounds.
6. **Two roundedness values max per component.** Use `rounded-lg` (0.5rem) for containers, `rounded-xl` (0.75rem) for cards, `rounded-full` for chips/pills.

### Color System

Colors are defined as CSS variables in `globals.css` (`:root` for dark, `[data-theme="light"]` for light) and mapped to Tailwind via `@theme inline`. Always use the semantic Tailwind classes, never raw hex values.

**Surface Hierarchy (dark):**
| Level | Token | Hex | Usage |
|---|---|---|---|
| Base | `bg-surface` | `#0b0e14` | Page background |
| Section | `bg-surface-container-low` | `#10131a` | Alternating section bg |
| Card | `bg-surface-container-high` | `#1c2028` | Cards, interactive areas |
| Floating | `bg-surface-container-highest` | `#22262f` | Tooltips, dropdowns |
| Deepest | `bg-surface-container-lowest` | `#000000` | Input fields |

**Accents:**
| Token | Dark | Light | Usage |
|---|---|---|---|
| `text-primary` | `#aaffdc` | `#006c51` | Primary accent, links |
| `text-secondary` | `#00cffc` | `#00677f` | Secondary accent |
| `text-primary-container` | `#00fdc1` | `#00FFC2` | Gradient end |
| `text-on-surface` | `#ecedf6` | `#161a21` | Main text |
| `text-on-surface-variant` | `#a9abb3` | `#45484f` | Muted text |
| `text-outline` | `#73757d` | `#73757d` | Metadata, dates |

### Typography

| Use | Font | Tailwind Class |
|---|---|---|
| Headlines, display, nav | Space Grotesk | `font-display` |
| Body, labels, paragraphs | Manrope | `font-body` (default) |

- Headlines: tight `tracking-tighter`, bold
- Labels/metadata: `text-xs uppercase tracking-widest font-bold`
- Body: `text-lg` or `text-xl`, `leading-relaxed`

### Custom Utility Classes (defined in globals.css)

| Class | Purpose |
|---|---|
| `.glass` | Glassmorphic panel (60% surface-container-high, blur-20px) |
| `.glass-card` | Glassmorphic card (40% surface-container-high, blur-12px, ghost border) |
| `.gradient-text` | Text with primary-to-secondary gradient |
| `.gradient-cta` | Button gradient background (primary to primary-container, 135deg) |
| `.ghost-border` | Subtle 15% opacity border |
| `.ambient-shadow` | Soft primary-tinted shadow (6% opacity) |
| `.ambient-shadow-lg` | Larger primary-tinted shadow (10% opacity) |

### CSS Animations (defined in globals.css)

| Class | Purpose |
|---|---|
| `.animate-marquee` | Infinite horizontal scroll (35s, used by skills-marquee) |
| `.animate-pulse-dot` | Pulsing opacity for availability dot |
| `.animate-blink` | Cursor blink for terminal widget |

---

## Animation Rules

- **All scroll-triggered animations must use `viewport={{ once: true }}`** — fire once, don't replay on scroll up.
- **Only animate `transform` and `opacity`** — GPU-composited properties only, no layout thrash.
- **Use shared variants from `animations.ts`**, not inline animation objects.
- **Transition timing:** `cubic-bezier(0.22, 1, 0.36, 1)` for reveals, spring with `stiffness: 400, damping: 17` for interactions.
- **Stagger children:** use `staggerContainer` variant with `staggerChildren: 0.1`.
- **Buttons:** `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.97 }}`.
- **Cards:** `whileHover={{ y: -4 }}` or `whileHover={{ y: -6 }}` for lift effect.
- **Infinite loops (marquee):** use CSS `@keyframes`, NOT Framer Motion.

### Animation Map

| Component | Variant | Trigger |
|---|---|---|
| Hero headline/CTAs | `heroStagger` + `fadeInUp` | On mount (`animate`) |
| Terminal widget | `scaleIn` + typing effect | On mount |
| Availability badge | `fadeInUp` + CSS ping | On mount |
| Service cards | `staggerContainer` + `fadeInUp` | `whileInView` |
| Case study cards | `staggerContainer` + `fadeInUp` | `whileInView` |
| Blog cards | `staggerContainer` + `fadeInUp` | `whileInView` |
| Skills marquee | CSS `.animate-marquee` | Always (infinite) |
| Contact left | `slideInLeft` | `whileInView` |
| Contact form | `slideInRight` | `whileInView` |

---

## Lead Conversion Strategy

5 CTA touchpoints throughout the page:

1. **Navbar** — persistent "Work with Me" gradient button scrolls to `#contact`
2. **Hero** — "View My Work" scrolls to `#projects`, plus ghost "Technical Stack" button
3. **Case Studies** — "Have a similar project in mind? Let's Talk" CTA below grid
4. **Blog** — "All Posts" link (for future expansion)
5. **Contact Section** — full form with validation + success animation

---

## SEO Checklist

- Full `Metadata` export in `layout.tsx` (title, description, keywords, OG, Twitter cards, robots)
- JSON-LD `Person` schema in `<head>` via `dangerouslySetInnerHTML`
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- Single `<h1>` in hero, `<h2>` per section, `<h3>` per card
- `robots.txt` and `sitemap.xml` in `public/`
- Self-hosted fonts (no third-party requests)
- Static export = CDN-edge serving

---

## Adding New Sections

When adding a new section:

1. Create component in `src/components/sections/new-section.tsx`
2. Add any static data to `src/lib/constants.ts`
3. Use `"use client"` if it has interactivity or animations
4. Import and add shared animation variants from `src/lib/animations.ts`
5. Use `whileInView` with `viewport={{ once: true }}` for scroll reveals
6. Alternate section backgrounds (`bg-surface` / `bg-surface-container-low`) to follow the no-border sectioning rule
7. Import and place in `src/app/page.tsx` in the correct order
8. Give the section a unique `id` for anchor navigation if needed

## Adding New UI Components

1. Create in `src/components/ui/`
2. Follow existing patterns: Framer Motion for hover/tap, semantic Tailwind tokens
3. Use `.ghost-border` instead of explicit borders
4. Use `.gradient-cta` or `.glass-card` where appropriate
5. Never use hardcoded hex colors — always use design system tokens

## Modifying Content

All content lives in `src/lib/constants.ts`. To update:
- **Projects:** Edit the `projects` array
- **Blog posts:** Edit the `blogPosts` array
- **Skills:** Edit the `skills` array
- **Services:** Edit the `services` array
- **Site info:** Edit `siteConfig`
- **Nav links:** Edit `navLinks`
- **Social links:** Edit `socialLinks`

---

## Build & Deploy

```bash
pnpm dev          # Dev server at localhost:3000
pnpm build        # Static export to /out
pnpm start        # Serve production build
```

Static output in `/out` can be deployed to any CDN (Vercel, Cloudflare Pages, Netlify).

## Verification

After changes, always verify:
1. `pnpm build` passes (TypeScript + static generation)
2. Theme toggle works (dark/light persists across refresh)
3. Smooth scroll works on nav links
4. Animations fire once on scroll
5. Contact form validates and shows success state
6. Responsive at 375px, 768px, 1024px, 1440px
