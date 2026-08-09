import { createContext } from 'react'
import type { Locale } from '../config/i18n'
import type { PageKey } from '../config/pages'
import type { Dict } from '../locales/types'

export interface I18nValue {
  locale: Locale
  page: PageKey
  dict: Dict
}

export const I18nContext = createContext<I18nValue | null>(null)
