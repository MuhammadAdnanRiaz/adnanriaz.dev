# adnanriaz.dev

Portfolio site for Muhammad Adnan Riaz. Purpose: convert Upwork and LinkedIn visitors into client conversations.

## Non-negotiables

- Every project, number and claim must be real and verifiable. Never add placeholder case studies or invented metrics.
- No email address or phone number anywhere on the site (Upwork terms). Contact is the form, Upwork and LinkedIn only.
- Keep the client bundle small. No animation or smooth-scroll libraries; reveal-on-scroll is a 30-line IntersectionObserver in `src/components/reveal.tsx`.
- Both colour schemes must look intentional (`prefers-color-scheme`); tokens live in `src/app/globals.css`.

## Where things live

- Copy and lists: `src/lib/site.ts`
- Case studies: `content/projects/*.md`, loaded by `src/lib/projects.ts`; `order` in frontmatter controls position.
- Covers: `public/images/projects/*.svg` (1600x1000)
- Contact API: `src/app/api/contact/route.ts` (Zod validation, honeypot, Resend)
- SEO: `src/app/layout.tsx` (metadata, JSON-LD), `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`

## Stack notes

Next.js 16 App Router, Tailwind v4 CSS-first (`@theme inline`, `@utility`), `next/font/google`. Read `node_modules/next/dist/docs/` before assuming an API.
