import Image from 'next/image'

import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'

import { useCommentInteractionStore } from '../../useCommentInteractionStore'
import CommentMenu from '../CommentMenu'
import CommentEditForm from './CommentEditForm'

type BaseCommentItemProps = {
  commentId: number
  imageUrl: string
  nickname: string
  createdAt: string
  updatedAt: string
  memberId: number
  content: string
  currentUserId: number
  isUpdating: boolean
  onDelete: () => void
  onSave: (text: string) => Promise<void>
}

export default function BaseCommentItem({
  commentId,
  imageUrl,
  nickname,
  createdAt,
  updatedAt,
  memberId,
  content,
  currentUserId,
  isUpdating,
  onDelete,
  onSave,
}: BaseCommentItemProps) {
  const isEditing = useCommentInteractionStore((state) =>
    state.isEditing(commentId),
  )
  const openInteraction = useCommentInteractionStore((state) => state.open)
  const closeInteraction = useCommentInteractionStore((state) => state.close)

  const isOwner = memberId === currentUserId
  const editTime =
    createdAt === updatedAt
      ? formatRelativeTime(createdAt)
      : formatRelativeTime(updatedAt) + ` • 수정됨`

  const handleSaveEdit = async (text: string) => {
    await onSave(text)
    closeInteraction()
  }

  return (
    <div className={cn('flex flex-col gap-4', isEditing ? 'p-0' : 'pb-4')}>
      <div className="flex items-center">
        <div className="w-10 aspect-square rounded-full overflow-hidden relative shrink-0">
          <Image
            src={getImageUrl(imageUrl, true)}
            alt={`${nickname}의 프로필 이미지`}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col pl-[15px] min-w-0">
          <p className="text-base -tracking-[0.32px] font-medium truncate">
            {nickname}
          </p>
          <p className="text-xs text-text-disabled text-[#a4a4a4]">
            {editTime}
          </p>
        </div>

        {isOwner && (
          <div className="pr-10">
            <CommentMenu
              onConfirm={onDelete}
              startEdit={() => openInteraction(commentId, 'EDIT')}
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <CommentEditForm
          initialContent={content}
          onCancel={closeInteraction}
          onSave={handleSaveEdit}
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
