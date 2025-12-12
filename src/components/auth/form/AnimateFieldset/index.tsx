'use client'

import * as m from 'motion/react-m'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<typeof m.fieldset> {
  idx?: number
}

export default function AnimateFieldset({
  className,
  children,
  idx = 0,
  ...props
}: Props) {
  return (
    <m.fieldset
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: idx * 0.15,
      }}
      {...props}
    >
      {children}
    </m.fieldset>
  )
}
