'use client'

import CommentItem from '@/features/comment/components/List/CommentItem/CommentItem'
import ReplyComposer from '@/features/comment/components/List/CommentThread/ReplyComposer'
import ReplySection from '@/features/comment/components/List/CommentThread/ReplySection'

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
