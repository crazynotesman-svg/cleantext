import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { EditorPane } from './components/Editor/EditorPane'
import { PreviewPane } from './components/Preview/PreviewPane'
import { FooterSEO } from './components/SEO/FooterSEO'
import { Toast, type ToastState, type ToastTone } from './components/ui/Toast'
import { useDarkMode } from './hooks/useDarkMode'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDocumentMeta, type AlternateLink } from './hooks/useDocumentMeta'
import { cleanHashtags, fixInstagramLineBreaks, trimWhitespace } from './lib/text'
import { getRouteSeo } from './config/seoRoutes'
import { DOMAIN } from './config/i18n'
import { parsePath, buildPath, getAlternateUrls } from './lib/routing'
import { DICTS } from './locales'
import { I18nProvider } from './i18n/I18nProvider'
import type { CleanAction, PlatformId } from './types'

const REPO_URL = 'https://github.com/crazynotesman-svg/cleantext'
const DRAFT_KEY = 'postcraft:draft'
const PLATFORM_KEY = 'postcraft:platform'

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const { pathname } = useLocation()
  const route = useMemo(() => parsePath(pathname), [pathname])
  const seo = useMemo(() => getRouteSeo(route.locale, route.page), [route])
  const alternates = useMemo<AlternateLink[]>(
    () => [
      ...getAlternateUrls(route.page),
      { hreflang: 'x-default', href: DOMAIN + buildPath('en', route.page) },
    ],
    [route.page],
  )
  useDocumentMeta(seo, alternates)
  const dict = DICTS[route.locale]

  const [text, setText] = useLocalStorage<string>(DRAFT_KEY, '')
  const [activePlatform, setActivePlatform] = useLocalStorage<PlatformId>(
    PLATFORM_KEY,
    'x',
  )

  // Matrix landing pages pre-select their focused platform on load.
  // The root page keeps the visitor's persisted tab choice.
  useEffect(() => {
    if (route.page !== 'root') setActivePlatform(seo.defaultPlatform)
  }, [route.page, seo, setActivePlatform])

  const [toast, setToast] = useState<ToastState | null>(null)
  const toastId = useRef(0)
  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    toastId.current += 1
    setToast({ id: toastId.current, message, tone })
  }, [])
  const dismissToast = useCallback(() => setToast(null), [])

  const [copied, setCopied] = useState(false)

  const handleAction = useCallback(
    (action: CleanAction) => {
      if (action === 'fixInstagramLineBreaks') {
        setText((prev) => fixInstagramLineBreaks(prev))
        showToast(dict.ui.toast.igFixed)
      } else if (action === 'trimWhitespace') {
        setText((prev) => trimWhitespace(prev))
        showToast(dict.ui.toast.trimmed)
      } else {
        const result = cleanHashtags(text)
        setText(result.text)
        if (result.hashtags.length === 0) showToast(dict.ui.toast.noHashtags, 'info')
        else showToast(dict.ui.toast.hashtagsCleaned(result.hashtags.length))
      }
    },
    [text, setText, showToast, dict],
  )

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      showToast(dict.ui.toast.copied, 'success')
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      showToast(dict.ui.toast.copyFailed, 'error')
    }
  }, [text, showToast, dict])

  return (
    <I18nProvider locale={route.locale} page={route.page}>
      <div className="flex min-h-dvh flex-col">
        <Header isDark={isDark} onToggleTheme={toggle} repoUrl={REPO_URL} />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {seo.h1}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              {seo.intro}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <EditorPane
              value={text}
              onChange={setText}
              onAction={handleAction}
              showToast={showToast}
              highlight={seo.highlight}
              tip={seo.tip}
            />
            <PreviewPane
              text={text}
              activePlatform={activePlatform}
              onPlatformChange={setActivePlatform}
              onCopy={handleCopy}
              copied={copied}
            />
          </div>
        </main>

        <FooterSEO faqs={seo.faqs} />

        <Toast toast={toast} onDismiss={dismissToast} />
      </div>
    </I18nProvider>
  )
}
