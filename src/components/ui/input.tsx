import * as React from 'react'

import { cn } from '@/lib/common/index'

function Input({
  className,
  type,
  disabled,
  placeholder,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      placeholder={disabled ? undefined : placeholder}
      disabled={disabled}
      className={cn(
        'file:text-foreground font-medium placeholder:font-medium placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-12 w-full min-w-0 rounded-xl bg-input px-4 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
