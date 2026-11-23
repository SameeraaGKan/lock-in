import { Bell, BellOff, Check, Coffee, Pause, Play, RotateCcw, SkipForward, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { useTimer } from '@/hooks/useTimer'
import { categoryStyle } from '@/lib/categories'
import { formatDuration, formatRange } from '@/lib/time'
import type { Session, Settings } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  timer: ReturnType<typeof useTimer>
  session: Session | null
  suggestion: { session: Session; isNow: boolean } | null
  settings: Settings
  onSettings: (s: Settings) => void
  onToggleDone: (id: string) => void
}

const SIZE = 260
const STROKE = 12
const RADIUS = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * RADIUS

function Ring({ progress, mode }: { progress: number; mode: 'focus' | 'break' }) {
  const id = `ring-${mode}`
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={mode === 'focus' ? '#8b5cf6' : '#10b981'} />
          <stop offset="100%" stopColor={mode === 'focus' ? '#22d3ee' : '#5eead4'} />
        </linearGradient>
      </defs>
      <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - Math.min(1, Math.max(0, progress)))}
        style={{ transition: 'stroke-dashoffset 0.3s linear', filter: `drop-shadow(0 0 10px ${mode === 'focus' ? 'rgba(139,92,246,0.6)' : 'rgba(16,185,129,0.6)'})` }}
      />
    </svg>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground">
      {label}
      <input
        type="number"
        min={1}
        max={180}
        value={value}
        onChange={(e) => onChange(Math.min(180, Math.max(1, Number(e.target.value) || 1)))}
        className="h-8 w-14 rounded-lg border border-white/10 bg-black/20 px-2 text-center font-mono text-sm text-foreground outline-none focus:border-primary/60"
      />
      min
    </label>
  )
}

export function FocusTimer({ timer, session, suggestion, settings, onSettings, onToggleDone }: Props) {
  const focus = timer.mode === 'focus'

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-5 p-6">
        {/* mode switch */}
        <div className="glass flex w-full rounded-2xl p-1">
          {(['focus', 'break'] as const).map((m) => (
            <button
              key={m}
              onClick={() => timer.switchMode(m)}
              className={cn(
                'flex h-9 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all',
                timer.mode === m ? 'bg-white/15 text-foreground shadow-lg shadow-black/20' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'focus' ? <Target className="size-4" /> : <Coffee className="size-4" />}
              {m === 'focus' ? `Focus · ${settings.focusMin}m` : `Break · ${settings.breakMin}m`}
            </button>
          ))}
        </div>

        {/* ring */}
        <div className="relative grid place-items-center">
          <Ring progress={timer.progress} mode={timer.mode} />
          <div className="absolute flex flex-col items-center">
            <span className={cn('text-[11px] font-semibold uppercase tracking-[0.25em]', focus ? 'text-violet-200' : 'text-emerald-200')}>
              {focus ? 'Focus' : 'Break'}
            </span>
            <span className="font-mono text-6xl font-semibold tabular-nums tracking-tight">{formatDuration(timer.remaining)}</span>
            <span className="mt-1 text-xs text-muted-foreground">{timer.running ? (focus ? 'locked in' : 'breathe') : 'paused'}</span>
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center gap-2">
          <Button variant="glass" size="icon" onClick={timer.reset} title="Reset">
            <RotateCcw />
          </Button>
          <Button onClick={timer.running ? timer.pause : timer.start} className="h-12 w-36 rounded-2xl text-base">
            {timer.running ? <Pause /> : <Play />}
            {timer.running ? 'Pause' : 'Start'}
          </Button>
          <Button variant="glass" size="icon" onClick={timer.skip} title={focus ? 'Skip to break' : 'Skip break'}>
            <SkipForward />
          </Button>
        </div>

        {/* attached task */}
        <div className="w-full rounded-2xl border border-white/10 bg-black/20 p-4">
          {session ? (
            <>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Working on</span>
                <Badge className={cn('ring-1 ring-inset', categoryStyle(session.category).pill)}>{session.category}</Badge>
              </div>
              <p className={cn('text-sm leading-snug', session.done && 'text-muted-foreground line-through')}>{session.task}</p>
              <Button variant={session.done ? 'glass' : 'outline'} size="sm" className="mt-3 w-full" onClick={() => onToggleDone(session.id)}>
                <Check /> {session.done ? 'Done, undo?' : 'Mark done'}
              </Button>
            </>
          ) : suggestion ? (
            <>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                {suggestion.isNow ? 'Scheduled right now' : `Up next · ${formatRange(suggestion.session)}`}
              </div>
              <p className="text-sm leading-snug">{suggestion.session.task}</p>
              <Button size="sm" className="mt-3 w-full" onClick={() => timer.focusOn(suggestion.session.id)}>
                <Play /> Focus on this
              </Button>
            </>
          ) : (
            <p className="text-center text-sm text-muted-foreground">Hit ▶ on any task to attach it to the timer.</p>
          )}
        </div>

        {/* settings */}
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <NumberField label="Focus" value={settings.focusMin} onChange={(focusMin) => onSettings({ ...settings, focusMin })} />
          <NumberField label="Break" value={settings.breakMin} onChange={(breakMin) => onSettings({ ...settings, breakMin })} />
          <Button variant="ghost" size="icon" onClick={() => onSettings({ ...settings, sound: !settings.sound })} title={settings.sound ? 'Mute chime' : 'Unmute chime'}>
            {settings.sound ? <Bell /> : <BellOff />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
