'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ComponentProps } from 'react'

import { cn } from '@/lib/common'

const skeletonVariants = cva('animate-pulse bg-bg-disabled rounded-xl', {
  variants: {
    variant: {
      default: 'bg-sub ',
    },
    size: {
      sm: 'h-4 w-20 rounded-md',
      md: 'h-6 w-40 rounded-lg',
      lg: 'h-8 w-full rounded-2xl',
      circle: 'w-10 h-10 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export const Skeleton = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & VariantProps<typeof skeletonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  )
})

Skeleton.displayName = 'Skeleton'

export { skeletonVariants }
