---
title: 'Start Here'
description: 'Integrate ParaPort auto-teleport flows in a few steps'
navigation: true
---

ParaPort ships as a set of TypeScript packages that share the same core SDK. This page walks through the minimum you need to embed the auto-teleport flow.

## 1. Install the packages

Pick the wrapper that matches your stack—all of them depend on the shared core.

```bash
# Vanilla / framework-agnostic bundle
pnpm add @paraport/sdk @paraport/core @paraport/static polkadot-api

# Vue 3 applications
pnpm add @paraport/vue @paraport/core @paraport/static polkadot-api

# React 18+
pnpm add @paraport/react @paraport/sdk @paraport/core @paraport/static polkadot-api
```

`polkadot-api` is a peer dependency; ParaPort uses it for signing and typed RPC access.

## 2. Provide a signer backed by polkadot-api

ParaPort only requires a single wallet signature per teleport. In browser contexts you can reuse injected extensions through the `polkadot-api/pjs-signer` helper:

```ts
import { connectInjectedExtension } from 'polkadot-api/pjs-signer'

export const getSigner = async () => {
  const extension = await connectInjectedExtension('talisman', 'ParaPort Demo')
  const account = extension.getAccounts()[0]
  return account.polkadotSigner
}
```

Server-side or custodial flows can return any `PolkadotSigner` that satisfies the same interface.

## 3. Mount the SDK (vanilla)

The framework-agnostic bundle renders the Vue UI under the hood. You only need a target element, teleport parameters, and callbacks.

```ts
import '@paraport/sdk/style'
import * as paraport from '@paraport/sdk'
import { Assets, Chains } from '@paraport/static'
import { getSigner } from './signer'

const instance = paraport.init({
  integratedTargetId: 'paraport-root',
  address: '15...user',
  amount: '10000000000', // 1 DOT in planck
  chain: Chains.AssetHubPolkadot,
  asset: Assets.DOT,
  getSigner,
  logLevel: 'DEBUG',
  label: 'Mint',
  endpoints: {
    AssetHubPolkadot: ['wss://statemint.api.onfinality.io/public-ws'],
  },
  onReady(session) {
    console.info('session ready', session.status, session.quotes.selected)
  },
  onSubmit(payload) {
    console.info('submit clicked', payload)
  },
  onCompleted() {
    console.info('teleport completed')
  },
  onAddFunds() {
    console.info('user asked for manual top-up')
  },
})

// Optional: update or tear down later
instance.update({ label: 'Processing…', disabled: true })
// instance.destroy()
```

Parameters mirror the `TeleportParams<string>` type from `@paraport/core`—all numeric values are passed as strings, and ParaPort converts them to `bigint` internally.

## 4. Use the framework wrappers when you prefer idiomatic integration

### Vue 3

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { ParaportPlugin } from '@paraport/vue'

createApp(App)
  .use(ParaportPlugin)
  .mount('#app')
```

```vue
<!-- Any component -->
<template>
  <Paraport
    chain="AssetHubPolkadot"
    asset="DOT"
    :amount="amount"
    :address="address"
    :getSigner="getSigner"
    label="Mint"
    @ready="onReady"
    @submit="onSubmit"
    @completed="onCompleted"
    @add-funds="onAddFunds"
  />
</template>
```

### React

```tsx
import { useMemo } from 'react'
import Paraport from '@paraport/react'
import { getSigner } from './signer'

export function TeleportButton({ address }: { address: string }) {
  const signer = useMemo(() => getSigner, [])

  return (
    <Paraport
      address={address}
      chain="AssetHubPolkadot"
      asset="DOT"
      amount="10000000000"
      getSigner={signer}
      label="Mint"
      onReady={(session) => console.log(session)}
    />
  )
}
```

Both wrappers forward props directly to the underlying SDK and expose the same events as DOM props/emits.

## Configuration reference

| Field | Required | Description |
| --- | --- | --- |
| `address` | ✅ | User account encoded as SS58 (ParaPort re-encodes per chain). |
| `chain` | ✅ | Destination parachain (`AssetHubPolkadot`, `Polkadot`, `Kusama`, `AssetHubKusama`, `Hydration`). |
| `asset` | ✅ | Currently `DOT`, `KSM`, or `HDX`. |
| `amount` | ✅ | Planck-denominated string. ParaPort converts to `bigint`. |
| `getSigner` | ✅ | Async function returning a `PolkadotSigner`. |
| `teleportMode` | optional | `'expected'` (default), `'exact'`, or `'only'`. |
| `endpoints` | optional | Override RPC endpoints per chain. Falls back to generated defaults in `@paraport/static`. |
| `label`, `disabled`, `appearance`, `themeMode` | optional | UI controls exposed by the Vue component. |

ParaPort defaults to the chains defined in `SDKConfigManager.getDefaultConfig()`. To narrow support, pass your own `chains` list when instantiating `ParaPortSDK` directly.

Ready to understand how the pieces fit together internally?

::u-button
---
to: /start-here/where-we-are-built
color: primary
class: chaotic-btn
---
Explore the Architecture
::
