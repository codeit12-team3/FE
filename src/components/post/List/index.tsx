'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/common'
import { useInfinitePosts } from '@/hooks/posts/useInfinitePosts'
import { PostFilterParams } from '@/types/posts'

import PostListSkeleton from '../Skeleton/PostListSkeleton'
import FilterBar from './FilterBar'
import PostListSection from './PostListSection'

export default function PostList() {
  const [filters, setFilters] = useState<PostFilterParams>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
    keyword: '',
  })
  const [keywordInput, setKeywordInput] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, keyword: keywordInput }))
    }, 500)
    return () => clearTimeout(timer)
  }, [keywordInput])
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(filters)

  if (isLoading) return <PostListSkeleton />
  if (!data) return <div>에러가 발생했습니다.</div>

  const posts = data.pages.flatMap((page) =>
    page.success ? page.data.content : [],
  )

  return (
    <div>
      <FilterBar
        filters={filters}
        onChangeFilters={setFilters}
        keywordInput={keywordInput}
        onChangeKeyword={setKeywordInput}
      />

      <PostListSection posts={posts} />

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}
