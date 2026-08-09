import type { ReactNode } from 'react'
import type { Locale } from '../config/i18n'
import type { PageKey } from '../config/pages'
import { DICTS } from '../locales'
import { I18nContext } from './context'

export function I18nProvider({
  locale,
  page,
  children,
}: {
  locale: Locale
  page: PageKey
  children: ReactNode
}) {
  const dict = DICTS[locale]
  return (
    <I18nContext.Provider value={{ locale, page, dict }}>
      {children}
    </I18nContext.Provider>
  )
}
