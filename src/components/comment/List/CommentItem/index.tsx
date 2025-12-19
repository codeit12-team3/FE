import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'
import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import { useCommentInteraction } from '../../CommentInteractionContext'
import CommentMenu from '../CommentMenu'
import { useCommentActions } from './useCommentActions'

type CommentItemProps = {
  comment: CommentContent | ReplyContent
  currentUserId: number
  variant: 'comment' | 'reply'
}

export default function CommentItem({
  comment,
  currentUserId,
  variant,
}: CommentItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const isReply = variant === 'reply'

  const { editText, updateText, cancelEdit, isEditing } =
    useCommentInteraction()

  const { handleDelete, handleSave, handleStartEdit } = useCommentActions(
    comment,
    isReply,
    postId,
  )

  const editing = isEditing(comment.commentId)

  const { imageUrl, content, updatedAt, createdAt, nickname } = comment

  return (
    <div className={cn('flex flex-col gap-4', editing ? 'p-0' : 'pb-4')}>
      <div className="flex items-center">
        <div className="w-10 aspect-square rounded-full overflow-hidden relative">
          <Image
            src={
              imageUrl?.startsWith('blob:') ? imageUrl : getImageUrl(imageUrl)
            }
            alt="사용자 이미지"
            fill
            className="rounded-full"
          />
        </div>

        <div className="flex-1 flex flex-col pl-[15px]">
          <p className="text-base -tracking-[0.32px]">{nickname}</p>
          <p className="text-xs text-text-disabled">
            {formatRelativeTime(updatedAt ?? createdAt)}
          </p>
        </div>

        {!editing && (
          <div className="pr-10">
            <CommentMenu onConfirm={handleDelete} startEdit={handleStartEdit} />
          </div>
        )}
      </div>

      {editing ? (
        <>
          <Textarea
            value={editText}
            onChange={(e) => updateText(e.target.value)}
            className="w-full h-[106px] ring-gray-200 resize-none ring-1 focus-visible:ring-1 focus-visible:ring-blue-500 p-4 bg-white text-base"
          />

          <div className="w-full flex items-center justify-end gap-2 text-sm">
            <Button
              onClick={cancelEdit}
              className="w-26 h-10 rounded-[12px] border border-gray-300 bg-white text-gray-600"
            >
              취소
            </Button>
            <Button onClick={handleSave} className="w-26 h-10 rounded-[12px]">
              수정하기
            </Button>
          </div>
        </>
      ) : (
        <p className="w-full text-wrap">{content}</p>
      )}
    </div>
  )
}
