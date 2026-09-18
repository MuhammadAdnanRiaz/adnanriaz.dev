---
title: "A Linear-style issue tracker, open source"
summary: "A keyboard-first, real-time, multi-tenant issue tracker on Next.js 16, Prisma and PostgreSQL. Deployed and open source, so you can read exactly how I structure a production application today."
category: "Open source · Reference build"
year: "2026"
role: "Solo build"
timeline: "Reference build, maintained"
team: "1"
platform: "Web"
cover: "/images/projects/linear-clone.svg"
coverAlt: "Stylised issue list with status dots, a side panel and a command palette overlay"
live: "https://linear-clone-pearl.vercel.app"
source: "https://github.com/MuhammadAdnanRiaz/linear-clone"
stack:
  - Next.js 16 (App Router)
  - TypeScript
  - PostgreSQL (Neon)
  - Prisma 7
  - Auth.js v5
  - Pusher
  - TanStack Query
  - Tailwind CSS v4
  - Zod
  - Vercel
highlights:
  - "Real-time collaboration with optimistic updates and clean rollback"
  - "Multi-team workspaces with tenant isolation enforced on the server"
  - "Command palette with structured queries, fully keyboard-driven"
order: 3
---

## Why this exists

Clients reasonably ask what my code looks like, and almost all of my client work is private. This is the answer: a complete, deployed issue tracker modelled on Linear, with the parts that are usually hand-waved in demos actually implemented and tested.

- **Live:** [linear-clone-pearl.vercel.app](https://linear-clone-pearl.vercel.app) (sign in with GitHub or GitLab; no passwords are stored)
- **Source:** [github.com/MuhammadAdnanRiaz/linear-clone](https://github.com/MuhammadAdnanRiaz/linear-clone)

## What it does

- **Issues** with status, priority, assignee and labels; create, update, filter and search.
- **Projects** with list and board views. **Cycles** as time-boxed sprints whose state (upcoming, active, completed) is derived from dates, not stored.
- **Keyboard-first**: `J`/`K` to move, `C` to create, `Enter` to open, `Escape` to close, `Cmd+K` for everything else.
- **Command palette** with structured queries such as `status:in_progress assignee:me`, plus navigation to any issue, project or member.
- **Real-time collaboration**: a change made by another user appears instantly over Pusher private channels.
- **Optimistic updates** on every mutation, reverted cleanly when the server rejects.
- **Multi-team workspaces** with strict tenant isolation enforced server-side.
- **Activity timeline** per issue: status changes, assignments, priority changes and comments.
- **OAuth only** (GitHub, GitLab) through Auth.js v5.

## Decisions worth noting

### Tenant isolation lives on the server

Every query is scoped by the authenticated user's team membership inside the API layer. The client never sends a team id that the server trusts. This is the line between a demo and something you could run for real customers, and it is the first thing I check when I take over someone else's multi-tenant codebase.

### Optimistic UI, with the failure path tested

Mutations update the TanStack Query cache immediately and reconcile with the server response. The rollback path is where optimistic interfaces usually fall apart, so it is tested explicitly: reject the mutation and the UI must return to exactly the previous state.

### Real-time as a layer, not a rewrite

Pusher events invalidate or patch the query cache. Turn real-time off and the application still works correctly, just without the instant updates. Keeping the data flow simple to reason about matters more than any single feature.

### Typed end to end

Prisma schema, Zod validation at the API boundary, TypeScript through the interface. Refactors are safe because the compiler finds the seams before a user does.

### Derived state over stored state

A cycle's status is computed from its dates at read time. Storing it would mean a scheduled job to keep it correct, and a class of bugs when that job fails. Where a value can be derived cheaply, it is.

## Deployment and operations

Vercel for the application, Neon for PostgreSQL with separate pooled and direct connection strings, Pusher for websockets. The README documents every environment variable and a `HOW_TO_DEPLOY.md` covers each service, so anyone can stand it up from a clean checkout.

## What this is evidence of

How I structure a Next.js application in 2026: App Router, server-enforced authorisation, typed boundaries, real-time done simply, and documentation that lets someone else deploy it. If you are evaluating engineers by reading code, start here.
