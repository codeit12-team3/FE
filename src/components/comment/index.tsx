'use client'

import { useParams } from 'next/navigation'

import { useCommentMutations, useComments } from '@/api/comments'

import CommentForm from './CommentForm'
import ErrorFallback from './Error/ErrorFallback'
import CommentList from './List'

interface CommentContainerProps {
  commentCount: number
}

export default function CommentContainer({
  commentCount,
}: CommentContainerProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const { create } = useCommentMutations(postId)
  const {
    comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useComments(postId)

  const handleSubmit = (text: string) => {
    create.mutate({
      postId,
      content: text,
    })
  }

  return (
    <div className="w-full  flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 py-4">
        댓글 <span className="text-blue-500">{commentCount}</span>
      </h2>

      <CommentForm onSubmit={handleSubmit} isSubmitting={create.isPending} />
      {isError ? (
        <ErrorFallback
          message="댓글을 불러오는데 실패했습니다."
          onRetry={refetch}
        />
      ) : (
        <CommentList
          comments={comments}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
        />
      )}
    </div>
  )
}
