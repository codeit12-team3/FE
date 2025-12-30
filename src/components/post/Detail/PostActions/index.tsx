'use client'

import { usePostDetail } from '@/api/posts'
import { Button } from '@/components/ui'

interface PostActionsProps {
  onApply: () => void
  onCancel?: () => void
  hasApplied?: boolean
  postId: string
}

export default function PostActions({
  onApply,
  onCancel,
  postId,
  hasApplied,
}: PostActionsProps) {
  const { data: post } = usePostDetail({ postId })
  if (!post || !post.success) return null
  const { recruitStatus } = post.data
  return (
    <div className="flex gap-3 justify-center">
      <Button
        size="md"
        onClick={hasApplied ? onCancel : onApply}
        variant={recruitStatus === 'RECRUITING' ? 'default' : undefined}
        disabled={recruitStatus !== 'RECRUITING'}
        className="flex-1"
      >
        {recruitStatus === 'RECRUITING'
          ? hasApplied
            ? '신청 취소'
            : '동행 참여하기'
          : '모집종료'}
      </Button>
    </div>
  )
}
