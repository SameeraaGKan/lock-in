export interface Session {
  id: string
  /** YYYY-MM-DD, local */
  date: string
  /** HH:MM, 24h */
  start: string
  end: string
  task: string
  category: string
  link?: string
  done: boolean
}

export interface Deadline {
  id: string
  title: string
  /** YYYY-MM-DD, or null when still TBD */
  date: string | null
  note: string
}

export type TimerMode = 'focus' | 'break'

export interface TimerState {
  mode: TimerMode
  /** epoch ms when the current countdown hits 0, or null while paused */
  endsAt: number | null
  /** seconds left, kept up to date while paused */
  remaining: number
  /** session the timer is attached to */
  sessionId: string | null
}

export interface Settings {
  focusMin: number
  breakMin: number
  sound: boolean
}
