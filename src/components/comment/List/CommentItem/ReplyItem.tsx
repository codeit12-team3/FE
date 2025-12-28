import { useParams } from 'next/navigation'

import { ReplyContent } from '@/types/comments/comments.type'

import BaseCommentItem from './BaseCommentItem'
import { useReplyActions } from './useReplyActions'

type ReplyItemProps = {
  reply: ReplyContent
  showReplies: boolean
}

export default function ReplyItem({ reply, showReplies }: ReplyItemProps) {
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
      isUpdating={isUpdating}
      onDelete={handleDelete}
      onSave={handleSave}
      hasReplyAction={showReplies}
    />
  )
}
