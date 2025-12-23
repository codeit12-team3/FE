import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import { useReplyMutations } from '@/api/comments/replies.mutations'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../CommentForm'
import { useCommentInteraction } from '../../CommentInteractionContext'
import CommentItem from '../CommentItem'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentWithReplies({ comment }: CommentThreadProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const parentId = comment.commentId

  const { isReplyFormOpen, openReplyForm, closeReplyForm, cancelEdit } =
    useCommentInteraction()

  const isThisReplyFormOpen = isReplyFormOpen(parentId)

  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  console.log(session)
  const { create } = useReplyMutations(postId, parentId)

  const handleSubmit = (text: string) => {
    create.mutate({
      postId,
      parentId,
      content: text,
    })
    closeReplyForm()
  }

  const handleReplyButtonClick = () => {
    cancelEdit()
    openReplyForm(parentId)
  }

  const DELETED_COMMENT_TEXT = '삭제된 댓글입니다'
  const isDeleted = comment.content === DELETED_COMMENT_TEXT

  return (
    <div>
      <CommentItem
        variant="comment"
        comment={comment}
        currentUserId={currentUserId}
      />

      {!isDeleted && (
        <button
          onClick={handleReplyButtonClick}
          disabled={isThisReplyFormOpen}
          className="text-sm -tracking-[0.28px] font-semibold text-gray-500"
        >
          답글달기
        </button>
      )}

      {isThisReplyFormOpen && (
        <div className="pl-10 pt-6">
          <CommentWriteForm
            parentId={parentId}
            onCancel={closeReplyForm}
            onSubmit={handleSubmit}
            isSubmitting={create.isPending}
          />
        </div>
      )}

      <ReplyList commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
