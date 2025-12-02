'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface TabLinkProps {
  href: string
  children: ReactNode
}

export default function TabLink({ href, children }: TabLinkProps) {
  const pathname = usePathname()

  const isActive =
    pathname === href ||
    (href === '/user' && (pathname === '/user' || pathname === '/user/')) ||
    (href !== '/user' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={`relative pb-4 px-1 text-sm font-medium transition-colors whitespace-nowrap
        ${
          isActive
            ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      {children}
    </Link>
  )
}
