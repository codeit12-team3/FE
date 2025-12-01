import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/lib/common'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-main/40 transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-main text-white font-semibold disabled:bg-bg-disabled disabled:text-bg-disabled disabled:font-medium disabled:pointer-events-none',
        secondary:
          'font-semibold border border-main text-main bg-white disabled:border-bg-disabled disabled:text-bg-disabled disabled:pointer-events-none',
      },
      size: {
        sm: 'h-10 px-4 py-2.5 rounded-[10px] text-sm',
        md: 'h-12 px-6 py-2 rounded-xl text-base',
        lg: 'h-15 rounded-2xl py-4 px-7.5 text-xl',
      },
      width: {
        fit: 'w-fit',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      width: 'fit',
    },
  },
)

function Button({
  className,
  variant,
  size,
  width,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, width, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
