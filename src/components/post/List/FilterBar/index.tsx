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

interface FilterBarProps {
  filters: {
    region: string
    date: string
    age: string
    gender: string
  }
  onChangeFilters: React.Dispatch<
    React.SetStateAction<{
      region: string
      date: string
      age: string
      gender: string
    }>
  >
}

export default function FilterBar({
  filters,
  onChangeFilters,
}: FilterBarProps) {
  const router = useRouter()

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-2 justify-between">
      <div className="flex gap-2">
        <SelectRoot value={filters.region}>
          <SelectTrigger className="h-10 rounded-xl bg-bg-disabled">
            <SelectValue placeholder="국가" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="한국"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, region: '한국' }))
              }
            >
              한국
            </SelectItem>
            <SelectItem
              value="일본"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, region: '일본' }))
              }
            >
              일본
            </SelectItem>
            <SelectItem
              value="미국"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, region: '미국' }))
              }
            >
              미국
            </SelectItem>
          </SelectContent>
        </SelectRoot>

        <SelectRoot value={filters.date}>
          <SelectTrigger className="h-10 rounded-xl bg-bg-disabled">
            <SelectValue placeholder="날짜" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="이번달"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, date: '이번달' }))
              }
            >
              이번달
            </SelectItem>
            <SelectItem
              value="다음달"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, date: '다음달' }))
              }
            >
              다음달
            </SelectItem>
          </SelectContent>
        </SelectRoot>

        <SelectRoot value={filters.age}>
          <SelectTrigger className="h-10 rounded-xl bg-bg-disabled">
            <SelectValue placeholder="나이" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="20대"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, age: '20대' }))
              }
            >
              20대
            </SelectItem>
            <SelectItem
              value="30대"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, age: '30대' }))
              }
            >
              30대
            </SelectItem>
          </SelectContent>
        </SelectRoot>

        <SelectRoot value={filters.gender}>
          <SelectTrigger className="h-10 rounded-xl bg-bg-disabled">
            <SelectValue placeholder="성별" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="MALE"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, gender: 'MALE' }))
              }
            >
              남성
            </SelectItem>
            <SelectItem
              value="FEMALE"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, gender: 'FEMALE' }))
              }
            >
              여성
            </SelectItem>
            <SelectItem
              value="ALL"
              onClick={() =>
                onChangeFilters((prev) => ({ ...prev, gender: 'ALL' }))
              }
            >
              무관
            </SelectItem>
          </SelectContent>
        </SelectRoot>
      </div>

      <div className="flex-1 relative max-w-[456px]">
        <input
          type="text"
          placeholder="검색어를 입력해 주세요"
          className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-bg-disabled text-text-base placeholder:text-text-input"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-3.5 w-5 h-5 text-text-input" />
      </div>

      <Button
        size="sm"
        className="gap-2 w-36"
        onClick={() => router.push('/post/add')}
      >
        <Plus className="w-5 h-5" />
        동행 구하기
      </Button>
    </div>
  )
}
