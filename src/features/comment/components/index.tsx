'use client'

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import { useCommentMutations, useComments } from '@/features/comment/api'

import CommentForm from './CommentForm/CommentForm'
import ErrorFallback from './Error/ErrorFallback'
import CommentList from './List/CommentList/CommentList'

interface CommentContainerProps {
  commentCount: number
}

export default function CommentContainer({
  commentCount,
}: CommentContainerProps) {
  const params = useParams<{ postId: string }>()
  const { data: session } = useSession()
  const rawPostId = params.postId
  const postId = Number(rawPostId)
  const { createCommentMutation } = useCommentMutations(postId)
  const {
    comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useComments(postId)

  const handleSubmit = async (text: string) => {
    await createCommentMutation.mutateAsync({
      postId,
      content: text,
    })
  }

  return (
    <div className="w-full  flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 py-4">
        댓글 <span className="text-blue-500">{commentCount}</span>
      </h2>
      <div className="pb-[34px]">
        <CommentForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={createCommentMutation.isPending}
          userImage={session?.user.image}
        />
      </div>
      {isError ? (
        <ErrorFallback
          message="댓글을 불러오는데 실패했습니다."
          onRetry={refetch}
        />
      ) : (
        <CommentList
          postId={postId}
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
