import { useParams } from 'next/navigation'

import { CommentContent } from '@/types/comments/comments.type'

import BaseCommentItem from './BaseCommentItem'
import { useCommentActions } from './useCommentActions'

type CommentItemProps = {
  comment: CommentContent
  currentUserId: number
  onReply: () => void
}

export default function CommentItem({
  comment,
  currentUserId,
  onReply,
}: CommentItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const { handleDelete, handleSave, isUpdating } = useCommentActions(
    comment,
    postId,
  )

  return (
    <BaseCommentItem
      {...comment}
      currentUserId={currentUserId}
      isUpdating={isUpdating}
      onDelete={handleDelete}
      onSave={handleSave}
      onReply={onReply}
    />
  )
}
