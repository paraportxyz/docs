---
title: 'UI Components'
description: 'Render ParaPort auto-teleport flows with Vue, React, or the framework-agnostic bundle'
navigation: true
---

## What ships out of the box

- **`@paraport/vue`** — A single `<Paraport>` component that renders the integrated button + status panel. It is built with the Vue 3 Composition API and powers every other wrapper.
- **`@paraport/sdk`** — A convenience bundle that mounts the Vue component into a DOM element. Use it for vanilla JS, Astro, server-rendered apps, or CMS integrations.
- **`@paraport/react`** — A React component that orchestrates the SDK bundle for you and keeps props in sync.

All packages expose the same props and events so you can switch between integration styles without rewriting business logic.

## Anatomy of the integrated UI

The default layout focuses on a single button backed by the auto-teleport session state:

1. **Idle / Ready** — Shows the provided `label` (or "Proceed") when funds are sufficient or a teleport is needed but ready to execute.
2. **Quote preview** — Displays the selected quote (origin chain, asset amount, fees) when auto-teleporting is required.
3. **Processing** — Replaces the button with a progress view that tracks XCM submission and waiting-for-funds states.
4. **Completion** — Surfaces a success banner with a link to the block explorer using `blockExplorerOf(chain)`.
5. **Insufficient funds** — Offers an “Add funds” CTA when no viable quote exists, triggering the `onAddFunds`/`@add-funds` callback.

Under the hood the component listens to `session:*` and `teleport:*` events from the core SDK via the `useAutoTeleport` composable and a small mitt-based event bus.

## Props & events

| Prop | Type | Notes |
| --- | --- | --- |
| `address`, `chain`, `asset`, `amount`, `teleportMode` | `TeleportParams<string>` | Forwarded directly into `ParaPortSDK.initSession`. |
| `getSigner` | `() => Promise<PolkadotSigner>` | Required to sign XCM transfers. |
| `label`, `disabled` | `string`, `boolean` | Control the primary button. Can be updated after mounting. |
| `displayMode` | `'integrated'` | Future-proof enum; currently only the integrated layout is implemented. |
| `appearance` | `Record<string, string>` | Per-instance CSS variable overrides (see below). |
| `themeMode` | `'light' | 'dark' | 'auto'` | Syncs tokens with the system or forces a theme. |
| `ui` | `{ addFunds?: boolean }` | Toggle the manual top-up CTA. |

Events available in every wrapper:

- `ready` / `onReady(session)` — Fires when the first `session:ready` event arrives.
- `submit` / `onSubmit({ autoteleport, completed })` — Fires when the button is clicked, before execution starts.
- `completed` / `onCompleted()` — Fires after `teleport:completed`.
- `add-funds` / `onAddFunds()` — Fires when users choose the manual top-up option.

## Theming via CSS variables

The Vue component scopes its styles under the `.paraport` class and exposes design tokens as CSS variables. Override them globally or per instance.

```css
/* global override */
.paraport {
  --accent: #1d4ed8;
  --radius: 12px;
  --surface: #0f172a;
  --text-primary: #e2e8f0;
}
```

```ts
paraport.init({
  integratedTargetId: 'paraport-root',
  appearance: {
    '--accent': '#8b5cf6',
    '--radius': '16px',
  },
  // ...other props
})
```

## Working with the store directly

Advanced Vue integrations can import `useSdk()` from `@paraport/vue` to access the internal refs:

```ts
const { sdk, params, session } = useSdk()

watch(session, (value) => {
  if (value?.status === 'completed') {
    notify('Teleport finished!')
  }
})
```

This is useful when you want to pair the provided UI with custom overlays, analytics, or alternative layouts.

::u-button
---
to: /onboarding
color: primary
class: chaotic-btn
---
Plan Your Integration
::
