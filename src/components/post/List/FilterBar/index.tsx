'use client'

import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

interface FilterBarProps {
  filters: PostFilterParams
  onChangeFilters: React.Dispatch<React.SetStateAction<PostFilterParams>>
  keywordInput: string
  onChangeKeyword: (value: string) => void
}

export default function FilterBar({
  filters,
  onChangeFilters,
  keywordInput,
  onChangeKeyword,
}: FilterBarProps) {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      <div className="flex gap-4">
        {/* 국가 */}
        <SelectRoot
          value={filters.nation ?? ''}
          onValueChange={(value) =>
            onChangeFilters((prev) => ({
              ...prev,
              nation: value || undefined,
            }))
          }
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
            onChangeFilters((prev) => ({
              ...prev,
              ageType: value ? (value as AgeType) : undefined,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="나이" />
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
            onChangeFilters((prev) => ({
              ...prev,
              gender: value ? (value as GenderType) : undefined,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="성별" />
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
            value={keywordInput}
            onChange={(e) => onChangeKeyword(e.target.value)}
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
