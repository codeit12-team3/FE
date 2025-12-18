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
        'h-14 w-full min-w-0 font-normal border border-gray-200 rounded-lg bg-white text-gray-800 p-4 text-base transition-[color,box-shadow] outline-none',
        'placeholder:font-normal placeholder:text-gray-500',
        'file:text-gray-800 file:inline-flex file:h-7 file:bg-transparent file:text-base file:font-normal',
        'selection:bg-blue-500 selection:text-gray-800',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500',
        'focus-visible:border-blue-500 focus-visible:ring-blue-300 focus-visible:ring-[3px]',
        'aria-invalid:ring-red/40 aria-invalid:border-red',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
