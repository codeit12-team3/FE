'use client'

import { createComment } from '@/api/comments'

import CommentWriteForm from './Form'
import CommentList from './List'

interface CommentContainerProps {
  postId: string
}

export default function CommentContainer({ postId }: CommentContainerProps) {
  const handleSubmit = (text: string, parentId?: number | null) => {
    const finalParentId =
      parentId && typeof parentId === 'number' && parentId > 0 ? parentId : null
    createComment({
      postId,
      parentId: finalParentId,
      content: text,
    })
  }

  return (
    <div className="max-w-4xl mr-auto p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8">댓글</h2>

      <CommentWriteForm onSubmit={handleSubmit} />

      <CommentList postId={postId} />
    </div>
  )
}
