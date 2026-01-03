'use client'

import * as m from 'motion/react-m'
import { useState } from 'react'

import FilterBar from '@/components/post/FilterBar'
import { FADE_IN, SLIDE_UP } from '@/constants/animation'
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

  return (
    <div>
      <m.div {...FADE_IN}>
        <FilterBar onApply={handleFilterApply} />
      </m.div>
      <m.div {...SLIDE_UP}>
        <BookmarkList filters={convertToApiParams(filters)} />
      </m.div>
    </div>
  )
}
