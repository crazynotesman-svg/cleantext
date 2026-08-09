/**
 * PostCraft core text engine — pure, framework-agnostic functions.
 *
 * Everything here is 100% client-side and side-effect free so it can be unit
 * tested without React. Step 2 of the PRD roadmap.
 */

import type { UnicodeStyle } from '../types'

/**
 * Invisible character appended after every newline by `fixInstagramLineBreaks`.
 * Instagram strips bare `\n` when pasting; a trailing zero-width space tricks
 * the composer into preserving the line break.
 */
export const ZWSP = '​'

// --- Unicode "font" mapping ------------------------------------------------

// Each style maps the 26 ASCII letters (+ digits where supported) onto the
// Unicode "Mathematical Alphanumeric Symbols" block. We DO NOT use a bare
// `charCode + offset` formula: that lands on RESERVED, unassigned code points
// (Unicode "gaps") inside the block for a few letters — most notably italic
// small `h`, whose `+offset` result (U+1D455) is unassigned and would render as
// a blank/tofu glyph. Instead we materialize an EXPLICIT per-character lookup
// table for every style, generated from code points (so there are no
// hand-typed glyphs to get wrong) and with the historical gap characters
// substituted by their correct Letterlike Symbols glyph.

/** Build a string of `count` consecutive code points starting at `start`. */
function codepoints(start: number, count: number): string {
  let s = ''
  for (let i = 0; i < count; i++) s += String.fromCodePoint(start + i)
  return s
}

// Script capitals are NOT contiguous: several letters borrow their glyph from
// the Letterlike Symbols block instead of the math block.
const SCRIPT_UPPER: Record<string, string> = {
  A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ',
  I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫',
  Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳',
  Y: '𝒴', Z: 'ℨ',
}

// Explicit, materialized lookup tables for every style the UI emits. Each table
// is an ARRAY of single-code-point strings (not a bare string) so that indexing
// by letter position yields the full character — indexing a JS string with `[]`
// would only return one UTF-16 code unit and shatter math-block surrogate pairs.
const STYLE_TABLES: Record<
  Exclude<UnicodeStyle, 'normal'>,
  { upper: string[]; lower: string[]; digits: string[] | null }
> = (() => {
  // Italic lowercase `h`: U+1D44E + 7 = U+1D455 is a reserved gap. The correct
  // italic small-h glyph is ℎ (U+210E) from the Letterlike Symbols block.
  const italicLower = [...codepoints(0x1d44e, 26)]
  italicLower[7] = 'ℎ'

  // Script capitals: use the Letterlike exception glyph where one exists,
  // otherwise the contiguous math-block capital (U+1D49C..U+1D4B5).
  const scriptUpper = Array.from({ length: 26 }, (_, i) => {
    const ch = String.fromCharCode(0x41 + i)
    return SCRIPT_UPPER[ch] ?? String.fromCodePoint(0x1d49c + i)
  })

  return {
    bold: {
      upper: [...codepoints(0x1d400, 26)],
      lower: [...codepoints(0x1d41a, 26)],
      digits: [...codepoints(0x1d7ce, 10)],
    },
    italic: { upper: [...codepoints(0x1d434, 26)], lower: italicLower, digits: null },
    boldItalic: {
      upper: [...codepoints(0x1d468, 26)],
      lower: [...codepoints(0x1d482, 26)],
      digits: null,
    },
    monospace: {
      upper: [...codepoints(0x1d670, 26)],
      lower: [...codepoints(0x1d68a, 26)],
      digits: [...codepoints(0x1d7f6, 10)],
    },
    script: { upper: scriptUpper, lower: [...codepoints(0x1d4b6, 26)], digits: null },
  }
})()

function transformChar(char: string, style: UnicodeStyle): string {
  if (style === 'normal') return char
  const code = char.codePointAt(0)
  if (code === undefined) return char

  const table = STYLE_TABLES[style]
  if (code >= 0x41 && code <= 0x5a) return table.upper[code - 0x41] ?? char
  if (code >= 0x61 && code <= 0x7a) return table.lower[code - 0x61] ?? char
  if (code >= 0x30 && code <= 0x39 && table.digits) return table.digits[code - 0x30]
  return char
}

