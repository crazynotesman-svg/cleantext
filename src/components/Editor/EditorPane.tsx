import { useLayoutEffect, useRef } from 'react'
import { Info, Type } from 'lucide-react'
import { StyleToolbar } from './StyleToolbar'
import { QuickActions } from './QuickActions'
import { SymbolPicker } from './SymbolPicker'
import { styleText } from '../../lib/text'
import { insertAt } from '../../lib/symbols'
import type { CleanAction, UnicodeStyle } from '../../types'
import type { ToastTone } from '../ui/Toast'
import { useI18n } from '../../i18n/useI18n'

interface EditorPaneProps {
  value: string
  onChange: (next: string) => void
  onAction: (action: CleanAction) => void
  showToast: (message: string, tone?: ToastTone) => void
  highlight?: UnicodeStyle[]
  tip?: string
}

export function EditorPane({
  value,
  onChange,
  onAction,
  showToast,
  highlight,
  tip,
}: EditorPaneProps) {
  const { dict } = useI18n()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  // After a style transform we restore the selection once React re-renders.
  const pendingSelection = useRef<{ start: number; end: number } | null>(null)

  useLayoutEffect(() => {
    if (pendingSelection.current && textareaRef.current) {
      const { start, end } = pendingSelection.current
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(start, end)
      pendingSelection.current = null
    }
  })

  const handleStyle = (style: UnicodeStyle) => {
    const ta = textareaRef.current
    if (!ta) return
    const len = value.length
    // Nothing to style in an empty editor — avoid a misleading toast.
    if (len === 0) return
    // Read the live selection. Clamp + normalise so a reversed or out-of-range
    // selection (possible after focus/blur churn on some browsers) can't throw.
    let start = ta.selectionStart ?? 0
    let end = ta.selectionEnd ?? 0
    if (start > end) [start, end] = [end, start]
    start = Math.max(0, Math.min(start, len))
    end = Math.max(0, Math.min(end, len))
    // Fallback: when there is no explicit selection (collapsed caret, or the
    // selection was lost because a tap blurred the textarea on mobile), apply
    // the style to the WHOLE post so the user always sees a clear change.
    const hasSelection = start !== end
    const target = hasSelection ? value.slice(start, end) : value
    const styled = styleText(target, style)
    const next = hasSelection
      ? value.slice(0, start) + styled + value.slice(end)
      : styled
    pendingSelection.current = hasSelection
      ? { start, end: start + styled.length }
      : { start: 0, end: styled.length }
    onChange(next)
    const label = dict.ui.styles[style]
    showToast(
      hasSelection
        ? dict.ui.toast.applied(label)
        : dict.ui.toast.allText(label),
    )
  }

  const handleClear = () => {
    onChange('')
    showToast(dict.ui.toast.cleared)
    // Return focus to the editor so the user can keep typing immediately.
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  // Insert a symbol/emoji at the current caret (or replacing the selection).
  // Uses insertAt so a stale/reversed selection can never throw.
  const handleInsertSymbol = (symbol: string) => {
    const ta = textareaRef.current
    const len = value.length
    const start = ta?.selectionStart ?? len
    const end = ta?.selectionEnd ?? len
    const { text: next, caret } = insertAt(value, symbol, start, end)
    pendingSelection.current = { start: caret, end: caret }
    onChange(next)
  }

  return (
    <section
      aria-labelledby="editor-heading"
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 id="editor-heading" className="flex items-center gap-2 text-sm font-semibold">
        <Type className="size-4 text-brand-600 dark:text-brand-400" />
        {dict.ui.editorTitle}
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {dict.ui.editorDesc}
      </p>

      <div className="mt-3">
        <StyleToolbar onStyle={handleStyle} highlight={highlight} />
      </div>

      <div className="mt-3">
        <SymbolPicker onInsert={handleInsertSymbol} />
      </div>

      {tip && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-xs leading-relaxed text-brand-800 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>{tip}</span>
        </p>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        placeholder="Write your post here…  Paste from Notes, style it, clean it, and copy it anywhere."
        className="scrollbar-slim mt-3 min-h-56 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
      />

      <div className="mt-3">
        <QuickActions onAction={onAction} onClear={handleClear} />
      </div>
    </section>
  )
}
