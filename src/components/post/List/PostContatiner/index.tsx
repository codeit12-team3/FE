'use client'

import dayjs from 'dayjs'

import { Button } from '@/components/ui'
import { useInfinitePosts } from '@/hooks/posts/useInfinitePosts'
import { PostFilterParams } from '@/types/posts'

import { PostListSkeleton } from '../..'
import PostListSection from '../PostListSection'

const matchStartDateFrom = (postStartIso: string, startDate?: string) => {
  if (!startDate) return true

  const minStart = dayjs(startDate, 'YYYY-MM-DD', true).startOf('day')
  if (!minStart.isValid()) return true
  return !dayjs(postStartIso).isBefore(minStart)
}

export default function PostContainer({
  filters,
}: {
  filters: PostFilterParams
}) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(filters)

  if (isLoading) return <PostListSkeleton />
  if (!data) return <div>에러가 발생했습니다.</div>

  const posts = data.pages.flatMap((page) =>
    page.success ? page.data.content : [],
  )

  const filteredPosts = posts.filter((post) =>
    matchStartDateFrom(post.period.startDate, filters.startDate),
  )

  return (
    <>
      <PostListSection posts={filteredPosts} />

      {hasNextPage && (
        <div className="flex justify-center my-8">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            더보기
          </Button>
        </div>
      )}
    </>
  )
}
