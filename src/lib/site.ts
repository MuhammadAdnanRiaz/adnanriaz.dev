export const site = {
  name: "Adnan Riaz",
  fullName: "Muhammad Adnan Riaz",
  shortName: "Adnan",
  role: "Senior React & Next.js Developer",
  tagline: "Full-stack TypeScript, Node.js, PostgreSQL and React Native",
  title: "Muhammad Adnan Riaz — Senior React & Next.js Developer",
  description:
    "Senior full-stack engineer with 7+ years in production. React, Next.js, TypeScript, Node.js, PostgreSQL and React Native. Remote with US startups since 2022, based in Islamabad, available 30+ hrs/week.",
  url: "https://adnanriaz.dev",
  location: "Islamabad, Pakistan",
  timezone: "UTC+5",
  availability: "Available · 30+ hrs/week",
  links: {
    upwork: "https://www.upwork.com/freelancers/~01671c7ab4a7952104",
    linkedin: "https://www.linkedin.com/in/muhammadadnanriaz/",
    github: "https://github.com/MuhammadAdnanRiaz",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroFacts = [
  "7+ years in production",
  "Remote with US startups since 2022",
  "Islamabad · UTC+5 · overlaps US & EU hours",
] as const;

export const snapshot = [
  { k: "Role", v: "Senior full-stack engineer" },
  { k: "Core stack", v: "React · Next.js · TypeScript · Node.js · PostgreSQL" },
  { k: "Also ships", v: "SvelteKit · React Native · NestJS · GraphQL · Python/Django" },
  { k: "Currently", v: "Software Engineering Consultant, EnrouteAI (SF Bay Area)" },
  { k: "Engagements", v: "Contract · part-time or full-time · long-term preferred" },
  { k: "Replies", v: "Within one business day, in writing" },
] as const;

export const services = [
  {
    n: "01",
    title: "Web applications and dashboards",
    body: "Next.js, React and SvelteKit products in TypeScript: customer-facing SaaS features, staff-facing operations tools, and data-heavy dashboards with maps and charts. Built so the next engineer can read them.",
    items: [
      "Maps and charts over large datasets (MapLibre, Plotly, D3)",
      "Authentication, roles and multi-tenant data",
      "Virtualised tables, URL-persisted state, e2e tests that hold",
      "Vercel deployments with a preview URL per branch",
    ],
  },
  {
    n: "02",
    title: "APIs and backend services",
    body: "Node.js and NestJS services on PostgreSQL, REST or GraphQL. The unglamorous parts a real product depends on: integrations, webhooks, scheduled jobs, and a schema that will still make sense in a year.",
    items: [
      "REST and GraphQL API design and documentation",
      "Third-party integrations, webhooks, cron and queues",
      "Schema design, migrations and query performance",
      "Python/Django when the codebase is already Python",
    ],
  },
  {
    n: "03",
    title: "Mobile apps with React Native",
    body: "iOS and Android from one Expo codebase, sharing the API with your web app. Taken all the way through App Store and Google Play review, not just to a TestFlight build.",
    items: [
      "Auth, payments, push notifications, localisation",
      "Store submission, review fixes, release management",
      "React Native New Architecture and Expo SDK upgrades",
      "Shared TypeScript types with the backend",
    ],
  },
] as const;

export const process = [
  {
    n: "01",
    title: "Scope in writing",
    body: "A short call, then a one-page written scope: what we are building, what is out, milestones with rough effort, and the open questions. You approve it before any code.",
  },
  {
    n: "02",
    title: "Build in the open",
    body: "Every branch gets a preview URL you can click through. You get a written update two or three times a week, and you never have to ask where things stand.",
  },
  {
    n: "03",
    title: "Ship and verify",
    body: "Tests on the logic that matters, a production deployment, monitoring, and for mobile, the store submission itself. Done means live and checked, not merged.",
  },
  {
    n: "04",
    title: "Hand over properly",
    body: "A README that actually works, environment and deploy notes, and a recorded walkthrough. Whoever touches the code next starts from a map, not a mystery.",
  },
] as const;

export const career = [
  {
    period: "2024 — present",
    org: "EnrouteAI · San Francisco Bay Area (remote)",
    role: "Lead front-end engineer, Software Engineering Consultant",
    body: "Primary author of the bid-response platform for truckload carriers: 1,000+ commits in SvelteKit and TypeScript with maps, pricing tables, fuel modelling, e2e tests and a governed design system. First worked with the founder on internal tooling in 2022.",
  },
  {
    period: "2020 — present",
    org: "OnlineSushi · Belgium (contract)",
    role: "Full-stack engineer, sole mobile engineer",
    body: "Storefront, admin and restaurant panels, NestJS payments backend, a Python rewrite, and the iOS and Android apps, across six years with one client.",
  },
  {
    period: "2023 — 2024",
    org: "Conformeter (contract)",
    role: "Front-end lead",
    body: "PCI DSS compliance SaaS in Next.js: dashboard, admin console, payments, CI/CD. Live at app.conformeter.com.",
  },
  {
    period: "2022 — 2023",
    org: "ConnectIn and Aagekya (contract)",
    role: "Primary engineer",
    body: "Next.js platform with scheduled matching, calendar invites and email, for a digital-therapy ecosystem and its networking spin-off. Both live.",
  },
  {
    period: "Earlier",
    org: "Morosoft Technologies · Rawalpindi Institute of Cardiology",
    role: "Full Stack Developer · React Native Developer",
    body: "Web applications in React and Node.js for agency clients, and cross-platform mobile apps for a public hospital.",
  },
] as const;

export const aboutFacts = [
  { k: "Experience", v: "7+ years, production software" },
  { k: "Based in", v: "Islamabad, Pakistan (UTC+5)" },
  { k: "Working hours", v: "Flexible, with daily overlap for US and EU teams" },
  { k: "Availability", v: "30+ hours per week" },
  { k: "Education", v: "BS Computer Science, NUML, 2019" },
  { k: "Languages", v: "English (fluent), Urdu (native)" },
] as const;

export const faqs = [
  {
    q: "How do we start?",
    a: "Send a few lines through the form or on Upwork: what it is, where it stands today, and when you need it. I reply within a business day with questions or a suggested first step. For most projects that is a short paid scoping or assessment task, so you see how I work before committing to anything larger.",
  },
  {
    q: "What kinds of projects fit best?",
    a: "New features on an existing Next.js, React, SvelteKit or Node product; internal tools and dashboards, especially data-heavy ones with maps, tables and charts; APIs, payments and integrations; React Native apps that need to reach the stores; and codebases that need to be taken over and finished. If it is a one-hour WordPress tweak or a pure design job, I am the wrong person and will say so.",
  },
  {
    q: "Do you work on codebases you did not write?",
    a: "Yes, often. The first deliverable is always a written map: what works, what is half-built, what is broken, and which deployed build matches which branch and database. Then we agree a bounded first fix so you can judge the work before a longer plan.",
  },
  {
    q: "How do you communicate across time zones?",
    a: "In writing, by default. I have worked with US teams since 2022 and keep daily overlap hours for calls when they are needed. You get short written progress updates two or three times a week and a preview URL for anything visual.",
  },
  {
    q: "Who owns the code?",
    a: "You do, from the first commit. Work happens in your repository and your accounts wherever possible, so there is nothing to migrate at the end. I am happy to sign an NDA before seeing anything sensitive.",
  },
  {
    q: "Hourly or fixed price?",
    a: "Either. Well-defined milestones can be fixed price. Ongoing product work is usually hourly with a weekly cap you set. Rates and terms are discussed once I understand the scope, and contracts run through Upwork or a direct agreement, whichever you prefer.",
  },
] as const;
