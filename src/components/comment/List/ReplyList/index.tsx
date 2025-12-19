import { useReplies } from '@/api/comments'

import CommentItem from '../CommentItem'

interface ReplyListProps {
  commentId: number
  currentUserId: number
}

export default function ReplyList({
  commentId,
  currentUserId,
}: ReplyListProps) {
  const { replies, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReplies({ commentId })

  if (replies.length === 0 && !isFetchingNextPage) return null

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
        </div>
      )}
    </div>
  )
}
