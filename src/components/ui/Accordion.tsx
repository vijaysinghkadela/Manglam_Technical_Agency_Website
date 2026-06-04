'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Accordion({
  items,
  className,
}: {
  items: { id: string; title: string; content: ReactNode }[]
  className?: string
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className={cn('border-t border-border', className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id} className="border-b border-border">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-6 text-left font-display text-lg font-bold text-foreground">
              {item.title}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_250ms_var(--ease-smooth)] data-[state=open]:animate-[accordion-down_250ms_var(--ease-smooth)]">
            <div className="pb-6 text-sm leading-relaxed text-muted">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
