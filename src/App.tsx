import { CalendarCheck2, Download, Flame, Lock, RotateCcw, Timer, TrendingUp } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Deadlines } from '@/components/Deadlines'
import { FocusTimer } from '@/components/FocusTimer'
import { Schedule } from '@/components/Schedule'
import { Button } from '@/components/ui/button'
import { SEED_DEADLINES, SEED_SESSIONS } from '@/data/seed'
import { usePersistentState } from '@/hooks/usePersistentState'
import { useTimer } from '@/hooks/useTimer'
import { currentOrNext, dateKey, daysUntil, formatDuration } from '@/lib/time'
import type { Session, Settings } from '@/lib/types'
import { cn } from '@/lib/utils'

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.25_0.08_285),transparent_60%)]" />
      <div className="absolute -left-32 top-10 size-[28rem] animate-blob rounded-full bg-violet-600/35 blur-3xl" />
      <div className="absolute right-[-8rem] top-1/3 size-[30rem] animate-blob rounded-full bg-cyan-500/25 blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-[-10rem] left-1/3 size-[26rem] animate-blob rounded-full bg-fuchsia-600/25 blur-3xl [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  )
}

function StatTile({ icon, label, value, sub, accent }: { icon: React.ReactNode; label: string; value: string; sub?: string; accent: string }) {
  return (
    <div className="glass-card flex items-center gap-4 rounded-3xl p-4">
      <div className={cn('grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg', accent)}>{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-xl font-semibold tabular-nums">{value}</div>
        {sub && <div className="truncate text-xs text-muted-foreground">{sub}</div>}
      </div>
    </div>
  )
}

export default function App() {
  const [sessions, setSessions] = usePersistentState<Session[]>('sessions', SEED_SESSIONS)
  const [deadlines] = usePersistentState('deadlines', SEED_DEADLINES)
  const [settings, setSettings] = usePersistentState<Settings>('settings', { focusMin: 40, breakMin: 20, sound: true })
  const [focusLog, setFocusLog] = usePersistentState<Record<string, { minutes: number; blocks: number }>>('focus-log', {})
  // your name stays in this browser only; it never ships with the site
  const [name, setName] = usePersistentState('name', '')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(id)
  }, [])

  const today = dateKey(now)
  const days = useMemo(() => [...new Set(sessions.map((s) => s.date))].sort(), [sessions])
  const [selectedDay, setSelectedDay] = useState(() => (days.includes(today) ? today : days.find((d) => d >= today) ?? days[0] ?? today))

  const onFocusComplete = useCallback(
    (_id: string | null, minutes: number) => {
      const key = dateKey()
      setFocusLog((log) => ({ ...log, [key]: { minutes: (log[key]?.minutes ?? 0) + minutes, blocks: (log[key]?.blocks ?? 0) + 1 } }))
    },
    [setFocusLog],
  )
  const timer = useTimer(settings, onFocusComplete)

  const toggle = (id: string) => setSessions((list) => list.map((s) => (s.id === id ? { ...s, done: !s.done } : s)))
  const remove = (id: string) => setSessions((list) => list.filter((s) => s.id !== id))
  const add = (s: Omit<Session, 'id' | 'done'>) => setSessions((list) => [...list, { ...s, id: `u${Date.now()}`, done: false }])
  const focusOn = (id: string) => {
    timer.focusOn(id)
    const s = sessions.find((x) => x.id === id)
    if (s) setSelectedDay(s.date)
  }

  const attached = sessions.find((s) => s.id === timer.sessionId) ?? null
  const suggestion = currentOrNext(sessions, now)

  // tab title doubles as a mini timer
  useEffect(() => {
    document.title = timer.running ? `${formatDuration(timer.remaining)} · ${timer.mode === 'focus' ? 'Focus' : 'Break'} | Lock In` : 'Lock In'
  }, [timer.running, timer.remaining, timer.mode])

  const todays = sessions.filter((s) => s.date === today)
  const todayDone = todays.filter((s) => s.done).length
  const weekDone = sessions.filter((s) => s.done).length
  const weekPct = sessions.length ? Math.round((weekDone / sessions.length) * 100) : 0
  const log = focusLog[today] ?? { minutes: 0, blocks: 0 }
  const nextDeadline = deadlines.filter((d) => d.date && daysUntil(d.date, now) >= 0).sort((a, b) => a.date!.localeCompare(b.date!))[0]

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ sessions, deadlines, focusLog, settings }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `lock-in-${today}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const resetPlan = () => {
    if (confirm('Reset the schedule to the original plan? Your check-offs and added sessions will be cleared.')) setSessions(SEED_SESSIONS)
  }

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/40">
              <Lock className="size-5 text-white" />
            </div>
            <div>
              <h1
                onClick={() => {
                  const next = prompt('What should I call you? (saved only in this browser)', name)
                  if (next !== null) setName(next.trim())
                }}
                title="Click to set your name"
                className="cursor-pointer bg-gradient-to-r from-white via-violet-100 to-cyan-200 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl"
              >
                {greeting}
                {name ? `, ${name}` : ''}
              </h1>
              <p className="text-sm text-muted-foreground">
                {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} ·{' '}
                {now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · time to lock in 🔒
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm" onClick={exportData}>
              <Download /> Export
            </Button>
            <Button variant="glass" size="sm" onClick={resetPlan}>
              <RotateCcw /> Reset plan
            </Button>
          </div>
        </header>

        {/* stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile icon={<Timer className="size-5" />} label="Focused today" value={`${Math.floor(log.minutes / 60)}h ${log.minutes % 60}m`} sub={`${log.blocks} block${log.blocks === 1 ? '' : 's'} finished`} accent="from-violet-500 to-indigo-500 shadow-violet-500/30" />
          <StatTile icon={<CalendarCheck2 className="size-5" />} label="Today" value={`${todayDone}/${todays.length}`} sub={todays.length ? `${todays.length - todayDone} to go` : 'nothing planned'} accent="from-cyan-500 to-sky-500 shadow-cyan-500/30" />
          <StatTile icon={<TrendingUp className="size-5" />} label="This week" value={`${weekPct}%`} sub={`${weekDone} of ${sessions.length} sessions`} accent="from-emerald-500 to-teal-500 shadow-emerald-500/30" />
          <StatTile
            icon={<Flame className="size-5" />}
            label="Next deadline"
            value={nextDeadline ? `${daysUntil(nextDeadline.date!, now)}d` : '—'}
            sub={nextDeadline?.title}
            accent="from-rose-500 to-orange-500 shadow-rose-500/30"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          <div className="min-w-0 space-y-6 lg:sticky lg:top-6 lg:self-start">
            <FocusTimer timer={timer} session={attached} suggestion={suggestion} settings={settings} onSettings={setSettings} onToggleDone={toggle} />
            <Deadlines deadlines={deadlines} now={now} />
          </div>
          <Schedule
            sessions={sessions}
            days={days}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            activeSessionId={timer.sessionId}
            timerRunning={timer.running}
            now={now}
            onToggle={toggle}
            onFocus={focusOn}
            onDelete={remove}
            onAdd={add}
          />
        </div>

        <footer className="mt-12 text-center text-xs text-muted-foreground">Lock In · everything is saved in your browser, nothing leaves this device</footer>
      </div>
    </div>
  )
}
