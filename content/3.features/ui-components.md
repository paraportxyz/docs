---
title: 'UI Components'
description: 'Embed ParaPort flows in Vue or React with customizable components and hooks'
navigation: true
---

## Component Library

ParaPort ships with framework-specific packages that share the same core API surface.

### React Toolkit
- `TeleportFlow` modal for full guided experiences
- `useTeleport` hook for headless control and custom layouts
- `BalanceBanner` and `StatusTimeline` components for inline feedback

### Vue Toolkit
- `<TeleportFlow />` component for quick starts
- `useTeleport()` composable exposing reactive state
- Slots for customizing header, steps, and confirmation messages

## Customization Options

- **Branding** — Override typography, colors, and CTAs using scoped slots or props.
- **Copy** — Replace default messages with your tone without touching internal logic.
- **Step Control** — Show/hide signature breakdowns, fee summaries, or advanced telemetry.
- **Internationalization** — Provide translation dictionaries through the SDK provider.

## State & Events

```tsx
const { state, actions } = useTeleport({ intent })

if (state.status === 'awaiting_signature') {
  actions.promptWallet()
}

return <StatusTimeline steps={state.timeline} />
```

All components share a common state machine, enabling you to mix ParaPort widgets with bespoke UI while keeping business logic centralized.

## Error Recovery UX

- Inline banners for recoverable errors (network blips, RPC switchovers)
- Dedicated screens for retries and manual bridge alternatives
- Automatic updates when balances arrive or pending transactions finalize

## Mobile-First Design

Components scale from desktop dashboards to mobile wallets, ensuring the same frictionless teleport experience across devices.

::u-button
---
to: /onboarding
color: primary
class: chaotic-btn
---
Plan Your Integration
::
