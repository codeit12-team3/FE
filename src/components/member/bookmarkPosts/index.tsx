'use client'

import { useState } from 'react'

import FilterBar from '@/components/post/FilterBar'
import { GetBookmarkedPostsReq } from '@/types/member'
import { PostFilterParams } from '@/types/posts'

import BookmarkList from './BookmarkList'

export default function BookmarkPosts() {
  const [filters, setFilters] = useState<Omit<PostFilterParams, 'keyword'>>({
    nation: '',
    date: '',
    ageType: undefined,
    gender: undefined,
  })

  const convertToApiParams = (
    filterParams: Omit<PostFilterParams, 'keyword'>,
  ): Omit<GetBookmarkedPostsReq, 'lastPostId' | 'size'> => {
    return {
      nation: filterParams.nation || undefined,
      from: filterParams.date || undefined,
      ageType: filterParams.ageType,
      gender: filterParams.gender,
    }
  }

  const handleFilterApply = (newFilters: Omit<PostFilterParams, 'keyword'>) => {
    setFilters(newFilters)
  }

  console.log('1')

  return (
    <div>
      <FilterBar onApply={handleFilterApply} />
      <BookmarkList filters={convertToApiParams(filters)} />
    </div>
  )
}
