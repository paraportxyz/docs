---
title: 'Integration Onboarding'
description: 'Step-by-step guide for teams adopting ParaPort auto-teleport flows'
navigation: true
---

Welcome to ParaPort! This checklist helps teams move from discovery to production with confidence.

## Engagement path

### 1. Share your use case
- Which user action needs automatic funding (mint, stake, swap, NFT purchase, etc.)?
- Which parachains and assets are involved today, and which are on the roadmap?
- What constraints do you have (mobile-first wallets, custodial signers, regional RPC requirements)?

### 2. Kickoff with the ParaPort team
- Schedule a discovery call via [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com).
- Align on milestones, test environments, and success metrics.
- Review `@paraport/static` to confirm the required chains are supported or plan additions.

### 3. Implement & test
- Install the relevant packages (`@paraport/sdk`, `@paraport/vue`, or `@paraport/react`) plus `@paraport/core`, `@paraport/static`, and `polkadot-api`.
- Wire the `<Paraport>` component or the SDK bundle into your UI and connect a `getSigner` implementation.
- Exercise the flow on each target chain: verify `funds` flags, quote selection, `teleport:completed`, and the manual `Add funds` path.
- Capture logs produced by `LoggerService` in your observability stack for debugging and support.

### 4. Launch checklist
- ✅ Confirm telemetry: successful teleport hashes resolve in the expected block explorer.
- ✅ Validate fee calculations against live network conditions for each chain pair you support.
- ✅ Test wallet coverage (SubWallet, Talisman, Nova, Ledger via polkadot-api signer bridge). Document fallbacks if a signer is unavailable.
- ✅ Include UI copy and support playbooks for `funds.noFundsAtAll` scenarios.

## Support channels

- **Email:** [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com)
- **GitHub Issues:** [exezbcz/paraport](https://github.com/exezbcz/paraport/issues)
- **Community:** Reach out to KodaDot contributors (e.g., Viki Val) for ecosystem context and best practices.

## Training & resources

- Architecture walkthroughs of `ParaPortSDK`, `TeleportManager`, and balance monitoring.
- Example integrations in `apps/playground` for React and Vue, including signer wiring.
- Contribution guidelines (`docs/CONTRIBUTING.md`) if you want to document new chains or enhance the UI.

## Launch with confidence

ParaPort is an open, community-driven project. Share feedback, propose features, and help grow the cross-chain UX tooling the ecosystem needs.

::u-button
---
to: mailto:pulcondrej@gmail.com
color: primary
class: chaotic-btn
---
Book an Onboarding Call
::
