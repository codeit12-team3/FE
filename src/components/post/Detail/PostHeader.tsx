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
}

export default function PostHeader({
  title,
  timestamp,
  stats,
  commentCount,
  isBookmarked,
}: PostHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <h1 className="text-xl font-bold text-text-base">{title}</h1>

      <div className="flex items-center gap-4 text-sm text-text-input">
        <p>게시날짜 {formatDay(timestamp)} </p>
        <p>조회수 {stats.viewCount} </p>
        <p>댓글 {commentCount}</p>

        <Heart
          className={cn(
            'w-5 h-5 text-text-input',
            isBookmarked && 'fill-main text-main',
          )}
        />
      </div>
    </div>
  )
}
