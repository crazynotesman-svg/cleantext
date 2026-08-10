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

// Explicit .ts extensions: this module is also loaded directly by Node
// (`--experimental-strip-types`) from the sitemap generator and its tests, and
// Node's ESM resolver does not do extensionless resolution.
import { DEFAULT_LOCALE, DOMAIN, LOCALES, isLocale, type Locale } from '../config/i18n.ts'
import { PAGE_PATH, PAGES, type PageKey } from '../config/pages.ts'

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
  return LOCALES.map((locale) => ({
    hreflang: locale,
    href: DOMAIN + buildPath(locale, page),
  }))
}

/**
 * Every canonical URL in the matrix (7 pages × 5 locales = 35), in sitemap
 * order. Shared by the routing tests and used to assert the generated
 * sitemap and the runtime router agree on the exact same URL set.
 */
export function getAllRouteUrls(): string[] {
  const urls: string[] = []
  for (const page of PAGES) {
    for (const locale of LOCALES) urls.push(DOMAIN + buildPath(locale, page))
  }
  return urls
}
