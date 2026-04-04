---
title: "Vogue Mobile"
description: "A high-conversion e-commerce engine with integrated AR try-on features."
tech: "Flutter / Firebase"
image: "/images/projects/project-2.svg"
accent: "secondary"
date: "2024-10-05"
role: "Mobile Lead"
duration: "6 months"
team: "4 engineers, 2 designers, 1 PM"
stack:
  - Flutter
  - Dart
  - Firebase
  - ARCore / ARKit
  - Stripe
  - Algolia
  - Cloud Functions
---

## Overview

Vogue Mobile is a fashion e-commerce app built for a DTC brand scaling from web-only to mobile. The brand had strong web sales but was losing market share to competitors with native mobile experiences — particularly those offering AR try-on features for accessories and eyewear.

We built a cross-platform app in Flutter that launched on iOS and Android simultaneously, with an AR try-on feature that became the brand's top conversion driver.

## The Challenge

The client had three requirements that shaped every technical decision:

1. **Ship iOS and Android simultaneously** — The brand couldn't afford a staggered launch. Their competitor had just launched on iOS, and the window to match them on both platforms was closing.
2. **AR try-on for eyewear** — Users needed to see how glasses and sunglasses looked on their face before buying. This was the feature that competitor apps were using to drive 3x higher conversion on eyewear categories.
3. **Sub-2-second product page loads** — The web store converted at 4.2%. The mobile app needed to match or exceed that. Slow product pages were the number one drop-off point on the old mobile web experience.

## Technical Approach

### Why Flutter

We evaluated React Native and Flutter. Flutter won for three reasons:

- **Single codebase, pixel-perfect on both platforms.** The brand's design team had specific visual requirements — custom animations, precise typography, branded scroll physics. Flutter's rendering engine gave us full control without platform-specific overrides.
- **AR plugin maturity.** Flutter's `ar_flutter_plugin` and direct access to ARCore/ARKit via platform channels gave us the same capabilities as native, with shared business logic.
- **Performance ceiling.** Flutter compiles to native ARM code. For the AR feature and 60fps scroll performance on product grids, we needed that headroom.

### AR Try-On Implementation

The AR feature uses face mesh detection to overlay 3D eyewear models onto the user's face in real time:

```
Camera Feed → Face Detection (ARCore/ARKit) → Face Mesh → 
3D Model Positioning → Real-time Rendering → Composite Output
```

Each eyewear product has a corresponding 3D model (GLTF format) with anchor points mapped to face mesh landmarks — bridge of the nose, temple positions, ear positions. When the user moves their head, the model tracks with sub-frame latency.

The tricky part was **lighting estimation**. AR looks fake when the virtual object doesn't match the ambient lighting. We used ARCore's light estimation API to adjust the 3D model's shadows and reflections in real time, matching the user's environment. This single detail doubled the "try-on to add-to-cart" conversion rate compared to our initial prototype without lighting.

### Product Catalog Performance

For sub-2-second product pages, we built a three-tier caching strategy:

**Tier 1 — Algolia for search and browse.** Product listings are indexed in Algolia with pre-computed facets (size, color, price range, style). Search results return in under 50ms. We stream results to the UI as they arrive, showing the first 4 products while the rest load.

**Tier 2 — Firebase Remote Config for featured collections.** The homepage and category pages pull curated collections from Remote Config, which caches locally on the device. First open after install shows cached content instantly — no network wait.

**Tier 3 — Aggressive image optimization.** Product images are served via a CDN with automatic format negotiation (WebP on Android, HEIC on iOS). We use Flutter's `cached_network_image` with a custom cache manager that pre-fetches the next screen's images during scroll idle time.

The result: median product page load time of 1.1 seconds on LTE, 0.4 seconds on WiFi.

### Checkout Flow

Checkout uses Stripe's mobile SDK with Apple Pay and Google Pay as primary options. We reduced the checkout flow from 5 steps (account creation → address → shipping → payment → confirm) to 2:

1. **Cart review** — with inline address and shipping selection
2. **Payment** — Apple Pay / Google Pay one-tap, or saved card

For first-time users, we defer account creation to post-purchase. The order goes through, and we prompt them to save their details after the confirmation screen. This removed the single biggest conversion killer: forced account creation before checkout.

### Push Notification Strategy

We built a behavioral notification system using Firebase Cloud Messaging and Cloud Functions:

- **Abandoned cart** — triggers 2 hours after cart abandonment, includes product images and a deep link back to the cart
- **Price drop alerts** — users can watch items; when prices change, they get notified within minutes
- **Back-in-stock** — size/color availability notifications for previously sold-out items
- **Order updates** — real-time shipping and delivery tracking

Each notification type has independent opt-in, and we cap at 3 notifications per day to avoid fatigue. The abandoned cart flow alone recovers 12% of abandoned carts.

## Results

Six months post-launch:

- **Conversion rate** of 5.8% (vs 4.2% on web) — AR try-on users convert at 8.4%
- **Average order value** 22% higher on mobile vs web (AR users try more products)
- **App store rating** of 4.7 (iOS) and 4.6 (Android) with 12K+ reviews
- **AR try-on sessions** averaging 3.2 products per session — users treat it as a discovery tool, not just a utility
- **Checkout completion rate** of 78% (up from 41% on the old mobile web flow)

## Key Takeaway

The AR feature gets the headlines, but the real conversion driver was the full-stack approach to performance. Fast product pages, instant search, aggressive caching, and a frictionless checkout — these fundamentals did the heavy lifting. AR was the differentiator that got users in the door; speed and UX are what made them buy.
