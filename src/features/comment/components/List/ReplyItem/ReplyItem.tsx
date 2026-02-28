import { useParams } from 'next/navigation'

import { useReplyActions } from '@/features/comment/hooks/useReplyActions'
import { useCommentStore } from '@/stores/useCommentStore'

import BaseCommentItem from '../BaseCommentItem/BaseCommentItem'

type ReplyItemProps = {
  id: number
  parentId: number
  showReplies: boolean
}

export default function ReplyItem({
  id,
  parentId,
  showReplies,
}: ReplyItemProps) {
  const reply = useCommentStore((state) => state.entities[id])
  const params = useParams<{ postId: string }>()

  const { handleDelete, handleSave, isUpdating } = useReplyActions(
    id,
    Number(params.postId),
    parentId,
  )

  if (!reply) return null
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
