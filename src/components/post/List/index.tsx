'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { IconSearch } from '@/assets/svgr'
import { Button, InputGroup, InputGroupInput } from '@/components/ui'
import { PostFilterParams } from '@/types/posts'

import FilterBar from '../FilterBar'
import PostContainer from './PostContainer'

export default function PostList() {
  const router = useRouter()
  const [appliedFilters, setAppliedFilters] = useState<PostFilterParams>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
    keyword: '',
  })
  const [keyword, setKeyword] = useState('')

  const handleApplyFilters = useCallback(
    (filters: Omit<PostFilterParams, 'keyword'>) => {
      setAppliedFilters((prev) => ({ ...prev, ...filters }))
    },
    [],
  )

  const handleSearchImmediately = useCallback(() => {
    setAppliedFilters((prev) => ({ ...prev, keyword }))
  }, [keyword])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchImmediately()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedFilters((prev) => ({ ...prev, keyword }))
    }, 500)
    return () => clearTimeout(timer)
  }, [keyword])

  return (
    <div className="max-w-7xl  mx-auto flex  flex-col  md:px-6 px-4">
      <FilterBar
        onApply={handleApplyFilters}
        searchInput={
          <InputGroup className="h-10 flex-1 lg:w-full">
            <InputGroupInput
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="게시글 검색"
            />
            <IconSearch
              className="absolute right-3 w-6 h-6 text-gray-500 cursor-pointer"
              onClick={handleSearchImmediately}
              aria-label="검색 버튼"
              role="button"
              tabIndex={0}
            />
          </InputGroup>
        }
        actionButton={
          <>
            <Button
              size="md"
              className="gap-2 w-36 hidden lg:block"
              onClick={() => router.push('/posts/add')}
              aria-label="동행 구하기 게시글 작성"
            >
              동행 구하기
            </Button>
            <Button
              size="md"
              className="gap-2 whitespace-nowrap lg:hidden"
              onClick={() => router.push('/posts/add')}
              aria-label="동행 구하기 게시글 작성"
            >
              동행 구하기
            </Button>
          </>
        }
      />
      <PostContainer filters={appliedFilters} />
    </div>
  )
}
