import { useParams } from 'next/navigation'

import { useReplies } from '@/api/comments/replies.mutations'

import Comment from '../Comment'

interface ReplyListProps {
  parentId: number
  currentUserId: number
}

export default function ReplyList({ parentId, currentUserId }: ReplyListProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const { replies } = useReplies({ postId, parentId })
  return (
    <div className="ml-16  space-y-4">
      {replies.map((reply) => (
        <Comment
          key={reply.commentId}
          comment={reply}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  )
}
