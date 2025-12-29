import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@/lib/common/index'

function Badge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(
        'inline-flex items-center justify-center rounded-full border pl-3 pr-2.5 py-1.5 text-xs font-semibold text-blue-500 bg-blue-50 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
