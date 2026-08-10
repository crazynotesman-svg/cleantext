/**
 * Visual symbol & emoji library for the PostCraft Creator Suite.
 *
 * The glyphs themselves are language-neutral, so SYMBOL_GROUPS is static data.
 * The category *labels* are localized via the i18n dictionary
 * (dict.ui.symbols.categories). Clicking a symbol inserts it at the editor
 * caret — see SymbolPicker + EditorPane.handleInsertSymbol.
 */

export type SymbolGroupId = 'numbers' | 'lists' | 'dividers' | 'vibe'

/** Ordered category ids, used to render the tab strip in the panel. */
export const SYMBOL_GROUP_ORDER: SymbolGroupId[] = [
  'numbers',
  'lists',
  'dividers',
  'vibe',
]

/**
 * Static glyph pools. These never change across locales — only the labels do.
 * `dividers` is a single decorative divider string to drop between sections.
 */
export const SYMBOL_GROUPS: Record<SymbolGroupId, string[]> = {
  numbers: [
    '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾',
    '➀', '➁', '➂', '➃', '➄',
    '⓵', '⓶', '⓷', '⓸', '⓹',
  ],
  lists: ['▸', '✦', '▫️', '⚡️', '◦', '▪', '‣', '→'],
  dividers: ['─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───'],
  vibe: ['🔥', '✨', '📌', '📊', '💼', '📈', '⚡️', '🤖', '💡', '💬', '🚀', '🌟'],
}

/**
 * Insert `insert` at the [start, end) range of `text`, returning the new text
 * and the resulting caret position.
 *
 * `start`/`end` are expected in UTF-16 code units (the unit `selectionStart`
 * / `selectionEnd` use), and are clamped to the string bounds so a stale or
 * reversed selection can never throw.
 */
export function insertAt(
  text: string,
  insert: string,
  start: number,
  end: number,
): { text: string; caret: number } {
  const len = text.length
  const s = Math.max(0, Math.min(start, len))
  const e = Math.max(s, Math.min(end, len))
  const next = text.slice(0, s) + insert + text.slice(e)
  return { text: next, caret: s + insert.length }
}
