'use client'

import { useCallback, useState } from 'react'

import { PostFilterParams } from '@/types/posts'

import FilterBar from './FilterBar'
import PostContainer from './PostContatiner'

export default function PostList() {
  const [appliedFilters, setAppliedFilters] = useState<PostFilterParams>({
    nation: '',
    startDate: '',
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
