/** Dictionary (locale pack) type definitions shared by every locale file. */

import type { Locale } from '../config/i18n'
import type { PageKey } from '../config/pages'
import type { PlatformId, UnicodeStyle } from '../types'

export interface FaqItem {
  question: string
  answer: string
}

export interface PageSeo {
  /** Browser tab title + og:title + twitter:title. */
  title: string
  /** Meta description + og/twitter description. */
  description: string
  /** Meta keywords (long-tail focus for matrix pages). */
  keywords: string
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
}

export interface UiDict {
  /** HTML lang attribute value (e.g. "es"). */
  htmlLang: string
  /** Open Graph locale code (e.g. "es_ES"). */
  ogLocale: string
  /** BCP-47 tag for Intl number/date formatting (e.g. "es-ES"). */
  numberLocale: string
  /** Header tagline under the logo. */
  tagline: string
  /** Editor section heading. */
  editorTitle: string
  /** Editor section description. */
  editorDesc: string
  /** Editor helper line above the textarea. */
  selectThenStyle: string
  /** Top-level tool switcher labels (Creator Suite navigation). */
  tools: {
    studio: string
    thread: string
    quote: string
  }
  /** Symbol & emoji picker UI. */
  symbols: {
    title: string
    /** aria-label / tooltip for the trigger button. */
    toggle: string
    categories: {
      numbers: string
      lists: string
      dividers: string
      vibe: string
    }
    /** aria-label for the close (×) button. */
    close: string
  }
  /** Thread Splitter + Line Break Fixer tool UI. */
  thread: {
    title: string
    subtitle: string
    inputPlaceholder: string
    limitLabel: string
    presets: {
      twitter: string
      threads: string
      custom: string
    }
    split: string
    fixBreaks: string
    clear: string
    partsHeading: string
    cardCopy: string
    cardCopied: string
    /** Per-card char count, e.g. "120 / 280 chars". */
    charsOf: (n: number, total: number) => string
    /** Shown before the first split. */
    empty: string
    /** Per-card message when that part exceeds the limit by n chars. */
    overLimit: (n: number) => string
    /** Per-card message when the part fits. */
    fit: string
  }
  /** Quote Card Generator tool UI. */
  quote: {
    title: string
    subtitle: string
    inputPlaceholder: string
    /** Placeholder quote rendered on the card before the user types. */
    sample: string
    authorLabel: string
    authorPlaceholder: string
    /** Remaining characters counter, e.g. "412 left". */
    charsLeft: (n: number) => string
    presetLabel: string
    presets: {
      dark: string
      xiaohongshu: string
      gradient: string
      paper: string
    }
    ratioLabel: string
    ratios: {
      square: string
      portrait: string
      landscape: string
    }
    download: string
    downloading: string
    clear: string
    previewLabel: string
    /** Export dimension note, e.g. "Exports at 1080 × 1080 px". */
    sizeNote: (w: number, h: number) => string
    /** Reassurance line under the export button. */
    exportHint: string
  }
  /** Live preview section heading. */
  livePreview: string
  /** Copy button label (idle). */
  copy: string
  /** Copy button label (after copy). */
  copied: string
  /** Per-platform note shown under the preview card. */
  platformHints: Record<PlatformId, string>
  /** Style-toolbar button labels. */
  styles: Record<UnicodeStyle, string>
  /** Tooltip template for a style button. */
  styleTooltip: (label: string) => string
  /** One-click cleanup actions. */
  actions: {
    fixIg: string
    fixIgHint: string
    cleanHashtags: string
    cleanHashtagsHint: string
    trim: string
    trimHint: string
    /** Clear the whole editor (destructive). */
    clear: string
    clearHint: string
  }
  /** Toast messages (some are functions of a value). */
  toast: {
    applied: (style: string) => string
    allText: (style: string) => string
    igFixed: string
    trimmed: string
    noHashtags: string
    hashtagsCleaned: (n: number) => string
    copied: string
    copyFailed: string
    /** Confirmation after clearing the editor. */
    cleared: string
    /** After fixing line breaks in the thread tool. */
    lineBreaksFixed: string
    /** After splitting a post into a thread of n parts. */
    threadSplit: (n: number) => string
    /** After a quote card PNG has been written to disk. */
    imageDownloaded: string
    /** When the PNG export throws (canvas/security failure). */
    imageFailed: string
  }
  /** "See more" divider label in the preview card. */
  seeMore: string
  /** Social action labels in the preview mock UI. */
  social: {
    like: string
    comment: string
    repost: string
    send: string
    likes: string
  }
  /** Footer "More free tools" heading. */
  moreTools: string
  /** FAQ section heading. */
  faqTitle: string
  /** FAQ section subtitle. */
  faqSubtitle: string
  /** Footer tagline paragraph. */
  footerTagline: string
  /** Footer copyright paragraph (may contain %YEAR% replaced at render). */
  footerCopyright: string
  /** Language switcher aria-label / tooltip. */
  switchLanguage: string
  /** Char-counter status: "exceeded by N chars". */
  counterExceeded: (n: number) => string
  /** Char-counter status: "Almost full". */
  counterAlmostFull: string
  /** Char-counter status: "N left". */
  counterLeft: (n: number) => string
}

export interface Dict {
  locale: Locale
  ui: UiDict
  pages: Record<PageKey, PageSeo>
}
