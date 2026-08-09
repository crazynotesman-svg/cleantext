import { useEffect } from 'react'

export type ToastTone = 'success' | 'info' | 'error'

export interface ToastState {
  id: number
  message: string
  tone: ToastTone
}

const TONE_CLASS: Record<ToastTone, string> = {
  success:
    'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/70 dark:text-emerald-200',
  info: 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
  error:
    'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/70 dark:text-rose-200',
}

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastState | null
  onDismiss: () => void
}) {
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(onDismiss, 2200)
    return () => window.clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div
        className={`pointer-events-auto flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-lg transition ${TONE_CLASS[toast.tone]}`}
      >
        {toast.message}
      </div>
    </div>
  )
}
