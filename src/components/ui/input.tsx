import * as React from 'react'
import { cn } from '@/lib/utils'

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      data-slot="input"
      className={cn(
        'h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 font-mono text-[12.5px] leading-relaxed text-foreground/90 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30',
        className,
      )}
      {...props}
    />
  )
}
