import { useCallback, useRef, useState } from 'react'
import { Header } from './components/layout/Header'
import { EditorPane } from './components/Editor/EditorPane'
import { PreviewPane } from './components/Preview/PreviewPane'
import { Toast, type ToastState, type ToastTone } from './components/ui/Toast'
import { useDarkMode } from './hooks/useDarkMode'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_PLATFORM } from './lib/platforms'
import { cleanHashtags, fixInstagramLineBreaks, trimWhitespace } from './lib/text'
import type { CleanAction, PlatformId } from './types'

const REPO_URL = 'https://github.com/crazynotesman-svg/cleantext'
const DRAFT_KEY = 'postcraft:draft'
const PLATFORM_KEY = 'postcraft:platform'

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const [text, setText] = useLocalStorage<string>(DRAFT_KEY, '')
  const [activePlatform, setActivePlatform] = useLocalStorage<PlatformId>(
    PLATFORM_KEY,
    DEFAULT_PLATFORM,
  )

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
        showToast('Instagram line breaks fixed')
      } else if (action === 'trimWhitespace') {
        setText((prev) => trimWhitespace(prev))
        showToast('Whitespace trimmed')
      } else {
        const result = cleanHashtags(text)
        setText(result.text)
        if (result.hashtags.length === 0) showToast('No hashtags found', 'info')
        else
          showToast(
            `${result.hashtags.length} hashtag${result.hashtags.length > 1 ? 's' : ''} cleaned & moved to end`,
          )
      }
    },
    [text, setText, showToast],
  )

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      showToast('Copied to clipboard!', 'success')
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      showToast('Copy failed — select and copy manually', 'error')
    }
  }, [text, showToast])

  return (
    <div className="flex min-h-dvh flex-col">
      <Header isDark={isDark} onToggleTheme={toggle} repoUrl={REPO_URL} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Social Media Post Formatter &amp; Hashtag Cleaner
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Bold and italic text for LinkedIn and X, Instagram line breaks that
            survive the paste, tidy hashtags, and live character limits — all in
            your browser.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <EditorPane
            value={text}
            onChange={setText}
            onAction={handleAction}
            showToast={showToast}
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

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        PostCraft — 100% client-side. Your text never leaves this browser.
      </footer>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  )
}
