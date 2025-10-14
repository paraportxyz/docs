# Contributing to ParaPort Documentation

Thanks for helping improve the ParaPort docs! This guide explains how to contribute effectively to the documentation supporting our cross-chain SDK.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or pnpm
- Git

### Setup
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/paraport.git
   cd paraport/docs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Docs are served at `http://localhost:3001` with hot reload enabled.

## 📖 Documentation Structure

- `1.start-here/` – Quick-start and architecture overview
- `2.basics/` – Team, philosophy, and public good model
- `3.features/` – Deep dives into SDK subsystems
- `4.onboarding/` – Integration journeys and support

## ✍️ Writing Guidelines

### Content Principles
- **Clarity first** — Explain concepts in plain language before diving into detail.
- **Developer focus** — Speak to builders integrating ParaPort, with actionable guidance.
- **Accuracy** — Reflect the current SDK behavior; note roadmap items explicitly.
- **Inclusivity** — Use gender-neutral, accessible language.

### Markdown Style
- Maintain heading hierarchy (H1 → H2 → H3).
- Use fenced code blocks with language identifiers.
- Provide alt text for images and diagrams.
- Prefer present tense and active voice.

### Voice & Tone
- Confident and pragmatic.
- Ecosystem-aligned with the Polkadot community.
- Helpful, not hype-driven.

## 🐛 Reporting Issues
1. Search existing issues to avoid duplicates.
2. Include affected page paths (e.g., `/features/auto-teleport`).
3. Describe the expected vs. actual content.
4. Share supporting context (logs, screenshots, links) when available.

## 💡 Suggesting Improvements
1. Outline the problem the new content solves.
2. Propose structure or headings you would add.
3. Link to related discussions, specs, or milestones.
4. Label the issue appropriately (`docs`, `request`, etc.).

## 🔄 Pull Request Process

### Before Submitting
- [ ] Preview your changes locally.
- [ ] Run spell check or use a grammar tool.
- [ ] Verify internal and external links.
- [ ] Update related pages or navigation if needed.

### Branching
```bash
git checkout -b docs/update-teleport-calculation
```

### Opening the PR
1. Write clear, descriptive commit messages.
2. Include screenshots for visual changes.
3. Reference any related issues or milestones.
4. Fill out the PR template (see below).

### PR Template
```markdown
## Summary
Briefly describe what changed.

## Motivation
Why is this update useful for readers?

## Testing
List the commands you ran (e.g., `npm run dev`, manual link checks).

## Checklist
- [ ] Content builds locally without errors
- [ ] All links verified
- [ ] Style guide followed
- [ ] Screenshots added (if UI changes)
```

## 🧪 Testing Docs
```bash
# Build static output
npm run build

# Preview the production build
npm run preview
```

## 💬 Communication
- **Email:** [pulcondrej@gmail.com](mailto:pulcondrej@gmail.com)
- **GitHub:** [exezbcz/paraport](https://github.com/exezbcz/paraport)
- **Advisor:** [Viki Val](https://github.com/vikiival) — ecosystem alignment and feedback

## 🤝 Code of Conduct
We follow the [Contributor Covenant](https://www.contributor-covenant.org/). Treat everyone with respect, offer constructive feedback, and collaborate openly.

Thanks again for helping make ParaPort documentation better for every builder in the Polkadot ecosystem!
