import { useReplies } from '@/api/comments'
import ChevronDown from '@/assets/svgr/chevron-down.svg'

import ErrorFallback from '../../Error/ErrorFallback'
import BaseCommentItemSkeleton from '../CommentItem/BaseCommentSkeleton'
import ReplyItem from '../ReplyItem'

interface ReplyListProps {
  commentId: number
  showReplies: boolean
}

export default function ReplyList({ commentId, showReplies }: ReplyListProps) {
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
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <BaseCommentItemSkeleton key={index} showReplies={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="pl-[55px] pb-3 flex flex-col">
      <div className="pt-6 flex flex-col gap-6">
        {replies.map((reply) => (
          <ReplyItem
            key={reply.commentId}
            reply={reply}
            showReplies={showReplies}
          />
        ))}
      </div>

      {hasNextPage && (
        <>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-fit text-base font-semibold text-blue-500 flex items-center gap-0.5 disabled:opacity-50 hover:bg-gray-200 py-2.5 px-4 rounded-full ml-[38px]"
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
