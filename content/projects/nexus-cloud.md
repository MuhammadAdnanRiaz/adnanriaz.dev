---
title: "Nexus Cloud"
description: "Infrastructure monitoring tool for enterprise-level cloud deployments."
tech: "React / Node.js"
image: "/images/projects/project-3.svg"
accent: "primary"
date: "2024-06-12"
role: "Full-Stack Lead"
duration: "5 months"
team: "5 engineers, 1 designer, 1 SRE advisor"
stack:
  - React
  - TypeScript
  - Node.js
  - Express
  - ClickHouse
  - Grafana
  - Docker
  - Kubernetes
---

## Overview

Nexus Cloud is an infrastructure monitoring platform built for a Series B startup that manages cloud deployments for 80+ enterprise clients. Their existing monitoring setup was a patchwork of Datadog, custom scripts, and a shared Grafana instance — expensive, fragmented, and impossible for their operations team to triage across clients efficiently.

We built a unified monitoring dashboard that aggregates metrics from multiple cloud providers, surfaces anomalies in real time, and gives operators a single-pane view across all client environments.

## The Challenge

The operations team was drowning:

1. **Context switching** — Triaging an alert meant opening Datadog for metrics, Grafana for dashboards, AWS Console for resource status, and Slack for client comms. A single incident touched 4-5 tools.
2. **Alert fatigue** — 200+ alerts per day across clients. Most were noise. The team had started ignoring non-critical alerts entirely, and two real incidents slipped through in Q3.
3. **Cost** — Datadog alone was $18K/month and growing linearly with client count. The company needed a solution that scaled sublinearly with their customer base.

## Technical Approach

### Data Ingestion Pipeline

We built a metrics ingestion pipeline that collects from multiple sources and normalizes everything into a unified schema:

```
Cloud Provider APIs    →   Collectors (Go agents)
Prometheus endpoints   →   Kafka Message Queue   →   ClickHouse (time-series storage)
Custom app metrics     →   Aggregation Workers        ↓
                                                   Query API → React Dashboard
```

**Why ClickHouse over Prometheus or InfluxDB?** Scale and query speed. The platform ingests 2M+ data points per minute across all clients. ClickHouse's columnar storage and vectorized query engine returns aggregated results over billions of rows in under 200ms. Prometheus was designed for single-cluster monitoring; at this scale, it fragments into federation nightmares.

Collectors run as lightweight Go agents on each client's infrastructure (Kubernetes DaemonSets or EC2 sidecars). They push metrics to Kafka, which buffers spikes and decouples ingestion from storage. Aggregation workers consume from Kafka, apply normalization (standardizing metric names across AWS, GCP, and Azure), and batch-insert into ClickHouse.

### Anomaly Detection

Instead of static threshold alerts (CPU > 80% = alert), we built a simple but effective anomaly detection layer:

For each metric, we maintain a rolling baseline — the median and standard deviation over the past 7 days, bucketed by hour-of-day and day-of-week. An anomaly fires when the current value deviates more than 3 standard deviations from the expected value for that time slot.

This means a server running at 90% CPU at 2am (batch processing window) doesn't alert, but the same server at 90% during business hours does — because the baseline knows what's normal for each time period.

The detection runs in ClickHouse as materialized views. No separate ML pipeline, no model training, no GPU costs. Just statistics on time-series data, computed incrementally as new data arrives.

This reduced alert volume from 200+/day to 15-20 actionable alerts. The operations team went from ignoring alerts to trusting them.

### The Dashboard

The React dashboard is organized around three views:

**Fleet View** — A grid of all client environments, each showing a health score (composite of CPU, memory, disk, error rate, latency). Color-coded: green, yellow, red. Operators start here every morning and can spot problems in seconds.

**Client Detail** — Drill into a specific client. Shows topology (services, dependencies, data flows), real-time metrics for each node, and a timeline of recent events and deployments. This replaces the "open 5 tools" workflow — everything is on one screen.

**Incident View** — When an anomaly triggers, it opens an incident timeline. The system automatically pulls related metrics (did anything else change at the same time?), recent deployments (was code pushed?), and similar past incidents. Operators can annotate, escalate, and resolve without leaving the tool.

### Real-Time Updates

The dashboard uses Server-Sent Events (SSE) for real-time metric streaming. SSE over WebSocket because:

- Metrics flow one direction (server → client). WebSocket's bidirectional capability is unnecessary overhead.
- SSE auto-reconnects natively in the browser. No custom reconnection logic.
- Works through corporate proxies and load balancers without special configuration — a requirement for enterprise clients.

Each dashboard view subscribes to a filtered SSE stream. The Fleet View subscribes to health score updates for all clients. The Client Detail view subscribes to full metrics for one client. The server manages subscription state and only pushes data the client is actually displaying.

### Multi-Tenancy and Isolation

Every query is scoped by `client_id` at the database level. ClickHouse's row-level filtering ensures that even if someone crafts a malicious query through the API, they can only access their authorized clients.

We also implemented per-client rate limits on the ingestion pipeline. One client's metrics spike (say, a runaway logging loop) can't starve the pipeline for others. Kafka partitions by client_id, and each partition has an independent throughput cap.

## Results

Five months after deployment:

- **Alert noise** reduced by 91% (200+/day → 18/day average)
- **Mean time to detection** dropped from 12 minutes to 45 seconds
- **Mean time to resolution** dropped from 48 minutes to 14 minutes
- **Monitoring cost** reduced from $18K/month to $4.2K/month (ClickHouse on reserved instances + open-source stack)
- **Zero missed incidents** in the 4 months since launch (vs 2 missed in the quarter before)
- **Operator satisfaction** (internal NPS) went from 22 to 71

## Key Takeaway

The biggest impact came from replacing static thresholds with time-aware anomaly baselines. The technology stack matters — ClickHouse's query speed makes the dashboard feel instant, SSE keeps it live — but the fundamental shift was giving operators signals instead of noise. When every alert is actionable, the team trusts the system, and incidents get caught early.
