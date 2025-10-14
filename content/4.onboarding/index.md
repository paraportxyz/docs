---
title: 'Integration Onboarding'
description: 'Step-by-step guide for teams adopting ParaPort in their Polkadot applications'
navigation: true
---

Welcome to ParaPort! This guide walks teams through partnership setup, development readiness, and production launch for auto-teleport experiences.

## Engagement Path

### 1. Share Your Use Case
- Describe the user action you want to streamline (minting, staking, voting, swaps, etc.)
- List the parachains and assets involved today and in the near term
- Identify expected transaction volume and UX constraints (mobile, custodial wallets, etc.)

### 2. Kickoff with the ParaPort Team
- Schedule a discovery call via [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com)
- Align on milestones, environments, and integration owners
- Gain access to statics configuration templates and example projects

### 3. Implement & Test
- Install the SDK packages and configure supported networks
- Integrate the TeleportFlow modal or headless hooks into your UI
- Use the testing guidelines to simulate partial teleports, network degradation, and user cancellations
- Review observability hooks to ensure logs and metrics ship to your stack

### 4. Launch Checklist
- ✅ Teleport quotes validated against current network fees
- ✅ Wallets tested: Talisman, SubWallet, Nova, Ledger
- ✅ Recovery paths documented for support teams
- ✅ CI workflows covering linting, type checks, and e2e tests

## Support Channels

- **Email:** [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com)
- **GitHub Issues:** [exezbcz/paraport](https://github.com/exezbcz/paraport/issues)
- **Advisory:** Viki Val (KodaDot co-founder) available for ecosystem alignment and product feedback

## Training & Resources

- Architecture deep dives upon request
- Design files for UI components and states (Figma export forthcoming)
- Workshop sessions for onboarding developer teams and QA engineers
- Documentation updates driven by community pull requests (see `CONTRIBUTING.md`)

## Launch with Confidence

ParaPort is built as a public good—your feedback shapes the roadmap. Whether you need single-hop DOT teleports today or multi-hop yield strategies tomorrow, the SDK is ready to evolve with you.

::u-button
---
to: mailto:pulcondrej@gmail.com
color: primary
class: chaotic-btn
---
Book an Onboarding Call
::
