import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { fetchComments, useComments } from '@/api/comments'
import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/lib/common/useInfiniteScroll'

import CommentSkeleton from './Comment/CommentSkeleton'
import CommentThread from './CommentThread'

export default function CommentList() {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const {
    comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComments(postId)

  console.log(comments)
  const observerRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    threshold: 0.1,
  })
  if (isLoading) {
    return <CommentSkeleton />
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentThread key={comment.commentId} comment={comment} />
      ))}
      {hasNextPage && (
        <div ref={observerRef} className="py-4 text-center">
          {isFetchingNextPage ? (
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Spinner />
              <p>댓글 불러오는 중...</p>
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}
    </div>
  )
}
