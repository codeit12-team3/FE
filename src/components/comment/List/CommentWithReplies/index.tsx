import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useReplyMutations } from '@/api/comments'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../CommentForm'
import CommentItem from '../CommentItem/CommentItem'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

const DELETED_COMMENT_TEXT = '삭제된 댓글입니다'

export default function CommentWithReplies({ comment }: CommentThreadProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const parentId = comment.commentId

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false)

  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  const { create } = useReplyMutations(postId, parentId)

  const handleSubmit = (text: string) => {
    create.mutate({
      postId,
      parentId,
      content: text,
    })
    setIsReplyFormOpen(false)
  }

  const handleReplyButtonClick = () => {
    setIsReplyFormOpen(true)
  }

  const handleCancel = () => {
    setIsReplyFormOpen(false)
  }

  const isDeleted = comment.content === DELETED_COMMENT_TEXT

  return (
    <div>
      <CommentItem comment={comment} currentUserId={currentUserId} />

      {!isDeleted && (
        <button
          onClick={handleReplyButtonClick}
          disabled={isReplyFormOpen}
          className="text-sm -tracking-[0.28px] font-semibold text-gray-500 disabled:opacity-50"
        >
          답글달기
        </button>
      )}

      {isReplyFormOpen && (
        <div className="pl-10 pt-6">
          <CommentWriteForm
            parentId={parentId}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            isSubmitting={create.isPending}
          />
        </div>
      )}

      <ReplyList commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
