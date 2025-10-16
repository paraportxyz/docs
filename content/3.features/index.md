---
title: 'Features Overview'
description: 'A tour of the ParaPort SDK capabilities and how they work together'
navigation: true
---

## Core Capabilities

### 🔄 Auto-teleport sessions
- `ParaPortSDK` calculates whether funds are missing on the destination chain and creates a long-lived `TeleportSession` for the user.
- The session tracks quotes, fund availability, and the active teleport id so UI layers can render accurate status in real time.
- Lifecycle events (`session:created`, `session:updated`, `session:completed`, `session:failed`) are emitted through a typed event bus.

### 🧠 XCM quote engine
- `XCMBridge` leverages `@paraspell/sdk` to simulate routes, estimate fees on both endpoints, and dry-run transfers before proposing them.
- Quotes include gross amount, net receive amount, bridge fees, execution time, and teleport mode, enabling transparent UX.
- The engine honours the three teleport modes (`expected`, `exact`, `only`) so integrators can decide how aggressive the auto-top-up should be.

### 🗺️ Balance intelligence
- `BalanceService` fetches transferable balances across all configured chains, re-encoding addresses per SS58 format automatically.
- It can subscribe to pallet-specific updates (System, Assets, ForeignAssets, Hydration’s runtime API) to react when funds arrive.
- `waitForFunds` uses exponential backoff (`p-retry`) to watch balances until the destination amount is ready or a timeout occurs.

## UI & Developer Experience

### 🎛️ Drop-in UI
- `@paraport/vue` exposes a single `<Paraport>` component with an integrated layout, theming via CSS variables, and event callbacks.
- `@paraport/sdk` mounts that component into any DOM target, making it easy to add auto-teleport to static pages or other frameworks.
- `@paraport/react` wraps the SDK in a hook-friendly component, managing mount/unmount and prop updates for you.

### 📦 Typed core API
- Access `ParaPortSDK` directly for headless integrations or advanced control. All types (`TeleportSession`, `Quote`, `TeleportEventPayload`) are exported for reuse.
- Utilities such as `blockExplorerOf`, `getRouteChains`, and `convertToBigInt` help with formatting, routing checks, and parameter handling.
- Configurable logging (`LoggerService`) lets you raise or lower verbosity per environment.

### 🧩 Configuration building blocks
- `@paraport/static` provides `Chains`, `Assets`, and curated RPC endpoint lists (`PROVIDERS`) so you can bootstrap without hunting for infrastructure.
- Override chain support or endpoints through the SDK config—no rebuild required.

## Reliability & Recovery

### 🛡️ Guard rails
- Validation errors (`InvalidTeleportParamsError`, `InvalidSessionError`, `SDKInitializationError`) give immediate feedback when integrations misconfigure the SDK.
- The teleport pipeline resets failed transactions and exposes a `retrySession` helper so users can attempt the flow again without reloading the page.
- Automatic balance re-subscription keeps sessions in sync even when users top up manually from another tab or device.

### 📟 Introspectable state
- Every teleport stores an event timeline (`TeleportDetails.events`) and transaction list, which you can consume for analytics or custom UI.
- Session and teleport emitters use `eventemitter3`, so subscribing/unsubscribing is cheap and you can bridge events into your own state library.

Ready to go deeper into how auto-teleporting works under the hood?

::u-button
---
to: /features/auto-teleport
color: primary
class: chaotic-btn
---
Deep Dive into Auto-Teleport
::
