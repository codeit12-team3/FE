'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useInfiniteGetBookmarkedPosts } from '@/api/member'
import { EmptyCard } from '@/components/common'

import BookmarkCard from '../BookmarkCard'
import BookmarkSkeleton from '../BookmarkSkeleton'

interface BookmarkListProps {
  filters?: {
    nation?: string
    from?: string
    to?: string
    ageType?: 'TWENTY' | 'THIRTY' | 'FORTY' | 'FIFTY' | 'ETC'
    gender?: 'MALE' | 'FEMALE' | 'ALL'
  }
}

export default function BookmarkList({ filters = {} }: BookmarkListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGetBookmarkedPosts(filters)

  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const bookmarkedPosts = data?.pages.flatMap((page) => page.content) ?? []

  const isInitialLoading = isLoading && bookmarkedPosts.length === 0

  return (
    <div className="flex flex-col gap-4">
      {isInitialLoading &&
        [1, 2, 3].map((value) => (
          <BookmarkSkeleton key={`bookmark-skeleton-${value}`} />
        ))}

      {!isInitialLoading && bookmarkedPosts.length === 0 && (
        <EmptyCard comment="찜한 게시글이 없어요" />
      )}

      {bookmarkedPosts.map((post) => (
        <BookmarkCard key={post.postId} post={post} />
      ))}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isFetchingNextPage && <Loader className="size-6 animate-spin" />}
      </div>
    </div>
  )
}
