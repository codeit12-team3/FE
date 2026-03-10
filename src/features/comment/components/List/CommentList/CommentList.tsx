import { Virtuoso } from 'react-virtuoso'

import { Spinner } from '@/components/ui/spinner'
import { CommentContent } from '@/features/comment/types'
import { useCommentStore } from '@/stores/useCommentStore'

import ErrorFallback from '../../Error/ErrorFallback'
import CommentCardSkeleton from '../CommentCard/CommentCardSkeleton'
import CommentThread from '../CommentThread/CommentThread'

interface CommentListProps {
  postId: number
  comments: CommentContent[]
  isLoading: boolean
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isError: boolean
}

export default function CommentList({
  postId,
  comments,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isError,
}: CommentListProps) {
  const rootIds = useCommentStore((state) => state.rootIds)

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
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

  if (comments.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        첫 댓글을 작성해보세요!
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorFallback
        message="댓글을 불러오는데 실패했습니다."
        onRetry={() => fetchNextPage()}
      />
    )
  }

  return (
    <Virtuoso
      useWindowScroll
      data={rootIds}
      increaseViewportBy={{ top: 200, bottom: 200 }}
      endReached={handleEndReached}
      itemContent={(index, id) => (
        <div className="pb-6">
          <CommentThread key={id} id={id} postId={postId} />
        </div>
      )}
      components={{
        Footer: () => {
          return isFetchingNextPage ? (
            <div className="py-4 text-center flex items-center justify-center gap-2">
              <Spinner />
              <p className="text-sm text-gray-500">댓글 불러오는 중...</p>
            </div>
          ) : null
        },
      }}
    />
  )
}
