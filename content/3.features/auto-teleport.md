---
title: 'Auto-Teleport'
description: 'How ParaPort bundles teleports with user actions for a single-signature experience'
navigation: true
---

## Overview

ParaPort Auto-Teleport removes the guesswork from cross-chain actions. When a user initiates an intent—minting an NFT, staking, voting, or swapping—ParaPort determines whether the required asset balance exists on the destination parachain. If funds are missing, the SDK orchestrates a teleport before the primary transaction fires.

## Key Capabilities

- **Intent Detection** — Map business actions to the assets and chains they depend on.
- **Balance Aggregation** — Read user balances across connected parachains simultaneously.
- **Route Resolution** — Choose the optimal teleport path, including multi-hop routes when available.
- **Signature Guidance** — Walk users through a single signature sequence covering both teleport and main action.
- **Status Tracking** — Monitor teleport execution and surface progress states in your UI.

## User Journey

1. **Initiate Intent** — User triggers an action (e.g., mint on AssetHub).
2. **Analyse Balances** — ParaPort checks DOT balances across configured chains.
3. **Build Route** — ParaSpell composes the teleport message and fee buffers.
4. **Request Signature** — The SDK renders the signature modal and verifies wallet readiness.
5. **Execute & Confirm** — ParaPort dispatches the teleport followed by the action, watching both until finalized.

## Developer Hooks

```ts
paraport.on('teleport:started', ctx => {
  logger.info('Teleport created', ctx.quote)
})

paraport.on('teleport:completed', ctx => {
  analytics.track('teleport_success', ctx.metrics)
})

paraport.on('teleport:failed', ctx => {
  // Access detailed failure reasons and recovery helpers
  showRecoveryOptions(ctx.recovery)
})
```

These events enable custom dashboards, notifications, and post-execution automation.

## Supported Networks

- **Polkadot Hub ↔ AssetHub**
- **Hydration Parachain** (native token movements)
- **People Chain** (identity-driven flows)

Additional chains can be added via configuration, and ParaPort will automatically include them in balance discovery and routing.

## Recovery & Edge Cases

- **Partial Teleports** — Users receive guided options to retry or select alternate routes.
- **Fee Shortage** — ParaPort surfaces missing fee amounts and prompts top-ups before execution.
- **Endpoint Failures** — Automatic endpoint failover with clear user messaging.

Auto-Teleport makes cross-chain UX feel local, letting your users focus on their goal rather than bridge mechanics.

::u-button
---
to: /features/teleport-calculation
color: primary
class: chaotic-btn
---
Understand Teleport Pricing
::
