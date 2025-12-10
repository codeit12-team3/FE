'use client'

import { useMemo } from 'react'

import { CommentType } from '@/types/comments/comments.type'

import CommentInput from './CommentInput'
import CommentList from './CommentList'

interface CommentProps {
  data: CommentType[]
  currentUserId: number
  mutateComment: (payload: { content: string }) => void
  mutateReply: (payload: { parentId: number; content: string }) => void
}

export default function Comment({
  data,
  currentUserId,
  mutateComment,
  mutateReply,
}: CommentProps) {
  const parents = useMemo(
    () => (data ?? []).filter((c) => c.depth === 0),
    [data],
  )
  const replies = useMemo(
    () => (data ?? []).filter((c) => c.depth === 1),
    [data],
  )

  return (
    <div className="max-w-4xl mr-auto p-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8">댓글</h2>

      <CommentInput
        nickname={'현재 로그인 사용자 닉네임'}
        onSubmit={(text, parentId) => {
          if (parentId) {
            mutateReply({ parentId, content: text })
          } else {
            mutateComment({ content: text })
          }
        }}
      />
      <CommentList
        parents={parents}
        replies={replies}
        currentUserId={currentUserId}
      />
    </div>
  )
}
