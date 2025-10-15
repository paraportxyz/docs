---
title: 'Teleport Calculation System'
description: 'How ParaPort decides whether to teleport, how much to send, and which route to use'
navigation: true
---

## Goals

The calculation phase answers three questions before any transaction is signed:

1. Does the user already have enough transferable balance on the destination chain?
2. If not, which origin chain can supply the shortfall?
3. What gross amount must be teleported so the destination ends up with the requested net amount after fees?

`ParaPortSDK` packages the answers into the session object it returns from `initSession`.

## How quotes are produced

`XCMBridge.getQuote()` encapsulates the decision tree. Given `{ address, chain: destination, asset, amount, teleportMode }` it performs the following steps:

1. **Discover candidate chains** — `getRouteChains(destination, asset)` inspects Paraspell metadata to list chains where the asset is transferable. This is filtered against the chains enabled in your SDK config.
2. **Read balances** — `BalanceService.getBalances` fetches transferable balances on each candidate chain. Polkadot addresses are re-encoded per chain SS58 format automatically.
3. **Prioritise origin** — The destination balance is compared against the requested amount. If it already covers the need, the algorithm short-circuits and reports `funds.needed = false`. Otherwise it selects the origin chain with the highest transferable balance.
4. **Estimate fees twice** — `getXcmFee` simulates the XCM call using `@paraspell/sdk`. The first simulation uses the requested amount; the second uses the provisional send amount to account for fee changes caused by the larger transfer.
5. **Compute send amount** — `calculateTeleportAmount` applies the teleport mode:
   - `expected`: send enough so `currentBalance + receivingAmount >= requested`.
   - `only`: limit the send so fees + transfer stay under the provided amount.
   - `exact`: send the exact amount.
6. **Dry-run execution** — `query.dryRun()` validates the transfer can succeed (no weight limit failures, no asset routing issues). It also ensures the origin has enough transferable balance to cover the computed amount.
7. **Return the quote** — The bridge packages the origin/destination pair, total fees, net receive amount, transfer amount, and execution metadata (required signatures, estimated time).

Quotes are collected from every registered bridge (only XCM today). `TeleportManager.selectBestQuote` picks the one with the lowest total fee, but you can inspect all alternatives via `session.quotes.available`.

## Consuming the calculation results

```ts
const session = await sdk.initSession({
  address,
  chain: Chains.AssetHubPolkadot,
  asset: Assets.DOT,
  amount: '15000000000',
})

if (!session.funds.needed) {
  console.log('Destination already funded')
} else if (!session.funds.available) {
  console.warn('No eligible origin chain holds enough transferable balance')
} else {
  const quote = session.quotes.selected
  console.log('Send', quote?.total?.toString(), 'to receive', quote?.amount?.toString())
}
```

Session fields you can rely on:

- `funds.needed` — `true` when the destination is below the requested amount.
- `funds.available` — `true` when at least one bridge could produce a quote.
- `funds.noFundsAtAll` — `true` when every candidate origin lacks sufficient transferable balance.
- `quotes.available` — All quotes returned by the enabled bridges.
- `quotes.selected` — The quote ParaPort plans to execute (best by fee).
- `quotes.bestQuote` — Alias of `quotes.selected` for backwards compatibility.

The Vue composable exposes the same information via computed refs (`needsAutoTeleport`, `hasNoFundsAtAll`, `session.quotes.selected`, …) so your UI can tailor messaging.

## Watching for balance changes

Even after a session is created, balances can change if users self-fund from another wallet or receive tokens from someone else. `BalanceService.subscribeBalances` listens for increases on both origin and destination chains. When a subscription fires, `calculateTeleport` re-runs and the session is patched with the latest quote and fund flags.

For long waits (e.g., teleport pending confirmation), `BalanceService.waitForFunds` uses `p-retry` to poll until the destination has enough transferable balance, at which point the teleport completes and the session transitions to `completed`.

::u-button
---
to: /features/ui-components
color: primary
class: chaotic-btn
---
See the UI Building Blocks
::
