'use client'

import * as m from 'motion/react-m'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof m.fieldset>

export default function AnimateFieldset(props: Props) {
  return (
    <m.fieldset
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    />
  )
}
