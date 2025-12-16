import { useState } from 'react'

import { CommentContent } from '@/types/comments/comments.type'

import Comment from '../Comment'
import ReplyList from '../ReplyList'

interface CommentThreadProps {
  parent: CommentContent
  replies: CommentContent[]
}

export default function CommentThread({ parent, replies }: CommentThreadProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleReplies = () => setIsOpen((prev) => !prev)

  const replyCount = replies.filter(
    (reply) => reply.parentId === parent.commentId,
  ).length

  return (
    <div className="space-y-3">
      <Comment
        comment={parent}
        // 임시 값, session에서 받아와야함
        currentUserId={123}
        replyCount={replyCount}
        onToggleReplies={toggleReplies}
        isRepliesOpen={isOpen}
      />

      {isOpen && (
        <ReplyList
          parentId={parent.commentId}
          replies={replies}
          // 임시 값, session에서 받아와야함
          currentUserId={123}
        />
      )}
    </div>
  )
}
