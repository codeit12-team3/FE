'use client'

import { useParams } from 'next/navigation'

import { createComment } from '@/api/comments'

import CommentWriteForm from './Form'
import CommentList from './List'

export default function CommentContainer() {
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const handleSubmit = (text: string) => {
    createComment({
      postId,
      parentId: null,
      content: text,
    })
  }

  return (
    <div className="max-w-4xl mr-auto p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8">댓글</h2>

      <CommentWriteForm onSubmit={handleSubmit} />

      <CommentList />
    </div>
  )
}
