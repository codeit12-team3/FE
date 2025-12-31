'use client'

import { useState } from 'react'

import 'dayjs/locale/ko'

import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_ENUM_OPTIONS,
} from '@/constants/posts'
import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

import FilterDate from './FilterDate'
import FilterSelect from './FilterSelect'

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

  const TRIGGER = 'w-22 text-sm text-gray-800 font-medium'

  return (
    <div className="md:pt-12 md:pb-5 pt-5 pb-4">
      <div className="hidden lg:flex gap-2 justify-between">
        <div className="flex gap-2 ">
          <FilterSelect
            value={filters.nation}
            options={NATION_ENUM_OPTIONS}
            placeholder="국가"
            onChange={(value) =>
              applyImmediately({
                nation: value === 'ALL' ? '' : value,
              })
            }
            className={TRIGGER}
          />

          <FilterSelect
            value={filters.ageType}
            options={AGE_OPTIONS}
            placeholder="나이"
            onChange={(value) =>
              applyImmediately({
                ageType: value === 'ALL' ? undefined : (value as AgeType),
              })
            }
            className={TRIGGER}
          />

          <FilterSelect
            value={filters.gender}
            options={GENDER_OPTIONS}
            placeholder="성별"
            onChange={(value) =>
              applyImmediately({
                gender: value === 'ALL' ? undefined : (value as GenderType),
              })
            }
            className={TRIGGER}
            includeAllOption={false}
          />

          <FilterDate
            date={filters.date}
            onApply={(date) => applyImmediately({ date })}
            triggerClassName="w-auto min-w-22 text-sm text-gray-800 font-medium"
          />
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
          <FilterSelect
            value={filters.nation}
            options={NATION_ENUM_OPTIONS}
            placeholder="국가"
            onChange={(value) =>
              applyImmediately({
                nation: value === 'ALL' ? '' : value,
              })
            }
            className={TRIGGER}
          />

          <FilterSelect
            value={filters.ageType}
            options={AGE_OPTIONS}
            placeholder="나이"
            onChange={(value) =>
              applyImmediately({
                ageType: value === 'ALL' ? undefined : (value as AgeType),
              })
            }
            className={TRIGGER}
          />

          <FilterSelect
            value={filters.gender}
            options={GENDER_OPTIONS}
            placeholder="성별"
            onChange={(value) =>
              applyImmediately({
                gender: value === 'ALL' ? undefined : (value as GenderType),
              })
            }
            className={TRIGGER}
            includeAllOption={false}
          />

          <FilterDate
            date={filters.date}
            onApply={(date) => applyImmediately({ date })}
            triggerClassName="w-auto min-w-22 text-sm text-gray-800 font-medium"
          />
        </div>
      </div>
    </div>
  )
}
