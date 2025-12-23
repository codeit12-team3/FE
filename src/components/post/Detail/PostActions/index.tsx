'use client'

import { Button } from '@/components/ui'

interface PostActionsProps {
  onApply: () => void
  onCancel?: () => void
  hasApplied?: boolean
}

export default function PostActions({
  onApply,
  onCancel,
  hasApplied,
}: PostActionsProps) {
  return (
    <div className="flex gap-3 justify-center">
      <Button
        size="md"
        onClick={hasApplied ? onCancel : onApply}
        className="flex-1"
      >
        {hasApplied ? '신청 취소' : '동행 신청하기'}
      </Button>
    </div>
  )
}
