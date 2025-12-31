import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/common/index'

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500/40 focus-visible:ring-[3px] aria-invalid:ring-red aria-invalid:border-red",
  {
    variants: {
      variant: {
        default: [
          'bg-blue-500 text-white',
          'hover:bg-blue-600',
          'active:bg-blue-700',
          'disabled:bg-gray-200 disabled:text-gray-600 ',
        ],
        tertiary: [
          'bg-white text-gray-600 border border-gray-300',
          'hover:bg-gray-100',
          'active:bg-gray-200 active:text-gray-700',
          'disabled:text-gray-400',
        ],
        secondary: [
          'bg-white text-blue-500 border border-blue-500',
          'hover:bg-gray-100 hover:text-blue-600',
          'active:bg-gray-200 active:text-blue-600 border-blue-600',
          'disabled:border-gray-300 disabled:text-gray-400',
        ],
        ghost: ['text-gray-500', 'hover:text-gray-600', 'active:text-gray-600'],
        link: [
          'text-blue-500 underline-offset-4',
          'hover:text-blue-600 hover:underline',
          'active:text-blue-700 active:underline',
        ],
      },
      size: {
        'sm': 'h-8 rounded-[10px] px-4.5 py-2 text-xs has-[>svg]:px-2',
        'md': 'h-10 rounded-xl px-6 py-[10px] text-sm has-[>svg]:px-3',
        'lg': 'h-14 rounded-2xl px-7.5 py-4 text-base has-[>svg]:px-4',
        'icon': 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
