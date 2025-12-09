import { useState } from 'react'

import { CommentType } from '@/types/comments/comments.type'

import CommentItem from '../CommentItem'
import ReplyList from '../ReplyList'

interface CommentListProps {
  parents: CommentType[]
  replies: CommentType[]
  currentUserId: number
}

export default function CommentList({
  parents,
  replies,
  currentUserId,
}: CommentListProps) {
  const [openReplies, setOpenReplies] = useState<number[]>([])

  const toggleReplies = (commentId: number) => {
    setOpenReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    )
  }

  const getReplyCount = (parentId: number) => {
    return replies.filter((reply) => reply.parentId === parentId).length
  }

  return (
    <div className="space-y-6">
      {parents.map((c) => {
        const replyCount = getReplyCount(c.commentId)
        const isRepliesOpen = openReplies.includes(c.commentId)

        return (
          <div key={c.commentId}>
            <CommentItem
              comment={c}
              currentUserId={currentUserId}
              replyCount={replyCount}
              onToggleReplies={() => toggleReplies(c.commentId)}
              isRepliesOpen={isRepliesOpen}
            />

            {isRepliesOpen && (
              <ReplyList
                parentId={c.commentId}
                replies={replies}
                currentUserId={currentUserId}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
