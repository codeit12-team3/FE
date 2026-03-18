import { useEffect } from 'react'

import { IconChevronDown } from '@/assets/svgr'
import { useReplies } from '@/features/comment/api'
import ErrorFallback from '@/features/comment/components/Error/ErrorFallback'
import CommentCardSkeleton from '@/features/comment/components/List/CommentCard/CommentCardSkeleton'
import ReplyItem from '@/features/comment/components/List/ReplyItem/ReplyItem'
import { useCommentStore } from '@/features/comment/stores'

interface ReplyListProps {
  commentId: number
}

export default function ReplyList({ commentId }: ReplyListProps) {
  const {
    replies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    isLoading,
  } = useReplies({ commentId })

  const setReplies = useCommentStore((state) => state.setReplies)
  // 부모 엔티티의 childrenIds만 구독해 다른 댓글 변경 시 리렌더를 방지
  const childrenIds = useCommentStore(
    (state) => state.entities[commentId]?.childrenIds || [],
  )
  // React Query가 무한 스크롤로 쌓아온 replies를 Zustand 트리 구조와 동기화
  useEffect(() => {
    setReplies(commentId, replies)
  }, [replies, commentId, setReplies])
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
          <CommentCardSkeleton key={index} showReplies={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="pl-[55px] pb-3 flex flex-col">
      <div className="pt-6 flex flex-col gap-6">
        {childrenIds.map((id) => (
          <ReplyItem key={id} id={id} parentId={commentId} />
        ))}
      </div>

      {hasNextPage && (
        <>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-label="답글 더보기"
            className="w-fit text-base font-semibold text-blue-500 flex items-center gap-1 disabled:opacity-50 hover:bg-gray-200 py-2.5 px-4 rounded-full ml-[38px]"
          >
            {isFetchingNextPage ? (
              <span aria-live="polite">불러오는 중...</span>
            ) : (
              <>
                <span>답글 더보기</span>
                <IconChevronDown className="size-5" />
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
