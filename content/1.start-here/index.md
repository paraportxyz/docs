---
title: 'Start Here'
description: 'Integrate ParaPort auto-teleport into your Polkadot dApp'
navigation: true
---

## Quick Start for Builders

### 1. Install the SDK

ParaPort ships as framework-specific packages that share a TypeScript core. Install the package that matches your stack:

```bash
npm install @paraport/core @paraport/vue      # Vue 3
npm install @paraport/core @paraport/react    # React 18+
```

The core package exposes shared services, while the UI package provides drop-in components and hooks.

### 2. Configure Supported Networks

Initialize ParaPort with the parachains and assets you want to support. Configuration files for Polkadot Hub, AssetHub, Hydration, and People chain are available in `packages/statick`.

```ts
import { createParaPort } from '@paraport/core'
import { hydration, assetHub, polkadotHub } from '@paraport/statick'

export const paraport = createParaPort({
  chains: [polkadotHub, assetHub, hydration],
  defaultAsset: 'DOT',
  telemetry: true
})
```

### 3. Embed the UI Flow

Drop the pre-built modal or inline flow into your dApp. ParaPort handles intent detection, teleport execution, and transaction bundling.

```tsx
import { TeleportFlow } from '@paraport/react'

<TeleportFlow
  client={paraport}
  intent={{
    action: 'mint',
    chain: 'assetHub',
    params: { collectionId: '999', price: '12.5' }
  }}
/>
```

### 4. Test End-to-End

Use the provided testing guidelines to simulate partial teleports, endpoint degradation, and signature failures. ParaPort ships with mocks and contract fixtures to help you validate flows before production launches.

::u-callout{icon="i-lucide-info"}
ParaPort only requires wallet signatures—no additional custody or key management. When teleport capacity is insufficient, users receive guided recovery steps instead of silent failures.
::

## What You Get Out of the Box

- **Intent detection** that triggers teleports before business logic executes
- **Unified balance view** across configured parachains
- **Automatic fee estimation** with configurable safety margins
- **Wallet-agnostic signing** that works with Talisman, SubWallet, Nova, and Ledger
- **Observability hooks** for logging, metrics, and session replay

Ready to explore the architecture and SDK layers in detail?

::u-button
---
to: /start-here/where-we-are-built
color: primary
class: chaotic-btn
---
Understand the Architecture
::
