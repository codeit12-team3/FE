'use client'

import { useState } from 'react'

import { usePosts } from '@/api/posts'
import { Button } from '@/components/common'
import { PostParams } from '@/types/posts'

import PostListSkeleton from '../Skeleton/PostListSkeleton'
import FilterBar from './FilterBar'
import PostListSection from './PostListSection'

export default function PostList() {
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<PostParams>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
    keyword: '',
  })

  const { data, isLoading } = usePosts({
    lastItemId: cursor,
    size: 20,
    nation: filters.nation || undefined,
    date: filters.date || undefined,
    ageType: filters.ageType,
    gender: filters.gender || undefined,
    keyword: filters.keyword,
  })
  if (isLoading) {
    return <PostListSkeleton />
  }
  if (!data?.success) {
    return <div>에러가 발생했습니다.</div>
  }
  return (
    <div>
      <FilterBar filters={filters} onChangeFilters={setFilters} />
      <PostListSection posts={data?.data.content} />
      {data?.data.content.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button>더보기</Button>
        </div>
      )}
    </div>
  )
}
