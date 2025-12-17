'use client'

import Image from 'next/image'
import { useState } from 'react' // 💡 useState 추가

import { IconDotsVertical } from '@/assets/svgr'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { formatRelativeTime, getImageUrl } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import CommentDelete from './CommentDelete'

interface CommentProps {
  comment: CommentContent | ReplyContent
  currentUserId: number
  replyCount?: number
  toggleReplies?: () => void
  toggleReplyForm?: () => void
  isRepliesOpen?: boolean
  isReplyFormOpen?: boolean
}

export default function Comment({
  comment,
  currentUserId,
  // ... 나머지 props
}: CommentProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false) // 💡 상태 추가

  const {
    commentId,
    nickname,
    createdAt,
    updatedAt,
    content,
    memberId,
    imageUrl,
  } = comment

  const isOwner = currentUserId === memberId

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex items-center">
        <div className="w-10 aspect-square rounded-full overflow-hidden relative">
          <Image
            src={
              imageUrl?.startsWith('blob:') ? imageUrl : getImageUrl(imageUrl)
            }
            alt="사용자 이미지"
            fill
            className="rounded-full overflow-hidden"
          />
        </div>

        <div className="flex-1 flex flex-col pl-[15px] pr-10">
          <p className="text-base -tracking-[0.32px]">{nickname}</p>
          <p className="text-xs text-text-disabled">
            {updatedAt
              ? formatRelativeTime(updatedAt)
              : formatRelativeTime(createdAt)}
          </p>
        </div>

        <Popover>
          <PopoverTrigger>
            <IconDotsVertical className="w-6 h-6" />
          </PopoverTrigger>
          <PopoverContent className="p-1 w-22 flex flex-col rounded-[12px]">
            <button className="p-2.5 text-xs text-left hover:bg-blue-50 hover:text-blue-600 rounded-[8px]">
              댓글 수정
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="p-2.5 text-xs text-left text-red-500 hover:bg-red-50 rounded-[8px]"
            >
              댓글 삭제
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <p className="w-full text-wrap">{content}</p>

      <CommentDelete
        commentId={commentId}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  )
}
