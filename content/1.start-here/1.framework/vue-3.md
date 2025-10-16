---
title: 'Vue 3'
description: 'Use the Paraport Vue component with minimal setup'
navigation: true
---

This guide integrates ParaPort into a Vue 3 application using the official component wrapper.

<steps>

### Install packages

```bash [Terminal]
pnpm add @paraport/vue polkadot-api
```

`polkadot-api` is a peer dependency used for signing and typed RPC access.

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

### Register the plugin and use the component

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { ParaportPlugin } from '@paraport/vue'
import '@paraport/vue/style'

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
  <!-- The SDK UI mounts internally; no extra markup is required. -->
  </template>
```

Props and events map directly to the underlying SDK parameters and lifecycle.

</steps>

### Optional: custom endpoints

Specify RPC endpoints per chain to override the defaults:

```vue
<Paraport
  chain="AssetHubPolkadot"
  asset="DOT"
  :amount="amount"
  :address="address"
  :getSigner="getSigner"
  :endpoints="{ AssetHubPolkadot: ['wss://statemint.api.onfinality.io/public-ws'] }"
  label="Mint"
/>
```

### Styling & CSS layers

ParaPort ships its CSS in named layers to avoid conflicts. For Tailwind/utility-heavy apps, declare a global layer order and import the SDK CSS into its own layer so utilities resolve predictably:

```css
/* e.g., src/styles.css */
@layer base, components, paraport-base, paraport-components, utilities, paraport-utilities;
@import '@paraport/vue/style' layer(paraport-base);
```

Import this stylesheet once in your app entry. Avoid unlayered global resets (like `* { margin:0 }`) that can override layered utilities.

::u-button
---
to: /start-here/configuration/parameters
color: primary
class: chaotic-btn
---
Configuration: Parameters
::
