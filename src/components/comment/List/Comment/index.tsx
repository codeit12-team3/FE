import { MoreVertical, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { IconDotsVertical } from '@/assets/svgr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
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
    <div className="flex flex-col gap-4 pt-8">
      <div className="flex items-center">
        {imageUrl ? (
          <Image src={imageUrl} alt="사용자 이미지" sizes="40px" className="" />
        ) : (
          <User className="w-10 h-10 text-gray-400" />
        )}
        <div className="flex-1 flex flex-col pl-[15px] pr-10">
          <p className="text-base -tracking-[0.32px]">
            {nickname ?? '탈퇴한 사용자'}
          </p>
          <p className="text-xs text-text-disabled">
            {createdAt && formatRelativeTime(createdAt)}
            {updatedAt && formatRelativeTime(updatedAt)}
          </p>
        </div>
        <Popover>
          <PopoverTrigger>
            <IconDotsVertical className="w-6 h-6" />
          </PopoverTrigger>
          <PopoverContent className="p-1 flex flex-col">
            <button value="" className="p-2.5">
              댓글 수정
            </button>
            <button value="" className="p-2.5">
              댓글 삭제
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <p className="w-full text-wrap">{content}</p>
      <div>
        <button className="text-sm -tracking-[0.28px] font-normal text-main">
          답글달기
        </button>
      </div>
    </div>
  )
}
