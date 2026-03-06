import Image from 'next/image'

import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'

import CommentEditForm from '../CommentEditForm/CommentEditForm'
import CommentMenu from '../CommentMenu/CommentMenu'

type CommentCardProps = {
  imageUrl: string
  nickname: string
  content: string
  createdAt: string
  updatedAt: string

  isOwner: boolean
  isEditing: boolean
  isUpdating?: boolean

  onDelete?: () => void
  onEditClick?: () => void
  onCancelEdit?: () => void
  onSaveEdit?: (text: string) => Promise<void>
  onReplyClick?: () => void
}

const DELETED_TEXT = '삭제된 댓글입니다'

export default function CommentCard({
  imageUrl,
  nickname,
  content,
  createdAt,
  updatedAt,
  isOwner,
  isEditing,
  isUpdating,
  onDelete,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  onReplyClick,
}: CommentCardProps) {
  const isDeleted = content === DELETED_TEXT
  const displayTime =
    createdAt === updatedAt
      ? formatRelativeTime(createdAt)
      : `${formatRelativeTime(updatedAt)} • 수정됨`

  const canShowMenu = isOwner && !isDeleted && onDelete && onEditClick
  const canEdit = isEditing && onSaveEdit && onCancelEdit

  return (
    <div className={cn('flex items-start gap-4', isEditing ? 'p-0' : 'pb-4')}>
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={getImageUrl(imageUrl, true)}
          alt={nickname}
          fill
          sizes="40px"
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{nickname}</span>
          {canShowMenu && (
            <CommentMenu onConfirm={onDelete} startEdit={onEditClick} />
          )}
        </div>

        {canEdit ? (
          <CommentEditForm
            initialContent={content}
            onSave={onSaveEdit}
            onCancel={onCancelEdit}
            isUpdating={isUpdating}
          />
        ) : (
          <p className="whitespace-pre-wrap wrap-break-words text-base">
            {content}
          </p>
        )}

        {!isEditing && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{displayTime}</span>
            {onReplyClick && !isDeleted && (
              <button
                onClick={onReplyClick}
                className="font-medium hover:underline"
              >
                답글 달기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
