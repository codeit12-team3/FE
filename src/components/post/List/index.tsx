'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Button } from '@/components/ui'
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

  const handleApplyFilters = useCallback((filters: PostFilterParams) => {
    setAppliedFilters(filters)
  }, [])

  return (
    <div className="max-w-7xl  mx-auto flex  flex-col  md:px-6 px-4">
      <FilterBar
        onApply={handleApplyFilters}
        actionButton={
          <>
            <Button
              size="md"
              className="gap-2 w-36 hidden lg:block"
              onClick={() => router.push('/posts/add')}
            >
              동행 구하기
            </Button>
            <Button
              size="md"
              className="gap-2 whitespace-nowrap lg:hidden"
              onClick={() => router.push('/posts/add')}
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
