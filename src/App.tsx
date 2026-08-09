import { Eraser, PanelsTopLeft, Type } from 'lucide-react'
import { Header } from './components/layout/Header'
import { useDarkMode } from './hooks/useDarkMode'
import { PLATFORMS } from './lib/platforms'

const REPO_URL = 'https://github.com/postcraft-app/postcraft'

/**
 * Step 1 scaffold: verifies Vite + React + TS + Tailwind + Lucide are wired up
 * and locks in the semantic split-screen shell that Steps 2–4 will fill in.
 */
export default function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <div className="flex min-h-dvh flex-col">
      <Header isDark={isDark} onToggleTheme={toggle} repoUrl={REPO_URL} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Social Media Post Formatter &amp; Hashtag Cleaner
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Bold and italic text for LinkedIn and X, Instagram line breaks that
            survive the paste, tidy hashtags, and live character limits — all in
            your browser.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* LEFT PANE — interactive editor (Step 3) */}
          <section
            aria-labelledby="editor-heading"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2
              id="editor-heading"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Type className="size-4 text-brand-600 dark:text-brand-400" />
              Editor
            </h2>
            <Placeholder
              icon={<Eraser className="size-5" />}
              label="Stylizer toolbar, textarea and cleaning actions land here in Step 3."
            />
          </section>

          {/* RIGHT PANE — live multi-platform preview (Step 3) */}
          <aside
            aria-labelledby="preview-heading"
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h2
              id="preview-heading"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <PanelsTopLeft className="size-4 text-brand-600 dark:text-brand-400" />
              Live preview
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PLATFORMS.map((platform) => (
                <li
                  key={platform.id}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  {platform.label}
                  <span className="ml-1.5 text-slate-400 dark:text-slate-500">
                    {platform.charLimit.toLocaleString('en-US')}
                  </span>
                </li>
              ))}
            </ul>
            <Placeholder
              icon={<PanelsTopLeft className="size-5" />}
              label="Feed cards, counters and the See-more fold marker land here in Step 3."
            />
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        PostCraft — 100% client-side. Your text never leaves this browser.
      </footer>
    </div>
  )
}

function Placeholder({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="mt-3 flex min-h-56 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 px-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <span className="text-slate-400 dark:text-slate-500">{icon}</span>
      {label}
    </div>
  )
}
