import type { Dict, FaqItem, PageSeo } from './types'
import type { PageKey } from '../config/pages'

const privacy: FaqItem = {
  question: 'Is my text data private and secure?',
  answer:
    'Yes. PostCraft is 100% client-side — it runs entirely in your browser. There is no backend, no server, and no account. Your text is never uploaded anywhere; it is processed locally and, if you enable drafts, saved only to your own device’s localStorage. Nothing you type ever leaves your computer.',
}

const faqBold: FaqItem = {
  question: 'How to add bold or italic text to LinkedIn & X (Twitter) posts?',
  answer:
    'LinkedIn and X (Twitter) do not offer a native bold or italic button, but they do render Unicode mathematical letters. In PostCraft, select the words you want to emphasise and click Bold, Italic, Monospace or Script in the style toolbar. The text is converted to a Unicode font that displays as bold or italic on LinkedIn, X, Instagram, Threads and most other platforms — no image or third-party app required.',
}

const faqIg: FaqItem = {
  question: 'Why do my Instagram line breaks disappear and how does PostCraft fix it?',
  answer:
    'When you paste multi-line text into Instagram (or Threads), the app strips the line breaks because it ignores trailing newlines. PostCraft’s "Fix IG Line Breaks" action appends a zero-width space (U+200B) after every line break. That invisible character forces Instagram to keep the empty line, so your spacing survives the paste. One click, and your caption keeps the exact layout you designed.',
}

const faqHash: FaqItem = {
  question: 'How does the Hashtag Cleaner work?',
  answer:
    'The Hashtag Cleaner scans your draft for every #tag, removes duplicates (case-insensitively, so #React and #react count as one), keeps the first spelling you used, and moves the tidy list to the very end of your post. It also strips stray spaces and odd characters, giving you a clean, de-duplicated hashtag block that is easy to read and copy.',
}

const sharedFaqs: FaqItem[] = [faqBold, faqIg, faqHash, privacy]

const igFaqs: FaqItem[] = [
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
  privacy,
]

const linkedinFaqs: FaqItem[] = [
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
  privacy,
]

const twitterFaqs: FaqItem[] = [
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
  privacy,
]

const threadFaqs: FaqItem[] = [
  {
    question: 'How do I split a long post into a Twitter / X thread?',
    answer:
      'Paste your draft into the Thread Splitter, choose the X · 280 preset, and click “Split into thread”. PostCraft packs your text into the largest chunks that still fit the limit and appends a (1/5), (2/5) counter to each one. Copy the cards in order and post them as replies to build the thread.',
  },
  {
    question: 'Where does the splitter cut my text?',
    answer:
      'It always prefers a natural boundary: first paragraph breaks, then sentence endings (. ! ?), and only then word boundaries. A tweet is never cut in the middle of a word, so each part still reads like a finished thought instead of a fragment.',
  },
  {
    question: 'Does it work for Threads, Bluesky or a custom limit?',
    answer:
      'Yes. Switch the preset to Threads · 500 for Meta Threads, or pick Custom and type any limit you need — 300 for Bluesky, 3,000 for LinkedIn, or your own. The numbering and the per-card character badge update instantly.',
  },
  privacy,
]

const quoteFaqs: FaqItem[] = [
  {
    question: 'How do I turn a quote into an image?',
    answer:
      'Type or paste your line into the Quote Card tool, pick one of the four visual presets, choose an aspect ratio, and click “Download PNG”. The card is rendered live as you type, so what you see in the preview is exactly what gets saved.',
  },
  {
    question: 'What size should a quote card be for Instagram or Xiaohongshu?',
    answer:
      'Use 4:5 (1080 × 1350). It is the tallest ratio the Instagram and Xiaohongshu feeds display without cropping, so it takes up the most screen space. Choose 1:1 (1080 × 1080) for a classic square post, and 16:9 (1920 × 1080) for X, LinkedIn or a blog header.',
  },
  {
    question: 'Is the exported PNG high resolution?',
    answer:
      'Yes. Cards export at their true pixel size — 1080 × 1080, 1080 × 1350 or 1920 × 1080 — which is the native upload resolution for every major platform, so the text stays crisp instead of being re-compressed from a small preview.',
  },
  privacy,
]

