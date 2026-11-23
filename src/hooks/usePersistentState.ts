import { useEffect, useState } from 'react'

const PREFIX = 'lock-in:v1:'

/** useState that survives refreshes. Storage can be unavailable (private mode, sandboxed frames), so every access is guarded. */
export function usePersistentState<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw !== null) return JSON.parse(raw) as T
    } catch {
      /* fall through to initial */
    }
    return typeof initial === 'function' ? (initial as () => T)() : initial
  })

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* storage full or blocked: keep working in memory */
    }
  }, [key, value])

  return [value, setValue] as const
}
