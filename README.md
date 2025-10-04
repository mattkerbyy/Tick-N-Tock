# 🎮 Tick N Tock - Classic Tic-Tac-Toe Game Reimagined

Welcome to Tick N Tock! A compact, nostalgic take on the classic Tic‑Tac‑Toe game built with **Next.js** and **Tailwind CSS**.

## About

Tick N Tock is a compact web game project I built to sharpen my modern front-end skills while delivering a polished, responsive, and accessible experience. It’s implemented with Next.js + TypeScript, styled using Tailwind CSS, animated with Framer Motion, and enhanced by a lightweight WebAudio helper for in-browser sound effects. Additionally, it was an opportunity to learn new techniques for improving SEO, including optimizing metadata, structuring content, and ensuring clean, crawl-friendly code.

## Features

- Playable Tic-Tac-Toe (X vs O)
- Move history feature
- Keyboard navigation & other accessibility features
- Fully responsive layout
- Smooth UI transitions & animations
- Theme toggle (light / dark) with system preference support
- Compact in-browser sound effects for moves, wins, draws, and UI actions
- PWA-ready setup: manifest, icons
- Open Graph image + meta setup for social sharing and SEO

## Getting Started

To run this project locally:

1. Clone the repository:

```bash
git clone https://github.com/mattkerbyy/Tick-N-Tock.git
cd front-end
```

2. Install dependencies:

```bash
npm install
# or
# yarn
```

3. Run the development server:

```bash
npm run dev
# Open http://localhost:3000
```

> Recommended: Node.js 18+ for best compatibility with Next.js 14 and newer toolchains.

## Project Structure (high level)

- `app/` — Next.js App Router pages and layout
- `components/` — React UI components (Board, Square, GameControls, Footer, etc.)
- `public/` — Static assets (icons, opengraph image)
- `lib/` — Pure helper modules (e.g. `winner.ts`, `coords.ts`)
- `hooks/` — Custom React hooks (sound helpers, persisted state)
- `scripts/` — Build / asset helper scripts (icon generation)

## Developer Notes

- Linting & formatting
  - ESLint config: `.eslintrc.json`
  - Prettier config: `.prettierrc`
- PWA manifest: `public/site.webmanifest`
- Open Graph: `app/opengraph-image.png`

If you change icons or the OG image, run the helper scripts in `scripts/` to regenerate PNG/ICO assets.

## Why I Made This

I built Tick N Tock to explore creating a polished web game with modern front-end tools (Next.js, Tailwind, Framer Motion), with strong attention to animations, keyboard accessibility, sound effects, and progressive enhancement toward an installable PWA.

---

Thank you for checking out my project! Enjoy the game!