'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import UserMenu from './UserMenu'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className=" border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10 ">
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
                href="/chatting"
                className={`text-base transition-colors ${
                  pathname === '/chatting'
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
