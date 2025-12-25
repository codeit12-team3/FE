import { useReplies } from '@/api/comments'
import ChevronDown from '@/assets/svgr/chevron-down.svg'

import ErrorFallback from '../../Error/ErrorFallback'
import CommentItemSkeleton from '../CommentItem/CommentSkeleton'
import ReplyItem from '../CommentItem/ReplyItem'

interface ReplyListProps {
  commentId: number
  currentUserId: number
  showReplies: boolean
}

export default function ReplyList({
  commentId,
  currentUserId,
  showReplies,
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

  const initialReplies = replies.slice(0, 5)
  const additionalReplies = replies.slice(5)

  return (
    <div className="pl-[55px] flex flex-col">
      <div className="pt-6 flex flex-col gap-6">
        {initialReplies.map((reply) => (
          <ReplyItem
            key={reply.commentId}
            reply={reply}
            currentUserId={currentUserId}
            showReplies={showReplies}
          />
        ))}
      </div>

      {additionalReplies.map((reply) => (
        <ReplyItem
          key={reply.commentId}
          reply={reply}
          currentUserId={currentUserId}
          showReplies={showReplies}
        />
      ))}
      {hasNextPage && (
        <>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-sm font-semibold text-blue-500 flex items-center gap-0.5 disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <span>불러오는 중...</span>
            ) : (
              <>
                <span>답글 더보기</span>
                <ChevronDown />
              </>
            )}
          </button>
          {isError && replies.length > 0 && (
            <ErrorFallback
              onRetry={fetchNextPage}
              message="답글을 불러오는데 실패했습니다."
            />
          )}
        </>
      )}
    </div>
  )
}
