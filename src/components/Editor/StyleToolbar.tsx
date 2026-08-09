import { styleText } from '../../lib/text'
import type { UnicodeStyle } from '../../types'

const STYLES: { id: UnicodeStyle; label: string }[] = [
  { id: 'bold', label: 'Bold' },
  { id: 'italic', label: 'Italic' },
  { id: 'boldItalic', label: 'Bold Italic' },
  { id: 'monospace', label: 'Mono' },
  { id: 'script', label: 'Script' },
]

export function StyleToolbar({
  onStyle,
  disabled,
  highlight,
}: {
  onStyle: (style: UnicodeStyle) => void
  disabled?: boolean
  highlight?: UnicodeStyle[]
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {STYLES.map((s) => {
        const isHi = highlight?.includes(s.id)
        return (
        <button
          key={s.id}
          type="button"
          disabled={disabled}
          onClick={() => onStyle(s.id)}
          title={`Apply ${s.label} to selection`}
          aria-label={`Apply ${s.label}`}
          className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-lg border bg-white px-3 py-2 text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800 ${
            isHi
              ? 'border-brand-400 ring-2 ring-brand-400/60 ring-offset-1 dark:border-brand-500 dark:ring-brand-500/50 dark:ring-offset-slate-900'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        >
          <span className="text-base leading-none">{styleText('Abc', s.id)}</span>
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {s.label}
          </span>
        </button>
        )
      })}
    </div>
  )
}
