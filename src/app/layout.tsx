import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { Header } from '@/components/common/Header'
import { Toaster } from '@/components/ui'
import { LazyMotionProvider, MSWProvider, QueryProvider } from '@/providers'

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

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
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans antialiased`}>
        <MSWProvider>
          <QueryProvider>
            <LazyMotionProvider>
              <Header />
              {children}
            </LazyMotionProvider>
          </QueryProvider>
        </MSWProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
