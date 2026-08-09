import { Eraser, Hash, WrapText } from 'lucide-react'
import type { CleanAction } from '../../types'
import { useI18n } from '../../i18n/useI18n'

const ICONS: Record<CleanAction, typeof Hash> = {
  fixInstagramLineBreaks: WrapText,
  cleanHashtags: Hash,
  trimWhitespace: Eraser,
}

export function QuickActions({
  onAction,
  disabled,
}: {
  onAction: (action: CleanAction) => void
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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {actions.map((a) => {
        const Icon = ICONS[a.id]
        return (
          <button
            key={a.id}
            type="button"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onAction(a.id)}
            title={a.hint}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800"
          >
            <Icon className="size-4 text-brand-600 dark:text-brand-400" />
            {a.label}
          </button>
        )
      })}
    </div>
  )
}
