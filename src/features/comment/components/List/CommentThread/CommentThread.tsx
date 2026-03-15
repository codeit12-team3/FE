'use client'

import CommentItem from '@/features/comment/components/List/CommentItem/CommentItem'
import ReplyForm from '@/features/comment/components/List/CommentThread/ReplyForm'
import ReplySection from '@/features/comment/components/List/CommentThread/ReplySection'
import { useCommentInteractionStore } from '@/features/comment/stores'

interface CommentThreadProps {
  id: number
  postId: number
}
export default function CommentThread({ id, postId }: CommentThreadProps) {
  const isReplying = useCommentInteractionStore((s) => s.isReplying(id))

  return (
    <div>
      <CommentItem id={id} postId={postId} />
      {isReplying && <ReplyForm postId={postId} parentId={id} />}
      <ReplySection parentId={id} />
    </div>
  )
}
