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
import { AGE_OPTIONS, GENDER_OPTIONS, REGION_OPTIONS } from '@/constants/posts'
import { GenderType, PostParams } from '@/types/posts'

interface FilterBarProps {
  filters: PostParams
  onChangeFilters: React.Dispatch<React.SetStateAction<PostParams>>
}

export default function FilterBar({
  filters,
  onChangeFilters,
}: FilterBarProps) {
  const router = useRouter()
  const [keywordInput, setKeywordInput] = useState(filters.keyword || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      onChangeFilters((prev) => ({ ...prev, keyword: keywordInput }))
    }, 500)

    return () => clearTimeout(timer)
  }, [keywordInput, onChangeFilters])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      <div className="flex gap-4">
        <SelectRoot
          value={filters.region}
          onValueChange={(value) =>
            onChangeFilters((prev) => ({ ...prev, region: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="지역" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {REGION_OPTIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <SelectRoot
          value={filters.date}
          onValueChange={(value) =>
            onChangeFilters((prev) => ({ ...prev, date: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="날짜" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
          </SelectContent>
        </SelectRoot>

        <SelectRoot
          value={filters.age}
          onValueChange={(value) =>
            onChangeFilters((prev) => ({ ...prev, age: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="나이" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            {AGE_OPTIONS.map((age) => (
              <SelectItem key={age.value} value={String(age.label)}>
                {age.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <SelectRoot
          value={filters.gender}
          onValueChange={(value) =>
            onChangeFilters((prev) => ({
              ...prev,
              gender: value as GenderType,
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

      <div className="flex-1 relative max-w-[456px]">
        <InputGroup>
          <InputGroupInput
            placeholder="검색어를 입력해주세요"
            onChange={handleSearchChange}
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
