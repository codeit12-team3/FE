import Image from 'next/image'

import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'

import { useCommentEdit } from '../../useCommentEdit'
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
  const { isEditing, editText, setEditText, startEdit, cancelEdit, saveEdit } =
    useCommentEdit(commentId, content, onSave)

  const isOwner = memberId === currentUserId
  const editTime =
    createdAt === updatedAt
      ? formatRelativeTime(createdAt)
      : formatRelativeTime(updatedAt) + ` (수정됨)`

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
          <p className="text-xs text-text-disabled">{editTime}</p>
        </div>

        {isOwner && (
          <div className="pr-10">
            <CommentMenu onConfirm={onDelete} startEdit={startEdit} />
          </div>
        )}
      </div>

      {isEditing ? (
        <CommentEditForm
          editText={editText}
          onTextChange={setEditText}
          onCancel={cancelEdit}
          onSave={saveEdit}
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
