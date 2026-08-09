import { useLayoutEffect, useRef } from 'react'
import { Type } from 'lucide-react'
import { StyleToolbar } from './StyleToolbar'
import { QuickActions } from './QuickActions'
import { styleText } from '../../lib/text'
import type { CleanAction, UnicodeStyle } from '../../types'
import type { ToastTone } from '../ui/Toast'

const STYLE_LABELS: Record<UnicodeStyle, string> = {
  bold: 'Bold',
  italic: 'Italic',
  boldItalic: 'Bold Italic',
  monospace: 'Monospace',
  script: 'Script',
  normal: 'Normal',
}

interface EditorPaneProps {
  value: string
  onChange: (next: string) => void
  onAction: (action: CleanAction) => void
  showToast: (message: string, tone?: ToastTone) => void
}

export function EditorPane({ value, onChange, onAction, showToast }: EditorPaneProps) {
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
    const start = ta.selectionStart
    const end = ta.selectionEnd
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
    showToast(
      hasSelection
        ? `${STYLE_LABELS[style]} applied to selection`
        : `All text set to ${STYLE_LABELS[style]}`,
    )
  }

  return (
    <section
      aria-labelledby="editor-heading"
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 id="editor-heading" className="flex items-center gap-2 text-sm font-semibold">
        <Type className="size-4 text-brand-600 dark:text-brand-400" />
        Editor
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Select text, then pick a style. Cleanups apply to the whole post.
      </p>

      <div className="mt-3">
        <StyleToolbar onStyle={handleStyle} />
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck
        placeholder="Write your post here…  Paste from Notes, style it, clean it, and copy it anywhere."
        className="scrollbar-slim mt-3 min-h-56 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
      />

      <div className="mt-3">
        <QuickActions onAction={onAction} />
      </div>
    </section>
  )
}
