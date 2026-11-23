import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn('glass inline-flex h-11 items-center gap-1 rounded-2xl p-1', className)} {...props} />
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-white/15 data-[state=active]:text-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-black/20 [&_svg]:size-4',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('mt-5 outline-none data-[state=active]:animate-in', className)} {...props} />
}
