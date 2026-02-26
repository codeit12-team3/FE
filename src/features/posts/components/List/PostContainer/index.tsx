'use client'

import { Virtuoso } from 'react-virtuoso'

import { Spinner } from '@/components/ui/spinner'
import { useInfinitePosts } from '@/features/posts/hooks'
import { PostFilterParams } from '@/features/posts/types'

import ErrorFallback from '../../Error'
import PostListSkeleton from '../../Skeleton/PostListSkeleton'
import PostCard from '../PostCard'

export default function PostContainer({
  filters,
}: {
  filters: PostFilterParams
}) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts(filters)
  const handleReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }
  if (isLoading) return <PostListSkeleton />
  if (isError || !data) {
    return (
      <ErrorFallback
        message="게시글 불러오는데 실패했습니다."
        onRetry={refetch}
      />
    )
  }

  const allPosts = data.pages.flatMap((page) =>
    page.success ? page.data.content : [],
  )
  const posts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p.postId === post.postId),
  )

  if (posts.length === 0) {
    return (
      <div
        className="w-full h-[300px] flex flex-col items-center justify-center text-center text-text-disabled gap-2"
        role="status"
        aria-live="polite"
      >
        <span className="text-lg font-medium">게시글이 없습니다</span>
        <span className="text-sm text-gray-500">
          새로운 동행 게시글을 작성해보세요!
        </span>
      </div>
    )
  }
  return (
    <section aria-label="게시글 목록">
      <Virtuoso
        useWindowScroll
        data={posts}
        itemContent={(index, post) => (
          <article className="space-y-4 mb-4">
            <PostCard post={post} priority={index === 0} />
          </article>
        )}
        endReached={handleReached}
        components={{
          Footer: () =>
            isFetchingNextPage ? (
              <div
                className="h-20 flex items-center justify-center"
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <Spinner />
                <p className="text-gray-500">로딩 중...</p>
              </div>
            ) : null,
        }}
      />
    </section>
  )
}
