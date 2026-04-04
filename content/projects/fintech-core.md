---
title: "FinTech Core"
description: "A real-time asset tracking platform that boosted user engagement by 40%."
tech: "Next.js / Tailwind"
image: "/images/projects/project-1.svg"
accent: "primary"
date: "2025-01-20"
role: "Lead Frontend Engineer"
duration: "4 months"
team: "3 engineers, 1 designer, 1 PM"
stack:
  - Next.js 15
  - Tailwind CSS v4
  - TypeScript
  - WebSocket
  - D3.js
  - PostgreSQL
  - Redis
---

## Overview

FinTech Core is a real-time asset tracking platform built for a mid-size investment firm managing portfolios across equities, crypto, and commodities. The existing dashboard was a legacy Angular app — slow, unresponsive, and losing users to competitors with sleeker tools.

The brief was clear: rebuild the dashboard from scratch, make it real-time, and make it fast enough that traders trust it over their Bloomberg terminal for quick portfolio checks.

## The Challenge

The old platform had three critical problems:

1. **Data staleness** — Portfolio values refreshed every 30 seconds via polling. In volatile markets, that's an eternity. Users were making decisions on stale data.
2. **Performance** — The Angular app loaded 2.4MB of JavaScript. Initial render took 6+ seconds on average. Traders kept a separate spreadsheet as a backup.
3. **Mobile experience** — Completely broken. The app wasn't responsive, and the team had given up on mobile years ago.

## Technical Approach

### Real-Time Architecture

We replaced the polling model with a WebSocket-based push architecture. The backend streams price updates, portfolio changes, and alerts to connected clients in real time.

```
Market Data Feeds → Aggregation Service → Redis Pub/Sub → WebSocket Gateway → Client
```

On the frontend, we built a custom hook that manages the WebSocket connection, handles reconnection with exponential backoff, and merges incoming updates into the local state without triggering full re-renders.

The key insight was using React's `useSyncExternalStore` to subscribe to the WebSocket data store. This gave us fine-grained reactivity — when a single asset price changes, only the components displaying that asset re-render. Not the entire portfolio grid.

### Streaming Server Components

For the initial page load, we used Next.js streaming SSR. The shell (navigation, layout, account summary) renders instantly on the server and streams to the browser. Individual data panels load progressively with Suspense boundaries:

```tsx
<Suspense fallback={<PortfolioSkeleton />}>
  <PortfolioGrid />
</Suspense>
<Suspense fallback={<ChartSkeleton />}>
  <PerformanceChart period="1D" />
</Suspense>
```

This meant the user sees a fully interactive shell in under 800ms, with data panels filling in over the next 200-400ms. Compared to the old 6-second blank screen, the perceived performance improvement was dramatic.

### Visualization Layer

Portfolio performance charts use D3.js rendered inside React components. We went with D3 over charting libraries like Recharts because the client wanted custom interactions — crosshair tooltips synced across multiple charts, brush-to-zoom on time axes, and animated transitions between time periods.

The charts render on a `<canvas>` element for performance, with an SVG overlay for interactive elements (tooltips, annotations). This hybrid approach handles 10,000+ data points without frame drops.

### Responsive Design

Instead of retrofitting responsiveness, we designed mobile-first. The portfolio grid uses a card-based layout on mobile that collapses complex data tables into scannable summaries. Traders can tap any card to drill into the full asset detail.

We used Tailwind's container queries for the portfolio cards — each card adapts to its container width rather than the viewport, making the layout work in split-screen and embedded contexts too.

## Results

Four months after launch:

- **User engagement** up 40% (daily active sessions)
- **Time to interactive** dropped from 6.2s to 0.8s
- **Mobile usage** went from 2% to 31% of total sessions
- **Support tickets** related to "wrong data" dropped to zero (real-time eliminated the stale data problem)
- **Lighthouse score** hit 96 on mobile, up from 34

## Key Takeaway

The biggest win wasn't any single technology — it was the architecture decision to push computation to the server and stream results to a thin client. By keeping the frontend focused on rendering and interaction (not data aggregation), we built something that feels instant on any device.
