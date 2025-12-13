import { CommentType } from '@/types/comments/comments.type'

import CommentThread from './CommentThread'

interface CommentListProps {
  parents: CommentType[]
  replies: CommentType[]
}

export default function CommentList({ parents, replies }: CommentListProps) {
  return (
    <div className="space-y-6">
      {parents.map((parent) => (
        <CommentThread
          key={parent.commentId}
          parent={parent}
          replies={replies}
        />
      ))}
    </div>
  )
}
