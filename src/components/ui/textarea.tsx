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
        'font-normal border border-gray-200 placeholder:text-gray-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/40 aria-invalid:ring-red/40 aria-invalid:border-red flex field-sizing-content min-h-30 w-full rounded-xl bg-white p-4 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
