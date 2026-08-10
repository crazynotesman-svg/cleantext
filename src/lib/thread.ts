/**
 * Thread splitting + line-break fixing for the PostCraft Creator Suite.
 *
 * Pure, framework-agnostic, side-effect free so it can be unit tested in
 * isolation. The UI (ThreadSplitter) owns its own state and paints the result.
 */

import { fixInstagramLineBreaks } from './text.ts'

/** Common per-platform character ceilings used by the preset selector. */
export const THREAD_LIMITS = { twitter: 280, threads: 500 } as const

export type ThreadPreset = keyof typeof THREAD_LIMITS | 'custom'

/**
 * Split `text` into a numbered thread of parts, each (ideally) within `maxLen`.
 *
 * Splitting prefers, in order:
 *   1. paragraph boundaries (blank lines),
 *   2. sentence boundaries (., !, ?),
 *   3. word boundaries,
 * so the cut points stay natural. Each emitted part is suffixed with
 * ` (i/N)` where N is the total part count.
 */
export function splitThread(text: string, maxLen: number): string[] {
  const units = tokenize(text, maxLen)
  if (units.length === 0) return []

  const raw: string[] = []
  let cur = ''
  for (const unit of units) {
    if (cur && cur.length + unit.length > maxLen) {
      raw.push(cur.trimEnd())
      cur = unit
    } else {
      cur += unit
    }
  }
  if (cur.trim()) raw.push(cur.trimEnd())

  const total = raw.length
  return raw.map((part, i) => `${part} (${i + 1}/${total})`)
}

/**
 * Break `text` into the largest natural chunks that fit a single part.
 * Returns raw chunks WITHOUT the ` (i/N)` suffix so the caller can number them.
 */
function tokenize(text: string, maxLen: number): string[] {
  const normalized = text.replace(/\r\n?/g, '\n').trim()
  if (!normalized) return []

  const paragraphs = normalized.split(/\n{2,}/)
  const units: string[] = []

  for (const para of paragraphs) {
    const p = para.trim()
    if (!p) continue

    // Split into sentences, keeping trailing punctuation + whitespace so the
    // join still reads naturally. Fall back to the whole paragraph if no
    // sentence boundary is found.
    const sentences = p.match(/[^.!?]+[.!?]*\s*|\S+/g) ?? [p]
    for (const sentence of sentences) {
      if (sentence.length <= maxLen) {
        units.push(sentence)
        continue
      }
      // A single sentence longer than the limit: break on whitespace,
      // preserving the spaces.
      const words = sentence.split(/(\s+)/)
      let buf = ''
      for (const word of words) {
        if (buf && buf.length + word.length > maxLen) {
          units.push(buf)
          buf = word
        } else {
          buf += word
        }
      }
      if (buf) units.push(buf)
    }
  }

  return units
}

/**
 * Preserve blank lines on paste into Instagram / Threads by appending a
 * zero-width space after every newline. This reuses the same engine as the
 * editor's "Fix IG Line Breaks" action — the mechanism is identical.
 */
export function fixThreadLineBreaks(text: string): string {
  return fixInstagramLineBreaks(text)
}
