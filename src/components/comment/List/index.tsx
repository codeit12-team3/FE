import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/lib/common/useInfiniteScroll'
import { CommentContent } from '@/types/comments/comments.type'

import CommentSkeleton from './CommentItem/CommentSkeleton'
import CommentWithReplies from './CommentWithReplies'

interface CommentListProps {
  comments: CommentContent[]
  isLoading: boolean
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export default function CommentList({
  comments,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CommentListProps) {
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
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentWithReplies key={comment.commentId} comment={comment} />
      ))}

      {hasNextPage && (
        <div ref={observerRef} className="py-4 text-center">
          {isFetchingNextPage ? (
            <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
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
