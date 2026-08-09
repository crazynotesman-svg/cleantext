/** Global i18n configuration: the 5 supported core locales + helpers. */

export const LOCALES = ['en', 'es', 'de', 'fr', 'pt'] as const
export type Locale = (typeof LOCALES)[number]

/** English is the canonical default and carries no URL prefix. */
export const DEFAULT_LOCALE: Locale = 'en'

/** Canonical production origin used to build absolute URLs (canonical, hreflang, sitemap). */
export const DOMAIN = 'https://postcraft.100ideas.net'

/**
 * Native (endonym) names shown in the language switcher, e.g. "Español" not "Spanish".
 * Order matches LOCALES.
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  pt: 'Português',
}

/** BCP-47 tags used for number/date formatting (Intl.toLocaleString) and og:locale. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  pt: 'pt-BR',
}

/** Open Graph locale codes (underscore form). */
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  pt: 'pt_BR',
}

/** HTML lang attribute value per locale. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  de: 'de',
  fr: 'fr',
  pt: 'pt',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
