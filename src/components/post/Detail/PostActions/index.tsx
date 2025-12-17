'use client'

import { Heart } from 'lucide-react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/common'

interface PostActionsProps {
  isBookmarked: boolean
  onApply: () => void
  onToggleBookmark: () => void
}

export default function PostActions({
  isBookmarked,
  onApply,
  onToggleBookmark,
}: PostActionsProps) {
  return (
    <div className="flex gap-3 justify-center">
      <Button size="md" onClick={onApply} className="flex-1">
        동행 신청하기
      </Button>

      <button
        onClick={onToggleBookmark}
        className="hover:scale-110 transition-transform rounded-full border p-2"
      >
        <Heart
          className={cn(
            'size-7 text-text-input',
            isBookmarked && 'fill-main text-main',
          )}
        />
      </button>
    </div>
  )
}
