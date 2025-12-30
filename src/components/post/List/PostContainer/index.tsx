'use client'

import { useEffect, useRef } from 'react'

import { useInfinitePosts } from '@/hooks/posts/useInfinitePosts'
import { PostFilterParams } from '@/types/posts'

import { PostListSkeleton } from '../..'
import ErrorFallback from '../../Error/ErrorFallback'
import PostCard from '../PostCard'

export default function PostContainer({
  filters,
}: {
  filters: PostFilterParams
}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts(filters)
  const observerRef = useRef<HTMLDivElement>(null)
  const fetchingRef = useRef(false)

  useEffect(() => {
    fetchingRef.current = isFetchingNextPage
  }, [isFetchingNextPage])

  useEffect(() => {
    const target = observerRef.current
    if (!target || !hasNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fetchingRef.current) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <PostListSkeleton />
  if (!data)
    return (
      <ErrorFallback
        message="게시글 불러오는데 실패했습니다."
        onRetry={refetch}
      />
    )

  const allPosts = data.pages.flatMap((page) =>
    page.success ? page.data.content : [],
  )
  const posts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p.postId === post.postId),
  )

  const isEmpty = posts.length === 0

  return (
    <>
      {isEmpty ? (
        <div className="w-full h-[300px] flex flex-col items-center justify-center text-center text-text-disabled gap-2">
          <span className="text-lg font-medium">게시글이 없습니다</span>
          <span className="text-sm text-gray-500">
            새로운 동행 게시글을 작성해보세요!
          </span>
        </div>
      ) : (
        <div className="space-y-4 my-5">
          {posts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div
          ref={observerRef}
          className="h-20 flex items-center justify-center"
        >
          {isFetchingNextPage && <p className="text-gray-500">로딩 중...</p>}
        </div>
      )}
    </>
  )
}
