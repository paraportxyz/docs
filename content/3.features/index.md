---
title: 'Features Overview'
description: 'Discover the ParaPort capabilities that make cross-chain UX effortless'
navigation: true
---

## Core Capabilities

### 🔄 Intent-Aware Teleports
- Detect when a user action requires funds on another parachain
- Calculate optimal teleport amounts with configurable buffers
- Bundle the teleport and target transaction into a single guided signature flow

### 🧠 ParaSpell-Powered Routing
- Compose XCM messages using ParaSpell abstractions
- Support multiple bridge routes with automatic fallbacks
- Validate message execution and retry if confirmation lags

### 🗺️ Bridge & Network Management
- Maintain a registry of parachains, assets, and RPC endpoints
- Monitor endpoint health and swap to faster providers automatically
- Normalize metadata for balances, existential deposits, and fees

## UI & Developer Experience

### 🎛️ Drop-in Components
- Vue 3 Composition API components and React hooks-based widgets
- Progress indicators, status banners, and customizable layouts
- Slot/prop APIs for branding and tailored user journeys

### 📦 Core SDK Services
- State management, lifecycle orchestration, and telemetry hooks
- Subscription-based balance monitoring across chains
- Extensible event bus for analytics and custom logging

### 🧪 Testing & CI Ready
- Testing recipes covering unit, integration, and UI flows
- GitHub Actions starter workflows for linting, type checking, and coverage
- Error simulation utilities for partial teleports, network outages, and user cancellations

## Reliability & Recovery

### 🛡️ Error Handling
- Distinct strategies for network, transaction, and user input failures
- Guided recovery for retries, partial fills, and manual intervention
- Resettable sessions that keep users informed instead of stuck

### 📊 Observability
- Structured logging and metrics exporters
- Hooks for surfacing status in your own dashboards
- Telemetry events for monitoring teleport success rates and latency

Ready to unpack each subsystem in detail?

::u-button
---
to: /features/auto-teleport
color: primary
class: chaotic-btn
---
Deep Dive into Auto-Teleport
::
