import { useParams } from 'next/navigation'

import { useReplyActions } from '@/features/comment/hooks/useReplyActions'
import { ReplyContent } from '@/features/comment/types'

import BaseCommentItem from '../BaseCommentItem/BaseCommentItem'

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
