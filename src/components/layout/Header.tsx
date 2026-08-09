import { Moon, Sparkles, Sun } from 'lucide-react'
import { GithubMark } from '../icons/GithubMark'

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  repoUrl: string
}

export function Header({ isDark, onToggleTheme, repoUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
            <Sparkles className="size-4.5" strokeWidth={2.25} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight">
              PostCraft
            </span>
            <span className="mt-0.5 hidden text-[11px] text-slate-500 sm:block dark:text-slate-400">
              Format · Clean · Preview
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            {isDark ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </button>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View source on GitHub"
            className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <GithubMark className="size-4.5" />
          </a>
        </nav>
      </div>
    </header>
  )
}
