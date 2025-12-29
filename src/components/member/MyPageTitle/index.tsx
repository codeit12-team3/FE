'use client'

import { useRouter } from 'next/navigation'

import { IconChevronLeft } from '@/assets/svgr'
import { cn } from '@/lib/common'

interface Props {
  title: string
  className?: string
  sub?: boolean
  back?: boolean
}

export default function MyPageTitle({ title, className, sub, back }: Props) {
  const router = useRouter()

  if (sub) {
    return (
      <h3 className={cn('text-md font-semibold text-gray-900', className)}>
        {title}
      </h3>
    )
  }

  return (
    <div className={cn('flex items-center gap-2 mt-10', className)}>
      {back && (
        <button
          onClick={() => router.back()}
          className="flex items-center cursor-pointer text-gray-500 hover:text-gray-800 active:text-gray-800"
        >
          <IconChevronLeft className="size-6" />
        </button>
      )}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
  )
}
