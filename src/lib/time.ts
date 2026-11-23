import type { Session } from './types'

const pad = (n: number) => String(n).padStart(2, '0')

/** Local YYYY-MM-DD. */
export function dateKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** Parse YYYY-MM-DD as a *local* date (new Date('2026-11-23') would be UTC midnight). */
export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const minutesNow = (d: Date = new Date()) => d.getHours() * 60 + d.getMinutes()

/** "13:05" -> "1:05 PM" */
export function formatClock(hhmm: string): string {
  const mins = toMinutes(hhmm)
  const h = Math.floor(mins / 60) % 24
  const m = mins % 60
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 === 0 ? 12 : h % 12}:${pad(m)} ${suffix}`
}

export function formatRange(s: Pick<Session, 'start' | 'end'>): string {
  const a = formatClock(s.start)
  const b = formatClock(s.end)
  // "9:00 AM – 9:40 AM" -> "9:00 – 9:40 AM"
  return a.slice(-2) === b.slice(-2) ? `${a.slice(0, -3)} – ${b}` : `${a} – ${b}`
}

/** 2400 -> "40:00", 3725 -> "1:02:05" */
export function formatDuration(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

/** Whole days from today until `key` (0 = today, negative = past). */
export function daysUntil(key: string, today: Date = new Date()): number {
  const a = parseDateKey(dateKey(today)).getTime()
  const b = parseDateKey(key).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function sortSessions(list: Session[]): Session[] {
  return [...list].sort((a, b) => a.date.localeCompare(b.date) || toMinutes(a.start) - toMinutes(b.start))
}

/** The session happening right now, else the next one later today. */
export function currentOrNext(list: Session[], now: Date = new Date()): { session: Session; isNow: boolean } | null {
  const today = dateKey(now)
  const mins = minutesNow(now)
  const todays = sortSessions(list.filter((s) => s.date === today && !s.done))
  const live = todays.find((s) => toMinutes(s.start) <= mins && mins < toMinutes(s.end))
  if (live) return { session: live, isNow: true }
  const next = todays.find((s) => toMinutes(s.start) > mins)
  return next ? { session: next, isNow: false } : null
}

export const weekdayShort = (key: string) => parseDateKey(key).toLocaleDateString('en-US', { weekday: 'short' })
export const monthDay = (key: string) => parseDateKey(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
