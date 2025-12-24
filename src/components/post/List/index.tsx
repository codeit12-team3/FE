'use client'

import { useCallback, useState } from 'react'

import { PostFilterParams } from '@/types/posts'

import FilterBar from './FilterBar'
import PostContainer from './PostContainer'

export default function PostList() {
  const [appliedFilters, setAppliedFilters] = useState<PostFilterParams>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
    keyword: '',
  })

  const handleApplyFilters = useCallback((filters: PostFilterParams) => {
    setAppliedFilters(filters)
  }, [])

  return (
    <>
      <FilterBar onApply={handleApplyFilters} />
      <PostContainer filters={appliedFilters} />
    </>
  )
}
