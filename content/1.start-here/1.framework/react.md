---
title: 'React'
description: 'Use the React wrapper around the SDK bundle'
navigation: true
---

This guide integrates ParaPort into a React app using the thin React wrapper over the SDK.

<steps>

### Install packages

```bash [Terminal]
pnpm add @paraport/react polkadot-api
```

`polkadot-api` is a peer dependency used for signing and typed RPC access.

### Import styles

```ts
// index.tsx or your root entry
import '@paraport/react/style'
```

### Provide a signer (polkadot-api)

```ts
// signer.ts
import { connectInjectedExtension } from 'polkadot-api/pjs-signer'

export const getSigner = async () => {
  const extension = await connectInjectedExtension('talisman', 'ParaPort Demo')
  const account = extension.getAccounts()[0]
  return account.polkadotSigner
}
```

### Render the component

```tsx
import { useMemo } from 'react'
import Paraport from '@paraport/react'
import '@paraport/react/style'
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
      onReady={(session) => console.log('ready', session)}
      onSubmit={({ autoteleport, completed }) =>
        console.log('submit', { autoteleport, completed })
      }
      onCompleted={() => console.log('completed')}
      onAddFunds={() => console.log('add-funds')}
    />
  )
}
```

Props map directly to the SDK and the UI mounts/unmounts automatically.

</steps>

### Optional: custom endpoints

Override curated RPC endpoints per chain if needed:

```tsx
<Paraport
  address={address}
  amount="10000000000"
  chain="AssetHubPolkadot"
  asset="DOT"
  getSigner={getSigner}
  endpoints={{
    AssetHubPolkadot: ['wss://statemint.api.onfinality.io/public-ws'],
    Polkadot: ['wss://polkadot-rpc.publicnode.com']
  }}
/>
```

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
