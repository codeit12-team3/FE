import { CommentType } from '@/types/post/comment.type'

import ReplyItem from '../ReplyItem'

interface ReplyListProps {
  parentId: number
  replies: CommentType[]
  currentUserId: number
}

export default function ReplyList({
  parentId,
  replies,
  currentUserId,
}: ReplyListProps) {
  const filtered = replies.filter((r) => r.parentId === parentId)

  if (filtered.length === 0) return null

  return (
    <div className="ml-16  space-y-4">
      {filtered.map((reply) => (
        <ReplyItem
          key={reply.commentId}
          reply={reply}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  )
}
