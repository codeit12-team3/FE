'use client'

import { useParams } from 'next/navigation'

import CommentCard from '@/features/comment/components/List/CommentCard/CommentCard'
import { useCommentInteractionStore } from '@/features/comment/hooks/useCommentInteractionStore'
import { useCurrentUser } from '@/features/comment/hooks/useCurrentUser'
import { useReplyActions } from '@/features/comment/hooks/useReplyActions'
import { useCommentStore } from '@/features/comment/stores'

type ReplyItemProps = {
  id: number
  parentId: number
}

export default function ReplyItem({ id, parentId }: ReplyItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const reply = useCommentStore((state) => state.entities[id])
  const { checkIsOwner } = useCurrentUser()

  const isEditing = useCommentInteractionStore((state) => state.isEditing(id))
  const open = useCommentInteractionStore((state) => state.open)
  const close = useCommentInteractionStore((state) => state.close)

  const { handleDelete, handleSave, isUpdating } = useReplyActions(
    id,
    postId,
    parentId,
  )

  if (!reply) return null

  return (
    <CommentCard
      imageUrl={reply.imageUrl}
      nickname={reply.nickname}
      content={reply.content}
      createdAt={reply.createdAt}
      updatedAt={reply.updatedAt}
      isOwner={checkIsOwner(reply.memberId)}
      isEditing={isEditing}
      isUpdating={Boolean(isUpdating)}
      onDelete={handleDelete}
      onEditClick={() => open(id, 'EDIT')}
      onCancelEdit={close}
      onSaveEdit={async (text: string) => {
        await handleSave(text)
        close()
      }}
    />
  )
}
