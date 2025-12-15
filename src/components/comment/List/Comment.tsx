import { MoreVertical, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { formatRelativeTime } from '@/lib/common'
import { CommentContent } from '@/types/comments/comments.type'

interface CommentProps {
  comment: CommentContent
  currentUserId: number
  replyCount?: number
  onToggleReplies?: () => void
  isRepliesOpen?: boolean
}

export default function Comment({
  comment,
  currentUserId,
  replyCount = 0,
  onToggleReplies,
  isRepliesOpen = false,
}: CommentProps) {
  const {
    nickname,
    createdAt,
    updatedAt,
    content,
    memberId,
    imageUrl,
    isUpdated,
  } = comment
  const [openMenu, setOpenMenu] = useState(false)

  const isOwner = currentUserId === memberId

  return (
    <div className="flex gap-4 pt-8">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="사용자 이미지"
            fill
            className="object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              {nickname ?? '탈퇴한 사용자'}
            </span>

            {createdAt && (
              <span className="text-xs text-gray-400">
                {formatRelativeTime(createdAt)}
              </span>
            )}

            {updatedAt && (
              <span className="text-xs text-gray-400">
                {formatRelativeTime(updatedAt)}
              </span>
            )}

            {isUpdated && (
              <span className="text-xs text-gray-400">(수정됨)</span>
            )}
          </div>

          {isOwner && (
            <button
              className="text-gray-500 hover:text-gray-900"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <MoreVertical size={16} />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-900 py-2">{content}</p>
        <div className="flex gap-2 text-sm">
          <button className="text-main">답글달기</button>
          {replyCount > 0 && (
            <button
              onClick={onToggleReplies}
              className="text-gray-600 hover:text-gray-900"
            >
              {isRepliesOpen ? '답글 접기' : `답글 ${replyCount}개`}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
