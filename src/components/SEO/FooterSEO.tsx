import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getMatrixLinks } from '../../config/seoRoutes'
import type { FaqItem } from '../../locales/types'
import { useI18n } from '../../i18n/useI18n'

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

export function FooterSEO({ faqs = [] }: { faqs?: FaqItem[] }) {
  const { dict, locale } = useI18n()
  const matrix = getMatrixLinks(locale)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
      <nav
        aria-label="Tools matrix"
        className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6"
      >
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {dict.ui.moreTools}
        </h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {matrix.map((r) => (
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
          {dict.ui.faqTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600 dark:text-slate-400">
          {dict.ui.faqSubtitle}
        </p>

        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <FaqRow key={item.question} item={item} />
          ))}
        </div>
      </section>

      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>{dict.ui.footerTagline}</p>
        <p className="mt-1">{dict.ui.footerCopyright.replace('%YEAR%', String(year))}</p>
      </div>
    </footer>
  )
}
