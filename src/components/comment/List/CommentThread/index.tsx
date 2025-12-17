import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useCommentMutations } from '@/api/comments'
import { useReplyMutations } from '@/api/comments/replies.mutations'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../Form'
import Comment from '../Comment'
import Replies from '../Replies/Replies'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentThread({ comment }: CommentThreadProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)
  const parentId = comment.commentId
  const { remove } = useCommentMutations(postId)

  const [isRepliesOpen, setIsRepliesOpen] = useState(false)
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false)
  const { data: session } = useSession()
  const currentUserId = Number(session?.user.memberId)
  const { create } = useReplyMutations(postId, parentId)
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
    create.mutate({
      postId,
      parentId,
      content: text,
    })
  }
  const handleDeleteComments = () => {
    remove.mutate({ commentId: comment.commentId })
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
        onConfirm={handleDeleteComments}
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
      <Replies commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
