import { useState } from 'react'
import { Check, Copy, Scissors, Trash2, WrapText } from 'lucide-react'
import { splitThread, THREAD_LIMITS, type ThreadPreset } from '../lib/thread'
import { countChars, fixInstagramLineBreaks } from '../lib/text'
import { useI18n } from '../i18n/useI18n'
import type { ToastTone } from './ui/Toast'

/**
 * Thread Splitter & Line Break Fixer — Phase 1 of the Creator Suite.
 *
 * Owns its own local input state (independent of the main editor draft) and
 * renders the split result as a list of copyable "tweet cards". Buttons use
 * plain onClick: the textarea is a controlled component, so there is no caret
 * to preserve — unlike the symbol picker, which must keep the main editor's
 * selection alive on touch devices.
 */
export function ThreadSplitter({
  showToast,
}: {
  showToast: (message: string, tone?: ToastTone) => void
}) {
  const { dict } = useI18n()
  const t = dict.ui.thread

  const [input, setInput] = useState('')
  const [limit, setLimit] = useState<number>(THREAD_LIMITS.twitter)
  const [preset, setPreset] = useState<ThreadPreset>('twitter')
  const [parts, setParts] = useState<string[] | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const doSplit = () => {
    const result = splitThread(input, limit)
    setParts(result)
    if (result.length > 0) showToast(dict.ui.toast.threadSplit(result.length))
    else showToast(t.empty, 'info')
  }

  const doFixBreaks = () => {
    setInput((prev) => fixInstagramLineBreaks(prev))
    showToast(dict.ui.toast.lineBreaksFixed)
  }

  const doClear = () => {
    setInput('')
    setParts(null)
    setCopiedIdx(null)
  }

  const copyPart = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIdx(idx)
      window.setTimeout(
        () => setCopiedIdx((c) => (c === idx ? null : c)),
        1500,
      )
    } catch {
      showToast(dict.ui.toast.copyFailed, 'error')
    }
  }

  const totalChars = countChars(input)

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Scissors className="size-4 text-brand-600 dark:text-brand-400" />
          {t.title}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {t.subtitle}
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.inputPlaceholder}
        spellCheck
        className="scrollbar-slim min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <span>{t.limitLabel}</span>
          <select
            value={preset}
            onChange={(e) => {
              const v = e.target.value as ThreadPreset
              setPreset(v)
              if (v === 'twitter') setLimit(THREAD_LIMITS.twitter)
              if (v === 'threads') setLimit(THREAD_LIMITS.threads)
            }}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="twitter">{t.presets.twitter}</option>
            <option value="threads">{t.presets.threads}</option>
            <option value="custom">{t.presets.custom}</option>
          </select>
        </label>

        {preset === 'custom' && (
          <input
            type="number"
            min={1}
            value={limit}
            onChange={(e) =>
              setLimit(Math.max(1, Number(e.target.value) || 1))
            }
            className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
        )}

        <span
          className={`text-xs font-medium ${
            totalChars > limit
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-slate-400'
          }`}
        >
          {totalChars.toLocaleString(dict.ui.numberLocale)} /{' '}
          {limit.toLocaleString(dict.ui.numberLocale)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={doSplit}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <Scissors className="size-4" />
          {t.split}
        </button>
        <button
          type="button"
          onClick={doFixBreaks}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800"
        >
          <WrapText className="size-4 text-brand-600 dark:text-brand-400" />
          {t.fixBreaks}
        </button>
        <button
          type="button"
          onClick={doClear}
          className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:border-red-500/40 dark:bg-slate-900 dark:text-red-400 dark:hover:border-red-500/60 dark:hover:bg-red-500/10"
        >
          <Trash2 className="size-4" />
          {t.clear}
        </button>
      </div>

      {parts && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">{t.partsHeading}</h3>
          <div className="flex flex-col gap-3">
            {parts.map((part, idx) => {
              const n = countChars(part)
              const over = n > limit
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="whitespace-pre-wrap text-sm text-slate-800 dark:text-slate-100">
                      {part}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyPart(part, idx)}
                      aria-label={t.cardCopy}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700"
                    >
                      {copiedIdx === idx ? (
                        <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      {copiedIdx === idx ? t.cardCopied : t.cardCopy}
                    </button>
                  </div>
                  <div
                    className={`mt-2 text-right text-xs ${
                      over
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {over
                      ? t.overLimit(n - limit)
                      : t.charsOf(n, limit)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
