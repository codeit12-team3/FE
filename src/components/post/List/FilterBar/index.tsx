'use client'

import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/common/Button'
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/select.components'
import { InputGroup, InputGroupInput } from '@/components/ui'
import { AGE_OPTIONS, GENDER_OPTIONS, NATION_OPTIONS } from '@/constants/posts'
import { AgeType, GenderType, PostFilterParams } from '@/types/posts'

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      <div className="flex gap-4">
        {/* 국가 */}
        <SelectRoot
          value={filters.nation ?? ''}
          onValueChange={(value) => applyImmediately({ nation: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="지역" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {NATION_OPTIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {/* 나이 */}
        <SelectRoot
          value={filters.ageType ?? ''}
          onValueChange={(value) =>
            applyImmediately({
              ageType: value ? (value as AgeType) : undefined,
            })
          }
        >
          <SelectTrigger>
            <span
              className={`block truncate ${!filters.ageType && 'text-text-input'}`}
            >
              {filters.ageType
                ? AGE_OPTIONS.find((age) => age.value === filters.ageType)
                    ?.label
                : '나이'}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {AGE_OPTIONS.map((age) => (
              <SelectItem key={age.value} value={age.value}>
                {age.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {/* 성별 */}
        <SelectRoot
          value={filters.gender ?? ''}
          onValueChange={(value) =>
            applyImmediately({
              gender: value ? (value as GenderType) : undefined,
            })
          }
        >
          <SelectTrigger>
            <span
              className={`block truncate ${!filters.gender && 'text-text-input'}`}
            >
              {filters.gender
                ? GENDER_OPTIONS.find(
                    (option) => option.value === filters.gender,
                  )?.label
                : '성별'}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>

      {/* 검색 */}
      <div className="flex-1 relative max-w-[456px]">
        <InputGroup>
          <InputGroupInput
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-input pointer-events-none" />
        </InputGroup>
      </div>

      <Button
        size="sm"
        className="gap-2 w-36"
        onClick={() => router.push('/posts/add')}
      >
        <Plus className="w-5 h-5" />
        동행 구하기
      </Button>
    </div>
  )
}
