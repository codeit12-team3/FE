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
      className={`relative pb-4 px-1 text-xl font-medium transition-colors whitespace-nowrap mt-12.5
        ${
          isActive
            ? 'text-main after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-main'
            : 'text-text-input hover:text-text-base'
        }`}
    >
      {children}
    </Link>
  )
}
