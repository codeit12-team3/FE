'use client'

import CommentItem from '../CommentItem/CommentItem'
import ReplyComposer from './ReplyComposer'
import ReplySection from './ReplySection'

interface CommentThreadProps {
  id: number
  postId: number
}

export default function CommentThread({ id, postId }: CommentThreadProps) {
  return (
    <div>
      <CommentItem id={id} postId={postId} />
      <ReplyComposer postId={postId} parentId={id} />
      <ReplySection parentId={id} />
    </div>
  )
}