const breakerFaqs: FaqItem[] = [
  {
    question: 'How do I add line breaks to an Instagram bio or caption?',
    answer:
      'Write your text with the blank lines exactly where you want them, click “Fix line breaks”, then copy the result and paste it into Instagram. PostCraft inserts an invisible zero-width space (U+200B) on each empty line, which stops Instagram from collapsing it.',
  },
  {
    question: 'Why does Instagram delete my blank lines when I paste?',
    answer:
      'Instagram trims trailing whitespace on every line, and a blank line is nothing but whitespace — so it gets removed and your paragraphs collapse into one block. Putting an invisible character on that line means it is no longer empty, and the spacing survives.',
  },
  {
    question: 'Does the line breaker work in comments and on Threads?',
    answer:
      'Yes. The same invisible-character technique works in Instagram comments, the bio field, Threads posts, and most other apps that strip blank lines. Paste the fixed text anywhere your spacing normally disappears.',
  },
  privacy,
]

const pages: Record<PageKey, PageSeo> = {
  root: {
    title: 'Free Social Media Post Formatter & Hashtag Cleaner | PostCraft',
    description:
      'Format bold & italic text for LinkedIn & X, fix Instagram line breaks, clean duplicate hashtags, and preview character limits online for free.',
    keywords:
      'instagram line break generator, linkedin text formatter, bold font generator, twitter character counter, clean hashtags',
    h1: 'Social Media Post Formatter & Hashtag Cleaner',
    intro:
      'Bold and italic text for LinkedIn and X, Instagram line breaks that survive the paste, tidy hashtags, and live character limits — all in your browser.',
    faqs: sharedFaqs,
  },
  ig: {
    title:
      'Instagram Line Break Generator — Fix IG Caption Spacing Free | PostCraft',
    description:
      'Free Instagram line break generator. Paste your caption, fix line breaks with one click, and keep your spacing when you paste into Instagram or Threads. No app required.',
    keywords:
      'instagram line break generator, fix instagram line breaks online, instagram caption spacing, instagram paragraph break, keep line breaks instagram',
    h1: 'Instagram Line Break Generator',
    intro:
      'Paste your caption, click “Fix IG Line Breaks”, and every line break is preserved with invisible characters when you paste into Instagram or Threads.',
    tip: 'Tip: click “Fix IG Line Breaks” after writing — it adds a zero-width space after each line so Instagram keeps your spacing.',
    faqs: igFaqs,
  },
  linkedin: {
    title:
      'LinkedIn Bold & Italic Text Generator — Format Posts Free | PostCraft',
    description:
      'Free LinkedIn bold and italic text generator. Convert selected text to Unicode bold or italic that displays on LinkedIn and X — no native button required.',
    keywords:
      'linkedin bold text generator, linkedin text formatter, linkedin italic generator, bold text for linkedin, linkedin font generator',
    h1: 'LinkedIn Bold & Italic Text Generator',
    intro:
      'Select any text and click Bold or Italic to convert it into Unicode letters that render as bold or italic on LinkedIn, X, and most social platforms.',
    highlight: ['bold', 'italic'],
    faqs: linkedinFaqs,
  },
  twitter: {
    title:
      'Twitter / X Character Counter — 280 Limit & Thread Splitter | PostCraft',
    description:
      'Free Twitter / X character counter with a 280-limit live badge and thread-splitting tips. Check your post length before you tweet.',
    keywords:
      'twitter character counter online, x post line limit tool, tweet character count, x character limit, twitter thread splitter',
    h1: 'Twitter / X Character Counter',
    intro:
      'Type or paste your post to see a live character count against the 280 limit, with a clear warning and thread-splitting tip when you go over.',
    tip: 'Tip: stay under 280 characters, or split a long post into a numbered thread for better reach.',
    faqs: twitterFaqs,
  },
  threadSplitter: {
    title: 'Tweet Thread Splitter — Split a Long Post into an X Thread | PostCraft',
    description:
      'Free tweet thread splitter. Paste a long post and split it into numbered 280-character tweets that still read naturally. Threads 500 and custom limits supported.',
    keywords:
      'tweet thread splitter, twitter thread generator, split long text into tweets, x thread maker, threads post splitter',
    h1: 'Tweet Thread Splitter',
    intro:
      'Paste a long post and split it into a numbered X thread in one click. PostCraft cuts on paragraph and sentence boundaries, so every tweet still reads like a finished thought.',
    tip: 'Tip: pick X · 280 for Twitter or Threads · 500 for Meta Threads, then copy the cards in order.',
    faqs: threadFaqs,
  },
  quoteCard: {
    title: 'Quote Card Generator — Free Text to PNG Image Maker | PostCraft',
    description:
      'Free quote card generator. Turn any sentence into a share-ready PNG with dark, Xiaohongshu, gradient or paper presets in 1:1, 4:5 or 16:9. No signup, no watermark upload.',
    keywords:
      'quote card generator, text to image maker, instagram quote maker, xiaohongshu card generator, quote png download',
    h1: 'Quote Card Generator',
    intro:
      'Turn a sentence into a share-ready image. Pick a preset, choose 1:1, 4:5 or 16:9, and download a high-resolution PNG — everything renders inside your browser.',
    tip: 'Tip: 4:5 fills the most screen space in the Instagram and Xiaohongshu feeds; 16:9 suits X and LinkedIn.',
    faqs: quoteFaqs,
  },
  igBreaker: {
    title: 'Instagram Line Breaker — Keep Caption & Bio Spacing Free | PostCraft',
    description:
      'Free Instagram line breaker. Add real paragraph spacing to captions, bios and comments so your blank lines survive the paste — on Instagram and Threads.',
    keywords:
      'instagram line breaker, instagram bio line break, add spaces instagram caption, instagram paragraph spacing tool, threads line break',
    h1: 'Instagram Line Breaker',
    intro:
      'Break your caption into clean paragraphs and keep them. PostCraft adds invisible spacing characters so Instagram, Threads and the bio field stop collapsing your empty lines.',
    tip: 'Tip: lay out the blank lines you want, click “Fix line breaks”, then paste straight into Instagram.',
    faqs: breakerFaqs,
  },
}

