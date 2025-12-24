import { cn } from '@/lib/common/index'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-gray-200 animate-pulse rounded-xl', className)}
      {...props}
    />
  )
}

export { Skeleton }
