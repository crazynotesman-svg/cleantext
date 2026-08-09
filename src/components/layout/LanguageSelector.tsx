import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LOCALES, LOCALE_LABELS } from '../../config/i18n'
import { buildPath } from '../../lib/routing'
import { useI18n } from '../../i18n/useI18n'

export function LanguageSelector() {
  const { locale, page, dict } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={dict.ui.switchLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex size-9 items-center justify-center gap-1 rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <Globe className="size-4.5" />
        <span className="text-xs font-semibold uppercase">{locale}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <ul
            role="listbox"
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            {LOCALES.map((l) => (
              <li key={l}>
                <Link
                  to={buildPath(l, page)}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 transition hover:bg-brand-50 dark:hover:bg-slate-800 ${
                    l === locale
                      ? 'font-semibold text-brand-600 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
