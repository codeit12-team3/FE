'use client'

import { Button } from '@/components/ui'
import { usePostDetail } from '@/features/posts/api'

interface PostActionsProps {
  onApply: () => void
  onCancel?: () => void
  hasApplied?: boolean
  postId: string
  isCanceling?: boolean
  meetsConditions?: boolean
}

export default function PostActions({
  onApply,
  onCancel,
  postId,
  hasApplied: hasAppliedProp,
  isCanceling,
  meetsConditions,
}: PostActionsProps) {
  const { data: post } = usePostDetail({ postId })
  if (!post || !post.success) return null
  const { recruitStatus, isApplied } = post.data
  const hasApplied = hasAppliedProp ?? isApplied
  return (
    <div className="flex gap-3 justify-center">
      {recruitStatus !== 'RECRUITING' ? (
        <Button
          size="md"
          disabled
          className="flex-1 pointer-events-auto! cursor-not-allowed!"
        >
          모집종료
        </Button>
      ) : hasApplied ? (
        <Button
          size="md"
          onClick={onCancel}
          variant="secondary"
          disabled={isCanceling}
          className="flex-1"
        >
          {isCanceling ? '취소 중...' : '신청 취소'}
        </Button>
      ) : !meetsConditions ? (
        <Button
          size="md"
          disabled
          className="flex-1 pointer-events-auto! cursor-not-allowed!"
        >
          신청 불가
        </Button>
      ) : (
        <Button size="md" onClick={onApply} className="flex-1">
          동행 참여하기
        </Button>
      )}
    </div>
  )
}
