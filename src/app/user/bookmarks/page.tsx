'use client'

import { useState } from 'react'

import BookmarkCard from '../components/BookmarkCard'
import Dropdown from '../components/DropDown'
import EmptyState from '../components/EmptyState'

export const FILTER_OPTIONS = {
  country: [
    { label: '국가', value: '' },
    { label: '한국', value: 'kr' },
    { label: '미국', value: 'us' },
    { label: '오스트레일리아', value: 'au' },
  ],
  date: [
    { label: '날짜', value: '' },
    { label: '이번주', value: 'week' },
    { label: '이번달', value: 'month' },
    { label: '전체', value: 'all' },
  ],
  age: [
    { label: '나이', value: '' },
    { label: '10대', value: '10' },
    { label: '20대', value: '20' },
    { label: '30대', value: '30' },
  ],
  gender: [
    { label: '성별', value: '' },
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
  ],
}

type Filters = {
  country: string
  date: string
  age: string
  gender: string
}

export default function Bookmarkspage() {
  const [filters, setFilters] = useState<Filters>({
    country: '',
    date: '',
    age: '',
    gender: '',
  })

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const hasAnyFilter = Object.values(filters).some((v) => v !== '')

  return (
    <>
      <div className="flex gap-2">
        <Dropdown
          options={FILTER_OPTIONS.country}
          value={filters.country}
          onChange={(v) => handleFilterChange('country', v)}
          placeholder="국가"
        />
        <Dropdown
          options={FILTER_OPTIONS.date}
          value={filters.date}
          onChange={(v) => handleFilterChange('date', v)}
          placeholder="기간"
        />
        <Dropdown
          options={FILTER_OPTIONS.age}
          value={filters.age}
          onChange={(v) => handleFilterChange('age', v)}
          placeholder="나이"
        />
        <Dropdown
          options={FILTER_OPTIONS.gender}
          value={filters.gender}
          onChange={(v) => handleFilterChange('gender', v)}
          placeholder="성별"
        />
        {hasAnyFilter && (
          <button
            onClick={() =>
              setFilters({ country: '', date: '', age: '', gender: '' })
            }
            className="px-4 py-3 font-medium text-text-input hover:text-main transition bg-bg-disabled rounded-xl"
          >
            초기화
          </button>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <BookmarkCard />
        <EmptyState type="bookmarks" />
      </div>
    </>
  )
}
