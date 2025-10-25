# ParaPort Documentation

> The embedded auto-teleport SDK bringing seamless cross-chain experiences to the Polkadot ecosystem.

ParaPort detects when users need assets on other parachains and automatically teleports funds before their primary action executes. Originally incubated inside [KodaDot](https://kodadot.xyz/), ParaPort is evolving into a plug-and-play integration any parachain dApp can adopt.

> [!TIP]
> Reach out at [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com) or explore the [ParaPort repository](https://github.com/exezbcz/paraport) for development updates.

## ✨ Key Capabilities

- 🔄 **Intent-Aware Auto-Teleport** – Detect, route, and execute teleports before user actions fire
- 🧠 **ParaSpell Intelligence** – Compose optimal XCM messages with fee buffers and recovery
- 🗺️ **Network Registry** – Manage RPC endpoints, assets, and bridge adapters from a single config
- 🎛️ **Vue & React SDKs** – Drop-in components and hooks with customizable UI states
- 🛡️ **Resilient Error Handling** – Retries, partial teleport support, and user guidance for every failure mode
- 📊 **Observability Hooks** – Emit metrics, logs, and lifecycle events for production monitoring

## 🚀 Quick Start

```bash
# Clone the documentation workspace
git clone https://github.com/paraportxyz/docs paraport-docs
cd paraport-docs

# Install dependencies
npm install

# Start the documentation server
npm run dev
```

The site runs at `http://localhost:3000`.

## 📁 Project Structure

```
paraport-docs/
├── content/              # Docus content files
│   ├── index.md          # Landing page
│   ├── 1.start-here/     # Quick-start material
│   ├── 2.basics/         # Team and philosophy
│   ├── 3.features/       # SDK + platform capabilities
│   └── 4.onboarding/     # Integration onboarding
├── public/               # Static assets
├── assets/               # Custom CSS and media
├── app.config.ts         # Site configuration
└── nuxt.config.ts        # Nuxt + Docus setup
```

## 🛠 Built With

- [Docus v5](https://docus.dev)
- [Nuxt 4](https://nuxt.com)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt UI Pro](https://ui.nuxt.com/pro)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contributing

ParaPort documentation is a public-good resource. Improvements, tutorials, and translations are welcome!

```bash
# Production build
npm run build

# Preview the static output
npm run preview
```

Built files live in `.output` and can be deployed to any static host.

## 📬 Stay in Touch

- **Email:** [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com)
- **GitHub Issues:** [github.com/exezbcz/paraport/issues](https://github.com/exezbcz/paraport/issues)
- **LinkedIn:** [Ondrej Pulc](https://www.linkedin.com/in/ondřej-pulc-1b4132268/)

## 📄 License

[MIT License](LICENSE) — ParaPort is built as shared infrastructure for the Polkadot ecosystem.
