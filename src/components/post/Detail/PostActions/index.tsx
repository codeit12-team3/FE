'use client'

import { Button } from '@/components/ui'

interface PostActionsProps {
  onApply: () => void
}

export default function PostActions({ onApply }: PostActionsProps) {
  return (
    <div className="flex gap-3 justify-center">
      <Button size="md" onClick={onApply} className="flex-1">
        동행 신청하기
      </Button>
    </div>
  )
}
