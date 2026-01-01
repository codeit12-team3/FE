'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteGetMyPosts } from '@/api/member'
import { EmptyCard } from '@/components/common'
import { MyPostsState } from '@/types/member'

import { useTabs } from '../../Tabs'
import MyPostCard from '../MyPostCard'
import MyPostSkeleton from '../MyPostSkeleton'

export default function MyPostsList() {
  const { activeTab } = useTabs<MyPostsState>()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetMyPosts({ status: activeTab })

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const myPosts = data?.pages.flatMap((page) => page.content) ?? []

  const isInitialLoading = isLoading && myPosts.length === 0

  return (
    <div className="flex flex-col gap-4">
      {isInitialLoading &&
        [1, 2, 3].map((value) => (
          <MyPostSkeleton key={`my-post-skeleton-${value}`} />
        ))}

      {!isInitialLoading && myPosts.length === 0 && (
        <EmptyCard comment="작성한 게시글이 없어요" />
      )}

      {myPosts.map((post, idx) => (
        <MyPostCard key={post.postId} post={post} idx={idx} />
      ))}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Loader className="size-6 animate-spin" />}
      </div>
    </div>
  )
}
