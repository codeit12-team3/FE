import { useState } from 'react'

import { useMyProfileQuery } from '@/api/member/member.queries'
import { CommentContent } from '@/types/comments/comments.type'

import Comment from '../Comment'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  comment: CommentContent
}

export default function CommentThread({ comment }: CommentThreadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data } = useMyProfileQuery()
  const currentUserId = Number(data?.memberId)
  const toggleReplies = () => setIsOpen((prev) => !prev)
  const parentId = comment.commentId
  return (
    <div className="space-y-3">
      <Comment
        comment={comment}
        currentUserId={currentUserId}
        onToggleReplies={toggleReplies}
        isRepliesOpen={isOpen}
      />

      {isOpen && (
        <ReplyList parentId={parentId} currentUserId={currentUserId} />
      )}
    </div>
  )
}
