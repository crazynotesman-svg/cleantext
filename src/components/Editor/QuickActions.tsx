import { Eraser, Hash, WrapText } from 'lucide-react'
import type { CleanAction } from '../../types'

const ACTIONS: { id: CleanAction; label: string; icon: typeof Hash; hint: string }[] = [
  {
    id: 'fixInstagramLineBreaks',
    label: 'Fix IG LineBreaks',
    icon: WrapText,
    hint: 'Append invisible chars so line breaks survive the Instagram paste',
  },
  {
    id: 'cleanHashtags',
    label: 'Clean Hashtags',
    icon: Hash,
    hint: 'Deduplicate hashtags and move them to the end of the post',
  },
  {
    id: 'trimWhitespace',
    label: 'Trim Whitespace',
    icon: Eraser,
    hint: 'Remove trailing spaces and collapse extra blank lines',
  },
]

export function QuickActions({
  onAction,
  disabled,
}: {
  onAction: (action: CleanAction) => void
  disabled?: boolean
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {ACTIONS.map((a) => {
        const Icon = a.icon
        return (
          <button
            key={a.id}
            type="button"
            disabled={disabled}
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
