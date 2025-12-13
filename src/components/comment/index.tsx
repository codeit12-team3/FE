'use client'

import { useMemo } from 'react'

import { CommentType } from '@/types/comments/comments.type'

import CommentWriteForm from './Form'
import CommentList from './List'

interface CommentContainerProps {
  data: CommentType[]
  mutateComment: (payload: { content: string }) => void
  mutateReply: (payload: { parentId: number; content: string }) => void
}

export default function CommentContainer({
  data,
  mutateComment,
  mutateReply,
}: CommentContainerProps) {
  const parents = useMemo(() => data.filter((c) => c.depth === 0), [data])
  const replies = useMemo(() => data.filter((c) => c.depth === 1), [data])

  const handleSubmit = (text: string, parentId?: number | null) => {
    if (parentId) {
      mutateReply({ parentId, content: text })
    } else {
      mutateComment({ content: text })
    }
  }

  return (
    <div className="max-w-4xl mr-auto p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8">댓글</h2>

      <CommentWriteForm onSubmit={handleSubmit} />

      <CommentList parents={parents} replies={replies} />
    </div>
  )
}
