// components/CommentThread.tsx (대폭 간소화!)
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useReplyMutations } from '@/api/comments/replies.mutations'
import { CommentContent } from '@/types/comments/comments.type'

import CommentWriteForm from '../../Form'
import Comment from '../CommentItem'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentThread({ comment }: CommentThreadProps) {
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

  const isDeleted = comment.content === '삭제된 댓글입니다'

  return (
    <div>
      <Comment comment={comment} currentUserId={currentUserId} />
      {!isDeleted && (
        <button
          onClick={() => setIsReplyFormOpen((prev) => !prev)}
          className="text-sm -tracking-[0.28px] font-normal text-main ml-0 mt-2"
        >
          답글달기
        </button>
      )}
      {isReplyFormOpen && (
        <div className="pl-10 pt-6">
          <CommentWriteForm
            parentId={parentId}
            onCancel={() => setIsReplyFormOpen(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
      <ReplyList commentId={parentId} currentUserId={currentUserId} />
    </div>
  )
}