/**
 * Reverse map: a styled Unicode character -> its plain ASCII counterpart.
 *
 * Built ONCE from the forward `transformChar` definitions for every style the
 * app actually emits, so it can never drift out of sync. Stylized characters
 * that no style produces (CJK, emoji, ZWSP, punctuation, plain ASCII) are
 * simply absent and passed through unchanged by `normalizeToAscii`.
 */
const REVERSE_MAP: Map<string, string> = (() => {
  const m = new Map<string, string>()
  const styled: UnicodeStyle[] = [
    'bold',
    'italic',
    'boldItalic',
    'monospace',
    'script',
  ]
  for (const style of styled) {
    for (let code = 0x41; code <= 0x5a; code++) {
      const ch = String.fromCharCode(code)
      const s = transformChar(ch, style)
      if (s !== ch) m.set(s, ch)
    }
    for (let code = 0x61; code <= 0x7a; code++) {
      const ch = String.fromCharCode(code)
      const s = transformChar(ch, style)
      if (s !== ch) m.set(s, ch)
    }
    for (let code = 0x30; code <= 0x39; code++) {
      const ch = String.fromCharCode(code)
      const s = transformChar(ch, style)
      if (s !== ch) m.set(s, ch)
    }
  }
  return m
})()

/**
 * Reverse any Unicode "font" styling back to plain ASCII.
 *
 * This is what makes style chaining possible. Once `styleText` has turned
 * `Hello` into the mathematical symbols `𝗛𝗲𝗹𝗹𝗼`, a naive second conversion only
 * matches plain ASCII ranges and would pass those symbols straight through —
 * so the user sees "the second click does nothing". Normalizing first returns
 * the text to `Hello`, after which the target style can be applied cleanly.
 *
 * Characters that no style produces (CJK, emoji, ZWSP, punctuation, already
 * plain ASCII) are left untouched.
 */
export function normalizeToAscii(text: string): string {
  let out = ''
  for (const ch of text) {
    out += REVERSE_MAP.get(ch) ?? ch
  }
  return out
}

/**
 * Convert an entire string to a Unicode "font". Non-letter/digit characters are
 * passed through untouched. The UI will call this on a selected substring to
 * style only part of the post.
 *
 * Any pre-existing styling is normalized back to ASCII first, so chaining
 * styles (e.g. Bold -> Italic -> Monospace) works deterministically instead of
 * silently no-op'ing on already-styled characters.
 */
export function styleText(text: string, style: UnicodeStyle): string {
  const normalized = normalizeToAscii(text)
  let out = ''
  for (const ch of normalized) out += transformChar(ch, style)
  return out
}

// --- Smart cleaning engine -------------------------------------------------

const HASHTAG_RE = /#[\p{L}\p{N}_]+/gu

export interface HashtagResult {
  /** Text with all hashtags stripped out (and tidied). */
  text: string
  /** De-duplicated hashtags in first-seen order. */
  hashtags: string[]
}

/**
 * Extract every `#hashtag`, de-duplicate case-insensitively (keeping the first
 * spelling seen) and move them to the end of the post as a single block.
 */
export function cleanHashtags(text: string): HashtagResult {
  const matches = text.match(HASHTAG_RE) ?? []
  const seen = new Set<string>()
  const unique: string[] = []
  for (const m of matches) {
    const key = m.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(m)
    }
  }

  const body = text
    .replace(HASHTAG_RE, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .trim()

  const suffix = unique.length ? (body ? '\n\n' : '') + unique.join(' ') : ''
  return { text: body + suffix, hashtags: unique }
}

/**
 * Ensure line breaks survive a copy-paste into Instagram by appending a
 * zero-width space after each newline. Also normalises CRLF / CR to LF.
 */
export function fixInstagramLineBreaks(text: string): string {
  return text.replace(/\r\n?/g, '\n').replace(/\n/g, '\n' + ZWSP)
}

/**
 * Tidy whitespace: normalise line endings, drop trailing spaces on every line,
 * collapse 3+ consecutive blank lines down to a single blank line, and trim the
 * whole string.
 */
export function trimWhitespace(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Count visible characters the way social platforms do (not code units). */
export function countChars(text: string): number {
  return [...text].length
}
