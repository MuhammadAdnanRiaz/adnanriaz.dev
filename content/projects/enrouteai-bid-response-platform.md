---
title: "EnrouteAI: the bid-response platform for truckload carriers"
summary: "Primary front-end author of a large SvelteKit application where freight analysts import RFPs, price lanes, model fuel surcharges and explore the market on interactive maps. Over 1,000 commits, against a Django and PostGIS API, for a San Francisco Bay Area logistics-AI startup."
category: "Data product · US startup"
year: "2024 — present"
role: "Lead front-end engineer, full-stack where needed"
timeline: "Aug 2024 to present"
team: "Founder (backend and ML), me (front end), part-time contributors"
platform: "Web application, static SvelteKit build"
cover: "/images/projects/enrouteai.svg"
coverAlt: "Stylised dashboard with a lane map, a rate-per-mile chart and KPI tiles"
stack:
  - SvelteKit
  - TypeScript
  - Tailwind CSS
  - shadcn-svelte
  - MapLibre GL
  - Plotly
  - TanStack Virtual
  - Playwright
  - Vitest
  - Storybook
  - PostHog
  - Django + PostGIS API
highlights:
  - "1,000+ commits across 37 routes and 450+ Svelte components"
  - "Interactive lane maps, fuel-surcharge modelling and virtualised pricing tables"
  - "55 Playwright specs, 34 Storybook stories, a governed design system and ADRs"
order: 1
---

## Context

EnrouteAI builds pricing and routing software for truckload carriers. A carrier uploads a shipper's RFP exactly as it arrived, prices every lane from its own history and strategy, applies fuel surcharges, and exports the bid back in the shipper's format. Analysts live inside this tool for hours at a time, so it has to be fast, dense and trustworthy.

I first worked with the founder in 2022 on internal tooling. In August 2024 I became the front-end engineer for the platform itself, starting with the lane-selection product and then the full bid-response application. The founder owns the Django and PostGIS backend and the pricing models; I own what analysts see and touch. The code is private, so this page describes the work rather than linking to it, and I am glad to walk through it on a call.

## What the application does

Thirty-seven routes, grouped into a handful of workflows:

- **Bids.** Create a bid event, import the shipper's file, map its columns to the canonical model, then work the lanes: match against history, price them, compare scenarios, and focus on the lanes that matter. A per-bid map shows every lane in context.
- **Fuel hub.** Shipper fuel tables, the DOE index feed, carrier cost, and the fuel-surcharge basis that flows into every price.
- **Market and imbalance maps.** MapLibre layers for historical loads, strategic lanes, awarded lanes and market imbalance, so an analyst can see where capacity is short before pricing into it.
- **Pricing matrix and strategic lanes.** Tiered rate structures and the carrier's own strategic lane pricing.
- **Historical bids and loads, customers, files, benchmarks, users.** The supporting records and reports that make the above possible.

## What I built and how

**Most of it.** Over 1,000 of the repository's 1,249 commits are mine, across more than 450 Svelte components. That includes the features above, the data layer that talks to the API, and the tooling around it.

**Performance for analysts, not for benchmarks.** Lane tables run to tens of thousands of rows, so they are virtualised with TanStack Virtual and share a single set of `Intl` formatters instead of creating one per cell. Map code splits its Turf imports and dedupes vendor chunks so the first paint stays fast. Filters and view state live in the URL, so a link to a filtered lane view is a link to exactly that view.

**Tested where it hurts.** Fifty-five Playwright specs cover the fuel hub, strategic lanes, benchmarks and the bid workflows end to end, plus contract tests that hit the real backend. Vitest covers the units underneath. Storybook holds 34 stories and is the canonical spec for shared components.

**A governed design system.** A `tokens.json` source of truth, a documented type, radius and spacing scale, three permitted icon sizes, and a custom ESLint rule that flags arbitrary Tailwind values. It exists because a dense analyst tool decays fast without one.

**Hardening.** An error boundary with retry on reads, a closed open-redirect on login, escaped focus history, dependency pinning with an audited triage of production advisories, and PostHog wired to errors, identities and core events so problems are seen before they are reported.

**Documentation as part of the job.** README, contributing guide, pre-commit hooks, architecture decision records (static adapter, query-params-as-state, dependency triage), and a generated knowledge graph so a new engineer starts from a map.

## Decisions worth noting

- **Static SvelteKit build, API behind a relative `/api`.** No server-side rendering to operate, no hard-coded backend URL, one artefact to deploy anywhere. Recorded as an ADR.
- **URL as the state store for filters.** It made views shareable and killed a class of "why does my colleague see something different" bugs.
- **Decompose, then delete.** Several god components were split into cells and utilities, duplicate implementations were retired, and the old lanes view was removed rather than left as a second path.

## What this is evidence of

Owning the front end of a real, data-heavy B2B product over a long engagement: shipping features weekly while raising the engineering bar underneath them. If your product has complex tables, maps or pricing logic and needs one engineer who will treat performance, tests and documentation as part of the feature, this is the reference.

> Client code is under NDA. I can show the architecture and walk through representative screens on a call.
