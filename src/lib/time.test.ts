import { describe, expect, it } from 'vitest'
import { SEED_DEADLINES, SEED_SESSIONS } from '@/data/seed'
import { CATEGORIES } from './categories'
import { currentOrNext, daysUntil, formatClock, formatDuration, formatRange, sortSessions, toMinutes } from './time'
import type { Session } from './types'

const s = (id: string, date: string, start: string, end: string, done = false): Session => ({ id, date, start, end, task: id, category: 'Automata', done })

describe('formatting', () => {
  it('formats clocks and ranges', () => {
    expect(formatClock('09:00')).toBe('9:00 AM')
    expect(formatClock('13:05')).toBe('1:05 PM')
    expect(formatClock('00:30')).toBe('12:30 AM')
    expect(formatRange({ start: '09:00', end: '09:40' })).toBe('9:00 – 9:40 AM')
    expect(formatRange({ start: '11:30', end: '12:10' })).toBe('11:30 AM – 12:10 PM')
  })
  it('formats durations', () => {
    expect(formatDuration(2400)).toBe('40:00')
    expect(formatDuration(59.6)).toBe('01:00')
    expect(formatDuration(3725)).toBe('1:02:05')
  })
})

describe('scheduling', () => {
  const list = [s('a', '2026-11-23', '09:00', '09:40'), s('b', '2026-11-23', '10:00', '10:40'), s('c', '2026-11-23', '13:00', '13:40', true)]

  it('finds the live session', () => {
    expect(currentOrNext(list, new Date(2026, 10, 23, 9, 15))).toEqual({ session: list[0], isNow: true })
  })
  it('falls back to the next one, skipping done sessions', () => {
    expect(currentOrNext(list, new Date(2026, 10, 23, 9, 50))?.session.id).toBe('b')
    expect(currentOrNext(list, new Date(2026, 10, 23, 11, 0))).toBeNull()
  })
  it('counts days in local time', () => {
    expect(daysUntil('2026-12-09', new Date(2026, 10, 22, 23, 59))).toBe(17)
    expect(daysUntil('2026-11-22', new Date(2026, 10, 22, 0, 1))).toBe(0)
  })
})

describe('seed plan', () => {
  it('has unique ids and known categories', () => {
    expect(new Set(SEED_SESSIONS.map((x) => x.id)).size).toBe(SEED_SESSIONS.length)
    for (const x of SEED_SESSIONS) expect(CATEGORIES).toContain(x.category)
  })
  it('has sessions in order with end after start', () => {
    expect(sortSessions(SEED_SESSIONS).map((x) => x.id)).toEqual(SEED_SESSIONS.map((x) => x.id))
    for (const x of SEED_SESSIONS) expect(toMinutes(x.end)).toBeGreaterThan(toMinutes(x.start))
  })
  it('keeps E2 on Dec 9', () => {
    expect(SEED_DEADLINES.find((d) => d.title.startsWith('Automata E2'))?.date).toBe('2026-12-09')
  })
})
