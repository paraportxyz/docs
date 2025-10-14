---
title: 'Teleport Calculation System'
description: 'Fee estimation, balance validation, and route analysis inside ParaPort'
navigation: true
---

## Purpose

Reliable auto-teleporting starts with accurate math. ParaPort’s Teleport Calculation System determines how much value to move, where to source it from, and which fees to include so the final transaction succeeds on the first try.

## Components

### Unified Fee Calculator
- Aggregates expected fees on source and destination chains
- Applies configurable buffers to absorb volatility
- Accounts for existential deposit requirements and storage costs

### Quote Engine
- Evaluates balances across all configured chains
- Selects the fund source with greatest availability and lowest cost
- Produces user-facing quotes describing amounts, chains, and estimated time

### Balance Validation
- Subscribes to live balance updates via Polkadot.js
- Detects deltas mid-flow to adjust routes or pause execution
- Prevents operations when balances fall below required thresholds

### Funds Detection & Subscription
- Waits for expected funds to land before proceeding to downstream actions
- Notifies the UI and hooks when teleports settle or time out
- Emits sleep/wake signals for long-lived flows so you can manage UX states

## Developer Integration

```ts
const quote = await paraport.quotes.create({
  from: 'polkadotHub',
  to: 'assetHub',
  asset: 'DOT',
  amount: '12.5'
})

if (!quote.available) {
  throw new Error('Insufficient balance to cover teleport + fees')
}

console.log('Estimated fees:', quote.fees.total)
```

Quotes can be generated in advance to display teleport previews, cost breakdowns, or to trigger partial teleports before a user commits to the main action.

## Failure Handling

- **Insufficient Funds** — Provide actionable messaging and optional partial fills.
- **Stale Quotes** — Automatic refresh when fee conditions change beyond tolerance thresholds.
- **Volatility Events** — Re-route or prompt users if RPC latency or fee spikes compromise the plan.

The Teleport Calculation System ensures ParaPort teleports are predictable, transparent, and resilient against market variance.

::u-button
---
to: /features/ui-components
color: primary
class: chaotic-btn
---
See the UI Building Blocks
::
