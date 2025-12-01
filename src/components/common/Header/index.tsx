import { User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
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
                className="text-text-input hover:text-main transition-colors text-base"
              >
                게시판
              </Link>
              <Link
                href="/chatting"
                className="text-text-input hover:text-main transition-colors text-base"
              >
                채팅방
              </Link>
            </nav>
          </div>
<button className="w-12 h-12 rounded-full bg-bg-disabled flex items-center justify-center hover:opacity-80 transition-opacity border border-border cursor-pointer">
            <User className="size-8" />
          </button>
        </div>
      </div>
    </header>
  )
}
