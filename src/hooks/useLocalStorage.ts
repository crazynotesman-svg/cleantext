import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Persisted state backed by `localStorage`.
 * Falls back to in-memory state when storage is unavailable (private mode,
 * blocked cookies, SSR) so the tool never hard-crashes on a hostile browser.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : (JSON.parse(raw) as T)
    } catch {
      return initialValue
    }
  })

  const keyRef = useRef(key)
  keyRef.current = key

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value))
    } catch {
      /* quota exceeded or storage disabled — keep working in memory */
    }
  }, [value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset] as const
}
