'use client'

import { Button } from '@/components/ui'
import { useInfinitePosts } from '@/hooks/posts/useInfinitePosts'
import { PostFilterParams } from '@/types/posts'

import { PostListSkeleton } from '../..'
import PostListSection from '../PostListSection'

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

  return (
    <>
      <PostListSection posts={posts} />

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
