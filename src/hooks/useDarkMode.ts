import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const THEME_STORAGE_KEY = 'postcraft:theme'

type Theme = 'light' | 'dark'

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Class-strategy dark mode synced to <html class="dark"> and localStorage.
 * Defaults to the OS preference on first visit.
 */
export function useDarkMode() {
  const [theme, setTheme] = useLocalStorage<Theme>(
    THEME_STORAGE_KEY,
    systemPrefersDark() ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  const toggle = useCallback(
    () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [setTheme],
  )

  return { theme, setTheme, toggle, isDark: theme === 'dark' }
}
