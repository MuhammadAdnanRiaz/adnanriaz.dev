# adnanriaz.dev

Personal site of Muhammad Adnan Riaz, senior full-stack engineer (React, Next.js, TypeScript, Node.js, PostgreSQL, React Native).

Live: https://adnanriaz.dev

## Principles

- Every project, number and claim on the site is real and verifiable. No placeholder case studies, no invented metrics.
- Static pages, one small client bundle (nav toggle, contact form, scroll reveal). No animation libraries.
- SEO first: metadata per page, Person/WebSite/ProfilePage/FAQ/CreativeWork JSON-LD, generated sitemap and robots, Open Graph image rendered at build.
- Mobile first, both colour schemes via `prefers-color-scheme`.
- Upwork-compliant: no email or phone on the page; contact goes through the form, Upwork or LinkedIn.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/font` (Fraunces, Inter, JetBrains Mono), unified/rehype for markdown case studies, Resend for the contact form, Vercel.

## Run locally

```bash
pnpm install
cp .env.example .env.local   # RESEND_API_KEY, CONTACT_EMAIL
pnpm dev
```

## Content

- Site copy: `src/lib/site.ts`
- Case studies: `content/projects/*.md` (frontmatter drives the cards, the page header and structured data)
- Cover images: `public/images/projects/*.svg`
