'use client'

import { useState } from 'react'

import 'dayjs/locale/ko'

import { PostFilterParams } from '@/types/posts'

import FilterControls from './FilterControls'

interface FilterBarProps {
  onApply: (filters: Omit<PostFilterParams, 'keyword'>) => void
  actionButton?: React.ReactNode
  searchInput?: React.ReactNode
}

export default function FilterBar({
  onApply,
  actionButton,
  searchInput,
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
    <div className="md:pt-12 md:pb-5 pt-5 pb-4">
      <div className="hidden lg:flex gap-2 justify-between">
        <div className="flex gap-2">
          <FilterControls filters={filters} onApply={applyImmediately} />
        </div>

        <div className="max-w-[536px] w-full relative flex gap-4">
          {searchInput}
          {actionButton}
        </div>
      </div>

      <div className="flex lg:hidden flex-col gap-3">
        <div className="flex gap-2 justify-between">
          {searchInput}
          {actionButton}
        </div>

        <div className="flex gap-1 overflow-x-hidden">
          <FilterControls filters={filters} onApply={applyImmediately} />
        </div>
      </div>
    </div>
  )
}
