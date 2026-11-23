import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', {
  variants: {
    variant: {
      default: 'bg-white/10 text-foreground ring-white/15',
      violet: 'bg-violet-500/15 text-violet-200 ring-violet-400/30',
      cyan: 'bg-cyan-500/15 text-cyan-200 ring-cyan-400/30',
      success: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/40',
      danger: 'bg-rose-500/15 text-rose-200 ring-rose-400/40',
    },
  },
  defaultVariants: { variant: 'default' },
})

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}
