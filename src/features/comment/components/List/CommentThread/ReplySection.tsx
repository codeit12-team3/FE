'use client'

import { useState } from 'react'

import { useReplies } from '@/features/comment/api'
import ReplyToggleButton from '@/features/comment/components/List/CommentThread/ReplyToggleButton'
import ReplyList from '@/features/comment/components/List/ReplyList/ReplyList'

interface ReplySectionProps {
  parentId: number
}

export default function ReplySection({ parentId }: ReplySectionProps) {
  const [showReplies, setShowReplies] = useState(false)

  const { replies } = useReplies({
    commentId: parentId,
    enabled: showReplies,
  })

  const hasReplies = replies.length > 0

  const handleToggleReplies = () => {
    setShowReplies((prev) => !prev)
  }

  if (!hasReplies && !showReplies) return null

  return (
    <>
      {!showReplies ? (
        <ReplyToggleButton expanded={false} onClick={handleToggleReplies} />
      ) : (
        <>
          <ReplyList commentId={parentId} />
          <ReplyToggleButton expanded onClick={handleToggleReplies} />
        </>
      )}
    </>
  )
}
