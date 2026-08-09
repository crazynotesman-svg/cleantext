import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MATRIX_ROUTES, type FaqItem } from '../../config/seoRoutes'

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How to add bold or italic text to LinkedIn & X (Twitter) posts?',
    answer:
      'LinkedIn and X (Twitter) do not offer a native bold or italic button, but they do render Unicode mathematical letters. In PostCraft, select the words you want to emphasise and click Bold, Italic, Monospace or Script in the style toolbar. The text is converted to a Unicode font that displays as bold or italic on LinkedIn, X, Instagram, Threads and most other platforms — no image or third-party app required.',
  },
  {
    question:
      'Why do my Instagram line breaks disappear and how does PostCraft fix it?',
    answer:
      'When you paste multi-line text into Instagram (or Threads), the app strips the line breaks because it ignores trailing newlines. PostCraft\'s "Fix IG Line Breaks" action appends a zero-width space (U+200B) after every line break. That invisible character forces Instagram to keep the empty line, so your spacing survives the paste. One click, and your caption keeps the exact layout you designed.',
  },
  {
    question: 'How does the Hashtag Cleaner work?',
    answer:
      'The Hashtag Cleaner scans your draft for every #tag, removes duplicates (case-insensitively, so #React and #react count as one), keeps the first spelling you used, and moves the tidy list to the very end of your post. It also strips stray spaces and odd characters, giving you a clean, de-duplicated hashtag block that is easy to read and copy.',
  },
  {
    question: 'Is my text data private and secure?',
    answer:
      'Yes. PostCraft is 100% client-side — it runs entirely in your browser. There is no backend, no server, and no account. Your text is never uploaded anywhere; it is processed locally and, if you enable drafts, saved only to your own device\'s localStorage. Nothing you type ever leaves your computer.',
  },
]

function FaqRow({ item }: { item: FaqItem }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white/60 transition-colors hover:border-indigo-300 open:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-500/50 dark:open:bg-slate-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-slate-800 select-none dark:text-slate-100 [&::-webkit-details-marker]:hidden">
        <span>{item.question}</span>
        <ChevronDown className="size-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 dark:text-slate-500" />
      </summary>
      <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {item.answer}
      </p>
    </details>
  )
}

export function FooterSEO({ faqs = FAQ_ITEMS }: { faqs?: FaqItem[] }) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
      <nav
        aria-label="Tools matrix"
        className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6"
      >
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          More free tools
        </h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {MATRIX_ROUTES.map((r) => (
            <li key={r.path}>
              <Link
                to={r.path}
                className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-700 dark:hover:bg-slate-800"
              >
                {r.h1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
      >
        <h2
          id="faq-heading"
          className="text-center text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600 dark:text-slate-400">
          Everything you need to know about formatting social media posts,
          cleaning hashtags, and keeping your text private.
        </p>

        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <FaqRow key={item.question} item={item} />
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>
          PostCraft — a free, 100% client-side social media post formatter &amp;
          hashtag cleaner. Your text never leaves your browser.
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} PostCraft. Built with React, Vite &amp;
          Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}

export default FooterSEO
