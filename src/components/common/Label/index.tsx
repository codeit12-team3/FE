import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/common'

type Props = ComponentProps<'label'>

const Label = forwardRef<HTMLLabelElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-base font-medium', className)}
        {...props}
      >
        {children}
      </label>
    )
  },
)

Label.displayName = 'Label'

export default Label
