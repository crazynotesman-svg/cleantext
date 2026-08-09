/** Page matrix: the 4 landing-page templates and their URL path segments. */

import type { PlatformId } from '../types'

export const PAGES = ['root', 'ig', 'linkedin', 'twitter'] as const
export type PageKey = (typeof PAGES)[number]

/** URL path segment for each page (empty string = site root). */
export const PAGE_PATH: Record<PageKey, string> = {
  root: '',
  ig: 'instagram-line-break-generator',
  linkedin: 'linkedin-text-bold-italic',
  twitter: 'twitter-character-counter',
}

/** Preview platform tab pre-selected when each page loads. */
export const PAGE_DEFAULT_PLATFORM: Record<PageKey, PlatformId> = {
  root: 'x',
  ig: 'instagram',
  linkedin: 'linkedin',
  twitter: 'x',
}

/** The non-root matrix pages, used to build the footer cross-link nav. */
export const MATRIX_PAGES: PageKey[] = ['ig', 'linkedin', 'twitter']
