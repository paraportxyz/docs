---
title: 'Auto-Teleport'
description: 'How the ParaPort SDK detects missing funds, creates sessions, and drives teleports'
navigation: true
---

## Overview

Auto-teleporting is the core experience shipped by `ParaPortSDK`. A session encapsulates the state required to decide whether a user needs a top-up on the destination chain and, if so, orchestrates the XCM transfer for them.

Every session exposes:
- The selected `Quote` (route, fees, send/receive amounts).
- `funds` flags indicating whether a teleport is needed, available, or impossible with current balances.
- The associated teleport id once execution starts.

## Session lifecycle

`SessionManager` tracks five statuses:

| Status | Meaning |
| --- | --- |
| `pending` | Session created, still calculating quotes. |
| `ready` | Calculation finished. UI can show quotes or prompt the user. |
| `processing` | Teleport is running (XCM in-flight). |
| `completed` | Teleport succeeded and the destination balance was observed. |
| `failed` | Teleport failed (transaction error, fee shortage, etc.). |

Sessions emit events you can subscribe to:

```ts
const sdk = new ParaPortSDK({ getSigner, logLevel: 'DEBUG' })
await sdk.initialize()

sdk.onSession('session:updated', (session) => {
  console.log('status', session.status, session.funds)
})

const session = await sdk.initSession({
  address,
  chain: Chains.AssetHubPolkadot,
  asset: Assets.DOT,
  amount: '20000000000',
})
```

Behind the scenes `initSession`:
1. Validates the parameters (address format, supported chain/asset, positive amount, known teleport mode).
2. Computes current balances using `BalanceService.hasEnoughBalance`.
3. Fetches quotes from every registered bridge (`XCMBridge` today).
4. Subscribes to balance increases on both the destination chain and any origin chains that can fund the teleport.

## Executing a teleport

When `session.funds.needed` is `true` and a `session.quotes.selected` is present, call `executeSession` to perform the teleport:

```ts
if (session.funds.needed && session.quotes.selected) {
  const teleportId = await sdk.executeSession(session.id)
  console.log('teleport id', teleportId)
}
```

`TeleportManager` then:
- Creates a `TeleportDetails` record with status `pending` and seeds the `TransactionManager` with the required XCM transfer.
- Emits `teleport:started`, allowing the UI to switch into progress mode.
- Signs and submits the XCM extrinsic through `XCMBridge.transfer()` using the `getSigner` you provided.
- Transitions through `transferring → waiting → completed` as on-chain events arrive and the destination balance meets the target amount.

Teleport events mirror this progression:

```ts
sdk.onTeleport('teleport:updated', (teleport) => {
  console.log(teleport.status, teleport.transactions[0]?.txHash)
})

sdk.onTeleport('teleport:completed', () => {
  console.log('auto-teleport finished')
})
```

If the transaction fails or the network reports an error, the teleport is marked `failed` and the session status follows suit. You can offer a retry button by calling `sdk.retrySession(session.id)`—it resets the internal transaction state and replays the flow.

## Teleport modes

The teleport mode controls how ParaPort calculates the amount to send:
- `expected` *(default)* — Ensure the destination receives the requested `amount` after fees by topping up from the richest supported origin chain.
- `exact` — Send the exact `amount` provided, even if the destination ends up with less after fees.
- `only` — Treat `amount` as the maximum the user is willing to spend (including fees). ParaPort subtracts fees before transferring.

The Vue component exposes this via the `teleportMode` prop, and the SDK type enforces the same union.

## Balance reactivity

`BalanceService.subscribeBalances` watches System balances, pallet Assets, ForeignAssets, or Hydration’s `CurrenciesApi` depending on the chain. When any watched balance increases and satisfies the session requirements, the session is updated immediately. This is how manual top-ups from another tab cause the UI to transition to the “ready” state without a page refresh.

::u-button
---
to: /features/teleport-calculation
color: primary
class: chaotic-btn
---
Understand Teleport Calculation
::
