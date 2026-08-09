/**
 * Path <-> route resolution for the multilingual matrix.
 *
 * URL contract:
 *   /                                  -> en, root
 *   /instagram-line-break-generator    -> en, ig
 *   /es/                                -> es, root
 *   /es/instagram-line-break-generator -> es, ig
 *
 * English is the default locale and is served WITHOUT a prefix.
 */

import { DEFAULT_LOCALE, DOMAIN, isLocale, type Locale } from '../config/i18n'
import { PAGE_PATH, PAGES, type PageKey } from '../config/pages'

export interface RouteInfo {
  locale: Locale
  page: PageKey
  /** Canonical path for this locale+page, e.g. "/es/instagram-line-break-generator" or "/" (en root). */
  path: string
}

/** Build the canonical path for a locale+page pair. */
export function buildPath(locale: Locale, page: PageKey): string {
  const seg = PAGE_PATH[page]
  if (locale === DEFAULT_LOCALE) return seg ? `/${seg}` : '/'
  return seg ? `/${locale}/${seg}` : `/${locale}`
}

const PATH_TO_PAGE: Record<string, PageKey> = Object.fromEntries(
  PAGES.map((p) => [PAGE_PATH[p], p]),
) as Record<string, PageKey>

function resolvePage(segment: string): PageKey {
  return PATH_TO_PAGE[segment] ?? 'root'
}

/** Parse a browser pathname into a locale + page route. Unknown paths fall back to root. */
export function parsePath(pathname: string): RouteInfo {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const segs = clean.split('/').filter(Boolean)

  const first = segs[0]
  if (first && isLocale(first) && first !== DEFAULT_LOCALE) {
    const page = resolvePage(segs.slice(1).join('/'))
    return { locale: first, page, path: buildPath(first, page) }
  }

  const page = clean === '/' ? 'root' : resolvePage(clean.replace(/^\//, ''))
  return { locale: DEFAULT_LOCALE, page, path: buildPath(DEFAULT_LOCALE, page) }
}

export interface AlternateLink {
  hreflang: string
  href: string
}

/** All 5 per-locale alternates for a given page (English is the x-default target). */
export function getAlternateUrls(page: PageKey): AlternateLink[] {
  return (Object.keys(PAGE_PATH) as PageKey[]).length
    ? (['en', 'es', 'de', 'fr', 'pt'] as Locale[]).map((locale) => ({
        hreflang: locale,
        href: DOMAIN + buildPath(locale, page),
      }))
    : []
}
