'use client'

import { useEffect, useRef } from 'react'

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
  if (!data) return <div>에러가 발생했습니다.</div>

  const allPosts = data.pages.flatMap((page) =>
    page.success ? page.data.content : [],
  )
  const posts = allPosts.filter(
    (post, index, self) =>
      index === self.findIndex((p) => p.postId === post.postId),
  )

  return (
    <>
      <PostListSection posts={posts} />

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
