import { useReplies } from '@/api/comments'

import ErrorFallback from '../../Error/ErrorFallback'
import CommentItem from '../CommentItem'
import CommentItemSkeleton from '../CommentItem/CommentSkeleton'

interface ReplyListProps {
  commentId: number
  currentUserId: number
}

export default function ReplyList({
  commentId,
  currentUserId,
}: ReplyListProps) {
  const {
    replies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    isLoading,
  } = useReplies({ commentId })

  if (isError && replies.length === 0) {
    return (
      <ErrorFallback
        message="답글을 불러오는데 실패했습니다."
        onRetry={refetch}
      />
    )
  }
  if (isLoading) return <CommentItemSkeleton />

  return (
    <div className="pl-10 pt-6 flex flex-col gap-6">
      {replies.map((reply) => (
        <CommentItem
          key={reply.commentId}
          comment={reply}
          currentUserId={currentUserId}
          variant="reply"
        />
      ))}
      {hasNextPage && (
        <div className="pt-2">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-xs font-semibold text-gray-500 hover:text-main flex items-center gap-1 disabled:opacity-50"
          >
            <span className="text-[10px]">──</span>
            {isFetchingNextPage ? '불러오는 중...' : '답글 더보기'}
          </button>
          {isError && replies.length > 0 && (
            <ErrorFallback
              onRetry={fetchNextPage}
              message="답글을 불러오는데 실패했습니다."
            />
          )}
        </div>
      )}
    </div>
  )
}
