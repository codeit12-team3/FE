'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import 'dayjs/locale/ko'

import { IconSearch } from '@/assets/svgr'
import { Button, InputGroup, InputGroupInput } from '@/components/ui'
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
}: {
  onApply: (filters: PostFilterParams) => void
}) {
  const router = useRouter()

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
  }, [keyword, filters, onApply])

  const TRIGGER = 'w-22 text-sm text-gray-800 font-medium'

  return (
    <div className=" py-4">
      <div className="hidden xl:flex gap-2 justify-between">
        <div className="flex gap-2">
          {/* 국가 */}
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

          {/* 나이 */}
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

          {/* 성별 */}
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
          {/* 날짜 */}
          <FilterDate
            date={filters.date}
            onApply={(date) => applyImmediately({ date })}
            triggerClassName="w-auto min-w-22 text-sm text-gray-800 font-medium"
          />
        </div>

        {/* 검색 */}
        <div className="flex-1 relative w-full">
          <InputGroup className="h-10">
            <InputGroupInput
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </InputGroup>
        </div>

        <Button
          size="md"
          className="gap-2 w-36"
          onClick={() => router.push('/posts/add')}
        >
          동행 구하기
        </Button>
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
              <IconSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </InputGroup>
          </div>

          <Button
            size="md"
            className="gap-2 whitespace-nowrap"
            onClick={() => router.push('/posts/add')}
          >
            동행 구하기
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {/* 국가 */}
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

          {/* 나이 */}
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

          {/* 성별 */}
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

          {/* 날짜 */}
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
