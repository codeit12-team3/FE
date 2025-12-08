import { CommentType } from '@/types/post/comment.type'

import CommentItem from '../CommentItem'

interface ReplyItemProps {
  reply: CommentType
  currentUserId: number
}

export default function ReplyItem({ reply, currentUserId }: ReplyItemProps) {
  return <CommentItem comment={reply} currentUserId={currentUserId} />
}
