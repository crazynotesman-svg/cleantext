import { styleText } from '../../lib/text'
import type { UnicodeStyle } from '../../types'
import { useI18n } from '../../i18n/useI18n'

const STYLES: UnicodeStyle[] = ['bold', 'italic', 'boldItalic', 'monospace', 'script']

export function StyleToolbar({
  onStyle,
  disabled,
  highlight,
}: {
  onStyle: (style: UnicodeStyle) => void
  disabled?: boolean
  highlight?: UnicodeStyle[]
}) {
  const { dict } = useI18n()
  return (
    <div className="flex flex-wrap gap-1.5">
      {STYLES.map((id) => {
        const isHi = highlight?.includes(id)
        const label = dict.ui.styles[id]
        return (
          <button
            key={id}
            type="button"
            disabled={disabled}
            // Keep the textarea focused + its selection intact.
            // - Mouse: preventDefault on mousedown stops the textarea from
            //   blurring so the selection survives into handleStyle.
            // - Touch: preventDefault on touchstart stops the tap from blurring
            //   the textarea (which would otherwise clear the selection before
            //   the synthesized click). We then fire the action on touchend,
            //   because preventDefault on touchstart also suppresses the
            //   synthesized click on mobile — without touchend the button would
            //   do nothing on phones/tablets.
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            onTouchEnd={(e) => {
              e.preventDefault()
              onStyle(id)
            }}
            onClick={() => onStyle(id)}
            title={dict.ui.styleTooltip(label)}
            aria-label={dict.ui.styleTooltip(label)}
            className={`flex min-w-[64px] flex-col items-center gap-0.5 rounded-lg border bg-white px-3 py-2 text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800 ${
              isHi
                ? 'border-brand-400 ring-2 ring-brand-400/60 ring-offset-1 dark:border-brand-500 dark:ring-brand-500/50 dark:ring-offset-slate-900'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <span className="text-base leading-none">{styleText('Abc', id)}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
