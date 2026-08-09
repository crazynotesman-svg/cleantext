import { Check, Copy, PanelsTopLeft } from 'lucide-react'
import { PLATFORMS, getPlatform } from '../../lib/platforms'
import { countChars } from '../../lib/text'
import type { PlatformId } from '../../types'
import { PlatformCard } from './PlatformCard'

interface PreviewPaneProps {
  text: string
  activePlatform: PlatformId
  onPlatformChange: (id: PlatformId) => void
  onCopy: () => void
  copied: boolean
}

export function PreviewPane({
  text,
  activePlatform,
  onPlatformChange,
  onCopy,
  copied,
}: PreviewPaneProps) {
  const platform = getPlatform(activePlatform)

  return (
    <aside
      aria-labelledby="preview-heading"
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2
        id="preview-heading"
        className="flex items-center gap-2 text-sm font-semibold"
      >
        <PanelsTopLeft className="size-4 text-brand-600 dark:text-brand-400" />
        Live preview
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {PLATFORMS.map((p) => {
          const c = countChars(text)
          const active = p.id === activePlatform
          const over = c > p.charLimit
          return (
            <button
              key={p.id}
              type="button"
              data-active={active}
              onClick={() => onPlatformChange(p.id)}
              className={`flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition ${
                active
                  ? 'border-brand-400 bg-brand-50 dark:bg-slate-800'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {p.label}
              </span>
              <span
                className={`text-[11px] tabular-nums ${
                  over
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {c.toLocaleString('en-US')} / {p.charLimit.toLocaleString('en-US')}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
        <PlatformCard platform={platform} text={text} />
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{platform.hint}</p>

      <button
        type="button"
        onClick={onCopy}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/30 transition hover:bg-brand-700"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? 'Copied!' : 'Copy Clean Text'}
      </button>
    </aside>
  )
}
