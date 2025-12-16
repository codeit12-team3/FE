import { useEffect, useRef } from 'react'

import { useCommentData } from '@/hooks/comment/useCommentData'

import CommentSkeleton from './Comment/CommentSkeleton'
import CommentThread from './CommentThread'

interface CommentListProps {
  postId: string
}

export default function CommentList({ postId }: CommentListProps) {
  const {
    parents,
    replies,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCommentData(postId)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])
  if (isLoading) {
    return <CommentSkeleton />
  }

  return (
    <div className="space-y-6">
      {parents.map((parent) => (
        <CommentThread
          key={parent.commentId}
          parent={parent}
          replies={replies}
        />
      ))}
      {hasNextPage && (
        <div ref={observerRef} className="py-4 text-center">
          {isFetchingNextPage ? (
            <span className="text-sm text-gray-500">댓글 불러오는 중...</span>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}
    </div>
  )
}
