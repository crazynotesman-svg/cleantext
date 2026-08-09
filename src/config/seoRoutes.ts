import type { PlatformId, UnicodeStyle } from '../types'

export interface FaqItem {
  question: string
  answer: string
}

export interface RouteSeo {
  /** Exact pathname this config applies to. */
  path: string
  /** Browser tab title + og:title + twitter:title. */
  title: string
  /** Meta description + og:twitter description. */
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
}

const PRIVACY_FAQ: FaqItem = {
  question: 'Is my text data private and secure?',
  answer:
    'Yes. PostCraft is 100% client-side — it runs entirely in your browser. There is no backend, no server, and no account. Your text is never uploaded anywhere; it is processed locally and, if you enable drafts, saved only to your own device’s localStorage. Nothing you type ever leaves your computer.',
}

const SHARED_FAQ: FaqItem[] = [
  {
    question: 'How to add bold or italic text to LinkedIn & X (Twitter) posts?',
    answer:
      'LinkedIn and X (Twitter) do not offer a native bold or italic button, but they do render Unicode mathematical letters. In PostCraft, select the words you want to emphasise and click Bold, Italic, Monospace or Script in the style toolbar. The text is converted to a Unicode font that displays as bold or italic on LinkedIn, X, Instagram, Threads and most other platforms — no image or third-party app required.',
  },
  {
    question:
      'Why do my Instagram line breaks disappear and how does PostCraft fix it?',
    answer:
      'When you paste multi-line text into Instagram (or Threads), the app strips the line breaks because it ignores trailing newlines. PostCraft’s "Fix IG Line Breaks" action appends a zero-width space (U+200B) after every line break. That invisible character forces Instagram to keep the empty line, so your spacing survives the paste. One click, and your caption keeps the exact layout you designed.',
  },
  {
    question: 'How does the Hashtag Cleaner work?',
    answer:
      'The Hashtag Cleaner scans your draft for every #tag, removes duplicates (case-insensitively, so #React and #react count as one), keeps the first spelling you used, and moves the tidy list to the very end of your post. It also strips stray spaces and odd characters, giving you a clean, de-duplicated hashtag block that is easy to read and copy.',
  },
  PRIVACY_FAQ,
]

