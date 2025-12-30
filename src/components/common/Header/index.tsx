'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/common'

import UserMenu from './UserMenu'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-center border-b border-gray-200 bg-white h-[52px] md:h-[68px]">
      <div className="max-w-7xl px-4 py-2 md:px-6 md:py-3 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-8 ">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Trip us 메인 로고"
                width={90}
                height={32}
                className="w-[72px] h-[25px] md:w-[90px] md:h-8"
                priority
              />
            </Link>
            <nav className="flex gap-2">
              <Link
                href="/"
                className={cn(
                  'transition-colors text-xs font-semibold md:text-sm',
                  pathname === '/'
                    ? 'text-blue-500'
                    : 'text-gray-500 hover:text-gray-700 active:text-gray-700',
                )}
              >
                <span className="sm:px-6 px-5 py-2.5 sm:py-3 font-semibold">
                  게시판
                </span>
              </Link>
              <Link
                href="/chat"
                className={cn(
                  'transition-colors text-xs font-semibold md:text-sm',
                  pathname === '/chat'
                    ? 'text-blue-500'
                    : 'text-gray-500 hover:text-gray-700 active:text-gray-700',
                )}
              >
                <span className="sm:px-6 px-5 py-2.5 sm:py-3 font-semibold">
                  채팅방
                </span>
              </Link>
            </nav>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
