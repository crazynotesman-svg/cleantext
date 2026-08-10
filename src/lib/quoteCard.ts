/**
 * Quote Card Generator — pure design tokens + layout maths.
 *
 * Everything here is framework-agnostic and side-effect free so the visual
 * contract (presets, export dimensions, auto font sizing, file naming) can be
 * unit tested without a DOM. The React component only consumes these values.
 */

/* ------------------------------------------------------------------ *
 * Aspect ratios
 * ------------------------------------------------------------------ */

export const ASPECT_RATIOS = ['1:1', '4:5', '16:9'] as const
export type AspectRatioId = (typeof ASPECT_RATIOS)[number]

export interface CardSize {
  width: number
  height: number
}

/**
 * Export dimensions in real pixels. The card is rendered at exactly these
 * dimensions in the DOM and only visually down-scaled for the preview, so the
 * exported PNG is pixel-identical to what the user sees (true WYSIWYG).
 */
export const ASPECT_DIMENSIONS: Record<AspectRatioId, CardSize> = {
  '1:1': { width: 1080, height: 1080 },
  '4:5': { width: 1080, height: 1350 },
  '16:9': { width: 1920, height: 1080 },
}

export function getAspectDimensions(ratio: AspectRatioId): CardSize {
  return ASPECT_DIMENSIONS[ratio]
}

/* ------------------------------------------------------------------ *
 * Visual presets
 * ------------------------------------------------------------------ */

export const QUOTE_PRESETS = ['dark', 'xiaohongshu', 'gradient', 'paper'] as const
export type QuotePresetId = (typeof QUOTE_PRESETS)[number]

export interface QuotePanel {
  /** Inner sheet background. */
  background: string
  /** Corner radius, expressed as a fraction of the card width. */
  radiusRatio: number
  /** CSS border shorthand for the sheet. */
  border: string
  /** CSS box-shadow for the sheet. */
  shadow: string
}

export interface QuotePreset {
  id: QuotePresetId
  /** Outer canvas background (solid colour or gradient). */
  surface: string
  /** Optional decorative layer painted above the surface. */
  overlay?: string
  /** Optional inner sheet; when absent the quote sits directly on the surface. */
  panel?: QuotePanel
  /** Quote body colour. */
  text: string
  /** Attribution / author colour. */
  muted: string
  /** Decorative opening quote-mark colour. */
  mark: string
  /** Watermark colour. */
  watermark: string
  /** Font stack for the quote body (system stacks only — see note below). */
  font: string
  /** Quote body font weight. */
  weight: number
  /** Quote body letter-spacing. */
  tracking: string
  /** Whether the preset renders on a dark canvas. */
  dark: boolean
}

/**
 * Only system font stacks are used. `html-to-image` has to inline every web
 * font as a base64 data URI before rasterising; remote fonts routinely fail
 * that step (CORS) and silently export a blank or fallback-font card. System
 * stacks sidestep the problem entirely.
 */
const SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
const SERIF = 'Georgia, Cambria, "Times New Roman", Times, serif'

export const QUOTE_PRESET_STYLES: Record<QuotePresetId, QuotePreset> = {
  // Dark Mode Minimalist — the X / Twitter dark timeline look.
  dark: {
    id: 'dark',
    surface: '#0f1419',
    overlay:
      'radial-gradient(120% 85% at 50% 0%, rgba(29,155,240,0.18) 0%, rgba(15,20,25,0) 62%)',
    text: '#f7f9f9',
    muted: '#8b98a5',
    mark: 'rgba(29,155,240,0.45)',
    watermark: 'rgba(139,152,165,0.78)',
    font: SANS,
    weight: 600,
    tracking: '-0.015em',
    dark: true,
  },

  // Xiaohongshu Viral — soft-light pastel wash with a rounded white sheet.
  xiaohongshu: {
    id: 'xiaohongshu',
    surface:
      'linear-gradient(160deg, #ffeef2 0%, #fff6f0 45%, #f2f0ff 100%)',
    panel: {
      background: 'rgba(255,255,255,0.88)',
      radiusRatio: 0.052,
      border: '1px solid rgba(255,255,255,0.95)',
      shadow: '0 24px 70px rgba(226,124,143,0.20)',
    },
    text: '#2f2b33',
    muted: '#8a7f8c',
    mark: 'rgba(255,107,138,0.38)',
    watermark: 'rgba(126,114,126,0.72)',
    font: SANS,
    weight: 600,
    tracking: '0em',
    dark: false,
  },

  // Gradient Vibe — saturated modern gradient, white type.
  gradient: {
    id: 'gradient',
    surface:
      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #ec4899 100%)',
    overlay:
      'radial-gradient(100% 100% at 0% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 58%)',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.80)',
    mark: 'rgba(255,255,255,0.38)',
    watermark: 'rgba(255,255,255,0.72)',
    font: SANS,
    weight: 700,
    tracking: '-0.02em',
    dark: true,
  },

  // Paper Aesthetic — aged stock, hairline rule frame, serif type.
  paper: {
    id: 'paper',
    surface: '#f2e9d8',
    overlay:
      'radial-gradient(85% 70% at 50% 45%, rgba(255,253,246,0.9) 0%, rgba(206,186,148,0.38) 100%)',
    panel: {
      background: 'transparent',
      radiusRatio: 0.006,
      border: '1px solid rgba(120,96,60,0.30)',
      shadow: 'none',
    },
    text: '#3b3126',
    muted: '#7a6a52',
    mark: 'rgba(122,106,82,0.38)',
    watermark: 'rgba(122,106,82,0.85)',
    font: SERIF,
    weight: 500,
    tracking: '0.005em',
    dark: false,
  },
}

