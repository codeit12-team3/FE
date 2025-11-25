import type { Metadata } from 'next'

import './globals.css'

import { Toaster } from '@/components/ui'
import { LazyMotionProvider, MSWProvider, QueryProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'Tripus - 취향 기반의 여행 동행자 매칭 플랫폼',
  description: '같은 취향의 여행 친구들을 찾아보세요',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <QueryProvider>
            <LazyMotionProvider>{children}</LazyMotionProvider>
          </QueryProvider>
        </MSWProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
