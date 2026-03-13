import CommentCard from '@/features/comment/components/List/CommentCard/CommentCard'
import { useCommentActions } from '@/features/comment/hooks/useCommentActions'
import { useCommentInteractionStore } from '@/features/comment/hooks/useCommentInteractionStore'
import { useCurrentUser } from '@/features/comment/hooks/useCurrentUser'
import { useCommentStore } from '@/features/comment/stores'

type CommentItemProps = {
  id: number
  postId: number
}

export default function CommentItem({ id, postId }: CommentItemProps) {
  const comment = useCommentStore((state) => state.entities[id])

  const isEditing = useCommentInteractionStore((state) => state.isEditing(id))
  const open = useCommentInteractionStore((state) => state.open)
  const close = useCommentInteractionStore((state) => state.close)

  const { checkIsOwner } = useCurrentUser()
  const { handleDelete, handleSave, isUpdating } = useCommentActions(id, postId)

  if (!comment) return null

  return (
    <CommentCard
      imageUrl={comment.imageUrl}
      nickname={comment.nickname}
      content={comment.content}
      createdAt={comment.createdAt}
      updatedAt={comment.updatedAt}
      isOwner={checkIsOwner(comment.memberId)}
      isEditing={isEditing}
      isUpdating={Boolean(isUpdating)}
      onDelete={handleDelete}
      onEditClick={() => open(id, 'EDIT')}
      onCancelEdit={close}
      onSaveEdit={async (text) => {
        await handleSave(text)
        close()
      }}
      onReplyClick={() => open(id, 'REPLY')}
    />
  )
}
