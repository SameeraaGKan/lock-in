import { useCallback, useEffect, useRef, useState } from 'react'
import { dateKey } from '@/lib/time'
import type { Settings, TimerMode, TimerState } from '@/lib/types'
import { usePersistentState } from './usePersistentState'

function chime(kind: TimerMode) {
  try {
    const ctx = new AudioContext()
    const notes = kind === 'focus' ? [523.25, 659.25, 783.99] : [783.99, 659.25, 523.25]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      const t = ctx.currentTime + i * 0.18
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.55)
    })
  } catch {
    /* audio blocked */
  }
}

function notify(title: string, body: string) {
  try {
    if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: './favicon.svg' })
  } catch {
    /* notifications unavailable */
  }
}

export function useTimer(settings: Settings, onFocusComplete: (sessionId: string | null, minutes: number) => void) {
  const durationOf = useCallback((m: TimerMode) => (m === 'focus' ? settings.focusMin : settings.breakMin) * 60, [settings.focusMin, settings.breakMin])

  const [state, setState] = usePersistentState<TimerState>('timer', { mode: 'focus', endsAt: null, remaining: settings.focusMin * 60, sessionId: null })
  const [now, setNow] = useState(() => Date.now())
  const completeRef = useRef(onFocusComplete)
  completeRef.current = onFocusComplete

  const running = state.endsAt !== null
  const remaining = running ? Math.max(0, (state.endsAt! - now) / 1000) : state.remaining
  const total = durationOf(state.mode)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [running])

  // when a countdown hits zero: log focus time, chime, flip modes
  useEffect(() => {
    if (!running || remaining > 0) return
    if (state.mode === 'focus') {
      completeRef.current(state.sessionId, settings.focusMin)
      if (settings.sound) chime('focus')
      notify('Focus session done 🎉', `Take a ${settings.breakMin}-minute break.`)
      const br = durationOf('break')
      setState((s) => ({ ...s, mode: 'break', remaining: br, endsAt: Date.now() + br * 1000 }))
    } else {
      if (settings.sound) chime('break')
      notify('Break over', 'Back to it, time to lock in.')
      setState((s) => ({ ...s, mode: 'focus', remaining: durationOf('focus'), endsAt: null }))
    }
  }, [running, remaining, state.mode, state.sessionId, settings, durationOf, setState])

  // reset an idle timer when the durations change
  useEffect(() => {
    setState((s) => (s.endsAt === null && (s.remaining === 0 || s.remaining > durationOf(s.mode)) ? { ...s, remaining: durationOf(s.mode) } : s))
  }, [durationOf, setState])

  const start = useCallback(() => {
    try {
      if ('Notification' in window && Notification.permission === 'default') void Notification.requestPermission()
    } catch {
      /* ignore */
    }
    setNow(Date.now())
    setState((s) => (s.endsAt ? s : { ...s, endsAt: Date.now() + s.remaining * 1000 }))
  }, [setState])

  const pause = useCallback(() => setState((s) => (s.endsAt ? { ...s, remaining: Math.max(0, (s.endsAt - Date.now()) / 1000), endsAt: null } : s)), [setState])

  const reset = useCallback(() => setState((s) => ({ ...s, endsAt: null, remaining: durationOf(s.mode) })), [setState, durationOf])

  const switchMode = useCallback((mode: TimerMode) => setState((s) => ({ ...s, mode, endsAt: null, remaining: durationOf(mode) })), [setState, durationOf])

  /** attach a session and start a fresh focus block */
  const focusOn = useCallback(
    (sessionId: string) => {
      setNow(Date.now())
      setState({ mode: 'focus', sessionId, remaining: durationOf('focus'), endsAt: Date.now() + durationOf('focus') * 1000 })
    },
    [setState, durationOf],
  )

  const skip = useCallback(() => switchMode(state.mode === 'focus' ? 'break' : 'focus'), [switchMode, state.mode])

  return { ...state, running, remaining, total, progress: 1 - remaining / total, start, pause, reset, skip, switchMode, focusOn, today: dateKey() }
}
