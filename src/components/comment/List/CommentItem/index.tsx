import { useParams } from 'next/navigation'

import { cn } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import { useCommentInteraction } from '../../CommentInteractionContext'
import CommentEditForm from './CommentEditForm'
import CommentHeader from './CommentHeader'
import { useCommentActions } from './useCommentActions'

type CommentItemProps = {
  comment: CommentContent | ReplyContent
  currentUserId: number
  variant: 'comment' | 'reply'
}

export default function CommentItem({
  comment,
  currentUserId,
  variant,
}: CommentItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const isReply = variant === 'reply'

  const { editText, updateText, cancelEdit, isEditing } =
    useCommentInteraction()

  const {
    handleDelete,
    handleSave,
    handleStartEdit,
    commentUpdating,
    replyUpdating,
  } = useCommentActions(comment, isReply, postId)
  const isUpdating = isReply ? replyUpdating : commentUpdating
  const editing = isEditing(comment.commentId)

  const { content } = comment

  return (
    <div className={cn('flex flex-col gap-4', editing ? 'p-0' : 'pb-4')}>
      <CommentHeader
        comment={comment}
        editing={editing}
        currentUserId={currentUserId}
        onDelete={handleDelete}
        onStartEdit={handleStartEdit}
      />

      {editing ? (
        <CommentEditForm
          editText={editText}
          onTextChange={updateText}
          onCancel={cancelEdit}
          onSave={handleSave}
          isUpdating={isUpdating}
        />
      ) : (
        <p className="w-full text-wrap whitespace-pre-wrap wrap-break-words">
          {content}
        </p>
      )}
    </div>
  )
}
