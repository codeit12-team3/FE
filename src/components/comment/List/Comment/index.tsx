'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { formatRelativeTime, getImageUrl } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import CommentMenu from '../CommentMenu'

interface CommentProps {
  comment: CommentContent | ReplyContent
  currentUserId: number
  onConfirm: () => void
}

export default function Comment({
  comment,
  currentUserId,
  onConfirm,
}: CommentProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

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

        <CommentMenu onConfirm={onConfirm} />
      </div>

      <p className="w-full text-wrap">{content}</p>
    </div>
  )
}
