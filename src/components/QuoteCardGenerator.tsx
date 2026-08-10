import { useCallback, useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, Image as ImageIcon, Loader2, Trash2 } from 'lucide-react'
import {
  ASPECT_RATIOS,
  LINE_HEIGHT,
  PADDING_RATIO,
  QUOTE_MAX_LENGTH,
  QUOTE_PRESETS,
  WATERMARK_TEXT,
  attributionFontSize,
  buildFileName,
  fitFontSize,
  formatAttribution,
  getAspectDimensions,
  getPreset,
  normalizeQuote,
  watermarkFontSize,
  type AspectRatioId,
  type QuotePresetId,
} from '../lib/quoteCard'
import { useI18n } from '../i18n/useI18n'
import type { ToastTone } from './ui/Toast'

/** Ratio id -> i18n key, so the dictionary stays free of punctuation keys. */
const RATIO_KEY: Record<AspectRatioId, 'square' | 'portrait' | 'landscape'> = {
  '1:1': 'square',
  '4:5': 'portrait',
  '16:9': 'landscape',
}

/**
 * The exported card surface.
 *
 * Rendered at its true export dimensions (1080px+) and only visually
 * down-scaled by the parent, so the PNG is pixel-identical to the preview.
 * All styling is inline: `html-to-image` clones the node and inlines computed
 * styles, and inline values survive that round-trip far more reliably than
 * utility classes that depend on external stylesheets.
 */
