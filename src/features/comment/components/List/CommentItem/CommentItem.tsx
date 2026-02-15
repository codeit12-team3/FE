import { useParams } from 'next/navigation'

import { useCommentActions } from '@/features/comment/hooks/useCommentActions'
import { CommentContent } from '@/features/comment/types'

import BaseCommentItem from '../BaseCommentItem/BaseCommentItem'

type CommentItemProps = {
  comment: CommentContent
  onReply: () => void
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const { handleDelete, handleSave, isUpdating } = useCommentActions(
    comment,
    postId,
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
