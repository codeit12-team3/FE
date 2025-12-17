import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useCommentMutations } from '@/api/comments'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../Form'
import Comment from '../Comment'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentThread({ comment }: CommentThreadProps) {
  const params = useParams<{ postId: string }>()
  const postId = params.postId
  const [isRepliesOpen, setIsRepliesOpen] = useState(false)
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false)
  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  const { createReply } = useCommentMutations()
  const parentId = comment.commentId
  const toggleReplies = () => {
    setIsRepliesOpen((prev) => !prev)
    if (isRepliesOpen) {
      setIsReplyFormOpen(false)
    }
  }

  const toggleReplyForm = () => {
    if (!isReplyFormOpen) {
      setIsRepliesOpen(true)
    }
    setIsReplyFormOpen((prev) => !prev)
  }
  const handleSubmit = (text: string) => {
    createReply.mutate({
      postId,
      parentId,
      content: text,
    })
  }
  const isDeleted = comment.content === '삭제된 댓글입니다'
  return (
    <div>
      <Comment
        comment={comment}
        currentUserId={currentUserId}
        toggleReplies={toggleReplies}
        toggleReplyForm={toggleReplyForm}
        isRepliesOpen={isRepliesOpen}
        isReplyFormOpen={isReplyFormOpen}
      />
      <div>
        {!isDeleted && (
          <button
            onClick={toggleReplyForm}
            className="text-sm -tracking-[0.28px] font-normal text-main"
          >
            답글달기
          </button>
        )}
        {isReplyFormOpen && (
          <div className="pl-10 pt-6">
            <CommentWriteForm
              parentId={parentId}
              onCancel={toggleReplyForm}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
      <ReplyList commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
