import Image from 'next/image'

import { useCommentInteractionStore } from '@/hooks/comment/useCommentInteractionStore'
import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'
import { useCurrentUser } from '@/providers/CurrentUserContext'

import CommentEditForm from '../CommentEditForm'
import CommentMenu from '../CommentMenu'

type BaseCommentItemProps = {
  commentId: number
  imageUrl: string
  nickname: string
  createdAt: string
  updatedAt: string
  memberId: number
  content: string
  isUpdating: boolean
  onDelete: () => void
  onSave: (text: string) => Promise<void>
  onReply?: () => void
  hasReplyAction?: boolean
}

const DELETED_COMMENT_TEXT = '삭제된 댓글입니다'

export default function BaseCommentItem({
  commentId,
  imageUrl,
  nickname,
  createdAt,
  updatedAt,
  memberId,
  content,
  isUpdating,
  onDelete,
  onSave,
  onReply,
  hasReplyAction, // 부모 댓글인 경우 true, 답글인 경우 false로 가정
}: BaseCommentItemProps) {
  const isEditing = useCommentInteractionStore((state) =>
    state.isEditing(commentId),
  )
  const openInteraction = useCommentInteractionStore((state) => state.open)
  const closeInteraction = useCommentInteractionStore((state) => state.close)

  const { checkIsOwner } = useCurrentUser()

  // 내 댓글인지 확인
  const isOwner = checkIsOwner(memberId)
  const isDeleted = content === DELETED_COMMENT_TEXT
  // 답글인 경우 true, 댓글인 경우 false로 가정
  const isCurrentEditing = hasReplyAction
    ? isEditing && hasReplyAction
    : isEditing

  const editTime =
    createdAt === updatedAt
      ? formatRelativeTime(createdAt)
      : formatRelativeTime(updatedAt) + ` • 수정됨`

  const handleSaveEdit = async (text: string) => {
    await onSave(text)
    closeInteraction()
  }

  return (
    <div className={cn('flex items-start', isEditing ? 'p-0' : 'pb-4')}>
      <div className="w-10 aspect-square rounded-full overflow-hidden relative shrink-0 text-base -tracking-[0.32px] font-normal">
        <Image
          src={getImageUrl(imageUrl, true)}
          alt={`${nickname}의 프로필 이미지`}
          fill
          className="rounded-full object-cover"
        />
      </div>

      <div className="w-full flex flex-col justify-center gap-4 pl-[15px]">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="font-semibold truncate max-w-[150px]">{nickname}</p>
          </div>

          {isOwner && (
            <CommentMenu
              onConfirm={onDelete}
              startEdit={() => openInteraction(commentId, 'EDIT')}
            />
          )}
        </div>
        {/* 답글은 답글 영역이 열려 있을 때만 수정 가능  */}
        {isCurrentEditing ? (
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

        {!isEditing && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{editTime}</span>
            {onReply && !isDeleted && (
              <button onClick={() => openInteraction(commentId, 'REPLY')}>
                답글 달기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
