'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import UserMenu from './UserMenu'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className=" border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto xl:px-34 sm:px-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center sm:gap-10 gap-3 ">
            <Link href="/" className="sm:w-[90px] w-[72px]">
              <Image
                src="/images/Logo.png"
                alt="Trip us"
                width={90}
                height={30}
                className="w-full h-auto"
                style={{ width: '100%', height: '100%' }}
                priority
              />
            </Link>
            <nav className="flex sm:gap-2 ">
              <Link
                href="/"
                className={`transition-colors text-xs sm:text-sm ${
                  pathname === '/'
                    ? 'text-blue-500 '
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                <span className="sm:px-6 px-5 py-2.5 sm:py-3 font-semibold">
                  게시판
                </span>
              </Link>
              <Link
                href="/chatting"
                className={`transition-colors  text-xs sm:text-sm ${
                  pathname === '/chatting'
                    ? 'text-blue-500 font-semibold'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
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
