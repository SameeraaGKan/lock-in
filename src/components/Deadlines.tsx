import { CalendarClock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { daysUntil, monthDay, weekdayShort } from '@/lib/time'
import type { Deadline } from '@/lib/types'
import { cn } from '@/lib/utils'

export function Deadlines({ deadlines, now }: { deadlines: Deadline[]; now: Date }) {
  const dated = deadlines
    .filter((d) => d.date && daysUntil(d.date, now) >= 0)
    .sort((a, b) => a.date!.localeCompare(b.date!))
  const tbd = deadlines.filter((d) => !d.date)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CalendarClock className="size-4 text-cyan-300" /> Coming up
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {dated.map((d) => {
          const n = daysUntil(d.date!, now)
          return (
            <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
              <div
                className={cn(
                  'grid size-12 shrink-0 place-items-center rounded-xl text-center leading-none',
                  n <= 3 ? 'bg-rose-500/20 text-rose-100 ring-1 ring-rose-400/40' : n <= 10 ? 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/30' : 'bg-white/[0.07] ring-1 ring-white/10',
                )}
              >
                <div>
                  <div className="text-lg font-bold">{n === 0 ? '!' : n}</div>
                  <div className="text-[9px] uppercase tracking-wider opacity-80">{n === 0 ? 'today' : n === 1 ? 'day' : 'days'}</div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{d.title}</div>
                <div className="text-xs text-muted-foreground">
                  {weekdayShort(d.date!)} {monthDay(d.date!)} · {d.note}
                </div>
              </div>
            </div>
          )
        })}
        {tbd.map((d) => (
          <div key={d.id} className="flex items-center gap-3 rounded-2xl border border-dashed border-white/10 p-3 text-muted-foreground">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-xs font-semibold">TBD</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-foreground/80">{d.title}</div>
              <div className="text-xs">{d.note}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
