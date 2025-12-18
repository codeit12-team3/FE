import Image from 'next/image'
import { useParams } from 'next/navigation'

import { useCommentMutations } from '@/api/comments'
import { useReplyMutations } from '@/api/comments/replies.mutations'
import { Button } from '@/components/common'
import { Textarea } from '@/components/ui'
import { cn, formatRelativeTime, getImageUrl } from '@/lib/common'
import { CommentContent, ReplyContent } from '@/types/comments/comments.type'

import CommentMenu from '../CommentMenu'
import { useCommentEdit } from './CommentEditContext'

interface CommentItemProps {
  comment: CommentContent | ReplyContent
  currentUserId: number
  isReply?: boolean
}

export default function CommentItem({
  comment,
  currentUserId,
  isReply = false,
}: CommentItemProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  const { editText, startEdit, updateText, cancelEdit, isEditing } =
    useCommentEdit()

  // 댓글/대댓글 구분
  const parentId = isReply ? (comment as ReplyContent).parentId : 0
  const commentMutations = useCommentMutations(postId)
  const replyMutations = useReplyMutations(postId, parentId)

  const { remove, update } = isReply ? replyMutations : commentMutations

  const handleDelete = () => {
    remove.mutate({ commentId: comment.commentId })
  }

  const handleSave = () => {
    update.mutate({
      commentId: comment.commentId,
      content: editText,
    })
    cancelEdit()
  }

  const handleStartEdit = () => {
    startEdit(comment.commentId, comment.content)
  }

  const isOwner = comment.memberId === currentUserId
  const isDeleted = comment.content === '삭제된 댓글입니다'
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
            className="rounded-full overflow-hidden"
          />
        </div>

        <div className="flex-1 flex flex-col pl-[15px]">
          <p className="text-base -tracking-[0.32px]">{nickname}</p>
          <p className="text-xs text-text-disabled">
            {updatedAt
              ? formatRelativeTime(updatedAt)
              : formatRelativeTime(createdAt)}
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
            className="w-full h-[106px] ring-gray-200 resize-none ring-1 focus-visible:ring-1 focus-visible:ring-blue-500 focus p-4 placeholder:text-gray-500 bg-white text-base"
          />

          <div className="w-full flex items-center justify-end gap-2 text-sm">
            <Button
              onClick={cancelEdit}
              className="w-26 h-10 rounded-[12px] border border-gray-300 bg-white text-gray-600"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="w-26 h-10 rounded-[12px]"
              type="submit"
            >
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
