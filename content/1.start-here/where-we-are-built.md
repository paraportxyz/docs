---
title: "Platform Architecture"
description: 'Understand the packages, services, and runtime flow that power ParaPort auto-teleport'
navigation: true
---

ParaPort is organised as a pnpm workspace. Each package focuses on a single responsibility while sharing the same TypeScript tooling and linting rules.

## Monorepo layout

```
paraport/
├─ packages/static   # Chain + asset registry consumed at runtime
├─ packages/core     # ParaPortSDK, balance services, teleport orchestration
├─ packages/vue      # Vue 3 component library that wraps the core SDK
├─ packages/sdk      # Framework-agnostic bundle (mounts the Vue component)
├─ packages/react    # Thin React wrapper around @paraport/sdk
└─ apps/playground   # Example integrations and manual testing
```

### Key technologies
- **TypeScript + Vite** power every package, ensuring the same strict types across the stack.
- **polkadot-api** provides typed RPC access and signer interfaces. It replaces legacy `@polkadot/api` and lets ParaPort reuse injected extensions or custom endpoints.
- **@paraspell/sdk** supplies XCM builders, asset catalogs, and fee estimation used by the bridge adapter.
- **EventEmitter3 + Vue Composition API** deliver reactive UI state with minimal overhead.

## Core runtime components (`@paraport/core`)

- **ParaPortSDK** — The entrypoint you instantiate. It accepts an `SDKConfig`, wires logging, and exposes `initSession`, `executeSession`, `retrySession`, plus event subscriptions.
- **SessionManager** — Stores `TeleportSession` objects (statuses: `pending → ready → processing → completed/failed`). It reacts to quotes, balance updates, and teleport completion events.
- **TeleportManager** — Creates `TeleportDetails`, sequences transactions with `TransactionManager`, and emits `teleport:*` lifecycle events. Status transitions are driven by transaction results and balance confirmations.
- **BridgeRegistry + XCMBridge** — Registry keeps track of enabled bridge adapters. The current implementation is the XCM bridge powered by ParaSpell builders, fee simulators, and runtime dry runs.
- **BalanceService** — Fetches and subscribes to user balances via `polkadot-api` typed endpoints. It handles chain-specific pallets (Hydration’s `CurrenciesApi`, AssetHub foreign assets, etc.) and provides `waitForFunds` polling with `p-retry`.
- **PolkadotApi** — Creates cached `polkadot-api` clients per chain, honouring the optional `endpoints` override you pass in the SDK config.

Together they deliver the end-to-end teleport lifecycle: quote discovery, session state, XCM submission, and completion tracking.

## Package interaction

```
@paraport/static → constants used by
  @paraport/core  → consumed by
    @paraport/vue → bundled inside
      @paraport/sdk → wrapped by
        @paraport/react
```

- `@paraport/static` exports `Chains`, `Assets`, RPC provider lists, and metadata consumed by both the SDK and UIs.
- `@paraport/core` exposes the TypeScript API (`ParaPortSDK`, types, helpers) that powers all higher layers.
- `@paraport/vue` renders the integrated UI, using `useAutoTeleport` to turn `TeleportSession` updates into component state.
- `@paraport/sdk` mounts the Vue component into any DOM node; it is the quickest path for vanilla or server-rendered apps.
- `@paraport/react` reuses the SDK bundle but offers React-friendly lifecycle management with hooks and cleanup built in.

## Teleport workflow

1. **Initialization** — `ParaPortSDK.initialize()` registers the XCM bridge, primes network clients, and attaches listeners between the teleport and session managers.
2. **Session creation** — `initSession` normalises the `TeleportParams`, checks balances via `BalanceService`, fetches quotes from each registered bridge, and subscribes to balance increases on relevant chains.
3. **Decision point** — The session exposes whether funds are needed (`funds.needed`), whether a quote is available, and the best route.
4. **Execution** — `executeSession` creates a teleport record, seeds the `TransactionManager`, and hands control to `TeleportManager`, which calls `XCMBridge.transfer()` to sign and submit the XCM transfer.
5. **Completion** — Once the XCM transaction finalises and the destination balance is observed, the teleport status flips to `completed` and all listeners fire. `destroy()` tears everything down when the UI unmounts.

Event channels exposed to integrators:
- `session:*` — `session:created`, `session:updated`, `session:completed`, `session:failed`
- `teleport:*` — `teleport:started`, `teleport:updated`, `teleport:completed`

## Supported chains out of the box

The default config enables:
- `Polkadot`
- `AssetHubPolkadot`
- `Kusama`
- `AssetHubKusama`
- `Hydration`

You can restrict or extend this list with the `chains` array when constructing `ParaPortSDK`. New chains can be onboarded by enriching `@paraport/static` metadata and adding bridge adapters.

::u-button
---
to: /features
color: primary
class: chaotic-btn
---
Review the Feature Set
::
