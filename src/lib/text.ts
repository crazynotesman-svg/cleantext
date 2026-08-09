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

// Each style maps the 26 ASCII letters (+ digits where they exist) onto the
// Mathematical Alphanumeric Symbols block. Most are contiguous offsets; script
// capitals are a sparse exception table (some letters borrow from other blocks).
const OFFSETS: Record<
  Exclude<UnicodeStyle, 'normal' | 'script'>,
  { upper: number; lower: number; digit: number | null }
> = {
  // 0x1D400 (A) - 0x41 = 0x1D3BF ; 0x1D41A (a) - 0x61 = 0x1D3B9 ; digits 0x1D7CE
  bold: { upper: 0x1d3bf, lower: 0x1d3b9, digit: 0x1d7ce - 0x30 },
  // 0x1D434 (A) - 0x41 = 0x1D3F3 ; 0x1D44E (a) - 0x61 = 0x1D3ED ; no italic digits
  italic: { upper: 0x1d3f3, lower: 0x1d3ed, digit: null },
  // 0x1D468 (A) - 0x41 = 0x1D427 ; 0x1D482 (a) - 0x61 = 0x1D421 ; no bold-italic digits
  boldItalic: { upper: 0x1d427, lower: 0x1d421, digit: null },
  // 0x1D670 (A) - 0x41 = 0x1D62F ; 0x1D68A (a) - 0x61 = 0x1D629 ; digits 0x1D7F6
  monospace: { upper: 0x1d62f, lower: 0x1d629, digit: 0x1d7f6 - 0x30 },
}

// Script lowercase is contiguous: 0x1D4B6 (a) - 0x61 = 0x1D455.
const SCRIPT_LOWER_OFFSET = 0x1d455

// Script capitals are NOT contiguous and several fall back to other blocks.
const SCRIPT_UPPER: Record<string, string> = {
  A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ',
  I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫',
  Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳',
  Y: '𝒴', Z: 'ℨ',
}

function transformChar(char: string, style: UnicodeStyle): string {
  if (style === 'normal') return char
  const code = char.codePointAt(0)
  if (code === undefined) return char

  if (style === 'script') {
    if (code >= 0x61 && code <= 0x7a) {
      return String.fromCodePoint(code + SCRIPT_LOWER_OFFSET)
    }
    return SCRIPT_UPPER[char] ?? char
  }

  const map = OFFSETS[style]
  if (code >= 0x41 && code <= 0x5a) {
    return String.fromCodePoint(code + map.upper)
  }
  if (code >= 0x61 && code <= 0x7a) {
    return String.fromCodePoint(code + map.lower)
  }
  if (code >= 0x30 && code <= 0x39 && map.digit !== null) {
    return String.fromCodePoint(code + map.digit)
  }
  return char
}

/**
 * Convert an entire string to a Unicode "font". Non-letter/digit characters are
 * passed through untouched. The UI will call this on a selected substring to
 * style only part of the post.
 */
export function styleText(text: string, style: UnicodeStyle): string {
  let out = ''
  for (const ch of text) out += transformChar(ch, style)
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
