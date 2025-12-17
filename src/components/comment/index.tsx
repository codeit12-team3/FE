'use client'

import { useParams } from 'next/navigation'

import { useCommentMutations, useComments } from '@/api/comments'

import CommentWriteForm from './Form'
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
  } = useComments(postId)

  const handleSubmit = (text: string) => {
    create.mutate({
      postId: String(postId),
      content: text,
    })
  }
  console.log(comments)
  return (
    <div className="max-w-4xl mr-auto p-4 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900 pt-8">
        댓글 <span className="text-blue-500">{commentCount}</span>
      </h2>

      <CommentWriteForm onSubmit={handleSubmit} />

      <CommentList
        comments={comments}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  )
}
