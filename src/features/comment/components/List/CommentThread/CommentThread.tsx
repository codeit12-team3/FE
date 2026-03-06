'use client'

import { useParams } from 'next/navigation'

import CommentItem from '../CommentItem/CommentItem'
import ReplyComposer from './ReplyComposer'
import ReplySection from './ReplySection'

interface CommentThreadProps {
  id: number
}

export default function CommentThread({ id }: CommentThreadProps) {
  const params = useParams<{ postId: string }>()
  const postId = Number(params.postId)

  return (
    <div>
      <CommentItem id={id} postId={postId} />
      <ReplyComposer postId={postId} parentId={id} />
      <ReplySection parentId={id} />
    </div>
  )
}
