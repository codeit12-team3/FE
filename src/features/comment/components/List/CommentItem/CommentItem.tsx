import { useParams } from 'next/navigation'

import { useCommentActions } from '@/features/comment/hooks/useCommentActions'
import { useCommentInteractionStore } from '@/features/comment/hooks/useCommentInteractionStore'
import { useCurrentUser } from '@/features/comment/hooks/useCurrentUser'
import { useCommentStore } from '@/stores/useCommentStore'

import BaseCommentItem from '../BaseCommentItem/BaseCommentItem'

export default function CommentItem({ id }: { id: number }) {
  const params = useParams<{ postId: string }>()
  const comment = useCommentStore((state) => state.entities[id])
  const { checkIsOwner } = useCurrentUser()

  const isEditing = useCommentInteractionStore((state) => state.isEditing(id))
  const { open, close } = useCommentInteractionStore()

  const { handleDelete, handleSave, isUpdating } = useCommentActions(
    id,
    Number(params.postId),
  )

  if (!comment) return null

  return (
    <BaseCommentItem
      {...comment}
      isOwner={checkIsOwner(comment.memberId)}
      isEditing={isEditing}
      isUpdating={isUpdating ?? false}
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
