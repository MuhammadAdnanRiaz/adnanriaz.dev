---
title: "LetsConnectIn: mentorship programs that actually happen"
summary: "A mentorship and networking platform for organisations: mentors and mentees are matched on shared goals, admins review pairs, automatic nudges keep sessions happening, and a networking roulette and water-cooler groups round it out. I was the primary engineer on the Next.js product for a year, plus its sister app Aagekya."
category: "SaaS · HR and community"
year: "2022 — 2023"
role: "Primary engineer"
timeline: "Apr 2022 to Mar 2023"
team: "Founder, me, one mobile engineer on a separate app"
platform: "Web application, admin console"
cover: "/images/projects/connectin.svg"
coverAlt: "Stylised mentor and mentee profile cards being matched, with a session calendar invite and an email nudge log"
live: "https://www.letsconnectin.com/"
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
  - "Scheduled matching: networking roulette and water-cooler groups with calendar invites"
  - "Organisations, member and public profiles, pricing and onboarding"
  - "99 of the last 100 front-end commits, plus the Aagekya sister product"
order: 4
---

## Context

LetsConnectIn runs mentorship programmes for organisations without the spreadsheets. An admin creates a programme and shares a join code; mentors set capacity and expertise, mentees set goals; the platform scores matches, the admin reviews them, intro emails go out, and sessions are logged and reported. Around the mentoring core sit the connection programmes: a 1:1 networking roulette, topic-based water-cooler groups, and personal follow-up reminders. The product is live and self-serve, free for small programmes.

I joined in April 2022 and was the primary engineer on the web application for the next year. Of the last hundred commits on the front end, 99 are mine. Aagekya, a professional-networking spin-off with a newsfeed, shares the codebase and is almost entirely my work too, including its admin console.

## What I built

**Matching that runs itself.** The roulette pairs members of an organisation for a call on a schedule, with weekday selection and time-zone handling so a 9am slot means 9am for each participant. The virtual water cooler does the same for casual group conversations. Both generate calendar invites through the Google Calendar API and iCal, and send reminder emails through SendGrid with every delivery logged, so an admin can see exactly who was told what and when.

**Organisations and members.** Create and manage an organisation, invite people, edit member and organisation records, and handle the edge cases that only show up with real users, such as inviting someone who already has an account.

**Profiles and public profiles.** Member profiles with the fields a mentoring or networking programme needs, a public profile page, and a newsfeed on Aagekya.

**The commercial surface.** Pricing pages, "how it works", contact, terms, and the onboarding and password flows around them.

**A custom Express server inside Next.js** for the pieces that needed server-side work in 2022: email templates, scheduled jobs, proxying and authentication glue, alongside NextAuth for sessions and Hasura for the GraphQL data layer.

## Decisions worth noting

- **One codebase, two products.** Shared components and data model, product-specific pages. It let a small team run two brands without doubling the work.
- **Log every outbound email.** Reminder emails are the product's heartbeat. Making them inspectable turned "did the invite go out?" from a debugging session into a lookup.
- **Time zones as a first-class field.** Every schedule stores the participant's zone, not the server's. It is the single decision that made the roulette usable across countries.

## What this is evidence of

Being the engineer a founder relies on for the whole web product over a sustained period, on a product that is still live and selling today. If you need someone to own a Next.js platform end to end, this is the reference.
