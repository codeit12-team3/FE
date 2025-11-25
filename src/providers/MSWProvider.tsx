'use client'

import { Suspense, use } from 'react'

import { initMocks } from '@/mocks'

const mockingEnabledPromise =
  typeof window === 'undefined' ? Promise.resolve() : initMocks()

const MSWProviderWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  use(mockingEnabledPromise)
  return children
}

export default function MSWProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}
