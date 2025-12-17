import * as React from 'react'

import { cn } from '@/lib/common/index'

function Textarea({
  className,
  disabled,
  placeholder,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      placeholder={disabled ? undefined : placeholder}
      disabled={disabled}
      className={cn(
        'placeholder:text-muted-foreground border border-gray-200 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-xl px-4 py-3 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
