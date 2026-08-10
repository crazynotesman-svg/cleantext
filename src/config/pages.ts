/** Page matrix: the 7 landing-page templates and their URL path segments. */

import type { PlatformId, ToolId } from '../types'

export const PAGES = [
  'root',
  'ig',
  'linkedin',
  'twitter',
  'threadSplitter',
  'quoteCard',
  'igBreaker',
] as const
export type PageKey = (typeof PAGES)[number]

/**
 * URL path segment for each page (empty string = site root).
 *
 * The first four segments have been live and indexed since the Phase 1
 * matrix — they are never renamed. Phase 2 appends three new segments, so
 * every previously earned ranking is preserved.
 */
export const PAGE_PATH: Record<PageKey, string> = {
  root: '',
  ig: 'instagram-line-break-generator',
  linkedin: 'linkedin-text-bold-italic',
  twitter: 'twitter-character-counter',
  threadSplitter: 'tweet-thread-splitter',
  quoteCard: 'quote-card-generator',
  igBreaker: 'instagram-line-breaker',
}

/** Preview platform tab pre-selected when each page loads. */
export const PAGE_DEFAULT_PLATFORM: Record<PageKey, PlatformId> = {
  root: 'x',
  ig: 'instagram',
  linkedin: 'linkedin',
  twitter: 'x',
  threadSplitter: 'x',
  quoteCard: 'x',
  igBreaker: 'instagram',
}

/**
 * Creator Suite tool opened by default on each landing page, so a visitor
 * arriving from search lands directly on the tool the page ranks for.
 */
export const PAGE_DEFAULT_TOOL: Record<PageKey, ToolId> = {
  root: 'studio',
  ig: 'studio',
  linkedin: 'studio',
  twitter: 'studio',
  threadSplitter: 'thread',
  quoteCard: 'quote',
  igBreaker: 'thread',
}

/** The non-root matrix pages, used to build the footer cross-link nav. */
export const MATRIX_PAGES: PageKey[] = [
  'ig',
  'linkedin',
  'twitter',
  'threadSplitter',
  'quoteCard',
  'igBreaker',
]