export const SEO_ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'Free Social Media Post Formatter & Hashtag Cleaner | PostCraft',
    description:
      'Format bold & italic text for LinkedIn & X, fix Instagram line breaks, clean duplicate hashtags, and preview character limits online for free.',
    keywords:
      'instagram line break generator, linkedin text formatter, bold font generator, twitter character counter, clean hashtags',
    canonical: 'https://postcraft.100ideas.net/',
    defaultPlatform: 'x',
    h1: 'Social Media Post Formatter & Hashtag Cleaner',
    intro:
      'Bold and italic text for LinkedIn and X, Instagram line breaks that survive the paste, tidy hashtags, and live character limits — all in your browser.',
    faqs: SHARED_FAQ,
  },
  {
    path: '/instagram-line-break-generator',
    title:
      'Instagram Line Break Generator — Fix IG Caption Spacing Free | PostCraft',
    description:
      'Free Instagram line break generator. Paste your caption, fix line breaks with one click, and keep your spacing when you paste into Instagram or Threads. No app required.',
    keywords:
      'instagram line break generator, fix instagram line breaks online, instagram caption spacing, instagram paragraph break, keep line breaks instagram',
    canonical: 'https://postcraft.100ideas.net/instagram-line-break-generator',
    defaultPlatform: 'instagram',
    h1: 'Instagram Line Break Generator',
    intro:
      'Paste your caption, click “Fix IG Line Breaks”, and every line break is preserved with invisible characters when you paste into Instagram or Threads.',
    tip: 'Tip: click “Fix IG Line Breaks” after writing — it adds a zero-width space after each line so Instagram keeps your spacing.',
    faqs: [
      {
        question: 'How do I keep line breaks in an Instagram caption?',
        answer:
          'Write or paste your caption into PostCraft, then click “Fix IG Line Breaks”. PostCraft appends an invisible zero-width space (U+200B) after every line break so Instagram stops stripping your empty lines. Copy the result and paste it straight into the Instagram caption box — your paragraph spacing stays exactly as you designed it.',
      },
      {
        question: 'Why does Instagram remove my line breaks when I paste?',
        answer:
          'Instagram’s caption field collapses trailing newlines, so multi-line text you copy from Notes or another app gets flattened into one block. The fix is an invisible character after each line that forces Instagram to render the break. PostCraft adds that character automatically — no manual spacing hacks needed.',
      },
      {
        question: 'Does this also work for Threads and other apps?',
        answer:
          'Yes. The same zero-width-space technique works for Threads, and the spacing survives paste into most social apps that strip line breaks. It also works for the bio and comment fields where line breaks tend to disappear.',
      },
      PRIVACY_FAQ,
    ],
  },
  {
    path: '/linkedin-text-bold-italic',
    title:
      'LinkedIn Bold & Italic Text Generator — Format Posts Free | PostCraft',
    description:
      'Free LinkedIn bold and italic text generator. Convert selected text to Unicode bold or italic that displays on LinkedIn and X — no native button required.',
    keywords:
      'linkedin bold text generator, linkedin text formatter, linkedin italic generator, bold text for linkedin, linkedin font generator',
    canonical: 'https://postcraft.100ideas.net/linkedin-text-bold-italic',
    defaultPlatform: 'linkedin',
    h1: 'LinkedIn Bold & Italic Text Generator',
    intro:
      'Select any text and click Bold or Italic to convert it into Unicode letters that render as bold or italic on LinkedIn, X, and most social platforms.',
    highlight: ['bold', 'italic'],
    faqs: [
      {
        question: 'How do I make text bold on LinkedIn?',
        answer:
          'LinkedIn has no built-in bold button, but it renders Unicode mathematical bold letters. In PostCraft, select the words you want to emphasise and click Bold in the style toolbar. The selected text is converted to a Unicode bold font that displays as bold on LinkedIn, X, and most platforms — no image or extension required.',
      },
      {
        question: 'Can I italicise text on LinkedIn too?',
        answer:
          'Yes. Select your text and click Italic in the toolbar to convert it to Unicode italic letters. You can also combine both with Bold Italic, or use Monospace and Script for headings and quotes that stand out in a LinkedIn post.',
      },
      {
        question: 'Will the bold/italic text stay formatted when I paste it?',
        answer:
          'The styling is baked into the characters themselves (they are special Unicode letters, not a font setting), so the bold or italic look is preserved wherever you paste — LinkedIn, X, email, or a Google Doc. Just copy the converted text and paste it into your post.',
      },
      PRIVACY_FAQ,
    ],
  },
  {
    path: '/twitter-character-counter',
    title:
      'Twitter / X Character Counter — 280 Limit & Thread Splitter | PostCraft',
    description:
      'Free Twitter / X character counter with a 280-limit live badge and thread-splitting tips. Check your post length before you tweet.',
    keywords:
      'twitter character counter online, x post line limit tool, tweet character count, x character limit, twitter thread splitter',
    canonical: 'https://postcraft.100ideas.net/twitter-character-counter',
    defaultPlatform: 'x',
    h1: 'Twitter / X Character Counter',
    intro:
      'Type or paste your post to see a live character count against the 280 limit, with a clear warning and thread-splitting tip when you go over.',
    tip: 'Tip: stay under 280 characters, or split a long post into a numbered thread for better reach.',
    faqs: [
      {
        question: 'What is the character limit on X (Twitter)?',
        answer:
          'A single X / Twitter post allows up to 280 characters. PostCraft shows a live counter as you type and turns the badge red when you exceed the limit, so you always know before you hit “Post”.',
      },
      {
        question: 'How do I split a long post into a thread?',
        answer:
          'When your draft goes over 280 characters, PostCraft flags it and suggests splitting. Break your idea into numbered tweets (1/…, 2/…, 3/…) so each stays under the limit and readers can follow the thread. The counter updates for the whole draft as you edit.',
      },
      {
        question: 'Does the counter count emoji and special characters correctly?',
        answer:
          'Yes. PostCraft counts by Unicode code points, so emoji, accented letters, and Unicode-styled text are each counted the way X does — one emoji is one character, matching the platform’s own limit.',
      },
      PRIVACY_FAQ,
    ],
  },
]

/** Resolve SEO config for a given pathname, falling back to the root page. */
export function getRouteSeo(pathname: string): RouteSeo {
  return SEO_ROUTES.find((r) => r.path === pathname) ?? SEO_ROUTES[0]
}

/** The non-root matrix pages, used to build the footer cross-link nav. */
export const MATRIX_ROUTES = SEO_ROUTES.filter((r) => r.path !== '/')
