'use client'

import { LazyMotion } from 'motion/react'

const loadFeatures = () =>
  import('@/lib/motion').then((res) => res.domAnimation)

interface Props {
  children: React.ReactNode
}

export default function LazyMotionProvider({ children }: Props) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>
}
