import { useState } from 'react'
import { Smile, X } from 'lucide-react'
import { SYMBOL_GROUPS, SYMBOL_GROUP_ORDER, type SymbolGroupId } from '../../lib/symbols'
import { useI18n } from '../../i18n/useI18n'

/**
 * Visual symbol & emoji picker. Trims the editor's QuickActions row.
 *
 * Insertion is touch-safe: `onTouchStart` preventDefault keeps the editor
 * textarea focused (so its selection survives), while the actual insertion is
 * fired on `onTouchEnd` — exactly mirroring StyleToolbar / QuickActions.
 */
export function SymbolPicker({ onInsert }: { onInsert: (symbol: string) => void }) {
  const { dict } = useI18n()
  const sym = dict.ui.symbols
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState<SymbolGroupId>('numbers')

  const fire = (s: string) => onInsert(s)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={sym.toggle}
        title={sym.toggle}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800"
      >
        <Smile className="size-4 text-brand-600 dark:text-brand-400" />
        {sym.title}
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {SYMBOL_GROUP_ORDER.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  aria-pressed={group === g}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    group === g
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {sym.categories[g]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={sym.close}
              title={sym.close}
              className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="grid max-h-48 grid-cols-6 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-8">
            {SYMBOL_GROUPS[group].map((s, i) => (
              <button
                key={`${group}-${i}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  fire(s)
                }}
                onClick={() => fire(s)}
                className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-lg transition hover:border-brand-300 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
