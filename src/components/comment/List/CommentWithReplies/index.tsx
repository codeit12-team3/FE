import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import { useReplyMutations } from '@/api/comments'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../CommentForm'
import { useCommentReply } from '../../useCommentReply'
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

  const { isReplying, startReply, cancelReply } = useCommentReply(
    comment.commentId,
  )

  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  const { create } = useReplyMutations(postId, parentId)

  const handleSubmit = (text: string) => {
    create.mutate({
      postId,
      parentId,
      content: text,
    })
    cancelReply()
  }

  const isDeleted = comment.content === DELETED_COMMENT_TEXT

  return (
    <div>
      <CommentItem comment={comment} currentUserId={currentUserId} />

      {!isDeleted && (
        <button
          onClick={startReply}
          disabled={isReplying}
          className="text-sm -tracking-[0.28px] font-semibold text-gray-500 disabled:opacity-50"
        >
          답글달기
        </button>
      )}

      {isReplying && (
        <div className="pl-10 pt-6">
          <CommentWriteForm
            parentId={parentId}
            onCancel={cancelReply}
            onSubmit={handleSubmit}
            isSubmitting={create.isPending}
          />
        </div>
      )}

      <ReplyList commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
