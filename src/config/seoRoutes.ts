/**
 * Locale-aware SEO resolver.
 *
 * Builds the per-route `RouteSeo` (title/description/canonical/etc.) from the
 * active dictionary, and exposes the matrix cross-link list for the footer.
 */

import { DOMAIN, type Locale } from './i18n'
import { MATRIX_PAGES, PAGE_DEFAULT_PLATFORM, type PageKey } from './pages'
import { buildPath } from '../lib/routing'
import { DICTS } from '../locales'
import type { PlatformId, UnicodeStyle } from '../types'
import type { FaqItem } from '../locales/types'

export interface RouteSeo {
  /** Canonical path for this locale+page (e.g. "/es/instagram-line-break-generator"). */
  path: string
  /** Browser tab title + og:title + twitter:title. */
  title: string
  /** Meta description + og/twitter description. */
  description: string
  /** Meta keywords (long-tail focus for matrix pages). */
  keywords: string
  /** Absolute canonical / og:url / twitter:url / JSON-LD url. */
  canonical: string
  /** Platform preview tab pre-selected when this route loads. */
  defaultPlatform: PlatformId
  /** Page H1 (keyword-anchored on matrix pages). */
  h1: string
  /** Lead paragraph under the H1. */
  intro: string
  /** Optional one-line callout shown in the editor (operation tip). */
  tip?: string
  /** Optional style-toolbar buttons to emphasise (e.g. bold/italic). */
  highlight?: UnicodeStyle[]
  /** Route-specific FAQ set. */
  faqs: FaqItem[]
  /** HTML lang attribute value for this locale. */
  htmlLang: string
  /** Open Graph locale code for this locale. */
  ogLocale: string
}

/** Resolve the SEO config for a (locale, page) pair. */
export function getRouteSeo(locale: Locale, page: PageKey): RouteSeo {
  const dict = DICTS[locale]
  const p = dict.pages[page]
  const path = buildPath(locale, page)
  return {
    path,
    title: p.title,
    description: p.description,
    keywords: p.keywords,
    canonical: DOMAIN + path,
    defaultPlatform: PAGE_DEFAULT_PLATFORM[page],
    h1: p.h1,
    intro: p.intro,
    tip: p.tip,
    highlight: p.highlight,
    faqs: p.faqs,
    htmlLang: dict.ui.htmlLang,
    ogLocale: dict.ui.ogLocale,
  }
}

export interface MatrixLink {
  path: string
  h1: string
}

/** The non-root matrix pages for a locale, used to build the footer cross-link nav. */
export function getMatrixLinks(locale: Locale): MatrixLink[] {
  return MATRIX_PAGES.map((page) => ({
    path: buildPath(locale, page),
    h1: DICTS[locale].pages[page].h1,
  }))
}