export function getPreset(id: QuotePresetId): QuotePreset {
  return QUOTE_PRESET_STYLES[id]
}

/* ------------------------------------------------------------------ *
 * Layout maths
 * ------------------------------------------------------------------ */

/** Attribution shown bottom-right on every exported card. */
export const WATERMARK_TEXT = 'Made with postcraft.100ideas.net'

/** Soft ceiling for the quote body; the textarea enforces it. */
export const QUOTE_MAX_LENGTH = 600

/** Horizontal padding as a fraction of card width. */
export const PADDING_RATIO = 0.1

/** Line height multiplier used for both preview and export. */
export const LINE_HEIGHT = 1.36

/**
 * Pick a quote font size (px, at export scale) that keeps the text inside the
 * card without manual tuning.
 *
 * The usable text box is the card minus padding and the footer strip. Treating
 * a glyph as occupying roughly `0.62 · size²` of area gives an ideal size of
 * `sqrt(area / (chars · 0.62))`, which is then clamped to a per-ratio range.
 * The result is monotonically non-increasing as the quote grows.
 */
export function fitFontSize(text: string, ratio: AspectRatioId): number {
  const { width, height } = ASPECT_DIMENSIONS[ratio]
  // Count code points so emoji and Unicode-styled letters count as one glyph.
  const len = [...text.trim()].length || 1

  const usable = width * (1 - PADDING_RATIO * 2) * (height * 0.62)
  const ideal = Math.sqrt(usable / (len * 0.62))

  const max = Math.round(width * 0.075)
  const min = Math.round(width * 0.022)
  return Math.round(Math.min(max, Math.max(min, ideal)))
}

/** Author / handle size, derived from the quote size so the hierarchy holds. */
export function attributionFontSize(quoteSize: number): number {
  return Math.round(Math.max(quoteSize * 0.42, 20))
}

/** Watermark size — fixed to the card width so it never dominates. */
export function watermarkFontSize(ratio: AspectRatioId): number {
  return Math.round(ASPECT_DIMENSIONS[ratio].width * 0.019)
}

/* ------------------------------------------------------------------ *
 * Export helpers
 * ------------------------------------------------------------------ */

/** ASCII slug used in the downloaded file name. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .slice(0, 40)
    .replace(/-+$/, '')
}

/** e.g. `postcraft-quote-dark-1x1-stay-hungry-stay-foolish.png` */
export function buildFileName(
  text: string,
  preset: QuotePresetId,
  ratio: AspectRatioId,
): string {
  const slug = slugify(text) || 'quote'
  return `postcraft-quote-${preset}-${ratio.replace(':', 'x')}-${slug}.png`
}

/**
 * Tidy a quote for rendering: normalise newlines, drop trailing spaces and
 * collapse runs of blank lines to a single empty line. Intentionally does NOT
 * truncate — the caller decides how to surface an over-length quote.
 */
export function normalizeQuote(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Format the attribution line, e.g. "— Steve Jobs". Empty input -> "". */
export function formatAttribution(author: string): string {
  const clean = author.trim()
  return clean ? `— ${clean}` : ''
}
