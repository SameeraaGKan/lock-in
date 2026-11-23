/** Literal class strings so Tailwind picks them up. */
export const CATEGORY_STYLES: Record<string, { pill: string; dot: string; bar: string }> = {
  Automata: { pill: 'bg-violet-500/15 text-violet-200 ring-violet-400/30', dot: 'bg-violet-400', bar: 'from-violet-500 to-violet-300' },
  'HW 5': { pill: 'bg-purple-500/15 text-purple-200 ring-purple-400/30', dot: 'bg-purple-400', bar: 'from-purple-500 to-purple-300' },
  CLEP: { pill: 'bg-orange-500/15 text-orange-200 ring-orange-400/30', dot: 'bg-orange-400', bar: 'from-orange-500 to-amber-300' },
  Exam: { pill: 'bg-red-500/15 text-red-200 ring-red-400/30', dot: 'bg-red-400', bar: 'from-red-500 to-rose-300' },
  SE: { pill: 'bg-blue-500/15 text-blue-200 ring-blue-400/30', dot: 'bg-blue-400', bar: 'from-blue-500 to-sky-300' },
  OBHR: { pill: 'bg-teal-500/15 text-teal-200 ring-teal-400/30', dot: 'bg-teal-400', bar: 'from-teal-500 to-emerald-300' },
  OS: { pill: 'bg-rose-500/15 text-rose-200 ring-rose-400/30', dot: 'bg-rose-400', bar: 'from-rose-500 to-pink-300' },
  'Grad apps': { pill: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/30', dot: 'bg-emerald-400', bar: 'from-emerald-500 to-lime-300' },
  Project: { pill: 'bg-sky-500/15 text-sky-200 ring-sky-400/30', dot: 'bg-sky-400', bar: 'from-sky-500 to-cyan-300' },
  ACM: { pill: 'bg-amber-500/15 text-amber-200 ring-amber-400/30', dot: 'bg-amber-400', bar: 'from-amber-500 to-yellow-300' },
  WeHack: { pill: 'bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-400/30', dot: 'bg-fuchsia-400', bar: 'from-fuchsia-500 to-pink-300' },
  Journal: { pill: 'bg-pink-500/15 text-pink-200 ring-pink-400/30', dot: 'bg-pink-400', bar: 'from-pink-500 to-rose-300' },
  Admin: { pill: 'bg-slate-500/20 text-slate-200 ring-slate-400/30', dot: 'bg-slate-400', bar: 'from-slate-500 to-slate-300' },
  Other: { pill: 'bg-zinc-500/20 text-zinc-200 ring-zinc-400/30', dot: 'bg-zinc-400', bar: 'from-zinc-500 to-zinc-300' },
}

export const CATEGORIES = Object.keys(CATEGORY_STYLES)

export const categoryStyle = (c: string) => CATEGORY_STYLES[c] ?? CATEGORY_STYLES.Other
