'use client'

import { useEffect, useState } from 'react'

import 'dayjs/locale/ko'

import { IconSearch } from '@/assets/svgr'
import { InputGroup, InputGroupInput } from '@/components/ui'
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  NATION_ENUM_OPTIONS,
} from '@/constants/posts'
import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

import FilterDate from './FilterDate'
import FilterSelect from './FilterSelect'

export default function FilterBar({
  onApply,
  actionButton,
}: {
  onApply: (filters: PostFilterParams) => void
  actionButton?: React.ReactNode
}) {
  const [filters, setFilters] = useState<Omit<PostFilterParams, 'keyword'>>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
  })

  const [keyword, setKeyword] = useState('')

  const applyImmediately = (
    next: Partial<Omit<PostFilterParams, 'keyword'>>,
  ) => {
    const updated = { ...filters, ...next }
    setFilters(updated)
    onApply({ ...updated, keyword })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onApply({ ...filters, keyword })
    }, 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  const TRIGGER = 'w-22 text-sm text-gray-800 font-medium'

  return (
    <div className=" py-4">
      <div className="hidden xl:flex gap-2 justify-between">
        <div className="flex gap-2">
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
          <InputGroup className="h-10">
            <InputGroupInput
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IconSearch className="absolute right-3 -translate-y-1/16 w-5 h-5 text-gray-500 pointer-events-none" />
          </InputGroup>
          {actionButton}
        </div>
      </div>

      <div className="flex xl:hidden flex-col gap-3">
        <div className="flex gap-2 justify-between">
          <div className="flex-1 relative max-w-[332px]">
            <InputGroup className="h-10">
              <InputGroupInput
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <IconSearch className="absolute right-3 -translate-y-1/8 w-5 h-5 text-gray-500" />
            </InputGroup>
          </div>

          {actionButton}
        </div>

        <div className="flex gap-2 overflow-x-auto">
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
