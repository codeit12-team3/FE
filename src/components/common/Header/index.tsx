'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import UserMenu from './UserMenu'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-bg-base">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-[86px]">
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Trip us"
                width={110}
                height={39}
              />
            </Link>
            <nav className="flex gap-8">
              <Link
                href="/"
                className={`text-base transition-colors ${
                  pathname === '/'
                    ? 'text-main '
                    : 'text-text-input hover:text-main'
                }`}
              >
                게시판
              </Link>
              <Link
                href="/chat"
                className={`text-base transition-colors ${
                  pathname === '/chat'
                    ? 'text-main font-semibold'
                    : 'text-text-input hover:text-main'
                }`}
              >
                채팅방
              </Link>
            </nav>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
