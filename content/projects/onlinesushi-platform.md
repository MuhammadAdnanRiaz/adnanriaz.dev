---
title: "OnlineSushi: six years building one client's ordering platform"
summary: "Web ordering, admin and restaurant panels, a NestJS payments backend, a Python rewrite, and finally the iOS and Android apps, for a Belgian food-ordering business I have worked with since 2020."
category: "Platform · Belgium"
year: "2020 — 2026"
role: "Full-stack engineer, sole mobile engineer"
timeline: "Oct 2020 to Jun 2026, in phases"
team: "Owner, rotating contributors, me throughout"
platform: "Web, admin panels, API, iOS and Android"
cover: "/images/projects/onlinesushi.svg"
coverAlt: "Stylised phone screens showing a restaurant list, a checkout and a payment confirmation"
stack:
  - Next.js
  - React
  - TypeScript
  - NestJS
  - GraphQL
  - TypeORM + PostgreSQL
  - Stripe · Mollie · PayPal
  - Python
  - React Native · Expo
  - Firebase Cloud Messaging
  - Radix UI · TanStack
  - i18n
highlights:
  - "Every layer of the product over six years: web, panels, API, apps"
  - "Payments through Stripe, Mollie and PayPal payouts on the NestJS backend"
  - "Mobile apps taken through Apple App Review and Google Play readiness"
order: 2
---

## Context

OnlineSushi is a Belgian business that connects customers with sushi restaurants for delivery and pickup. I joined the project in October 2020 as one of several contract engineers and have been the constant since. When the platform needed a new part, I built it. That continuity is the point of this case study: a client does not keep calling for six years unless the work holds up.

## The phases

### Web ordering, 2020 to 2021

The customer-facing site in Next.js with Apollo GraphQL, Stripe Checkout, Google Maps and places autocomplete, internationalisation, and social login. Forty-seven commits in the first three months while the site went live.

### Restaurant and admin panels, 2020 to 2023

The operations side: restaurant owners manage menus and orders, the business manages restaurants, payouts and reports. Next.js with Ant Design, PDF rendering for receipts, CSV exports, and a shared GraphQL layer with the storefront.

### NestJS backend, 2022 to 2023

The API behind all of it. NestJS with GraphQL and TypeORM on PostgreSQL, JWT and Passport authentication, Mailgun email, Excel exports, and the money: Stripe and Mollie for customer payments, PayPal payouts to restaurants. I contributed 42 commits to this service, mostly on payments and payouts, where the failure modes are expensive.

### Python backend and new panels, 2025

A new backend service in Python, 50 commits of mine over the year, alongside rebuilt admin and restaurant panels in Next.js with Radix UI, TanStack Table and Query, react-hook-form and chart.js. The new panels are the ones the business runs on today.

### Mobile apps, 2025 to 2026

The part I was the only engineer for: a React Native app on Expo for iOS and Android, from the first screen to store readiness. Details on the [mobile app below](#the-mobile-app-in-detail).

## The mobile app in detail

**Full ordering flow.** Registration with email verification, login, Apple Sign-In, restaurant listing and search, item detail, cart, address book with location permissions, checkout, payment, order history, live order tracking, profile and settings. Thirteen screens plus auth, all TypeScript, on React Navigation.

**Payments that cannot lie.** The app asks the backend for the real payment status before it clears the cart or moves the user on. A dropped connection between "pay" and "confirmed" leaves the cart intact instead of silently losing the order. After payment the navigation stack resets so the back button lands on Home.

**Push notifications on both platforms.** Firebase Cloud Messaging on Android, APNs through Firebase on iOS, Expo Notifications for delivery. The setup and a testing procedure are documented in the repository so the backend team can send without me.

**Belgian market details.** Multi-language UI, consistent euro formatting, Belgian address and phone validation at checkout.

**Store readiness.** Upgraded to the React Native New Architecture mid-project. Went through Apple App Review, including a rejection under guideline 5.1.1(v), which requires in-app account deletion, and resubmitted. Prepared Google Play release builds, synced versions across platforms, added a global error boundary, and moved signing keys and API keys out of the repository into environment configuration. A written launch-readiness audit turned "is it ready?" into a checklist the owner could read.

## What this is evidence of

Range and staying power. Storefront, back office, API, payments and mobile, for one client, over six years. If you need someone who can work across the whole product rather than one layer of it, and who will still be answering in year three, this is the reference.

Store listings are available on request.
