import { useParams } from 'next/navigation'

import { useCommentActions } from '@/features/comment/hooks/useCommentActions'
import { useCommentStore } from '@/stores/useCommentStore'

import BaseCommentItem from '../BaseCommentItem/BaseCommentItem'

type CommentItemProps = {
  id: number
  onReply: () => void
}

export default function CommentItem({ id, onReply }: CommentItemProps) {
  const comment = useCommentStore((state) => state.entities[id])
  const params = useParams<{ postId: string }>()

  const { handleDelete, handleSave, isUpdating } = useCommentActions(
    id,
    Number(params.postId),
  )

  return (
    <BaseCommentItem
      {...comment}
      isUpdating={isUpdating}
      onDelete={handleDelete}
      onSave={handleSave}
      onReply={onReply}
    />
  )
}
