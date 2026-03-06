'use client'

import { useParams } from 'next/navigation'

import { useCommentInteractionStore } from '@/features/comment/hooks/useCommentInteractionStore'
import { useCurrentUser } from '@/features/comment/hooks/useCurrentUser'
import { useReplyActions } from '@/features/comment/hooks/useReplyActions'
import { useCommentStore } from '@/stores/useCommentStore'

import CommentCard from '../CommentCard/CommentCard'

type ReplyItemProps = {
  id: number
  parentId: number
}

export default function ReplyItem({ id, parentId }: ReplyItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const reply = useCommentStore((s) => s.entities[id])
  const { checkIsOwner } = useCurrentUser()

  const isEditing = useCommentInteractionStore((s) => s.isEditing(id))
  const open = useCommentInteractionStore((s) => s.open)
  const close = useCommentInteractionStore((s) => s.close)

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
