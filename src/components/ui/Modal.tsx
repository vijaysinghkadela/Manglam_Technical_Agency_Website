'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'enterprise-card fixed left-1/2 top-1/2 z-[201] max-h-[85vh] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 overflow-auto p-6 sm:p-8',
            className,
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <Dialog.Title className="font-display text-2xl font-black text-foreground">
              {title}
            </Dialog.Title>
            <Dialog.Close className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-violet hover:text-violet">
              <X className="h-4 w-4" />
              <span className="sr-only">Close modal</span>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
