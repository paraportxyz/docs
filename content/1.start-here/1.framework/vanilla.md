---
title: 'Vanilla'
description: 'Integrate ParaPort via the framework-agnostic SDK bundle'
navigation: true
---

This guide shows how to embed ParaPort without a frontend framework. The SDK mounts a ready‑made UI into any DOM node while exposing the same events and parameters as the framework wrappers.

<steps>

### Install packages

```bash [Terminal]
pnpm add @paraport/sdk polkadot-api
```

`polkadot-api` is a peer dependency used for signing and typed RPC access.

### Provide a signer (polkadot-api)

```ts
import { connectInjectedExtension } from 'polkadot-api/pjs-signer'

export const getSigner = async () => {
  const extension = await connectInjectedExtension('talisman', 'ParaPort Demo')
  const account = extension.getAccounts()[0]
  return account.polkadotSigner
}
```

Any object implementing `PolkadotSigner` works (server, custodial, etc.).

### Mount the SDK UI

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

// Optional updates / teardown later
instance.update({ label: 'Processing…', disabled: true })
// instance.destroy()
```

Parameters mirror the `TeleportParams<string>` type from `@paraport/core` — numeric values are strings and are converted to `bigint` internally.

</steps>

::u-button
---
to: /start-here/configuration/parameters
color: primary
class: chaotic-btn
---
Configuration: Parameters
::

::u-button
---
to: /start-here/configuration/theming
variant: outline
class: chaotic-btn
---
Theming Guide
::
