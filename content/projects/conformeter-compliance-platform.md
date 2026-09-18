---
title: "Conformeter: a PCI DSS compliance platform, live"
summary: "The web application and marketing site for an AI-assisted compliance product. Organisations upload evidence, see which requirements pass or fail against a standard, and pay to unlock further standards. Built in Next.js, deployed and in use at app.conformeter.com."
category: "SaaS · Compliance"
year: "2023 — 2024"
role: "Front-end lead, API integration, deployment"
timeline: "Sep 2023 to Sep 2024"
team: "Founder (backend and AI), me (web application)"
platform: "Web application and marketing site"
cover: "/images/projects/conformeter.svg"
coverAlt: "Stylised compliance dashboard with a requirements checklist, a pass-fail bar chart and an admin sidebar"
live: "https://app.conformeter.com"
stack:
  - Next.js
  - TypeScript
  - React
  - MUI (Material UI)
  - ApexCharts
  - Tailwind CSS
  - GitHub Actions
  - Vercel
highlights:
  - "Live product: evidence upload, requirement status, payments, admin"
  - "Admin console for organisations, users and standards"
  - "CI/CD from day one, migrated Netlify to Vercel without downtime"
order: 3
---

## Context

Conformeter helps organisations prove compliance with security standards, starting with PCI DSS. Users upload their evidence documents, an AI service on the backend evaluates them against each requirement, and the dashboard shows what passed, what failed and what is missing. Additional standards are unlocked through a paid checkout.

The founder built the document-analysis backend in Python. I built everything a user or administrator sees, integrated it with the API, and set up deployment. Forty-six of the dashboard repository's commits are mine, and the marketing site is entirely mine.

## What I built

**The compliance dashboard.** Per-standard requirement views with pass, fail and missing states, a "failed requirement" label and workflow so teams know what to fix first, evidence upload, an uploaded-documents library, and a bar chart of document compliance against each standard. Requirement lists were reworked for mobile screens, because auditors read them on phones more than anyone expected.

**Accounts and organisations.** Registration for both users and organisations, login, password reset, profile, and cookie-based authentication after an initial token approach proved awkward to secure.

**Payments.** Checkout, a waiting state while the payment is confirmed, a thank-you page, and the multi-standard unlock flow, wired to the payment API with an approval step in the admin console.

**Admin console.** Organisations with detail pages and user sections, users, standards with create, update, delete and list, settings, and payment approval. Built with MUI and its data grid and date-picker components for speed and consistency.

**Marketing site.** Home, features, pricing and FAQ in Next.js and Tailwind, deployed separately.

**Delivery.** A CI/CD pipeline from the second week (GitHub Actions to Netlify), later migrated to Vercel when the Netlify Next.js plugin became a liability. Pull-request based workflow with the founder reviewing.

## Decisions worth noting

- **MUI for the admin console, custom UI for the customer views.** Internal screens need to be built fast and stay consistent; customer screens need to feel like the product. Two toolkits, deliberately.
- **Cookie sessions over local-storage tokens.** Simpler to secure, easier to reason about across the dashboard and API.
- **Ship the pipeline before the features.** A deploy on every merge from the start meant the founder saw progress as working software, not screenshots.

## What this is evidence of

A SaaS front end taken from empty repository to a live, paying product with a founder as the only other engineer. If you have a backend or a model and need the application around it, this is the closest reference.
