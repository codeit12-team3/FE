import { Heart } from 'lucide-react'

import { cn, formatDay } from '@/lib/common'

interface PostHeaderProps {
  title: string
  timestamp: string
  stats: {
    viewCount: number
  }
  commentCount: number
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export default function PostHeader({
  title,
  timestamp,
  stats,
  commentCount,
  isBookmarked,
  onToggleBookmark,
}: PostHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <h1 className="text-xl font-bold text-text-base">{title}</h1>

      <div className="flex items-center gap-4 text-sm text-text-input">
        <p>게시날짜 {formatDay(timestamp)} </p>
        <p>조회수 {stats.viewCount} </p>
        <p>댓글 {commentCount}</p>

        <button
          onClick={onToggleBookmark}
          className="hover:scale-110 transition-transform"
          aria-label={isBookmarked ? '북마크 취소' : '북마크 추가'}
        >
          <Heart
            className={cn(
              'w-5 h-5 text-text-input cursor-pointer',
              isBookmarked && 'fill-main text-main',
            )}
          />
        </button>
      </div>
    </div>
  )
}
