import type { Locale } from '../config/i18n'
import type { Dict } from './types'
import { en } from './en'
import { es } from './es'
import { de } from './de'
import { fr } from './fr'
import { pt } from './pt'

export const DICTS: Record<Locale, Dict> = { en, es, de, fr, pt }
export type { Dict, UiDict, PageSeo, FaqItem } from './types'
