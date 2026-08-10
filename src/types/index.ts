/**
 * Shared domain types for PostCraft.
 * Kept framework-agnostic so the core logic (Step 2) stays testable in isolation.
 */

export type PlatformId = 'x' | 'instagram' | 'linkedin'

export interface PlatformSpec {
  /** Stable identifier used as the tab key + localStorage value. */
  id: PlatformId
  /** Human readable label shown on the preview tab. */
  label: string
  /** Hard character limit for a single post. */
  charLimit: number
  /**
   * Number of characters shown before the mobile feed collapses the caption
   * behind a "See more" affordance. `null` when the platform has no fold.
   */
  foldAt: number | null
  /** Tailwind accent token used for the tab + badge. */
  accent: string
}

/**
 * Creator Suite tools shown in the top-level tab switcher.
 *  - studio: Unicode font studio (editor + platform preview)
 *  - thread: thread splitter + line-break fixer
 *  - quote:  quote card generator (PNG export)
 */
export type ToolId = 'studio' | 'thread' | 'quote'

/** The Unicode "font" styles offered by the stylizer toolbar. */
export type UnicodeStyle =
  | 'bold'
  | 'italic'
  | 'boldItalic'
  | 'monospace'
  | 'script'
  | 'normal'

/** One-click text transforms exposed by the cleaning engine. */
export type CleanAction =
  | 'fixInstagramLineBreaks'
  | 'cleanHashtags'
  | 'trimWhitespace'

export interface EditorPreferences {
  theme: 'light' | 'dark'
  activePlatform: PlatformId
}
