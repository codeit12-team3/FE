import Image from 'next/image'

import { formatRelativeTime, getImageUrl } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import CommentMenu from '../CommentMenu'

interface CommentHeaderProps {
  comment: CommentContent | ReplyContent
  editing: boolean
  currentUserId: number
  onDelete: () => void
  onStartEdit: () => void
}

export default function CommentHeader({
  comment,
  editing,
  currentUserId,
  onDelete,
  onStartEdit,
}: CommentHeaderProps) {
  const { imageUrl, nickname, updatedAt, createdAt, memberId } = comment

  // 본인 댓글만 수정/삭제 가능
  const isOwner = memberId === currentUserId
  const editTime =
    createdAt === updatedAt
      ? formatRelativeTime(createdAt)
      : formatRelativeTime(updatedAt) + `(수정됨)`
  console.log(currentUserId)
  console.log(memberId)
  return (
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
      {isOwner && editing && (
        <div className="pr-10">
          <CommentMenu onConfirm={onDelete} startEdit={onStartEdit} />
        </div>
      )}
    </div>
  )
}