function QuoteCard({
  cardRef,
  text,
  author,
  presetId,
  ratio,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>
  text: string
  author: string
  presetId: QuotePresetId
  ratio: AspectRatioId
}) {
  const preset = getPreset(presetId)
  const { width, height } = getAspectDimensions(ratio)
  const pad = Math.round(width * PADDING_RATIO)
  const quoteSize = fitFontSize(text, ratio)
  const authorSize = attributionFontSize(quoteSize)
  const markSize = Math.round(width * 0.155)
  const wmSize = watermarkFontSize(ratio)
  const attribution = formatAttribution(author)
  const panel = preset.panel

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width,
        height,
        boxSizing: 'border-box',
        overflow: 'hidden',
        background: preset.surface,
        fontFamily: preset.font,
      }}
    >
      {preset.overlay && (
        <div style={{ position: 'absolute', inset: 0, background: preset.overlay }} />
      )}

      {panel && (
        <div
          style={{
            position: 'absolute',
            inset: Math.round(pad * 0.5),
            background: panel.background,
            borderRadius: Math.round(width * panel.radiusRatio),
            border: panel.border,
            boxShadow: panel.shadow,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: pad,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            height: Math.round(markSize * 0.52),
            overflow: 'hidden',
            fontFamily: 'Georgia, serif',
            fontSize: markSize,
            fontWeight: 700,
            lineHeight: 0.82,
            color: preset.mark,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', minHeight: 0 }}>
          <p
            style={{
              margin: 0,
              width: '100%',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              fontSize: quoteSize,
              lineHeight: LINE_HEIGHT,
              fontWeight: preset.weight,
              letterSpacing: preset.tracking,
              color: preset.text,
            }}
          >
            {text}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: Math.round(pad * 0.5),
          }}
        >
          <span
            style={{
              fontSize: authorSize,
              fontWeight: 500,
              color: preset.muted,
              letterSpacing: '0.01em',
            }}
          >
            {attribution}
          </span>
          <span
            style={{
              flexShrink: 0,
              fontSize: wmSize,
              color: preset.watermark,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            {WATERMARK_TEXT}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Quote Card Generator — Phase 2 of the Creator Suite.
 *
 * Turns a line of text into a share-ready PNG across 4 visual presets and
 * 3 aspect ratios. Export runs fully client-side via `html-to-image`; nothing
 * is uploaded.
 */
export function QuoteCardGenerator({
  showToast,
}: {
  showToast: (message: string, tone?: ToastTone) => void
}) {
  const { dict } = useI18n()
  const t = dict.ui.quote

  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [presetId, setPresetId] = useState<QuotePresetId>('dark')
  const [ratio, setRatio] = useState<AspectRatioId>('1:1')
  const [busy, setBusy] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)

  const dims = getAspectDimensions(ratio)

  // Fit the full-size card into whatever width the column gives us.
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    const apply = (w: number) => {
      if (w > 0) setScale(w / dims.width)
    }
    apply(shell.clientWidth)
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) apply(entry.contentRect.width)
    })
    ro.observe(shell)
    return () => ro.disconnect()
  }, [dims.width])

  const display = normalizeQuote(text) || t.sample
  const remaining = QUOTE_MAX_LENGTH - text.length

  const handleDownload = useCallback(async () => {
    const node = cardRef.current
    if (!node || busy) return
    setBusy(true)
    try {
      const options = {
        pixelRatio: 1,
        cacheBust: true,
        width: dims.width,
        height: dims.height,
        // The live node sits inside a scaled wrapper; the clone must not
        // inherit that transform or the export would be cropped.
        style: { transform: 'none', transformOrigin: 'top left', margin: '0' },
      }
      // First pass warms the style/font cache — browsers routinely rasterise
      // a blank frame on the very first html-to-image call.
      await toPng(node, options)
      const dataUrl = await toPng(node, options)

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = buildFileName(normalizeQuote(text) || 'quote', presetId, ratio)
      link.click()
      showToast(dict.ui.toast.imageDownloaded)
    } catch {
      showToast(dict.ui.toast.imageFailed, 'error')
    } finally {
      setBusy(false)
    }
  }, [busy, dims.width, dims.height, text, presetId, ratio, showToast, dict])

  const handleClear = () => {
    setText('')
    setAuthor('')
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      {/* ---------------- Controls ---------------- */}
      <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ImageIcon className="size-4 text-brand-600 dark:text-brand-400" />
            {t.title}
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.subtitle}</p>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={QUOTE_MAX_LENGTH}
          placeholder={t.inputPlaceholder}
          spellCheck
          className="scrollbar-slim min-h-36 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 text-[15px] leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600"
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex flex-1 items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="shrink-0">{t.authorLabel}</span>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={60}
              placeholder={t.authorPlaceholder}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-600"
            />
          </label>
          <span
            className={`shrink-0 text-xs font-medium ${
              remaining < 60 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
            }`}
          >
            {t.charsLeft(remaining)}
          </span>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t.presetLabel}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {QUOTE_PRESETS.map((id) => {
              const p = getPreset(id)
              const active = presetId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPresetId(id)}
                  aria-pressed={active}
                  className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-sm font-medium transition ${
                    active
                      ? 'border-brand-400 bg-brand-50 text-brand-700 dark:border-brand-600 dark:bg-brand-950/40 dark:text-brand-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="size-6 shrink-0 rounded-md border border-black/10 shadow-inner dark:border-white/10"
                    style={{ background: p.surface }}
                  />
                  <span className="truncate">{t.presets[id]}</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t.ratioLabel}
          </legend>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((r) => {
              const active = ratio === r
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRatio(r)}
                  aria-pressed={active}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'border-brand-400 bg-brand-50 text-brand-700 dark:border-brand-600 dark:bg-brand-950/40 dark:text-brand-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-700'
                  }`}
                >
                  {t.ratios[RATIO_KEY[r]]}
                </button>
              )
            })}
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {busy ? t.downloading : t.download}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:border-red-500/40 dark:bg-slate-900 dark:text-red-400 dark:hover:border-red-500/60 dark:hover:bg-red-500/10"
          >
            <Trash2 className="size-4" />
            {t.clear}
          </button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">{t.exportHint}</p>
      </section>

      {/* ---------------- Live preview ---------------- */}
      <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold">{t.previewLabel}</h2>

        <div
          ref={shellRef}
          className="w-full overflow-hidden rounded-lg"
          style={{ height: Math.round(dims.height * scale) }}
        >
          <div
            style={{
              width: dims.width,
              height: dims.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <QuoteCard
              cardRef={cardRef}
              text={display}
              author={author}
              presetId={presetId}
              ratio={ratio}
            />
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          {t.sizeNote(dims.width, dims.height)}
        </p>
      </section>
    </div>
  )
}
