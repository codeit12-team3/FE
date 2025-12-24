import { Spinner } from '@/components/ui/spinner'
import { useInfiniteScroll } from '@/lib/common/useInfiniteScroll'
import { CommentContent } from '@/types/comments/comments.type'

import ErrorFallback from '../Error/ErrorFallback'
import CommentSkeleton from './CommentItem/CommentSkeleton'
import CommentWithReplies from './CommentWithReplies'

interface CommentListProps {
  comments: CommentContent[]
  isLoading: boolean
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isError: boolean
}

export default function CommentList({
  comments,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isError,
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
  if (comments.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        첫 댓글을 작성해보세요!
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentWithReplies key={comment.commentId} comment={comment} />
      ))}
      {hasNextPage && !isError && (
        <div ref={observerRef} className="py-4 text-center">
          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Spinner />
            <p>댓글 불러오는 중...</p>
          </div>
        </div>
      )}
      {isError && (
        <ErrorFallback
          message="댓글을 불러오는데 실패했습니다."
          onRetry={() => fetchNextPage}
        />
      )}
    </div>
  )
}
