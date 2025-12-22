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
  hasApplied, // TODO: 백엔드 작업 후 부모 컴포넌트에서 postDetail.isApplied || hasApplied 값 전달
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
