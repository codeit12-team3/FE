'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IconChevronRight } from '@/assets/svgr'
import { cn } from '@/lib/common'

interface Props {
  path: string
  label: string
}
export default function MenuItem({ path, label }: Props) {
  const pathname = usePathname()
  const isActive = pathname === path
  const isMemberParentActive =
    pathname === '/member' && path === '/member/received'

  return (
    <Link
      href={path}
      className={cn(
        'w-full flex items-center justify-between py-4 pl-5 pr-3 text-sm font-semibold bg-gray-200 text-gray-500 rounded-xl',
        'hover:bg-gray-300 hover:text-gray-500',
        'active:bg-gray-300 text-gray-500',
        isActive && 'bg-white! border! border-blue-500! text-blue-500!',
        isMemberParentActive &&
          'md:bg-white! md:border! md:border-blue-500! md:text-blue-500!',
      )}
    >
      {label}
      <IconChevronRight className="size-5" />
    </Link>
  )
}