export const en: Dict = {
  locale: 'en',
  ui: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    numberLocale: 'en-US',
    tagline: 'Format · Clean · Preview',
    editorTitle: 'Editor',
    editorDesc: 'Select text, then pick a style. Cleanups apply to the whole post.',
    selectThenStyle: 'Select text, then pick a style.',
    tools: {
      studio: 'Font Studio',
      thread: 'Thread & Line',
      quote: 'Quote Card',
    },
    symbols: {
      title: 'Symbols & Emoji',
      toggle: 'Insert symbols and emoji',
      categories: {
        numbers: 'Numbers',
        lists: 'List markers',
        dividers: 'Dividers',
        vibe: 'Vibe emoji',
      },
      close: 'Close',
    },
    thread: {
      title: 'Thread Splitter & Line Break Fixer',
      subtitle:
        'Split long posts into numbered threads and keep your line breaks on Instagram & Threads.',
      inputPlaceholder: 'Paste or write your long post here…',
      limitLabel: 'Character limit',
      presets: {
        twitter: 'X / Twitter · 280',
        threads: 'Threads · 500',
        custom: 'Custom',
      },
      split: 'Split into thread',
      fixBreaks: 'Fix line breaks',
      clear: 'Clear',
      partsHeading: 'Thread preview',
      cardCopy: 'Copy',
      cardCopied: 'Copied!',
      charsOf: (n, total) =>
        `${n.toLocaleString('en-US')} / ${total.toLocaleString('en-US')} chars`,
      empty: 'Enter some text and choose a limit to split it into a thread.',
      overLimit: (n) => `Over limit by ${n.toLocaleString('en-US')} characters`,
      fit: 'Fits within the limit',
    },
    quote: {
      title: 'Quote Card Generator',
      subtitle:
        'Turn a sentence into a share-ready PNG — 4 presets, 3 ratios, no signup.',
      inputPlaceholder: 'Write or paste the line you want on the card…',
      sample: 'Write the post you wish someone had written for you.',
      authorLabel: 'Author',
      authorPlaceholder: 'Your name or @handle',
      charsLeft: (n) => `${n.toLocaleString('en-US')} left`,
      presetLabel: 'Style preset',
      presets: {
        dark: 'Dark Minimalist',
        xiaohongshu: 'Xiaohongshu Viral',
        gradient: 'Gradient Vibe',
        paper: 'Paper Aesthetic',
      },
      ratioLabel: 'Aspect ratio',
      ratios: {
        square: 'Square · 1:1',
        portrait: 'Feed · 4:5',
        landscape: 'Landscape · 16:9',
      },
      download: 'Download PNG',
      downloading: 'Rendering…',
      clear: 'Clear',
      previewLabel: 'Card preview',
      sizeNote: (w, h) => `Exports at ${w} × ${h} px`,
      exportHint:
        'Rendered and saved entirely in your browser — the image is never uploaded.',
    },
    livePreview: 'Live preview',
    copy: 'Copy Clean Text',
    copied: 'Copied!',
    platformHints: {
      x: 'Over 280 characters? Split it into a thread.',
      instagram: 'Only the first 125 characters show before “more”.',
      linkedin: 'Only the first 140 characters show before “see more”.',
    },
    styles: {
      bold: 'Bold',
      italic: 'Italic',
      boldItalic: 'Bold Italic',
      monospace: 'Mono',
      script: 'Script',
      normal: 'Normal',
    },
    styleTooltip: (label) => `Apply ${label} to selection`,
    actions: {
      fixIg: 'Fix IG LineBreaks',
      fixIgHint: 'Append invisible chars so line breaks survive the Instagram paste',
      cleanHashtags: 'Clean Hashtags',
      cleanHashtagsHint: 'Deduplicate hashtags and move them to the end of the post',
      trim: 'Trim Whitespace',
      trimHint: 'Remove trailing spaces and collapse extra blank lines',
      clear: 'Clear',
      clearHint: 'Remove all text and start over',
    },
    toast: {
      applied: (style) => `${style} applied to selection`,
      allText: (style) => `All text set to ${style}`,
      igFixed: 'Instagram line breaks fixed',
      trimmed: 'Whitespace trimmed',
      noHashtags: 'No hashtags found',
      hashtagsCleaned: (n) => `${n} hashtag${n > 1 ? 's' : ''} cleaned & moved to end`,
      copied: 'Copied to clipboard!',
      copyFailed: 'Copy failed — select and copy manually',
      cleared: 'Editor cleared',
      lineBreaksFixed: 'Line breaks fixed — blank lines will survive the paste',
      threadSplit: (n) => `Split into ${n} part${n > 1 ? 's' : ''}`,
      imageDownloaded: 'Quote card downloaded',
      imageFailed: 'Export failed — try again or shorten the quote',
    },
    seeMore: 'See more',
    social: {
      like: 'Like',
      comment: 'Comment',
      repost: 'Repost',
      send: 'Send',
      likes: '1,234 likes',
    },
    moreTools: 'More free tools',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle:
      'Everything you need to know about formatting social media posts, cleaning hashtags, and keeping your text private.',
    footerTagline:
      'PostCraft — a free, 100% client-side social media post formatter & hashtag cleaner. Your text never leaves your browser.',
    footerCopyright: '© %YEAR% PostCraft. Built with React, Vite & Tailwind CSS.',
    switchLanguage: 'Select language',
    counterExceeded: (n) => `Exceeded by ${n.toLocaleString('en-US')} chars`,
    counterAlmostFull: 'Almost full',
    counterLeft: (n) => `${n.toLocaleString('en-US')} left`,
  },
  pages,
}
