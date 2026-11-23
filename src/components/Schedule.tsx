import { Check, ExternalLink, Play, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CATEGORIES, categoryStyle } from '@/lib/categories'
import { dateKey, formatRange, minutesNow, monthDay, sortSessions, toMinutes, weekdayShort } from '@/lib/time'
import type { Session } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  sessions: Session[]
  days: string[]
  selectedDay: string
  onSelectDay: (d: string) => void
  activeSessionId: string | null
  timerRunning: boolean
  now: Date
  onToggle: (id: string) => void
  onFocus: (id: string) => void
  onDelete: (id: string) => void
  onAdd: (s: Omit<Session, 'id' | 'done'>) => void
}

function Checkbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={checked}
      aria-label={checked ? 'Mark not done' : 'Mark done'}
      className={cn(
        'grid size-6 shrink-0 cursor-pointer place-items-center rounded-lg border transition-all',
        checked ? 'border-transparent bg-gradient-to-br from-violet-500 to-cyan-400 shadow-md shadow-violet-500/40' : 'border-white/25 hover:border-white/50 hover:bg-white/10',
      )}
    >
      {checked && <Check className="size-3.5 text-white" strokeWidth={3} />}
    </button>
  )
}

function AddForm({ day, onAdd }: { day: string; onAdd: Props['onAdd'] }) {
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState('')
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('09:40')
  const [category, setCategory] = useState('Automata')

  if (!open)
    return (
      <Button variant="outline" className="w-full border-dashed" onClick={() => setOpen(true)}>
        <Plus /> Add a session
      </Button>
    )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) return
    onAdd({ date: day, start, end: toMinutes(end) > toMinutes(start) ? end : start, task: task.trim(), category })
    setTask('')
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 animate-in">
      <Input autoFocus placeholder="What are you doing?" value={task} onChange={(e) => setTask(e.target.value)} className="font-sans" />
      <div className="flex flex-wrap items-center gap-2">
        <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="w-32" />
        <span className="text-muted-foreground">→</span>
        <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="w-32" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 flex-1 cursor-pointer rounded-xl border border-white/10 bg-black/30 px-3 text-sm outline-none focus:border-primary/60"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-slate-900">
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={!task.trim()}>
          <Plus /> Add to {weekdayShort(day)}
        </Button>
      </div>
    </form>
  )
}

export function Schedule({ sessions, days, selectedDay, onSelectDay, activeSessionId, timerRunning, now, onToggle, onFocus, onDelete, onAdd }: Props) {
  const today = dateKey(now)
  const mins = minutesNow(now)
  const list = sortSessions(sessions.filter((s) => s.date === selectedDay))
  const done = list.filter((s) => s.done).length

  return (
    <Card className="min-w-0">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Schedule</CardTitle>
            <CardDescription>
              {weekdayShort(selectedDay)}, {monthDay(selectedDay)} · {done}/{list.length} done
            </CardDescription>
          </div>
        </div>

        {/* day picker */}
        <div className="scroll-thin -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {days.map((d) => {
            const daySessions = sessions.filter((s) => s.date === d)
            const pct = daySessions.length ? daySessions.filter((s) => s.done).length / daySessions.length : 0
            const selected = d === selectedDay
            return (
              <button
                key={d}
                onClick={() => onSelectDay(d)}
                className={cn(
                  'relative flex w-[4.5rem] shrink-0 cursor-pointer flex-col items-center rounded-2xl border px-2 pb-2.5 pt-2 transition-all',
                  selected ? 'border-violet-400/50 bg-violet-500/20 shadow-lg shadow-violet-500/15' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08]',
                )}
              >
                <span className={cn('text-[11px] font-medium uppercase tracking-wider', d === today ? 'text-cyan-300' : 'text-muted-foreground')}>
                  {d === today ? 'Today' : weekdayShort(d)}
                </span>
                <span className="text-lg font-semibold">{monthDay(d).split(' ')[1]}</span>
                <span className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all" style={{ width: `${pct * 100}%` }} />
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {list.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 py-10 text-center text-sm text-muted-foreground">Nothing planned. Rest day? 🌙</div>}

        {list.map((s) => {
          const live = s.date === today && toMinutes(s.start) <= mins && mins < toMinutes(s.end)
          const past = s.date < today || (s.date === today && toMinutes(s.end) <= mins)
          const attached = s.id === activeSessionId
          const style = categoryStyle(s.category)
          return (
            <div
              key={s.id}
              className={cn(
                'group flex items-start gap-3 rounded-2xl border p-3 transition-all',
                attached && timerRunning
                  ? 'border-violet-400/50 bg-violet-500/15 shadow-lg shadow-violet-500/10'
                  : live
                    ? 'border-cyan-400/40 bg-cyan-500/10'
                    : 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]',
                s.done && 'opacity-55',
              )}
            >
              <div className="pt-0.5">
                <Checkbox checked={s.done} onClick={() => onToggle(s.id)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={cn('font-mono text-xs', past && !s.done ? 'text-amber-200/80' : 'text-muted-foreground')}>{formatRange(s)}</span>
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset', style.pill)}>
                    <span className={cn('size-1.5 rounded-full', style.dot)} />
                    {s.category}
                  </span>
                  {live && !s.done && <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200">Now</span>}
                  {attached && timerRunning && <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200">Focusing</span>}
                </div>
                <p className={cn('text-sm leading-snug', s.done && 'line-through')}>{s.task}</p>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200">
                    <ExternalLink className="size-3" /> Video
                  </a>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {!s.done && (
                  <Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => onFocus(s.id)} title="Start a focus session on this">
                    <Play />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:text-rose-300"
                  onClick={() => onDelete(s.id)}
                  title="Delete"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          )
        })}

        <div className="pt-2">
          <AddForm key={selectedDay} day={selectedDay} onAdd={onAdd} />
        </div>
      </CardContent>
    </Card>
  )
}
