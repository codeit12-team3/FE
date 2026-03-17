'use client'

import { useState } from 'react'

import { useReplies } from '@/features/comment/api'
import ReplyToggleButton from '@/features/comment/components/List/CommentThread/ReplyToggleButton'
import ReplyList from '@/features/comment/components/List/ReplyList/ReplyList'
import { useCommentStore } from '@/features/comment/stores'

interface ReplySectionProps {
  parentId: number
}

export default function ReplySection({ parentId }: ReplySectionProps) {
  const [showReplies, setShowReplies] = useState(false)
  const repliesCount = useCommentStore(
    (state) => state.entities[parentId]?.commentsCount ?? 0,
  )

  // enabled: showReplies로 사용자가 버튼을 클릭하기 전까지 네트워크 요청을 지연
  const { replies } = useReplies({
    commentId: parentId,
    enabled: showReplies,
  })

  // repliesCount: 서버 캐시 기준 답글 수 / replies.length: 실제 로드된 답글 수
  // 둘 중 하나라도 있으면 토글 버튼을 노출 (캐시 불일치 상황 대응)
  const hasReplies = repliesCount > 0 || replies.length > 0

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
