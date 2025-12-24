import { useParams } from 'next/navigation'

import { ReplyContent } from '@/types/comments/comments.type'

import BaseCommentItem from './BaseCommentItem'
import { useReplyActions } from './useReplyActions'

type ReplyItemProps = {
  reply: ReplyContent
  currentUserId: number
}

export default function ReplyItem({ reply, currentUserId }: ReplyItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const { handleDelete, handleSave, isUpdating } = useReplyActions(
    reply,
    postId,
    reply.parentId,
  )

  return (
    <BaseCommentItem
      {...reply}
      currentUserId={currentUserId}
      isUpdating={isUpdating}
      onDelete={handleDelete}
      onSave={handleSave}
    />
  )
}
