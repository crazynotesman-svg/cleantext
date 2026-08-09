# PostCraft — Social Media Post Formatter & Hashtag Cleaner

A zero-latency, 100% client-side web tool for creators, social media managers and indie hackers.
Format text for LinkedIn and X, keep Instagram line breaks intact, clean up hashtags, and
preview character limits — without a single byte leaving the browser.

**Live:** _pending Cloudflare Pages deployment (Step 5)_

## Why

| Pain point                                              | What PostCraft does                                            |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Instagram / Threads eat your blank lines on paste        | Injects invisible separator characters so line breaks survive   |
| LinkedIn and X have no native bold / italic              | Converts selected text to Unicode Bold, Italic, Mono and Script |
| Hashtag lists get messy and duplicated                   | Extracts, de-duplicates, normalises and moves them to the end   |
| Unclear character limits and mobile "See more" fold      | Live counters plus an explicit fold-line marker per platform    |

## Tech stack

| Layer        | Choice                              |
| ------------ | ----------------------------------- |
| Framework    | Vite 8 + React 19 + TypeScript 6    |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons        | `lucide-react`                      |
| Architecture | Pure client-side SPA, no backend    |
| Persistence  | `localStorage` (draft + theme)      |
| Hosting      | Cloudflare Pages                    |
| Linting      | oxlint                              |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle into dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

Requires Node.js 20.19+ (Vite 8).

## Project structure

```
postcraft/
├─ index.html                  # TDK meta, pre-paint theme script, JSON-LD (Step 4)
├─ vite.config.ts              # React + Tailwind v4 plugins
├─ src/
│  ├─ main.tsx                 # React entry
│  ├─ App.tsx                  # Split-screen dashboard shell (semantic HTML)
│  ├─ index.css                # Tailwind entry, theme tokens, dark variant
│  ├─ components/
│  │  ├─ layout/Header.tsx     # Logo, dark-mode toggle, repo link
│  │  └─ icons/GithubMark.tsx  # Inline GitHub mark (Lucide v1 dropped brand icons)
│  ├─ hooks/
│  │  ├─ useDarkMode.ts        # Class-strategy theme, synced to localStorage
│  │  └─ useLocalStorage.ts    # Safe persisted state with in-memory fallback
│  ├─ lib/
│  │  └─ platforms.ts          # Character limits and "See more" fold offsets
│  └─ types/index.ts           # Shared domain types
└─ dist/                       # Build output (Cloudflare Pages)
```

## Deployment (Cloudflare Pages)

| Setting             | Value           |
| ------------------- | --------------- |
| Framework preset    | Vite            |
| Build command       | `npm run build` |
| Build output directory | `dist`       |
| Node version        | `20` or newer   |

Every push to `main` triggers an automatic build and global CDN deploy.

## Privacy

There is no backend and no analytics call that carries your text. All formatting runs in
your browser; drafts are stored only in your own `localStorage`.

## License

MIT
