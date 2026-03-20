'use client'

import { Button } from '@/components/ui'
import { usePostDetail } from '@/features/post/api'

interface PostActionsProps {
  onApply: () => void
  onCancel?: () => void
  hasApplied?: boolean
  postId: string
  isCanceling?: boolean
}

export default function PostActions({
  onApply,
  onCancel,
  postId,
  hasApplied: hasAppliedProp,
  isCanceling,
}: PostActionsProps) {
  const { data: post } = usePostDetail({ postId })
  if (!post || !post.success) return null
  const { recruitStatus, isApplied } = post.data
  const hasApplied = hasAppliedProp ?? isApplied
  return (
    <div className="flex gap-3 justify-center">
      <Button
        size="md"
        onClick={hasApplied && onCancel ? onCancel : onApply}
        variant={hasApplied ? 'secondary' : 'default'}
        disabled={recruitStatus !== 'RECRUITING' || isCanceling}
        className="flex-1"
      >
        {recruitStatus === 'RECRUITING'
          ? hasApplied
            ? isCanceling
              ? '취소 중...'
              : '신청 취소'
            : '동행 참여하기'
          : '모집종료'}
      </Button>
    </div>
  )
}
