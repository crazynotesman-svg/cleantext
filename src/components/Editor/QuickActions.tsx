import { Eraser, Hash, Trash2, WrapText } from 'lucide-react'
import type { CleanAction } from '../../types'
import { useI18n } from '../../i18n/useI18n'

const ICONS: Record<CleanAction, typeof Hash> = {
  fixInstagramLineBreaks: WrapText,
  cleanHashtags: Hash,
  trimWhitespace: Eraser,
}

export function QuickActions({
  onAction,
  onClear,
  disabled,
}: {
  onAction: (action: CleanAction) => void
  onClear: () => void
  disabled?: boolean
}) {
  const { dict } = useI18n()
  const actions: { id: CleanAction; label: string; hint: string }[] = [
    {
      id: 'fixInstagramLineBreaks',
      label: dict.ui.actions.fixIg,
      hint: dict.ui.actions.fixIgHint,
    },
    {
      id: 'cleanHashtags',
      label: dict.ui.actions.cleanHashtags,
      hint: dict.ui.actions.cleanHashtagsHint,
    },
    {
      id: 'trimWhitespace',
      label: dict.ui.actions.trim,
      hint: dict.ui.actions.trimHint,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {actions.map((a) => {
          const Icon = ICONS[a.id]
          return (
            <button
              key={a.id}
              type="button"
              disabled={disabled}
              // Keep the textarea focused (mouse) and fire on touchend (touch),
              // mirroring StyleToolbar so the buttons work on every device.
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              onTouchEnd={(e) => {
                e.preventDefault()
                onAction(a.id)
              }}
              onClick={() => onAction(a.id)}
              title={a.hint}
              aria-label={a.hint}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800"
            >
              <Icon className="size-4 text-brand-600 dark:text-brand-400" />
              {a.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        onTouchEnd={(e) => {
          e.preventDefault()
          onClear()
        }}
        onClick={onClear}
        title={dict.ui.actions.clearHint}
        aria-label={dict.ui.actions.clearHint}
        className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/40 dark:bg-slate-900 dark:text-red-400 dark:hover:border-red-500/60 dark:hover:bg-red-500/10"
      >
        <Trash2 className="size-4" />
        {dict.ui.actions.clear}
      </button>
    </div>
  )
}
