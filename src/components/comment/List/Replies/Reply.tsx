import { useParams } from 'next/navigation'

import { useReplyMutations } from '@/api/comments/replies.mutations'
import { ReplyContent } from '@/types/comments/comments.type'

import Comment from '../Comment'

interface ReplyProps {
  reply: ReplyContent
  currentUserId: number
}
export default function Reply({ reply, currentUserId }: ReplyProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const { commentId, parentId } = reply
  const { remove } = useReplyMutations(postId, parentId)
  const handleDeleteReplies = () => {
    remove.mutate({ commentId })
  }
  return (
    <Comment
      comment={reply}
      currentUserId={currentUserId}
      onConfirm={handleDeleteReplies}
    />
  )
}
