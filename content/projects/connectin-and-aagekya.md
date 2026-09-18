---
title: "ConnectIn and Aagekya: matching people for calls, at scale"
summary: "Two sister products on one Next.js codebase: a digital therapy ecosystem that connects patients and seniors with family and community, and a professional-networking spin-off. Profiles, organisations, scheduled matching, calendar invites and email, with me as the primary engineer for a year."
category: "Web platform · Healthcare and community"
year: "2022 — 2023"
role: "Primary engineer"
timeline: "Apr 2022 to Mar 2023"
team: "Founder, me, one mobile engineer on a separate app"
platform: "Web application, admin console"
cover: "/images/projects/connectin.svg"
coverAlt: "Stylised profile cards being matched, with a calendar invite and an email notification"
live: "https://connectin.io"
stack:
  - Next.js
  - TypeScript
  - React
  - Ant Design
  - NextAuth
  - Express (custom server)
  - Hasura · GraphQL
  - SendGrid
  - Google Calendar API · iCal
  - Heroku
highlights:
  - "Scheduled 'roulette' and 'virtual cooler' matching with calendar invites"
  - "Organisations, member profiles, public profiles, pricing and onboarding"
  - "Nearly every front-end commit for a year across two products"
order: 4
---

## Context

ConnectIn describes itself as a TeleEmpathy digital therapy ecosystem: a secure way to engage patients and seniors with family, care teams and community through scheduled conversations. Aagekya applies the same engine to professional networking. Both run on one Next.js codebase with a Hasura GraphQL backend, and both are live.

I joined in April 2022 and was the primary engineer on the web application for the next year. Of the last hundred commits on the ConnectIn front end, 99 are mine; the Aagekya front end and its admin console are almost entirely my work.

## What I built

**Matching that runs itself.** The "roulette" pairs members of an organisation for a call on a schedule, with weekday selection and time-zone handling so a 9am slot means 9am for each participant. The "virtual cooler" does the same for casual drop-in conversations. Both generate calendar invites through the Google Calendar API and iCal, and send reminder emails through SendGrid with logged delivery, so an admin can see exactly who was told what and when.

**Organisations and members.** Create and manage an organisation, invite people, edit member and organisation records, and handle the edge cases that only appear with real users, such as inviting someone who already has an account.

**Profiles and public profiles.** Member profiles with the fields a care team or a professional network needs, a public profile page, and a newsfeed on Aagekya.

**The commercial surface.** Pricing pages, "how it works", contact, terms, and the onboarding and password flows around them.

**A custom Express server inside Next.js** for the pieces that needed server-side work in 2022: email templates, scheduled jobs, proxying and authentication glue, alongside NextAuth for sessions.

## Decisions worth noting

- **One codebase, two products.** Shared components and data model, product-specific pages. It let a small team run two brands without doubling the work.
- **Log every outbound email.** Reminder emails are the product's heartbeat. Making them inspectable turned "did the invite go out?" from a debugging session into a lookup.
- **Time zones as a first-class field.** Every schedule stores the participant's zone, not the server's. It is the single decision that made the roulette usable across countries.

## What this is evidence of

Being the engineer a founder relies on for the whole web product over a sustained period, on a domain where reliability matters to vulnerable users. If you need someone to own a Next.js platform end to end, this is the reference.
