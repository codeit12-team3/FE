'use client'

import { useRouter } from 'next/navigation'

import { IconChevronLeft } from '@/assets/svgr'
import { cn } from '@/lib/common'

interface Props {
  title: string
  className?: string
  back?: boolean
}

export default function MyPageTitle({ title, className, back }: Props) {
  const router = useRouter()

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {back && (
        <button
          onClick={() => router.push('/member')}
          className="flex items-center cursor-pointer text-gray-400 hover:text-gray-800 active:text-gray-900"
        >
          <IconChevronLeft className="size-6" />
        </button>
      )}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
  )
}
