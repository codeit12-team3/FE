import { Heart } from 'lucide-react'

import { formatDay } from '@/lib/common'

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
        <span>게시날짜 {formatDay(timestamp)} </span>
        <span>조회수 {stats.viewCount} </span>
        <span>댓글 {commentCount}</span>

        <Heart
          className={`w-5 h-5 ${
            isBookmarked ? 'fill-main text-main' : 'text-text-input'
          }`}
        />
      </div>
    </div>
  )
}
