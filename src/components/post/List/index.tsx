'use client'

import { useCallback, useState } from 'react'

import { PostFilterParams } from '@/types/posts'

import FilterBar from '../FilterBar'
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
    <div className="max-w-7xl  mx-auto flex  flex-col xl:px-34 sm:px-12 px-4">
      <FilterBar onApply={handleApplyFilters} />
      <PostContainer filters={appliedFilters} />
    </div>
  )
}
