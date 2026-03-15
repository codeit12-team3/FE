import CommentCard from '@/features/comment/components/List/CommentCard/CommentCard'
import { useCommentActions } from '@/features/comment/hooks/useCommentActions'
import { useCurrentUser } from '@/features/comment/hooks/useCurrentUser'
import {
  useCommentInteractionStore,
  useCommentStore,
} from '@/features/comment/stores'

type CommentItemProps = {
  id: number
  postId: number
  parentId?: number
}

export default function CommentItem({
  id,
  postId,
  parentId,
}: CommentItemProps) {
  const comment = useCommentStore((state) => state.entities[id])

  const activeCommentId = useCommentInteractionStore((s) => s.activeCommentId)
  const mode = useCommentInteractionStore((s) => s.mode)
  const activate = useCommentInteractionStore((s) => s.activate)
  const deactivate = useCommentInteractionStore((s) => s.deactivate)

  const isEditing = activeCommentId === id && mode === 'EDIT'

  const { checkIsOwner } = useCurrentUser()
  const { handleDelete, handleSave, isUpdating } = useCommentActions(
    id,
    postId,
    parentId,
  )

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
      onEditClick={() => activate(id, 'EDIT')}
      onCancelEdit={deactivate}
      onSaveEdit={async (text) => {
        await handleSave(text)
        deactivate()
      }}
      onReplyClick={() => activate(id, 'REPLY')}
    />
  )
}
