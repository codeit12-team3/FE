'use client'

import { useState } from 'react'

import 'dayjs/locale/ko'

import { PostFilterParams } from '@/features/posts/types'
import { cn } from '@/lib/common'

import FilterControls from './FilterControls'

interface FilterBarProps {
  onApply: (filters: Omit<PostFilterParams, 'keyword'>) => void
  actionButton?: React.ReactNode
  searchInput?: React.ReactNode
  className?: string
}

export default function FilterBar({
  onApply,
  actionButton,
  searchInput,
  className,
}: FilterBarProps) {
  const [filters, setFilters] = useState<Omit<PostFilterParams, 'keyword'>>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
  })

  const applyImmediately = (
    next: Partial<Omit<PostFilterParams, 'keyword'>>,
  ) => {
    const updated = { ...filters, ...next }
    setFilters(updated)
    onApply(updated)
  }

  return (
    <section
      className={cn('md:pt-12 md:pb-5 pt-5 pb-4', className)}
      aria-label="게시글 필터 및 검색"
    >
      <div className="hidden lg:flex gap-2 justify-between">
        <div className="flex gap-2" aria-label="필터 옵션">
          <FilterControls filters={filters} onApply={applyImmediately} />
        </div>

        <div
          className="max-w-[536px] w-full relative flex gap-4"
          role="group"
          aria-label="검색 및 작성"
        >
          {searchInput}
          {actionButton}
        </div>
      </div>

      <div className="flex lg:hidden flex-col gap-3">
        <div className="flex gap-2 justify-between" aria-label="검색 및 작성">
          {searchInput}
          {actionButton}
        </div>

        <div className="flex gap-1 overflow-x-hidden" aria-label="필터 옵션">
          <FilterControls filters={filters} onApply={applyImmediately} />
        </div>
      </div>
    </section>
  )
}
